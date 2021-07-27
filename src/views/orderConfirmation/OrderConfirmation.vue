<template>
  <div class="wrapper">
    <TopArea />
    <Check :productList="productList" :shopName="shopName" />
  </div>
  <Bottom />
</template>

<script>
import { useCommonCartEffect } from "../../effects/cartEffect";
import { useRoute } from "vue-router";
import TopArea from "./TopArea";
import Check from "./Check";
import Bottom from "./Bottom";
export default {
  name: "OrderConfirmation",
  components: { TopArea, Check, Bottom },
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    const { productList, shopName } = useCommonCartEffect();
    return { productList, shopId, shopName };
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0.5rem;
  overflow-y: scroll;
  background: #f5f5f5;
}
</style>
