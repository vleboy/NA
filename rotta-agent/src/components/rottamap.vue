<template>
<div class="map" id="sliderMap">
    <i class="el-icon-arrow-left" @click='closeMap' v-if="this.isSlider"></i>
    <div class="map-content">
      <el-input placeholder="输入代理昵称查询" v-model="filterText" class="mapInput">
      </el-input>
      <el-tree
        ref="tree"
        :data="mapTree"
        :props="defaultProps" 
        default-expand-all
        :current-node-key ="nowUser"
        node-key="id"
        class="mapTree" 
        :expand-on-click-node="false"
        :highlight-current="true"
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
        :render-content="renderContent"
      >
      </el-tree>
    </div>
</div>
</template>
<script>
let id = 1000
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
export default {
  beforeCreate () {
    this.$store.commit('returnLocalStorage')
    this.$store.commit({
      type: 'recordMap',
      data: []
    })
  },
  created () {
    this.$store.dispatch('getMap')
  },
  mounted () {
  },
  computed: {
    isSlider () {
      return this.$store.state.variable.isSlider
    },
    mapTree () {
      return this.$store.state.variable.map
    },
    nowUser () {
      var user = this.$store.state.variable.mapUser || '01'
      return user
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  data () {
    return {
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  methods: {
    async getMapPlayer (store, data) {
      event.stopPropagation(this.handleNodeClick)
      if (data.isClick && data.isClick === 'clicked') {
        this.$message({
          type: 'success',
          message: '查询成功'
        })
        return
      } else {
        var agentId = {
          userId: data.id
        }
        const [err, ret] = await invoke({
          url: api.mapPlayer,
          method: api.post,
          data: agentId
        })
        if (err) {
        } else {
          this.$message({
            type: 'success',
            message: '查询成功'
          })
          var result = ret.data.list
          for (let item of result) {
            store.append(item, data)
          }
        }
        data.isClick = 'clicked'
      }
    },
    closeMap () {
      this.$store.commit('isMap')
    }, // 关闭组织架构
    goCreateAgent (store, data) {
      event.stopPropagation(this.handleNodeClick)
      this.$store.commit({
        type: 'selectParent',
        data: ''
      })
      this.$router.push('comcreate')
    },
    filterNode (value, data) {
      if (!value) {
        return true
      } else {
        return data.name.indexOf(value) !== -1
      }
    },
    handleNodeClick (data, node, store) {
      if (data.id) {
        var id = ''
        if (data.id == '01' && localStorage.loginSuffix == 'Agent') {
          id = '01'
        } else if (localStorage.loginSuffix != 'Agent' && data.id == '01') {
          id = localStorage.loginId
        } else {
          id = data.id
        }
        this.$store.commit({
          type: 'recordAgentId',
          data: id
        })
        this.$store.dispatch('getComlist')
        this.$store.dispatch('getSelfData')
        this.$store.dispatch('getAgentPlayer')
      } else {
        id = '01'
        this.$store.commit({
          type: 'recordAgentId',
          data: id
        })
        this.$store.dispatch('getComlist')
        var arr = []
        this.$store.commit({
          type: 'recordSelfData',
          data: arr
        })
        this.$store.commit({
          type: 'recordAgentPlayer',
          data: arr
        })
      }
    }, // 点击某一节点回调
    renderContent(h, { node, data, store }) {
      if (data.id == '01' && localStorage.loginSuffix == 'Agent') {
        return (
          <span>
            <span>
              <span>【管理员】</span>
              <span>{node.label}</span>
            </span>
            <span style="float: right; margin-right: 20px">
              <el-button type="primary" size="mini" on-click={ () => this.goCreateAgent(store, data) }>创建直属代理</el-button>
            </span>
          </span>
        )
      } else {
        return (
          <span>
            <span>【代理】</span>
            <span>{node.label}</span>
          </span>
        )
      }
    }
  }
}
</script>

<style scoped>
.map{width: 100%;height: 98.5%;z-index: 99;padding: 0.5rem;overflow:auto;font-size:0.9rem}
.map .mapIcon .el-icon-close {position: fixed;top: 5.5%;right: 0.5%;color: blue}
.map .mapTree{background-color: #eee;border:none;}
.map .mapInput{width: 90%;}

.map .el-icon-arrow-left{border:1px solid #eee;background-color: #fff;padding: 1.25rem 0.15rem;font-size:1.2rem;position:absolute;z-index: 100;right: 0;top: 40%;cursor: pointer}
.map .el-icon-arrow-left:hover{background-color: #eee;color: #fff}
</style>
