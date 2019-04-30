## 归档

#### 标签({{$store.getters.blog_tag_data.length}})

<div class="blog_tag" :key="'tag_'+index" v-for="(tag,index) in $store.getters.blog_tag_data">
    <el-tag type="success">{{tag.name}}({{tag.num}})</el-tag>
</div>

#### 文章({{$store.getters.blog_data.length}})

<div class="blog_history" :key="'history_'+index" v-for="(history,index) in $store.getters.blog_history_data">

## {{history.year}}

<div class="blog_history_post" :key="'post_'+index" v-for="(post,index) in history.post">

* <router-link :to="post.regularPath">{{post.title}}</router-link>

</div>

</div>