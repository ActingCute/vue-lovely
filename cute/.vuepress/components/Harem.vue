<template>
    <div class="harem_box">
        {{GetRandomItem(Config.random_text)}}
        <el-row :gutter="10">
            <el-col :key="'harem_'+index" v-for="(item,index) in harem_data.data" :xs="12" :sm="12" :md="6" :lg="6"
                :xl="6">
                <a class="el-card" :href="item.url">
                    <el-card>
                        <img :src="item.pic" />
                        <div class="name">
                            {{item.name}}
                        </div>
                        <el-tooltip class="item" effect="dark" :content="GetDescribe(item.describe).old"
                            placement="top">
                            <el-alert :title="GetDescribe(item.describe).new" :closable="false" type="info" />
                        </el-tooltip>
                    </el-card>
                </a>

            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "harem",
        computed: {
            harem_data() {
                return this.Harem
            }
        },
        methods: {
            GetDescribe(describe) {

                let new_describe = describe
                let old_describe = describe

                if (old_describe.length == 0) {
                    old_describe = this.harem_data.config.default_describe
                }

                if (old_describe.length > 5) {
                    new_describe = old_describe.substring(0, 5) + "..."
                }

                return {
                    new: new_describe,
                    old: old_describe
                }
            }
        }
    };
</script>

<style lang="stylus" scoped>
    .harem_box {
        .el-row {
            margin-top 2rem
        }

        .name {
            text-align center;
            padding-bottom 0.5rem
        }
    }

    .el-card {
        cursor pointer;
    }
</style>