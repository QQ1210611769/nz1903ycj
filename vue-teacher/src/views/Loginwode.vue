<template>
  <div class="box">
    <Head title="注册&登录" :show="show" :login="true"></Head>
    <van-tabs v-model="active" color="#0f0" title-active-color="blue">
      <van-tab title="注册">
        <template #title>
          <van-icon name="smile" />注册
        </template>
        <van-form @submit="registerSubmit">
          <van-field
            v-model="register.mobile"
            name="mobile"
            label="手机号"
            placeholder="手机号"
            :rules="[{ required: true, message: '请填写手机号' }]"
          />
          <van-field
            v-model="register.username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="register.password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">立即注册</van-button>
          </div>
        </van-form>
      </van-tab>
      <van-tab title="登录">
        <van-form @submit="loginSubmit">
          <van-field
            v-model="login.mobile"
            name="mobile"
            label="手机号"
            placeholder="手机号"
            :rules="[{ required: true, message: '请填写手机号' }]"
          />
          <van-field
            v-model="login.password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">登录</van-button>
          </div>
        </van-form>
      </van-tab>
      <van-tab title="验证码登录">
        <van-field v-model="mobile" name="mobile" label="手机号" placeholder="手机号" />
        <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
          <template #button>
            <van-button size="small" type="primary" @click="sendSms">发送验证码</van-button>
          </template>
        </van-field>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" @click="checkSms">登录</van-button>
        </div>
      </van-tab>
    </van-tabs>
    <Vfoot></Vfoot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      active: 1,
      login: {
        mobile:localStorage.mobile
      },
      register: {},
      mobile: 18333333333,
      sms: ""
    };
  },
  methods: {
    // 登录提交
    loginSubmit(values) {
      this.$axios.post("/vue/login", this.login).then(res => {
        if (res.data.type) {
          localStorage.mobile = this.login.mobile;
          localStorage.isLogin = true;
          this.$router.push({ name: "mine" });
          sessionStorage.token = res.data.token;
        }
      });
    },
    // 注册提交
    registerSubmit(values) {
      // console.log("submit", values);
      // 代理后
      this.$axios.post("/vue/register", this.register).then(res => {
        if (res.data.type) {
          // 切换标题栏，到登录栏
          this.active = 1;
          // this.login.username = res.data.result[0].username;
          this.login.mobile = res.data.result[0].mobile;
        }
      });
    },
    sendSms() {
      // 发送验证码
      // /captcha/sent    相对路径表示使用axios.js里的baseURL   这里使用反向代理，因此要将baseURL注释掉
      this.$axios
        .get("/yun/captcha/sent", {
          params: {
            phone: this.mobile
          }
        })
        .then(res => {
          console.log(res);
        });
    },
    // 验证验证码登录
    checkSms() {
      this.$axios
        .get("/yun/captcha/verify", {
          // 这两个参数提供给后台用于验证，验证码是否输入正确
          params: {
            phone: this.mobile,
            captcha: this.sms
          }
        })
        .then(res => {
          // 成功localStorage记录状态
          if (res.data.code == 200) {
            localStorage.mobile = this.mobile;
            localStorage.isLogin = true;
            this.$router.push({ name: "mine" });
            
          } else {
            localStorage.isLogin = false;
          }
        });
    }
  }
};
</script>