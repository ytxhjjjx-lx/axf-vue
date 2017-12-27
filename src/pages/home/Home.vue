<template>
    <div class="home">
        <header-yellow />
        <div class="main_content">
            <!-- 轮播 -->
            <div class="slideshow">
                <mt-swipe :auto="3000">
                    <mt-swipe-item v-for="(item, index) in bannar" :key="item.id">
                        <img :src="item.bannar_img">
                    </mt-swipe-item>
                </mt-swipe>
            </div>
            <!-- 商品列表 -->
            <div class="product_wrap">
                <div class="products" v-for="(item, index) in categories" 
                :key="item.id" v-if="index < 5">
                    <h3 class="category_item">
                        <span>{{item.name}}</span><a href="###">更多&gt;</a>
                    </h3>
                    <div class="category_item_img"><img v-lazy="item.category_img" alt=""></div>
                    <ul class="category_item_goodsList">
                        <li v-for="(pro, index) in item.products" :key="pro.id" v-if="index < 3">
                            <div class="product_image">
                                <!-- ref获取dom元素 -->
                                <img v-lazy="pro.imgs.min" alt="">
                            </div>
                            <div class="Product_details">
                                <div class="top">
                                    <p class="no_wrap">{{pro.name}}</p>
                                </div>
                                <div class="bottom">
                                    <div class="btm_left">
                                        <span class="capacity">{{pro.unit}}ml</span>
                                        <p class="price">￥{{pro.price}}<span></span></p>
                                    </div>
                                    <div class="btm_right">
                                        <span> + </span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderYellow from '@/components/header-yellow/Header-yellow'
import api from 'common/api'
export default {
    created () {
        // 获取bannar
        this.$http.get(api.host + '/bannar')
        .then(res => {
            this.bannar = res.data
        })
    },
    data () {
        return {
            bannar: []
        }
    },
    computed: {
        categories () {
            return this.$store.state.categories
        }
    },
    components: {
        HeaderYellow
    }
}
</script>

<style lang="less" scoped>
.slideshow {
    height: 12rem;
    img {
        width: 100%;
    }
}
.product_wrap {
    .products {
        height: 29rem;
        background-color: #fff;
        margin-bottom: 1rem;
        h3 {
            width: 100%;
            height: 4rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 0;
            span {
                font-size: 1.4rem;
                font-weight: bold;
                color: #60659F;
                border-left: .8rem solid #60659F;
                margin-left: 3%;
                padding-left: 0.6rem;
            }
            a {
                font-size: 1.3rem;
                color: #999;
                margin-right: 3%;
            }
        }
        .category_item_img {
            width: 100%;
            overflow: hidden;
            text-align: center;
            img {
                width: 92%;
            }
        }
        .category_item_goodsList {
            width: 100%;
            margin: 1rem 0;
            li {
                width: 33%;
                height: 100%;
                float: left;
                border-right: 1px solid #aaa;
                &:last-child {
                    border-right: none;
                }
                > .product_image {
                    display: flex;
                    height: 7rem;
                    margin-bottom: 1rem;
                    img{
                        width: 60%;
                        margin: auto;
                    }
                }
                > .Product_details {
                    display: flex;
                    flex-flow: column wrap;
                    justify-content: space-around;
                    .top {
                        width: 100%;
                        font-size: 1.2rem;
                        margin-bottom: 1.5rem;
                        p {
                            color: #232b33;
                            width: 100%;
                            padding: 0 0.6rem;
                            
                        }
                    }
                    .bottom {
                        width: 100%;
                        height: 5rem;
                        display: flex;
                        flex-flow: row nowrap;
                        justify-content: space-between;
                        font-size: 1.1rem;
                    }
                    .btm_left {
                        height: 100%;
                        margin-left: 5%;
                        display: flex;
                        flex-flow: column nowrap;
                        justify-content: space-around;
                        .capacity {
                            color: #999;
                        }
                        p {
                            margin-bottom: 0;
                            color: #ff3800;
                        }
                    }
                    .btm_right {
                        width: 30%;
                        height: 100%;
                        margin-right: 5%;
                        display: flex;
                        align-items: center;
                        span {
                            color: #ff3800;
                            display: block;
                            width: 2.2rem;
                            height: 2.2rem;
                            font-size: 1.6rem;
                            font-weight: bold;
                            line-height: 2rem;
                            border: .1rem solid #f40;
                            border-radius: 50%;
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
}
</style>
