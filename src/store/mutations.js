export default {
    SAVE_CATEGORIES (state, categories) {
        state.categories = categories
    },
    LOGIN (state, userInfo) {
        state.userInfo = userInfo
    },
    SAVE_CARTS (state, carts) {
        state.carts = carts
        //更新本地原始数据(原始商品数据与购物车商品数据有不同属性, 例如num, checked),
        //找到与该用户购物车数据相同的原始数据, 更改num属性值(该属性需要在数据库添加)
        let categories = state.categories
        for (let i = 0; i < categories.length; i++) {
            let products = categories[i].products
            for (let j = 0; j < products.length; j++) {
                for (let k = 0; k < carts.length; k++) {
                    if (products[j].id === carts[k].product_id) {
                        products[j].num = carts[k].num
                        break
                    }
                }
            }
        }
        // console.log(state.categories)
    },
    SAVE_SITES (state, sites) {
        state.sites = sites
    },
    SAVE_FAVORITES (state, favorites) {
        state.favorites = favorites
    },
    ADD_PRODUCT (state, product) {
        state.carts.push(product)
    },
    UPDATE_NUM (state, product) {
        product.num++
    },
    SUB_PRODUCT (state, id) {
        for (let i = 0; i < state.carts.length; i++) {
            if (state.carts[i].id === id) {
                state.carts[i].num--
                break
            }
        }
    },
    DELETE (state, id) {
        for (let i = 0; i < state.carts.length; i++) {
            if (state.carts[i].id === id) {
            //   state.carts[i].num = 0
              state.carts.splice(i, 1)
              break
            }
        }
    },
    // 重置数量
    RESET_CARTS (state, product) {
        label:
        for (let i=0; i<state.categories.length; i++) {
            for (let j=0; j<state.categories[i].products.length; j++) {
                if (state.categories[i].products[j].id === product.product_id) {
                    state.categories[i].products[j].num = product.num
                    break label
                }
            }
        }
    },
    CHANGE_CHECKED (state, product) {
        product.checked = !product.checked
    },
    // 更改全部按钮的选中状态为false
    CHECKED_ALL_FALSE (state) {
        let carts = state.carts
        for (let i = 0; i < carts.length; i++) {
            carts[i].checked = false
        }
    },
    // 更改全部按钮的选中状态为true
    CHECKED_ALL_TRUE (state) {
        let carts = state.carts
        for (let i = 0; i < carts.length; i++) {
            carts[i].checked = true
        }
    },
    CART_POS (state, pos) {
        state.cartPos = pos
    },
    //所选城市
    CHANGE_SELECTED_CITY (state, city) {
        state.selectedCity = city
    },
    //所选地址
    SAVE_SELECTED_SITE (state, site) {
        if (site === '') {
            state.selectedSite = site
        } else {
            state.selectedSite = site.name
            state.selectedX = site.location.lng
            state.selectedY = site.location.lat
        }
    },
    SAVE_SITE (state, site) {
        state.sites.push(site)
    },
    UPDATE_USER (state, data) {
        state.userInfo = data
    },
    UPDATE_SITE (state, site) {
        for (let i = 0; i < state.sites.length; i++) {
            if (state.sites[i].id === site.id) {
                state.sites[i] = site
            }
        }
    },
    FAVORITE (state, obj) {
        state.favorites.push(obj)
    },
    CANCEL_FAVORITE (state, index) {
        state.favorites.splice(index, 1)
    },
    DEL_FAVORITES (state, favorites) {
        for (let i = 0; i < favorites.length; i++) {
            for (let j = 0; j < state.favorites.length; j++) {
                if (favorites[i].id === state.favorites[j].product_id) {
                    state.favorites.splice(j, 1)
                    // console.log(state.favorites)
                    break
                }
            }
        }
    }
}