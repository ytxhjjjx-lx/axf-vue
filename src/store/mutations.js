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
    RESET_CARTS () {
        
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
}