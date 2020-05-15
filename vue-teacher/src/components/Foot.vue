<template>
  <footer>
    <div v-for="(item,i) in foots" :key="i">
      <router-link :to="{name:item.name}">
        <i class="iconfont" v-html="item.icon"></i>
        <span>{{item.txt}}</span>
        <van-tag v-if="i==3" class="hot" :color="color">8</van-tag>
      </router-link>
    </div>
  </footer>
</template>

<script>
// 直接"@/utils"，按照foots名导入
import { foots } from "@/utils";
export default {
  data() {
    return {
      foots,
      color:"orange"
    }
  },
  watch:{
    // 实现，点击“电商”的时候，tag亮起，点击其他栏时，“电商”上的tag变灰。 
    //  可以通过监听路由（因为路由与foot绑在一起了，点击foot对应路由也会跳转。） 路由为shop，color为orange高亮，否则为灰
    "$route"(to){
      to.name === "shop" ? this.color = "orange" : this.color = "#999"
    }
  }
};
</script>

<style lang="scss" scoped>
footer {
  position: fixed;
  width: 100%;
  height: 45px;
  left: 0;
  bottom: 0;
  background: #fff;
  display: flex !important;
  z-index: 100;
  border-top: 1px solid black;
  div {
    flex: 1;
    height: 45px;
    a {
      display: block;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding: 3px 0;
      text-align: center;
      font-family: "微软雅黑";
      color: #999;
      position: relative;
      i {
        width: 100%;
        height: 23px;
        line-height: 23px;
        font-size: 22px !important;
      }
      span {
        width: 100%;
        height: 19px;
        line-height: 19px;
        font-size: 14px;
      }
      .hot {
        position: absolute;
        top: 0;
        left: 60%;
        display: inline-block;
        width: 10px;
        height: 10px;
        font-size: 10px;
        line-height: 10px;
        border-radius: 50%;
      }
    }
    .nav-active,
    .router-link-exact-active,
    .router-link-active {
      color: orange;
      border-color: orange;
    }
  }
}
</style>
