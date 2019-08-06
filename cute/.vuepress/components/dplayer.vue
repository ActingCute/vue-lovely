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
  }
};
</script>

