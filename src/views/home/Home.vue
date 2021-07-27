<template>
  <div class="wrapper">
    <StaticPart />
    <NearBy />
  </div>
  <Docker :currentIndex=0 />
</template>

<script>
import StaticPart from './StaticPart.vue';
import NearBy from './NearBy.vue';
import Docker from '../../components/Docker'
export default {
  name: 'Home',
  components: { StaticPart, NearBy, Docker }
}
</script>

<style lang="scss" scoped>
.wrapper {
  overflow: hidden;
  overflow-y: auto;
  position: absolute;
  padding: 0 0.18rem 0.2rem 0.18rem;
  left: 0;
  top: 0;
  bottom: 0.5rem;
  right: 0;
}
</style>
