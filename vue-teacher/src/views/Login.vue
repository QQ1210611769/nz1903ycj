<template>
    <div class="box">
        <Head title="注册&登录" :show="true" :login="true"></Head>
        <van-tabs 
        v-model="active" 
        color="#0f0" 
        title-active-color="#0f0"
        >
            <van-tab title="注册">
                <van-form @submit="registerSubmit">
                    <van-field
                        v-model="register.mobile"
                        name="mobile"
                        label="手机号"
                        placeholder="手机号"
                        :rules="[{ required: true, message: '请填写手机号码' }]"
                    />
                    <van-field
                        v-model="register.username"
                        name="username"
                        label="用户名"
                        placeholder="用户名"
                        :rules="[{ required: true, message: '请填写用户名' }]"
                    />
                    <van-field
                        v-model="register.password"
                        type="password"
                        name="password"
                        label="密码"
                        placeholder="密码"
                        :rules="[{ required: true, message: '请填写密码' }]"
                    />
                    <van-field
                        v-model="register.dbpwd"
                        type="password"
                        name="dbpwd"
                        label="确认密码"
                        placeholder="确认密码"
                        :rules="[{ required: true, message: '请填写确认密码' }]"
                    />
                    <div style="margin: 16px;">
                        <van-button round block type="primary" native-type="submit">
                        马上注册
                        </van-button>
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
                        :rules="[{ required: true, message: '请填写手机号码' }]"
                    />
                    <van-field
                        v-model="login.password"
                        type="password"
                        name="password"
                        label="密码"
                        placeholder="密码"
                        :rules="[{ required: true, message: '请填写密码' }]"
                    />
                    <div style="margin: 16px;">
                        <van-button round block type="info" native-type="submit">
                        登录
                        </van-button>
                    </div>
                </van-form>
            </van-tab>
            <van-tab title="验证码登录">
                <van-field
                    v-model="mobile"
                    name="mobile"
                    label="手机号"
                    placeholder="请输入手机号"
                />
                <van-field
                    v-model="sms"
                    center
                    clearable
                    label="短信验证码"
                    placeholder="请输入短信验证码"
                    >
                    <template #button>
                        <van-button  @click="sendSms" size="small" type="primary">发送验证码</van-button>
                    </template>
                </van-field>
                <van-button round block type="warning" @click="checkSms">
                    验证登录
                </van-button>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
export default {
    data(){
        return {
            active:1,
            login:{
                mobile:localStorage.mobile
            },
            register:{},
            sms:"",
            mobile:""
        }
    },
    methods:{
        checkSms(){
            // 相对路径   会自动拼接 axios 的 baseURL   
            this.$axios.get("/yun/captcha/verify",{
                params:{
                    phone:this.mobile,
                    captcha:this.sms
                }
            }).then(res=>{
                if(res.data.code==200){
                    localStorage.mobile = this.mobile;
                    localStorage.isLogin = true;
                    this.$router.push({name:'mine'})
                   
                }else{
                    localStorage.isLogin = false;
                }
            })
        },
        sendSms(){
            // 发送验证码 
            // 绝对路径 
            // http://47.104.209.44:3333/captcha/sent
            this.$axios.get("/yun/captcha/sent",{
                params:{
                    phone:this.mobile
                }
            })
            .then(res=>{
                console.log(res);
            })
        },
        loginSubmit(value){
            console.log(value)
            console.log("登录")
            this.$axios.post("/vue/login",this.login)
            .then(res=>{
                if(res.data.type){
                    localStorage.mobile = this.login.mobile;
                    localStorage.isLogin = true;
                    this.$router.push({name:'mine'})
                    sessionStorage.token = res.data.token;  //存储token， 再放到req.headers里面（axios.js里实现）
                }
            })
        },
        registerSubmit(value){
            console.log(value)
            console.log("注册")
            this.$axios.post("/vue/register",this.register)
            .then(res=>{
                if(res.data.type){
                    this.active = 1;
                    // this.login.username = res.data.result[0].username;
                    this.login.mobile = this.register.mobile;
                }
            })
        }
    }
}
</script>

