<template>
  <div class="main">
    {{items|json}}
  </div>
</template>

<script>
import Bus from '../common/bus'
import {get} from '../common/http.js'

export default {
  name: 'HelloWorld',
  data () {
    return {
      items: ''
    }
  },
  mounted:function() {
    Bus.$on('searchDocs',(url) => {
      this.searchDocs(url)
    })
  },
  methods:{
    searchDocs(url){
      let that = this
      get(url).then((res)=>{
        let rrs = res.hits.hits
        // let items = rrs.map(function(hit){
        //   item = hit._source
        //   return item
        // })var jsonData = JSON.stringify(data, null, 4)
        that.items = rrs
      }).catch((err)=>{
        this.$alert('连接失败')
      })
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

</style>
