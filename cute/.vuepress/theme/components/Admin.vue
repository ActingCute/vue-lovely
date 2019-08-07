<template>
  <div class="adminBox" v-show="is_login">
    <div v-show="admin_data.user_name">Hello {{admin_data.user_name}} !</div>
    <el-form v-show="!admin_data.user_name" :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="账号">
        <el-input v-model="formInline.user_name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formInline.pass_word"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">开始</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { GetUrl } from '../util';
export default {
  name: "cute-admin",
  data() {
    return {
      formInline: {
        user_name: "",
        pass_word: ""
      },
      is_login: false
    };
  },
  watch: {
    $route(to, from) {
      this.Init();
    }
  },
  computed: {
    admin_data() {
      return this.$store.getters.admin_data;
    }
  },
  mounted() {
    this.Init();
  },
  methods: {
    Init() {
        let url = location.href
        if (url.indexOf("login") != -1){
            this.is_login = true
        }
    },
    onSubmit() {
      if (
        this.formInline.user_name.length < 1 ||
        this.formInline.pass_word.length < 1
      ) {
        return;
      }
      this.$store.dispatch("SetAdminData", this.formInline);
    }
  }
};
</script>

<style lang="stylus" scoped></style>