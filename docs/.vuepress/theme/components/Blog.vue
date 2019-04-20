<template>
  <div class="blog-box">
    <!-- 过滤后宫,留言板 这些 -->
    <article v-for="(data,index) in datas" class="blog post-type-normal" v-if="IsBlog(data.path)">
      <div class="post-date">
        <span v-html="GetPostTime(data.lastUpdated)"></span>
      </div>
      <div class="post-badge">
        <span>
          <a href="#">
            <span v-text="GetPostTag(data.frontmatter.meta)"></span>
          </a>
        </span>
      </div>
      <h1 class="lovely-title">{{data.title}}</h1>
      <div class="last-updated" v-if="data.lastUpdated">
        <span class="post-time">
          <span class="post-meta-item-icon">
            <i class="fa fa-calendar-o"></i>
          </span>
          <span class="post-meta-item-text">{{lastUpdatedText}}</span>
          <span v-text="GetPostDate(data.lastUpdated)"></span>
        </span>
      </div>
      <div class="lovely-content-box" v-if="data.excerpt">
        <div class="lovely-content" v-html="data.excerpt"></div>
        <div class="post-button text-center">
          <router-link class="btn" :to="data.path">我要看全部啦 »</router-link>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { GetPostTag, GetPostTime, GetPostDate } from "../util";
export default {
  name: "blog",
  computed: {
    datas() {
      return this.$site.pages;
    },
    lastUpdatedText() {
      if (typeof this.$themeLocaleConfig.lastUpdated === "string") {
        return this.$themeLocaleConfig.lastUpdated;
      }
      if (typeof this.$site.themeConfig.lastUpdated === "string") {
        return this.$site.themeConfig.lastUpdated;
      }
      return "Last Updated";
    }
  },
  methods: {
    GetPostTag(t) {
      return GetPostTag(t);
    },
    GetPostTime(t) {
      return GetPostTime(t);
    },
    GetPostDate(t) {
      return GetPostDate(t);
    },
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