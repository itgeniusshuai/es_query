<template>
  <div class="nav">
      <NavItem v-for="item in itemList" :key="item.id" :name="item.id" :itemImageUrl="item.itemImageUrl" :itemImageText="item.itemName">
      </NavItem>
  </div>
</template>

<script>

import NavItem from './NavItem.vue'
export default {
  name: 'Nav',
  data () {
    return {
      // itemList:[
      //    {"itemImageUrl":"@/assets/conn.png","itemName":"连接","id":"conn"},
      //   {"itemImageUrl":"@/assets/doc.png","itemName":"文档","id":"doc"},
      //   {"itemImageUrl":"@/assets/search.png","itemName":"查询","id":"search"},
      // ]
    }
  },
  props:["itemList"],
  components:{NavItem}
}
</script>

<style scoped>
  .nav{
    height: 30px;
  }
</style>
