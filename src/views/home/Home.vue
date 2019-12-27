<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>

<script>
import { getHomeMultidata } from 'network/api/home'

import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComponents/HomeSwiper'
import RecommendView from './childComponents/RecommendView'

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    RecommendView
  },
  created () {
    getHomeMultidata().then(res => {
      //1.请求多个数据
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
  },
  data () {
    return {
      banners: [],
      recommends: []
    }
  },
  methods: {
    // btnClick () {
    //   console.log(this.recommends)
    // }
  }
}
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>