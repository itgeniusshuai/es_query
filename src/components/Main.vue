<template>
  <div class="main">
   
    <el-tabs v-model="editableTabsValue" type="card" closable @tab-click="tabClick" @edit="handleTabsEdit">
      <el-tab-pane
        :key="item.name"
        v-for="(item) in editableTabs"
        :label="item.title"
        :name="item.name"
      >
        <div style="height:570px;overflow:scroll;padding-right:20px" class="tableDivClass">
          <textarea class="search" v-model="searchSql">
            
          </textarea>
          <button @click="search()">查询</button>
          <el-table
            :data="currentItems"
            style="font-size=12px;"
            :cell-style="cellStyle"
            border
            :header-cell-style="headerCellStyle"
            >
                <el-table-column
                  show-overflow-tooltip
                  sortable
                  :prop="k"
                  :label="k"
                  width="150px"
                  v-for="(v,k) in (currentItems[0])" :key="k">
                </el-table-column>
                
          </el-table>
        </div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="tabPageInfo[item.name].currentPage"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="tabPageInfo[item.name].pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tabPageInfo[item.name].totalNum">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Bus from '../common/bus'
import {get} from '../common/http.js'
import { Loading } from 'element-ui';
import { toNiBolan } from '../common/sqlParse.js';


export default {
  name: 'HelloWorld',
  data () {
    return {
      currentItems:[],
      items:{},
      editableTabsValue: '2',
      editableTabs: [],
      tabIndex: 1,
      cellStyle:{
        padding:"8px 0",
      },
      headerRowStyle:{
        border:"1px solid #0f0"
      },
      headerCellStyle:{
        borderTop:"1px solid #ebeef5"
      },
      defaultPageSize:10,
      tabPageInfo:{},
      tabRelation:{},
      searchSql:""
    }
  },
  mounted:function() {
    let that = this
    Bus.$on('searchDocs',(cvalue,ivalue,value) => {
      this.searchDocs(cvalue,ivalue,value,1,that.defaultPageSize)
    })
  },
  methods:{
    search(){
      let niBolan = toNiBolan(this.searchSql)
      console.log(niBolan)
    },
    handleSizeChange(size){
      let tabName = this.editableTabsValue
      let ivalue = this.tabRelation[tabName].ivalue
      let cvalue = this.tabRelation[tabName].cvalue
      let value = this.tabRelation[tabName].value
      let currentPage = this.tabPageInfo[tabName].currentPage
      this.searchDocs(cvalue,ivalue,value,currentPage,size)
    },
    handleCurrentChange(currentPage){
      let tabName = this.editableTabsValue
      let ivalue = this.tabRelation[tabName].ivalue
      let cvalue = this.tabRelation[tabName].cvalue
      let value = this.tabRelation[tabName].value
      let pageSize = this.tabPageInfo[tabName].pageSize
      this.searchDocs(cvalue,ivalue,value,currentPage,pageSize)
    },
    searchDocs(cvalue,ivalue,value,currentPage,size){
      let url = 'http://' + cvalue + '/' + ivalue + '/' + value + '/_search?from='+(currentPage-1)*size+"&size="+size
      let loading = this.$loading({
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
      let that = this
      get(url).then((res)=>{
        let rrs = res.hits.hits
        let its = rrs.map(function(hit){
          let item = hit._source
          return item
        })
        loading.close()
        let tabName = value+"@"+cvalue+":"+ivalue
        that.currentItems = its
        that.items[tabName] = its
        // 获取所有tabName
        let tabNames = that.editableTabs.map((v)=>{
          return v.name
        })
        let tabIndex = tabNames.indexOf(tabName)
        if(tabIndex == -1){
          that.editableTabs.push({
            title: value,
            name: tabName,
          })
          that.tabIndex = that.editableTabs.length
        }else{
          that.tabIndex = tabIndex
        }
        that.editableTabsValue = tabName

        // 分页信息
        let pageInfo = {}
        pageInfo.totalNum = res.hits.total
        pageInfo.currentPage = currentPage
        pageInfo.pageSize = size
        that.tabPageInfo[tabName] = pageInfo
        // tab页对应的连接信息
        let connInfo = {}
        connInfo.ivalue = ivalue
        connInfo.cvalue = cvalue
        connInfo.value = value
        that.tabRelation[tabName] = connInfo


      }).catch((err)=>{
        console.log(err)
        loading.close()
        this.$alert('连接失败')
      })
    },
    tabClick(targetName){
      this.currentItems = this.items[targetName.name]
    },
    handleTabsEdit(targetName, action){
      if (action === 'remove') {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }
          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      }
    }   
  }
}
</script>

<style scoped>
  .main{
    margin-left: 10px;
    height: 700px;
    overflow: auto;
    padding-left: 20px;
  }
  .row{
    height: 12px;
  }
  .el-table{
    font-size: 10px;
  }
  .el-table::before{
    width: auto;
  }
  .el-table--border::after{
    background-color: white
  }
.el-table--border, .el-table--group{
  border-top: none
}
.el-table tr{
  border:"1px solid #e0f" !important;
}
.tableDivClass th {
  border:"1px solid #000" !important;
}
.headerCell{
  border-top: "1px solid #eee" !important;
}
.search{
  height: 100px;
  width: 100%;
  border: 1px solid gainsboro;
  margin-bottom: 10px;
}
</style>
