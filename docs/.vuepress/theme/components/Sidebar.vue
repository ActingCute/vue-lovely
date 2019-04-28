<template>
  <aside class="sidebar">
    <div class="sidebar-inner">
      <ul class="sidebar-nav motion-element">
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

    <div v-show="is_me">
      <me></me>
    </div>
    <div v-show="!is_me">
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

export default {
  name: "Sidebar",

  components: { SidebarLinks, NavLinks, Me },

  props: ["items"],
  data() {
    return {
      is_me: false
    };
  }
};
</script>