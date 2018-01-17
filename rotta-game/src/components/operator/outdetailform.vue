<template>
  <div class="outdetailform">
    <div class="simpleinfo">
      <h4>供应商基本信息</h4>
      <div class="simpleform">
        <el-row>
          <el-col :span="6">
            <span>供应商ID: {{gameDetail.companyId}}</span>
          </el-col>
          <el-col :span="6">
            <span>供应商标识: {{gameDetail.companyIden}}</span>
          </el-col>
          <el-col :span="6">
            <span>联系人: {{gameDetail.companyContact}}</span>
          </el-col>
           <el-col :span="6">
             <span>联系方式: {{gameDetail.companyContactWay}}</span>
           </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span>供应商Email: {{gameDetail.companyEmail}}</span>
          </el-col>
          <el-col :span="6">
            <span>供应商描述: {{gameDetail.companyDesc == 'NULL!' ? '暂无' : gameDetail.companyDesc}}</span>
          </el-col>
          <el-col :span="6">
            <span>供应商接入类型: {{companyTypeArray[gameDetail.companyType-1]}}</span>
          </el-col>
          <el-col :span="6" v-if="gameDetail.companyType == 1">
            <span>
              合同信息: <a style="text-decoration:none" :href=gameDetail.companyContract v-if="gameDetail.companyContract != 'NULL!'">下载</a>
              <a v-else>暂无</a>
            </span>
          </el-col>
          <el-col :span="6" v-else>
            <span>成数: {{gameDetail.companyRatio || 0}}%</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" v-if="gameDetail.companyType == 1">
            <span>执照信息: <img :src="gameDetail.license" style="width: 100% ;margin-top: 1rem" v-if="gameDetail.license != 'NULL!'">
              <a v-else>暂无</a>
            </span>
          </el-col>
          <el-col :span="6">
            <span>
              游戏类型:<span v-for="item in gameTypeList" :key="item">{{item}}</span> &emsp;
            </span>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { invoke } from '@/libs/fetchLib'
  import api from '@/api/api'
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
    return {
      optionsList: [],
      companyTypeArray:['A类（接入公司的游戏供应商）','B类（公司接入的游戏供应商）']
    }
  },
  created () {
    this.getGameTypeList()
  },
  computed: {
    gameDetail () {
      return this.$store.state.variable.gameDetailInfo
    },
    gameTypeList () {
      let array = []
      for (let item of this.optionsList) {
        for (let data of this.$store.state.variable.gameDetailInfo.gameTypeList){
          if(item.code == data){
            array.push(item.name)
            break
          }
        }
      }
      return array
    }
  },
  methods: {
    getGameTypeList () {
      this.$store.commit('startLoading')
      invoke({
        url: api.allGames,
        method: api.post
      })
        .then(res => {
        const [err, ret] = res
        if (err) {
          this.$message({
            message: err.msg,
            type: 'error'
          })
        } else {
          this.optionsList = ret.data.payload
      }
      this.$store.commit('closeLoading')
    })
    },
  }
}
</script>

<style scoped>
    .manangeform span,
    .simpleform{ background-color: #f5f5f5; padding: 1.5rem 2rem;color:#8e8e8e}
    .simpleform span{display: inline-block;padding: 10px;}
    h4{font-size: 1.8rem;font-weight: normal;padding: 2rem 0;color: #5a5a5a}
    .outdetailform{width: 98%; margin: 0 auto;  vertical-align: baseline;}
    .suc p{line-height: 5rem;font-size: 1.3rem}
</style>
