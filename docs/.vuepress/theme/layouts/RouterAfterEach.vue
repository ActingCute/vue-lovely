<template></template>

<script>
//处理一些路由跳转的逻辑
import { GetUrl, IsBlog, GoAnchor, GetPostTags, GetPostDate } from "../util";

import Gist from "../util/config";
import { Getmd5 } from "../util/md5";

export default {
  name: "router_after_each",
  watch: {
    $route(to, from) {
      this.$store.dispatch("NeedUpdate", to.path);
      this.InitData();
    },
    need_get_data(new_val, old_val) {
      this.InitData();
    }
  },
  computed: {
    url() {
      return this.$store.getters.web_data.url;
    },
    need_get_data() {
      return this.$store.getters.need_get_data;
    }
  },
  mounted() {
    this.$store.dispatch("NeedUpdate", GetUrl());
    this.InitData();
  },
  methods: {
    InitData() {
      if (this.need_get_data) {
        this.init();
        this.SetUrl(GetUrl());
        this.CheckLogin();
        //阅读更更多
        GoAnchor("actingcute_anchor");
      }
    },
    CheckLogin() {
      let user_md5 = this.Storage.getItem("lovely_user");
      if (user_md5) {
        this.$store.dispatch(
          "SetLoginData",
          user_md5 == Getmd5(Gist.name, Gist.password)
        );
      }
    },
    init() {
      //数据
      let post_arr = this.$site.pages.filter(
        item =>
          item.regularPath != "/History/" &&
          item.regularPath != "/Harem/" &&
          item.regularPath != "/Message/" &&
          item.regularPath != "/Home/" &&
          item.regularPath != "/Twitter/" &&
          item.regularPath != "/Commits/" &&
          item.regularPath != "/"
      );
      this.$store.dispatch("SetBlogData", post_arr);

      let tags = [];
      let historys = [];
      post_arr.forEach(post => {
        console.log("post --", post);
        //标签
        let page_tags = GetPostTags(post.frontmatter.meta);
        page_tags.forEach(pt => {
          let tag = tags.find(t => t.name == pt);
          if (tag) {
            tag.num++;
          } else {
            let t = {
              name: pt,
              num: 1
            };
            tags.push(t);
          }
        });
        //归档数据
        let last_time = GetPostDate(post.lastUpdated);
        let Y = last_time.split("-")[0];
        console.log("last_time ---", last_time, Y);
        let history = historys.find(h => h.year == Y);
        if (history) {
          history.post.push(post);
        } else {
          let history = {
            year: Y,
            post: [post]
          };
          historys.push(history);
        }
      });
      this.$store.dispatch("SetBlogTagData", tags);
      this.$store.dispatch("SetBlogHostoryData", historys);
    },
    SetUrl(url) {
      if (url) {
      } else {
        url = GetUrl();
      }
      this.$store.dispatch("SetWebData", null);
      this.$store.dispatch("SetWebData", {
        url
      });

      if (url != "/") {
        //除了首页，其他地方应该获取评论
        this.$store.dispatch("SetCommentData", url);
      }
      //获取浏览数
      this.$store.dispatch("SetCountData", url);
    }
  }
};
</script>