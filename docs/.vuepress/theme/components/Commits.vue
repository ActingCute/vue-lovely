<template>
  <div class="commits" v-if="is_commits">
    <transition-group
      name="fade"
      enter-active-class="animated pulse"
      leave-active-class="animated pulse"
    >
      <article
        class="blog post-type-normal twitter twitter_content_box"
        :key="'commits_'+index"
        v-for="(d,index) in commits_data"
      >
        <main class="page">
          <a :href="d.html_url" class="twitter_content" v-text="d.commit.message"/>
          <div class="twitter_time" v-text="FormatGoTime(d.commit.committer.date)"/>
        </main>
      </article>
    </transition-group>
    <div v-show="commits_data.length > 0" class="post-button text-center">
      <a v-if="has_commit" class="btn" @click="More()">我要看多多啦 »</a>
      <a v-else class="btn">没有啦~</a>
    </div>
  </div>
</template>

<script>
import { GetPostTime, GetDate, FormatGoTime, GetUrl, IsCommits } from "../util";

export default {
  name: "commits",
  watch: {
    $route(to, from) {
        this.is_commits = IsCommits(GetUrl());
        this.More();
    }
  },
  data() {
    return {
      p: 0,
      is_commits: false
    };
  },
  computed: {
    need_get_data() {
      return this.$store.getters.need_get_data;
    },
    has_commit() {
      return this.$store.getters.has_commits;
    },
    commits_data() {
      if (this.is_commits) {
        return this.$store.getters.commits;
      } else {
        return [];
      }
    }
  },
  mounted() {
    this.is_commits = IsCommits(GetUrl());
    this.More();
  },
  methods: {
    GetPostTime(d) {
      return GetPostTime(d);
    },
    GetDate(d) {
      return GetDate(d);
    },
    FormatGoTime(d) {
      return FormatGoTime(d);
    },
    More() {
      if (!this.is_commits) {
        return;
      }
      this.p++;
      this.$store.dispatch("GetCommitsData", { page: this.p, per_page: 30 });
    }
  }
};
</script>

<style lang="stylus" scoped>
.commits {
  max-width: 780px;

  .el-card {
    margin-bottom: 1rem;
  }
}
</style>


