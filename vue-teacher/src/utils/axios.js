import axios from "axios"
import {
  Toast
} from "vant";
import router from "../router"
// 配置axios
let token = ''
// 看有没有在调用axios是使用这个路径，看get里url是绝对路径还是相对路径
const baseURL = "http://localhost:3000"
// axios.defaults.baseURL = baseURL

function showLoading() {
  Toast.loading({
    message: "加载中...",
    forbidClick: true,
    loadingType: "spinner",
    duration: 3000
  });
}

function fail(msg) {
  Toast.clear()
  Toast.fail({
    message: msg,
    duration: 600
  });
}

function success(msg) {
  Toast.clear()
  Toast.success({
    message: msg,
    duration: 600
  });
}

// 设置请求头里的token
axios.defaults.headers.common['token'] = token;
// 设置POST提交数据的文档类型编码
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


// Interceptors 拦截器
// Add a request interceptor 添加请求的拦截器，请求前要做的逻辑
axios.interceptors.request.use(function (config) {
  // Do something before request is sent（请求发送前）
  token = sessionStorage.token || token
  config.headers.token = token // 客户端发送token到服务器
  showLoading()
  return config;
}, function (error) {
  // Do something with request error（请求发送失败）
  fail("请求失败")
  return Promise.reject(error);
});

// Add a response interceptor  服务器响应之前
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  // 用户名注册成功
  if (response.data.type === 1) {
    success(response.data.msg || '请求数据成功')
  } else {
    // 用户名注册失败
    if (response.data.type === 0) {
      fail(response.data.msg || '请求数据失败')
    } else {
      success(response.data.msg || '请求数据成功')
    }
  }
  if(response.data.code=="3000"){
    router.push({name:"login"})
}
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  fail("响应失败")
  return Promise.reject(error);
});

// 解构暴露
export {
  axios,
  baseURL
}
