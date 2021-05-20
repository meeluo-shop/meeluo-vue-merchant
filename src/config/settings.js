/**
 * @author knows 1002563923@qq.com
 * @description 全局变量配置
 */

module.exports = {
  //开发以及部署时的URL，hash模式时在不确定二级目录名称的情况下建议使用""代表相对路径或者"/二级目录/"，history模式默认使用"/"或者"/二级目录/"
  publicPath: "",
  //生产环境构建文件的目录名
  outputDir: "dist",
  //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: "static",
  //开发环境每次保存时是否输出为eslint编译警告
  lintOnSave: true,
  //进行编译的依赖
  transpileDependencies: ["vue-echarts", "resize-detector"],
  //默认的接口地址 如果是开发环境和生产环境走vab-mock-server，当然你也可以选择自己配置成需要的接口地址
  baseURL: ["development", "dev"].includes(process.env.NODE_ENV)
    ? "http://localhost:3000/api/"
    : "http://game.meeluo.com/api/",
  //标题 （包括初次加载雪花屏的标题 页面的标题 浏览器的标题）
  title: "谜鹿商户后台",
  //标题分隔符
  titleSeparator: " - ",
  //标题是否反转 如果为false:"page - title"，如果为ture:"title - page"
  titleReverse: false,
  //简写
  abbreviation: "vab-pro",
  abbreviation: "vab-pro",
  //开发环境端口号
  devPort: "9999",
  //版本号
  version: process.env.VUE_APP_VERSION,
  //pro版本copyright可随意修改
  copyright: "meeluo.com",
  //缓存路由的最大数量
  keepAliveMaxNum: 99,
  //路由模式，可选值为 history 或 hash
  routerMode: "hash",
  //不经过token校验的路由
  routesWhiteList: ["/login", "/404", "/403"],
  //加载时显示文字
  loadingText: "正在加载中...",
  //token名称
  tokenName: "Merchant-Token",
  //token在localStorage、sessionStorage、cookie存储的key的名称
  tokenTableName: "token",
  //token失效回退到登录页时是否记录本次的路由
  recordRoute: true,
  //是否显示logo，不显示时设置false，显示时请填写remixIcon图标名称，暂时只支持设置remixIcon
  logo: "vuejs-fill",
  //是否固定头部 固定fixed 不固定noFixed
  header: "fixed",
  //布局种类 horizontal vertical gallery comprehensive common
  layout: "vertical",
  //主题名称 default ocean green glory
  themeName: "default",
  //是否显示顶部进度条
  showProgressBar: true,
  //是否显示多标签页
  showTagsBar: true,
  //是否显示刷新组件
  showRefresh: true,
  //是否显示搜索组件
  showSearch: false,
  //是否显示主题组件
  showTheme: true,
  //是否显示通知组件
  showNotice: true,
  //是否显示全屏组件
  showFullScreen: true,
  //配后端数据的接收方式application/json;charset=UTF-8或者application/x-www-form-urlencoded;charset=UTF-8
  contentType: "application/json;charset=UTF-8",
  //消息框消失时间
  messageDuration: 3000,
  //最长请求时间
  requestTimeout: 5000,
  //操作正常code，支持String、Array、int多种类型
  successCode: [200, 0],
  //在哪些环境下显示高亮错误
  errorLog: ["development"],
  //是否依据mock数据生成webstorm HTTP Request请求文件
  httpRequestFile: false,
  //vertical布局时是否只保持一个子菜单的展开
  uniqueOpened: true,
  //vertical布局时默认展开的菜单path，使用逗号隔开建议只展开一个
  defaultOpeneds: ["/vab"],
  //需要自动注入并加载的模块
  providePlugin: {},
  //npm run build时是否自动生成7z压缩包
  build7z: false,
  //代码生成机生成在view下的文件夹名称
  templateFolder: "project",
  //画廊布局和综合布局时，是否点击一级菜单默认开启第一个二级菜单
  openFirstMenu: true,
  // 资源根链接
  sourceBaseUrl: "https://assets.meeluo.com/",
  // 生成的二维码url
  // qrcodeBaseUrl: "http://redirect.functors.cn/index.html",
};
