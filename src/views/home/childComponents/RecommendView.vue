<template>
  <div class="recommend">
    <div v-for="(item, index) in recommends"
         :key="index"
         class="recommend-item">
      <a :href="item.link">
        <img :src="item.image"
             alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendView',
  props: {
    recommends: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
    }
  },
}
</script>

<style scoped>
.recommend {
  display: flex;
  text-align: center;
  padding: 10px 0 20px;
  border-bottom: 8px solid #eee;
  font-size: 12px;
}
.recommend-item {
  flex: 1;
}
.recommend a {
  width: 70px;
  height: 70px;
}
.recommend-item img {
  width: 65px;
  height: 65px;
  margin-bottom: 10px;
}
</style>