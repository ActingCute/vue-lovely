### 归档

<div class="blog_tag" v-for="(tag,index) in $store.getters.blog_tag_data">
    <el-tag type="success">{{tag.name}}({{tag.num}})</el-tag>
</div>