<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

    <!-- 商品的列表 -->
    <cart-list />
    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import NavBar from 'components/common/navbar/NavBar'

import CartList from './childComponents/CartList'
import CartBottomBar from './childComponents/CartBottomBar'

export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // cartLength () {
    //   return this.$store.getters.cartLength
    // }
    // ...mapGetters([
    //   'cartLength'
    // ])
    ...mapGetters({
      length: 'cartLength'
    })
  },
}
</script>

<style>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>