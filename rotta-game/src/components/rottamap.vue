<template>
<div class="map" id="sliderMap" v-loading="loading" element-loading-text="正在为您加载" style='z-index:2000'>
    <div class="map-content">
      <el-input placeholder="输入玩家查询" v-model="filterText" class="mapInput">
      </el-input>
      <el-tree
        ref="tree"
        :data="mapTree"
        :props="defaultProps"
        default-expand-all
        :current-node-key ='nowUser'
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
<script type="text/ecmascript-6">
let id = 1000
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
export default {
  beforeCreate () {
    this.$store.commit('returnLocalStorage')
    var data = {
      userId: localStorage.loginId
    }
    invoke({
      url: api.mapPlayer,
      method: api.post,
      data: data
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
          this.$message({
            message: err.msg,
            type: 'warning'
          })
        } else {
          var data = ret.data.list
          this.mapTree = data
          this.loading = false
        }
      }
    )
  },
  created () {
  },
  mounted () {
  },
  computed: {
    isSlider () {
      return this.$store.state.variable.isSlider
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    },
    nowUser (val) {
      return val
    }
  },
  data () {
    return {
      loading: true,
      mapTree: [],
      filterText: '',
      nowUser: localStorage.nowUser,
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  methods: {
    filterNode (value, data) {
      if (!value) {
        return true
      } else {
        return data.name.indexOf(value) !== -1
      }
    },
    handleNodeClick (data, node, store) {
      this.$store.commit('startLoading')
      invoke({
        url: api.getPlayDetail + '?' + 'userName' + '=' + data.userName,
        method: api.get
      }).then(
        result => {
          const [err, res] = result
          if (err) {
            this.$message({
              message: err.msg,
              type: 'error'
            })
          } else {
            this.$store.commit({
              type: 'playerDetail',
              data: res.data
            })
          }
          this.$router.push('playerdetail')
          this.$store.commit('closeLoading')
        }
      )
    }, // 点击某一节点回调
    renderContent(h, { node, data, store }) {
      if (data.role === '10000') {
        return (
          <span>
            <span>
              <img src="/static/icon-player.svg" style="vertical-align: -0.2rem;margin-right:0.1rem"></img>
              {node.label}
            </span>
          </span>
        )
      } else {
        return (
          <span>
            <span>
              <span style="">{node.label}</span>
            </span>
          </span>
        )
      }
    }
  }
}
</script>

<style scoped>
.map{background-color: #eee;width: 100%;height: 98.5%;z-index: 99;padding: 0.5rem;overflow:auto;font-size:0.9rem}
.map .mapIcon .el-icon-close {position: fixed;top: 5.5%;right: 0.5%;color: blue}
.map .mapTree{background-color: #eee;border:none;}
.map .mapInput{width: 90%;}
</style>
