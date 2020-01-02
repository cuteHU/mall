import {
    debounce
} from './utils'
export const itemListenerMixin = {
    mounted() {
        let refresh = debounce(this.$refs.scroll.refresh, 200)
        this.itemImgListener = () => {
            refresh()
        }
        this.$bus.$on('itemImageLoad', this.itemImgListener)
    },
}