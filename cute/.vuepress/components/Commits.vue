<template>

  <div class="commits_box">
    {{GetRandomItem(Config.random_text)}}
    <div class="none" v-if="commits_data.length < 1">
      <span v-text="Config.none_text" />
    </div>

    <el-timeline class="commits" v-else>

      <transition-group name="fade" enter-active-class="animated pulse" leave-active-class="animated pulse">
        <el-timeline-item :timestamp="FormatGoTime(d.commit.committer.date)" placement="top"
          class="blog post-type-normal twitter twitter_content_box" :key="'commits_'+index"
          v-for="(d,index) in commits_data">
          <el-card>
            <a :href="d.html_url" class="twitter_content" v-html="d.commit.message" />
          </el-card>
        </el-timeline-item>
      </transition-group>
      <div v-show="commits_data.length > 0" class="post-button text-center">
        <div v-if="!comments_loading">
          <a v-if="has_commit" class="btn" @click="More()">我要看多多啦 »</a>
          <a v-else class="btn">没有啦~</a>
        </div>
        <div v-else>
          <a class="btn">不可以动喔，正在加载呢~</a>
        </div>

      </div>

    </el-timeline>

  </div>

</template>

<script>
  import {
    GetPostTime,
    GetDate,
    FormatGoTime,
    GetUrl,
    IsCommits
  } from "../theme/util";

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
      comments_loading() {
        return this.$store.getters.commits_loading
      },
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
      //console.log(this.$store.getters.commits_loading)
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
        this.$store.dispatch("GetCommitsData", {
          page: this.p,
          per_page: 30
        });
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .commits {
    max-width: 780px;
    margin-top: 1rem;

    .el-card {
      margin-bottom: 1rem;
    }
  }
</style>