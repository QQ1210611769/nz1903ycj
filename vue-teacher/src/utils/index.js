// 注意这里一定要export暴露
export var foots = [
    {txt:"电影",name:'movie',path:'/main/movie',icon:'&#xe717;'},
    {txt:"影院",name:'cinema',path:'/main/cinema',icon:'&#xe8c0;'},
    {txt:"资讯",name:'news',path:'/main/news',icon:'&#xe61a;'},
    {txt:"电商",name:'shop',path:'/main/shop',icon:'&#xe617;'},
    {txt:"我的",name:'mine',path:'/main/mine',icon:'&#xe619;'},
]
// 封装的混入的对象，组件选项：data props created ...
export const myMixin = {
    data(){
        return {
            mobile:localStorage.mobile || '',
            count:1903,
            city:{}
        }
    },
    created(){

    },
    mounted() {
        if (localStorage.city) {
          var city = JSON.parse(localStorage.city);
        //   console.log(city);
          this.city = city
    
          // movie页是在你选择了城市后跳转的，如果你并没有选择城市，即localstorage里没有city，则跳转到选择城市页面
        } else {
          this.$router.push({ name: "city" });
        }
      }
}