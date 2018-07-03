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
    <mouse-frame :menuLeft="menuLeft" 
      :menu-top="menuTop" 
      :is-show-menu="isShowMenu" 
      @hiddenRightMouse="hiddenRightMouse"
      @deleteFunc="deleteFunc"
      @addFunc="addFunc"
      @editFunc="editFunc"
      :handleType='handleType'
      :cData="cData"
      :target="target"
      :src-element="srcElement"
      ></mouse-frame>
  </div>
</template>

<script>
import TreeNode from './TreeNode'
import {IsNullOrUndefined} from '../common/common.js'
import {get} from '../common/http.js'
import {post} from '../common/http.js'
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
            
          ],
          cData:'',
          srcElement:'',
          target:'',
          handleType:''
        }
    },
  mounted:function(){
    let that = this
    Bus.$on('createConn',(connStr,connName)=>{
      let newConn = {
              "id":that.id++,
              "label":connName,
              "type":"conn",
              "value":connStr,
              "icon":require('../assets/conn.png')
            }
      this.connData.push(newConn);
      // 存入localstorage
      this.flushConnCache()
    })

    Bus.$on("updateConn" ,(connStr,connName,data)=>{
      let cIndex = that.connData.indexOf(data)
      data.label = connName
      data.value = connStr
      that.$set(that.connData[cIndex],data)
    })

    if(!IsNullOrUndefined(localStorage.connData)){
      let cDats = JSON.parse(localStorage.connData);
      this.connData = cDats.map(function(e){
        e.children = []
        return e
      })
       
    }
  
  },
  components:{TreeNode,MouseFrame},
  methods: {
      flushConnCache(){
        // let tmpConnData = this.connData.map(function(e){
        //   e.children = []
        //   return e
        // })
        localStorage.connData = JSON.stringify(this.connData)
      },
      editFunc(data,srcElement,target,handleType){
        let that = this
        srcElement.removeAttribute("readOnly")
        let cf = target.handleClick
        target.handleClick = function(){}
        srcElement.focus()
        srcElement.style.backgroundColor="rgb(57, 112, 230)"
        srcElement.onblur=function(){
          this.setAttribute("readOnly",true)
          srcElement.style.backgroundColor="rgba(57, 112, 230,0)";
          console.log(srcElement.value)
          let editIndex = that.connData.indexOf(data)
          data.label = srcElement.value
          that.$set(that.connData[editIndex],data)

          that.flushConnCache()
          target.handleClick = cf
        }
      },
      addFunc(handleType){
        Bus.$emit("clickConn")
      },
      deleteFunc(data,handleType){
        let delIndex = this.connData.indexOf(data)
        let d = this.connData.splice(delIndex,1)
        this.$set(this.connData,d)
        this.flushConnCache()
      },
      hiddenRightMouse(){
        this.isShowMenu = false
      },
      handleRightClick(event,data,node,target){
        console.log(data)
        // 获取鼠标位置
        let x = event.clientX
        let y = event.clientY
        // 计算菜单位置
        x = x +10
        this.isShowMenu = true
        this.menuLeft = x
        this.menuTop = y
        this.cData = data
        this.srcElement = event.srcElement
        this.target = target
        this.handleType = data.type
      },
      handleNodeClick(data,node,target){ 
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
              let url = 'http://'+data.value + '/_cluster/state'
              let that = this
              get(url).then((res)=>{
                // 获取所有的索引
                let resIndexNames = Object.keys(res.metadata.indices)
                // 排序
                resIndexNames.sort()

                let indexes = resIndexNames.map(function(indexName){
                  // 将映射信息存入到sessionStorage
                  // sessionStorage[data.value][indexName] = res.metadata.indices[indexName]
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
    margin: 0 0;
  }
  .mouse{
    position: absolute;
    left: 0;
    top: 0;
    
  }
</style>
