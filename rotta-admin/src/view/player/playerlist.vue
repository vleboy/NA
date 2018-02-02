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
        <el-button type="primary" @click="getSearch(true)">搜索</el-button>
        <el-button @click="getSearch(false)">重置</el-button>
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
    <!--<div class="rebackinfo">-->
      <!--<p>共搜索到 {{playerList.length || 0}} 条数据</p>-->
    <!--</div>-->
    <div class="playerform">
      <el-row style="margin-bottom: 2rem">
        <el-col>
          <el-button type="primary" @click="allChangeState(0)">批量停用</el-button>
          <el-button type="primary" @click="allChangeState(1)">批量开启</el-button>
        </el-col>
      </el-row>
      <el-table stripe :data="getItems" @selection-change="selectionChange">
        <el-table-column type="selection" width="60" align="left">
        </el-table-column>
        <el-table-column prop="userId" label="玩家ID" width="100" align="left">
        </el-table-column>
        <el-table-column prop="userNameParent" label="用户名" width="200" align="left">
        </el-table-column>
        <el-table-column prop="msn" label="线路号" show-overflow-tooltip align="left">
        </el-table-column>
        <el-table-column prop="merchantName" label="所属商户"  width="200" align="left">
          <template scope="scope">
            {{ scope.row.merchantName === 'NULL!' ? '-' : scope.row.merchantName}}
          </template>
        </el-table-column>
        <el-table-column prop="nickname" label="玩家昵称" align="left">
          <template scope="scope">
            {{ scope.row.nickname === 'NULL!' ? '-' : scope.row.nickname}}
          </template>
        </el-table-column>
        <el-table-column label="状态" align="left">
          <template scope="scope">
            <el-tag :type="scope.row.state ? 'success' : 'danger'">
              {{playerStatus[scope.row.state]}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="游戏状态" align="left" width="100">
          <template scope="scope">
            <el-tag :type="scope.row.gameState==3 ? 'success' : 'gray'">
              <div>{{scope.row.gameStateName}}</div>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="balance" label="点数" show-overflow-tooltip align="left" width="150">
          <template scope="scope">
            {{formatPoints(scope.row.balance)}}
          </template>
        </el-table-column>
        <el-table-column prop="updateAt" label="最近登录游戏时间"  width="200"  :formatter="getAtime" align="left">
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip align="left" width="120">
          <template scope="scope">
            <el-button  type="text" @click="playDetail(scope.row)">查看</el-button>
            <el-button  type="text" @click="changeStatus(scope.row)">{{scope.row.state ? '停用' : '开启'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right;margin:2rem 0">
        <el-pagination layout="prev, pager, next, jumper" :total="playerList.length"
                       :page-size="20" @current-change="getNowpage" @size-change="getNowsize"
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
        pageSize: 100,
        currentPage: 1,
        showSearch: false,
        isFetching: false,
        isLastMessage: false, // 主要判断是否是后台返回最后一次信息
        playerList: [],
        playerListStorage: [],
        playerListStartKey: '',
        playerStatus: ['已停用', '正常'],
        checkedArray: [],
        names: [],
        searchInfo: {
          gameId:'',
          userName:'',
          nickname:'',
          merchantName:'',
          msn:''
        },
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
        this.$router.push('playerdetail')
        this.$store.commit({
          type: 'playerUserName',
          data: row.userName
        })
      },
      getPlayList () {
        if(this.isFetching) return
        this.isFetching = true
        this.$store.commit('startLoading')
        this.searchInfo.startKey = this.playerListStartKey
        this.searchInfo.pageSize = this.pageSize
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
              this.isLastMessage = res.data.list < this.pageSize
              this.playerList = res.data.list
              this.playerListStartKey = res.data.startKey
              this.playerListStorage.length && (this.playerList = this.playerListStorage.concat(this.playerList))
            }
            this.$store.commit('closeLoading')
            this.isFetching = false
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
              row.state = row.state ? 0 : 1 // 本地修改状态
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
              for (let item of this.checkedArray) {
                for (let data of this.playerList) {
                  if(item.userName == data.userName) {
                    item.state = num
                  }
                }
              }
            }
            this.names = []
            this.$store.commit('closeLoading')
          }
        )
      },
      getAtime (row, col) {
        return detailTime(row.updateAt)
      }, // 格式化创建时间
      getNowsize (size) {
        this.nowSize = size
      },
      getNowpage (page) {
        this.nowPage = page
        if((page == Math.ceil(this.playerList.length/this.nowSize) && !this.isFetching) && (page != 1) && !this.isLastMessage) {
          this.playerListStorage = JSON.parse(JSON.stringify(this.playerList))
          this.getPlayList()
        }
      },
      getSearch (bool) {
        !bool && (this.searchInfo = {
          gameId:'',
          userName:'',
          nickname:'',
          merchantName:'',
          msn:''
        })
        this.playerList = []
        this.playerListStorage = []
        this.playerListStartKey = ''
        this.currentPage = 1
        this.getPlayList()
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
  .playerlist .propList{padding:1rem 2rem;}
  .playerlist .input{width: 80%}
  .playerlist .propList-search{margin: 2rem 2rem 0; background-color: #f5f5f5; text-align: center }
  .playerlist .playerform{padding: 2rem;margin:0 auto;}
</style>
