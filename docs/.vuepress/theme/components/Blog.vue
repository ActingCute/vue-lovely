<template>
  <div>
    <!-- 过滤后宫,留言板 这些 -->
    <div v-for="(data,index) in datas">
      <article>
        <div class="lovely-title">{{data.title}}</div>
        <div class="lovely-content-box" v-if="data.excerpt">
          <div class="lovely-content" v-html="data.excerpt"></div>
          <div>查看更多</div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: "blog",
  computed: {
    datas() {
      this.init();
      return this.$site.pages;
    }
  },
  methods: {
    init() {}
  }
};
</script>

<style lang="stylus"></style>