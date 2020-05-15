<template>
  <van-tabbar v-model="active" active-color="orange" :route="true">
    <van-tabbar-item
      v-for="(foot,i) in foots"
      :key="i"
      :to="{name:foot.name}"
      :badge="i==3?5:''"
    >
      <span>{{foot.txt}}</span>
      <!-- 自定义图标 -->
      <template #icon="props">
        <i class="iconfont" v-html="foot.icon"></i>
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { foots } from "@/utils";
export default {
  data() {
    return {
      active: 0,
      foots
    };
  },
  methods: {
    // vant里tabbar自带跳转，也可使用它自带的实现
    // @click="gotoRoute(foot.name)"
    // gotoRoute(name) {
    //   this.$router.push(name);
    // }
  },
  // watch: {
  //   // 实现路由跳转，监听实现，会有异常
  //   active: function(newVal) {
  //     //   当点击不同的tabbar，newVal即index，实现跳转  （之前是通过router-link）
  //     this.$router.push({ name: this.foots[newVal].name });
  //   }
  // },
  //   当我们刷新的时候，下面tabbar会跳到第一个，url还是显示刷新前的状态
  mounted() {
    // var name = this.$route.name;
    // this.foots.forEach((item, i) => {
    //   //   遍历找到 当前路由的name，然后根据该name找到它在foots里的位置，当前index赋值给active（这样tabbar的active指向该index）
    //   if (item.name === name) {
    //     this.active = i;
    //   }
    // });
  }
};
</script>
