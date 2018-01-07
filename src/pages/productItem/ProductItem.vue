<template>
    <div class="wrap pro_item">
        <header-gray :headerTitle="product.name"  back="true"/>
        <div class="main_content">
            <!-- 商品描述 -->
            <div class="wraper">
                <div class="product-item-block">
                    <div class="mod-banner-wrap-outer">
                        <img v-lazy="product.imgs.big" ref="bigImg">
                    </div>
                    <div class="mod-pub-product">
                        <div class="product-title-no-short">
                            <p class="product-name">{{product.name}}</p>
                        </div>
                        <div class="product-shopping">
                            <span class="product-price">￥<var>{{product.price}}</var></span>
                        </div>
                    </div>
                </div>
                <div class="product-properties">
                    <div class="title">商品详情</div>
                    <div class="property-item">
                        <span class="leading-word">品<span class="text-hidden">中中</span>牌</span>
                        <span class="content-word">{{product.brand}}</span>
                    </div>
                    <div class="property-item">
                        <span class="leading-word">产品规格</span>
                        <span class="content-word">{{product.unit}}g</span>
                    </div>
                </div>
            </div>
            <!-- 图文详情 -->
            <div class="product-properties">
                <div class="title">图文详情</div>
                <p>{{product.details}}</p>
            </div>
            <!-- 底部图片 -->
            <img width="100%" src="./images/productDetailDefault.jpg" alt="">
        </div>
        <!-- 固定底部 -->
        <div class="pub-footer">
            <div class="favorite" :class="{'selected': favoriteBol}" @click="favorite">收藏</div>
            <div class="operates">
                添加商品：
                <div class="product-operates">
                    <span class="inner product-operates-sub" @click.stop="subProduct">-</span>
                    <span class="product-operates-item">{{product.num}}</span>
                    <span class="inner product-operates-add" @click.stop="addProduct">+</span>
                </div>
            </div>
        </div>
        <!-- 购物车按钮 -->
        <div class="cart-btn" ref="cartBtn" @click="goToCart">
            <div class="cart-btn-num" :class="{'active': tabBarActive}" 
            v-if="cartCounts > 0">{{cartCounts}}</div>
            </div>
        </div>
</template>

<script>
import HeaderGray from "@/components/header-gray/Header-gray"
import api from "common/api"
export default {
    activated() {
        let productId = this.$route.params.id
        //已登录
        if (this.userInfo.id) {
            label: 
            for (let i = 0; i < this.categories.length; i++) {
                let products = this.categories[i].products
                for (let j = 0; j < products.length; j++) {
                    if (products[j].id === Number(productId)) {
                        this.product = products[j]
                        break label
                    }
                }
            }
            //判断是否已收藏
            this.favoriteBol = false
            let favorites = this.favorites
            for (let i = 0; i < favorites.length; i++) {
                if (favorites[i].product_id === Number(productId)) {
                    //已收藏
                    this.favoriteBol = true
                }
            }
        } else {
            //未登录
            this.$http.get(api.host + "/products/" + productId).then(res => {
                this.product = res.data
            })
        }
    },
    data() {
        return {
            product: {
                imgs: {}
            },
            favoriteBol: false,
            tabBarActive: false
        }
    },
    components: {
        HeaderGray
    },
    computed: {
        userInfo() {
            return this.$store.state.userInfo
        },
        categories() {
            return this.$store.state.categories
        },
        cartCounts () {
            return this.$store.getters.cartCounts
        },
        favorites () {
            return this.$store.state.favorites
        }
    },
     watch : {
        //监听cartCounts的变化
        cartCounts () {
            this.tabBarActive = true
            setTimeout(() => {
                this.tabBarActive = false
            }, 300) 
        }
    },
    methods: {
        favorite() {
            if (this.userInfo.id) {
                if (this.favoriteBol) {
                    //已收藏
                    this.$store.dispatch('cancelFavoriteProduct', this.product.id)
                        .then(res => {
                            this.favoriteBol = false
                            this.$msg('提示', res.msg)
                        })
                } else {
                    //未收藏
                    this.$store.dispatch('favoriteProduct', this.product)
                        .then(res => {
                            this.favoriteBol = true
                            this.$msg('提示', res.msg)
                        })
                }
            } else {
                this.$msg('提示', '请先登录')
                .then(res => {
                    this.$router.push('/login')
                })
            }
        },
        goToCart () {
            this.$router.push('/cart')
        },
        addProduct () {
            let pro = this.product
            //已登录
            if (this.userInfo.id) {
                this.$store.dispatch('addProduct', pro)
                    .then(res => {
                        pro.num++
                        //点击图片的位置信息
                        let pos = this.$refs.bigImg.getBoundingClientRect()
                        //购物车数量标志的位置信息
                        let cartPos = this.$refs.cartBtn.getBoundingClientRect()
                        let obj = {
                            src: pro.imgs.min,
                            width: pos.width,
                            height: pos.height,
                            start: {
                                left: pos.left,
                                top: pos.top
                            },
                            end: {
                                left: cartPos.left,
                                top: cartPos.top
                            }
                        }
                        this.$addProduct(obj)
                    })
            } else {
                this.$msg('提示', '请先登录!')
                    .then(res => {
                        this.$router.push('/login')
                    })
            }
        },
        subProduct () {
            let pro = this.product
            if (this.userInfo.id) {
                if (pro.num > 0) {
                    this.$store.dispatch('subProduct', pro)
                        .then(res => {
                            pro.num--
                        })
                }
            } else {
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
.main_content {
  .wraper {
    background-color: #f8f8f8;
    font-size: 1.4rem;
    .product-item-block {
      margin-bottom: 0.5rem;
      background-color: #fff;
      .mod-banner-wrap-outer {
        padding: 1rem;
        img {
          width: 30rem;
          height: 30rem;
        }
      }
      .product-name {
        padding: 0 1rem;
        color: #292d33;
        font-size: 2.3rem;
        line-height: 3rem;
        text-align: center;
        white-space: normal;
      }
      .product-shopping {
        padding: 1rem 0 3rem 0;
        text-align: center;
        color: #f40;
        font-size: 1.8rem;
        font-weight: 400;
        line-height: 2.9rem;
        var {
          font-size: 2.2rem;
          font-weight: 700;
        }
      }
    }
    .property-item {
      line-height: 3rem;
      .leading-word {
        width: 4em;
        display: inline-block;
        color: #848c99;
      }
      .content-word {
        padding-left: 1.5rem;
        color: #333;
      }
    }
  }
}
.pub-footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    line-height: 4.9rem;
    height: 4.9rem;
    background-color: #fff;
    border-top: 1px solid #e0e0e0;
    .favorite {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        background: url("./images/favor.png") top center no-repeat;
        width: 4rem;
        line-height: 1.8rem;
        padding-top: 1.8rem;
        background-size: 1.8rem auto;
        font-size: 1rem;
        text-align: center;
        &.selected {
            background-image: url("./images/favor-select.png");
        }
    }
    .operates {
        padding-left: 5rem;
        font-size: 1.4rem;
        .product-operates{
            float: right;
            overflow: hidden;
            position: absolute;
            left: 12rem;
            top: 50%;
            line-height: 0;
            transform: translateY(-50%);
            >.inner {
                display: inline-block;
                font-size: 2.4rem;
                width: 2.9rem;
                height: 2.9rem;
                line-height: 2.7rem;
                color: #d73e00;
                text-align: center;
                /*padding: 0.8rem;*/
                border: 0.1rem solid #dcbd9e;
                border-radius: 50%;
            }
            .product-operates-add{
                vertical-align: top;
            }
            .product-operates-item{
                display: inline-block;
                height: 2.9rem;
                line-height: 2.9rem;
                vertical-align: top;
                font-size: 1.6rem;
                margin: 0 0.5rem;
            }
        }
    }
}
.cart-btn{
    position: absolute;
    width: 5.4rem;
    height: 5.4rem;
    background: #ffd600 url('./images/cart-btn.png') center center no-repeat;
    background-size: 80%;
    z-index: 3;
    right: .6rem;
    bottom: .8rem;
    border-radius: 50%;
    border: .3rem solid #f7f7f7b2;
    .cart-btn-num{
        position: absolute;
        right: 0;
        top: 0;
        border-radius: 50%;
        background-color: #f40;
        color: #ffffff;
        line-height: 1.8rem;
        width: 1.8rem;
        text-align: center;
        font-size: 1rem;
        transform: scale(1);
        transition: all 0.3s cubic-bezier(0.28,-0.42, 0.37, 1.55);
        &.active{
            transform: scale(1.3);
        }
    }
}
.product-properties {
  padding: 1.5rem;
  background-color: #fff;
  margin-bottom: 0.5rem;
  .title {
    margin-bottom: 1.5rem;
    background: url("./images/title_bg.png") center center no-repeat;
    -webkit-background-size: auto 0.2rem;
    background-size: auto 0.2rem;
    text-align: center;
    color: #e0bd6a;
    font-size: 1.4rem;
  }
  p {
    line-height: 1.5;
    color: #e53333;
    font-size: 1.2rem;
  }
}
</style>

