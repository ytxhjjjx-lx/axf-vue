// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

//引入通用样式
import 'common/styles/index.less'
//引入重置字体文件
import 'common/styles/reset.js'
//引入路由文件
import router from './router'
//引入mint-ui
import { Swipe, SwipeItem, Lazyload } from 'mint-ui'
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.use(Lazyload)

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
