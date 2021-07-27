<template>
  <div class="wrapper">
    <div class="search">
      <div @click="handleBackClick"
           class="search__back iconfont">&#xe6f2;</div>
      <div class="search__content">
        <div class="search__content__icon iconfont">&#xe60b;</div>
        <input class="search__content__input"
               type="text"
               name=""
               id=""
               placeholder="请输入商品名称搜索" />
      </div>
    </div>
    <ShopInfo :item="item"
              :hiddenBottom="hiddenBottom"
              v-show="item.imgUrl" />
    <Content :shopName="item.name" />
    <Cart />
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo.vue'
import Content from './Content.vue'
import Cart from './Cart.vue'

const useShopInfoEffect = () => {
  const data = reactive({ item: {} })
  const route = useRoute()
  const getItemData = async () => {
    const result = await get(`/api/shop/${route.params.id}`)
    if (result.errno === 0 && result.data) {
      data.item = result.data
    }
  }
  const { item } = toRefs(data)
  return { item, getItemData }
}
const usehandleBackEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return { handleBackClick }
}

export default {
  name: 'Shop',
  components: { ShopInfo, Content, Cart },
  setup () {
    const hiddenBottom = false
    const { item, getItemData } = useShopInfoEffect()
    const { handleBackClick } = usehandleBackEffect()
    getItemData()
    return { hiddenBottom, item, getItemData, handleBackClick }
  },
}
</script>

<style lang="scss" scoped>
@import "../../style/variable.scss";
.wrapper {
  margin: 0 0.18rem;
}
.search {
  display: flex;
  width: 100%;
  height: 0.32rem;
  margin: 0.14rem 0 0.04rem 0;
  &__back {
    width: 0.38rem;
    line-height: 0.32rem;
    color: #b6b6b6;
    font-size: 0.24rem;
  }
  &__content {
    display: flex;
    flex: 1;
    height: 0.32rem;
    &__icon {
      width: 0.44rem;
      line-height: 0.32rem;
      font-size: 0.18rem;
      text-align: center;
      color: $input-bgColor;
    }
    &__input {
      flex: 1;
      display: block;
      background: none;
      outline: none;
      border: none;
      font-size: 0.14rem;
      color: #333333;
      line-height: 0.16rem;
    }
  }
}
</style>
