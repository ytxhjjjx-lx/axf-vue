<template>
    <div class="mine">
        <div class="userinfo">
            <div class="user">
                <p class="user-phone">15779289473</p>
                <p class="user-level">V0</p>
            </div>
        </div>
        <div class="favorite">
            <router-link to="/favorite" class="goodFavorite item" tag="div">
                <span class="inner">商品收藏</span>
            </router-link>
            <div class="split"></div>
            <div class="shopFavorite item">
                <span class="inner">店铺收藏</span>
            </div>
        </div>
        <!-- 订单主体 -->
        <div class="mine-content">
            <div class="mine-order">
                <div class="more">
                    <span class="more_order">
                        查看全部订单
                    </span>
                    我的订单
                </div>
                <ul class="order-types">
                    <li class="order-type order-type-11">代付款</li>
                    <li class="order-type order-type-12">待收货</li>
                    <li class="order-type order-type-13">待评价</li>
                    <li class="order-type order-type-14">退款/售后</li>
                </ul>
            </div>
            <div class="block">
                <div>
                    <span class="mine-item mine-item-1">
                        <img src="./images/points_mall.png" alt="">
                    </span>
                    <span>积分商城</span>
                </div>
                <div>
                    <span class="mine-item mine-item-2">
                        <img src="./images/discount_coupon.png" alt="">
                    </span>
                    <span>优惠券</span>
                </div>
                <div>
                    <span class="mine-item mine-item-3">
                        <img src="./images/address_list.png" alt="">
                    </span>
                    <span>收货地址</span>
                </div>
                <div>
                    <span class="mine-item mine-item-4">
                        <img src="./images/customer_feedback.png" alt="">
                    </span>
                    <span>客服/反馈</span>
                </div>
                <div>
                    <span class="mine-item mine-item-5">
                        <img src="./images/about_us.png" alt="">
                    </span>
                    <span>关于我们</span>
                </div>
            </div>
            <div class="unlogin">
                退出当前账号
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.mine{
    font-size: 1.4rem;
}

.userinfo{
    height: 10rem;
    position: relative;
    background-color: #ffd600;
    .user{
        height: 6rem;
        padding-left: 9rem;
        padding-top: 2rem;
        font-size: 1.5rem;
        font-weight: 700;
        color: #fff;
        background: url("./images/user.png") 1.5rem bottom no-repeat;
        -webkit-background-size: auto 6rem;
        background-size: auto 6rem;
        &:after{
            background: url("./images/user_info_bg.png") 0 0 no-repeat;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;
            content: '';
            position: absolute;
            width: 1.1rem;
            height: 1.9rem;
            top: 50%;
            right: 2rem;
            transform: translateY(-50%);
        }
        .user-level {
            color: #f40;
            background: url("./images/user_level_bg.png") left center no-repeat;
            -webkit-background-size: auto 100%;
            background-size: auto 100%;
            line-height: 2.8rem;
            padding-left: 2.9rem;
            font-size: 1rem;
            font-weight: normal;
        }
        .user-phone{
            margin: 0.7rem 0;
            line-height: 1;
        }
    }
}

.favorite{
    display: flex;
    height: 3.5rem;
    align-items: center;
    color: #fff;
    font-size: 1.3rem;
    background-color: #f3c800;
    .item {
        width: 50%;
        display: flex;
        justify-content: center;
    }
    .goodFavorite{
        .inner{
            background: url("./images/shop_favorite.png") left center no-repeat;
            -webkit-background-size: auto 1.8rem;
            background-size: auto 1.8rem;
            padding-left: 3rem;
        }
    }
    .shopFavorite{
        .inner{
            background: url("./images/store_favorite.png") left center no-repeat;
            -webkit-background-size: auto 1.8rem;
            background-size: auto 1.8rem;
            padding-left: 3rem;
        }
    }
    .split{
        width: 1px;
        height: 60%;
        -ms-align-self: center;
        align-self: center;
        background-color: #fff;
    }
}

.mine-content{
    position: absolute;
    padding-top: 1rem;
    top: 13.5rem;
    left: 0;
    right: 0;
    bottom: 4.9rem;
    background-color: #efefef;
    overflow-y: auto;
    overflow-x: hidden;
    .mine-order{
        background-color: #fff;
        font-size: 1.4rem;
        .more {
            background: url("./images/cart-more.png") right center no-repeat;
            -webkit-background-size: auto 1rem;
            background-size: auto 1rem;
            border-bottom: 1px solid #e0e0e0;
            padding: 1.4rem 2.5rem 1.4rem 1.5rem;
            .more_order {
                float: right;
                color: #aaa;
            }
        }
        .order-types{
            overflow: hidden;
            .order-type{
                position: relative;
                float: left;
                width: 25%;
                padding-top: 13%;
                text-align: center;
                line-height: 3rem;
                font-size: 1.2rem;
                background: center 40% no-repeat;
                -webkit-background-size: auto 25%;
                background-size: auto 25%;
            }
            .order-type-11{
                background-image: url("./images/order-type-11.png");
            }
            .order-type-12{
                background-image: url("./images/order-type-12.png");
            }
            .order-type-13{
                background-image: url("./images/order-type-13.png");
            }
            .order-type-14{
                background-image: url("./images/order-type-14.png");
            }
        }
    }
    .block {
        background-color: #fff;
        margin-top: 1rem;
        display: flex;
        flex-flow: row wrap;
        div {
            width: 25%;
            height: 10rem;
            display: flex;
            flex-flow: column wrap;
            justify-content: center;
            align-items: center;
            span {
                font-size: 1.3rem;
                img {
                    height: 2.5rem;
                }
            }
            .mine-item {
                margin-bottom: .5rem;
            }
        }
    }
    .unlogin {
        width: 100%;
        height: 4rem;
        line-height: 4rem;
        font-size: 1.4rem;
        text-align: center;
        margin: 2rem 0 1rem 0;
        background-color: #fff;
    }
}
</style>
