// 订单模块store
import {reqUserAddress, reqOrderInfo} from "@/api"

const state = {
    addressList : [],
    orderInfo: {}
}

const mutations = {
    GETUSERADDRESS(state,addressList){
        state.addressList = addressList
    },
    GETORDERINFO(state,orderInfo){
        state.orderInfo = orderInfo
    }
}
const actions = {
    // 获取用户地址
    async getUserAddress({commit}){
        let res = await reqUserAddress()
        if(res.code == 200){
            commit('GETUSERADDRESS',res.data)
            return 'get address success'
        } else {
            return Promise.reject(new Error(res.message))
        }
    },

    // 获取订单信息
    async getOrderInfo({commit}){
        let res = await reqOrderInfo()
        if(res.code == 200){
            commit('GETORDERINFO',res.data)
            return 'get orderInfo success'
        } else {
            return Promise.reject(new Error(res.message))
        }
    },
}

export default {
    namespaced:true,
    state,
    mutations,
    actions
}