<template>
  <div class="navbarBox">
    <div style="margin-top:1rem">
      <router-link class="navbarText" to="/">Home</router-link>
      <router-link
        class="navbarText"
        :key="'nav_'+index"
        v-for="(nav,index) in navData"
        :to="nav.path"
      >{{nav.title}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "cute-nav"
};
</script>

<style lang="stylus" scoped>
.navbarBox {
  position: relative;
  text-align: center;

  .navbarText {
    padding: 1rem;
  }

  height: 3rem;
  width: 100%;
}
</style>

