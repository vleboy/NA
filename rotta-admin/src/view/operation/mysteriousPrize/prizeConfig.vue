<template>
  <div class="p-prize-config">
    <div class="-p-c-form -p-c-text">
      <h2 class="-p-c-title">神秘大奖奖品配置</h2>
      <el-row>
        <el-col :span="12">配置生效时机：本次派奖后生效</el-col>
      </el-row>
      <!--<el-row>-->
        <!--<el-col :span="12" class="-p-c-height">上次派奖时间：2013年12月12日14：23：21</el-col>-->
        <!--<el-col :span="12" >当前奖池金额：20121.11&emsp;<el-button type="text">刷新</el-button></el-col>-->
      <!--</el-row>-->
    </div>
    <el-form :model="managerInfo" :rules="rules" ref="managerInfo" class="-p-c-form" label-width="150px"
             label-position="right">
      <el-form-item label="真人杀数（%）" prop="livekill">
        <el-input v-model="managerInfo.livekill" class="input" type="text" placeholder="范围在0.00~100.00之间"></el-input>
      </el-form-item>
      <el-form-item label="老虎机杀数（%）" prop="videokill">
        <el-input v-model="managerInfo.videokill" class="input" placeholder="范围在0.00~100.00之间"></el-input>
      </el-form-item>
      <el-form-item label="街机杀数（%）" prop="arcadekill">
        <el-input v-model="managerInfo.arcadekill" class="input" placeholder="范围在0.00~100.00之间" type="number" ></el-input>
      </el-form-item>
      <el-form-item label="平均放线点数（%）" prop="avgLinePoint">
        <el-input v-model="managerInfo.avgLinePoint" class="input" placeholder="范围在0.00~100.00之间"></el-input>
      </el-form-item>
      <el-form-item label="派奖比例（%）" prop="awardPercent">
        <el-input v-model="managerInfo.awardPercent" class="input" placeholder="范围在0.00~100.00之间"></el-input>
      </el-form-item>
      <el-form-item label="大奖池开始掉落额度" prop="beginLimit">
        <el-input v-model="managerInfo.beginLimit" class="input" placeholder="范围在1.00~1000,000,000.00之间"></el-input>
      </el-form-item>
      <el-form-item label="大奖池额度上限" prop="upLimit">
        <el-input v-model="managerInfo.upLimit" class="input" placeholder="范围在1.00~1000,000,000.00之间"></el-input>
      </el-form-item>
      <el-form-item label="大奖池通知下限" prop="notifyLower">
        <el-input v-model="managerInfo.notifyLower" class="input" placeholder="范围在1.00~1000,000,000.00之间"></el-input>
      </el-form-item>
      <el-form-item label="大奖池通知时间间隔" prop="notifyInterval">
        <el-input v-model="managerInfo.notifyInterval" class="input" type="number" placeholder="时间间隔为5s~1000,000s"></el-input>
      </el-form-item>
      <el-form-item label="玩家抽奖修正值" prop="correctValue">
        <el-input v-model="managerInfo.correctValue" class="input" type="number" placeholder="范围在1.00~10000.00之间"></el-input>
      </el-form-item>
      <el-form-item label="本次开奖通知内容" prop="notifyContent">
        <el-input v-model="managerInfo.notifyContent" class="input"  type="textarea" placeholder="通知内容为1-255字符（必填）" :maxlength='255'></el-input>
      </el-form-item>
    </el-form>
    <div class="g-text-center -p-c-form">
      <el-button type="primary" class="nextBtn" @click="postCreateform" style="margin-left: 120px">确定</el-button>
      <el-button @click="resetData">重置</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { invoke } from '@/libs/fetchLib'
  import { pattern } from '@/behavior/regexp'
  import api from '@/api/api'
  export default {
    beforeCreate () {
      this.$store.commit('returnLocalStorage')
      this.$store.commit({
        type: 'recordNowindex',
        data: 'prizeConfig'
      })
    },
    data () {
      var validateLivekill = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入真人杀数'))
          this.isfinish.livekill = false
        } else if (!pattern.digitalRange.exec(value)) {
          callback(new Error('真人杀数比只能为0.00 - 100.00之间'))
          this.isfinish.livekill = false
        } else {
          callback()
          this.isfinish.livekill = true
        }
      } // 真人杀数
      var validateVideokill = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入老虎机杀数'))
          this.isfinish.videokill = false
        } else if (!pattern.digitalRange.exec(value)) {
          callback(new Error('老虎机杀数比只能为0.00 - 100.00之间'))
          this.isfinish.videokill = false
        } else {
          callback()
          this.isfinish.videokill = true
        }
      } // 老虎机杀数
      var validateArcadekill = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入街机杀数'))
          this.isfinish.arcadekill = false
        } else if (!pattern.digitalRange.exec(value)) {
          callback(new Error('街机杀数比只能为0.00 - 100.00之间'))
          this.isfinish.arcadekill = false
        } else {
          callback()
          this.isfinish.arcadekill = true
        }
      } // 街机杀数
      var validateAvgLinePoint = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入平均放线点数'))
          this.isfinish.avgLinePoint = false
        } else if (!pattern.digitalRange.exec(value)) {
          callback(new Error('平均放线点数比只能为0.00 - 100.00之间'))
          this.isfinish.avgLinePoint = false
        } else {
          callback()
          this.isfinish.avgLinePoint = true
        }
      } // 平均放线点数
      var validateAwardPercent = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入派奖比例'))
          this.isfinish.awardPercent = false
        } else if (!pattern.digitalRange.exec(value)) {
          callback(new Error('派奖比例比只能为0.00 - 100.00之间'))
          this.isfinish.awardPercent = false
        } else {
          callback()
          this.isfinish.awardPercent = true
        }
      } // 派奖比例
      var validateBeginLimit = (rule, value, callback) => {
        var ip = new RegExp(/^\d+(\.\d{1,2})?$/)
        if (value === '') {
          callback(new Error('请输入大奖池开始掉落额度'))
          this.isfinish.beginLimit = false
        } else if (!ip.exec(value) || this.managerInfo.beginLimit>1000000000 ||  this.managerInfo.beginLimit<1) {
          callback(new Error('大奖池开始掉落额度比只能为1.00~1000000000.00之间'))
          this.isfinish.beginLimit = false
        } else {
          callback()
          this.isfinish.beginLimit = true
        }
      } // 大奖池开始掉落额度
      var validateUpLimit = (rule, value, callback) => {
        var ip = new RegExp(/^\d+(\.\d{1,2})?$/)
        if (value === '') {
          callback(new Error('请输入大奖池额度上限'))
          this.isfinish.upLimit = false
        } else if (!ip.exec(value) || this.managerInfo.upLimit>1000000000 || this.managerInfo.upLimit<1) {
          callback(new Error('大奖池额度上限比只能为1.00~1000000000.00之间'))
          this.isfinish.upLimit = false
        } else {
          callback()
          this.isfinish.upLimit = true
        }
      } // 大奖池额度上限
      var validateNotifyInterval = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入大奖池通知时间间隔'))
          this.isfinish.notifyInterval = false
        } else if (!pattern.positiveInteger.exec(value) || this.managerInfo.notifyInterval<5 || this.managerInfo.notifyInterval>1000000) {
          callback(new Error('大奖池通知时间间隔比只能为5s~1000000s'))
          this.isfinish.notifyInterval = false
        } else {
          callback()
          this.isfinish.notifyInterval = true
        }
      } // 大奖池通知时间间隔
      var validateCorrectValue = (rule, value, callback) => {
        var ip = new RegExp(/^\d+(\.\d{1,2})?$/)
        if (value === '') {
          callback(new Error('请输入玩家抽奖修正值'))
          this.isfinish.correctValue = false
        } else if (!ip.exec(value) || this.managerInfo.correctValue>10000 || this.managerInfo.correctValue<1) {
          callback(new Error('玩家抽奖修正值比只能为1.00~10000.00之间'))
          this.isfinish.correctValue = false
        } else {
          callback()
          this.isfinish.correctValue = true
        }
      } // 玩家抽奖修正值
      var validateNotifyLower = (rule, value, callback) => {
        var ip = new RegExp(/^\d+(\.\d{1,2})?$/)
        if (value === '') {
          callback(new Error('请输入大奖池通知下限'))
          this.isfinish.notifyLower = false
        } else if (!ip.exec(value) || this.managerInfo.notifyLower>1000000000 || this.managerInfo.notifyLower<1) {
          callback(new Error('大奖池通知下限比只能为1.00~1000000000.00之间'))
          this.isfinish.notifyLower = false
        } else {
          callback()
          this.isfinish.notifyLower = true
        }
      } // 大奖池通知下限
      var validateNotifyContent = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入本次开奖通知内容'))
          this.isfinish.notifyContent = false
        } else {
          callback()
          this.isfinish.notifyContent = true
        }
      } // 本次开奖通知内容
      return {
        isfinish: {
          livekill: false,
          videokill: false,
          arcadekill: false,
          avgLinePoint: false,
          awardPercent: false,
          beginLimit: false,
          upLimit: false,
          notifyInterval: false,
          correctValue: false,
          notifyLower: false,
          notifyContent: false
        },
        managerInfo: {
          livekill: '', // 真人杀数
          videokill: '', // 老虎机杀数
          arcadekill: '', // 街机杀数
          avgLinePoint: '', // 平均放线点数
          awardPercent: '', // 派奖比例
          beginLimit: '', // 大奖池开始掉落额度
          upLimit: '', // 大奖池额度上限
          notifyInterval: '', // 大奖池通知时间间隔
          correctValue: '', // 玩家抽奖修正值
          notifyLower: '', // 大奖池通知下限
          notifyContent: '', // 本次开奖通知内容
          code: 'mystery'
        }, // 创建列表
        rules: {
          livekill: [
            {validator: validateLivekill, trigger: 'blur'}
          ],
          videokill: [
            {validator: validateVideokill, trigger: 'blur'}
          ],
          arcadekill: [
            {validator: validateArcadekill, trigger: 'blur'}
          ],
          avgLinePoint: [
            {validator: validateAvgLinePoint, trigger: 'blur'}
          ],
          awardPercent: [
            {validator: validateAwardPercent, trigger: 'blur'}
          ],
          beginLimit: [
            {validator: validateBeginLimit, trigger: 'blur'}
          ],
          upLimit: [
            {validator: validateUpLimit, trigger: 'blur'}
          ],
          notifyInterval: [
            {validator: validateNotifyInterval, trigger: 'blur'}
          ],
          correctValue: [
            {validator: validateCorrectValue, trigger: 'blur'}
          ],
          notifyLower: [
            {validator: validateNotifyLower, trigger: 'blur'}
          ],
          notifyContent: [
            {validator: validateNotifyContent, trigger: 'blur'}
          ]
        } // 列表验证规则
      }
    },
    created () {
      this.getPrizeConfig()
    },
    methods: {
      postCreateform () {
        if (!this.isfinish.livekill || !this.isfinish.videokill || !this.isfinish.arcadekill ||
          !this.isfinish.avgLinePoint || !this.isfinish.awardPercent || !this.isfinish.beginLimit ||
          !this.isfinish.upLimit || !this.isfinish.notifyInterval || !this.isfinish.correctValue ||
          !this.isfinish.notifyLower || !this.isfinish.notifyContent) {
          this.$message({
            message: '请完善配置信息',
            type: 'error'
          })
        } else {
          this.$store.commit('startLoading')

          invoke({
            url: api.configNew,
            method: api.post,
            data: this.managerInfo
          }).then((data) => {
            let [err, res] = data
            if (err) {
              this.$message({
                message: err.msg,
                type: 'error'
              })
            } else if (res) {
              this.$message({
                message: '神秘大奖配置成功',
                type: 'success'
              })
              this.$router.push('prizePlayerList')
            }
            this.$store.commit('closeLoading')
          })
        }
      },
      getPrizeConfig () {
        this.$store.commit('startLoading')
        invoke({
          url: api.configOne,
          method: api.post,
          data: {
            code: "mystery"
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
              if(res.data.payload) {
                this.managerInfo = res.data.payload
                this.isfinish = {
                  livekill: true,
                  videokill: true,
                  arcadekill: true,
                  avgLinePoint: true,
                  awardPercent: true,
                  beginLimit: true,
                  upLimit: true,
                  notifyInterval: true,
                  correctValue: true,
                  notifyLower: true,
                  notifyContent: true
                }
              }
            }
            this.$store.commit('closeLoading')
          }
        )
      },
      resetData () {
        this.isfinish = {
          livekill: false,
          videokill: false,
          arcadekill: false,
          avgLinePoint: false,
          awardPercent: false,
          beginLimit: false,
          upLimit: false,
          notifyInterval: false,
          correctValue: false,
          notifyLower: false,
          notifyContent: false
        }
        this.managerInfo= {
          livekill: '', // 真人杀数
          videokill: '', // 老虎机杀数
          arcadekill: '', // 街机杀数
          avgLinePoint: '', // 平均放线点数
          awardPercent: '', // 派奖比例
          beginLimit: '', // 大奖池开始掉落额度
          upLimit: '', // 大奖池额度上限
          notifyInterval: '', // 大奖池通知时间间隔
          correctValue: '', // 玩家抽奖修正值
          notifyLower: '', // 大奖池通知下限
          notifyContent: '', // 本次开奖通知内容
          code: 'mystery'
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  /*创建代理商列表*/
  .p-prize-config{
    margin-bottom: 4rem;
    .-p-c-title{
      font-weight: normal;
      color: #5a5a5a;
      margin-bottom: 10px;
    }
    .-p-c-form{
      width:52.5rem;
      margin: 0 auto;

      .input{
        width: 100%;
      }
    }

    .-p-c-text{
      width: 46rem;
      overflow: hidden;
      font-weight: bold;
    }
    .-p-c-height{
      height: 34px;
      line-height: 34px;
    }
  }




</style>
