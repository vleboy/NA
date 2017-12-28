<template>
  <div class="playerlist">
    <div class="propList-search propList">
      <el-row class="transition-box">
        <el-col :span="10" class="g-text-right">
          <span>用户名: </span>
          <el-input placeholder="请输入" class="input" v-model="searchInfo.userName"></el-input>
        </el-col>
        <el-col :span="10" class="g-text-right">
          <span>玩家昵称: </span>
          <el-input placeholder="请输入" class="input" v-model="searchInfo.nickname"></el-input>
        </el-col>
        <el-button type="primary" @click="getPlayList">搜索</el-button>
        <el-button @click="resultSearch">重置</el-button>
      </el-row>
      <el-row class="transition-box" style="margin-top: 2rem" v-if="role!='100'">
        <el-col :span="10" class="g-text-right">
        <span>所属商户: </span>
        <el-input placeholder="请输入" class="input" v-model="searchInfo.merchantName"></el-input>
        </el-col>
        <el-col :span="10" class="g-text-right">
          <span>线路号: </span>
          <el-input placeholder="请输入" class="input" v-model="searchInfo.msn"></el-input>
        </el-col>
      </el-row>
      <el-row class="transition-box" style="margin-top: 2rem">
        <el-col :span="10" class="g-text-right">
          <span>游戏状态: </span>
          <el-select v-model="searchInfo.gameId" class="input" placeholder="请选择游戏状态" clearable>
            <el-option v-for="(item, index) in gameTypeList" :key="index" :label="item.name" :value="item.code"></el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
    <div class="rebackinfo">
      <p>共搜索到 {{playerList.length || 0}} 条数据</p>
    </div>
    <div class="playerform">
      <el-row style="margin-bottom: 2rem">
        <el-col>
          <el-button type="primary" @click="allChangeState(0)">批量停用</el-button>
          <el-button type="primary" @click="allChangeState(1)">批量开启</el-button>
        </el-col>
      </el-row>
      <el-table stripe :data="getItems" @selection-change="selectionChange" @sort-change="sortFun">
        <el-table-column type="selection" width="60" align="center">
        </el-table-column>
        <el-table-column prop="userNameParent" label="用户名" align="center">
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
        <el-table-column label="游戏状态" align="center">
          <template scope="scope">
            <el-tag :type="scope.row.gameState==3 ? 'success' : 'gray'">
              <div>{{scope.row.gameStateName}}</div>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="balance" label="点数" sortable="custom" show-overflow-tooltip align="center">
          <template scope="scope">
            {{formatPoints(scope.row.balance)}}
          </template>
        </el-table-column>
        <el-table-column prop="updateAt" label="最近登录游戏时间" :formatter="getAtime" align="center">
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip align="center">
          <template scope="scope">
            <el-button  type="text" @click="playDetail(scope.row)">查看</el-button>
            <el-button  type="text" @click="changeStatus(scope.row)">{{scope.row.state ? '停用' : '开启'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right;margin:2rem 0">
        <el-pagination layout="prev, pager, next, sizes, jumper" :total="playerList.length"
                       :page-sizes="[20, 50]" :page-size="nowSize" @size-change="getNowsize" @current-change="getNowpage"
                       :current-page.sync="currentPage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { invoke } from '@/libs/fetchLib'
  import { formatUserName, unFormatUserName, detailTime, thousandFormatter } from '@/behavior/format'
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
    activated: function () {
      this.$store.commit({
        type: 'recordNowindex',
        data: 'playerlist'
      })
    },
    data () {
      return {
        nowSize: 20,
        nowPage: 1,
        currentPage: 1,
        showSearch: false,
        playerList: [],
        playerStatus: ['已停用', '正常'],
        checkedArray: [],
        names: [],
        searchInfo: {
          gameId: ''
        },
        sortInfo: {},
        role: localStorage.loginRole, // 相应角色的权限（区分商户、线路商、平台角色）
        gameTypeList: []
      }
    },
    created () {
      this.getPlayList()
      this.getGameTypeList()
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
        // console.log(this.checkedArray, '被选中的多选')
      },
      playDetail (row) {
        localStorage.setItem('playerName', row.userName)
        // this.$store.commit('startLoading')
        invoke({
          url: api.getPlayDetail + '?' + 'userName' + '=' + row.userName,
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
            // this.$store.commit('closeLoading')
          }
        )
      },
      getPlayList () {
        this.$store.commit('startLoading')
        this.currentPage = 1
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
                item.userNameParent = formatUserName(item.userName)
              }
              this.playerList = res.data.list
            }
            this.$store.commit('closeLoading')
          }
        )
      },
      changeStatus (row) {
        this.$store.commit('startLoading')
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
          this.names.push(item.userName)
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
          }
        )
      },
      getAtime (row, col) {
        return detailTime(row.updateAt)
      }, // 格式化创建时间
      getNowsize (size) {
        this.nowSize = size
        // console.log('当前每页:' + size)
      },
      getNowpage (page) {
        this.nowPage = page
        // console.log('当前是第:' + page + '页')
      },
      resultSearch () {
        this.searchInfo = {
          gameId: ''
        }
        this.getPlayList()
      },
      sortFun (col){
        if(col.prop!=null){
          this.searchInfo.sortKey = col.prop
          this.searchInfo.sort = col.order== 'ascending' ? 'asce':'desc';
          this.getPlayList()
        } else {
          this.searchInfo.sortKey = ''
          this.searchInfo.sort = ''
        }
      },
      formatPoints (num) {
        return thousandFormatter(num)
      },
      getGameTypeList () {
        invoke({
          url: api.gameBigType,
          method: api.post,
          data: {
            companyIden: -1
          }
        }).then(
          result => {
            const [err, res] = result
            if (err) {
              this.$message({
                message: err.msg,
                type: 'error'
              })
            } else {
              this.gameTypeList = res.data.payload
              this.gameTypeList.unshift({
                code: '0',
                name: '未在游戏中'
              })
            }
            // this.$store.commit('closeLoading')
          }
        )
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
