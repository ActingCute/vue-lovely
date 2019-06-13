<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="想去哪里呀" name="nav">想去哪里呀</el-tab-pane>
                <el-tab-pane label="来跟我玩" name="own">来跟我玩</el-tab-pane>
                <el-tab-pane label="这都有啥" name="page_nav">这都有啥</el-tab-pane>
            </el-tabs>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
        </div>
    </el-card>
</template>

<script>
    export default {
        name: "sidebar",
        props: {
            page_nav: {
                defaule: () => [],
                type: Array
            }
        }
    }
</script>