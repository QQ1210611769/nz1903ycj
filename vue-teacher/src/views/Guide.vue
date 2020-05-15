<template>
  <div class="box guide">
    <van-swipe :autoplay="3000" class="my-swipe" indicator-color="white">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" @click="gotoMain(index)" class="g-img" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import img4 from "@/assets/images/slide4.png";
export default {
  data() {
    return {
      images: [
        // 引入本地静态文件，模块化引入
        require("@/assets/images/slide1.png"),
        require("@/assets/images/slide2.png"),
        require("@/assets/images/slide3.png"),
        img4
      ]
    };
  },
methods:{
    gotoMain(i){
        if(i===this.images.length-1){
            this.$router.push({name:"movie"})
        }
    }
},
mounted(){
    // 需求：第三次访问后，就不显示guide页面（欢迎页）了
  if(localStorage.visitCount){
      localStorage.visitCount++;
      if(localStorage.visitCount>=3){
          this.$router.push({name:"movie"})
      }
  }else{
      localStorage.visitCount =1;
  }
}
};
</script>

<style lang="scss" scoped>
.g-img,
.my-swipe {
  width: 100%;
  height: 100%;
}
</style>