import {reqGetDetail} from "@/api"

const state = {
    detailInfo:{}
}

const mutations = {
    GETDETAILINFO(state,detailInfo){
        state.detailInfo = detailInfo
    }
}

const actions={
    async getDetailInfo({commit},skuid){
        let res = await reqGetDetail(skuid)
        if(res.code == 200){
            commit('GETDETAILINFO',res.data)
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