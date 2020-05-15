/* eslint-disable */
import Vue from 'vue'   // 导入Vue 模块
import App from './App.vue'      // 根组件
import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false
// Vue 核心文件  启动项目 

import "lib-flexible"; //1. 淘宝适配必须引入的  引入js文件 

// 引入全局的 样式 
import "@/styles/index.scss";

// 引入vant  第三种方式
// import Vant from "vant"
// Vue.use(Vant)
// import 'vant/lib/index.css'   //一次性导入所有的样式

// 自动按需引入
import "@/utils/vant"
// 全局组件
import "@/utils/global"

import {axios} from "@/utils/axios"
// 这样在main里注册了，可以在任意文件里使用axios
// this.$axios = axios
Vue.prototype.$axios = axios;

new Vue({
  router,   // 挂载路由 this.$router 
  store,    
  render: h => h(App)   // render Vue 渲染虚拟DOM 的函数 
}).$mount('#app')    // 把虚拟DOM App 载入到 div#app 里面去 

// h=>h(App)
// (h)=> {return h(App)}
// function(h){
//   return h(App)
// }

