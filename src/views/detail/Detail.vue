<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :topImages="topImages"></detail-swiper>
  </div>
</template>

<script>
import { getDetail } from 'network/api/detail'

import DetailNavBar from './childComponents/DetailNavBar'
import DetailSwiper from './childComponents/DetailSwiper'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper
  },
  data () {
    return {
      iid: null,
      topImages: []
    }
  },
  created () {
    this.iid = this.$route.params.id
    getDetail(this.iid).then((result) => {
      // console.log(result);
      // 1.获取顶部的图片轮播数据
      this.topImages = result.result.itemInfo.topImages
    }).catch((err) => {

    });
  },
}
</script>

<style>
</style>