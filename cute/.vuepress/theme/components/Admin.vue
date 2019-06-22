<template>
    <div class="adminBox">
        <div v-if="admin_data.user_name">
            Hello {{admin_data.user_name}} !
        </div>
        <el-form v-else :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="账号">
                <el-input v-model="formInline.user_name" ></el-input>
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
    export default {
        name: "cute-admin",
        data() {
            return {
                formInline: {
                    user_name: '',
                    pass_word: ''
                }
            }
        },
        watch: {
            $route(to, from) {
                this.Init();
            }
        },
        computed:{
          admin_data(){
              return this.$store.getters.admin_data
          }  
        },
        mounted() {
            this.Init()
        },
        methods: {
            Init() {

            },
            onSubmit() {
                if (this.formInline.user_name.length < 1 || this.formInline.pass_word.length < 1){
                    return
                }
                this.$store.dispatch("SetAdminData", this.formInline);
            }

        }
    };
</script>

<style lang="stylus" scoped>

</style>