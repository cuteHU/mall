import {
    debounce
} from './utils'

import BackTop from 'components/content/backTop/BackTop'

// 图片加载使用防抖函数混入
export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null,
            newRefresh: null
        }
    },
    mounted() {
        this.newRefresh = debounce(this.$refs.scroll.refresh, 200)

        this.itemImgListener = () => {
            this.newRefresh()
        }
        this.$bus.$on('itemImageLoad', this.itemImgListener)
    },
}

// 回到顶部按钮混入
export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false
        }
    },
    methods: {
        backTopClick() {
            // console.log('回到顶部');
            this.$refs.scroll.scrollTop(0, 0, 500)
        },
        listenShowBackTop(position) {
            this.isShowBackTop = -position.y > 1000
        }
    },
}