<template>
  <div>
    <!-- 过滤后宫,留言板 这些 -->
    <div v-for="(data,index) in datas">
      <article v-if="IsBlog(data.path)">
        <div class="lovely-title">{{data.title}}</div>
        <div class="lovely-content-box" v-if="data.excerpt">
          <div class="lovely-content" v-html="data.excerpt"></div>
          <div>
            <router-link :to="data.path">查看更多</router-link>
          </div>
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
      return this.$site.pages;
    }
  },
  methods: {
    IsBlog(url) {
      let keep_url = ["/Message/", "/History/", "/Harem/"];
      for (let i = 0; i < keep_url.length; i++) {
        let is_keep = url.indexOf(keep_url[i]) != -1;
        if (is_keep) {
          return false;
        }
      }
      //HOME
      if (url == "/") {
        return false;
      }
      return true;
    }
  }
};
</script>

<style lang="stylus"></style>