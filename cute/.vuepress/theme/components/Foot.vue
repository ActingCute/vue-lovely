<template>
    <div class="lovely-foot-box">
        <div class="lovely-foot">
            <transition name="bounce">
                <img v-if="show"
                     v-bind:style="{marginTop:(lovelyPortraitBox)/9+ 'px', height: lovelyPortraitBox + 'px'}"
                     class="lovely-foot-img" :src="Config.foot_cover">
            </transition>
        </div>
        <div class="lovely-foot-content-box">
            <div class="lovely-foot-content">
              <span class="lovely_wev_count">
                <div>

                </div>
                总浏览量：<span class="web_count" v-text="web_count.count"/>
                <p>
                  {{Config.record_number}}
                </p>

              </span>
            </div>
        </div>
    </div>
</template>

<script>
    import GetRunTime from "../api/app"

    export default {
        name: "cute-foot",
        computed: {
            web_count() {
                return this.$store.getters.count_data.web_count;
            }
        },
        watch: {
            $route(to, from) {
                this.Init();
            }
        },
        data() {
            return {
                lovelyPortraitBox: "0",
                headerHeight: 0,
                show: true,
                old_url: "",
                run_time: 0
            };
        },
        mounted: function () {
            this.Init()
            var _this = this;
            _this.headerHeight = Number(document.documentElement.clientWidth) / 3;
            _this.lovelyPortraitBox = _this.headerHeight / 1.4;
            window.onresize = function () {
                _this.headerHeight = Number(document.documentElement.clientWidth) / 3; //窗口宽度
                _this.lovelyPortraitBox = _this.headerHeight / 1.4;
                if (_this.lovelyPortraitBox < 270) {
                    _this.show = false;
                } else {
                    _this.show = true;
                }
            };
        },
        methods: {
            Init() {
                let now_url = this.GetUrl()
                if (now_url != this.old_url) {
                    this.old_url = now_url
                    this.$store.dispatch("SetCountData", now_url);
                    this.$store.dispatch("CheckAdmin");
                }
            },
            GetRunTime() {
                GetRunTime().then(response => {

                })
            }
        },

    };
</script>

<style lang="stylus">
    .lovely-foot-box {
        text-align: center;

        .lovely-foot {
            width: 100%;
            position: relative;

            .lovely-foot-img {
                z-index: 100;
                position: absolute;
                right: 0;
                top: -22rem;
            }

        }

        .lovely-foot-content-box {
            text-align: center;

            .lovely-foot-content {
                width: 100%;
                height: 10rem;
                background: #232323;
                padding: 15px 0 10px;
                text-align: center;
                color: #888;
                font-size: 12px;
                line-height: 1.5;
                margin-top: 15rem;
                position: relative;

                .lovely_wev_count {
                    padding: 5px;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    color: #eee;

                    .web_count {
                        color: #ffffff
                    }

                }

            }
        }
    }

    .bounce-enter-active {
        animation: bounce-in 0.5s;
    }

    .bounce-leave-active {
        animation: bounce-in 0.5s reverse;
    }

    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }

        50% {
            transform: scale(1.5);
        }

        100% {
            transform: scale(1);
        }
    }
</style>