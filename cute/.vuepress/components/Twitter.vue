<template>

    <div class="twitter_box">
        <admin />
        {{GetRandomItem(Config.random_text)}}
        <div class="none" v-if="twitter_data.length < 1">
            <span v-text="Config.none_text" />
        </div>

        <el-timeline class="twitter" v-else>

            <transition-group name="fade" enter-active-class="animated pulse" leave-active-class="animated pulse">
                <el-timeline-item :timestamp="FormatGoTime(d.twitter.twitterter.date)" placement="top"
                    class="blog post-type-normal twitter twitter_content_box" :key="'twitter_'+index"
                    v-for="(d,index) in twitter_data">
                    <el-card>
                        <a :href="d.html_url" class="twitter_content" v-html="d.twitter.message" />
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
    import {
        GetPostTime,
        GetDate,
        FormatGoTime,
        GetUrl,
        Istwitter
    } from "../theme/util";

    export default {
        name: "twitter",
        components:{
            Admin
        },
        watch: {
            $route(to, from) {
                this.More();
            }
        },
        data() {
            return {
                p: 0
            };
        },
        computed: {
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
</style>