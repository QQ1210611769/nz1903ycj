<template>
  <van-nav-bar
    :title="title"
    :left-text="show?'返回':''"
    :left-arrow="show"
    @click-left="onClickLeft"
  >
    <!-- 插槽 -->
    <template #right>
      <van-icon v-if="!login" name="friends-o" size="38" @click="gotoLogin" />
      <van-icon v-if="!search" name="search" size="38" @click="gotoSearch"></van-icon>
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  props: {
    title: String,
    show: Boolean,
    // 这两个值控制在login页里van-icon显示search图标，在search页里van-icon显示login图标  方便在login里可点击跳转到search
    login: Boolean,
    search: Boolean
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    gotoLogin() {
      this.$router.push({ name: "login" });
    },
    gotoSearch() {
      this.$router.push({ name: "search" });
    }
  }
};
</script>
