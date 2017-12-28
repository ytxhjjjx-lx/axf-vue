<template>
    <div class="login_wrap">
        <header-gray headerTitle="验证手机" back="true"/>
        <div class="main_content">
            <div class="login">
                <div class="pic" :class="{'pic-hide': hidePic}">
                    <p class="pic-word">为了方便您及时查询订单信息，鲜蜂侠需要验证您的手机号为查询帐号</p>
                </div>
                <div class="inputs">
                <div class="phone-padding">
                    <input class="phone" v-model="phone" type="tel" placeholder="手机号码" @focus="picHide" @blur="picShow">
                </div>
                </div>
                <div class="login-submit" @click="login">确定</div>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderGray from '@/components/header-gray/Header-gray'
export default {
    data () {
        return {
            // 控制显示隐藏
            hidePic: false,
            phone: ''
        }
    },
    components: {
        HeaderGray
    },
    methods: {
        picHide () {
            this.hidePic = true
        },
        picShow () {
            setTimeout(() => {
                this.hidePic = false
            }, 2000)
        },
        login () {

        }
    }
}
</script>

<style lang="less" scoped>
@color-background: #ffd600;
.theme_bg() {
    background-color: @color-background;
}
.pic{
    height: 6.9rem;
    background-image: url("./images/pic.png");
    .theme_bg();
    background-repeat: no-repeat;
    background-position: 1rem bottom;
    -webkit-background-size: auto 80%;
    background-size: auto 80%;
    position: relative;
    overflow: hidden;
    -webkit-transition: height .4s;
    -o-transition: height .4s;
    transition: height .4s;
    &.pic-hide{
        height: 0px !important;
    }
    .pic-word{
        position: absolute;
        top: 1.7rem;
        width: 62%;
        right: 0;
        font-size: 1.2rem;
        line-height: 1.5rem;
        color: #000;
    }
}

.inputs{
  background-color: #fff;
}
.phone-padding{
    padding: 0 1.5rem;
    .phone{
        font-size: 1.4rem;
        outline: none;
        height: 4rem;
        line-height: 4rem;
        width: 100%;
        border: 0;
    }
}
.login-submit{
    margin: 1rem .6rem;
    height: 4rem;
    line-height: 4rem;
    text-align: center;
    font-size: 1.6rem;
    .theme_bg();
}

</style>


