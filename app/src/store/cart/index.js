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