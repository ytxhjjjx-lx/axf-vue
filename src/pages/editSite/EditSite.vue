<template>
    <div class="addSite wrap">
        <HeaderGray headerTitle="修改地址" back="true"></HeaderGray>
        <span class="header-icon save" @click="saveSite">保存</span>
        <!-- 输入框组 -->
        <div class="main_content">
            <div class="edit-form">
                <table width="100%" class="addr-edit">
                    <tbody>
                        <!-- 联系人 -->
                        <tr class="spline-top">
                            <th>联系人</th>
                            <td>
                                <input type="text" class="address-input" placeholder="收货人姓名" v-model="linkman">
                            </td>
                        </tr>
                        <!-- 性别 -->
                        <tr class="spline-top">
                            <th>&nbsp;</th>
                            <td>
                                <span @click="selectSex(0)">
                                    <span class="radio" :class="{checked: sex===0}"></span>
                                    <span class="theme-radio">先生</span>
                                </span>
                                <span @click="selectSex(1)">
                                    <span class="radio" :class="{checked: sex===1}"></span>
                                    <span class="theme-radio">女士</span>
                                </span>
                            </td>
                        </tr>
                        <!-- 手机号 -->
                        <tr class="spline-top">
                            <th>手机号码</th>
                            <td>
                                <input type="text" placeholder="鲜蜂侠联系您的电话" v-model="phone">
                            </td>
                        </tr>
                        <!-- 城市 -->
                        <tr class="spline-top">
                            <th>所在城市</th>
                            <td class="more">
                                <select class="select-city" :value="selectedCity" @change="selectCity">
                                    <option value="">请选择城市</option>
                                    <option v-for="(item,index) in citys" :key="item.city" :value="item.city">{{item.city}}</option>
                                </select>
                            </td>
                        </tr>
                        <!-- 所在地区 -->
                        <tr class="spline-top">
                            <th>所在地区</th>
                            <td class="more">
                                <input type="text" placeholder="请选择您的住宅小区、大厦或学校" 
                                 :value="selectedSite" @click="selectSite">
                            </td>
                        </tr>
                        <!-- 详细地址 -->
                        <tr class="spline-top">
                            <th>详细地址</th>
                            <td>
                                <input type="text" placeholder="请输入楼号门牌号等详细信息" v-model="detailSite">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- 删除地址 -->
            <div class="delete_site">
                删除地址
            </div>
        </div>
    </div>
</template>

<script>
import HeaderGray from '@/components/header-gray/Header-gray'
import api from 'common/api'
export default {
    created () {
        this.$http.get(api.host + '/citys')
            .then(res => {
                this.citys = res.data
                /* this.$store.commit('CHANGE_SELECTED_CITY', this.city)
                let siteId = this.$route.params.id
                let sites = this.sites
                for (let i = 0; i < sites.length; i++) {
                    if (sites[i].id === Number(siteId)) {
                        this.city = sites[i].city
                    }
                } */
            })
    },
    activated () {
        //接收传过来的地址
        this.siteId = this.$route.params.id
        console.log(typeof this.siteId)
        let id = Number(this.$route.params.id)
        for (let i=0; i<this.sites.length; i++) {
            if (this.sites[i].id === id) {
                this.linkman = this.sites[i].linkman
                this.sex = this.sites[i].sex
                this.phone = this.sites[i].phone
                this.detailSite = this.sites[i].detailSite
                // this.city = this.sites[i].city
                this.$store.commit('CHANGE_SELECTED_CITY', this.sites[i].city)
                this.$store.commit('SAVE_SELECTED_SITE', {
                    name: this.sites[i].site,
                    location: {
                        lng: this.sites[i].x,
                        lat: this.sites[i].y
                    }
                })
            }
        }
    },
    data () {
        return {
            linkman: '',
            sex: 0,
            phone: '',
            citys: [],
            detailSite: '',
            city: '',
            siteId: ''
        }
    },
    components: {
        HeaderGray
    },
    computed: {
        selectedCity () { 
            return this.$store.state.selectedCity
        },
        selectedSite () { 
            return this.$store.state.selectedSite
        },
        userInfo () {
            return this.$store.state.userInfo
        },
        sites () {
            return this.$store.state.sites
        }
    },
    methods: {
        saveSite () {
           let siteObj = {
                linkman: this.linkman,
                sex: this.sex,
                phone: this.phone,
                city: this.selectedCity,
                site: this.selectedSite,
                detailSite: this.detailSite,
                userId: this.userInfo.id,
                x: this.selectedX,
                y: this.selectedY,
                id: this.siteId
            }
            this.$store.dispatch('updateSite', siteObj)
                .then(res => {
                    return this.$msg('提示', '修改成功')
                })
                .then(res => {
                    this.$router.push('/site')
                })
        },
        selectSex (type) {
            this.sex = type
        },
        selectCity () {
            let city = event.target.value
            this.$store.commit('CHANGE_SELECTED_CITY', city)
            // 重置所选地址为空
            this.$store.commit('SAVE_SELECTED_SITE', '')
        },
        //选择地址
        selectSite () {
            if (this.selectedCity !== '') {
                this.$router.push('/select-site')
            } else {
                this.$msg('提示', '请先选择城市')
            }
        }
    },
    deactivated () {
        this.linkman = ''
        this.phone = ''
        this.detailSite = ''
        this.sex = 0
    }
}
</script>


<style lang="less" scoped>
.save{
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
    bottom: 0;
    .edit-form {
        background-color: #fff;
        .addr-edit{
            th{
                padding: 1rem 0 1rem 1.5rem;
                text-align: left;
                width: 7rem;
                line-height: 2rem;
                font-weight: 400;
            }
            td{
                input{
                    width: 90%;
                    font-size: 1.25rem;
                }
            }
            .spline-top{
                border-top: 1px solid #e0e0e0;
                font-size: 1.3rem;
            }
            .radio {
                display: inline-block;
                border: 1px solid #bdbdbd;
                border-radius: 50%;
                padding: .6rem;
                vertical-align: middle;
                margin-right: .5rem;
                background: #fff center center no-repeat;
                -webkit-background-size: .7rem;
                background-size: .7rem;
                &.checked {
                    background-image: url("./images/checked.png");
                    background-color: #ffd600;
                    border-color: #ffd600;
                }
            }
            .theme-radio{
                padding-right: 1rem;
            }
            .select-city{
                width: 90%;
                font-size: 1.25rem;
            }
            .more {
                background: url("./images/cart-more.png") right center no-repeat;
                background-size: auto 1rem;
            }
        }
    }
    .delete_site {
        margin-top: .6rem;
        text-align: center; 
        line-height: 3rem; 
        font-size: 1.3rem; 
        background-color: #fff;             
    }
}
</style>