<template>
  <div>
    <Head title="个人中心"></Head>
    <div v-if="token">
      <h3>个人中心 Mine</h3>
      <h4>{{count}}</h4>
      <h4>token == {{token}}</h4>
      <h4>用户名 ==== {{userInfo.username}}</h4>
      <h4>手机号码 ==== {{userInfo.mobile}}</h4>
      <UploadImg ref="one"></UploadImg>
    </div>
    <div v-else>
      <h4>亲,你还未登录哦,请马上去登录</h4>
    </div>
  </div>
</template>
<script>
// 局部混入  data值会覆盖，当前覆盖混入的，函数会依次指向，先执行混入的再执行当前组件的
// 全局混入会影响每一个组件，慎用
import { myMixin } from "@/utils";
import { baseURL } from "@/utils/axios.js";
export default {
  mixins: [myMixin], //混入组件实例
  data() {
    return {
      token: sessionStorage.token || "",
      userInfo: {}
      // count: 1233222
    };
  },
  created() {
    
  },
  mounted() {
    this.$axios.get("/vue/getuserinfo").then(res => {
      if (res.data.type) {
        this.userInfo = res.data.result;
        console.log(res.data);
        // 刷新后改变pic  这种方法每次刷新都会请求一次数据来改变子组件的pic   
        // 因此可采用存在本地的方法减少ajax请求 在uploadimg.vue里实现
        // this.$refs.one.pic = res.data.result.avater.replace(/public/, baseURL);
        
      }
    });
  }
};
</script>

<style lang="scss" scoped>
</style>