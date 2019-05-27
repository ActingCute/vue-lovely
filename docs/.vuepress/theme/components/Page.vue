<template>
  <div class="blog-box">
    <!-- 过滤后宫,留言板 这些 -->
    <div class="lovely-sidebar" id="Sidebar">
      <Sidebar :items="sidebarItems">
        <slot name="sidebar-top" slot="top"/>
        <slot name="sidebar-bottom" slot="bottom"/>
      </Sidebar>
    </div>

    <div>
      <div id="lovely_blog" class="post_box" v-if="!is_twitter">
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

            <footer class="page-edit">
              <div class="edit-link" v-if="editLink">
                <a :href="editLink" target="_blank" rel="noopener noreferrer">{{ editLinkText }}</a>
                <OutboundLink/>
              </div>
            </footer>

            <div class="page-nav">
              <div class="previous" v-if="prevs.previous">
                <
                <router-link :to="prevs.previous.regularPath">{{prevs.previous.title}}</router-link>
              </div>
              <div class="next" v-if="prevs.next">
                <router-link :to="prevs.next.regularPath">{{prevs.next.title}}</router-link>>
              </div>
            </div>
            <slot name="bottom"/>
          </main>
        </article>

        <div v-if="is_commits">
          <Commits :data="commits_data"/>
        </div>

        <comment></comment>

      </div>

      <div v-else class="twitter_box">
        <Twitter></Twitter>
      </div>
    </div>
  </div>
</template>

<script>
import {
  resolvePage,
  outboundRE,
  endingSlashRE,
  GetPostTag,
  GetPostTime,
  GetPostDate,
  SetSidebarPostion,
  IsTwitter,
  IsCommits,
  GetUrl,
  GetDate,
  GetParam
} from "../util";

import { Getmd5 } from "../util/md5";

import Sidebar from "@theme/components/Sidebar.vue";
import Comment from "@theme/components/Comment.vue";
import Twitter from "@theme/components/Twitter.vue";
import Commits from "@theme/components/Commits.vue";

import Gist from "../util/config";

export default {
  components: {
    Sidebar,
    Comment,
    Twitter,
    Commits
  },
  props: ["sidebarItems"],
  watch: {
    $route(to, from) {
      this.prevs = {
        previous: null,
        next: null
      };
      this.init(to.path);
    }
  },
  computed: {
    commits_data() {
      if (this.is_commits) {
        return this.$store.getters.commits;
      } else {
        return [];
      }
    },
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
    },
    pages() {
      return this.$store.getters.blog_data;
    },
    page() {
      return this.$page;
    },
    prev() {
      const prev = this.$page.frontmatter.prev;
      console.log("prev --- ", this.$page);
      if (prev === false) {
        return;
      } else if (prev) {
        return resolvePage(this.$site.pages, prev, this.$route.path);
      } else {
        return resolvePrev(this.$page, this.sidebarItems);
      }
    },

    next() {
      const next = this.$page.frontmatter.next;
      if (next === false) {
        return;
      } else if (next) {
        return resolvePage(this.$site.pages, next, this.$route.path);
      } else {
        return resolveNext(this.$page, this.sidebarItems);
      }
    },

    editLink() {
      if (this.$page.frontmatter.editLink === false) {
        return;
      }
      const {
        repo,
        editLinks,
        docsDir = "",
        docsBranch = "master",
        docsRepo = repo
      } = this.$site.themeConfig;

      if (docsRepo && editLinks && this.$page.relativePath) {
        return this.createEditLink(
          repo,
          docsRepo,
          docsDir,
          docsBranch,
          this.$page.relativePath
        );
      }
    },

    editLinkText() {
      return (
        this.$themeLocaleConfig.editLinkText ||
        this.$site.themeConfig.editLinkText ||
        `Edit this page`
      );
    }
  },
  mounted() {
    this.init(GetUrl());
  },
  data() {
    return {
      twitter_form: {
        content: ""
      },
      is_own_page: false,
      is_twitter: false,
      is_commits: false,
      prevs: {
        previous: null,
        next: null
      },
      form: {
        name: "",
        pass: ""
      }
    };
  },
  methods: {
    init(url) {
      console.log("this.page -", this.p);
      this.is_twitter = IsTwitter(url);
      this.is_commits = IsCommits(url);
      if (this.is_twitter) {
        this.$store.dispatch("GistInit");
      } else if (this.is_commits) {
        this.$store.dispatch("GetCommitsData", { page: 1, per_page: 30 });
      } else {
        this.FormatPrev();
      }
      if (document.getElementById("Sidebar")) {
        if (document.getElementById("lovely_blog")) {
          window.addEventListener("scroll", SetSidebarPostion, false);
        }
      }
    },
    FormatPrev() {
      //过滤不需要页面
      let post_arr = this.pages;

      let len = post_arr.length;
      if (len == 0) {
        this.prevs = {
          previous: null,
          next: null
        };
        return;
      }

      //查找当前页面位置
      let index = post_arr.findIndex((value, index, arr) => {
        return value.regularPath == this.page.regularPath;
      });

      if (index == -1) {
        this.prevs = {
          previous: null,
          next: null
        };
        return;
      }

      //判断是否存在上一页，下一页

      let is_no_next = index + 1 == len;
      let is_no_previous = index == 0;

      //没有上一页下一页
      if (is_no_next && is_no_previous) {
        console.log("没有上一页下一页");
        return;
      }

      //只有上一页
      if (!is_no_previous && is_no_next) {
        console.log("只有上一页");
        this.prevs = {
          previous: post_arr[index - 1],
          next: null
        };
        return;
      }

      //只有下一页
      if (is_no_previous && !is_no_next) {
        console.log("只有下一页");
        this.prevs = {
          previous: null,
          next: post_arr[index + 1]
        };
        return;
      }

      //两页都有
      if (!is_no_previous && !is_no_next) {
        console.log("两页都有");
        this.prevs = {
          previous: post_arr[index - 1],
          next: post_arr[index + 1]
        };
        return;
      }
    },
    GetPostTag(t) {
      return GetPostTag(t);
    },
    GetDate(d) {
      return GetDate(d);
    },
    GetPostTime(t) {
      return GetPostTime(t);
    },
    GetPostDate(t) {
      return GetPostDate(t);
    },
    getElementToPageTop(el) {
      if (el.parentElement) {
        return this.getElementToPageTop(el.parentElement) + el.offsetTop;
      }
      return el.offsetTop;
    },
    createEditLink(repo, docsRepo, docsDir, docsBranch, path) {
      const bitbucket = /bitbucket.org/;
      if (bitbucket.test(repo)) {
        const base = outboundRE.test(docsRepo) ? docsRepo : repo;
        return (
          base.replace(endingSlashRE, "") +
          `/src` +
          `/${docsBranch}/` +
          (docsDir ? docsDir.replace(endingSlashRE, "") + "/" : "") +
          path +
          `?mode=edit&spa=0&at=${docsBranch}&fileviewer=file-view-default`
        );
      }

      const base = outboundRE.test(docsRepo)
        ? docsRepo
        : `https://github.com/${docsRepo}`;
      return (
        base.replace(endingSlashRE, "") +
        `/edit` +
        `/${docsBranch}/` +
        (docsDir ? docsDir.replace(endingSlashRE, "") + "/" : "") +
        path
      );
    }
  }
};

function resolvePrev(page, items) {
  return find(page, items, -1);
}

function resolveNext(page, items) {
  return find(page, items, 1);
}

function find(page, items, offset) {
  const res = [];
  flatten(items, res);
  for (let i = 0; i < res.length; i++) {
    const cur = res[i];
    if (cur.type === "page" && cur.path === decodeURIComponent(page.path)) {
      return res[i + offset];
    }
  }
}

function flatten(items, res) {
  for (let i = 0, l = items.length; i < l; i++) {
    if (items[i].type === "group") {
      flatten(items[i].children || [], res);
    } else {
      res.push(items[i]);
    }
  }
}
</script>

<style lang="stylus">
@require '../styles/wrapper.styl';

.page {
  padding-bottom: 2rem;
  display: block;
}

.page-edit {
  @extend $wrapper;
  padding-top: 1rem;
  padding-bottom: 1rem;
  overflow: auto;

  .edit-link {
    display: inline-block;

    a {
      color: lighten($textColor, 25%);
      margin-right: 0.25rem;
    }
  }

  .last-updated {
    float: right;
    font-size: 0.9em;

    .prefix {
      font-weight: 500;
      color: lighten($textColor, 25%);
    }

    .time {
      font-weight: 400;
      color: #aaa;
    }
  }
}

.page-nav {
  @extend $wrapper;
  padding-top: 1rem;
  padding-bottom: 0;

  .inner {
    min-height: 2rem;
    margin-top: 0;
    border-top: 1px solid $borderColor;
    padding-top: 1rem;
    overflow: auto; // clear float
  }

  .next {
    float: right;
  }
}

@media (max-width: $MQMobile) {
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