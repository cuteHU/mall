<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
  </div>
</template>

<script>
import { getDetail } from 'network/api/detail'

import DetailNavBar from './childComponents/DetailNavBar'

export default {
  name: 'Detail',
  components: {
    DetailNavBar
  },
  data () {
    return {
      iid: null
    }
  },
  created () {
    this.iid = this.$route.params.id
    getDetail(this.iid).then((result) => {
      console.log(result);
    }).catch((err) => {

    });
  },
}
</script>

<style>
</style>