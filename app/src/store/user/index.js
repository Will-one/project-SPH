// 用户登录，注册store模块
import {reqSendCode,reqRegister,reqLogin} from "@/api"

const state = {
    code : ''
}

const mutations = {
    GETOTP(state, code){
        state.code = code
    }
}

const actions = {
    async getOTP({commit},phone){
        let res = await reqSendCode(phone)
        if (res.code == 200){
            commit('GETOTP',res.data)
        } else {
            return Promise.reject(new Error('opt send failed'))
        }
    },
    async register({commit},params){
        let res = await reqRegister(params)
        if (res.code == 200){
            return "registration success"
        } else {
            return Promise.reject(new Error('registration failed'))
        }
    },
    async login({commit},params){
        let res = await reqLogin(params)
        if (res.code == 200){
            return 'login success'
        }else{
            return Promise.reject(new Error(res.message))
        }
    }
}

export default {
    namespaced:true,
    state,
    mutations,
    actions
}