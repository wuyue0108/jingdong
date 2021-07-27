<template>
  <div class="check">
    <div class="check__shopName">{{ shopName }}</div>
    <div class="check__productList"
         v-for="item in productList"
         :key="item._id">
      <div class="product__item">
        <img class="product__item__img"
             :src="item.imgUrl" />
        <div class="product__item__detail">
          <h4 class="product__item__title">{{ item.name }}</h4>
          <p class="product__item__price">
            <span class="product__item__now">
              &yen;{{ item.price }} x {{ item.count }}</span>
            <span class="product__item__total">
              &yen;{{ (item.price * item.count).toFixed(2) }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Check',
  props: ['productList', 'shopName'],
}
</script>

<style lang="scss" scoped>
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