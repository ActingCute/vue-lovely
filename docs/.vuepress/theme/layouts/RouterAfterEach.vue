<template>

</template>

<script>
    //处理一些路由跳转的逻辑
    import {
        GetUrl,
        IsBlog
    } from '../util'

    export default {
        name: "router_after_each",
        computed: {
            url() {
                return this.$store.getters.web_data.url;
            }
        },
        mounted: function () {
            this.$router.afterEach((r) => {
                this.init()
                this.SetUrl(r.path)
            });
            this.init()
            this.SetUrl()
        },
        methods: {
            init() {
                //博客数据
                let post_arr = this.$site.pages.filter(
                    item =>
                    item.regularPath != "/History/" &&
                    item.regularPath != "/Harem/" &&
                    item.regularPath != "/Message/" &&
                    item.regularPath != "/Home/" &&
                    item.regularPath != "/"
                );
                this.$store.dispatch("SetBlogData", post_arr);

            },
            SetUrl(url) {
                if (url) {} else {
                    url = GetUrl();
                }
                this.$store.dispatch("SetWebData", null);
                this.$store.dispatch("SetWebData", {
                    url
                });


                if (url != "/") {
                    //除了首页，其他地方应该获取评论
                    this.$store.dispatch("SetCommentData", url);
                }
                //获取浏览数
                this.$store.dispatch("SetCountData", url);
            }
        }
    }
</script>