<template>
  <div class="index">
    <Nav :itemList="itemList">
    </Nav>
    <div>
      <Left></Left>
      <Main></Main>
    </div>
  </div>
</template>

<script>
import Nav from './Nav.vue'
import NavItem from './NavItem.vue'
import Left from './Left.vue'
import Main from './Main.vue'


export default {
  name: 'Index',
  data () {
    return {
      itemList: [
        {"itemImageUrl":"@/assets/conn.png","itemName":"连接","id":"conn"},
        {"itemImageUrl":"@/assets/doc.png","itemName":"文档","id":"doc"},
        {"itemImageUrl":"@/assets/search.png","itemName":"查询","id":"search"},
      ]
    }
  },
  components:{Nav,Left,Main}
}
</script>

<style scoped>

</style>
