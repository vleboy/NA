<template>
  <div class="playerdetail">
    <div class="playdetailform">
      <div class="my-title">
        <h2>{{detailInfo.userName}}</h2>
      </div>
      <div class="baseinfo">
        <h4>基本信息</h4>
        <div class="baseinfo-form">
          <el-row>
            <el-col :span="4">
              <div class="-player-title">所属代理：{{detailInfo.merchantName}}</div>
            </el-col>
            <el-col :span="4">
              <div class="-player-title">用户名：{{detailInfo.userName}}</div>
            </el-col>
            <el-col :span="4">
              <div class="-player-title">昵称：{{detailInfo.nickname === 'NULL!' ? '无' : detailInfo.nickname}}</div>
            </el-col>
            <el-col :span="4">
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
            <el-col :span="4">
              <div class="-player-title">上次登录游戏时间：{{lastTime}}</div>
            </el-col>
          </el-row>
          <el-col :span="4" v-for="(item,index) of detailInfo.gameList" :key="index">
            <div class="-player-title">{{item.name+'洗码比'}}：{{item.mix}}%</div>
          </el-col>
        </div>
      </div>

      <div class="countinfo">
        <h4>消费信息</h4>
        <el-col :span="24" class="-c-top">
          <el-radio-group v-model="reportType">
            <el-radio-button label="1">流水报表</el-radio-button>
            <el-radio-button label="2">交易记录</el-radio-button>
          </el-radio-group>
        </el-col>
        <div class="countinfo-center">
          <playerRunningAccount ref="childMethod" v-if="reportType==1"></playerRunningAccount>
          <transactionRecord v-else :dataProp="playerDetailInfo"></transactionRecord>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { detailTime, formatUsername, thousandFormatter } from '@/behavior/format'
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
import playerRunningAccount from '@/components/player/playerRunningAccount'
import transactionRecord from '@/components/player/transactionRecord'

export default {
  components:{playerRunningAccount, transactionRecord},
  beforeCreate () {
    this.$store.commit('returnLocalStorage')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'agentPlayerDetail'
    })
  },
  activated: function () {
    this.$store.commit({
      type: 'recordNowindex',
      data: 'agentPlayerDetail'
    })
  },
  mounted () {
    this.getPlayerDetail()
  },
  data () {
    return {
      password: '',
      editPassword: false,
      isOpenModal: false,
      balanceInfo: {},
      playerDetailInfo: '',
      jumpUrl:[
        '/agentPlayerList',
        '/comlist',
        '/naAllGameReport',
        '/naVedioGameReport',
        '/naLiveGameReport',
        '/naArcadeGameReport',
        '/naMallReport',
        '/ttgVedioGameReport',
        '/comdetail',
        '/saLiveGameReport',
        '/allReport'
      ],
      reportType: '1'
    }
  },
  computed: {
    detailInfo () {
      return this.playerDetailInfo
    },
    lastTime () {
      return detailTime(this.playerDetailInfo.updateAt)
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
    getPlayerDetail () {
      if(this.isFetching) return
      this.isFetching = true
      let name = this.$store.state.variable.playerUserName || localStorage.playerName
      // this.$store.commit('startLoading')
      invoke({
        url: api.playerDetail,
        method: api.post,
        data:{
          userName: name
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
            this.playerDetailInfo = res.data.userInfo
            setTimeout(()=>{
              this.$refs.childMethod.jumpAccount()
            },0)
            this.reportType = 1
          }
          // this.$store.commit('closeLoading')
          this.isFetching = false
        }
      )
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
            // console.log(res)
            this.$message.success('修改成功')
            this.getPlayerDetail()
            this.editPassword = false
          }
          this.$store.commit('closeLoading')
        }
      )
    }
  },
  filters:{   //过滤器，所有数字保留两位小数
    currency(value){
      return (value-0).toFixed(2);
    }
  },
  watch: {
    '$route': function (_new, _old) {
      for (let item of this.jumpUrl) {
        if((item === _old.fullPath) && (localStorage.playerName != this.playerDetailInfo.userName)) {
          this.getPlayerDetail()
          break
        }
      }
    }
  }
}
</script>

<style scpoed>
  .playerdetail .my-title{text-align: center}
  h2{font-size: 2.5rem;color: #5a5a5a;padding-top: 2rem;}
  .playerdetail .baseinfo, .countinfo{padding: 0 2rem;margin: 0 auto;vertical-align: baseline;overflow: auto;}

  .playerdetail .baseinfo-form {background-color: #f5f5f5;overflow: auto;padding-left: 2rem}
  .playerdetail .baseinfo-form .-player-title{padding: 10px 0;display: inline-block;height: 25px; line-height: 25px}

  .playerdetail .countinfo-center{background-color: #f5f5f5;font-size: 1.1rem;padding:2rem 2rem 0 2rem; overflow: hidden}
  .playerdetail .-c-top{ background-color: #f5f5f5; padding: 2rem 2rem 0 2rem}
  .playerdetail .input{width: 80%}
  .playerdetail h4{font-size: 1.3rem;font-weight: normal;padding: 1.5rem 0;color: #5a5a5a}
  .-p-green{color: #00CC00}
  .-p-red{color: #FF3300}
  .playerdetail .el-dialog--small{
    width: 940px;
  }
</style>
