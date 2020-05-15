<template>
  <div>
    <input type="file" class="fileone" ref="file" @change="uploadFile" />
    <!-- 当点击头像时触发input点击事件，上传头像 -->
    <img :src="pic" alt class="avatar" @click="handleClick" />
  </div>
</template>

<script>
import pic from "@/assets/images/photo.png";
import { baseURL } from "@/utils/axios";
export default {
  data() {
    return {
      pic: pic
    };
  },
  mounted(){
    //   刷新本地存储看有没有头像，有再判断手机号是否一致，不一致需要再次发送请求获取
    if(localStorage.users){
        var users = JSON.parse(localStorage.users)
        // localStorage.mobile是在登录时存的手机号
        if(users.mobile == localStorage.mobile){
            this.pic = users.path;
        }else{
            // 手机号不一致  再此请求 
            this.getAvater() 
        }
    }else{
        // 本地没有（比如localStorage被你自己清空了）或者用户没有上传头像   再此请求  
        this.getAvater()
    }
  },
  methods: {
    handleClick() {
      this.$refs.file.click();
    },
    // 每次点击后才会向后台请求，从而更换头像，刷新后会显示之前的头像。
    uploadFile() {
      console.log("开始上传头像");
      // 需要上传的头像获取到
      var file = this.$refs.file.files[0]; // input上传可以上传多个文件
      var data = new FormData(); // 内置对象，实例化一个表单对象 （application/formdata
      // 头像append到img上
      data.append("avatar", file);
      this.$axios({
        url: "/vue/uploadimg",
        method: "POST",
        data: data
      }).then(res => {
        // public被重置为根路径   /
        // this.pic = res.data.path.replace(/public/, baseURL);
        // 还可以使用反向代理
        this.pic = "/" + res.data.path;
        // 存在本地，方便刷新后获取改变后的头像
        let users = {
          path:this.pic,
          mobile:res.data.mobile
        }
        localStorage.setItem("users",JSON.stringify(users));

      });
    },
    getAvater(){
        this.$axios.post("/vue/getavater")
        .then(res=>{
            if(res.data.type){
                this.pic = res.data.result.avater.replace(/public/,baseURL)
                console.log(this.pic)
            }else{
                // 用户没有上传过头像，使用默认头像
                this.pic = pic;
                console.log(this.pic)
            }
        })
    }
  }
};
</script>
<style lang="scss" scoped>
.fileone {
  display: none;
}
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>