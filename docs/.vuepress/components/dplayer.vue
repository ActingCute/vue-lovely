<template>
  <div>
    <div ref="dplayer"/>
  </div>
</template>

<script>
export default {
  name: "dplayer",
  props: {
    url: String
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

<style lang="stylus" scoped>
  @import 'https://cdnjs.cloudflare.com/ajax/libs/dplayer/1.25.0/DPlayer.min.css'
</style>

