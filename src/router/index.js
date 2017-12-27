import Vue from 'vue'
import Router from 'vue-router'
//按需加载, 只有访问某个组件时才会加载相关页面
const Home = resolve => require(['pages/home/Home.vue'], resolve)
const Flashsend = resolve => require(['pages/flashsend/Flashsend.vue'], resolve)
const Cart = resolve => require(['pages/cart/Cart.vue'], resolve)
const Mine = resolve => require(['pages/mine/Mine.vue'], resolve)


Vue.use(Router)
export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/flashsend',
            component: Flashsend
        },
        {
            path: '/cart',
            component: Cart
        },
        {
            path: '/mine',
            component: Mine
        }
    ]
})
