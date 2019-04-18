<template>
  <div class="header-box" v-bind:style="{ minHeight: headerHeight + 'px' }">
    <header class="navbar">
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
      screenWidth: document.documentElement.clientWidth,
      headerHeight:"0"
    };
  },

  mounted() {
    var _this = this;
    _this.headerHeight = Number(document.documentElement.clientWidth)/3
    window.onresize = function() {
      _this.headerHeight = Number(document.documentElement.clientWidth)/3; //窗口宽度
      console.log(_this.screenWidth)
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

.navbar {
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
