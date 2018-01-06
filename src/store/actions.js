import http from 'axios'
import api from 'common/api'
export default {
    //用户登录或注册
    login ({commit}, userObj) {
        return http.get(api.host + '/users?phone=' + userObj.phone)
                .then(res => {
                    //登录
                    if (res.data.length > 0) {
                        //提取该用户购物车数据(使用关系图谱获取下级资源)
                        http.get(api.host + '/users/' + res.data[0].id + '/carts')
                            .then(res => {
                                commit('SAVE_CARTS', res.data)
                            })
                        //提取该用户送货地址数据
                        http.get(api.host + '/users/' + res.data[0].id + '/sites')
                            .then(res => {
                                commit('SAVE_SITES', res.data)
                            })
                        // 保存用户个人信息
                        commit('LOGIN', res.data[0])
                        return {"msg": "登陆成功"} 
                    } else {
                        //注册
                        return http.post(api.host + '/users', userObj)
                                .then(res => {
                                    if (res.data.id > 0) {
                                        // 注册成功, 保存用户信息
                                        commit('LOGIN', res.data)
                                        return { "msg": "注册成功" }
                                    } else {
                                        return { "msg": "注册失败" }
                                    }
                                })
                    }
                })
    },
    //添加商品
    addProduct (store, product) {
    /* 操作购物车数据的情况(这时的商品对象是vuex中的对象) */
        if (product.cartBol) {
            let newProduct = Object.assign({}, product)
            newProduct.num++
            return http.patch(api.host + '/carts/' + newProduct.id, {
                        num: newProduct.num
                    })
                    .then(res => {
                        // 更改成功
                        if (res.data.id > 0) {
                            store.commit('UPDATE_NUM', product)
                            // return { "msg": "更新数量成功" }
                        }
                    })
          }

    /* 其余情况((这时的商品对象是原始数据中的对象)) */
        let carts = store.state.carts
        let userInfo = store.state.userInfo
        //是否需要添加(默认需要)
        let addBol = true
        for (let i = 0; i < carts.length; i++) {
            //改变数量
            if (carts[i].product_id === product.id) {
                addBol = false
                //更改数据库商品数据
                let newProduct = Object.assign({}, carts[i])
                newProduct.num++
                return http.patch(api.host + '/carts/' + newProduct.id, {
                        num: newProduct.num
                    })
                    .then(res => {
                        //更改vuex(在mutations中实现)
                        if (res.data.id) {
                            //直接传入vuex中的对象
                            store.commit('UPDATE_NUM', carts[i])
                        }
                    })
            }
        }
        //添加
        if (addBol) {
            let productObj = {
                product_id: product.id,
                userId: userInfo.id,
                product_img: product.imgs.min,
                product_name: product.name,
                product_price: product.price,
                checked: true,
                num: 1
            }
            return http.post(api.host + '/carts', productObj)
                .then(res => {
                    if (res.data.id) {
                        store.commit('ADD_PRODUCT', res.data)
                        return {"msg": "添加成功"}
                    }
                })
        }
    },
    //减少商品
    subProduct (store, product) {
        var productId
        /* 操作购物车数据的情况 */
        if (product.cartBol) {
            productId = product.id
        }
        /* 其余情况 */
        let carts = store.state.carts
        //提取该商品在本地购物车中的id(即数据库中的id)
        for (let i = 0; i < carts.length; i++) {
            if (product.id === carts[i].product_id) {
                productId = carts[i].id
            }
        }
        if (product.num > 1) { 
            //更改数量
            let newProduct = Object.assign({}, product)
            newProduct.num--
            return http.patch(api.host + '/carts/' + productId, {
                    num: newProduct.num
                })
                .then(res => {
                    //更改vuex(在mutations中实现)
                    if (res.data.id) {
                        //直接传入vuex中的对象
                        store.commit('SUB_PRODUCT', res.data.id)
                    }
                })
        } else {
            //删除
            return http.delete(api.host + '/carts/' + productId)
                .then(res => {
                    // 先从本地购物车删除该商品
                    store.commit('DELETE', productId)
                })
        }
    },
    // 更改购物车中商品的选中状态
    changeChecked (store, product) {
        // 更新数据库中的商品的状态
        http.patch(api.host + '/carts/' + product.id, {
                checked: !product.checked
            })
            .then(res => {
                if (res.data.id > 0) {
                // 更新本地购物车状态
                    store.commit('CHANGE_CHECKED', product)
                } 
            })
    },
    //全部取消
    checkedAllFalse (store) {
        let carts = store.state.carts
        let num = 0
        async function change() {
            let sum = await changeFalse()
            // console.log(sum)
            //更改本地勾选状态
            store.commit('CHECKED_ALL_FALSE')
        }
        function changeFalse () {
            return new Promise(function (resolve, reject) {
                for (let i = 0; i < carts.length; i++) {
                    http.patch(api.host + '/carts/' + carts[i].id, {
                        checked: false
                    })
                    .then(res => {
                        if(res.data.id > 0) {
                            num++
                            if (num === carts.length) {
                                resolve(num)
                            }
                        }
                    })
                }
            })
        }
        change()
    },  
    //全部勾选
    checkedAllTrue (store) {
        let carts = store.state.carts
        let num = 0
        async function change() {
            let sum = await changeTrue()
            // console.log(sum)
            //更改本地勾选状态
            store.commit('CHECKED_ALL_TRUE')
        }
        function changeTrue () {
            return new Promise(function (resolve, reject) {
                for (let i = 0; i < carts.length; i++) {
                    http.patch(api.host + '/carts/' + carts[i].id, {
                        checked: true
                    })
                    .then(res => {
                        if(res.data.id > 0) {
                            num++
                            if (num === carts.length) {
                                resolve(num)
                            }
                        }
                    })
                }
            })
        }
        change()
    },
    //保存地址
    saveSite (store, site) {
        return http.post(api.host + '/sites', site)
                .then(res => {
                    if(res.data.id) {
                        store.commit('SAVE_SITE', res.data)
                        http.patch(api.host + '/users/' + store.state.userInfo.id, {
                            selectedSite: res.data
                        })
                        .then(res => {
                            // 更新user对象
                            store.commit('UPDATE_USER', res.data)
                        })
                        return {'msg': '保存成功'}
                    }
                })
    },
    changeSelectedSite (store, site) {
        http.patch(api.host + '/users/' + store.state.userInfo.id, {
            selectedSite: site
        })
        .then(res => {
            if (res.data.id > 0){ 
                store.commit('UPDATE_USER', res.data)
            }
        })
    },
    updateSite (store, site) {
        http.put(api.host + '/sites/' + site.id, site)
            .then(res => {
                if (res.data.id > 0) {
                    store.commit('UPDATE_SITE', res.data)
                }
            })
    }
    /* //删除地址
    deleteSite (store, id) {
        return http.delete(api.host + '/sites/' + id)
            .then(res => {
                 //console.log(res.data)  , 返回当前对象id
                store.commit('DELETE_SITE', res.data)
                return {'msg': '删除成功'}
            })
    } */
}