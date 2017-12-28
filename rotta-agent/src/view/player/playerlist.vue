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
        <el-button type="primary" @click="getPlayList">搜索</el-button>
        <el-button  @click="resultSearch">重置</el-button>
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
        <el-col :span="3">
          <el-button type="primary" @click="openAdd()">创建玩家</el-button>
        </el-col>
        <el-col :span="21" style="text-align: right">
          <el-button type="primary" @click="allChangeState(0)">批量锁定</el-button>
          <el-button type="primary" @click="allChangeState(1)">批量解锁</el-button>
        </el-col>
      </el-row>
      <el-table stripe :data="getItems" @selection-change="selectionChange" @sort-change="sortFun">
        <el-table-column type="selection" width="60" align="center">
        </el-table-column>
        <el-table-column prop="userName" label="用户名" align="center">
        </el-table-column>
        <el-table-column prop="nickname" label="昵称" align="center">
          <template scope="scope">
            <span>{{formatRemark(scope.row.nickname)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="balance" label="点数" sortable="custom" show-overflow-tooltip align="center">
          <template scope="scope">
            <span>{{formatPoints(scope.row.balance)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="merchantName" label="直属代理" align="center" width="120"  sortable="custom">
          <template scope="scope">
            <el-button type="text" @click="jumpAgentDetail(scope.row)">{{scope.row.merchantName}}</el-button>
          </template>
        </el-table-column>
        <!--<el-table-column width="200" prop="createAt" label="创建时间"  align="center" sortable="custom" :formatter="getAtime">-->
        <!--</el-table-column>-->
        <el-table-column width="200" prop="updateAt"  label="最后登录时间" :formatter="getLastTime" align="center" sortable="custom">
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
        <el-table-column label="备注" align="center" >
          <template scope="scope">
            <el-popover trigger="hover" placement="bottom" width="200">
              <div class="remark_content">{{ scope.row.remark === 'NULL!' ? '无' : scope.row.remark}}</div>
              <div slot="reference" class="">
                <el-icon name="search" style="color:#108ee9"></el-icon>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip align="center" width="250">
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
        <el-pagination layout="prev, pager, next, sizes, jumper" :total="playerList.length"
                       :page-sizes="[20, 50]" :page-size="nowSize" @size-change="getNowsize" @current-change="getNowpage">
        </el-pagination>
      </div>
    </div>

    <el-dialog :title="isSave ? '玩家存点' : '玩家提点'" :visible.sync="isOpenModal" size="tiny"
               :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <el-form :model="balanceInfo" label-width="100px">
        <el-form-item :label="isSave ? '存入点数' : '提取点数'">
          <el-input v-model="balanceInfo.points" class="input" :placeholder="isSave? '请输入存点数' : '请输入提点数'" type="number"></el-input>
        </el-form-item>
        <el-form-item :label="isSave ? '起始账户' : '转入账户'">
          【代理】{{balanceInfo.parentName}}
        </el-form-item>
        <el-form-item label="备注">
          <el-input placeholder="请输入备注" type="textarea" :rows="6" :maxlength="180" class="input"
                    v-model="balanceInfo.remark"></el-input>
        </el-form-item>
        <div class="g-text-center">
          <el-button @click="isOpenModal = false" style="margin-right: 10%">取 消</el-button>
          <el-button type="primary" :load="isSending" @click="submit()">{{isSending ? '提交中' : '确 定'}}</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import { detailTime, thousandFormatter } from '@/behavior/format'
  import { invoke } from '@/libs/fetchLib'
  import api from '@/api/api'
  export default {
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
        showSearch: false,
        isOpenModal: false,
        isSending: false,
        isSave: false,
        playerList: [],
        playerStatus: ['已锁定', '正常'],
        checkedArray: [],
        names: [],
        searchInfo: {
          gameId: ''
        },
        balanceInfo: {},
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
        // this.$store.commit('startLoading')
        localStorage.setItem('playerName', row.userName)
        invoke({
          url: `${api.getPlayerDetail}?userName=${row.userName}`,
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
            this.$router.push('agentPlayerDetail')
            // this.$store.commit('closeLoading')
          }
        )
      },
      getPlayList () {
        this.$store.commit('startLoading')
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
              this.playerList = res.data.list
            }
            this.$store.commit('closeLoading')
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
              this.getPlayList()
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
          parentName: rows.parentName,
          remark: '',
          balance: rows.balance,
          points: '',
          fromUserId: rows.parent
        }
        this.isSave = (bool === 0)
        // console.log(this.balanceInfo)
      },
      getAtime (row, col) {
        return detailTime(row.createAt)
      }, // 格式化创建时间
      getLastTime (row, col) {
        return detailTime(row.updateAt)
      }, // 格式化登录时间
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
      submit () {
        var rex = new RegExp(/^[0-9]*[1-9][0-9]*$/)
        if (!this.isSave && (this.balanceInfo.points > this.balanceInfo.balance)) {
          return this.$message.error('对不起，提点数不能超过当前剩余点数')
        } else if (this.isSave && (!rex.exec(this.balanceInfo.points) || this.balanceInfo.points > 1000000000)) {
          return this.$message.error('存点数范围为1-1000,000,00的正整数')
        } else if (!this.isSave && !rex.exec(this.balanceInfo.points)) {
          return this.$message.error('提点数为正整数')
        } else if (!this.balanceInfo.fromUserId) {
          return this.$message.error('请选择账户')
        }
        if (this.isSending) return
        this.isSending = true
        invoke({
          url: this.isSave ? api.playerDeposit : api.playerTake,
          method: api.post,
          data: {
            fromUserId: this.balanceInfo.fromUserId,
            toUser: this.balanceInfo.userName,
            amount: this.balanceInfo.points,
            remark: this.balanceInfo.remark
          }
        }).then(
          result => {
            const [err, res] = result
            if (err) {
              this.$message({
                message: err.msg,
                type: 'error'
              })
              this.isSending = false
            } else {
              // console.log(res)
              this.$message.success('提交成功')
              this.isSending = false
              this.isOpenModal = false
              this.getPlayList()
            }
          }
        )
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
  .remark_content{word-wrap: break-word; word-break: normal;width: 200px}
</style>
