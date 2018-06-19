<template>
  <div class="index">
    <Nav :itemList="itemList" @clickItem="clickItemIndex">
    </Nav>
    <div>
      <Left></Left>
      <Main></Main>
    </div>
    <div id="connDiv">
      <el-dialog title="新建连接" :visible.sync="connDialogVisible" custom-class="connDialog" width="400px">
        <div>
          ip:<el-input></el-input>
          port:<el-input></el-input>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="connDialogVisible = false" size="small" class="btn">取 消</el-button>
          <el-button type="primary" @click="connDialogVisible = false" plain size="small" class="btn">确 定</el-button>
        </div>
      </el-dialog>
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
      connDialogVisible:false,
      form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
      formLabelWidth: '120px',
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
      this.connDialogVisible = true
    }
  },
  components:{Nav,Left,Main}
}
</script>

<style>
  #connDiv.connDialog{
    font-size: 12px;
    height: 300px;
    width: 400px;
  }
  #connDiv .btn{
    width: 100px;
  }
  #connDiv .el-dialog__title {
    font-size:12px!important;
    }
</style>
