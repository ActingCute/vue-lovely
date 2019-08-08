<template>
  <div id="wangeditor">
    <img
      class="twitter_img"
      :src="item"
      :key="'img_'+index"
      v-for="(item,index) in img_arr"
      @click="clickImg(item)"
    >
    <Images v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"/>

    <div>
      <el-input type="textarea" :rows="2" placeholder="说点什么好呢" v-model="editorContent"></el-input>
    </div>
    <el-upload
      :limit="9"
      multiple
      class="uploader"
      action="https://up-z0.qiniup.com"
      :data="qiniu"
      :show-file-list="true"
      :file-list="img_arr"
      :on-success="handleImgSuccess"
      :before-upload="beforeImgUpload"
      :on-error="handleError"
    >
      <i class="ico el-icon-picture"></i>
    </el-upload>
    <el-upload
      class="uploader"
      action="https://up-z0.qiniup.com"
      :data="qiniu"
      :show-file-list="true"
      :on-success="handleVdoSuccess"
      :before-upload="beforeVdoUpload"
      :on-error="handleError"
    >
      <i class="ico el-icon-video-camera-solid"></i>
    </el-upload>
  </div>
</template>
<script>
import { QiniuGetToken } from "../api/qiniu";
import Images from "./Images";

export default {
  name: "Wangeditor",
  components: {
    Images
  },
  computed: {
    is_mb() {
      return this.$store.getters.is_mb;
    }
  },
  data() {
    return {
      editor: null,
      editorContent: "",
      qiniu: {
        action: "https://up-z2.qiniup.com",
        domain: "https://lovely.haibarai.com/",
        token: "",
        key: ""
      },
      resource: "",
      img_arr: [],
      vdo: "",
      showImg: false,
      imgSrc: ""
    };
  },
  props: ["catchData"], // 接收父组件的方法
  watch: {
    editorContent(new_val, old_val) {
      this.catchData(new_val, this.img_arr, this.vdo);
    },
    img_arr(new_val, old_r) {
      this.catchData(this.editorContent, new_val, this.vdo);
    },
    vdo(new_val, old_r) {
      this.catchData(this.editorContent, this.img_arr, new_val);
    }
  },
  mounted() {},
  methods: {
    clickImg(e) {
      this.showImg = true;
      this.imgSrc = e;
    },
    viewImg() {
      this.showImg = false;
    },
    beforeImgUpload(file) {
      //console.log(file.type);
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      if (!isJPG && !isPNG) {
        this.Msg("上传图片只能是 JPG/ PNG 格式!", 2);
        return;
      }
      //console.log(file.name);
      const _self = this;
      return new Promise((resolve, reject) => {
        QiniuGetToken()
          .then(response => {
            //console.log("upload -- ", response);
            let code = response.Result;
            switch (code) {
              case 10000:
                _self._data.qiniu = response.Data;
                break;
              default:
                _self.Msg(code + ":获取上传信息失败，将不能上传图片", 2);
                return;
            }
            resolve(true);
          })
          .catch(err => {
            console.error(err);
            reject(false);
          });
      });
    },
    handleImgSuccess(response, file, fileList) {
      let src = "https://" + this.qiniu.domain + "/" + response.key;
      this.resource += '<li class="twitter_img"><img src="' + src + '"/></li>';
      //console.log(this.resource);
      this.img_arr.push(src);
    },
    beforeVdoUpload(file) {
      //console.log(file.type);
      const isMP4 = file.type === "video/mp4";
      if (!isMP4) {
        this.Msg("上传视频只能是 MP4 格式!", 2);
        return;
      }
      //console.log(file.name);
      const _self = this;
      return new Promise((resolve, reject) => {
        QiniuGetToken()
          .then(response => {
            //console.log("upload -- ", response);
            let code = response.Result;
            switch (code) {
              case 10000:
                _self._data.qiniu = response.Data;
                break;
              default:
                _self.Msg(code + ":获取上传信息失败，将不能上传图片", 2);
                return;
            }
            resolve(true);
          })
          .catch(err => {
            console.error(err);
            reject(false);
          });
      });
    },
    handleVdoSuccess(response, file, fileList) {
      this.vdo = "https://" + this.qiniu.domain + "/" + response.key;
    },
    handleError(err, file, fileList) {
      console.error(err);
      this.Msg(err);
    }
  }
};
</script>
<style lang="stylus" scoped>
#wangeditor {
  width: 100%;
}

.ico {
  font-size: 25px;
  padding: 10px;
}

.uploader {
  float: left;
  font-size: 18px;
}
</style>