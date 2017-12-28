<template>
    <div id="app">
        <!-- 缓存 -->
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <tab-bar />
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
        async function getAllData() {
            let categories = await that.$http.get(api.host + '/categories')
            that.categoriesData = categories.data
            let products = await that.$http.get(api.host + '/products')
            that.productsData = products.data
            // console.log(that.categories)
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
    }
}
</script>

<style lang="less" scoped>
#app {
    width: 100%;
    height: 100%;
}
</style>

