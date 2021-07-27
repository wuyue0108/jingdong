//购物车相关逻辑
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed } from "vue";
export const useCommonCartEffect = () => {
  const store = useStore();
  const route = useRoute();
  const shopId = route.params.id;
  const cartList = store.state.cartList;
  const changeCartCountInfo = (shopId, productId, productInfo, num) => {
    store.commit("changeCartCountInfo", {
      shopId,
      productId,
      productInfo,
      num
    });
  };
  const productList = computed(() => {
    const productList = cartList[shopId]?.ProductList || {};
    const notEmptyProductList = {};
    // console.log(productList);
    for (let i in productList) {
      const product = productList[i];
      if (product.count > 0) {
        notEmptyProductList[i] = product;
      }
    }
    return notEmptyProductList;
  });

  const shopName = computed(() => {
    const shopName = cartList[shopId].shopName || "";
    return shopName;
  });
  const calculation = computed(() => {
    const result = { totalNumber: 0, totalPrice: 0, allChecked: true };
    const productList = cartList[shopId]?.ProductList;
    if (productList) {
      for (let i in productList) {
        const product = productList[i];
        result.totalNumber += product.count;
        if (product.checked) {
          result.totalPrice += product.count * product.price;
        }
        if (productList[i].count > 0 && !productList[i].checked) {
          result.allChecked = false;
        }
      }
    }
    result.totalPrice = result.totalPrice.toFixed(2);
    return result;
  });

  return { cartList, changeCartCountInfo, productList, shopName, calculation };
};
