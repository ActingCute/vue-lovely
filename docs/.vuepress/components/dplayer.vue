<template>
  <div>
    <div ref="dplayer"/>
  </div>
</template>

<script>
import "dplayer/dist/DPlayer.min.css";
import NoSsr from "vue-no-ssr";

export default {
  name: "dplayer",
  props: {
    url: String
  },
  components: {
    NoSsr
  },
  mounted() {
    import("dplayer").then(module => {
      let DPlayer = module.default
      // use code
      if (this.url) {
      } else {
        return;
      }
      new DPlayer({
        container: this.$refs["dplayer"],
        screenshot: true,
        video: {
          url: this.url
        }
      });
    });
  }
};
</script>
