<template>
    <div class="siteWrap">
        <HeaderGray headerTitle="选择地址" back="true"/>
        <div class="main_content">
            <!-- 没有地址 -->
            <div class="empty-notice" v-if="sites.length<=0">
                <div class="notice-icon"></div>
                您还没地址哦~
            </div>
            <!-- 地址列表 -->
            <ul class="addr-list block" v-if="sites.length>0">
                <li class="addr-item"  v-for="item in sites" :key="item.id">
                    <div class="addr-desc" :class="{'selected': userInfo.selectedSite.id == item.id}"
                    @click="changeSelectedSite(item)">
                        <p class="no_wrap">{{item.linkman}}&nbsp;&nbsp;&nbsp;{{item.phone}}</p>
                        <p class="no_wrap">{{item.city}}&nbsp;{{item.site}}</p>
                    </div>
                    <div class="addr-edit" @click="goToEditSite('/edit-site/' + item.id)">
                    </div>
                </li>
            </ul>
            <!-- 新增地址 -->
            <div class="pub-footer">
                <div class="theme-btn-big" @click="addSite">新增地址</div>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderGray from '@/components/header-gray/Header-gray'
export default {
    computed: {
        userInfo () {
            return this.$store.state.userInfo
        },
        sites () {
            return this.$store.state.sites
        }
    },
    components: {
        HeaderGray
    },
    methods: {
        addSite () {
            this.$router.push('/add-site')
        },
        changeSelectedSite (site) {
            this.$store.dispatch('changeSelectedSite', site)
                .then(res => {
                    this.$router.push('./cart')
                })
        },
        goToEditSite (url) {
            this.$router.push(url)
        }
    }
}
</script>


<style lang="less" scoped>
.main_content {
    bottom: 0;
    .empty-notice{
        padding-top: 20%;
        text-align: center;
        line-height: 4rem;
        font-size: 1.4rem;
        .notice-icon{
            width: 8rem;
            height: 8rem;
            border-radius: 4rem;
            background: url("./images/empty_addrlist.png") center center no-repeat;
            -webkit-background-size: contain;
            background-size: contain;
            margin: 0 auto;
        }
    }
    .pub-footer{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        line-height: 5rem;
        height: 5rem;
        background-color: #fff;
        .theme-btn-big{
            margin: .7rem 20%;
            height: 3.7rem;
            line-height: 3.7rem;
            text-align: center;
            font-size: 1.4rem;
            border-radius: .5rem;
            color: #000;
            background-color: #ffd600;
        }
    }
    .addr-list{
        font-size: 1.4rem;
        background-color: #fff;
        margin-top: 1rem;
        .addr-item{
            height: 8rem;
            position: relative;
            border-top: 1px solid #ccc;
            .addr-desc{
                position: absolute;
                left: 0;
                top: .5rem;
                right: 8rem;
                bottom: .5rem;
                line-height: 2.8rem;
                padding-top: .7rem;
                padding-left: 1rem;
                border-left: 0.5rem solid transparent;
                &.selected{
                    border-left: 0.5rem solid #ffd600;
                }
            }
            .addr-edit{
                position: absolute;
                width: 8rem;
                height: 5.2rem;
                top: 1.5rem;
                right: 0;
                background: url("./images/addr-edit.png") center center no-repeat;
                background-size: 2.2rem;
                border-left: 1px solid #e0e0e0;
            }
        }
    }
}


</style>

