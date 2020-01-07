<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll"
                    class="check-button"
                    @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计: {{totalPrice}}
    </div>
    <div class="calculate"
         @click="calcClick">
      去计算: {{checkLength}}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import CheckButton from 'components/content/checkButton/CheckButton'

export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice () {
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength () {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll () {
      // return !(this.cartList.filter(item => item.checked).length)
      if (this.cartList.length == 0) {
        return false
      }
      return !(this.cartList.find(item => !item.checked))
    }
  },
  methods: {
    checkClick () {
      // console.log('----')
      if (this.isSelectAll) {
        this.cartList.forEach(item => item.checked = false);
      } else {
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick () {
      // console.log('----');
      if (!this.isSelectAll) {
        this.$toast.show('请选择需要购买的商品', 2000)
      }
    }
  },
}
</script>
<style scoped>
.bottom-bar {
  display: flex;
  position: relative;
  height: 40px;
  line-height: 40px;
  background-color: #eee;
  font-size: 14px;
}
.check-content {
  display: flex;
  align-items: center;
  width: 60px;
  margin-left: 10px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  flex: 1;
  margin-left: 20px;
}
.calculate {
  width: 90px;
  text-align: center;
  background: red;
  color: #fff;
}
</style>