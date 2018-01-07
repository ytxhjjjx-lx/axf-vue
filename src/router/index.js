import Vue from 'vue'
import Router from 'vue-router'
//按需加载, 只有访问某个组件时才会加载相关页面
const Home = resolve => require(['pages/home/Home.vue'], resolve)
const Flashsend = resolve => require(['pages/flashsend/Flashsend.vue'], resolve)
const Cart = resolve => require(['pages/cart/Cart.vue'], resolve)
const Mine = resolve => require(['pages/mine/Mine.vue'], resolve)
//登录,注册页
const Login = resolve => require(['pages/login/Login.vue'], resolve)
//地址列表页
const Site = resolve => require(['pages/site/Site.vue'], resolve)
//添加地址页
const AddSite = resolve => require(['pages/addSite/AddSite.vue'], resolve)
//选择地址
const SelectSite = resolve => require(['pages/selectSite/SelectSite.vue'], resolve)
//修改地址
const EditSite = resolve => require(['pages/editSite/EditSite.vue'], resolve)
//商品详情页
const ProductItem = resolve => require(['pages/productItem/ProductItem.vue'], resolve)
//商品收藏页
const Favorite = resolve => require(['pages/favorite/Favorite.vue'], resolve)


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
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/site',
            component: Site
        },
        {
            path: '/add-site',
            component: AddSite
        },
        {
            path: '/select-site',
            component: SelectSite
        },
        {
            path: '/edit-site/:id',
            component: EditSite
        },
        {
            path: '/product-item/:id',
            component: ProductItem
        },
        {
            path: '/favorite',
            component: Favorite
        }
    ]
})
