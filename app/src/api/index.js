// 在当前模块，对API进行统一管理
import requests from './request'
// mock
import mockRequests from './mockAjax'

// 首页的三级联动接口
// /api/product/getBaseCategoryList
export const reqGetCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })

// mock
export const reqGetBannerList = () => mockRequests({ url: '/banner', methods: 'get' })
export const reqGetFloorList = () => mockRequests({ url: '/floor', methods: 'get' })