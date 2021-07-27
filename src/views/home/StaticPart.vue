<template>
  <div class="position">
    <span class="iconfont position__icon">&#xe61f;</span>
    <span>北京理工大学国防科技园2号楼10层</span>
    <span class="iconfont bell__icon">&#xe9cf;</span>
  </div>
  <div class="search">
    <span class="iconfont">&#xe60b;</span>
    <span class="search__text">山姆会员商店优惠商品</span>
  </div>
  <div class="banner">
    <img class="banner__img"
         src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
         alt="">
  </div>
  <div class="icons">
    <div v-for="(item,index) in StaticPartList"
         :key="index"
         class="icons__items">
      <img class="icons__items__img"
           :src="item.imgUrl">
      <p class="icons__items__desc">{{item.text}}</p>
    </div>
  </div>
  <div class="gap">
  </div>
</template>

<script>
export default {
  name: 'StaticPart',
  setup () {
    const StaticPartList = [
      { imgUrl: "http://www.dell-lee.com/imgs/vue3/超市.png", text: "超市便利" },
      { imgUrl: "http://www.dell-lee.com/imgs/vue3/水果店.png", text: "水果店" },
      { imgUrl: "http://www.dell-lee.com/imgs/vue3/鲜花.png", text: "鲜花绿植" },
      { imgUrl: "http://www.dell-lee.com/imgs/vue3/医药健康.png", text: "医药健康" },
      { imgUrl: "http://www.dell-lee.com/imgs/vue3/家居.png", text: "家居时尚" },
      { imgUrl: "http://www.dell-lee.com/imgs/vue3/蛋糕.png", text: "烘焙蛋糕" },
      { imgUrl: "http://www.dell-lee.com/imgs/vue3/签到.png", text: "签到" },
      { imgUrl: "http://www.dell-lee.com/imgs/vue3/大牌免运.png", text: "大牌免运" },
      { imgUrl: "http://www.dell-lee.com/imgs/vue3/红包.png", text: "红包" },
      { imgUrl: "http://www.dell-lee.com/imgs/vue3/超市.png", text: "超市便利" },
    ];
    return { StaticPartList }
  }
}
</script>


<style lang="scss" scoped>
@import "../../style/variable.scss";
@import "../../style/mixins.scss";
.position {
  position: relative;
  padding: 0.16rem 0.24rem 0.16rem 0;
  line-height: 0.22rem;
  font-size: 0.16rem;
  @include ellipsis;
  .position__icon {
    position: relative;
    font-size: 0.2rem;
    top: 0.01rem;
  }
  .bell__icon {
    position: absolute;
    font-size: 0.24rem;
    top: 0.17rem;
    right: 0;
  }
  color: $content-fontcolor;
}
.search {
  margin-bottom: 0.12rem;
  line-height: 0.32rem;
  background-color: #f5f5f5;
  border-radius: 0.16rem;
  .iconfont {
    display: inline-block;
    padding: 0 0.12rem 0 0.16rem;
  }
  &__text {
    display: inline-block;
    font-size: 0.14rem;
    color: $input-bgColor;
  }
}

.banner {
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%;
  margin-bottom: 0.16rem;
  &__img {
    width: 100%;
  }
}
.icons {
  display: flex;
  flex-wrap: wrap;
  &__items {
    width: 20%;
    &__img {
      display: block;
      height: 0.4rem;
      width: 0.4rem;
      margin: 0 auto;
    }
    &__desc {
      margin: 0.06rem 0 0.16rem 0;
      text-align: center;
      color: $content-fontcolor;
    }
  }
}
.gap {
  margin: 0 -0.18rem;
  height: 0.16rem;
  background-color: $content-bgColor;
}
</style>