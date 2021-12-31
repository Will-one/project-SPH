import { reqGetCategoryList, reqGetBannerList, reqGetFloorList } from '@/api'

// home状态管理
const state = {
    categoryList: [],
    bannerList: [],
    floorList: []
}

const mutations = {
    GETCATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList){
        state.floorList = floorList
    }
}

const actions = {
    // 通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async getCategoryList({ commit }) {
        let res = await reqGetCategoryList()
        if (res.code == 200) {
            commit('GETCATEGORYLIST', res.data)
        }
    },

    async getBannerList({ commit }) {
        let res = await reqGetBannerList()
        if (res.code == 200) {
            commit('GETBANNERLIST', res.data)
        }
    },

    async getFloorList({commit}){
        let res = await reqGetFloorList()
        if (res.code == 200) {
            commit('GETFLOORLIST', res.data)
        }
    }
}

const getters = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}