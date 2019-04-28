<template>
  <div class="blog-box">
    <!-- 过滤后宫,留言板 这些 -->
    <div class="lovely-sidebar" id="Sidebar">
      <Sidebar :items="sidebarItems">
        <slot name="sidebar-top" slot="top" />
        <slot name="sidebar-bottom" slot="bottom" />
      </Sidebar>
    </div>

    <article class="blog post-type-normal" id="lovely_blog">
      <main class="page">
        <slot name="top" />
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

        <div class="last-updated" v-if="lastUpdated">
          <span class="post-time">
            <span class="post-meta-item-icon">
              <i class="fa fa-calendar-o"></i>
            </span>
            <span class="post-meta-item-text">{{lastUpdatedText}}</span>
            <span v-text="GetPostDate(lastUpdated)"></span>
          </span>
        </div>

        <Content />

        <footer class="page-edit">
          <div class="edit-link" v-if="editLink">
            <a :href="editLink" target="_blank" rel="noopener noreferrer">{{ editLinkText }}</a>
            <OutboundLink />
          </div>
        </footer>

        <div class="page-nav" v-if="prev || next">
          <p class="inner">
            <span v-if="prev" class="prev">
              ←
              <router-link v-if="prev" class="prev" :to="prev.path">{{ prev.title || prev.path }}</router-link>
            </span>

            <span v-if="next" class="next">
              <router-link v-if="next" :to="next.path">{{ next.title || next.path }}</router-link>→
            </span>
          </p>
        </div>
        <slot name="bottom" />
      </main>
    </article>
  </div>
</template>

<script>
  import {
    resolvePage,
    outboundRE,
    endingSlashRE,
    GetPostTag,
    GetPostTime,
    GetPostDate
  } from "../util";
  import Sidebar from "@theme/components/Sidebar.vue";

  export default {
    components: {
      Sidebar
    },
    props: ["sidebarItems"],

    computed: {
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

      prev() {
        const prev = this.$page.frontmatter.prev;
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

    mounted: function () {
      if (document.getElementById("Sidebar")) {
        window.addEventListener("scroll", this.SetSidebarPostion, false);
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
      SetSidebarPostion() {
        let topScroll = document.documentElement.scrollTop; //滚动的距离,距离顶部的距离
        let bignav = document.getElementById("Sidebar"); //获取到导航栏id
        if (topScroll > 500) {
          let w = document.getElementById('lovely_blog').offsetWidth
          bignav.style.marginTop = topScroll - 550 + 'px'
          bignav.style.marginLeft = 25 + 'px'
        } else {
          bignav.style.marginTop = 0
          bignav.style.position = "static";
        }
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

        const base = outboundRE.test(docsRepo) ?
          docsRepo :
          `https://github.com/${docsRepo}`;
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
    position: relative
  }
</style>