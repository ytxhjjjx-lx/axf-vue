<template>
    <div class="cart">
        <HeaderGray headerTitle="购物车"/>
        <div class="main_content">
            <!-- 用户信息 -->
            <table class="receive" width="100%">
                <tr>
                    <th width="28%">
                        收<span class="text-hidden"></span>货<span class="text-hidden"></span>人
                    </th>
                    <td>唐菜也 先生</td>
                    <td width="17%"  rowspan="3" class="more extend-click">修改</td>
                </tr>
                <tr>
                    <th>
                        电<span class="text-hidden"></span><span class="text-hidden"></span>话
                    </th>
                    <td>18600805498</td>
                </tr>
                <tr>
                    <th>收货地址</th>
                    <td>深圳市 裕安居1510</td>
                </tr>
            </table>
            <!-- 购物车信息 -->
            <div class="cart-groups-wraper">
                <div class="cart-group">
                    <!-- 凑单专区 -->
                    <div class="group-name">
                        <span>闪送超市</span>
                        <var>凑单专区</var>
                    </div>
                    <p class="group-proptext">¥0起送，22:00前满¥30免运费，22:00后满¥50免运费</p>
                    <!-- 收货时间 -->
                    <p class='group-receive more'>
                        收货时间&nbsp;&nbsp;<select class="group-receive-select">
                        <optgroup label="今天">
                            <option value="30分钟送达">30分钟送达</option>
                            <option value="15:00-16:00">15:00-16:00</option>
                            <option value="16:00-17:00">16:00-17:00</option>
                            <option value="17:00-18:00">17:00-18:00</option>
                            <option value="18:00-19:00">18:00-19:00</option>
                        </optgroup>
                        <optgroup label="明天">
                            <option value="明天 09:00-10:00">明天 09:00-10:00</option>
                            <option value="明天 10:00-11:00">明天 10:00-11:00</option>
                            <option value="明天 11:00-12:00">明天 11:00-12:00</option>
                            <option value="明天 12:00-13:00">明天 12:00-13:00</option>
                        </optgroup>
                        <optgroup label="后天">
                            <option value="后天 09:00-10:00">后天 09:00-10:00</option>
                            <option value="后天 10:00-11:00">后天 10:00-11:00</option>
                            <option value="后天 11:00-12:00">后天 11:00-12:00</option>
                            <option value="后天 12:00-13:00">明天 12:00-13:00</option>
                        </optgroup>
                        </select>
                        <span class="group-receive-ext">可预订</span>
                    </p>
                    <!-- 收货备注 -->
                    <div class="group-comment">
                        <span class="group-comment-txt">收货备注&nbsp;&nbsp;</span>
                        <div class="group-comment-input-wrap">
                            <input type="text" placeholder="可输入100字以内特殊要求内容" class="group-comment-input"/>
                        </div>
                    </div>
                    <!-- 商品列表 -->
                    <table width="100%">
                        <tr class="pro_item" v-for="(item, index) in carts" :key="item.id">
                            <td class="group-item-checkbox" :class="{'active': item.checked}"
                            @click="changeChecked(item)">&nbsp;</td>
                            <td class="group-item-img">
                                <img v-lazy="item.product_img">
                            </td>
                            <td class="group-item-detail">
                                <div>{{item.product_name}}</div>
                                <div class="product-specifics-wrap">
                                    <div class="product-specifics">
                                        <span>￥{{item.product_price}}</span>
                                    </div>
                                    <div class="product-operates">
                                        <span class="inner" @click.stop="subProduct(item)"> - </span>
                                        <span class="product-operates-item">{{item.num}}</span>
                                        <span class="inner" @click.stop="addProduct(item)"> + </span>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <!-- 底部 -->
                     <div class="group-footer">
                        <span class="selectAll" :class="{'selectAll-true': checkedAll, 
                        'selectAll-false': !checkedAll}" @click="changeCheckedAll">全选</span>
                        共：<span class="redfont">￥{{total}}</span>
                        <span class="group-btn">选好了</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderGray from '@/components/header-gray/Header-gray'
export default {
    components: {
        HeaderGray
    },
    computed: {
        // 本地购物车
        carts () {
            return this.$store.state.carts
        },
        userInfo () {
            return this.$store.state.userInfo
        },
        // 返回全选按钮的bol值
        checkedAll () {
            // 假设都是勾选的
            let checkedAll = true
            for (let i = 0; i < this.carts.length; i++) {
                if (!this.carts[i].checked) {
                    checkedAll = false
                    break
                }
            }
            return checkedAll
        },
        // 总价
        total () {
            return this.$store.getters.total
        },
    },
    methods: {
        subProduct (pro) {
            //添加属性以便区别
            pro.cartBol = true
            this.$store.dispatch('subProduct', pro)
                .then(res => { 
                    this.$msg('提示', res.msg)
                    // this.$store.commit('RESET_CARTS', product)
                })
        },
        addProduct (pro) {
            //添加属性以便区别
            pro.cartBol = true
            this.$store.dispatch('addProduct', pro)
                .then(res => { 
                    this.$msg('提示', res.msg)
                    // this.$store.commit('RESET_CARTS', product)
                })
        },
        // 更改购物车商品的勾选状态
        changeChecked (product) {
            this.$store.dispatch('changeChecked', product)
        },
        //更换全选状态
        changeCheckedAll () { 
            if (this.checkedAll) {
                // 全部取消
                this.$store.dispatch('checkedAllFalse') 
            } else {
                // 全部勾选
                this.$store.dispatch('checkedAllTrue')
            }
        }
    }
}
</script>

<style lang="less" scoped>
.receive{
    font-size: 1.4rem;
    font-weight: 400;
    background-image: url("./images/cart-bg.png"),url("./images/cart-bg.png");
    background-position: left top,left bottom;
    background-repeat: repeat-x;
    -webkit-background-size: auto 0.3rem;
    background-size: auto 0.3rem;
    background-color: #fff;
    margin-bottom: 1rem;
    th{
        padding: .7rem 1rem .7rem 1.5rem;
        text-align: left;
    }
}
.cart-group{
    padding-top: 0.5rem;
    font-size: 1.2rem;
    background-color: #fff;
    .group-name{
        padding-left: 1.4rem;
        overflow: hidden;
        padding-right: 1.2rem;
        >span{
            float: left;
            color: #999;
            &:before{
                content: '';
                display: inline-block;
                width: .4rem;
                height: 1.2rem;
                border-radius: .2rem;
                margin-right: .5rem;
                background-color: #ffd600;
                vertical-align: -0.2rem;
            }
        }
        >var{
            float: right;
            height: 2.4rem;
            line-height: 2.4rem;
            border: 0.1rem solid #ff3800;
            border-radius: 1.2rem;
            width: 7rem;
            text-align: center;
            color: #e64f1a;
        }
    }
}
.group-proptext{
    color: #999;
    padding-left: 1.4rem;
    height: 2rem;
    line-height: 2rem;
}
.group-receive{
    padding-left: 1.4rem;
    font-size: 1.4rem;
    height: 5rem;
    line-height: 5rem;
    border-top: 1px solid #e0e0e0;
    .group-receive-select{
        width: 55%;
        color: #e64f1a;
        outline: none;
        appearance: none;
        -webkit-appearance: none;
        border: none;
        font-size: 1.4rem;
        background-color: transparent;
    }
    .group-receive-ext {
        float: right;
        margin-right: 1.5rem;
    }
}
.group-comment{
    height: 5rem;
    line-height: 5rem;
    padding-left: 1.4rem;
    font-size: 1.4rem;
    display: -webkit-flex;
    display: flex;
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    .group-comment-txt{
        float: left;
    }
    .group-comment-input-wrap{
        flex:1;
        padding-right: 2.2rem;
        .group-comment-input{
            height: 3.2rem;
            border: 1px solid #cecece;
            border-radius: .5rem;
            width: 100%;
            box-sizing: border-box;
            outline: none;
            text-indent: .5rem;
            font-size: 1.4rem;
        }
    }
}

// 商品列表
.pro_item {
    border-bottom: 1px solid #e0e0e0;
    .group-item-checkbox{
        background: url("./images/checkbox.png") center center no-repeat;
        -webkit-background-size: 1.8rem 1.8rem;
        background-size: 1.8rem 1.8rem;
        width: 5rem;
        &.active{
            background-image: url("./images/checkbox-selectd.png");
        }
    }
    .group-item-img{
        width: 5rem;
        >img{
            width: 100%;
        }
    }
    .group-item-detail{
        padding-right: 1.2rem;
        >div{
            height: 4rem;
            line-height: 4rem;
            padding-left: 1.5rem;
        }
        .product-specifics-wrap{
            overflow: hidden;
            .product-specifics{
                float: left;
                width: 30%;
                overflow: hidden;
                &>span{
                    display: block;
                    color: #858585;
                    margin-bottom: 1rem;
                }
                >var{
                    color: #f40;
                }
            }
            .product-operates{
                text-align: right;
                .inner{
                    display: inline-block;
                    font-size: 2.4rem;
                    width: 2.9rem;
                    height: 2.9rem;
                    line-height: 2.7rem;
                    color: #ff4300;
                    text-align: center;
                    /*padding: 0.8rem;*/
                    border: 0.1rem solid #ffbe89;
                    border-radius: 50%;
                }
                .product-operates-item{
                    display: inline-block;
                    height: 2.8rem;
                    line-height: 2.8rem;
                    vertical-align: top;
                    font-size: 1.2rem;
                    margin: 0 0.5rem;
                }
            }
        }
    }
}

.group-footer{
    height: 5rem;
    line-height: 5rem;
    font-size: 1.4rem;
    padding-left: 1.4rem;
    margin-bottom: 1rem;
    .selectAll{
        display: inline-block;
        width: 5rem;
        padding-left: 2.5rem;
        -webkit-background-size: 1.8rem 1.8rem;
        background-size: 1.8rem 1.8rem;
        background-repeat: no-repeat;
        background-position: left center;
        &.selectAll-false{
            background-image: url("./images/checkbox.png");
        }
        &.selectAll-true{
            background-image: url("./images/checkbox-selectd.png");
        }
    }
    .group-btn{
        height: 100%;
        float: right;
        width: 10rem;
        text-align: center;
        background-color: #ff0;
    }
}

</style>


