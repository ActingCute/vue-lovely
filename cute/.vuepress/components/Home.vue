<template>
  <div class="blog-box">
    <el-row>
      <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
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
              <router-link class="btn" :to="data.path+'#actingcute_anchor'">我要看全部啦 »</router-link>
            </div>
          </div>
        </article>
      </el-col>

      <el-col class="sidebar-box" :xs="0" :sm="7" :md="7" :lg="7" :xl="7">
        <Sidebar :page_nav="[]" class="sidebar"/>
      </el-col>
    </el-row>

    <el-collapse class="nav-el-collapse">
      <el-collapse-item :title="$site.description" name="1">
        <Sidebar class="sidebar" :page_nav="[]"/>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import {
  GetPostTag,
  GetPostTime,
  GetPostDate,
  SetSidebarPostion,
  IsBlog
} from "../theme/util";

import Sidebar from "@theme/components/Sidebar.vue";

export default {
  name: "blog",
  components: {
    Sidebar
  },
  computed: {
    datas() {
      return this.blogData;
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
      //window.addEventListener("scroll", SetSidebarPostion, false);
    }
  },
  methods: {}
};
</script>

<style lang="stylus">
@media (max-width: 540px) {
  .home {
    padding: 0;
  }
}

.home {
  margin: 0px auto;
  display: block;
  min-height: 600px;

  .hero {
    text-align: center;

    img {
      max-width: 100%;
      max-height: 280px;
      display: block;
      margin: 3rem auto 1.5rem;
    }

    h1 {
      font-size: 3rem;
    }

    h1, .description, .action {
      margin: 1.8rem auto;
    }
  }
}

@media (max-width: 360) {
  .home {
    .features {
      flex-direction: column;
    }

    .feature {
      max-width: 100%;
      padding: 0 2.5rem;
    }
  }
}

@media (max-width: 360) {
  .home {
    padding-left: 1.5rem;
    padding-right: 1.5rem;

    .hero {
      img {
        max-height: 210px;
        margin: 2rem auto 1.2rem;
      }

      h1 {
        font-size: 2rem;
      }

      h1, .description, .action {
        margin: 1.2rem auto;
      }

      .description {
        font-size: 1.2rem;
      }

      .action-button {
        font-size: 1rem;
        padding: 0.6rem 1.2rem;
      }
    }

    .feature {
      h2 {
        font-size: 1.25rem;
      }
    }
  }
}
</style>