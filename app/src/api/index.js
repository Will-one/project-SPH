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

// 添加到购物车(对已有物品进行数量改动)接口 /api/cart/addToCart/{ skuId }/{ skuNum } 请求方法post
export const reqAddOrUpdateCart = (skuId,skuNum) => requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})

// 获取购物车列表 接口 /api/cart/cartList 请求方法get
export const reqGetCartList = () => requests({url:'/cart/cartList',method:'get'})

// 删除购物车数据 接口 /api/cart/deleteCart/{skuId} 请求方式delete
export const reqDeleteCart = (skuId) => requests({url:`cart/deleteCart/${skuId}`,method:'delete'})

// 修改商品的选中状态 /api/cart/checkCart/{skuID}/{isChecked} 请求方式get
export const reqCheckCart = (skuId, isChecked)=> requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

// mock
export const reqGetBannerList = () => mockRequests({ url: '/banner', method: 'get' })
export const reqGetFloorList = () => mockRequests({ url: '/floor', method: 'get' })