<template>
  <div class="blog-box">
    <!-- 过滤后宫,留言板 这些 -->
    <div class="lovely-sidebar" id="Sidebar">
      <aside class="sidebar" style="display:inline-block">
        <div class="sidebar-inner">
          <div>小可爱</div>
        </div>
        <div>
          <me></me>
        </div>
      </aside>
    </div>

    <article
      v-show="datas.length > 0"
      id="lovely_blog"
      v-for="(data,index) in datas"
      class="blog post-type-normal"
      v-if="IsBlog(data.path)"
    >
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

    <div v-show="datas.length < 1">
        <img width="100px" src="../static/img/leimu6.jpg" />
        <span>蕾姆说。。。啥都没有，要不去发表东东？</span>
    </div>
  </div>
</template>

<script>
import {
  GetPostTag,
  GetPostTime,
  GetPostDate,
  SetSidebarPostion,
  IsBlog
} from "../util";
import Me from "@theme/components/Me.vue";

export default {
  name: "blog",
  components: { Me },
  computed: {
    datas() {
      return this.$store.getters.blog_data;
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
  mounted: function() {
    //test Storage
    this.Storage.setItem("key", "lovely");
    console.log(this.Storage.getItem("key"));
    if (document.getElementById("Sidebar")) {
      window.addEventListener("scroll", SetSidebarPostion, false);
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
      return IsBlog(url);
    }
  }
};
</script>
