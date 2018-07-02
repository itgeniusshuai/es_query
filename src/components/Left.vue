<template>
  <div class="left">
    <el-tree
      :data="connData"
      node-key="id"
      :expand-on-click-node="true"
      class="connList"
      @node-click="handleNodeClick"
      highlight-current
      @node-contextmenu="handleRightClick"
      >
        <TreeNode :nodeName="node.label" :nodeIcon="node.icon" slot-scope="{ node, data }"></TreeNode>
    </el-tree>
   <mouse-frame :menuLeft="menuLeft" :menu-top="menuTop" :is-show-menu="isShowMenu"></mouse-frame>
  </div>
</template>

<script>
import TreeNode from './TreeNode'
import {IsNullOrUndefined} from '../common/common.js'
import {get} from '../common/http.js'
import Bus from '../common/bus'
import { Loading } from 'element-ui';
import {sleep} from '../common/common.js'
import MouseFrame from './MouseFrame.vue'

export default {
  name: 'Left',
      data() {
        return {
          id:100,
          isShowMenu:false,
          menuPosition:"absolute",
          menuLeft:0,
          menuTop:0,
          connData:[
            
          ]
        }
    },
  mounted:function(){
    Bus.$on('createConn',(connStr)=>{
      let newConn = {
              "id":2,
              "label":connStr,
              "type":"conn",
              "value":connStr,
              "icon":require('../assets/conn.png')
            }
      this.connData.push(newConn);
      // 存入localstorage
      localStorage.connData = JSON.stringify(this.connData)
    })
    if(!IsNullOrUndefined(localStorage.connData)){
      console.log(localStorage.connData.keys)
      this.connData = JSON.parse(localStorage.connData)
    }
  },
  components:{TreeNode,MouseFrame},
  methods: {
      showMenu(){

      },
      hiddenMenu(){
        
      },
      handleRightClick(event,data,node,target){
        console.log(event)
        console.log(node)
        console.log(data)
        console.log(target)
        // 获取鼠标位置
        let x = event.clientX
        let y = event.clientY
        // 计算菜单位置
        x = x +10
        this.isShowMenu = true
        this.menuLeft = x
        this.menuTop = y

        
      },
      handleNodeClick(data){ 
        switch(data.type){
          case 'conn':
            if (IsNullOrUndefined(data.children)){
              const ld = Loading.service({
                  lock: true,
                  text: 'Loading',
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.7)'
              })
              sleep(2000)
              // 发送请求查看所有索引
              let url = 'http://'+data.value + '/_cat/indices'
              let that = this
              get(url).then((res)=>{
                res = res.substring(0,res.length-1)
                let rrs = res.split('\n')
                let indexes = rrs.map(function(rr){
                  let indexName = rr.split(/[\s\t]/)[2]
                  let index = { id:that.id++,label: indexName,cvalue:data.value,value:indexName,'type':'index', children: [],"icon":require('../assets/index.png')};
                  return index
                })
                this.$set(data, 'children', indexes);
                ld.close() 
              }).catch((err)=>{
                ld.close() 
                this.$alert('连接失败')
              })
            }
            break
          case 'index':
            if (IsNullOrUndefined(data.children)){
              let loading = Loading.service()
              // 发送请求查看所有索引
              let url = 'http://'+data.cvalue + '/'+data.value+'/_mappings'
              let that = this
              get(url).then((res)=>{
                let rrs = Object.keys(res[data.value].mappings)
                let docs = rrs.map(function(rr){
                  let docName = rr
                  let doc = { id:that.id++,cvalue:data.cvalue,ivalue:data.value,label: docName,value:docName,'type':'doc',"icon":require('../assets/doc.png')};
                  return doc
                })
                loading.close()
                this.$set(data, 'children', docs);
              }).catch((err)=>{
                loading.close()
                this.$alert('连接失败')
              })
            }
            break;
          case 'doc':
            
            Bus.$emit('searchDocs',data.cvalue,data.ivalue,data.value)   
            break
        }
        
      }
  }
}
</script>

<style scoped>
  .left{
    /* display: block; */
    width: 300px;
    height: 670px;
    padding-top:5px;
    background-color: aliceblue;
    float: left;
    overflow: auto;
    resize:horizontal;
  }
  .connList{
    background-color: aliceblue;
    /* width: 300px; */
    /* height: 650px; */
    /* min-width: 100px; */
    /* resize:horizontal; */
    /* overflow: scroll; */
    margin: 0 0;
  }
  .mouse{
    position: absolute;
    left: 0;
    top: 0;
    
  }
</style>
