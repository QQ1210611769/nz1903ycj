// webpack 打包操作   
// vue-cli 脚手架的配置文件 
// 以后修改这个配置文件  一定要重启服务 才能有用 

// 代理：接收上级代理的命令，传递下一级代理

// 反向代理，一定务必将axios基路径注释掉 （反向代理和基路径很像，get时会走基路径）
// 反向代理作用：1.当作基路径 2.解决跨域问题（主要）

// 反向代理，即使服务器端没有做cors跨域处理，可在客户端实现跨域
// 客户端发送请求：http://localhost:8080
// 服务器端：接收   http://47.104.209.44:3333
// 设置代理：proxy   发送请求还是走客户端的接口模式（8080） （骗过客户端）
// 请求地址有代理名称 （/yun）把本地地址代理成服务器端地址  （即：http://localhost:8080/yun/captcha/sent?phone=18328330280的http://localhost:8080/yun代理成target地址）
// 这样可以实现通过服务器接口地址请求服务器，这样服务器也不会有跨域
module.exports = {
  lintOnSave: false, // 处理ESLint 的 error 提示 
  devServer: {
    host: "localhost", // 0.0.0.0
    port: 8080,
    open: true, // 自动打开浏览器
    inline: true,
    proxy: { // 反向代理  
      // 网易云
      "/yun": {
        target: "http://47.104.209.44:3333/",
        pathRewrite: {
          // 将/yun 重写为 /
          "^/yun": ""
        }
      },
      // 这个代理用于请求movie数据
      //   这里不用pathRewrite，因为有个公共的路由vue
      "/vue": {
        target: "http://localhost:3000"
      },
      "/public": {
        target: "http://localhost:3000",
        pathRewrite: {
          "^/public": ""
        }
      },
      "/maizuo": {
        target: "https://m.maizuo.com",
        pathRewrite: {
          "^/maizuo": ""
        }
      }

      
    }
  },
  // publicPath:"",  // 项目上线打包 
  css: {
    loaderOptions: {
      css: {},
      postcss: { // css 代码转化
        plugins: [ // 插件
          require("postcss-px2rem")({
            // 3. 淘宝适配  1rem = 10vw 
            // remUnit:100   // 自动除以 100  网易
            remUnit: 37.5 //淘宝适配75   适用vant 改为37.5
          })
        ]
      }
    }
  }
}
