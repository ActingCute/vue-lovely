<template>
  <div class="theme-container" v-loading="loading">
    <cute-head/>
    <Content v-if="isHome"/>
    <Blog v-else/>
    <cute-foot/>
  </div>
</template>

<script>
import CuteHead from "./components/Head";
import Blog from "./components/Blog";
import CuteFoot from "./components/Foot";
import SearchBox from '@SearchBox'

export default {
  name: "cute",
  components: {
    CuteHead,
    Blog,
    CuteFoot
  },
  watch: {
    $route(to, from) {
      this.init();
    }
  },
  data() {
    return {
      loading: true,
      isHome: true
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.isHome = location.pathname == "/";
      this.loading = false;
    }
  }
};
</script>