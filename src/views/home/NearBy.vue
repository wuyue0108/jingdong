<template>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <router-link :to="`/shop/${item._id}`"
                 v-for="(item) in nearByList "
                 :key="item._id">
      <ShopInfo :item="item"
                :hiddenBottom="hiddenBottom" />
    </router-link>
  </div>
</template>

<script>

import { get } from '../../utils/request.js'
import { ref } from 'vue'
import ShopInfo from '../../components/ShopInfo.vue'

const useNearbyListEffect = () => {
  const nearByList = ref([]);
  const getNearbyList = async () => {
    const result = await get('/api/shop/hot-list')
    if (result?.errno === 0 && result?.data.length != 0) {
      nearByList.value = result.data;
    }
  };
  return { nearByList, getNearbyList }
}


export default {
  name: "NearBy",
  components: { ShopInfo },
  setup () {
    const hiddenBottom = true;
    const { nearByList, getNearbyList } = useNearbyListEffect();
    getNearbyList();
    return { nearByList, getNearbyList, hiddenBottom }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/variable.scss";
@import "../../style/mixins.scss";

.nearby {
  &__title {
    line-height: 0.25rem;
    font-size: 0.18rem;
    font-weight: normal;
    color: $content-fontcolor;
    margin: 0.16rem 0 0.02rem 0;
  }
  a {
    text-decoration: none;
  }
}
</style>