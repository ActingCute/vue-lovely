<template>

    <div class="twitter_box">
        {{GetRandomItem(Config.random_text)}}
        <div class="none" v-if="twitter_data.length < 1">
            <span v-text="Config.none_text" />
        </div>

        <admin />

        <div v-if="admin_data.user_name">
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
                    <el-card>
                        <div v-text="d.content"/>
                    </el-card>
                </el-timeline-item>
            </transition-group>
            <div v-show="twitter_data.length > 0" class="post-button text-center">
                <div v-if="!comments_loading">
                    <a v-if="has_twitter" class="btn" @click="More()">我要看多多啦 »</a>
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
    import Admin from '../theme/components/Admin'
    import Wangeditor from '../theme/components/Wangeditor'
    import {
        TwitterAdd,
        TwitterGet
    } from "../theme/api/twitter"
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
            Wangeditor
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
                new_twitter_data: ""
            };
        },
        computed: {
            admin_data() {
                return this.$store.getters.admin_data
            },
            comments_loading() {
                return this.$store.getters.twitter_loading
            },
            has_twitter() {
                return this.$store.getters.has_twitter;
            },
            twitter_data() {
                return this.$store.getters.twitter_data;
            }
        },
        mounted() {
            this.More();
        },
        methods: {
            catchData(c) {
                this.new_twitter_data = c
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
                TwitterAdd({
                    content: this.new_twitter_data
                }).then(response => {
                    console.log(response)
                })
            }
        }
    };
</script>

<style lang="stylus" scoped>
    .twitter {
        max-width: 780px;
        margin-top: 1rem;

        .el-card {
            margin-bottom: 1rem;
        }

    }

    .tw-submit {
        width: 100%;
        margin-top 10px;
        text-align right
    }
</style>