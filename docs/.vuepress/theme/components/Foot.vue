<template>
  <div></div>
</template>

<script>
import { GoAnchor } from "../util";
export default {
  name: "foot",
  watch: {
    $route(to, from) {
      //阅读更更多  
      GoAnchor("actingcute_anchor");
    }
  }
};
</script>

<style lang="stylus"></style>