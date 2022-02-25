import {reqCheckCart, reqDeleteCart, reqGetCartList} from "@/api"

const state = {
    cartList:[]
}

const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList = cartList
    }
}

const actions = {
    async getCartList({commit}){
        let res = await reqGetCartList()
        if(res.code == 200){
            commit("GETCARTLIST",res.data)
        }
    },

    async deleteCart({commit},skuId){
        let res = await reqDeleteCart(skuId)
        if(res.code == 200){
            return 'delete success'
        }else{
            return Promise.reject(new Error('delete faile'))
        }
    },

    async checkCart({commit},{shuId,isChecked}){
        let res = await reqCheckCart(shuId,isChecked)
        if(res.code ==200){
            return 'success'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },

    // 删除全部勾选的产品
    async deleteAllChecked({dispatch,getters}){
        // context【仓库对象】：commit【提交mutations修改state】,getters【计算属性】,dispatch【派发actions】,state【当前仓库数据】
        let promiseAll = []
        getters.cartList.cartInfoList.forEach(cartItem => {
            let promise = cartItem.isChecked == 1 ?  dispatch('deleteCart',cartItem.skuId):''
            promiseAll.push(promise)
        });
        // Promise.all这个方法接受一个promise对象数组
        // 当数组中的所有promise对象的状态全为成功的话就all方法就返回一个成功的promise对象
        return Promise.all(promiseAll)
    },

    // 
    async checkAllCart({dispatch,getters},isCheckedAll){
        let promiseAll = []
        getters.cartList.cartInfoList.forEach(cartItem => {
            let promise = cartItem.isChecked == isCheckedAll ? '' : dispatch('checkCart',{shuId:cartItem.skuId,isChecked:isCheckedAll})
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }
}

const getters = {
    cartList(state){
        return state.cartList[0] || {}
    }
}

export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}