<template>
  <div class="index">
    <Nav :itemList="itemList" @clickItem="clickItemIndex">
    </Nav>
    <div class="content">
      <Left class="left"></Left>
      <Main></Main>
    </div>
    <div id="connDiv">
      <el-dialog title="新建连接" :visible.sync="connDialogVisible" custom-class="connDialog" width="400px">
        <div>
          连接名称:<el-input v-model="connName"></el-input>
          ip:<el-input v-model="ip"></el-input>
          port:<el-input v-model="port"></el-input>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="connDialogVisible = false" size="small" class="btn">取 消</el-button>
          <el-button type="primary" @click="createConn" plain size="small" class="btn">确 定</el-button>
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
      ip:'',
      port:'',
      connName:"",
      editType:'',
      cData:'',
      formLabelWidth: '120px',
      itemList: [
        {"itemImageUrl":require("./../assets/conn.png"),"itemName":"连接","id":"conn"},
        {"itemImageUrl":require("./../assets/doc.png"),"itemName":"文档","id":"doc"},
        {"itemImageUrl":require("./../assets/search.png"),"itemName":"查询","id":"search"},
      ],
    }
  },
  mounted: function () {
    Bus.$on('editConnFunc',(cData)=>{
      this.editType = 'edit'
      this.ip = cData.value.split(':')[0]
      this.port = cData.value.split(':')[1]
      this.connName = cData.label
      this.cData = cData
      this.clickConn()
    })
    Bus.$on('clickConn',()=>{
      this.editType = 'add'
      this.clickConn()
    })
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
      this.editType = 'add'
      this.connDialogVisible = true
    },
    createConn(){
      let ip = this.ip;
      let port = this.port;
      let connStr = ip+':'+port
      if(this.editType == 'add'){
        Bus.$emit('createConn',connStr,this.connName)
      }else{
        Bus.$emit('updateConn',connStr,this.connName,this.cData)
      }
     
      this.connDialogVisible = false
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
  #connDiv .content{
    overflow: hidden;
  }
</style>
