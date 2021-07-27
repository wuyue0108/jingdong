<template>
  <div class="mask"
       v-show="maskShow"
       @click="() => handleMaskDisplay(false)">
    <div class="mask__confirm"
         @click.stop>
      <div class="mask__confirm__title">确认要离开收银台？</div>
      <div class="mask__confirm__detail">请尽快完成支付，否则将被取消</div>
      <div class="mask__confirm__button">
        <span class="mask__confirm__left"
              @click="() => handleOrderSubmmit(true)">
          取消订单
        </span>
        <span class="mask__confirm__right"
              @click="() => handleOrderSubmmit(false)">确认支付</span>
      </div>
    </div>
  </div>
  <div class="bottom">
    <div class="bottom__left">实付金额 &yen;{{ calculation.totalPrice }}</div>
    <div class="bottom__right"
         @click="() => handleMaskDisplay(true)">
      提交订单
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useCommonCartEffect } from '../../effects/cartEffect'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { post } from '../../utils/request.js'

const useOrderSubmmitEffect = (productList, shopName, shopId) => {
  const router = useRouter()
  const store = useStore()
  const handleOrderSubmmit = async (isCanceled) => {
    const products = []
    for (let i in productList.value) {
      const product = productList.value[i]
      products.push({ id: product._id, num: product.count })
    }
    try {
      const result = await post('/api/order', {
        addressId: 1,
        shopId,
        shopName: shopName.value,
        isCanceled,
        products,
      })
      if (result.errno === 0) {
        router.push({ name: 'OrderList' })
        store.commit('clearProductList', shopId)
      } else {
        // changeToast('登录失败')
      }
    } catch (error) { }
  }
  return { handleOrderSubmmit }
}

const useMaskShowEffect = () => {
  const maskShow = ref(false)
  const handleMaskDisplay = (state) => {
    maskShow.value = state
  }

  return { maskShow, handleMaskDisplay }
}

export default {
  name: 'Bottom',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { productList, shopName, calculation } = useCommonCartEffect()
    const { handleOrderSubmmit } = useOrderSubmmitEffect(productList, shopName, shopId);
    const { maskShow, handleMaskDisplay } = useMaskShowEffect();
    return { calculation, maskShow, handleMaskDisplay, handleOrderSubmmit }
  },
}
</script>

<style lang="scss" scoped>
.mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  &__confirm {
    position: absolute;
    width: 3.01rem;
    height: 1.57rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    background: #ffffff;
    border-radius: 0.04rem;
    &__title {
      margin-top: 0.24rem;
      font-size: 0.18rem;
      color: #333333;
    }
    &__detail {
      margin-top: 0.08rem;
      margin-bottom: 0.24rem;
      font-size: 0.14rem;
      color: #666666;
    }
    &__left,
    &__right {
      display: inline-block;
      width: 0.8rem;
      line-height: 0.32rem;
      border: 0.01rem solid #4fb0f9;
      border-radius: 0.16rem;
      font-size: 0.14rem;
    }
    &__left {
      margin-right: 0.24rem;
      color: #0091ff;
    }
    &__right {
      background: #4fb0f9;
      color: #fff;
    }
  }
}
.bottom {
  display: flex;
  position: absolute;
  line-height: 0.49rem;
  left: 0;
  right: 0;
  bottom: 0;
  font-size: 0.14rem;
  &__left {
    flex: 1;
    padding-left: 0.24rem;
    color: #333;
  }
  &__right {
    text-align: center;
    width: 0.98rem;
    background: #4fb0f9;
    color: #fff;
  }
}
</style>