<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(cartItem, index) in cartInfoList"
          :key="cartItem.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartItem.isChecked == 1"
              @change="isCheckedHandle(cartItem.skuId, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartItem.imgUrl" />
            <div class="item-msg">{{ cartItem.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cartItem.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="numHandler('minus', cartItem, -1)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cartItem.skuNum"
              minnum="1"
              class="itxt"
              @change="numHandler('change', cartItem, $event.target.value * 1)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="numHandler('plus', cartItem, 1)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartItem.skuNum * cartItem.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="delCartItem(cartItem.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isCheckedAll && cartInfoList.length > 0" @change="isCheckedAllHandle"/>
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import debounce from "lodash/debounce";
export default {
  name: "ShopCart",
  mounted() {
    this.getData()
  },
  computed: {
    ...mapGetters("cart", ["cartList"]),
    // 处理一下cartList数据
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    // 计算购买产品的总价
    totalPrice(){
      let sum = 0
      this.cartInfoList.forEach(cartItem => {
        if(cartItem.isChecked){
          sum += cartItem.skuPrice * cartItem.skuNum
        }
      })
      return sum
    },
    // 全选框是否勾选
    isCheckedAll(){
      // 数组every方法【回调结果有一个false就返回false，全为true返回true】
      return this.cartInfoList.every(cartItem => cartItem.isChecked == 1)
    }
  },
  methods: {
    // 获取个人购物车数据
    getData(){
      this.$store.dispatch("cart/getCartList")
    },

    // 只对数量的修改
    // 要使用lodash的节流函数【点击太频繁会出问题】
    numHandler : debounce(async function(operator, cartItem, operNum) {
      // 针对不同的操作，计算出应该传递的变更数量
      let diffNum = 0;
      switch (operator) {
        case "minus":
          diffNum = cartItem.skuNum > 1 ? operNum : 0;
          break;
        case "plus":
          diffNum = 1
          break
        case "change":
          diffNum = (isNaN(operNum) || operNum < 1) ? 0 : parseInt(operNum) - cartItem.skuNum
      }

      try {
        // 等待修改成功的返回
        await this.$store.dispatch('detail/addOrUpdateCart',{skuId:cartItem.skuId,skuNum:diffNum})
        // 再次发送请求获取购物车数据
        this.getData()
      } catch (error){
        console.log(error.message)
      }
    },300),

    // 改变购物车中商品的勾选状态
    isCheckedHandle : debounce(async function(shuId,event){
      let isChecked = event.target.checked ? "1" : "0"
      try{
        await this.$store.dispatch('cart/checkCart',{shuId:shuId,isChecked:isChecked})
        this.getData()
      }catch(error){
        console.log(error.message)
      }
    },300),

    // 全选 或 全不选 购物车中全部商品的勾选状态
    isCheckedAllHandle : debounce(async function(event){
      let isCheckedAll = event.target.checked ? "1" : "0"
      try{
        await this.$store.dispatch('cart/checkAllCart',isCheckedAll)
        this.getData()
      }catch(error){
        console.log(error.message)
      }
    },500),

    // 删除购物车中的商品
    async delCartItem(skuId){
      try{
        // 删除购物车中的商品
        await this.$store.dispatch('cart/deleteCart',skuId)
        // 再次发送请求获取购物车数据
        this.getData()
      }catch(error){
        console.log(error.message)
      }
    },
    
    // 删除所有选中的的商品
    async deleteAllChecked(){
      // 有没专门的接口处理
      try{
        await this.$store.dispatch('cart/deleteAllChecked')
        // 删除完成后再发送一次请求获取购物车中的数据
        this.getData()
      }catch(error){
        console.log(error.message)
      } 
    }
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>