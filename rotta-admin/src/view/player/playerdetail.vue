$<template>
  <div class="playerdetail">
    <div class="playdetailform">
      <div class="my-title">
        <h2>{{userName}}</h2>
      </div>
      <div class="baseinfo">
        <h4>基本信息</h4>
        <div class="baseinfo-form">
          <el-col :span="4"><span class="-span-base">所属商户：{{detailInfo.merchantName}}</span></el-col>
          <el-col :span="4"><span class="-span-base">线路号：{{detailInfo.msn}}</span></el-col>
          <el-col :span="4"><span class="-span-base">上次登录游戏时间：{{lastTime}}</span></el-col>
          <el-col :span="4" v-for="(item,index) of detailInfo.gameList" :key="index">
            <span class="-span-base">{{item.name+'洗码比'}}：{{item.mix}}%</span>
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
          <transactionRecord v-else></transactionRecord>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { detailTime, formatUserName, thousandFormatter } from '@/behavior/format'
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
      data: 'playerdetail'
    })
  },
  activated: function () {
    this.$store.commit({
      type: 'recordNowindex',
      data: 'playerdetail'
    })
  },
  data () {
    return {
      playerDetailInfo: '',
      jumpUrl:[
        '/playerlist',
        '/naAllGameReport',
        '/naVedioGameReport',
        '/naLiveGameReport',
        '/naArcadeGameReport',
        '/naMallReport',
        '/ttgVedioGameReport',
        '/saLiveGameReport',
        '/allReport'
      ],
      reportType: '1'
    }
  },
  mounted () {
    this.getPlayerDetail()
  },
  computed: {
    detailInfo () {
      return this.playerDetailInfo
    },
    lastTime () {
      return detailTime(this.playerDetailInfo.updateAt)
    },
    userName () {
      return formatUserName(this.playerDetailInfo.userName || this.$store.state.variable.playerUserName || localStorage.playerName)
    }
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
  .playerdetail .baseinfo, .countinfo{padding: 0 2rem;margin: 0 auto;vertical-align: baseline;}

  .playerdetail .baseinfo-form, .countinfo-form{background-color: #f5f5f5;padding-left: 2rem;font-size: 0.8rem;overflow: hidden}

  .playerdetail .baseinfo-form .-span-base{display: inline-block;padding: 10px 0; height: 25px; line-height: 25px}

  .playerdetail .countinfo-center{background-color: #f5f5f5;font-size: 1.1rem;padding:2rem 2rem 0 2rem; overflow: hidden}
  .playerdetail .-c-top{ background-color: #f5f5f5; padding: 2rem 2rem 0 2rem}
  .playerdetail h4{font-size: 1.3rem;font-weight: normal;padding: 1.5rem 0;color: #5a5a5a}
  .-p-green{color: #00CC00}
  .-p-red{color: #FF3300}
  .playerdetail .el-dialog--small{
    width: 940px;
  }
</style>
