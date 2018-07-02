<template>
  <div class="mouseBorad" v-show="isShowMenu" @contextmenu.prevent="hiddenRightMouse" @click="hiddenRightMouse">
    <div class="mouse" :style="{left:menuLeft+'px',top:menuTop+'px'}" v-show="isShowMenu">
        <a class="btn" >删除</a>
        <a class="btn" >添加</a>
        <div class="hr"/>
        <a class="btn" >删除</a>
        <a class="btn" >添加</a>
        <div class="hr"/>
        <a class="btn">其他</a>
    </div>
  </div>
</template> 

<script>
export default {
  name: 'MouseFrame',
  data () { 
    return {
      
    }
  },
  methods:{
   hiddenRightMouse(){
     this.isShowMenu = false;
   }
  },
  props:["isShowMenu","menuLeft","menuTop"]
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
    width: 130px;
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
    width: 110px;
    display: block;
    height: 20px;
    overflow: hidden;
  }
  .btn:hover{
    background-color: #0ff;
  }
  .hr{
    border-top: 2px solid gray;
    margin:5px auto;
  }
</style>
