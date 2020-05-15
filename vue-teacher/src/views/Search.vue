<template>
  <div class="box">
    <Head title="搜索" :show="show" :search="true"></Head>
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
    />
    <Vfoot></Vfoot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      value:''
    };
  },
  methods: {
    onSearch(val) {
    //   Toast(val);
      console.log('xxx');
      
    },
    onCancel() {
    //   Toast("取消");
      console.log("sss");
      
    }
  }
};
</script>