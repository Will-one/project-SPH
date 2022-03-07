// 在当前模块，对API进行统一管理
import requests from './request'
// mock
import mockRequests from './mockAjax'

// 首页的三级联动接口
// /api/product/getBaseCategoryList
export const reqGetCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })

// 获取搜索模块数据 接口/api/list 请求方式post
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params })

// 商品详情接口 /api/item/{ skuId } 请求方法get
export const reqGetDetail = (skuid) => requests({ url: '/item/' + skuid, method: 'get' })

// 添加到购物车(对已有物品进行数量改动)接口 /api/cart/addToCart/{ skuId }/{ skuNum } 请求方法post
export const reqAddOrUpdateCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

// 获取购物车列表 接口 /api/cart/cartList 请求方法get
export const reqGetCartList = () => requests({ url: '/cart/cartList', method: 'get' })

// 删除购物车数据 接口 /api/cart/deleteCart/{skuId} 请求方式delete
export const reqDeleteCart = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

// 修改商品的选中状态 /api/cart/checkCart/{skuID}/{isChecked} 请求方式get
export const reqCheckCart = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })

// 获取短信验证码接口【仿真】 /api/user/passport/sendCode/{phone} 请求方式 get
export const reqSendCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })

// 注册用户 /api/user/passport/register 请求方式post
export const reqRegister = (params) => requests({ url: '/user/passport/register', method: 'post', data: params })

// 用户登录 /api/user/passport/login 请求方式post
export const reqLogin = (params) => requests({ url: '/user/passport/login', method: 'post', data: params })

// 获取用户信息【需要带着用户的token向服务器要用户的信息】 /api/user/passport/auth/getUserInfo 请求方式get
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })

// 退出登录 /api/user/passport/logout 请求方法 get
export const reqLogout = () => requests({ url: '/user/passport/logout', method: 'get' })

// 获取用户收货地址 /api/user/userAddress/auth/findUserAddressList 请求方法 get
export const reqUserAddress = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })

// 获取订单商品清单 /api/order/auth/trade 请求方法 get
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'get' })

// 提交订单 /api/order/auth/submitOrder?tradeNo={tradeNo} 请求方法 post
export const reqSubmitOrder = (tradeNo, params) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post', data: params })

// 获取订单支付信息 /api/payment/weixin/createNative/{orderId} 请求方式 get
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })

// 获取订单的支付状态 /api/payment/weixin/queryPayStatus/{orderId} 请求方式 get
export const reqPayStatus = (orderId) => requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

// 获取个人中心订单列表 /api/order/auth/{page}/{limit} 请求方式 get
export const reqMyOrderList = (page,limit) => requests({url:`/order/auth/${page}/${limit}`,methods:'get'})

// mock
export const reqGetBannerList = () => mockRequests({ url: '/banner', method: 'get' })
export const reqGetFloorList = () => mockRequests({ url: '/floor', method: 'get' })