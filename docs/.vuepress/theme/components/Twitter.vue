<template>
  <div>
    <article class="blog post-type-normal">
      <main class="page">
        <Content/>
        <el-form
          v-show="!is_login && is_own_page"
          :inline="true"
          :model="form"
          class="demo-form-inline"
        >
          <el-form-item label="Id">
            <el-input v-model="form.name" placeholder="你的ID啦"></el-input>
          </el-form-item>
          <el-form-item label="Pass">
            <el-input type="password" v-model="form.pass" placeholder="你的秘密"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="LoginSubmit">开启心情</el-button>
          </el-form-item>
        </el-form>

        <el-form v-if="is_login" :model="twitter_form" class="twitter_form">
          <el-form-item>
            <el-input
              type="textarea"
              :rows="2"
              v-model="twitter_form.content"
              placeholder="今天的心情还好吗?"
            ></el-input>
          </el-form-item>
          <el-form-item class="bnt">
            <el-button type="primary" @click="SentTwitter">现在心情</el-button>
          </el-form-item>
        </el-form>
      </main>
    </article>

    <transition-group name="fade" enter-active-class="animated pulse" leave-active-class="animated pulse">
      <article
        class="blog post-type-normal twitter twitter_content_box"
        v-for="(item, index) in twitter_data"
        :key="'twitter_'+index"
      >
        <main class="page">
          <slot name="top"/>
          <div class="post-date">
            <span v-html="GetPostTime(item.time)"></span>
          </div>
          <div class="twitter_content" v-text="item.content"/>
          <div class="twitter_time" v-text="GetDate(item.time)"/>
        </main>
        
      </article>
    </transition-group>
  </div>
</template>

<script>
import { GetPostTime, IsTwitter, GetUrl, GetDate, GetNowDate } from "../util";
import { GistModify} from "../api/gist";
import Gist from "../util/config"
import {Getmd5} from "../util/md5"

export default {
  name: "twitter",
  watch: {
    $route(to, from) {
      this.is_twitter = IsTwitter(to.path);
      this.$store.dispatch("SetIsTwitter", this.is_twitter);
      if (this.is_twitter) {
        this.$store.dispatch("GistInit");
      }
      this.IsOwnPage();
    }
  },
  computed: {
    is_login() {
      return this.$store.getters.is_login;
    },
    twitter_data() {
      return this.$store.getters.gist_twitter_data;
    }
  },
  data() {
    return {
      twitter_form: {
        content: ""
      },
      is_own_page: false,
      is_twitter: false,
      form: {
        name: "",
        pass: ""
      }
    };
  },
  mounted: function() {
    this.is_twitter = IsTwitter(GetUrl());
    this.$store.dispatch("SetIsTwitter", this.is_twitter);
    if (this.is_twitter) {
      this.$store.dispatch("GistInit");
    }
    this.IsOwnPage();
  },
  methods: {
    LoginSubmit() {
      if (this.form.name == Gist.name && this.form.pass == Gist.password) {
        let love_md5 = Getmd5(Gist.name, Gist.password);
        this.Storage.setItem("lovely_user", love_md5);
        this.$store.dispatch("SetLoginData",true);
      }
    },
    IsOwnPage() {
      let href = location.href;
      this.is_own_page = href.indexOf("login") != -1;
    },
    GetPostTime(t) {
      return GetPostTime(t);
    },
    GetDate(t) {
      return GetDate(t);
    },
    SentTwitter() {
      let old_datas = this.twitter_data;
      let new_datas = [];
      old_datas.forEach(od => {
        new_datas.push(od);
      });
      let new_data = {
        user: "ActingCute酱",
        time: new Date(),
        content: this.twitter_form.content
      };
      new_datas.push(new_data);
      let data = {
        description: "lovely json",
        public: true,
        files: {
          "lovely.json": {
            content: '{"twitter": ' + JSON.stringify(new_datas) + "}"
          }
        }
      };
      GistModify(data).then(response => {
        if (response){
            this.$store.dispatch("GistInit");
        }  
      });
    }
  }
};
</script>

<style lang="stylus" scope="this api replaced by slot-scope in 2.5.0+">
  .twitter_content_box{
    padding: 1rem
  }
</style>

