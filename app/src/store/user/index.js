// 用户登录，注册store模块
import {reqSendCode,reqRegister,reqLogin, reqUserInfo,reqLogout} from "@/api"
import {setToken,getToken,removeToken} from "@/utils/token"

const state = {
    code : '',
    token : getToken(),
    userInfo : {}
}

const mutations = {
    GETOTP(state, code){
        state.code = code
    },
    LOGIN(state,token){
        state.token = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    // 清除本地存储的token和用户信息
    CLEAR(state){
        state.token = ''
        state.userInfo = {}
        removeToken()
    }
}

const actions = {
    // 获取短信验证码
    async getOTP({commit},phone){
        let res = await reqSendCode(phone)
        if (res.code == 200){
            commit('GETOTP',res.data)
        } else {
            return Promise.reject(new Error('opt send failed'))
        }
    },
    // 用户注册
    async register({commit},params){
        let res = await reqRegister(params)
        if (res.code == 200){
            return "registration success"
        } else {
            return Promise.reject(new Error('registration failed'))
        }
    },
    // 账号密码登录
    async login({commit},params){
        let res = await reqLogin(params)
        if (res.code == 200){
            commit('LOGIN',res.data.token)
            // 持久化存储token
            setToken(res.data.token)
            return 'login success'
        }else{
            return Promise.reject(new Error(res.message))
        }
    },
    // 使用token获取用户信息
    async getUserInfo({commit}){
        let res = await reqUserInfo()
        if(res.code == 200){
            commit('GETUSERINFO',res.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },

    async logout({commit}){
        let res = await reqLogout()
        if (res.code == 200){
            commit('CLEAR')
            return 'logout success'
        } else {
            return Promise.reject(new Error('logout faile'))
        }
    }
}

export default {
    namespaced:true,
    state,
    mutations,
    actions
}