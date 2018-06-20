<template>
  <div class="left">
    <el-tree
      :data="connData"
      node-key="id"
      :expand-on-click-node="true"
      class="connList"
      @node-click="handleNodeClick"
      highlight-current
      >
        <TreeNode :nodeName="node.label" :nodeIcon="node.icon" slot-scope="{ node, data }"></TreeNode>
    </el-tree>
  </div>
</template>

<script>
import TreeNode from './TreeNode'
import {IsNullOrUndefined} from '../common/common.js'
import {get} from '../common/http.js'
import Bus from '../common/bus'
import { Loading } from 'element-ui';
import {sleep} from '../common/common.js'

export default {
  name: 'Left',
      data() {
        return {
          id:100,
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
    })
  },
  components:{TreeNode},
  methods: {
      handleNodeClick(data){ 
        switch(data.type){
          case 'conn':
            if (IsNullOrUndefined(data.children)){
              const loading = Loading.service({
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
                loading.close() 
              }).catch((err)=>{
                loading.close() 
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
            let url = 'http://' + data.cvalue + '/' + data.ivalue + '/' + data.value + '/_search'
            Bus.$emit('searchDocs',url)   
            break
        }
        
      }
  }
}
</script>

<style scoped>
  .left{
    display: block;
    width: 300px;
    height: 600px;
    padding-top:5px;
    background-color: aliceblue;
    float: left;
    overflow: auto;
  }
  .connList{
    background-color: aliceblue;
    width: 300px;
    height: 600px;
  }
</style>
