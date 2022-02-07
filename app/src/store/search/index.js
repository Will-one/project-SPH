// search状态管理
import { reqGetSearchInfo } from "@/api"

const state = {
    searchInfo:{}
}

const mutations = {
    GETSEARCHINFO(state, searchInfo) {
        state.searchInfo = searchInfo
    }
}

const actions = {
    async getSearchInfo({ commit }, params = {}) {
        // params形参：是用户dispatch的时候，第二个参数传递过来的，至少是一个空对象
        let res = await reqGetSearchInfo(params)
        if (res.code == 200) {
            commit('GETSEARCHINFO', res.data)
        }
    }
}

// 计算属性
// 项目中getters主要的作用是：简化仓库中的数据
// 可以把将来在组件中需要用到的数据简化一下【在具体使用的时候获取就比较方便】
const getters = {
    goodsList(state){
        return state.searchInfo.goodsList || []
    },
    trademarkList(state){
        return state.searchInfo.trademarkList || []
    },
    attrsList(state){
        return state.searchInfo.attrsList || []
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}