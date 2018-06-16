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
import Bus from '../common/bus.js'


export default {
  name: 'Index',
  data () {
    return {
      itemList: [
        {"itemImageUrl":require("./../assets/conn.png"),"itemName":"连接","id":"conn"},
        {"itemImageUrl":require("./../assets/doc.png"),"itemName":"文档","id":"doc"},
        {"itemImageUrl":require("./../assets/search.png"),"itemName":"查询","id":"search"},
      ]
    }
  },
  mounted: function () {
      // 用$on事件来接收参数
      Bus.$on('clickItem', (data) => {
        console.log("data"+data)
      })
    },
  methods:{
    clickItemIndex(id){
      console.log(id)
    }
  },
  components:{Nav,Left,Main}
}
</script>

<style scoped>

</style>
