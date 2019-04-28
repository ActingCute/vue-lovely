<template>
  <aside class="sidebar">
    <div class="sidebar-inner">
      <div v-show="!is_blog">小可爱</div>
      <ul class="sidebar-nav motion-element" v-show="is_blog">
        <li
          @click="is_me=false"
          v-bind:class="{ 'sidebar-nav-active': !is_me }"
          class="sidebar-nav-toc"
          data-target="post-toc-wrap"
        >文章目录</li>
        <li
          @click="is_me=true"
          v-bind:class="{ 'sidebar-nav-active': is_me }"
          class="sidebar-nav-overview"
          data-target="site-overview-wrap"
        >站点概览</li>
      </ul>
    </div>

    <div v-show="is_me || !is_blog">
      <me></me>
    </div>
    <div v-show="!is_me && is_blog" >
      <NavLinks/>
      <slot name="top"/>
      <SidebarLinks :depth="0" :items="items"/>
      <slot name="bottom"/>
    </div>
  </aside>
</template>

<script>
import SidebarLinks from "@theme/components/SidebarLinks.vue";
import NavLinks from "@theme/components/NavLinks.vue";
import Me from "@theme/components/Me.vue";

import { IsBlog } from "../util";

export default {
  name: "Sidebar",

  components: { SidebarLinks, NavLinks, Me },

  props: ["items"],
  data() {
    return {
      is_me: false,
      is_blog: true
    };
  },
  computed: {
    page() {
      return this.$page;
    }
  },
  mounted: function() {
    this.$router.afterEach(() => {
      this.is_blog = IsBlog(this.page.regularPath);
    });
    this.is_blog = IsBlog(this.page.regularPath);
  }
};
</script>