<template>
  <div class="navbarBox">
    <div style="margin-top:1rem">
      <router-link v-bind:class="{ 'active': isHome }" class="navbarText" to="/">Home</router-link>
      <router-link class="navbarText cute_nav_text" :key="'nav_'+index" v-for="(nav,index) in navData" :to="nav.path">
        {{nav.title}}</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "cute-nav",
    data() {
      return {
        isHome: false
      }
    },
    watch: {
      $route(to, from) {
        this.Init();
      }
    },
    mounted() {
      this.Init()
    },
    methods: {
      Init() {
        let now_url = this.GetUrl()
        if (now_url != this.old_url) {
          this.old_url = now_url
          if (now_url == "/") {
            this.isHome = true
          }
        }
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .navbarBox {
    position: relative;
    text-align: center;

    .navbarText {
      color: #fff;
      padding: 1rem;
    }

    height: 3rem;
    width: 100%;
  }

  .router-link-exact-active {
    color: #09f !important
  }
</style>