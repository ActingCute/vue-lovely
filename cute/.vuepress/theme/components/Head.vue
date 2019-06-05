<template>
  <div class="header-box" v-bind:style="{ minHeight: headerHeight + 'px' }">
    <transition name="slide-fade">
      <header class="navbar" v-if="ScrollUp">
        <CuteNav/>
      </header>
    </transition>
    <div class="lovely-portrait-box" v-bind:style="{ top: lovelyPortraitBox + 'px'}">
      <div class="lovely-portrait" v-bind:style="{ height: lovelyPortraitBox/2.5 + 'px'}">
        <img
          v-bind:style="{ height: lovelyPortraitBox/4 + 'px'}"
          class="shake shake-opacity"
          src="http://blog.deskmate.cc/aimi.jpg"
        >

        <img
          v-bind:style="{ height: lovelyPortraitBox/4 + 'px'}"
          class="left animated infinite bounce slow delay-1s"
          src="http://blog.deskmate.cc/mbg1.png"
        >
        <img
          v-bind:style="{ height: lovelyPortraitBox/4 + 'px'}"
          class="right animated infinite bounce slow delay-3s"
          src="http://blog.deskmate.cc/mbg3.png"
        >

        <img
          v-bind:style="{ height: lovelyPortraitBox/4 + 'px'}"
          class="left animated infinite bounce slow delay-2s"
          src="http://blog.deskmate.cc/mbg1.png"
        >
        <img
          v-bind:style="{ height: lovelyPortraitBox/4 + 'px'}"
          class="right animated infinite bounce slow delay-4s"
          src="http://blog.deskmate.cc/mbg3.png"
        >
        <p class="lovely-description loading">{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import CuteNav from "./Nav";

export default {
  name: "cute-head",
  components: {
    CuteNav
  },
  data() {
    return {
      linksWrapMaxWidth: null,
      lovelyPortraitBox: "0",
      headerHeight: "0",
      ScrollUp: true,
      screenWidth: "100%",
      description: "",
      descriptionIndex: 0
    };
  },
  mounted() {
    //文字动画
    var _this = this;
    let description_arr = this.$site.description.split("");
    setInterval(function() {
      if (_this.descriptionIndex < description_arr.length) {
        _this.description += description_arr[_this.descriptionIndex];
        _this.descriptionIndex++;
      }
    }, 500);
    //头部大图
    _this.headerHeight = Number(document.documentElement.clientWidth) / 3;
    _this.lovelyPortraitBox = _this.headerHeight / 1.4;
    window.onresize = function() {
      _this.headerHeight = Number(document.documentElement.clientWidth) / 3; //窗口宽度
      _this.lovelyPortraitBox = _this.headerHeight / 1.4;
      console.log(_this.screenWidth);
    };

    //自适应
    this.handleLinksWrapWidth();
    window.addEventListener("resize", this.handleLinksWrapWidth, false);
    //导航显示隐藏
    this.oldScrollTop = document.documentElement.scrollTop;
    window.addEventListener("scroll", this.handleScroll, false);
  },
  methods: {
    handleScroll() {
      if (
        Number(document.documentElement.scrollTop) > Number(this.oldScrollTop)
      ) {
        this.ScrollUp = false;
      } else {
        this.ScrollUp = true;
      }
      this.oldScrollTop = document.documentElement.scrollTop;
    },
    handleLinksWrapWidth() {
      const MOBILE_DESKTOP_BREAKPOINT = 719; // refer to config.styl
      let is_mb =
        document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT;
      this.$store.dispatch("SetIsMb", is_mb);
      let Sidebar = document.getElementById("Sidebar");
      if (is_mb) {
        this.linksWrapMaxWidth = null;
        if (Sidebar) {
          Sidebar.style.display = "none";
        }
      } else {
        if (Sidebar) {
          Sidebar.style.display = "block";
        }
      }
    }
  }
};
</script>


<style lang="stylus">
.left {
  float: left;
}

.right {
  float: right;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(-150px);
  opacity: 0;
}

.header-box {
  background-image: url('http://blog.deskmate.cc/head.jpg?imageView2/0/format/jpg/interlace/1/q/75|watermark/2/text/QEFjdGluZ0N1dGXphbE=/font/5a6L5L2T/fontsize/500/fill/I0VGRUZFRg==/dissolve/60/gravity/SouthEast/dx/10/dy/10|imageslim');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

@media (min-width: 800px) {
  .lovely-portrait-box {
    position: absolute;
    right: 0;
    left: 0;

    .lovely-portrait {
      width: 70%;
      text-align: center;
      margin: auto;
      padding: 40px 0;
      padding-bottom: 40px;
      font-size: 16px;
      opacity: 0.98;
      background: rgba(230, 244, 249, 0.8);
      z-index: 1;
      animation: b 1s ease-out;
      position: relative;
      border-radius: 5px;

      img {
        margin: auto;
        border-radius: 50%;
      }

      .lovely-description {
        color: blue;
        font-size: 18px;
        font-weight: 700;
        margin: 20px 0 0;
      }
    }
  }
}

@media (max-width: 900px) {
  .lovely-portrait {
    display: none;
  }
}

@media (max-width: $MQMobile) {
  .navbar {
    padding-left: 4rem;

    .can-hide {
      display: none;
    }

    .links {
      padding-left: 1.5rem;
    }
  }
}

.navbar {
  z-index: 9999;
  top: 0;
  position: fixed;
  width: 100%;
  background: rgba(40, 42, 44, 0.6);
}
</style>