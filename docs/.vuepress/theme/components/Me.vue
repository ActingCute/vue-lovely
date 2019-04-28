<template>
  <div class="lovely_me_box">
    <img src="../static/img/me.png">
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
          class: "fa fa-fw fa-github"
        },
        {
          text: "WeiBo",
          link: "https://weibo.com/97787360",
          class: "fa fa-fw fa-weibo"
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
}
</style>
