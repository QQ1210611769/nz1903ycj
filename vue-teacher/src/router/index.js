// 路由配置 
import Vue from "vue"
import VueRouter from "vue-router"

// 0 模块化 全局注册使用 VueRouter
Vue.use(VueRouter)

// 1. 路由组件选项


// 2. 定义路由信息 定义组件的映射关系 
const routes = [{
    path: "/",
    redirect: "guide"
  },
  {
    path: "/guide",
    name: "guide",
    component: () => import("@/views/Guide.vue")
  },
  {
    path: "*",
    redirect: {
      name: "guide"
    }

  },
  {
    path: "/main",
    // name:"main",
    component: () => import("@/views/Main.vue"),
    redirect: "/main/movie",
    children: [{
        // 直接在url里输入/main/cinema不能出来？？？ => 注释vue.config里publicPath
        path: "movie",
        name: "movie",
        component: () => import("@/views/Movie.vue")
      },
      {
        path: "cinema",
        name: "cinema",
        component: () => import("@/views/Cinema.vue")
      },
      {
        path: "news",
        name: "news",
        component: () => import("@/views/News.vue")
      },
      {
        path: "shop",
        name: "shop",
        component: () => import("@/views/Shop.vue")
      },
      {
        path: "mine",
        name: "mine",
        component: () => import("@/views/Mine.vue")
      }
    ]
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/views/Search.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/city",
    name: "city",
    component: () => import("@/views/City.vue")
  }
]

// 3. 创建路由实例对象 
const router = new VueRouter({
  routes,
  mode: "history"
})

// 4 挂载 暴露之后再去挂载 
export default router;


















// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
// component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
