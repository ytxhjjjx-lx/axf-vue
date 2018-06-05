<template>
    <div id="app">
        <!-- 失活的组件将会被缓存，缓存会保留组件的状态，若组件需要不断地重新渲染则不建议设置缓存，组件默认为缓存状态 -->
        <keep-alive>
            <router-view v-if="!$route.meta.notkeepalive"></router-view>
        </keep-alive>
        <!-- 设置不缓存的页面，该应用路由配置文件中已设置购物车页和地址列表页为不缓存状态 -->
        <router-view v-if="$route.meta.notkeepalive"></router-view>
        <tab-bar v-show="tabBarShow"/>
    </div>
</template>

<script>
import TabBar from '@/components/tabbar/Tabbar'
import api from 'common/api'
export default {
    name: 'app',
    created () {
        //加载提示框
        this.$indicate.open('加载中...')
        let that = this
        //app中获取数据, 避免多次请求
        async function getAllData() {
            let categories = await that.$http.get(api.host + '/categories')
            that.categoriesData = categories.data
            let products = await that.$http.get(api.host + '/products')
            that.productsData = products.data
            that.classifyProducts()
            //数据重组完毕后关闭加载提示框
            that.$indicate.close()
        }
        getAllData()
    },  
    data () {
        return {
            categoriesData: [],
            productsData: []
        }
    },
    components: {
        TabBar
    },
    methods: {
         classifyProducts () { 
            //归类商品
            for (let i=0; i< this.productsData.length; i++) {
                for (let j=0; j< this.categoriesData.length; j++) {
                    if (this.categoriesData[j].id === this.productsData[i].categoryId) {
                        this.categoriesData[j].products.push(this.productsData[i])
                    }
                }
            }
            this.$store.commit('SAVE_CATEGORIES', this.categoriesData)
        }
    },
    computed: {
        tabBarShow () {
            return this.$store.state.tabBarShow
        }
    }
}
</script>

<style lang="less" scoped>
#app {
    width: 100%;
    height: 100%;
}
</style>

