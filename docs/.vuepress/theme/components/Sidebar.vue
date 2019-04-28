<template>
  <aside class="sidebar">
    <div class="sidebar_bt" @click="is_me=true">me</div>
    <div class="sidebar_bt" @click="is_me=false">nav</div>
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
import SidebarLinks from '@theme/components/SidebarLinks.vue'
import NavLinks from '@theme/components/NavLinks.vue'
import Me from '@theme/components/Me.vue'

export default {
  name: 'Sidebar',

  components: { SidebarLinks, NavLinks,Me },

  props: ['items'],
  data(){
    return{
      is_me:false
    }
  }
}
</script>

<style lang="stylus">
.sidebar
  ul
    padding 0
    margin 0
    list-style-type none
  a
    display inline-block
  .nav-links
    display none
    border-bottom 1px solid $borderColor
    padding 0.5rem 0 0.75rem 0
    a
      font-weight 600
    .nav-item, .repo-link
      display block
      line-height 1.25rem
      font-size 1.1em
      padding 0.5rem 0 0.5rem 1.5rem
  & > .sidebar-links
    padding 1.5rem 0
    & > li > a.sidebar-link
      font-size 1.1em
      line-height 1.7
      font-weight bold
    & > li:not(:first-child)
      margin-top .75rem

@media (max-width: $MQMobile)
  .sidebar
    .nav-links
      display block
      .dropdown-wrapper .nav-dropdown .dropdown-item a.router-link-active::after
        top calc(1rem - 2px)
    & > .sidebar-links
      padding 1rem 0

.sidebar_bt
    cursor pointer
    display inline-block
    width 50px
    padding 10px
    border-bottom 1px #eee solid     
</style>
