<template>
  <div class="outdetailform">
    <div class="simpleinfo">
      <h4>运营商基本信息</h4>
      <div class="simpleform">
        <el-row>
          <el-col :span="8">
            <span>运营商ID: {{gameDetail.companyId}}</span>
          </el-col>
          <el-col :span="8">
            <span>联系人: {{gameDetail.companyContact}}</span>
          </el-col>
           <el-col :span="8">
             <span>联系方式: {{gameDetail.companyContactWay}}</span>
           </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span>运营商Email: {{gameDetail.companyEmail}}</span>
          </el-col>
          <el-col :span="8">
            <span>运营商描述: {{gameDetail.companyDesc == 'NULL!' ? '暂无' : gameDetail.companyDesc}}</span>
          </el-col>
          <el-col :span="8">
            <span>
              合同信息: <a style="text-decoration:none" :href=gameDetail.companyContract v-if="gameDetail.companyContract != 'NULL!'">下载</a>
              <a v-else>暂无</a>
            </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span>执照信息: <img :src="gameDetail.license" style="width: 100% ;margin-top: 1rem" v-if="gameDetail.license != 'NULL!'">
              <a v-else>暂无</a>
            </span>
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
      data: 'operatorList'
    })
    this.$store.commit('returnLocalStorage')
  },
  data () {
    return {}
  },
  computed: {
    gameDetail () {
      return this.$store.state.variable.gameDetailInfo
    }
  },
  methods: {}
}
</script>

<style scoped>
    .manangeform span,
    .simpleform{ background-color: #f5f5f5; padding: 1.5rem 2rem;color:#8e8e8e}
    .simpleform span{display: inline-block;padding: 2rem 1.5rem 1.5rem 2rem;}
    h4{font-size: 1.8rem;font-weight: normal;padding: 2rem 0;color: #5a5a5a}
    .outdetailform{width: 98%; margin: 0 auto;  vertical-align: baseline;}
    .suc p{line-height: 5rem;font-size: 1.3rem}
</style>
