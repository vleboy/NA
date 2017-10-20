<template>
  <div class="playerlist">
    <div class="propList-search propList">
      <el-row class="transition-box">
        <el-col :span="10">
          <span>&emsp;用户名: </span>
          <el-input placeholder="请输入" class="input" v-model="searchInfo.userName"></el-input>
        </el-col>

        <el-col :span="10" class="text-left">
          <span>玩家昵称: </span>
          <el-input placeholder="请输入" class="input" v-model="searchInfo.nickname"></el-input>
        </el-col>
        <el-button type="primary" @click="getPlayList">搜索</el-button>
        <el-button  @click="resultSearch">重置</el-button>
      </el-row>
    </div>
    <div class="rebackinfo">
      <p>共搜索到 {{playerList.length || 0}} 条数据</p>
    </div>
    <div class="playerform">
      <el-row style="margin-bottom: 2rem">
        <el-col>
          <el-button type="primary" @click="allChangeState(0)">批量锁定</el-button>
          <el-button type="primary" @click="allChangeState(1)">批量解锁</el-button>
        </el-col>
      </el-row>
      <el-table stripe :data="getItems" @selection-change="selectionChange">
        <el-table-column type="selection" width="60" align="center">
        </el-table-column>
        <el-table-column label="用户名" prop="userName" align="center">
        </el-table-column>
        <el-table-column prop="msn" label="线路号" show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column prop="merchantName" label="所属商户" align="center">
          <template scope="scope">
            {{ scope.row.merchantName === 'NULL!' ? '-' : scope.row.merchantName}}
          </template>
        </el-table-column>
        <el-table-column prop="nickname" label="玩家昵称" align="center">
          <template scope="scope">
            {{ scope.row.nickname === 'NULL!' ? '-' : scope.row.nickname}}
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template scope="scope">
            <el-tag :type="scope.row.state ? 'success' : 'danger'">
              {{playerStatus[scope.row.state]}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="balance" label="点数" sortable show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column prop="updateAt" label="最近登录游戏时间" :formatter="getAtime" align="center">
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip align="center">
          <template scope="scope">
            <el-button  type="text" @click="playDetail(scope.row)">查看</el-button>
            <el-button  type="text" @click="changeStatus(scope.row)">{{scope.row.state ? '锁定' : '解锁'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right;margin:2rem 0">
        <el-pagination layout="prev, pager, next, sizes, jumper" :total="playerList.length"
                       :page-sizes="[20, 50]" :page-size="nowSize" @size-change="getNowsize" @current-change="getNowpage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import dateformat from 'dateformat'
  import { formatUserName, unFormatUserName } from '@/behavior/format'
  import { invoke } from '@/libs/fetchLib'
  import api from '@/api/api'
  export default {
    beforeCreate () {
      this.$store.commit('returnLocalStorage')
      this.$store.commit({
        type: 'recordNowindex',
        data: 'playerlist'
      })
      this.$store.commit('startLoading')
    },
    data () {
      return {
        nowSize: 20,
        nowPage: 1,
        showSearch: false,
        playerList: [],
        playerStatus: ['已锁定', '正常'],
        checkedArray: [],
        names: [],
        searchInfo: {}
      }
    },
    created () {
      this.getPlayList()
    },
    computed: {
      getItems () {
        if (this.nowPage === 1) {
          return this.playerList.slice(0, this.nowSize)
        } else {
          return this.playerList.slice(((this.nowPage - 1) * this.nowSize), this.nowSize * this.nowPage)
        }
      }
    },
    methods: {
      selectionChange (val) {
        this.checkedArray = val
        
      },
      playDetail (row) {
        this.$store.commit('startLoading')
        let prime = unFormatUserName(row.parentName, row.userName)
        localStorage.setItem('playerName', prime)
        invoke({
          url: api.getPlayDetail + '?' + 'userName' + '=' + prime,
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
              this.playerDetail = res.data
              this.$store.commit({
                type: 'playerDetail',
                data: this.playerDetail
              })
            }
            this.$router.push('playerdetail')
            this.$store.commit('closeLoading')
          }
        )
      },
      getPlayList () {
        this.$store.commit('startLoading')
        invoke({
          url: api.getPlayList,
          method: api.post,
          data: this.searchInfo
        }).then(
          result => {
            const [err, res] = result
            if (err) {
              this.$message({
                message: err.msg,
                type: 'error'
              })
            } else {
              for (let item of res.data.list) {
                item.userName = formatUserName(item.userName)
              }
              this.playerList = res.data.list
            }
            this.$store.commit('closeLoading')
          }
        )
      },
      changeStatus (row) {
        this.$store.commit('startLoading')
        row.userName = unFormatUserName(row.parentName, row.userName)
        invoke({
          url: api.forzenPlay,
          method: api.post,
          data: {
            userName: row.userName,
            state: row.state ? 0 : 1
          }
        }).then(
          result => {
            const [err, res] = result
            if (err) {
              this.$message({
                message: err.msg,
                type: 'error'
              })
            } else if (res) {
              this.$message({
                message: '状态改变成功',
                type: 'success'
              })
              this.getPlayList()
            }
            this.$store.commit('closeLoading')
          }
        )
      }, // 更改玩家状态
      allChangeState (num) {
        if (!this.checkedArray.length) {
          return this.$message({
            message: '请选择需要批量操作的数据',
            type: 'error'
          })
        }
        this.checkedArray.forEach(item => {
          this.names.push(unFormatUserName(item.parentName, item.userName))
        })
        this.$store.commit('startLoading')
        invoke({
          url: api.allForzenPlay,
          method: api.post,
          data: {
            names: this.names,
            state: num
          }
        }).then(
          result => {
            const [err, res] = result
            if (err) {
              this.$message({
                message: err.msg,
                type: 'error'
              })
            } else if (res) {
              this.$message({
                message: '状态改变成功',
                type: 'success'
              })
              this.getPlayList()
            }
            this.names = []
            this.$store.commit('closeLoading')
          }
        )
      },
      getAtime (row, col) {
        var now = new Date(parseFloat(row.updateAt))
        var formatprev = dateformat(now, 'isoDate')
        return formatprev
      }, // 格式化创建时间
      getNowsize (size) {
        this.nowSize = size
        
      },
      getNowpage (page) {
        this.nowPage = page
        
      },
      resultSearch () {
        this.searchInfo = {}
        this.getPlayList()
      }
    }
  }
</script>

<style scpoed>
  .playerlist .propList{padding: 2rem;}
  .playerlist .input{width: 80%}
  .playerlist .propList-search{margin: 2rem; background-color: #f5f5f5; text-align: center }
  .playerlist .text-left{text-align: left}
  .playerlist .rebackinfo{padding:0 2rem;}
  .playerlist .playerform{padding: 2rem;margin:0 auto;}
</style>
