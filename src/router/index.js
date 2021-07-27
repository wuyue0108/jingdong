import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/home/Home")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login/Login"),
    beforeEnter(to, from, next) {
      const isLogin = localStorage.isLogin;
      if (isLogin) {
        next({ name: "Home" });
      } else {
        next();
      }
    }
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/register/Register")
  },
  {
    path: "/shop/:id",
    name: "Shop",
    component: () => import(/* webpackChunkName: "shop" */ "../views/shop/Shop")
  },
  {
    path: "/cartList",
    name: "CartList",
    component: () =>
      import(/* webpackChunkName: "cartList" */ "../views/cartList/CartList")
  },
  {
    path: "/orderList",
    name: "OrderList",
    component: () =>
      import(/* webpackChunkName: "orderList" */ "../views/orderList/OrderList")
  },
  {
    path: "/orderConfirmation/:id",
    name: "OrderConfirmation",
    component: () =>
      import(
        /* webpackChunkName: "OrderConfirmation" */ "../views/orderConfirmation/OrderConfirmation"
      )
  },
  {
    path: "/myAddress",
    name: "MyAddress",
    component: () =>
      import(/* webpackChunkName: "myAddress" */ "../views/myAddress/MyAddress")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.isLogin;
  if (isLogin || to.name === "Login" || to.name === "Register") {
    next();
  } else {
    next({ name: "Login" });
  }
});

export default router;
