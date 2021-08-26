<template>
  <div class="layout-container">
    <keep-alive>
      <router-view />
    </keep-alive>
    <van-tabbar route v-model="active">
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/me" icon="user-circle-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      active: 0
    }
  },
  mounted() {
    this.$store.commit('addCachePage', 'Layout')
  }
}
</script>

<style lang="less" scoped></style>
