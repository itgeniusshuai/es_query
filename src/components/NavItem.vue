<template>
  <div class="nav_item" @click="receivedClickItem(name)">
    <img :src="itemImageUrl" class="itemImg"/>
    <div class="itemText">{{itemImageText}}</div>
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
  methods:{
    receivedClickItem(id){
      this.$emit("clickItemNav",id)
    }
  },
  props:["itemImageUrl","itemImageText","name"]
}
</script>

<style scoped>
  .nav_item{
    height: 80px;
    width: 50px;
  }
  .itemImg{
    height: 50px;
    width: 50px;
    margin-bottom: 0;
  }
  .itemText{
    height: 20px;
    width: 50px;
    text-align: center;
    line-height:20px;
    font-size: 12px;
    margin-top: 0px;
  }
</style>
