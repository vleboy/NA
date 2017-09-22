<template>
  <div class="playerdetail">
    <div class="playdetailform">
      <div class="my-title">
        <h2>{{detailInfo.userName}}</h2>
      </div>
      <div class="baseinfo">
        <h4>基本信息</h4>
        <div class="baseinfo-form">
          <el-col :span="6">
            <div class="-player-title">用户名：{{detailInfo.userName}}</div>
          </el-col>
          <el-col :span="6">
            <div class="-player-title">昵称：{{detailInfo.nickname === 'NULL!' ? '无' : detailInfo.nickname}}</div>
          </el-col>
          <el-col :span="6">
            <div class="-player-title" >
              密码：
              <span v-if="!editPassword">{{detailInfo.password}}</span>
              <el-input v-model="password" placeholder="请输入密码" type="text" v-else style="width: 50%"></el-input>
              <el-button type="text" @click="openPwdInput" v-if="!editPassword" style="margin-left: 0.5rem">修改</el-button>
              <span v-else style="margin-left: 0.5rem">
                <el-button type="text" @click="updatePwd">确认</el-button>
                <el-button type="text" @click="editPassword = !editPassword">取消</el-button>
              </span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="-player-title">上次登录游戏时间：{{lastTime}}</div>
          </el-col>
        </div>
      </div>
      <div class="countinfo">
        <h4>消费信息</h4>
        <div class="countinfo-title">
          <span class="justfy2">当前剩余点数：<span style="color: #F7BA2A">{{detailInfo.balance}}</span></span>
          <el-button type="text" @click="getPlayerDetail">刷新</el-button>
          <el-button type="text" @click="openModal(0)" v-if="detailInfo.state!=0">存点</el-button>
          <el-button type="text" @click="openModal(1)" v-if="detailInfo.state!=0">提点</el-button>
          <el-radio-group v-model="radioInfo" @change="changeRadio()"  style="margin-left: 1rem">
            <el-radio-button label="0">全部</el-radio-button>
            <el-radio-button label="10000">棋牌游戏</el-radio-button>
            <el-radio-button label="40000">电子游戏</el-radio-button>
            <el-radio-button label="30000">真人视讯</el-radio-button>
            <!-- <el-radio-button label="-1">中心钱包</el-radio-button> -->
            <el-radio-button label="-2">代理操作</el-radio-button>
            <el-radio-button label="-3">商城</el-radio-button>
          </el-radio-group>
        </div>
        <div class="countinfo-center">
          <el-col :span="5">
            <span>花费总点数 : <span class="g-color-red">{{allAmountFun}}</span></span>
          </el-col>

          <el-col :span="7" style="float: right; text-align: right">
            <el-date-picker
              v-model="amountDate"
              type="daterange"
              placeholder="选择日期范围">
            </el-date-picker>
            <el-button type="primary" @click="searchAmount">搜索</el-button>
          </el-col>
        </div>
        <div class="countinfo-form">
          <el-table :data="dataList">
            <el-table-column prop="date" label="序号" width="65" align="center" type="index"></el-table-column>
            <el-table-column prop="nowPoints" label="账户余额" width="120" align="center">
              <template scope="scope">
                {{scope.row.originalAmount+scope.row.amount}}
              </template>
            </el-table-column>
            <el-table-column label="交易点数" width="120" align="center">
              <template scope="scope">
                <span :class="{'-p-green':scope.row.action ==1,'-p-red':scope.row.action ==-1}">{{scope.row.amount}}</span>
              </template>
            </el-table-column>
            <el-table-column label="交易时间" :formatter="getAtime" width="180" align="center"></el-table-column>
            <el-table-column prop="typeName" label="交易类型" width="120" align="center"></el-table-column>
            <el-table-column label="交易详情(原账+当前操作额=现在余额)"  align="center">
              <template scope="scope">
                <span>{{scope.row.originalAmount}}</span><span :class="{'-p-green':scope.row.action ==1,'-p-red':scope.row.action ==-1}">
                <span v-if="scope.row.action==1">+</span>{{scope.row.amount}}</span>=<span>{{scope.row.originalAmount+scope.row.amount}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="" label="操作人" width="180" align="center">
              <template scope="scope">
                <span>{{formatUser(scope.row.operator)}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注" align="center">
              <template scope="scope">
                <el-popover trigger="hover" placement="bottom-start" width="250">
                  <p>{{ scope.row.remark === 'NULL!' ? '' : scope.row.remark}}</p>
                  <div slot="reference" class="">
                    <el-icon name="search" style="color:#108ee9"></el-icon>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
          <div style="text-align: right;margin:2rem 0">
            <el-pagination layout="prev, pager, next, sizes, jumper" :total="detailInfo.list.length"
                           :page-sizes="[5, 10]" :page-size="nowSize" @size-change="getNowsize" @current-change="getNowpage">
            </el-pagination>
          </div>
        </div>
      </div>

      <el-dialog :title="isSave ? '玩家存点' : '玩家提点'" :visible.sync="isOpenModal" size="tiny"
                 :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
        <el-form :model="balanceInfo">
          <el-form-item :label="isSave ? '存点数' : '提点数'" label-width="100px">
            <el-input v-model="balanceInfo.points" placeholder="请输入存点数" type="number" class="input"></el-input>
          </el-form-item>
          <el-form-item :label="isSave ? '起始账户' : '转入账户'" label-width="100px" >
              【代理】{{detailInfo.parentName}}
          </el-form-item>
          <el-form-item label="备注" label-width="100px" >
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
  </div>
</template>
<script type="text/ecmascript-6">
import { detailTime, formatUsername } from '@/behavior/format'
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
export default {
  beforeCreate () {
    this.$store.commit('returnLocalStorage')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'agentPlayerDetail'
    })
  },
  created () {},
  data () {
    return {
      nowSize: 5,
      nowPage: 1,
      radioInfo: '0',
      password: '',
      amountDate: '',
      allAmount: 0,
      editPassword: false,
      isOpenModal: false,
      isSending: false,
      isSave: false, // 是否是存点
      searchArray: [],
      playerStorage: [], // 搜索暂存数据
      account: [],
      balanceInfo: {},
      isShowRadio: false, // 切换数据来源
      isGetSearch: false, // 判断是否从搜索点入
      detailList: []
    }
  },
  computed: {
    playerDetailList () {
      return JSON.parse(JSON.stringify(this.$store.state.variable.playerDetail))
    },
    detailInfo () {
      if (!this.isShowRadio) {
        return this.playerDetailList
      } else {
        return this.detailList
      }
    },
    lastTime () {
      return detailTime(this.$store.state.variable.playerDetail.createAt)
    },
    dataList () {
      if (!this.isShowRadio) { // 主要是处理从组织架构跳转至玩家详细的逻辑
        if (this.nowPage === 1) {
          return this.playerDetailList.list.slice(0, this.nowSize)
        } else {
          return this.playerDetailList.list.slice(((this.nowPage - 1) * this.nowSize), this.nowSize * this.nowPage)
        }
      } else {
        if (this.nowPage === 1) {
          return this.detailList.list.slice(0, this.nowSize)
        } else {
          return this.detailList.list.slice(((this.nowPage - 1) * this.nowSize), this.nowSize * this.nowPage)
        }
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
    }, // 管理员姓名
    allAmountFun () {
      this.allAmount = 0
      if (!this.isShowRadio) {
        for (let item of this.playerDetailList.list) {
          if (item.amount < 0) {
            this.allAmount = item.amount + this.allAmount
          }
        }
      } else {
        for (let item of this.detailList.list) {
          if (item.amount < 0) {
            this.allAmount = item.amount + this.allAmount
          }
        }
      }
      return Math.abs(this.allAmount)
    }
  },
  methods: {
    formatUser (name) {
      if (name.indexOf('_') > -1) {
        return formatUsername(name)
      } else {
        return name
      }
    },
    getPlayerDetail () {
      this.amountDate = []
      this.$store.commit('startLoading')
      invoke({
        url: `${api.getPlayerDetail}?userName=${this.detailInfo.userName}`,
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
            this.detailList = res.data
          }
          this.$store.commit('closeLoading')
        }
      )
    },
    openModal (bool) {
      this.isSave = (bool === 0)
      this.isOpenModal = true
      this.balanceInfo = {
        userName: this.detailInfo.userName,
        parentName: this.detailInfo.parentName,
        remark: '',
        balance: this.detailInfo.balance,
        points: '',
        fromUserId: this.detailInfo.parent
      }
    },
    getAtime (row, col) {
      return detailTime(row.updateAt)
    }, // 格式化创建时间
    getNowsize (size) {
      this.nowSize = size
      console.log('当前每页:' + size)
    },
    getNowpage (page) {
      this.nowPage = page
      console.log('当前是第:' + page + '页')
    },
    changeRadio () {
      this.isShowRadio = true
      if (!this.isGetSearch) {
        this.amountDate = []
      }
      this.detailList = JSON.parse(JSON.stringify(this.$store.state.variable.playerDetail))
      this.amountDate = []
      if (this.radioInfo !== '0') {
        this.searchArray = []
        for (let item of this.detailList.list) {
          if (item.kindId === Number(this.radioInfo)) {
            this.searchArray.push(item)
          }
        }
        this.isGetSearch = false
        this.detailList.list = this.searchArray
      }
    },
    openPwdInput () {
      this.editPassword = !this.editPassword
      this.password = JSON.parse(JSON.stringify(this.detailInfo.password))
    },
    updatePwd () {
      let rex = new RegExp(/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,16}$/)
      if (!rex.exec(this.password)) {
        return this.$message.error('密码中必须包含6-16位由字母、数字、符号中至少两种组成')
      }
      this.$store.commit('startLoading')
      invoke({
        url: api.getPassWord,
        method: api.post,
        data: {
          userName: this.detailInfo.userName,
          password: this.password
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
            console.log(res)
            this.$message.success('修改成功')
            this.getPlayerDetail()
            this.editPassword = false
          }
        }
      )
    },
    submit () {
      var rex = new RegExp(/^[0-9]*[1-9][0-9]*$/)
      if (!this.isSave && (this.balanceInfo.points > this.detailInfo.balance)) {
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
            console.log(res)
            this.$message.success('提交成功')
            this.isSending = false
            this.isOpenModal = false
            this.getPlayerDetail()
          }
        }
      )
    },
    searchAmount () {
      const [startDate, endDate] = this.amountDate
      this.isShowRadio = true
      this.isGetSearch = true
      if (!this.amountDate.length) return this.$message.error('请选择时间段')
      this.detailList = JSON.parse(JSON.stringify(this.$store.state.variable.playerDetail))
      this.searchArray = []
      for (let item of this.detailList.list) {
        if (new Date(item.updateAt).setHours(0,0,0,0) >= new Date(startDate).getTime() &&
          (new Date(item.updateAt).setHours(0,0,0,0) <= new Date(endDate).getTime())) {
          this.searchArray.push(item)
        }
      }
      this.detailList.list = this.searchArray
    }
  }
}
</script>

<style scpoed>
  .my-title{text-align: center}
  h2{font-size: 2.5rem;color: #5a5a5a;padding-top: 2rem;}
  .baseinfo,
  .countinfo{padding: 0 2rem;margin: 0 auto;vertical-align: baseline;}

  .baseinfo-form,
  .countinfo-form{background-color: #f5f5f5;padding-left: 3%;font-size: 0.8rem; overflow: hidden}

  .baseinfo-form .-player-title{padding: 1rem 0;display: inline-block;height: 36px; line-height: 36px}
  .countinfo-form{padding: 2rem;}

  .countinfo-title{background-color: #f5f5f5;font-size: 1.1rem;padding: 2rem; overflow: hidden}
  .countinfo-center{background-color: #f5f5f5;font-size: 1.1rem;padding:0 2rem; overflow: hidden}
  .playerdetail .input{width: 80%}
  h4{font-size: 1.3rem;font-weight: normal;padding: 1.5rem 0;color: #5a5a5a}
  .justfy2{font-size: 1rem;padding-right: 1rem;}
  .-p-green{color: #00CC00}
  .-p-red{color: #FF3300}
</style>
