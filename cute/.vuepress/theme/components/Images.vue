<template>
  <!-- 过渡动画 -->
  <transition name="fade">
    <div class="img-view" @click="bigImg">
      <!-- 遮罩层 -->
      <div class="img-layer"></div>
      <div class="img">
        <img :src="imgSrc">
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: ["imgSrc"],
  methods: {
    bigImg() {
      // 发送事件
      this.$emit("clickit");
    }
  }
};
</script>
<style scoped>

/* bigimg */

.img-view {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

/*遮罩层样式*/
.img-view .img-layer {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/*不限制图片大小，实现居中*/
.img-view .img img {
  max-width: 100%;
  max-height: 100%;
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 9999;
}
</style>