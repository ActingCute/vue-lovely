<template>
  <aside class="sidebar">
    <div class="sidebar-inner">
      <div v-show="!is_blog && !is_mb">小可爱</div>
      <ul class="sidebar-nav motion-element" v-show="is_blog || is_mb">
        <li v-show="is_blog" @click="is_me=false;is_nav=false;is_post=true"
          v-bind:class="{ 'sidebar-nav-active': is_post }" class="sidebar-nav-toc" data-target="post-toc-wrap">文章目录</li>
        <li @click="is_me=true;is_nav=false;is_post=false" v-bind:class="{ 'sidebar-nav-active': is_me}"
          class="sidebar-nav-overview" data-target="site-overview-wrap">站点概览</li>
        <li v-if="is_mb" @click="is_me=false;is_nav=true;is_post=false" v-bind:class="{ 'sidebar-nav-active': is_nav}"
          class="sidebar-nav-overview" data-target="site-overview-wrap">想去哪?</li>
      </ul>
    </div>


    <div v-show="!is_me && is_blog  && !is_nav ">
      <slot name="top" />
      <SidebarLinks :depth="0" :items="items" />
      <slot name="bottom" />
    </div>

    <div v-show="is_nav">
      <NavLinks />
    </div>

    <div v-show="(is_me && !is_nav) || (!is_blog && !is_mb)">
      <me></me>
    </div>

  </aside>
</template>

<script>
  import SidebarLinks from "@theme/components/SidebarLinks.vue";
  import NavLinks from "@theme/components/NavLinks.vue";
  import Me from "@theme/components/Me.vue";

  import {
    IsBlog
  } from "../util";

  export default {
    name: "Sidebar",

    components: {
      SidebarLinks,
      NavLinks,
      Me
    },

    props: ["items"],
    data() {
      return {
        is_me: false,
        is_blog: true,
        is_nav: false,
        is_post: true,
      };
    },
    computed: {
      is_mb() {
        return this.$store.getters.is_mb;
      },
      page() {
        return this.$page;
      }
    },
    mounted: function () {
      this.$router.afterEach(() => {
        this.is_blog = IsBlog(this.page.regularPath);
      });
      this.is_blog = IsBlog(this.page.regularPath);
      if (!this.is_blog) {
        this.is_post = false
        this.is_nav = true
      }
    }
  };
</script>