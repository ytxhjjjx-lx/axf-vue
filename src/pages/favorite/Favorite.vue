<template>
    <div class="wrap favorite">
        <header-gray headerTitle="商品收藏" back="true"/>
        <span class="extend-click header-icon" @click="editSite">
            {{editBol ? '完成' : '编辑'}}
        </span>
        <!-- 收藏商品列表 -->
        <div class="main_content" :style="{'bottom': editBol ? '4.9rem' : '0'}">
            <ul class="products">
                <li class="product-item-wrap" v-for="item in favorites" :key="item.id"
                @click="selectProduct(item)">
                    <div v-if="editBol" class="checkbox" :class="{'selected': item.selected}">
                    </div>
                    <dl class="product-item">
                        <dt class="product-image">
                        <img v-lazy="item.img">
                        </dt>
                        <dd class="product-name">{{item.name}}</dd>
                        <dd class="product-promotion">&nbsp;</dd>
                        <dd class="product-specifics theme-font-gray">{{item.unit}}g</dd>
                        <dd class="product-price-current theme-font">￥{{item.price}}</dd>
                    </dl>
                </li>
            </ul>
        </div>
        <!-- 底部 -->
        <div class="footer" v-show="editBol">
            <span class="selectAll" :class="{'selectAll-true': isSelectAll}"
            @click="selectAllBol">全选</span>
            <span class="theme-btn" @click="deleteFavorite">删除</span>
        </div>
    </div>
</template>

<script>
import HeaderGray from "@/components/header-gray/Header-gray"
export default {
    activated () {
        this.editBol = false
        if (this.userInfo.id) {
            let favors = JSON.parse(JSON.stringify(this.$store.state.favorites))
            for (let i = 0; i < favors.length; i++) {
                favors[i].selected = false
            }
            this.favorites = favors
        } else {
            this.$msg('提示', '请先登录')
                .then(res => {
                    this.$router.push('/login')
                })
        }
    },
    data () {
        return {
            editBol: false,
            favorites: []
        }
    },
    components: {
        HeaderGray
    },
    methods: {
        editSite () {
            this.editBol = !this.editBol
        },
        deleteFavorite () {
            let todoFavorites = this.favorites.filter(item => item.selected)
            if (todoFavorites.length > 0) {
                this.$store.dispatch('deleteFavorites', todoFavorites)
                    .then(res => {
                        this.$msg('提示', res.msg)
                        let favors = JSON.parse(JSON.stringify(this.$store.state.favorites))
                        for (let i = 0; i < favors.length; i++) {
                            favors[i].selected = false
                        }
                        this.favorites = favors
                    })
            }
        },
        selectProduct (product) {
            if (this.editBol) {
                product.selected = !product.selected
            }
        },
        selectAllBol () {
            if (this.isSelectAll) {
                for (let i = 0; i < this.favorites.length; i++) {
                    this.favorites[i].selected = false
                }
            } else {
                for (let i = 0; i < this.favorites.length; i++) {
                    this.favorites[i].selected = true
                }
            }
        }
    },
    computed: {
        userInfo() {
            return this.$store.state.userInfo
        },
        isSelectAll () {
            let bol = true
            for (let i = 0; i < this.favorites.length; i++) {
                if (!this.favorites[i].selected) {
                    bol = false
                }
            } 
            return bol
        }
    }
}
</script>

<style lang="less" scoped>
.header-icon {
    position: absolute;
    top: 0;
    right: .6rem;
    text-align: center;
    width: 6rem;
    height: 4.4rem;
    line-height: 4.4rem;
    font-size: 1.4rem;
    z-index: 2;
    color: #777;
}
.main_content {
    .products {
        background-color: #fff;
    }
    .product-item-wrap{
        padding-left: 3rem;
        border-bottom: 1px solid #e0e0e0;
        position: relative;
        .checkbox{
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            width: 3rem;
            background-image: url("./images/checkbox.png");
            background-repeat: no-repeat;
            background-size: 1.8rem 1.8rem;
            background-position: 1.2rem center;
            &.selected{
                background-image: url("./images/checkbox-selectd.png");
            }
        }
        .product-item{
            padding: 1rem;
            font-size: 1.2rem;
            line-height: 2rem;
            box-sizing: border-box;
            .product-image{
                float: left;
                margin-right: .5rem;
            }
            .theme-font-gray {
                color: #999;
            }
            .theme-font {
                color: #f40;
            }
        }
    }
}
.footer{
    position: fixed;
    background-color: #fff;
    height: 5rem;
    left: 0;
    right: 0;
    bottom: 0;
    padding-left: 2rem;
    .selectAll{
        display: inline-block;
        width: 5rem;
        padding-left: 2.5rem;
        font-size: 1.4rem;
        line-height: 5rem;
        background-image: url("./images/checkbox.png");
        -webkit-background-size: 1.8rem 1.8rem;
        background-size: 1.8rem 1.8rem;
        background-repeat: no-repeat;
        background-position: left center;
        &.selectAll-true{
            background-image: url('./images/checkbox-selectd.png');
        }
    }
    .theme-btn {
        border-radius: .5rem;
        background: #ffd600;
        color: #000;
        text-align: center;
        padding: 1rem 2.4rem;
        font-size: 1.4rem;
        position: absolute;
        right: 1rem;
        top: .7rem;
    }
}
</style>


