<template>
  <div class="wrapper">
    <div class="header">我的全部购物车</div>
    <div class="content">
      <div
        class="empty"
        v-show="Object.keys(cartListWithProducts).length === 0"
      >
        购物车是空的
      </div>
      <div v-for="(item, index) in cartListWithProducts" :key="index">
        <div class="check">
          <div class="check__shopName">{{ item.shopName }}</div>
          <div
            class="check__productList"
            v-for="(innerItem, innerIndex) in item.ProductList"
            :key="innerIndex"
            v-show="innerItem.count > 0"
          >
            <div class="product__item">
              <img class="product__item__img" :src="innerItem.imgUrl" />
              <div class="product__item__detail">
                <h4 class="product__item__title">{{ innerItem.name }}</h4>
                <p class="product__item__price">
                  <span class="product__item__now">
                    &yen;{{ innerItem.price }} x {{ innerItem.count }}</span
                  >
                  <span class="product__item__total">
                    &yen;{{
                      (innerItem.price * innerItem.count).toFixed(2)
                    }}</span
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="1" />
</template>

<script>
import Docker from "../../components/Docker";
import { useStore } from "vuex";
import { computed, ref } from "vue";

const useCartEffect = () => {
  const store = useStore();
  const cartList = store.state.cartList;
  const cartListWithProducts = computed(() => {
    const newCartList = {};
    for (let shopId in cartList) {
      let total = 0;
      const products = cartList[shopId].ProductList;
      for (let i in products) {
        const product = products[i];
        total += product.count || 0;
      }
      if (total > 0) {
        newCartList[shopId] = cartList[shopId];
      }
    }
    return newCartList;
  });
  return { cartListWithProducts };
};

export default {
  name: "CartList",
  components: { Docker },
  setup() {
    const { cartListWithProducts } = useCartEffect();
    console.log(cartListWithProducts);
    return { cartListWithProducts };
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  background-color: #f1f1f1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0.49rem;
}
.header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 3.75rem;
  line-height: 0.64rem;
  text-align: center;
  background-color: #fff;
  font-size: 0.16rem;
  color: #333333;
}
.content {
  position: absolute;
  overflow-y: scroll;
  top: 0.64rem;
  left: 0;
  right: 0;
  bottom: 0;
}
.empty {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1.5rem;
  line-height: 0.7rem;
  font-size: 0.16rem;
  color: #333;
  text-align: center;
}
.check {
  margin: 0.16rem 0.18rem 0 0.18rem;
  padding: 0.16rem;
  background: #ffffff;
  border-radius: 0.04rem;
  &__shopName {
    font-size: 0.16rem;
    color: #333333;
  }
}

.product {
  &__item {
    display: flex;
    position: relative;
    padding: 0.09rem 0 0.09rem 0;
    margin: 0.16rem 0.18rem 0.16rem 0;
    &__img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &__detail {
      flex: 1;
    }
    &__title {
      line-height: 0.2rem;
      margin: 0;
      font-size: 0.14rem;
      color: #333333;
    }
    &__price {
      display: flex;
      margin: 0.06rem 0;
      line-height: 0.2rem;
    }
    &__now {
      font-size: 0.14rem;
      color: #e93b3b;
      margin-right: 0.06rem;
    }
    &__total {
      flex: 1;
      font-size: 0.14rem;
      color: #000000;
      text-align: right;
    }
  }
}
</style>
