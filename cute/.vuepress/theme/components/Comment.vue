<template>
  <section class="comments" v-if="need_comment">

    <!-- <h3 class="comment_data_length_box">
      已经有
      <span class="comment_data_length" v-text="comment_data.length" />层啦!
    </h3> -->
    <article class="comment" v-for="(item,index) in comment_data">
      <div class="meta">
        <img :src="GetLeiMu(item.user.uid)" class="avatar">
        <h3>
          <a href="#" class="author">{{item.user.name}}</a>
        </h3>
        <a href="#" class="date">
          <time datetime="2015-01-01" v-text="FormatGoTime(item.comment.update_time)" />
        </a>
      </div>
      <div class="content">
        <span v-html="item.comment.content"></span>
      </div>
    </article>

    <no-ssr>
      <mavon-editor placeholder="快点回复人家~等你喔" codeStyle="tomorrow-night" :toolbars="toolbars" :subfield="false"
        ref="lovely_markdown" @imgAdd="QiniuUploadImagesForBase64" v-model="new_comment" />

    </no-ssr>

    <div>
      <p>嗨呀咕~</p>
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="你名字" prop="name">
          <el-input size="mini" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="博客(回踩)" prop="website">
          <el-input size="mini" v-model="ruleForm.website"></el-input>
        </el-form-item>

        <el-form-item style="margin-right: 0px;" v-loading="qiniu_data.in_upload || in_submit">
          <el-button size="mini" @click="CommentAdd">发送可爱</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
  import Axios from "axios";
  import NoSsr from 'vue-no-ssr'

  import {
    GetLeiMu
  } from "../util";
  import {
    CommentGet,
    CommentAdd
  } from "../api/comment";
  import {
    QiniuGetToken
  } from "../api/qiniu";

  export default {
    name: "comment",
    components: {
      NoSsr
    },
    watch: {
      $route(to, from) {
        this.Init();
      }
    },
    data() {
      return {
        need_comment: false,
        old_url: "",
        QiniuUploadPath: "https://up-z0.qiniup.com",
        new_comment: "",
        in_submit: false,
        ruleForm: {
          name: "",
          website: ""
        },
        rules: {
          name: [{
            required: true,
            message: "我就是要你填这个",
            trigger: "blur"
          }]
        },
        msg: [
          "咦~你好像忘了什么了?",
          "？？？看不懂中文",
          "你不可以这样子！！！",
          "你再这样人家就要生气了哼!",
          "走开走开不理你了~"
        ],
        submit_num: 0,
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          // header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          // superscript: true, // 上角标
          // subscript: true, // 下角标
          //quote: true, // 引用
          // ol: true, // 有序列表
          // ul: true, // 无序列表
          // link: true, // 链接
          imagelink: true, // 图片链接
          // code: true, // code
          // table: true, // 表格
          // fullscreen: true, // 全屏编辑
          // readmodel: true, // 沉浸式阅读
          // htmlcode: true, // 展示html源码
          // help: true, // 帮助
          // /* 1.3.5 */
          // undo: true, // 上一步
          // redo: true, // 下一步
          trash: true, // 清空
          // save: true, // 保存（触发events中的save事件）
          // /* 1.4.2 */
          // navigation: true, // 导航目录
          // /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          // /* 2.2.1 */
          subfield: false, // 单双栏模式
          preview: true, // 预览
        }
      };
    },
    computed: {
      qiniu_data() {
        return this.$store.getters.qiniu_data;
      },
      url() {
        return this.$store.getters.web_data.url;
      },
      comment_data() {
        return this.$store.getters.comment_data;
      }
    },
    mounted: function () {
      this.Init();
    },
    methods: {
      //初始化
      Init() {
        let now_url = this.GetUrl()
        this.need_comment = this.IsBlog(now_url)
        if (now_url.indexOf("Message") != -1) {
          this.need_comment = true
        }
        if (now_url != this.old_url && this.need_comment) {
          this.old_url = now_url
          let user_data = this.Storage.getItem("user_data");
          if (user_data) {
            this.$store.dispatch("SetUserData", user_data);
            this.ruleForm = user_data;
          }
          this.new_comment =
            "## 很认真的想了想\n### 可是不知道说啥\n# 走开走开：很太\n![comment.png](http://blog.deskmate.cc/FtNH-0VgU8lNaIq7WzaWQzmxadCM)";
          this.$store.dispatch("SetCommentData", now_url);
        }
      },
      //获取当前页评论
      GetLeiMu(id) {
        return GetLeiMu(id);
      },
      ShowMsg() {
        this.Msg(this.msg[this.submit_num], 2);
        this.submit_num++;
        this.submit_num =
          this.submit_num > this.msg.length - 1 ?
          this.msg.length - 1 :
          this.submit_num;
      },
      CommentAdd() {
        let content = this.$refs.lovely_markdown.d_render;
        if (content.length < 1) {
          this.ShowMsg();
          return;
        }
        this.$refs["ruleForm"].validate(valid => {
          if (valid) {
            this.submit_num = 0;
            this.in_submit = true;

            //保存用户信息到本地
            let user_data = {
              id: "",
              name: this.ruleForm.name,
              email: "",
              website: this.ruleForm.website
            };

            this.Storage.setItem("user_data", user_data);
            this.$store.dispatch("SetUserData", null);
            this.$store.dispatch("SetUserData", user_data);

            this.Msg("正在给主人通知~", 3);
            let data = {
              content,
              email: "string", //暂时不要
              father_id: 0,
              name: this.ruleForm.name,
              son_id: 0,
              url: this.GetUrl(),
              website: this.ruleForm.website
            };

            CommentAdd(data).then(response => {
              this.in_submit = false;
              let code = response.Result;
              switch (code) {
                case this.Code.SUCCESS:
                  this.Msg("主人已经收到啦嘻嘻~");
                  this.comment_data.push(response.Data);
                  break;
                default:
                  this.Msg("code:" + code + " 哎呀！提交评论失败了", 2);
              }
              //console.log(response);
            });
          } else {
            this.ShowMsg();
            return;
          }
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
                    let newPic =
                      "http://" + response.Data.domain + "/" + res.data.key;
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
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
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

  .comments article.comment .meta a.author,
  .comments article.comment .meta a.date {
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
    max-width: 100%
  }

  .comments article.comment .content:after,
  .comments article.comment .content:before {
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

  .comment_data_length_box {
    margin-bottom: 20px;

    .comment_data_length {
      color: blue;
    }
  }

  .el-form {
    float: right;

    .el-form-item {
      margin-left: 15px;
      display: inline-block;

      .el-input {
        max-width: 200px;
      }
    }
  }


  .markdown-body>.shadow {
    display none
  }
</style>