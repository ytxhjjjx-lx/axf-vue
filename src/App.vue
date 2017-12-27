<template>
    <div id="app">
        <router-view></router-view>
        <tab-bar />
    </div>
</template>

<script>
import TabBar from '@/components/tabbar/Tabbar'
import api from 'common/api'
export default {
    name: 'app',
    created () {
        let that = this
        async function getAllData() {
            let categories = await that.$http.get(api.host + '/categories')
            that.categoriesData = categories.data
            let products = await that.$http.get(api.host + '/products')
            that.productsData = products.data
            // console.log(that.categories)
            that.classifyProducts()
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

