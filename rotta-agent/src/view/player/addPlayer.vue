<template>
  <div class="-player-add">
    <div class="addmanager">
      <h2>创建玩家</h2>
      <div class="-player-form">
        <el-form :model="playerInfo" ref="addPlayer" label-width="160px" label-position="right" :rules="rules">
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="playerInfo.userName" class="input" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="userPwd">
            <div style="position: relative">
              <el-input v-model="playerInfo.userPwd" class="input" placeholder="请输入"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="直属上级">
            <el-select v-model="playerInfo.parentId" placeholder="请选择上级代理商" clearable style="width: 100%" @change="changeList">
              <el-option v-for="(item, index) in childrenList" :key="index" :label="item.displayName" :value="item.userId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电子游戏洗码比（%）" prop="liveMix">
            <el-tooltip effect="dark" :content="parentLivemix" placement="right">
              <el-input v-model="playerInfo.liveMix" class="input" placeholder="请输入" :disabled="playerInfo.parentId==''"></el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="真人游戏洗码比（%）" prop="vedioMix">
            <el-tooltip effect="dark" :content="parentVediomix" placement="right">
              <el-input v-model="playerInfo.vedioMix" class="input" placeholder="请输入" :disabled="playerInfo.parentId==''"></el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="分配点数" prop="points">
            <el-tooltip effect="dark" :content="parentPoints" placement="right">
              <el-input v-model="playerInfo.points" class="input" placeholder="请输入" :disabled="playerInfo.parentId==''"></el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="playerInfo.remark" class="input" type="textarea" :rows="4" auto-complete="off"
                      placeholder="请输入" :maxlength="200"></el-input>
          </el-form-item>
          <el-form-item>
            <div style="text-align: center">
              <el-button type="primary" class="subBtn" @click="registAdmin"> 创建玩家</el-button>
              <el-button type="primary" class="subBtn" @click="resetAdmin"> 重置</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {invoke} from '@/libs/fetchLib'
  import api from '@/api/api'
  export default {
    beforeCreate () {
      this.$store.commit({
        type: 'recordNowindex',
        data: 'addPlayer'
      })
      this.$store.commit('returnLocalStorage')
    },
    created () {
      this.getChildrenList()
    },
    mounted () {},
    data () {
      let checkUserName = (rule, value, callback) => {
        var regName = new RegExp(/^[\u4E00-\u9FA5A-Za-z0-9_]+$/)
        if (value === '') {
          callback(new Error('请输入用户名名称'))
          this.status.isCheckUserName = false
        } else if (!regName.exec(value)) {
          callback(new Error('请输入中英文或者数字'))
          this.status.isCheckUserName = false
        } else if (value.length < 6 || value.length > 16) {
          callback(new Error('用户名为6-16位字符'))
          this.status.isCheckUserName = false
        } else {
          callback()
          this.status.isCheckUserName = true
        }
      } // 用户名
      let checkPassWord = (rule, value, callback) => {
        var regName = new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/)
        if (value === '') {
          callback(new Error('请输入密码'))
          this.status.isCheckPwd = false
        } else if (!regName.exec(value)) {
          callback(new Error('密码由6-16字母和数字组成'))
          this.status.isCheckPwd = false
        } else {
          callback()
          this.status.isCheckPwd = true
        }
      } // 密码
      let checkPoints = (rule, value, callback) => {
        var regName = new RegExp(/^([1-9]\d*|[0]{1,1})$/)
        if (!value) {
          callback(new Error('请输入要分配的点数'))
          this.status.isCheckPoints = false
        } else if (!regName.exec(value)) {
          callback(new Error(`请输入 0 ~ ${this.mixInfo.points} (所选上级余额) 之间的正整数`))
          this.status.isCheckPoints = false
        } else if (value > this.mixInfo.points) {
          callback(new Error(`上级代理可分配点数为${this.mixInfo.points} 已超出最大可分配点数`))
          this.status.isCheckPoints = false
        } else {
          callback()
          this.status.isCheckPoints = true
        }
      } // 分配点数
      let checkLiveMix = (rule, value, callback) => {
        let numReg = new RegExp(/^(\d{1,2}(\.\d{1,2})?|100(\.0{1,2})?)$/)
        if (value === '') {
          callback(new Error('请输入电子游戏洗码比'))
          this.status.isCheckLiveMix = false
        } else if (value < 0 || value > this.mixInfo.liveMix) {
          callback(new Error(`该上级电子游戏洗码比为${this.mixInfo.liveMix}% 已超出上级洗码比`))
          this.status.isCheckLiveMix = false
        } else if (!numReg.exec(value)) {
          callback(new Error(`洗码比因在 0.00 ~ 1.00 之间`))
          this.status.isCheckLiveMix = false
        } else {
          callback()
          this.status.isCheckLiveMix = true
        }
      } // 电子游戏洗马币
      let checkVedioMix = (rule, value, callback) => {
        let numReg = new RegExp(/^(\d{1,2}(\.\d{1,2})?|100(\.0{1,2})?)$/)
        if (value === '') {
          callback(new Error('请输入真人游戏洗码比'))
          this.status.isCheckVedioMix = false
        } else if (!numReg.exec(value)) {
          callback(new Error(`洗码比因在 0.00 ~ 1.00 之间`))
          this.status.isCheckVedioMix = false
        } else if (value < 0 || value > this.mixInfo.vedioMix) {
          callback(new Error(`该上级真人游戏洗码比为${this.mixInfo.vedioMix}% 已超出上级洗码比`))
          this.status.isCheckVedioMix = false
        } else {
          callback()
          this.status.isCheckVedioMix = true
        }
      } // 真人游戏洗马币

      return {
        playerInfo: {
          userName: '',
          userPwd: '',
          points: '',
          vedioMix: '',
          liveMix: '',
          parentId: '',
          remark: ''
        },
        childrenList: [],
        mixInfo: {},
        status: {
          isCheckUserName: false,
          isCheckPwd: false,
          isCheckPoints: false,
          isCheckLiveMix: false,
          isCheckVedioMix: false,
          isSending: false
        },
        rules: {
          userName: [
            {validator: checkUserName, trigger: 'blur'}
          ],
          userPwd: [
            {validator: checkPassWord, trigger: 'blur'}
          ],
          points: [
            {validator: checkPoints, trigger: 'blur'}
          ],
          liveMix: [
            {validator: checkLiveMix, trigger: 'blur'}
          ],
          vedioMix: [
            {validator: checkVedioMix, trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      parentPoints () {
        return `上级代理可分配点数为:${this.mixInfo.points || 0}`
      },
      parentLivemix () {
        return `上级代理电子游戏洗码比为:${this.mixInfo.liveMix || 0}%`
      },
      parentVediomix () {
        return `上级代理真人游戏洗码比为:${this.mixInfo.vedioMix || 0}%`
      }
    },
    methods: {
      getChildrenList () {
        this.$store.commit('startLoading')
        invoke({
          url: api.getChildrenList,
          method: api.post
        }).then(
          result => {
            const [err, ret] = result
            if (err) {
              this.$message({
                message: err.msg,
                type: 'error'
              })
            } else {
              this.childrenList = ret.data.list
              this.playerInfo.parentId = this.$store.state.variable.nowParent || ''
            }
          }
        )
        this.$store.commit('closeLoading')
      },
      changeList () {
        this.playerInfo.vedioMix = ''
        this.playerInfo.liveMix = ''
        for (let item of this.childrenList) {
          if (item.userId === this.playerInfo.parentId) {
            this.mixInfo = item
          }
        }
      },
      registAdmin () {
        if (!this.status.isCheckUserName || !this.status.isCheckPwd || !this.status.isCheckPoints ||
          !this.status.isCheckLiveMix || !this.status.isCheckVedioMix) {
          return this.$message.error('请完善配置信息')
        } else if (!this.playerInfo.parentId) {
          return this.$message.error('请选择直属上级')
        }
        this.$store.commit('startLoading')
        if (this.status.isSending) return
        this.status.isSending = true
        invoke({
          url: api.addPlayer,
          method: api.post,
          data: this.playerInfo
        }).then(
          result => {
            const [err, ret] = result
            if (err) {
              this.$message({
                message: err.msg,
                type: 'error'
              })
              this.status.isSending = false
            } else {
              var data = ret.payload
              // console.log(data)
              this.$message({
                message: '创建成功',
                type: 'success'
              })
              this.status.isSending = false
              this.$router.push('agentPlayerList')
            }
          }
        )
        this.$store.commit('closeLoading')
      },
      resetAdmin () {
        this.playerInfo = {
          userName: '',
          userPwd: '',
          points: '',
          vedioMix: '',
          liveMix: '',
          parentId: '',
          remark: ''
        }
      }
    }
  }
</script>

<style scpoed>
  .-player-add h2{text-align:center;font-size: 1.8rem;font-weight: normal;padding: 1rem 0 2rem 0;color: #5a5a5a;margin-left: 110px}
  .-player-add .addmanager{width:36rem;margin: 0 auto;margin-top: 4rem}
  .-player-add .input{width: 100%;}
  .-player-add .-p-addPwd{position: absolute; top: 0;right: -40px}
  .-player-add .subBtn{margin-top: 1rem;margin-left: 2rem;margin-right: 4rem}
</style>
