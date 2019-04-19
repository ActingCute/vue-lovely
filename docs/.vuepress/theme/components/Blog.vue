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
export default {
  name: "blog",
  computed: {
    datas() {
      return this.$site.pages;
    }
  },
  methods: {
    GetPostTag(t) {
      console.log(t);
      if (t) {
        return t.length > 0 ? t[0].name : "未知事件";
      }
      return "未知事件";
    },
    GetPostTime(d) {
      try {
        let pds = d.split(",")[0];
        let ymd = pds.split("/");
        let ymdhtml =
          '<div class="post-month">' +
          ymd[0] +
          '月</div><div class="post-day">' +
          ymd[1] +
          "</div>";
        return ymdhtml;
      } catch (error) {
        console.log(error);
        return "<div>忘了时间</div>";
      }
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

<style lang="stylus">
@media (max-width: 540px) {
  .post-date {
    display: none;
  }
}

@media (min-width: 541px) {
  .post-date {
    display: block;
  }
}

.btn {
  background: #97dffd;
  color: #fff;
  font-size: 13px;
  padding: 1px 15px;
  border-radius: 5px;
  border: none;
  transition-property: background-color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  transition-delay: 0s;
  line-height: 2;
  text-decoration: none;
  padding 0.4rem
}

.post-badge {
  position: absolute;
  left: -16px;
  top: 105px;
  border-color: #47456d;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  background-color: #97dffd;
  margin: 5px 0 15px 2px;
  font-size: 14px;
  border-radius: 0 4px 4px 0;
  display: inline-block;
  padding: 7px 11px 7px 32px;
  line-height: 1;

  a {
    color: #ffffff;
  }
}

.blog-box {
  margin-top: 5rem;

  article {
    position: relative;
    padding: 40px;
    background: #fff;
    margin-bottom: 40px;
    border-radius: 5px;

    .lovely-title {
      color: #444;
      font-size: 25px;
      font-weight: 700;
      text-align: center;
    }

    .lovely-content {
      margin-top: 6rem;
    }
  }

  .post-date {
    background-color: #97dffd;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    position: absolute;
    top: -20px;
    left: -30px;
    height: 60px;
    width: 70px;
    padding-top: 10px;
    border-radius: 100px;
    color: #fff;
    text-align: center;
    line-height: 1.1;
  }
}
</style>