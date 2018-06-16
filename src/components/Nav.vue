<template>
  <div class="nav">
      <NavItem v-for="item in itemList" 
        :key="item.id" 
        :name="item.id" 
        :itemImageUrl="item.itemImageUrl" 
        :itemImageText="item.itemName" 
        @clickItem="clickItemFuc"
        class="navItem">
      </NavItem>
  </div>
</template>

<script>

import NavItem from './NavItem.vue'
export default {
  name: 'Nav',
  data () {
    return {
    }
  },
  methods:{
    clickItemFuc(id){
      // console.log(id)
    }
  },
  props:["itemList"],
  components:{NavItem}
}
</script>

<style scoped>
  .nav{
    height: 90px;
    background-color: gainsboro;
  }
  .navItem{
    float: left;
    margin-left: 30px;
    margin-top: 10px;
    margin-bottom: 0px;
    padding: 0px;
  }
</style>
