<template>
  <div class="p-prize-config">
    <div class="-p-c-form -p-c-text">
      <h2 class="-p-c-title">神秘大奖奖品配置</h2>
      <el-row>
        <el-col :span="12">配置生效时机：本次派奖后生效</el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="-p-c-height">上次派奖时间：2013年12月12日14：23：21</el-col>
        <el-col :span="12" >当前奖池金额：20121.11&emsp;<el-button type="text">刷新</el-button></el-col>
      </el-row>
    </div>
    <el-form :model="managerInfo" :rules="rules" ref="managerInfo" class="-p-c-form" label-width="150px"
             label-position="right">
      <el-form-item label="真人杀数（%）" prop="gameName">
        <el-input v-model="managerInfo.gameName" class="input" type="text" placeholder="范围在0.00~100.00之间"></el-input>
      </el-form-item>
      <el-form-item label="老虎机杀人数（%）" prop="gameRecommend">
        <el-input v-model="managerInfo.gameRecommend" class="input" placeholder="范围在0.00~100.00之间"></el-input>
      </el-form-item>
      <el-form-item label="街机杀数（%）" prop="kindId">
        <el-input v-model="managerInfo.kindId" class="input" placeholder="范围在0.00~100.00之间" type="number" ></el-input>
      </el-form-item>
      <el-form-item label="平均放线点数（%）" prop="ip">
        <el-input v-model="managerInfo.ip" class="input" placeholder="范围在0.00~100.00之间"></el-input>
      </el-form-item>
      <el-form-item label="派奖比例（%）" prop="ip">
        <el-input v-model="managerInfo.ip" class="input" placeholder="范围在0.00~100.00之间"></el-input>
      </el-form-item>
      <el-form-item label="大奖池开始掉落额度" prop="ip">
        <el-input v-model="managerInfo.ip" class="input" placeholder="范围在1.00~1000,000,000.00之间"></el-input>
      </el-form-item>
      <el-form-item label="大奖池额度上限" prop="ip">
        <el-input v-model="managerInfo.ip" class="input" placeholder="范围在1.00~1000,000,000.00之间"></el-input>
      </el-form-item>
      <el-form-item label="大奖池通知下限" prop="ip">
        <el-input v-model="managerInfo.ip" class="input" placeholder="范围在1.00~1000,000,000.00之间"></el-input>
      </el-form-item>
      <el-form-item label="大奖池通知时间间隔" prop="port">
        <el-input v-model="managerInfo.port" class="input" type="number" placeholder="时间间隔为5s~1000,000s"></el-input>
      </el-form-item>
      <el-form-item label="玩家抽奖修正值" prop="port">
        <el-input v-model="managerInfo.port" class="input" type="number" placeholder="范围在0.00~1000，000.00之间"></el-input>
      </el-form-item>
      <el-form-item label="本次开奖通知内容" prop="port">
        <el-input v-model="managerInfo.port" class="input"  type="textarea" placeholder="通知内容为1-255字符（必填）" :maxlength='255'></el-input>
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
      var validateGameName = (rule, value, callback) => {
//        var regName = new RegExp(/^[\u4E00-\u9FA5A-Za-z0-9_]+$/)
        if (value === '') {
          callback(new Error('请输入真人杀数'))
          this.isfinish.gameName = false
        } else if (!pattern.digitalRange.exec(value)) {
          callback(new Error('真人杀数比只能为0.00 - 100.00之间'))
          this.isfinish.gameName = false
        } else {
          callback()
          this.isfinish.gameName = true
        }
      } // 游戏名称
      var validateGameType = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择游戏类别'))
        } else {
          callback()
          this.isfinish.gameType = true
        }
      } // 分类
      var validateCompany = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择所属运营商'))
          this.isfinish.company = false
        } else {
          callback()
          this.isfinish.company = true
        }
      } // 运营商
      var validateGameRecommend = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入游戏简介'))
          this.isfinish.gameRecommend = false
        } else if (value.length < 2) {
          callback(new Error('必须为两位数'))
          this.isfinish.gameRecommend = false
        } else {
          callback()
          this.isfinish.gameRecommend = true
        }
      } // 游戏简介
      var validateIp = (rule, value, callback) => {
        var ip = new RegExp(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/)
        if (value === '') {
          callback(new Error('请输入服务器'))
          this.isfinish.ip = false
        } else if (!ip.exec(value)) {
          callback(new Error('请输入正确的服务器格式'))
          this.isfinish.ip = false
        } else {
          callback()
          this.isfinish.ip = true
        }
      } // 服务器
      var validatePort = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入端口'))
          this.isfinish.port = false
        } else if (value < 1 || value > 65535) {
          callback(new Error('端口必须小于65535，大于1'))
          this.isfinish.port = false
        } else {
          callback()
          this.isfinish.port = true
        }
      } // 端口
      var validateKindId = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入KindId'))
          this.isfinish.kindId = false
        } else if (value < 0) {
          callback(new Error('必须为正数'))
          this.isfinish.kindId = false
        } else if (value.length !== 5) {
          callback(new Error('必须为五位数'))
          this.isfinish.kindId = false
        } else {
          callback()
          this.isfinish.kindId = true
        }
      } // 端口
      return {
        isfinish: {
          gameName: false,
          gameType: false,
          company: false,
          port: false,
          ip: false,
          kindId: false,
          gameRecommend: false
        },
        managerInfo: {
          gameName: '', // 名称
          gameType: '', // 类别
          company: '', // 运营商
          port: '', // 端口
          ip: '', // 服务器
          kindId: '', // kindId
          gameRecommend: '', // 简介
          gameImg: '' // 游戏logo
        }, // 创建列表
        rules: {
          gameName: [
            {validator: validateGameName, trigger: 'blur'}
          ],
          gameRecommend: [
            {validator: validateGameRecommend, trigger: 'blur'}
          ],
          gameType: [
            {validator: validateGameType, trigger: 'blur'}
          ],
          company: [
            {validator: validateCompany, trigger: 'blur'}
          ],
          port: [
            {validator: validatePort, trigger: 'blur'}
          ],
          ip: [
            {validator: validateIp, trigger: 'blur'}
          ],
          kindId: [
            {validator: validateKindId, trigger: 'blur'}
          ]
        }, // 列表验证规则
        options: [],
        fileList: [],
        uploadAction: '',
        imgFile:{},
        form: {
          key: '',
          token: ''
        },
        dialogLoading: false
      }
    },
    computed: {
      companyOptions () {
        return this.$store.state.variable.operatorList
      }
    },
    methods: {
      postCreateform () {
        if (!this.isfinish.gameName || !this.managerInfo.gameType || !this.managerInfo.company ||
          !this.isfinish.port || !this.isfinish.ip || !this.isfinish.gameRecommend || !this.isfinish.kindId || !this.managerInfo.gameImg) {
          this.$message({
            message: '请完善创建信息',
            type: 'error'
          })
        } else {
          this.$store.commit('startLoading')
          this.$store.state.variable.operatorList.forEach((item) => {
            if (item.companyName === this.managerInfo.company) {
              this.managerInfo.company = item
            }
          })
          invoke({
            url: api.addGame,
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
              this.$store.commit({
                type: 'getSuccessGame',
                data: res.data.payload
              })
              this.$store.commit('changeSteps')
            }
            this.$store.commit('closeLoading')
          })
        }
      },
      resetData () {
        this.managerInfo = {
          gameName: '', // 名称
          gameType: '', // 类别
          company: '', // 运营商
          port: '', // 端口
          ip: '', // 服务器
          gameRecommend: '', // 简介
          gameImg: '' // 图片上传 （暂不实现）
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
