<template>
  <div class="docker">
    <div v-for="(item,index) in dockerList"
         :key="item.icon"
         :class="{'docker__item': true, 'docker__item--active': index === currentIndex}">
      <router-link :to='item.to'>
        <div class="iconfont"
             v-html="item.icon"></div>
        <div class="docker_title">{{item.text}}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Docker',
  props: ['currentIndex'],
  setup () {
    const dockerList = [
      { icon: '&#xe61a;', text: '首页', to: { name: 'Home' } },
      { icon: '&#xe7f5;', text: '购物车', to: { name: 'CartList' } },
      { icon: '&#xe611;', text: '订单', to: { name: 'OrderList' } },
      { icon: '&#xe61c;', text: '我的', to: { name: 'MyAddress' } },
    ];
    return { dockerList }
  }
}
</script>

<style lang="scss" scoped>
@import "../style/variable.scss";
@import "../style/mixins.scss";
.docker {
  display: flex;
  position: absolute;
  box-sizing: border-box;
  padding: 0 0.18rem;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  border-top: 0.01rem solid $content-bgColor;
  color: $content-fontcolor;
}
.docker__item {
  flex: 1;
  text-align: center;
  a {
    color: $content-fontcolor;
    text-decoration: none;
  }
  .iconfont {
    font-size: 0.18rem;
    margin: 0.07rem 0 0.02rem 0;
  }
}
.docker__title {
  font-size: 0.02rem;
  transform: scale(0.5, 0.5);
  transform-origin: center top;
}
.docker__item--active {
  a {
    color: #1fa4fc;
  }
}
</style>