import {reqGetDetail,reqAddOrUpdateCart} from "@/api"

const state = {
    detailInfo:{}
}

const mutations = {
    GETDETAILINFO(state,detailInfo){
        state.detailInfo = detailInfo
    }
}

const actions={
    async getDetailInfo({commit},skuId){
        let res = await reqGetDetail(skuId)
        if(res.code == 200){
            commit('GETDETAILINFO',res.data)
        }
    },
    async addOrUpdateCart({commit},{skuId,skuNum}){
        let res = await reqAddOrUpdateCart(skuId,skuNum)
        // async函数的返回值是一个Promise对象，加入购物车按钮需要根据结果判断是否跳转
        if(res.code == 200){
            return '加入购物车成功'
        }else{
            return Promise.reject(new Error('加入购物车失败'))
        }
    }
}

const getters = {
    categoryView(state){
        // detailInfo初始是个空对象，不写短路或 控制台会报错
        return state.detailInfo.categoryView || {}
    },
    skuInfo(state){
        return state.detailInfo.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.detailInfo.spuSaleAttrList || {}
    }
}

export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}