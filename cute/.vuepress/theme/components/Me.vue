<template>
  <div class="lovely_me_box">
    <img src="http://blog.deskmate.cc/me.jpg?imageView2/0/format/jpg/interlace/1/q/75|watermark/2/text/QEFjdGluZ0N1dGXphbE=/font/5a6L5L2T/fontsize/500/fill/I0VGRUZFRg==/dissolve/60/gravity/SouthEast/dx/10/dy/10|imageslim">
    <p class="site-description motion-element" itemprop="description">你能抓到我么？</p>
    <div
      style="display:inline-block;width:50px"
      class="links-of-author motion-element"
      v-for="(item, index) in me"
      :key="index"
    >
      <div class="links-of-author-item">
        <a href="https://github.com/ActingCute" target="_blank" :title="item.text">
          <i :class="item.class"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "me",
  data() {
    return {
      me: [
        {
          text: "GitHub",
          link: "https://github.com/ActingCute",
          class: "iconfont lovelygithub"
        },
        {
          text: "WeiBo",
          link: "https://weibo.com/97787360",
          class: "iconfont lovelyweibo-copy"
        }
      ]
    };
  }
};
</script>

<style lang="stylus" scoped>
.lovely_me_box {
  min-height: 300px;
  margin: 0 auto;
  text-align: center;

  img {
    width: 100%;
  }

  .site-description {
    font-size: 14px;
    margin: 5px 0 8px;
    font-weight: 700;
    color: #555;
  }
  .lovely_ico{
    font-size :1rem;  
  }
}
</style>


<style lang="stylus" scoped>
.lovely_me_box {
  min-height: 300px;
  margin: 0 auto;
  text-align: center;

  img {
    width: 100%;
  }

  .site-description {
    font-size: 14px;
    margin: 5px 0 8px;
    font-weight: 700;
    color: #555;
  }
  .lovely_ico{
    font-size :1rem;  
  }
}
</style>
