<template>
  <div class="header-box" v-bind:style="{ minHeight: headerHeight + 'px' }">
    <transition name="slide-fade">
      <header class="navbar" v-if="ScrollUp">
        <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')"/>

        <router-link :to="$localePath" class="home-link">
          <img
            class="logo"
            v-if="$site.themeConfig.logo"
            :src="$withBase($site.themeConfig.logo)"
            :alt="$siteTitle"
          >
        </router-link>

        <div class="links">
          <NavLinks class="can-hide"/>
        </div>

        <div class="lovely-search">
          <AlgoliaSearchBox v-if="isAlgoliaSearch" :options="algolia"/>
          <SearchBox
            v-else-if="$site.themeConfig.search !== false && $page.frontmatter.search !== false"
          />
        </div>
      </header>
    </transition>
    <div class="lovely-portrait-box" v-bind:style="{ top: lovelyPortraitBox + 'px'}">
      <div class="lovely-portrait" v-bind:style="{ height: lovelyPortraitBox/2.5 + 'px'}">
        <img
          v-bind:style="{ height: lovelyPortraitBox/4 + 'px'}"
          class="shake shake-opacity"
          src="../static/img/aimi.jpg"
        >
        <p class="lovely-description">{{ $site.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import AlgoliaSearchBox from "@AlgoliaSearchBox";
import SearchBox from "@SearchBox";
import SidebarButton from "@theme/components/SidebarButton.vue";
import NavLinks from "@theme/components/NavLinks.vue";

export default {
  components: { SidebarButton, NavLinks, SearchBox, AlgoliaSearchBox },

  data() {
    return {
      linksWrapMaxWidth: null,
      screenWidth: "100%",
      headerHeight: "0",
      lovelyPortraitBox: "0",
      show: true,
      oldScrollTop: 0,
      ScrollUp: false
    };
  },
  mounted() {
    this.init()
    var _this = this;
    _this.headerHeight = Number(document.documentElement.clientWidth) / 3;
    _this.lovelyPortraitBox = _this.headerHeight / 1.4;
    window.onresize = function() {
      _this.headerHeight = Number(document.documentElement.clientWidth) / 3; //窗口宽度
      _this.lovelyPortraitBox = _this.headerHeight / 1.4;
      console.log(_this.screenWidth);
    };
    const MOBILE_DESKTOP_BREAKPOINT = 719; // refer to config.styl
    const NAVBAR_VERTICAL_PADDING =
      parseInt(css(this.$el, "paddingLeft")) +
      parseInt(css(this.$el, "paddingRight"));
    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.linksWrapMaxWidth = null;
      } else {
        this.linksWrapMaxWidth =
          this.$el.offsetWidth -
          NAVBAR_VERTICAL_PADDING -
          ((this.$refs.siteName && this.$refs.siteName.offsetWidth) || 0);
      }
    };
    handleLinksWrapWidth();
    window.addEventListener("resize", handleLinksWrapWidth, false);
    this.oldScrollTop = document.documentElement.scrollTop;
    window.addEventListener("scroll", this.handleScroll, false);
  },

  computed: {
    algolia() {
      return (
        this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
      );
    },

    isAlgoliaSearch() {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName;
    }
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
    init() {
      let post_arr = this.$site.pages.filter(
        item =>
          item.regularPath != "/History/" &&
          item.regularPath != "/Harem/" &&
          item.regularPath != "/Message/" &&
          item.regularPath != "/Home/" &&
          item.regularPath != "/"
      );
      this.$store.dispatch("SetBlogData", post_arr);
    }
  }
};

function css(el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView;
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property];
}
</script>

<style lang="stylus">
$navbar-vertical-padding = 0.7rem;
$navbar-horizontal-padding = 1.5rem;

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

.navbar {
  z-index: 1000;
  text-align: center;
  margin: 0 auto;
  width: 100%;
  display: inline-block;
  padding: $navbar-vertical-padding $navbar-horizontal-padding;
  line-height: $navbarHeight - 1.4rem;

  a, span, img {
    display: inline-block;
  }

  .logo {
    height: $navbarHeight - 1.4rem;
    min-width: $navbarHeight - 1.4rem;
    margin-right: 0.8rem;
    vertical-align: top;
  }

  .links {
    position: absolute;
    right: 0;
    left: 0;
    color: #fff;
    box-sizing: border-box;
    white-space: nowrap;
    font-size: 0.9rem;
    top: $navbar-vertical-padding;
  }

  .nav-item {
    .nav-dropdown {
      background: rgba(40, 42, 44, 0.6);
    }
  }

  .lovely-search {
    position: absolute;
    top: $navbar-vertical-padding;
  }
}

.header-box {
  background-image: url('../static/img/head.jpg');
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
</style>
