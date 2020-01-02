<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"
                    @titleClick="titleClick"></detail-nav-bar>
    <scroll ref="scroll"
            class="content">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo"
                         @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
      <goods-list :goods-list="recommends"></goods-list>
    </scroll>
  </div>
</template>

<script>
import { getDetail, getRecommend, Goods, Shop, GoodsParam } from 'network/api/detail'

import { itemListenerMixin } from '@/common/mixin'

import Scroll from 'components/common/scroll/Scroll'

import DetailNavBar from './childComponents/DetailNavBar'
import DetailSwiper from './childComponents/DetailSwiper'
import DetailBaseInfo from './childComponents/DetailBaseInfo'
import DetailShopInfo from './childComponents/DetailShopInfo'
import DetailGoodsInfo from './childComponents/DetailGoodsInfo'
import DetailParamInfo from './childComponents/DetailParamInfo'
import DetailCommentInfo from './childComponents/DetailCommentInfo'

import GoodsList from 'components/content/goods/GoodsList'

export default {
  name: 'Detail',
  components: {
    Scroll,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList
  },
  mixins: [itemListenerMixin],
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      itemImgListener: null
    }
  },
  created () {
    this.iid = this.$route.params.id
    // 1.请求详情数据
    getDetail(this.iid).then((result) => {
      const data = result.result
      // console.log(result.result);
      // 1.获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages

      // 2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 3.创建店铺信息
      this.shop = new Shop(data.shopInfo)

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo

      // 5.获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 6.取出评论信息
      if (data.rate.cRate != 0) {
        this.commentInfo = data.rate.list[0]
      }
    }).catch((err) => {

    });
    // 2.请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list
    }).catch((err => {

    })
    )
  },
  // mounted () {
  //   const refresh = debounce(this.$refs.scroll.refresh, 100)
  //   this.itemImgListener = () => {
  //     refresh()
  //   }
  //   this.$bus.$on('itemImgLoad', this.itemImgListener)
  // },
  // deactivated () {
  //   console.log('deactivated')
  // },
  destroyed () {
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  methods: {
    imageLoad () {
      this.$refs.Scroll.refresh()
    },
    titleClick () {
      console.log(index);
    }
  },
}
</script>

<style scoped>
#detail {
  position: relative;
  height: 100vh;
  background-color: #fff;
  overflow: hidden;
  z-index: 9;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px);
}
</style>