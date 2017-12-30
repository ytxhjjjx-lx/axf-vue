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
                        // 登陆成功，保存用户信息
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
                            return { "msg": "更新数量成功" }
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
                            return {"msg": "更新数量成功"}
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
                        return {"msg": "减少数量成功"}
                    }
                })
        } else {
            //删除
            return http.delete(api.host + '/carts/' + productId)
                .then(res => {
                    // 先从本地购物车删除该商品
                    store.commit('DELETE', productId)
                    return { "msg": "删除商品成功" }
                })
        }
    }

}