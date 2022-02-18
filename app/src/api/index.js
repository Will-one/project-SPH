// 在当前模块，对API进行统一管理
import requests from './request'
// mock
import mockRequests from './mockAjax'

// 首页的三级联动接口
// /api/product/getBaseCategoryList
export const reqGetCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })

// 获取搜索模块数据 接口/api/list 请求方式post
export const reqGetSearchInfo = (params) => requests({url:'/list',method:'post',data:params})

// 商品详情接口 /api/item/{ skuId } 请求方法get
export const reqGetDetail = (skuid) => requests({ url:'/item/'+skuid , method:'get'}) 

// mock
export const reqGetBannerList = () => mockRequests({ url: '/banner', method: 'get' })
export const reqGetFloorList = () => mockRequests({ url: '/floor', method: 'get' })