<template>
<div class="map" id="sliderMap" v-loading="loading" element-loading-text="正在为您加载">
    <div class="map-content">
      <el-input placeholder="输入线路商/商户昵称查询" v-model="filterText" class="mapInput">
      </el-input>
      <el-tree
        ref="tree"
        :data="mapTree"
        :props="defaultProps"
        :current-node-key ='nowUser'
        default-expand-all
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
    this.$store.commit('openMap')
  },
  mounted () {
    if (this.role == '1' || this.role == '10') {
      this.$store.dispatch('getMap')
    } else if (this.role == '100') {
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
              this.$store.commit('closeMap')
            } else {
              var data = ret.data.list
              this.$store.commit({
                type: 'recordMap',
                data: data
              })
              this.$store.commit('closeMap')
            }
          }
        )
    }
  },
  computed: {
    loading () {
      return this.$store.state.variable.mapLoading
    },
    isSlider () {
      return this.$store.state.variable.isSlider
    },
    mapTree () {
      return this.$store.state.variable.map
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
      filterText: '',
      role: localStorage.loginRole,
      nowUser: localStorage.nowUser,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      isFetching: false,
      dataType: []
    }
  },
  methods: {
    getMapPlayer (store, data) {
      if(this.isFetching) return
      this.isFetching = true
      event.stopPropagation(this.handleNodeClick)
      invoke({
        url: api.mapPlayer,
        method: api.post,
        data: {
          userId: data.id
        }
      }).then(
        result => {
          const [err, ret] = result
          let localData = [] // 暂加有新增玩家数组
          let isBreak = false // 判断是否跳出当前循环
          this.isFetching = false
          if(!this.dataType.length) {
            this.dataType = ret.data.list
            for (let item of this.dataType) {
              store.append(item, data)
            }
          } else {
            for (let i of ret.data.list) {
              for(let j of this.dataType) {
                if(i.userId == j.userId){
                  isBreak = true
                  break
                }
              }
              if (isBreak) {
                isBreak = !isBreak
                continue
              } else {
                localData.push(i)
              }
            }
            this.dataType = ret.data.list
            if (localData.length) {
              for (let item of localData) {
                store.append(item, data)
              }
            }
          }
          if (ret.data.list.length == 0) {
            this.$message({
              type: 'warning',
              message: '暂无玩家数据'
            })
          } else {
            this.$message({
              type: 'success',
              message: '查询成功'
            })
          }
        }
      )
    },
    goCreateOut (store, data) {
      event.stopPropagation(this.handleNodeClick)
      var _data = ''
      if (data.id == '01') {
        _data = ''
      } else {
        _data = data.id
      }
      this.$store.commit({
        type: 'selectParent',
        data: _data
      })
      // console.log('执行')
      this.$router.push('outcreate')
    },
    goCreateCom (store, data) {
      event.stopPropagation(this.handleNodeClick)
      var _data = ''
      if (data.id == '01') {
        _data = ''
      } else {
        _data = data.id
      }
      this.$store.commit({
        type: 'selectParent',
        data: _data
      })
      // console.log('执行')
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
      var allNode = document.getElementsByClassName('renderZone')
      this.$store.commit('closeEdit')
      localStorage.setItem('parentID', data.parent)
      for (var i = allNode.length - 1; i >= 0; i--) {
        allNode[i].style.display = 'none'
      }
      if (data.role === '10' || data.name === 'NA集团' || data.role === '100') {
        var x = store.$el.getElementsByClassName('renderZone')[0]
        x.style.display = 'block'
      }
      if (data.name == 'NA集团') {
        this.$router.push('personal')
        this.$store.dispatch('getPersonal_info_admin')
        this.$store.dispatch('getPersonal_property')
        this.$store.dispatch('getPersonal_bills')
      }
      if (data.id || data.userId) {
        if (data.role === '10') {
          this.$store.commit({
            type: 'recordOutdetailID',
            data: data.id
          })
          this.$router.push('outdetail')
          this.$store.commit('closeEdit')
          this.$store.commit('startLoading')
          this.$store.dispatch('getOutdetail')
          this.$store.dispatch('getOutdetail_property')
          this.$store.dispatch('getOutdetail_child_managers')
          this.$store.dispatch('getOutdetail_child_merchants')
        } else if (data.role === '100') {
          this.$store.commit({
            type: 'recordComdetailID',
            data: data.id
          })
          this.$store.commit('startLoading')
          this.$router.push('comdetail')
          this.$store.commit('closeEdit')
          this.$store.dispatch('getComdetail')
          this.$store.dispatch('getComdetail_property')
        } else if (data.role == '10000') {
          localStorage.setItem('playerName', data.userName)
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
        }
      }
    }, // 点击某一节点回调
    renderContent(h, { node, data, store }) {
      if (data.role === '10') {
        return (
          <span>
            <span>
              <span>
                <img src="/static/icon-manager.png" style="vertical-align: -0.15rem;margin-right:0.3rem"></img>
                {node.label}
              </span>
            </span>
            <div style="float:right;display:none;margin-right:1rem" class="renderZone">
              <el-button type="primary" size="mini" on-click={ () => this.goCreateOut(store, data) }>创建线路商</el-button>
              <el-button type="primary" size="mini" on-click={ () => this.goCreateCom(store, data) }>创建商户</el-button>
            </div>
          </span>
        )
      } else if (data.role === '100') {
        return (
          <span>
            <span>
                <img src="/static/icon-merchant.png" style="vertical-align: -0.25rem;margin-right:0.3rem"></img>
              {node.label}
            </span>
            <div style="float:right;display:none;margin-right:1rem" class="renderZone">
              <el-button type="primary" size="mini" on-click={ () => this.getMapPlayer(store, data) }>查看商户玩家</el-button>
            </div>
          </span>
        )
      } else if (data.role === '10000') {
        return (
          <span>
            <span>
              <img src="/static/icon-player.png" style="vertical-align: -0.2rem;margin-right:0.1rem"></img>
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
            <div style="float:right;display:none;margin-right:10px" class="renderZone">
              <el-button type="primary" size="mini" on-click={ () => this.goCreateOut(store, data) }>创建直属线路商</el-button>
              <el-button type="primary" size="mini" on-click={ () => this.goCreateCom(store, data) }>创建直属商户</el-button>
            </div>
          </span>
        )
      }
    }
  }
}
</script>

<style scoped>
.map{background-color: #eee;width: 100%;height: 95%;z-index: 99;padding: 1.5rem 0.5rem;overflow:auto;font-size:0.9rem}
.map .mapIcon .el-icon-close {position: fixed;top: 5.5%;right: 0.5%;color: blue}
.map .mapTree{background-color: #eee;border:none;}
.map .mapInput{width: 90%;}
</style>
