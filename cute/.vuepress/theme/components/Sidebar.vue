<template>
  <el-card id="Sidebar" class="Sidebar">
    <el-tabs style="text-algin:center" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-if="is_mb" label="想去哪里呀" name="nav">
        <router-link class="mb-nav" to="/"><p>Home</p></router-link>
        <router-link
          class="mb-nav"  
          :key="'nav__'+index"
          v-for="(nav,index) in navData"
          :to="nav.path"
        ><p>{{nav.title}}</p></router-link>
      </el-tab-pane>
      <el-tab-pane label="来跟我玩" name="own">
        <div>
          <img style="width:100%" src="http://blog.deskmate.cc/me.png">
        </div>
        <div class="iconfont_box">
          <a _blank href="https://github.com/ActingCute" class="iconfont lovelygithub"/>
          <a _blank href="https://weibo.com/97787360" class="iconfont lovelyweibo-copy"/>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="page_nav.length>0" label="这都有啥" name="page_nav">
        <span v-for="(item,index) in page_nav" :key="'page_nav_'+index">
          <anchored-heading class="slug" :level="item.level" :slug="item.slug" :title="item.title"/>
        </span>
      </el-tab-pane>
    </el-tabs>
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
  },
  data() {
    return {
      activeName: "own"
    };
  },
  computed: {
    is_mb() {
      return this.$store.getters.is_mb;
    }
  },
  mounted() {
    console.log("is_mb --- ", this.is_mb);
    if (this.page_nav.length > 0) {
      this.activeName = "page_nav";
    }
  },
  methods: {
    handleClick() {
      console.log(this.activeName);
    }
  }
};

Vue.component("anchored-heading", {
  render: function(createElement) {
    let title = this.title;
    let slug = this.slug;
    return createElement("h" + this.level, [
      createElement(
        "a",
        {
          attrs: {
            href: "#" + slug
          }
        },
        title
      )
    ]);
  },
  props: {
    level: {
      type: Number,
      required: true
    },
    slug: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
});
</script>

<style lang="stylus" scoped>
.slug {
  font-size: 19px;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  border-bottom: 0;
}

.iconfont {
  cursor: pointer;
  font-size: 2.3rem;
}

.iconfont_box {
  margin-top: 1rem;
  text-align: center;

  .lovelygithub {
    color: #000;
  }

  .lovelyweibo-copy {
    color: red;
  }
}

.iconfont:hover {
  color: blue;
  -webkit-animation-name: push;
  animation-name: push;
}
</style>