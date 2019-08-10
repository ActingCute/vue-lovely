<template>
  <div class="twitter_box">
    <div class="random_text">{{GetRandomItem(Config.random_text)}}</div>

    <div class="none" v-if="twitter_data.length < 1">
      <span v-text="Config.none_text" />
    </div>

    <admin />

    <div class="send_box" v-if="admin_data.user_name">
      <Wangeditor :catchData="catchFuncData" />
      <div class="tw-submit">
        <el-button @click="TwitterAdd">发送</el-button>
      </div>
    </div>

    <el-timeline class="twitter" v-if="twitter_data.length > 0">
      <transition-group name="fade" enter-active-class="animated pulse" leave-active-class="animated pulse">
        <el-timeline-item :timestamp="FormatGoTime(d.update_time)" placement="top"
          class="blog post-type-normal twitter twitter_content_box" :key="'twitter_'+index"
          v-for="(d,index) in twitter_data">
          <article class="article">
            <div class="tw_content" v-text="GetContent(d.content)" />

            <div v-if="GetImg(d.content).length > 0">

              <div @click="show(index,v_index)" class="tw_img" :src="src" :key="src"
                v-for="(src,v_index) in GetImg(d.content)"
                v-bind:style="{ 'background': 'url('+src+')','height':SetImgWidth(this),'width':SetImgWidth(this)}" />

              <viewer v-show="false" :images="GetImg(d.content)">
                <img :id="'images_'+index+'_'+v_index" :src="src" :key="src"
                  v-for="(src,v_index) in GetImg(d.content)" />
              </viewer>

            </div>

            <div v-else-if="GetVod(d.content).length > 0">
              <dplayer class="dplayer" :url="GetVod(d.content)" />
            </div>
          </article>
        </el-timeline-item>
      </transition-group>
      <div v-show="twitter_data.length > 0" class="post-button text-center">
        <div v-show="!comments_loading">
          <a v-show="has_twitter" class="btn" @click="More()">我要看多多啦 »</a>
          <a v-show="!has_twitter" class="btn">没有啦~</a>
        </div>
        <div v-show="comments_loading">
          <a class="btn">不可以动喔，正在加载呢~</a>
        </div>
      </div>
    </el-timeline>

  </div>
</template>

<script>
  import Admin from "../theme/components/Admin";
  import Wangeditor from "../theme/components/Wangeditor";
  import dplayer from "../components/dplayer";

  import {
    TwitterAdd,
    TwitterGet
  } from "../theme/api/twitter";
  import {
    GetPostTime,
    GetDate,
    FormatGoTime,
    GetUrl,
    Istwitter
  } from "../theme/util";

  export default {
    name: "twitter",
    components: {
      Admin,
      Wangeditor,
      dplayer
    },
    watch: {
      $route(to, from) {
        this.More();
      }
    },
    data() {
      return {
        p: 0,
        catchFuncData: this.catchData,
        new_twitter_data: "",
        resource: "",
        showImg: false,
        imgSrc: "",
        img_arr: [],
        vdo: "",
        img_height: "150px"
      };
    },
    computed: {
      admin_data() {
        return this.$store.getters.admin_data;
      },
      comments_loading() {
        return this.$store.getters.twitter_loading;
      },
      has_twitter() {
        return this.$store.getters.has_twitter;
      },
      twitter_data() {
        return this.$store.getters.twitter_data;
      }
    },
    mounted() {
      if (this.twitter_data.length < 1) {
        this.More();
      }
    },
    methods: {
      GetContent(d) {
        //console.log(d);
        try {
          let dj = JSON.parse(d);
          return dj.content;
        } catch (err) {
          //console.error(err);
          return "啊啊啊！不知道说了啥~";
        }
      },
      GetImg(d) {
        try {
          let dj = JSON.parse(d);
          return dj.img_arr;
        } catch (err) {
          //console.error(err);
          return [];
        }
      },
      GetVod(d) {
        try {
          let dj = JSON.parse(d);
          return dj.vdo;
        } catch (err) {
          //console.error(err);
          return "";
        }
      },
      catchData(c, img, vdo) {
        //console.log(img, vdo);
        this.vdo = vdo;
        this.img_arr = img;
        this.new_twitter_data = c;
      },
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
        this.p++;
        this.$store.dispatch("GettwitterData", {
          cur: this.p,
          per: 30
        });
      },
      TwitterAdd() {
        if (
          this.new_twitter_data.length > 0 ||
          this.img_arr.length > 0 ||
          this.vdo.length > 0
        ) {
          let tw_data = {
            img_arr: this.img_arr,
            vdo: this.vdo,
            content: this.new_twitter_data
          };
          let c = JSON.stringify(tw_data);
          TwitterAdd({
            content: c
          }).then(response => {
            //console.log(response);
          });
        } else {
          this.Msg("主人，什么都没有喔i~", 2);
        }
      },
      clickImg(e) {
        this.showImg = true;
        // 获取当前图片地址
        this.imgSrc = e;
      },
      viewImg() {
        this.showImg = false;
      },
      SetImgWidth() {
        let ti = document.getElementsByClassName("tw_img");
        if (ti[0]) {
          if (ti[0].offsetWidth) {
            this.img_height = ti[0].offsetWidth / 20 + "rem";
            return this.img_height;
          }
        }
        return "15rem";
      },
      show(index, v_index) {
        
        const viewer = this.$el.querySelector('#images_' + index + '_' + v_index)
        if (viewer) {
          viewer.click()
        } else {
          console.error("人家找不到图片啦")
        }

      }
    }
  };
</script>

<style lang="stylus" scoped>
  .twitter {
    max-width: 780px;
    width: 100%;
    height: 100%;

    .article {
      margin-bottom: 1rem;
      width: 90%;
      height: 100%;
      margin-top: 0.5rem;

      .tw_img {
        background-repeat: no-repeat !important;
        background-position: center center !important;
        background-size: cover !important;
        width: 20%;
        cursor: pointer;
        display: inline-block;
        margin: 2%;
      }

      .tw_content {
        color: #666;
        font-size: 1rem;
        padding: 1rem;
      }
    }
  }

  .tw-submit {
    width: 100%;
    margin-top: 10px;
    text-align: right;
  }

  .send_box {
    margin-bottom: 200px;
  }

  .dplayer {
    max-width: 90%;
  }

  .adminBox {
    margin-top: 3rem;
  }

  .random_text {
    margin-bottom: 5rem;
  }
</style>