// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'

//引入通用样式
import 'common/styles/index.less'
//引入重置字体文件
import 'common/styles/reset.js'
//引入路由文件
import router from './router'
//控制tabbar显示隐藏(导航守卫)
router.beforeEach((to, from, next) => {
    let path = to.path
    if (path === '/' || path === '/flashsend' || path === '/cart' || path === '/mine') {
        store.state.tabBarShow = true
    } else {
        store.state.tabBarShow = false
    }
    next()
})


/* 引入mint-ui */
import { Swipe, SwipeItem, Lazyload, Indicator, MessageBox } from 'mint-ui'
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.use(Lazyload)
//加载提示框
Vue.prototype.$indicate = Indicator
//消息弹出
Vue.prototype.$msg = MessageBox
//引入自定义插件
import addProduct from '@/plugins'
Vue.use(addProduct)
// 引入fastclick
import fastclick from 'fastclick'
fastclick.attach(document.body)


// 引入axios
import axios from 'axios'
Vue.prototype.$http = axios

//引入store
import store from './store'


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
