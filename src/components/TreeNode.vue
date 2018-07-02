<template>
  <div class="treeNode">
    <img :src="nodeIcon" class="nodeIcon"/>
    <el-tooltip class="nodeName" :content='nodeName' placement="right" :open-delay="openDelay">
        <input :value="nodeName" readonly style="background:none;border:none"/>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'TreeNode',
  data () {
    return {
      openDelay:2000
    }
  },
  props:["nodeName","nodeIcon"]
}
</script>

<style scoped>
    .treeNode{
        height: 18px;
        /* width: 280px; */
        padding-right: 10px;
    }
    .nodeIcon{
        height: 18px;
        width: 18px;
        float: left;
    }
    .nodeName{
        margin-left: 10px;
        height: 18px;
        /* width:200px; */
        font-size: 12px;
        line-height: 18px;
        /* float: left; */
        overflow:hidden;
        display: inline-block;
    }
</style>
