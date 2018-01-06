<template>
    <div class="wrap">
        <HeaderGray back="true">
            <input type="search" class="title-form" placeholder="请输入地址" 
            maxlength="10" v-model="searchKey" @input="bindSearch">
        </HeaderGray>
        <div class="main_content">
            <!-- 地图 -->
            <div style="width:100%;height:18rem;border:#ccc solid 1px;font-size:12px" 
            id="map"></div>
            <!-- 默认候选地址列表 -->
            <div class="pois-list" v-show="searchResult.length <= 0">
                <ul>
                    <li v-for="(item, index) in result" :key="item.uid"
                    @click="addSite(item)">
                        <p class="pois-item-name">{{item.name}}</p>
                        <p class="font-gray">{{item.address}}</p>
                    </li>
                </ul>
            </div>
            <!-- 搜索候选地址列表 -->
            <div class="pois-list" v-show="searchResult.length > 0">
                <ul>
                    <li v-for="item in searchResult" :key="item.street_id" 
                    @click="addSite(item)">
                        <p class="pois-item-name">{{item.name}}</p>
                        <p class="font-gray">{{item.address}}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderGray from '@/components/header-gray/Header-gray'
import api from 'common/api'
import jsonp from 'jsonp'
import _ from 'underscore'
export default {
    //初始化地图需要依赖dom元素
    activated () {
        let that = this
        //判断是否选择了地址
        if (this.selectedSite === '') {
            // 没有地址, 使用该城市对应的默认地址
            this.$http.get(api.host + '/citys')
            .then(res => {
                this.citys = res.data
                for (let i=0; i<this.citys.length; i++) {
                    if (this.citys[i].city === this.selectedCity) {
                        this.key = this.citys[i].name
                        this.longitude = this.citys[i].longitude
                        this.latitude = this.citys[i].latitude
                    }
                }
                //初始化地图
                initMap()
                //候选地址
                createSiteList()
            })
        } else {
            console.log(this.selectedSite)
            //已经选择了地址, 以该地址作为查询关键字
            this.key = this.selectedSite
            this.longitude = this.selectedX
            this.latitude = this.selectedY
            initMap()
            createSiteList()
        }
        //候选地址
        function createSiteList() {
            let getSiteApi = `http://api.map.baidu.com/place/v2/search?query=${that.key}
            &region=${that.selectedCity}&output=json&ak=VM1vQhGjq8KwvOPgI5WSM3NWPCaLNksa`
            jsonp(getSiteApi, function (error, data) {
                // console.log(data)
                if (error) console.log(error)
                that.result = data.results
            })
        }
        //创建和初始化地图函数：
        function initMap(){
            createMap()//创建地图
            setMapEvent()//设置地图事件
            addMapControl()//向地图添加控件
            addMapOverlay()//向地图添加覆盖物(标记)
        }
        function createMap(){ 
            map = new BMap.Map("map")
            map.centerAndZoom(new BMap.Point(that.longitude, that.latitude),15)
        }
        function setMapEvent(){
            map.enableDragging()
        }
        function addClickHandler(target,window){
            target.addEventListener("click",function(){
                target.openInfoWindow(window)
            })
        }
        function addMapOverlay(){
            var markers = [
                {
                    content:"我的备注",
                    title:"洪浪北地铁站",
                    imageOffset: {
                        width:-46,
                        height:-21
                    },
                    position:{
                        lat: that.latitude,
                        lng: that.longitude
                    }
                }
            ]
            for(var index = 0; index < markers.length; index++ ){
                var point = new BMap.Point(markers[index].position.lng,markers[index].position.lat)
                var marker = new BMap.Marker(point,{icon:new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png",new BMap.Size(20,25),{
                imageOffset: new BMap.Size(markers[index].imageOffset.width,markers[index].imageOffset.height)
                })})
                var label = new BMap.Label(markers[index].title,{offset: new BMap.Size(25,5)});
                var opts = {
                width: 200,
                title: markers[index].title,
                enableMessage: false
                }
                var infoWindow = new BMap.InfoWindow(markers[index].content,opts)
                // marker.setLabel(label)
                addClickHandler(marker,infoWindow)
                map.addOverlay(marker)
            }
        }
        //向地图添加控件
        function addMapControl(){
            var navControl = new BMap.NavigationControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,type:3})
            map.addControl(navControl)
        }
        var map
    },
    components: {
        HeaderGray
    },
    data () {
        return {
            //默认城市列表
            citys: [],
            latitude: 0,
            longitude: 0,
            //检索关键字
            key: '',
            //默认候选地址列表
            result: [],
            //搜索的关键字
            searchKey: '',
            //搜索的候选地址列表
            searchResult: []
        }
    },
    methods: {
        //搜索地址
        bindSearch: _.debounce(function (e) {
            let value = e.target.value
            let getApi = `http://api.map.baidu.com/place/v2/search?query=${value}&
            region=${this.selectedCity}&output=json&ak=VM1vQhGjq8KwvOPgI5WSM3NWPCaLNksa`
            //发送请求
            jsonp(getApi, (error, data) => {
                // console.log(data.results)
                if (error) console.log(error)
                this.searchResult = data.results
            })
        }, 500),
        addSite (site) {
            this.$store.commit('SAVE_SELECTED_SITE', site)
            this.$router.push('/add-site')
        }
    },
    computed: {
        selectedSite () {
            return this.$store.state.selectedSite
        },
        selectedCity () {
            return this.$store.state.selectedCity
        },
        // 所选的经纬度
        selectedX () {
            return this.$store.state.selectedX
        },
        selectedY () {
            return this.$store.state.selectedY
        }
    }
}
</script>

<style lang="less" scoped>
.title-form{
    border: 1px solid #e0e0e0;
    border-radius: .3rem;
    height: 2.6rem;
    line-height: 2.6rem;
    padding-left: 2.4rem;
    background: url('./images/search.png') .6rem center no-repeat;
    -webkit-background-size: 1.3rem;
    background-size: 1.3rem;
    text-align: left;
    font-size: 1.3rem;
}
.main_content {
    bottom: 0;
    .pois-list{
        position: absolute;
        top: 18rem;
        bottom: 0;
        left: 0;
        right: 0;
        padding-left: 1.5rem;
        background-color: #fff;
        overflow-y: scroll;
        li{
            cursor: pointer;
            padding: .5rem 0;
            font-size: 1.4rem;
            border-top: 1px solid #e0e0e0;
            .pois-item-name{
                line-height: 3rem; 
            }
            .font-gray {
                color: #bbb;
                font-size: 1.3rem;
            }
            &:first-child{
                .pois-item-name{
                    color:#f40;
                    padding-left: 1.6rem;
                    background: url("./images/pois.png") left center no-repeat;
                    -webkit-background-size: auto 60%;
                    background-size: auto 60%;
                }
            }
        }
    }
}
</style>

