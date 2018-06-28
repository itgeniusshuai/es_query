<template>
  <div class="main">
    <el-tabs v-model="editableTabsValue" type="card" closable @edit="handleTabsEdit" >
      <el-tab-pane
        :key="item.name"
        v-for="(item) in editableTabs"
        :label="item.title"
        :name="item.name"
      >
        <el-table
          :data="items[item.name]"
          style="width: 100%;font-size=12px;"
          border
          :cell-style="rowStyle"
          height="750px">
              <el-table-column
                show-overflow-tooltip
                sortable
                :prop="k"
                :label="k"
                width="90" v-for="(v,k) in (items[item.name][0])" :key="k">
              </el-table-column>
              
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Bus from '../common/bus'
import {get} from '../common/http.js'
import { Loading } from 'element-ui';


export default {
  name: 'HelloWorld',
  data () {
    return {
      items:{},
      editableTabsValue: '2',
      editableTabs: [],
      tabIndex: 1,
      rowStyle:{
        padding:"8px 0"
      }
    }
  },
  mounted:function() {
    Bus.$on('searchDocs',(cvalue,ivalue,value) => {
      this.searchDocs(cvalue,ivalue,value)
    })
  },
  methods:{
   
    searchDocs(cvalue,ivalue,value){
      let url = 'http://' + cvalue + '/' + ivalue + '/' + value + '/_search'
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
      }).catch((err)=>{
        console.log(err)
        loading.close()
        this.$alert('连接失败')
      })
    },
    handleTabsEdit(targetName, action) {
        if (action === 'add') {
          let newTabName = ++this.tabIndex + '';
          this.editableTabs.push({
            title: 'New Tab',
            name: newTabName,
            content: 'New Tab content'
          });
          this.editableTabsValue = newTabName;
        }
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
    margin-left: 310px;
    height: 600px;
    overflow: auto;
  }
  .row{
    height: 12px;
  }
  .el-table{
    font-size: 10px;
  }

</style>
