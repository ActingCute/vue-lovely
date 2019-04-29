<template>
  <section class="comments">
    <h1>Comments</h1>
    <article class="comment" v-for="(item,index) in comment_data">
      <div class="meta">
        <img :src="GetLeiMu(item.user.id)" class="avatar">
        <h3>
          <a href="#" class="author">{{item.user.name}}</a>
        </h3>
        <a href="#" class="date">
          <time datetime="2015-01-01">{{item.comment.update_time}}</time>
        </a>
      </div>
      <div class="content">
        <span v-html="item.comment.content"></span>
      </div>
    </article>

    <mavon-editor ref="lovely_markdown" @imgAdd="QiniuUploadImagesForBase64" v-model="new_comment"/>
    <div class="comment_submit" v-loading="qiniu_data.in_upload">
      <el-button>发送可爱</el-button>
    </div>
  </section>
</template>

<script>
import Axios from "axios";

import { GetLeiMu, GetUrl } from "../util";
import { CommentGet } from "../api/comment";
import { QiniuGetToken } from "../api/qiniu";

export default {
  name: "comment",
  data() {
    return {
      QiniuUploadPath: "http://up-z0.qiniup.com",
      comment_data: [],
      new_comment: ""
    };
  },
  computed: {
    qiniu_data() {
      return this.$store.getters.qiniu_data;
    }
  },
  mounted: function() {
    this.new_comment = "## 很认真的想了想\n### 可是不知道说啥";
    this.CommentGet();
  },
  methods: {
    //获取当前页评论
    GetLeiMu(id) {
      return GetLeiMu(id);
    },
    CommentGet() {
      let url = GetUrl();
      CommentGet({
        url
      }).then(response => {
        let code = response.Result;
        switch (code) {
          case this.Code.SUCCESS:
            this.comment_data = response.Data;
            break;
          default:
            this.Msg("code:" + code + " 获取评论失败", 2);
        }
        console.log(response);
      });
    },
    QiniuUploadImagesForBase64(pos, $file) {
      console.log(this.$store);
      //获取上传的key
      let _this = this;
      QiniuGetToken($file.name)
        .then(response => {
          let code = response.Result;
          switch (code) {
            case this.Code.SUCCESS:
              //保存七牛domain
              response.Data.in_upload = true;
              this.$store.dispatch("SetQiNiuData", null);
              this.$store.dispatch("SetQiNiuData", response.Data);
              //上传成功后更新预览用到
              //转化为七牛合法的base
              let imageData = $file.miniurl;
              imageData = imageData.replace("data:image/webp;base64,", "");
              imageData = imageData.replace("data:image/jpeg;base64,", "");
              imageData = imageData.replace("data:image/png;base64,", "");
              //let newPic =
                //"http://" + response.Data.domain + "/" + response.Data.key; //先保存好当前的七牛路径，若上传成功则使用它  自定义名字突然用不了...
              let url =
                this.QiniuUploadPath + "/putb64/" + this.fileSize(imageData);
              //将图片上传七牛
              Axios({
                url,
                method: "POST",
                data: imageData,
                headers: {
                  "Content-Type": "application/octet-stream",
                  Authorization: "UpToken " + response.Data.token
                }
              })
                .then(res => {
                  // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
                  // $vm.$img2Url 详情见本页末尾
                  let newPic = "http://" + response.Data.domain + "/" + res.data.key
                  console.log("res --- ", res, newPic);
                  _this.$refs.lovely_markdown.$img2Url(pos, newPic);
                  response.Data.in_upload = false;
                  _this.$store.dispatch("SetQiNiuData", null);
                  _this.$store.dispatch("SetQiNiuData", response.Data);
                })
                .catch(error => {
                  _this.Msg(code + "上传失败", 1);
                  console.error(error);
                });
              return;
            default:
              _this.Msg(code + ":获取上传信息失败，不能上传图片", 2);
              return;
          }
        })
        .catch(err => {
          console.log(err);
          _this.Msg("获取上传信息失败，不能上传图片", 2);
        });
    },
    fileSize(str) {
      let fileSize;
      if (str.indexOf("=") > 0) {
        let indexOf = str.indexOf("=");
        str = str.substring(0, indexOf); //把末尾的=号去掉
      }
      fileSize = parseInt(str.length - (str.length / 8) * 2);
      return fileSize;
    }
  }
};
</script>



<style lang="stylus" scoped>
h1, h2, h3, h4, h5, h6 {
  font-family: 'Merriweather', serif;
  font-weight: 700;
}

.comments {
  max-width: 780px;
}

.comments article.comment {
  position: relative;
  margin-bottom: 30px;
}

.comments article.comment .meta {
  height: 60px;
  margin-bottom: 17px;
  position: relative;
}

.comments article.comment .meta img.avatar {
  position: absolute;
  border-radius: 30px;
  width: 60px;
  height: 60px;
  left: 0px;
  top: 0px;
}

.comments article.comment .meta a.author, .comments article.comment .meta a.date {
  text-decoration: none;
  position: absolute;
}

.comments article.comment .meta a.author {
  color: inherit;
  left: 73px;
  line-height: 29px;
  padding: 0px 7px;
  top: 3px;
}

.comments article.comment .meta a.date {
  font-size: 14px;
  line-height: 19px;
  color: #666;
  left: 80px;
  top: 35px;
}

.comments article.comment .content {
  background-color: #fff;
  border: 1px solid #dadada;
  border-radius: 4px;
  padding: 22px 25px;
  position: relative;
}

.comments article.comment .content:after, .comments article.comment .content:before {
  bottom: 100%;
  left: 30px;
  border: solid transparent;
  content: ' ';
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.comments article.comment .content:after {
  border-color: rgba(255, 255, 255, 0);
  border-bottom-color: #fff;
  border-width: 12px;
  margin-left: -12px;
}

.comments article.comment .content:before {
  border-color: rgba(245, 47, 47, 0);
  border-bottom-color: #dadada;
  border-width: 13px;
  margin-left: -13px;
}

.comment_submit {
  float: right;
}
</style>