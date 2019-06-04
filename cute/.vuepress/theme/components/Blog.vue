<template>
  <div class="blog-box">
    <div id="lovely_blog" class="post_box">
      <article class="blog post-type-normal">
        <main class="page">
          <slot name="top"/>
          <div class="post-date">
            <span v-html="GetPostTime(lastUpdated)"></span>
          </div>
          <div class="post-badge">
            <span>
              <a href="#">
                <span v-text="GetPostTag(meta)"></span>
              </a>
            </span>
          </div>
          <h1 class="lovely-title">{{title}}</h1>

          <div class="page_tag_box">
            <div class="last-updated page_tag" v-if="lastUpdated">
              <span class="post-time">
                <span class="post-meta-item-icon">
                  <i class="fa fa-calendar-o"></i>
                </span>
                <span class="post-meta-item-text">{{lastUpdatedText}}</span>
                <span v-text="GetPostDate(lastUpdated)"></span>
              </span>
            </div>

            <div class="page_count page_tag">
              <span>阅读量:</span>
              <span v-text="page_count.count"/>
            </div>
          </div>

          <Content/>
        </main>
      </article>
      <Comment/>
    </div>
  </div>
</template>

<script>
import Comment from "@theme/components/Comment.vue";

export default {
  name: "blog",
  components:{
      Comment
  },
  computed: {
    page_count() {
      return this.$store.getters.count_data.page_count;
    },
    lastUpdated() {
      return this.$page.lastUpdated;
    },
    title() {
      return this.$page.title;
    },
    meta() {
      return this.$page.frontmatter.meta;
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
  data() {
    return {};
  },
  mounted() {}
};
</script>

<style lang="stylus">

.page {
  padding-bottom: 2rem;
  display: block;
}





@media (max-width: 360) {
  .page-edit {
    .edit-link {
      margin-bottom: 0.5rem;
    }
    .last-updated {
      font-size: 0.8em;
      float: none;
      text-align: left;
    }
  }
}

.blog-box {
  position: relative;
  min-height: 500px;
}

// 上一页下一页
.page-nav {
  .previous {
    float: left;
  }

  .next {
    float: right;
  }

  a {
    position: relative;
    font-size: 14px;
    color: #555;
    border-bottom: none;
  }
}

.page_tag_box {
  width: 100%;
  text-align: center;

  .page_tag {
    display: inline-block;
  }
}

.twitter {
  .twitter_time {
    font-size: 15px;
    float: right;
    color: #999999;
  }

  .twitter_content {
    color: #000;
    margin: 10px;
    padding-left: 30px;
  }
}

.twitter_form {
  margin: 0 auto;
  max-width: 620px;

  .bnt {
    float: right;
  }
}
</style>
