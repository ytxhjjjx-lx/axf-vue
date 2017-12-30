<template>
    <div class="flashsend">
        <header-yellow />
        <div class="main_content">
            <!-- 分类 -->
            <div class="categories">
                <ul>
                    <li v-for="(category, index) in categories" :key="category.id" 
                    @click="changeActiveCate(category)">
                        <span :class="{'active': activeCateId===category.id}">{{category.name}}</span>
                    </li>
                </ul>
            </div>
            <div class="products">
                <!-- 筛选条件 -->
                <div class="filter" @click="hideFilterItems">
                    <!-- hideFilter方法用于隐藏筛选内容 -->
                    <div class="filterTab" >
                        <p>
                            <span>{{categoryKey}}</span>
                            <!-- 阻止事件冒泡 -->
                            <img src="./imgs/icon-down.png" alt="" @click.stop="chooseCategory"
                            :class="{'rotate1': click}" >
                        </p>
                        <p>
                            <span>{{rankKey}} </span>
                            <!-- 阻止事件冒泡 -->
                            <img src="./imgs/icon-down.png" alt="" @click.stop="chooseRanking"
                            :class="{'rotate1': click1}">
                        </p>
                    </div>
                    <!-- 全部分类 -->
                    <div class="allCategory" v-show="click">
                        <ul>
                            <li :class="{'active': activeChildCateIndex === 0}" @click="changeChildCate(0)">全部分类</li>
                            <li v-for="(child_cate, index) in activeChildCates" :key="child_cate.name"
                            :class="{'active': activeChildCateIndex === index + 1}" @click="changeChildCate(index + 1)">
                                {{child_cate.name}}
                            </li>
                        </ul>
                    </div>
                    <!-- 综合排序 -->
                    <div class="ranking" v-show="click1">
                        <ul>
                            <li v-for="(item, index) in rankingKeys" :key="index"
                            :class="{'active': item === rankKey}" @click="changeRanking(item)">
                                {{item}}
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- 产品列表 -->
                <div class="productItems">
                    <div class="productItem" v-for="(item, index) in filterProducts" 
                    :key="item.product_id">
                        <div class="ProductImg">
                            <img v-lazy="item.imgs.min">
                        </div>
                        <div class="ProductDetails ">
                            <div class="product_name">{{item.name}}</div>
                            <div class="proDetails_bottom ">
                                <div class="left ">
                                    <span class="capacity">{{item.unit}}ml</span>
                                    <p class="price ">￥{{item.price}}</p>
                                </div>
                                <div class="right ">
                                    <span v-show="item.num > 0" @click.stop="subProduct(item)"> - </span>
                                    <span class="num" v-show="item.num > 0">{{item.num}}</span>
                                    <span @click.stop="addProduct(item)"> + </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>   
    </div>
</template>

<script>
import HeaderYellow from '@/components/header-yellow/Header-yellow'
export default {
    components: {
        HeaderYellow
    },
    data() {
        return {
            //激活的分类id
            activeCateId: 1,
            click: false,
            click1: false,
            //排序类型
            rankingKeys: ["综合排序", "价格最高", "价格最低"],
            //激活的子分类下标
            activeChildCateIndex: 0,
            //激活的子分类关键字
            categoryKey: "全部分类",
            //激活的排序关键字
            rankKey: "综合排序"
        }
    },
    computed: {
        //原始分类数据
        categories() {
            return this.$store.state.categories
        },
        //激活的分类对应的商品数据
        activeProducts() {
            return this.categories[this.activeCateId - 1].products
        },
        //激活的分类对应的子分类
        activeChildCates() {
            return this.categories[this.activeCateId - 1].cids
        },
        //筛选商品
        filterProducts () {
            let result = []
            //全部分类则显示所有商品
            if (this.activeChildCateIndex === 0) {
                result = this.activeProducts
            } else {
                for (let i = 0; i < this.activeProducts.length; i++) {
                    if (this.activeProducts[i].cidIndex === this.activeChildCateIndex - 1) {
                        result.push(this.activeProducts[i])
                    }
                }
            }
            //根据排序关键字进行对应排序
            if (this.rankKey === '综合排序') {
                return result
            }
            if (this.rankKey === '价格最低') {
                //降序
                return result.sort((a, b) =>  Number(a.price) - Number(b.price))
            }
            if (this.rankKey === '价格最高') {
                //升序
                return result.sort((a, b) =>  Number(b.price) - Number(a.price))
            }
        },
        userInfo () {
            return this.$store.state.userInfo
        }
    },
    methods: {
        changeActiveCate (category) {
            //更改总分类
            this.activeCateId = category.id
            //将子分类改为默认选第一个
            this.activeChildCateIndex = 0
            this.categoryKey = "全部分类"
            //更改排序选项为第一个
            this.rankKey = "综合排序"
            if (this.click) {
                this.click = !this.click
            }
            if (this.click1) {
                this.click1 = !this.click1
            }
        },
        //切换为子分类筛选方式
        chooseCategory() {
            if (this.click1) {
                this.click1 = false
            } else {
                this.click = !this.click
            }
        },
        //切换为排序筛选方式
        chooseRanking() {
            if (this.click) {
                this.click = false
            } else {
                this.click1 = !this.click1
            }
        },
        //更改综合排序选项
        changeRanking(item) {
            this.click1 = !this.click1
            this.rankKey = item
        },
        //更改子分类选项
        changeChildCate(index) {
            this.click = !this.click
            this.activeChildCateIndex = index
            if (index === 0) {
                this.categoryKey = "全部分类"
            } else {
                this.categoryKey = this.activeChildCates[index - 1].name
            }
        },
        //隐藏筛选内容
        hideFilterItems () {
            this.click = this.click1 = false
        },
        //添加商品
        addProduct (pro) {
            //已登录
            if (this.userInfo.id) {
                this.$store.dispatch('addProduct', pro)
                    .then(res => {
                        this.$msg('提示', res.msg)
                        pro.num++
                    })
            } else {
                //还未登录
                this.$msg('提示', '请先登录!')
                    .then(action => {
                        this.$router.push('/login')
                    })
            }
        },
        //减少商品
        subProduct (pro) {
            //已登录
            if (this.userInfo.id) {
                if (pro.num > 0) {
                    this.$store.dispatch('subProduct', pro)
                        .then(res => {
                            this.$msg('提示', res.msg)
                            pro.num--
                        })
                }
            } else {
                //还未登录
                this.$msg('提示', '请先登录!')
                    .then(action => {
                        this.$router.push('/login')
                    })
            }
        }
    }
}
</script>

<style lang="less" scoped>
// 定位
.pos() {
    position: absolute;
    top: 4rem;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.2);
}
// 弹性布局
.flex_row() {
    display: flex;
    flex-flow: row nowrap;
}
.flex_column() {
    display: flex;
    flex-flow: column nowrap;
}
//过滤
.filterStyle() {
    .pos();
    >ul {
        overflow: hidden;
        padding-bottom: 1rem;
        background-color: rgba(255, 255, 255, .95);
        li {
            padding: 0.6rem 0.8rem;
            border: 0.1rem solid #e0e0e0;
            border-radius: 0.4rem;
            float: left;
            color: #777;
            font-size: 1.2rem;
            margin: 0.6rem 0 0 0.6rem;
            &.active{
                background-color: #fff9d9;
                border-color: #e6d056;
            }
        }
    }
}



/* 产品分类 */
.categories {
    width: 24%;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: #f8f8f8;
    ul {
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        li {
            width: 100%;
            height: 3.5rem;
            color: #6d6d6d;
            border-bottom: 1px solid #ccc;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0.3rem 0;
            span {
                font-size: 1.3rem;
                display: block;
                height: 2.9rem;
                line-height: 2.9rem;
                text-align: center;
                width: 100%;
                padding-left: 0.4rem;
                &.active {
                    border-left: 0.4rem solid #f0d001;
                    padding-left: 0;
                }
            }
        }
    }
}
/* 产品列表 */

.products {
    width: 75%;
    position: absolute;
    left: 25%;
    right: 0;
    top: 0;
    bottom: 0;
    /* 筛选 */
    .filter {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        .filterTab {
            height: 4rem;
            position: absolute;
            right: 0;
            left: 0;
            top: 0;
            .flex_row();
            align-items: center;
            background: rgba(255, 255, 255, 0.6);
            border-bottom: 1px solid #e0e0e0;
            z-index: 2;
            p {
                width: 50%;
                margin-bottom: 0;
                text-align: center;
                font-size: 1.3rem;
                color: #777;
                .flex_row();
                align-items: center;
                padding-left: 10%;
                &:first-child {
                    border-right: 1px solid #ccc;
                }
                img {
                    margin-left: 0.5rem;
                    width: 1rem;
                    transform: rotateZ(0deg);
                    transition: all 1s ease;
                    &.rotate1 {
                        /* 点击箭头过渡效果 */
                        transform: rotateZ(-180deg);
                    }
                }
            }
        }
        .ranking {
            .filterStyle();
        }
        .allCategory {
            .filterStyle();
        }
    }
    /* 商品 */
    .productItems {
        position: absolute;
        left: 0;
        right: 0;
        top: 4rem;
        bottom: 0;
        overflow-x: hidden;
        overflow-y: auto;
        background-color: #fff;
        .productItem {
            width: 100%;
            height: 23%;
            border-bottom: 1px solid #e0e0e0;
            .flex_row();
            &:last-of-type {
                border-bottom: none;
            }
            .ProductImg {
                width: 40%;
                height: 100%;
                img {
                    width: 80%;
                    margin: 10%;
                }
            }
            .ProductDetails {
                width: 60%;
                height: 100%;
                display: flex;
                flex-flow: column wrap;
                justify-content: space-around;
                .product_name {
                    text-align: left;
                    font-size: 1.25rem;
                    color: #232b33;
                }
                .proDetails_bottom {
                    height: 40%;
                    .flex_row();
                    justify-content: space-between;
                    font-size: 1.1rem;
                    .left {
                        .flex_column();
                        justify-content: space-between;
                        p {
                            color: #ff3800;
                            margin-bottom: 0.5rem;
                        }
                        span {
                            text-align: left;
                            color: #999;
                        }
                    }
                    .right {
                        margin-right: 15%;
                        .flex_row();
                        justify-content: space-around;
                        align-items: center;
                        span {
                            color: #ff3800;
                            display: block;
                            width: 2.2rem;
                            height: 2.2rem;
                            line-height: 2rem;
                            text-align: center;
                            border: .1rem solid #f40;
                            border-radius: 50%;
                            font-size: 1.6rem;
                            font-weight: bold;
                            &.num {
                                border: none;
                                width: 2rem;
                                height: 1.5rem;
                                line-height: 1.5rem;
                                font-size: 1rem;
                                font-weight: normal;
                            }

                        }
                    }
                }
            }
        }
    }
}
</style>