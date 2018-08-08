<template>
    <div class="mouseBorad" v-show="isShowMenu" @contextmenu.prevent="hiddenMouse" @click="hiddenMouse">
    <div class="mouse" :style="{left:menuLeft+'px',top:menuTop+'px'}" v-show="isShowMenu">
        <a class="btn" @click="deleteF()">运行</a>
        <a class="btn" @click="deleteF()">运行已选择的</a>
        <a class="btn" @click="addF()">美化sql</a>
        <a class="btn" @click="addF()">取消</a>
    </div>
  </div>
</template>
<script>
export default {
    name: 'SearchMouse',
    mounted(){
    },
    data () { 
        return {
        }
    },
    methods:{
    
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


