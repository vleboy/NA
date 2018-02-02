<template>
  <div class="playerlist">
    <div class="propList-search propList">
      <el-row class="transition-box">
        <el-col :span="10" class="g-text-right">
          <span>用户名: </span>
          <el-input placeholder="请输入" class="input" v-model="searchInfo.userName"></el-input>
        </el-col>
        <el-col :span="10">
          <span>直属代理: </span>
          <el-input placeholder="请输入" class="input" v-model="searchInfo.merchantName"></el-input>
        </el-col>
        <el-button type="primary" @click="getSearch(true)">搜索</el-button>
        <el-button  @click="getSearch(false)">重置</el-button>
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

    <div class="playerform">
      <el-row style="margin-bottom: 2rem">
        <el-col :span="3">
          <el-button type="primary" @click="openAdd()">创建玩家</el-button>
        </el-col>
        <el-col :span="21" style="text-align: right">
          <el-button type="primary" @click="allChangeState(0)">批量锁定</el-button>
          <el-button type="primary" @click="allChangeState(1)">批量解锁</el-button>
        </el-col>
      </el-row>
      <el-table stripe :data="getItems" @selection-change="selectionChange">
        <el-table-column type="selection" width="60" align="left">
        </el-table-column>
        <el-table-column prop="userId" label="玩家ID" align="left" width="100">
        </el-table-column>
        <el-table-column prop="userName" label="用户名" width="200" align="left">
        </el-table-column>
        <el-table-column prop="nickname" label="昵称" align="left">
          <template scope="scope">
            <span>{{formatRemark(scope.row.nickname)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="balance" label="点数" show-overflow-tooltip align="left" width="150">
          <template scope="scope">
            <span>{{formatPoints(scope.row.balance)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="merchantName" label="直属代理" align="left" width="120">
          <template scope="scope">
            <el-button type="text" @click="jumpAgentDetail(scope.row)">{{scope.row.merchantName}}</el-button>
          </template>
        </el-table-column>
        <!--<el-table-column width="200" prop="createAt" label="创建时间"  align="left" sortable="custom" :formatter="getAtime">-->
        <!--</el-table-column>-->
        <el-table-column width="200" prop="updateAt"  label="最后登录时间" :formatter="getLastTime" align="left">
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
        <el-table-column label="备注" align="left" >
          <template scope="scope">
            <el-popover trigger="hover" placement="bottom" width="200">
              <div class="remark_content">{{ scope.row.remark === 'NULL!' ? '无' : scope.row.remark}}</div>
              <div slot="reference" class="">
                <el-icon name="search" style="color:#108ee9"></el-icon>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip align="left" width="250">
          <template scope="scope">
            <el-button style="margin-right: 10px"  type="text" @click="playDetail(scope.row)">查看</el-button>
            <span v-if="scope.row.state == 0">
              <el-button type="text" @click="changeStatus(scope.row)">{{scope.row.state ? '锁定' : '解锁'}}</el-button>
            </span>
            <span v-else>
              <el-button  type="text" @click="changeStatus(scope.row)">锁定</el-button>
              <el-button  type="text" @click="openModal(0, scope.row)">存点</el-button>
              <el-button  type="text" @click="openModal(1, scope.row)">提点</el-button>
            </span>

          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right;margin:2rem 0">
        <el-pagination layout="prev, pager, next, jumper" :total="playerList.length"
                       :page-size="20" @size-change="getNowsize" @current-change="getNowpage"
                       :current-page.sync="currentPage">
        </el-pagination>
      </div>
    </div>

    <playerRecharge v-if="isOpenModal" ref="childMethod" :dataProp="balanceInfo" @closeModal="closeRechargeModal"></playerRecharge>
  </div>
</template>

<script type="text/ecmascript-6">
  import { detailTime, thousandFormatter } from '@/behavior/format'
  import { invoke } from '@/libs/fetchLib'
  import api from '@/api/api'
  import playerRecharge from '@/components/player/playerRecharge'
  export default {
    components:{playerRecharge},
    beforeCreate () {
      this.$store.commit('returnLocalStorage')
      this.$store.commit({
        type: 'recordNowindex',
        data: 'agentPlayerList'
      })
      this.$store.commit('startLoading')
    },
    activated: function () {
      this.$store.commit({
        type: 'recordNowindex',
        data: 'agentPlayerList'
      })
    },
    data () {
      return {
        nowSize: 20,
        nowPage: 1,
        pageSize: 100,
        currentPage: 1,
        showSearch: false,
        isOpenModal: false,
        isFetching: false,
        isLastMessage: false, // 主要判断是否是后台返回最后一次信息
        playerList: [],
        playerStatus: ['已锁定', '正常'],
        checkedArray: [],
        names: [],
        searchInfo: {
          gameId:'',
          userName:'',
          nickname:'',
          merchantName:'',
          msn:''
        },
        balanceInfo: {},
        gameTypeList: [],
        jumpUrl:['/addPlayer'],
        playerListStorage: [],
        playerListStartKey: ''
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
      },
      optionOne_label () {
        var name = localStorage.loginUsername.split('_')[1]
        var x = ''
        if (localStorage.loginUsername.split('_')[0] === 'Agent') {
          x = '【平台管理员】'
        } else {
          x = localStorage.loginUsername.split('_')[0]
        }
        return x + ' ' + name
      } // 管理员姓名
    },
    methods: {
      formatRemark (data) {
        if (data == 'NULL!') {
          return '无'
        } else {
          return data
        }
      },
      selectionChange (val) {
        this.checkedArray = val
        // console.log(this.checkedArray, '被选中的多选')
      },
      playDetail (row) {
        localStorage.setItem('playerName', row.userName)
        this.$router.push('agentPlayerDetail')
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
          url: api.getPlayerList,
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
          url: api.playerForzen,
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
          url: api.playerAllForzen,
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
      openAdd () {
        this.$router.push('addPlayer')
      }, // 打开创建玩家
      openModal (bool, row) {
        let rows = JSON.parse(JSON.stringify(row))
        this.isOpenModal = true
        this.balanceInfo = {
          userName: rows.userName,
          parentName: rows.merchantName,
          remark: '',
          balance: rows.balance,
          points: '',
          fromUserId: rows.parent,
          isSave: bool
        }
        setTimeout(()=>{
          this.$refs.childMethod.openRechargeModal()
        },0)
      },
      closeRechargeModal () {
        this.initData()
        this.isOpenModal = false
        this.getPlayList()
      },
      getAtime (row, col) {
        return detailTime(row.createAt)
      }, // 格式化创建时间
      getLastTime (row, col) {
        return detailTime(row.updateAt)
      }, // 格式化登录时间
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
        this.initData()
        this.getPlayList()
      },
      jumpAgentDetail (row) {
//        console.log(row)
        this.$store.commit({
          type: 'recordComdetailID',
          data: row.parent
        })
        this.$store.commit('closeEdit')
        this.$router.push('comdetail')
      },
      formatPoints (num) {
        return thousandFormatter(num)
      }, // 千位符格式化
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
      },
      initData () {
        this.playerList = []
        this.playerListStorage = [];
        this.playerListStartKey = '';
        this.currentPage = 1
      }
    },
    watch: {
      '$route': function (_new, _old) {
        for (let item of this.jumpUrl) {
          if(item === _old.fullPath) {
            this.initData()
            this.getPlayList()
            break
          }
        }
      }
    }
  }
</script>

<style scpoed>
  .playerlist .propList{padding: 2rem;}
  .playerlist .input{width: 80%}
  .playerlist .propList-search{margin: 2rem; background-color: #f5f5f5; text-align: center }
  .playerlist .rebackinfo{padding:0 2rem;}
  .playerlist .playerform{padding: 0 2rem 2rem 2rem;margin:0 auto;}
  .remark_content{word-wrap: break-word; word-break: normal;width: 200px}
</style>
