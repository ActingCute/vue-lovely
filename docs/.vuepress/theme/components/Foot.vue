<template>
  <div class="lovely-foot-box">
    <div class="lovely-foot">
      <transition name="bounce">
        <img v-if="show" v-bind:style="{marginTop:(lovelyPortraitBox)/9+ 'px', height: lovelyPortraitBox + 'px'}"
          class="lovely-foot-img" src="../static/img/foot.png">
      </transition>
    </div>
    <div class="lovely-foot-content-box">
      <div class="lovely-foot-content">
        <span class="lovely_wev_count">
          总浏览量：<span class="web_count" v-text="web_count.count" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "foot",
    computed: {
      web_count() {
        return this.$store.getters.count_data.web_count;
      }
    },
    data() {
      return {
        lovelyPortraitBox: "0",
        headerHeight: 0,
        show: true
      };
    },
    mounted: function () {
      var _this = this;
      _this.headerHeight = Number(document.documentElement.clientWidth) / 3;
      _this.lovelyPortraitBox = _this.headerHeight / 1.4;
      window.onresize = function () {
        _this.headerHeight = Number(document.documentElement.clientWidth) / 3; //窗口宽度
        _this.lovelyPortraitBox = _this.headerHeight / 1.4;
        if (_this.lovelyPortraitBox < 270) {
          _this.show = false;
        } else {
          _this.show = true;
        }
      };
    }
  };
</script>

<style lang="stylus">
  .lovely-foot-box {
    text-align :center;
    .lovely-foot {
      width: 100%;
      position: relative;

      .lovely-foot-img {
        position: absolute;
        right: 0;
        top: -22rem;
      }
    }

    .lovely-foot-content-box {
      .lovely-foot-content {
        width: 100%;
        height: 10rem;
        background: #232323;
        padding: 15px 0 10px;
        text-align: center;
        color: #888;
        font-size: 12px;
        line-height: 1.5;
        margin-top: 15rem;
      }
    }
  }

  .bounce-enter-active {
    animation: bounce-in 0.5s;
  }

  .bounce-leave-active {
    animation: bounce-in 0.5s reverse;
  }

  .lovely_wev_count {
    padding: 5px;
    position: fixed;
    bottom: 0px;
    color :#eee
    .web_count {
      color: #ffffff
    }
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }

    50% {
      transform: scale(1.5);
    }

    100% {
      transform: scale(1);
    }
  }
</style>