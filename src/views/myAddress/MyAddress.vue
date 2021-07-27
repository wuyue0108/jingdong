<template>
  <div class="wrapper">
    <div class="top">
      <div class="top__bgc"></div>
      <div class="top__info">
        <div class="top__info__name">{{ userInfo.username }}</div>
        <div class="top__info__id">ID:{{ userInfo._id }}</div>
      </div>
      <div class="top__img">
        <img class="top__img__cicle" src="../../images/dog.jpg" alt="" />
      </div>
    </div>
    <div class="lists">
      <div v-for="(item, index) in list" :key="index" class="lists__wallet">
        <div class="lists__wallet__left">
          <span class="iconfont " v-html="item.icon"></span>
          <span class="lists__wallet__text"> {{ item.text }} </span>
        </div>
        <div class="lists__wallet__right">
          <span class=" lists__wallet__rote iconfont">&#xe6f2;</span>
        </div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="3" />
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { get } from "../../utils/request";
import Docker from "../../components/Docker";

const useUserEffect = () => {
  const userInfo = reactive({ _id: "", username: "" });
  const getUserInfo = async () => {
    const result = await get("/api/user/info");
    if (result?.errno === 0 && result?.data) {
      const { _id, username } = result.data;
      userInfo._id = _id || "";
      userInfo.username = username || "";
    }
  };
  getUserInfo();
  return userInfo;
};

export default {
  name: "Myaddress",
  components: { Docker },
  setup() {
    const list = [
      { icon: "&#xe66f;", text: "我的钱包" },
      { icon: "&#xe654;", text: "我的地址" },
      { icon: "&#xe61b;", text: "我的客服" }
    ];
    const userInfo = useUserEffect();
    return { list, userInfo };
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0.49rem;
  background-color: #f1f1f1;
}
.top {
  position: relative;
  width: 100%;
  &__bgc {
    height: 2.5rem;
    background-image: linear-gradient(239deg, #3a6ff3 0%, #50c7fb 100%);
  }
  &__info {
    position: absolute;
    top: 1.08rem;
    left: 0.18rem;
    width: 3.39rem;
    height: 1rem;
    padding-top: 0.59rem;
    background-color: #fff;
    box-shadow: 0 0.08rem 0.16rem 0 rgba(0, 0, 0, 0.08);
    border-radius: 0.08rem;
    &__name {
      font-size: 0.24rem;
      color: #262628;
      letter-spacing: 0.0019rem;
      text-align: center;
      line-height: 0.36rem;
    }
    &__id {
      margin-top: 0.02rem;
      font-size: 0.14rem;
      color: #c1c0c9;
      text-align: center;
    }
  }
  &__img {
    position: absolute;
    top: 0.61rem;
    left: 1.41rem;
    width: 0.94rem;
    height: 0.94rem;
    border-radius: 50%;
    background-color: #fff;
    overflow: hidden;
    &__cicle {
      width: 100%;
      height: 100%;
    }
  }
}
.lists {
  margin-left: 0.18rem;
  margin-top: 0.38rem;
  width: 3.39rem;
  border-radius: 0.08rem;
  background-color: #fff;
  &__wallet {
    box-sizing: border-box;
    width: 100%;
    position: relative;
    display: flex;
    line-height: 0.38rem;
    padding: 0, 0.16rem 0 0.16rem;
    &__text {
      display: inline-block;
      padding-left: 0.08rem;
      font-size: 0.14rem;
      text-indent: 0.03rem;
      line-height: 0.38rem;
      color: #262626;
    }
    &__left,
    &__right {
      display: inline-block;
      width: 25rem;
      font-size: 0.23rem;
    }
    &__left {
      margin-left: 0.18rem;
      width: 1.2rem;
    }
    &__right {
      margin-right: 0.18rem;
      text-align: right;
      flex: 1;
    }
    &__rote {
      display: inline-block;
      transform: rotate(180deg);
    }
  }
}
</style>
