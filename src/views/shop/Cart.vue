<template>
  <div class="mask"
       v-show="productShow && calculation.totalNumber > 0"
       @click="changeProductShow"></div>
  <div class="cart">
    <div class="product"
         v-show="productShow && calculation.totalNumber > 0">
      <div class="product__header">
        <div class="product__header__all">
          <span class="product__header__icon iconfont"
                @click="() => changAllChecked(shopId)"
                v-html="calculation.allChecked ? '&#xe652;' : '&#xe66c;'"></span>
          全选
        </div>
        <div class="product__header__clear">
          <span @click="() => clearProductList(shopId)">清空购物车</span>
        </div>
      </div>
      <template v-for="item in productList"
                :key="item._id">
        <div class="product__item">
          <div class="product__item__check iconfont"
               @click="
              () => {
                changeCartItemChecked(shopId, item._id)
              }
            "
               v-html="item.checked ? '&#xe652;' : '&#xe66c;'"></div>
          <img class="product__item__img"
               :src="item.imgUrl" />
          <div class="product__item__detail">
            <h4 class="product__item__title">{{ item.name }}</h4>
            <p class="product__item__price">
              <span class="product__item__now"> &yen;{{ item.price }}</span>
              <span class="product__item__origin">&yen;{{ item.oldPrice }}</span>
            </p>
          </div>
          <div class="product__number">
            <span @click="() => changeCartCountInfo(shopId, item._id, item, -1)"
                  class="product__number__sub">-</span>
            {{ item.count || 0 }}
            <span @click="() => changeCartCountInfo(shopId, item._id, item, 1)"
                  class="product__number__add">+</span>
          </div>
        </div>
      </template>
    </div>
    <div class="check">
      <div class="check__icon">
        <img class="check__icon__img"
             @click="changeProductShow"
             src="http://www.dell-lee.com/imgs/vue3/basket.png"
             alt="" />
        <div class="check__icon__tag">{{ calculation.totalNumber }}</div>
      </div>
      <div class="check__info">
        总计：
        <span class="check__info__price">&yen;{{ calculation.totalPrice }}</span>
      </div>
      <div class="check__btn"
           v-show="calculation.totalNumber>0">
        <router-link :to="{ path: `/orderConfirmation/${shopId}` }">
          去结算
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, toRef, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffect'

const useCartEffect = () => {
  const { changeCartCountInfo, productList } = useCommonCartEffect()
  const store = useStore()
  const route = useRoute()
  const shopId = route.params.id
  const cartList = store.state.cartList
  const { calculation } = useCommonCartEffect()

  // const calculation = computed(() => {
  //     const result = {totalNumber:0,totalPrice:0,allChecked:true}
  //     const productList  = cartList[shopId]?.ProductList;
  //     if(productList){
  //         for(let i in productList){
  //             const product = productList[i]
  //             result.totalNumber += product.count;
  //             if(product.checked){
  //                 result.totalPrice += product.count * product.price;
  //             }
  //             if(productList[i].count > 0 && !productList[i].checked ){
  //                 result.allChecked = false;
  //             }
  //         }
  //     }
  //     result.totalPrice = result.totalPrice.toFixed(2)
  //     return result
  // })
  const changeCartItemChecked = (shopId, productId) => {
    store.commit('changeCartItemChecked', { shopId, productId })
  }
  const clearProductList = (shopId) => {
    store.commit('clearProductList', { shopId })
  }
  //这里
  const changAllChecked = (shopId) => {
    store.commit('changAllChecked', { shopId })
  }
  return {
    productList,
    changeCartCountInfo,
    changeCartItemChecked,
    clearProductList,
    changAllChecked,
    cartList,
    calculation,
  }
}
const changeCartShowEffect = () => {
  const productShow = ref(false)
  const changeProductShow = () => {
    productShow.value = !productShow.value
  }
  return { productShow, changeProductShow }
}
export default {
  name: 'Cart',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const {
      productList,
      changeCartCountInfo,
      changeCartItemChecked,
      clearProductList,
      changAllChecked,
      calculation,
    } = useCartEffect()
    const { productShow, changeProductShow } = changeCartShowEffect()
    console.log(productList)
    return {
      productList,
      changeCartCountInfo,
      shopId,
      changeCartItemChecked,
      clearProductList,
      changAllChecked,
      changeProductShow,
      productShow,
      calculation,
    }
  },
}
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
}
.cart {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 2;
  .product {
    flex: 1;
    overflow-y: scroll;
    &__header {
      display: flex;
      height: 0.52rem;
      width: 100%;
      border-bottom: 0.01rem solid #f1f1f1;
      &__icon {
        padding-right: 0.2rem;
        color: #0091ff;
        font-size: 0.2rem;
      }
      &__all {
        flex: 1;
        font-size: 0.14rem;
        color: #333333;
        line-height: 0.16rem;
        padding-left: 0.34rem;
        padding-top: 0.18rem;
      }
      &__clear {
        text-align: right;
        width: 1.06rem;
        font-size: 0.14rem;
        color: #333333;
        line-height: 0.16rem;
        padding: 0.18rem;
      }
    }
    &__item {
      display: flex;
      position: relative;
      padding: 0.09rem 0 0.09rem 0;
      margin: 0 0.18rem 0 0.16rem;
      border-bottom: 0.01rem solid #f1f1f1;
      &__check {
        width: 0.54rem;
        line-height: 0.46rem;
        color: #0091ff;
        text-align: center;
        font-size: 0.2rem;
      }
      &__img {
        width: 0.46rem;
        height: 0.46rem;
        margin-right: 0.16rem;
      }
      &__title {
        line-height: 0.2rem;
        margin: 0;
        font-size: 0.14rem;
        color: #333333;
      }
      &__price {
        margin: 0.06rem 0;
        line-height: 0.2rem;
      }
      &__now {
        font-size: 0.14rem;
        color: #e93b3b;
        margin-right: 0.06rem;
      }
      &__origin {
        font-size: 0.12rem;
        color: #999999;
        line-height: 0.2rem;
        text-decoration: line-through;
      }
    }
    &__number {
      position: absolute;
      bottom: 0.25rem;
      right: 0;
      font-size: 0.14rem;
      color: #333333;
      line-height: 0.16rem;
      &__add,
      &__sub {
        display: inline-block;
        width: 0.2rem;
        height: 0.2rem;
        border-radius: 50%;
        text-align: center;
        line-height: 0.18rem;
        font-size: 0.2rem;
      }
      &__add {
        margin-left: 0.1rem;
        border: 0.01rem solid #666666;
        color: #666666;
      }
      &__sub {
        margin-right: 0.1rem;
        border: 0.01rem solid #0091ff;
        background: #0091ff;
        color: #ffffff;
      }
    }
  }
}
.check {
  display: flex;
  &__icon {
    position: relative;
    width: 0.76rem;
    height: 0.49rem;
    &__img {
      display: block;
      width: 0.28rem;
      height: 0.26rem;
      margin: 0.11rem auto 0.12rem auto;
    }
    &__tag {
      position: absolute;
      top: 0.04rem;
      right: 0.16rem;
      min-width: 0.2rem;
      height: 0.2rem;
      border-radius: 0.1rem;
      line-height: 0.2rem;
      text-align: center;
      transform: scale(0.5, 0.5);
      background-color: #e93b3b;
      color: #ffffff;
      transform-origin: left center;
    }
  }
  &__info {
    flex: 1;
    padding-left: 0.08rem;
    font-size: 0.12rem;
    color: #333333;
    &__price {
      line-height: 0.49rem;
      font-size: 0.18rem;
      color: #e93b3b;
    }
  }
  &__btn {
    width: 0.98rem;
    line-height: 0.49rem;
    text-align: center;
    background: #4fb0f9;
    font-size: 0.14rem;
    a {
      text-decoration: none;
      color: #ffffff;
    }
  }
}
</style>