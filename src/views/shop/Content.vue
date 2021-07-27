<template>
  <div class="content">
    <div class="category">
      <div v-for="(item,index) in categories"
           :key="index"
           @click="() => handleTabClick(item.tab)"
           :class="{'category__item':true,'category__item--active':currentTab == item.tab}">{{item.name}}</div>
    </div>
    <div class="product">
      <div class="product__item"
           v-for="(item) in List"
           :key="item._id">
        <img class="product__item__img"
             :src="item.imgUrl">
        <div class="product__item__detail">
          <h4 class="product__item__title">{{item.name}}</h4>
          <p class="product__item__sales">月售 {{item.sales}} 件</p>
          <p class="product__item__price">
            <span class="product__item__now"> &yen;{{item.price}}</span>
            <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
          </p>
        </div>
        <div class="product__number">
          <span @click="() => changeCartInfo (shopId,item._id,item,-1,shopName)"
                class="product__number__sub">-</span>
          {{cartList?.[shopId]?.ProductList?.[item._id]?.count || 0}}
          <span @click="() => changeCartInfo (shopId,item._id,item,1,shopName)"
                class="product__number__add">+</span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { reactive, ref, toRefs, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { get } from '../../utils/request'
import { useCommonCartEffect } from '../../effects/cartEffect'




const categories = [{
  name: '全部商品', tab: 'all'
}, {
  name: '秒杀', tab: 'seckill'
}, {
  name: '新鲜水果', tab: 'fruit'
}
]
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab)
  const handleTabClick = (tab) => {
    currentTab.value = tab;
  }
  return { currentTab, handleTabClick }
}

const useCurrentListEffect = (currentTab, shopId) => {
  const contentList = reactive({ List: [] })

  const getContentData = async () => {
    const result = await get(`/api/shop/${shopId}/products`,
      { tab: currentTab.value })
    if (result?.errno === 0 && result?.data?.length) {
      contentList.List = result.data;
    }
  }
  watchEffect(() => { getContentData() })
  const { List } = toRefs(contentList)

  return { List }
}
//购物车相关逻辑
const useCartEffect = () => {
  const store = useStore();
  const { cartList, changeCartCountInfo } = useCommonCartEffect();
  const changeCartNameInfo = (shopId, shopName) => {
    store.commit('changeCartNameInfo', { shopId, shopName })
  }
  const changeCartInfo = (shopId, productId, item, num, shopName) => {
    changeCartCountInfo(shopId, productId, item, num)
    changeCartNameInfo(shopId, shopName)
  }
  return { cartList, changeCartInfo }
}


export default {
  name: 'Content',
  props: ['shopName'],
  setup () {
    const route = useRoute();
    const shopId = route.params.id;
    const { currentTab, handleTabClick } = useTabEffect();
    const { List } = useCurrentListEffect(currentTab, shopId);
    const { cartList, changeCartInfo } = useCartEffect();
    return {
      categories, currentTab, handleTabClick, List,
      cartList, shopId, changeCartInfo
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  position: absolute;
  left: 0;
  top: 1.5rem;
  bottom: 0.49rem;
  right: 0;
}
.category {
  overflow-y: scroll;
  width: 0.76rem;
  background: #f5f5f5;
  // margin-right: .16rem;
  &__item {
    width: 100%;
    line-height: 0.4rem;
    text-align: center;
    border-radius: 0.02rem;
    font-size: 0.14rem;
    color: #333333;
    &--active {
      background: #ffffff;
    }
  }
}
.product {
  flex: 1;
  overflow-y: scroll;
  &__item {
    display: flex;
    position: relative;
    padding: 0.12rem 0 0.12rem 0;
    margin: 0 0.18rem 0 0.16rem;
    border-bottom: 0.01rem solid #f1f1f1;
    &__img {
      width: 0.68rem;
      height: 0.68rem;
      margin-right: 0.16rem;
    }
    &__title {
      line-height: 0.2rem;
      margin: 0;
      font-size: 0.14rem;
      color: #333333;
    }
    &__sales {
      margin: 0;
      padding: 0.06rem 0 0.06rem 0;
      font-size: 0.12rem;
      color: #333333;
      line-height: 0.16rem;
    }
    &__price {
      margin: 0;
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
    bottom: 0.12rem;
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
</style>