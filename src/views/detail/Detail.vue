<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"
                    @titleClick="titleClick"
                    ref="nav"></detail-nav-bar>
    <scroll ref="scroll"
            class="content"
            @scroll="contentScroll"
            :probe-type="3">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo"
                         @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo"
                         ref="params"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo"
                           ref="comment"></detail-comment-info>
      <goods-list :goods-list="recommends"
                  ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backTopClick"
              v-show="isShowBackTop"></back-top>
    <!-- <toast :show="show"
           :message="message"></toast> -->
  </div>
</template>

<script>
import { getDetail, getRecommend, Goods, Shop, GoodsParam } from 'network/api/detail'

import { itemListenerMixin, backTopMixin } from '@/common/mixin'
import { debounce } from '@/common/utils'

import { mapActions } from 'vuex'

import Scroll from 'components/common/scroll/Scroll'
// import Toast from 'components/common/toast/Toast'


import DetailNavBar from './childComponents/DetailNavBar'
import DetailSwiper from './childComponents/DetailSwiper'
import DetailBaseInfo from './childComponents/DetailBaseInfo'
import DetailShopInfo from './childComponents/DetailShopInfo'
import DetailGoodsInfo from './childComponents/DetailGoodsInfo'
import DetailParamInfo from './childComponents/DetailParamInfo'
import DetailCommentInfo from './childComponents/DetailCommentInfo'
import DetailBottomBar from './childComponents/DetailBottomBar'
import GoodsList from 'components/content/goods/GoodsList'

export default {
  name: 'Detail',
  components: {
    Scroll,
    // Toast,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList
  },
  mixins: [itemListenerMixin, backTopMixin],
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
      itemImgListener: null,
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      // message: '',
      // show: false
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

      // this.themeTopYs = []
      // this.themeTopYs.push(0)
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

      // console.log(this.themeTopYs)
      // this.$nextTick(() => {
      //   this.themeTopYs = []
      //   this.themeTopYs.push(0)
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      //   console.log(this.themeTopYs)

      // })

    }).catch((err) => {

    });
    // 2.请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list
    }).catch((err => {
    })
    )
    // 给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 49)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 49)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 49)
      this.themeTopYs.push(Number.MAX_VALUE)
      // console.log(this.themeTopYs)
    }, 100)
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
  mounted () {

  },
  destroyed () {
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad () {
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    titleClick (index) {
      // console.log(index);
      this.$refs.scroll.scrollTop(0, -this.themeTopYs[index], 100)
    },
    contentScroll (position) {
      // console.log(position);
      // 1.获取y值
      const positionY = -position.y
      let length = this.themeTopYs.length
      for (let i = 0; i < length - 1; i++) {
        // if (this.currentIndex != i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || (i == length - 1 && positionY >= this.themeTopYs[i]))) {
        //   // console.log(this.currentIndex);
        // }
        if (this.currentIndex != i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      // 2.判断BackTop是否显示
      this.listenShowBackTop(position)
    },
    addToCart () {
      // console.log('---');
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      this.addCart(product).then(res => {
        // this.show = true
        // this.message = res
        // setTimeout(() => {
        //   this.show = false
        //   this.message = ''
        // }, 1500)
        this.$toast.show(res, 2000)
        // console.log(this.$toast);
      })
      // 2.将商品添加到购物车里
      // this.$store.commit('addCart', product)
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res);
      // })

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
  z-index: 1;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 49px);
  background-color: #fff;
}
</style>