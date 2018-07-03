<template>
  <div class="mouseBorad" v-show="isShowMenu" @contextmenu.prevent="hiddenMouse" @click="hiddenMouse">
    <div class="mouse" :style="{left:menuLeft+'px',top:menuTop+'px'}" v-show="isShowMenu">
        <a class="btn" @click="deleteF()">删除</a>
        <a class="btn" @click="addF()">添加</a>
        <div class="hr"/>
        <a class="btn" @click="editF()">编辑</a>
        <a class="btn" @click="editConnF()">编辑连接</a>
        <div class="hr"/>
        <a class="btn">取消</a>
    </div>
  </div>
</template> 

<script>
import Bus from '../common/bus'
export default {
  name: 'MouseFrame',
  mounted(){
  },
  data () { 
    return {
    }
  },
  methods:{
   hiddenMouse(){
     this.$emit("hiddenRightMouse")
   },
   deleteF(){
     this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit("deleteFunc",this.cData,this.handleType)
        })
   },
   editF(){
      this.$emit("editFunc",this.cData,this.srcElement,this.target,this.handleType)
    },
   editConnF(){
      Bus.$emit("editConnFunc",this.cData,this.srcElement,this.target,this.handleType)
   },
   addF(){
        this.$emit("addFunc",this.handleType)
   }
  },
  props:["isShowMenu","menuLeft","menuTop","cData","srcElement","target","handleType"]
}
</script>

<style scoped>
  .mouseBorad{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top:0;
  }
  .mouse{
    width: 120px;
    position: absolute;
    border: 1px solid gray;
    background: gainsboro;
    border-radius: 5px;
    padding: 5px 0;
  }
  .btn{
    text-align: left;
    padding-left: 20px;
    line-height: 20px;
    font-size: 14px;
    width: 100px;
    display: block;
    height: 20px;
    overflow: hidden;
  }
  .btn:hover{
    background-color: rgb(57, 112, 230);
  }
  .hr{
    border-top: 2px solid gray;
    margin:5px auto;
  }
</style>
