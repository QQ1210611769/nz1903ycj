// 注册所有的vant组件
import Vue from "vue"
import {
  Button,
  Icon,
  Swipe,
  SwipeItem,
  Lazyload,
  Tag,
  TabbarItem,
  Tabbar,
  NavBar,
  Search,
  // Toast,
  Tab,
  Tabs,
  Form,
  Field,
  IndexBar,
  IndexAnchor,
  Cell,
  NoticeBar
} from 'vant';

// Vue.use(Button,Icon)   这里不能写在一起
Vue.use(Button)
  .use(Icon)
  .use(Swipe)
  .use(SwipeItem)
  .use(Lazyload)
  .use(Tag)
  .use(Tabbar)
  .use(TabbarItem)
  .use(NavBar)
  .use(Search)
  // .use(Toast)
  .use(Tab)
  .use(Tabs)
  .use(Form)
  .use(Field)
  .use(IndexBar)
  .use(IndexAnchor)
  .use(Cell)
  .use(NoticeBar )
