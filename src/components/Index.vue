<template>
  <div class="index">
    <Nav :itemList="itemList" @clickItem="clickItemIndex">
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
    },
  methods:{
    clickItemIndex(id){
      switch(id){
        case 'conn':
          console.log(this)
          this.clickConn();
          break;
        case 'search':
          this.clickSearch();
          break;
        case 'doc':
          this.clickDoc();
          break;
      }
    },
    clickSearch(){
      this.$alert('search111');

    },
    clickDoc(){
      this.$alert("doc111");
    },
    clickConn(){
      this.$alert("conn111");
    }
  },
  components:{Nav,Left,Main}
}
</script>

<style scoped>

</style>
