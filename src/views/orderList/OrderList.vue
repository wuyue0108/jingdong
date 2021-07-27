<template>
  <div class="wrapper">
    <div class="header">我的订单</div>
    <div class="content">
      <div class="content__item" v-for="(item, index) in list" :key="index">
        <div class="content__title">
          <div class="content__title__name">{{ item.shopName }}</div>
          <div class="content__title__state">
            {{ item.isCanceled ? "已取消" : "已下单" }}
          </div>
        </div>
        <div class="content__detail">
          <div class="content__detail__imgs">
            <template
              v-for="(innerItem, innerIndex) in item.products"
              :key="innerIndex"
            >
              <img class="content__detail__img" :src="innerItem.product.img" />
            </template>
          </div>
          <div class="content__detail__info">
            <div class="content__detail__info__price">
              ¥{{ item.totalPrice }}
            </div>
            <div class="content__detail__info__count">
              共{{ item.totalCount }}件
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="2" />
</template>

<script>
import { get } from "../../utils/request";
import { reactive, toRefs } from "vue";
import Docker from "../../components/Docker";

const useOrderListEffect = () => {
  const data = reactive({ list: [] });
  const getOrderList = async () => {
    const result = await get(`/api/order`);
    console.log(result);
    if (result?.errno === 0 && result?.data?.length) {
      const orderList = result.data;
      orderList.forEach(order => {
        const products = order.products;
        let totalPrice = 0;
        let totalCount = 0;
        products.forEach(productItem => {
          totalCount += productItem.orderSales;
          totalPrice += productItem.orderSales * productItem.product.price;
        });
        order.totalPrice = totalPrice;
        order.totalCount = totalCount;
      });
      data.list = result.data;
    }
  };
  getOrderList();
  const { list } = toRefs(data);
  return { list };
};

export default {
  name: "OrderList",
  components: { Docker },
  setup() {
    const { list } = useOrderListEffect();
    return { list };
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0.49rem;
  background-color: #f1f1f1;
}
.header {
  width: 100%;
  line-height: 0.64rem;
  text-align: center;
  font-size: 0.16rem;
  color: #333333;
  background-color: #fff;
}
.content {
  width: 100%;
  position: absolute;
  padding-top: 0.16rem;
  &__item {
    margin: 0 auto;
    margin-bottom: 0.16rem;
    padding: 0.16rem;
    width: 3.33rem;
    height: 1.1rem;
    box-sizing: border-box;
    border-radius: 0.04rem;
    background-color: #fff;
  }
  &__title {
    display: flex;
    &__name {
      width: 0.8rem;
      text-align: left;
      font-size: 0.16rem;
      color: #333333;
    }
    &__state {
      flex: 1;
      text-align: right;
      font-size: 0.14rem;
      color: #999999;
    }
  }
  &__detail {
    position: relative;
    &__imgs {
      margin-top: 0.16rem;
    }
    &__img {
      display: inline-block;
      margin-right: 0.12rem;
      width: 0.4rem;
      height: 0.4rem;
    }
    &__info {
      position: absolute;
      top: 0;
      right: 0;
      text-align: right;
      &__price {
        margin-bottom: 0.04rem;
        font-size: 0.14rem;
        color: #e93b3b;
      }
      &__count {
        font-size: 0.12rem;
        color: #333333;
        line-height: 0.14rem;
      }
    }
  }
}
</style>
