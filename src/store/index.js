import Vuex from "vuex";
// localStorage
const setLocalCartList = state => {
  const { cartList } = state;
  const cartListString = JSON.stringify(cartList);
  localStorage.cartList = cartListString;
};
const getLocalCartList = () => {
  try {
    return JSON.parse(localStorage.cartList);
  } catch (error) {
    return {};
  }
  // return JSON.parse(localStorage.cartList) || {}
};

export default Vuex.createStore({
  state: {
    // cartList: {}
    cartList: getLocalCartList()
    // cartList: {
    //     //更改数据结构
    //     // shopId: {
    //     //     shopName: "",
    //     //     ProductList: {
    //     //         productId: {
    //     //             _id: '1',
    //     //             name: '番茄250g/份',
    //     //             imgUrl: 'http://www.dell-lee.com/imgs/vue3/tomato.png',
    //     //             sales: 10,
    //     //             price: 33.6,
    //     //             oldPrice: 39.6,
    //     //             count: 2
    //     //         }
    //     //     }
    //     // }
  },
  mutations: {
    // changeCartCountInfo
    changeCartCountInfo(state, payload) {
      const { shopId, productId, productInfo, num } = payload;
      // console.log(shopId, productId, productInfo);
      let shopInfo = state.cartList[shopId];
      if (!shopInfo) {
        shopInfo = { shopName: "", ProductList: {} };
      }
      let product = shopInfo?.ProductList[productId];
      if (!product) {
        productInfo.count = 0;
        product = productInfo;
      }
      product.count = product.count + num;
      if (product.count < 0) {
        product.count = 0;
        product.checked = false;
      }
      if (product.count > 0) {
        product.checked = true;
      }
      shopInfo.ProductList[productId] = product;
      state.cartList[shopId] = shopInfo;
      setLocalCartList(state);
    },
    changeCartNameInfo(state, payload) {
      const { shopId, shopName } = payload;
      const shopInfo = state.cartList[shopId] || {
        shopName: "",
        ProductList: {}
      };
      shopInfo.shopName = shopName;
      state.cartList[shopId] = shopInfo;
      setLocalCartList(state);
    },
    changeCartItemChecked(state, payload) {
      const { shopId, productId } = payload;
      // console.log(state.cartList[shopId][productId].checked)
      state.cartList[shopId].ProductList[productId].checked = !state.cartList[
        shopId
      ].ProductList[productId].checked;
      setLocalCartList(state);
    },
    clearProductList(state, payload) {
      const { shopId } = payload;
      state.cartList[shopId].ProductList = {};
      setLocalCartList(state);
    },
    changAllChecked(state, payload) {
      const { shopId } = payload;
      for (let i in state.cartList[shopId]?.ProductList) {
        state.cartList[shopId].ProductList[i].checked = true;
      }
      setLocalCartList(state);
    },
    clearProductList(state, payload) {
      const { shopId } = payload;
      state.cartList[shopId].ProductList = {};
    }
  },
  actions: {},
  modules: {}
});
