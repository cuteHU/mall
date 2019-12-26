<template>
  <div class="tab-bar-item"
       @click="itemClick">
    <!-- <img src="@/assets/img/tabbar/home.svg" alt="">
            <div>首页</div> -->

    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <!-- v-bind动态绑定class：
                1.<h2 :class="{'active}">Hello World</h2>
                2.如果过于复杂，可以放在一个methods或者computed计算属性中
             -->
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data () {
    return {
      // isActive: true
    }
  },
  computed: {
    isActive () {
      return this.$route.path.indexOf(this.path) != -1
    },
    activeStyle () {
      return this.isActive ? { color: this.activeColor } : {}
    }
  },
  methods: {
    itemClick () {
      this.$router.replace(this.path)
    }
  }
}
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 5px;
  vertical-align: middle;
}
/* .item-text {
        font-size: 12px;
        margin-top: 3px;
        color: #333;
    } */
</style>