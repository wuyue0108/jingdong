<template>
  <div class="bgColor">
    <div class="header">
      <div class="header__top">
        <span class="header__top__back iconfont" @click="handleBackClick"
          >&#xe6f2;</span
        >
        <span class="header__top__text">确认订单</span>
      </div>
      <div class="header__info">
        <div class="header__info__title">收货地址</div>
        <div class="header__info__address">北京理工大学国防科技园2号楼10层</div>
        <div class="header__info__per">
          <span class="header__info__name">瑶妹（先生）</span>
          <span class="header__info__tel">18911024266</span>
        </div>
        <div class="header__info__icon iconfont">&#xe6f2;</div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'TopArea',
  setup() {
    const router = useRouter()
    const handleBackClick = () => {
      router.back()
    }
    return { handleBackClick }
  },
}
</script>
<style lang="scss" scoped>
.bgColor {
  height: 1.96rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, #0091ff 50%);
}
.header {
  padding-top: 0.41rem;
  &__top {
    display: flex;
    padding-left: 0.185rem;
    color: #ffffff;
    &__back {
      font-size: 0.2rem;
    }
    &__text {
      flex: 1;
      font-size: 0.16rem;
      text-align: center;
    }
  }
  &__info {
    position: relative;
    margin: 0.22rem 0.18rem 0 0.18rem;
    padding: 0.16rem 0 0 0.16rem;
    box-sizing: border-box;
    width: 3.39rem;
    height: 1.11rem;
    background: #ffffff;
    border-radius: 0.04rem;
    color: #333333;
    &__title {
      font-size: 0.16rem;
      font-weight: unset;
    }
    &__address {
      margin: 0.14rem 0 0.1rem 0;
      font-size: 0.14rem;
    }
    &__per {
      font-size: 0.12rem;
      color: #666666;
    }
    &__name {
      padding-right: 0.06rem;
    }
    &__icon {
      transform: rotate(180deg);
      position: absolute;
      top: 0.48rem;
      right: 0.16rem;
      color: #666;
      font-size: 0.16rem;
    }
  }
}
</style>