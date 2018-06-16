<template>
  <div class="nav_item">
    <img :src="itemImageUrl" />
    <div>{{itemImageText}}</div>
  </div>
</template>

<script>
export default {
  name: 'NavItem',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props:["itemImageUrl","itemImageText","name"]
}
</script>

<style scoped>
  .nav_item{
    height: 130px;
    width: 100px;
  }
</style>
