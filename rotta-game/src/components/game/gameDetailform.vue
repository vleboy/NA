<template>
  <div class="outdetailform">
    <div class="simpleinfo">
      <h4>基本信息</h4>
      <div class="simpleform">
        <el-row>
          <el-col :span="8">
            <span>所属类型: {{gameDetail.gameType}}</span>
          </el-col>
          <el-col :span="8">
            <span>所属运营商: {{gameDetail.company.companyName}}</span>
          </el-col>
          <el-col :span="8">
            <span>游戏服务器: {{gameDetail.ip}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span style="word-break: break-all">游戏简介: {{ gameDetail.gameRecommend == 'NULL!' ? '' : gameDetail.gameRecommend}}</span>
          </el-col>
          <el-col :span="8">
            <span>游戏LOGO: <img style="width: 100%;margin-top: 1rem" :src="gameDetail.gameImg"></span>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'outdetailform',
  beforeCreate () {
    this.$store.commit({
      type: 'recordNowindex',
      data: 'gameList'
    })
    // console.log(localStorage)
    this.$store.commit('returnLocalStorage')
  },
  data () {
    return {
      gameTypeList: ['棋牌游戏', '电子游戏', '真人视讯']
    }
  },
  computed: {
    gameDetail () {
      return this.$store.state.variable.gameReadyDetailInfo
    }
  },
  methods: {

  }
}
</script>

<style scoped>
    .manangeform span,
    .simpleform{ background-color: #f5f5f5; padding: 1.5rem 2rem;color: #8e8e8e}
    .simpleform span{display: inline-block;padding: 2rem 1.5rem 1.5rem 2rem;}
    h4{font-size: 1.8rem;font-weight: normal;padding: 2rem 0;color: #5a5a5a}
    .outdetailform{width: 98%; margin: 0 auto;  vertical-align: baseline;}
    .suc p{line-height: 5rem;font-size: 1.3rem}
</style>
