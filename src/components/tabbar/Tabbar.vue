<template>
    <div class="tabbar">
        <router-link to="/" class="home">
            <span></span>
            首页
        </router-link>
        <router-link to="/flashsend" class="flashsend">
            <span></span>
            闪送超市
        </router-link>
        <router-link to="/cart" class="cart" ref="cartEl">
            <span></span>
            购物车
        </router-link>
        <router-link to="/mine" class="mine">
            <span></span>
            我的
        </router-link>
    </div>
</template>

<style lang="less" scoped>
.tabbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 4.9rem;
    background-color: rgba(246, 246, 246, 0.95);
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    a {
        float: left;
        width: 25%;
        height: 100%;
        text-align: center;
        color: #777;
        text-decoration: none;
        position: relative;
        font-size: 1.3rem;
        span {
            display: block;
            width: 100%;
            height: 50%;
            background-repeat: no-repeat;
            background-position: center center;
            background-size: auto 1.7rem;
            margin-bottom: .3rem;
        }
        &.router-link-exact-active {
            span {
                animation: navs_animation 0.7s;
            }
        }
    }
    a.home {
        span {
            background-image: url("./img/home.png");
        }
        /* 点击切换背景图 */        
        &.router-link-exact-active {
            span {
                background-image: url("./img/home-active.png");
            }
        }
    }
    a.flashsend {
        span {
            background-image: url("./img/current.png");
        }
        &.router-link-exact-active {
            span {
                background-image: url("./img/current-active.png");
            }
        }
    }
    a.cart {
        span {
            background-image: url("./img/cart.png");
        }
        &.router-link-exact-active {
            span {
                background-image: url("./img/cart-active.png");
            }
        }
    }
    a.mine {
        span {
            background-image: url("./img/mine.png");
        }
        &.router-link-exact-active {
            span {
                background-image: url("./img/mine-active.png");
            }
        }
    }
}
/* 购物车数量改变动画 */
@keyframes my_animation {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.2);
  }
  50% {
    transform: scale(1.4);
  }
  75% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
/* 点击切换按钮动画 */
@keyframes navs_animation {
  0% {
    -webkit-background-size: auto 0.6rem;
    background-size: auto 0.6rem;
  }
  20% {
    -webkit-background-size: auto 2rem;
    background-size: auto 2rem;
  }
  40% {
    -webkit-background-size: auto 1rem;
    background-size: auto 1rem;
  }
  60% {
    -webkit-background-size: auto 1.9rem;
    background-size: auto 1.9rem;
  }
  80% {
    -webkit-background-size: auto 1.2rem;
    background-size: auto 1.2rem;
  }
  100% {
    -webkit-background-size: auto 1.5rem;
    background-size: auto 1.5rem;
  }
}
</style>
