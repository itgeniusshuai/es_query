<template>
  <div class="left">
    <el-tree
      :data="connData"
      node-key="id"
      :expand-on-click-node="true"
      class="connList"
      >
        <TreeNode :nodeName="node.label" :nodeIcon="node.icon" slot-scope="{ node, data }"></TreeNode>
    </el-tree>
  </div>
</template>

<script>
import TreeNode from './TreeNode'

export default {
  name: 'Left',
      data() {
      
        return {
          connData:[
            {
              "id":1,
              "label":"localhost:9200",
              "icon":require('../assets/conn.png'),
              "children":[
                {
                  "id":11,
                  "icon":require('../assets/index.png'),
                  "label":"rent",
                  "children":[
                    {
                      "id":12,
                      "label":"rent",
                      "icon":require('../assets/doc.png')
                    },{
                      "id":22,
                      "label":"rent",
                      "icon":require('../assets/doc.png')
                    },
                  ]
                }
              ]
            },
            {
              "id":2,
              "label":"localhost:9300",
              "icon":require('../assets/conn.png')
            },
            {
              "id":3,
              "label":"localhost:9400",
              "icon":require('../assets/conn.png')
            }
          ]
        }
    },
  components:{TreeNode},
  methods: {
      
  }
}
</script>

<style scoped>
  .left{
    display: block;
    width: 200px;
    height: 600px;
    padding-top:5px;
    background-color: aliceblue;
  }
  .connList{
    background-color: aliceblue;
  }
</style>
