import { reqCategoryList } from '@/api'

// home状态管理
const state = {
    categoryList: []
}

const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    }
}

const actions = {
    // 通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async getCategoryList({ commit }) {
        let res = await reqCategoryList()
        if (res.code == 200) {
            commit('CATEGORYLIST', res.data)
        }
    }
}

const getters = {}

export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}