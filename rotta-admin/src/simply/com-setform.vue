<template>
<div>
  <div class="com-setform">
    <h2 class="title">配置商户信息</h2>
    <el-form :model="setcomInfo" :rules="rules" ref="setcomInfo" class="setform" label-width="160px" label-position="right">
      <el-form-item label="商户点数" prop="points">
        <el-tooltip class="item" effect="dark" :content="parentBills" placement="right">
          <el-input v-model="setcomInfo.points" class="input" placeholder="请输入"></el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="商户抽成比(%)" prop="rate">
        <el-tooltip class="item" effect="dark" :content="parentRate" placement="right">
          <el-input v-model="setcomInfo.rate" class="input" placeholder="请输入"></el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="商户线路号" prop="msn">
        <el-input v-model="setcomInfo.msn" class="input" placeholder="请输入"></el-input>
        <el-button type="text" class="" @click="randomMSN">试试手气</el-button>
      </el-form-item>
      <el-form-item label="商户拥有的游戏">
        <el-select v-model="setcomInfo.gameList" multiple placeholder="请选择" clearable class="input">
            <el-option v-for="item in allGames" :key="item" :label="item.name" :value="item" style="max-width:336px"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商户API白名单" prop="loginWhiteList">
        <el-input v-model="setcomInfo.loginWhiteList" placeholder="请输入IP地址或IP范围,一行一个规则,每行以分号结尾,0.0.0.0为不限制任何IP" type="textarea" :rows="4" class="input" :maxlength="200"></el-input>
      </el-form-item>
      <el-form-item label="商户域名" prop="frontURL">
        <el-input v-model="setcomInfo.frontURL" class="input" placeholder="请输入">
          <el-select v-model="selectFront" slot="prepend" placeholder="请选择" style="width:6.5rem">
            <el-option label="Http://" value="Http://"></el-option>
            <el-option label="Https://" value="Https://"></el-option>
          </el-select>
        </el-input>
        <el-button type="text" class="" @click="checkURL">验证</el-button>
      </el-form-item>
      <h2 class="title">配置商户后台管理员</h2>
      <el-form-item label="商户管理员用户名" prop="username">
        <el-input v-model="setcomInfo.username" class="input" placeholder="5~16位,只能输入英文及数字"></el-input>
      </el-form-item>
      <el-form-item label="商户管理员密码" prop="password">
        <el-input v-model="setcomInfo.password" class="input" placeholder="6~16位,包含字母、数字及符号中任意三种组合"></el-input>
        <el-button type="text" class="" @click="randomPassword">生成</el-button>
      </el-form-item>
      <el-form-item label="商户管理员真实姓名" prop="adminName">
        <el-input v-model="setcomInfo.adminName" class="input" placeholder="2~16位,只能输入中英文"></el-input>
      </el-form-item>
      <el-form-item label="商户管理员邮箱" prop="adminEmail">
        <el-input v-model="setcomInfo.adminEmail" class="input" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="商户管理员联系方式" prop="adminContact">
        <el-input v-model="setcomInfo.adminContact" class="input" placeholder="5~40位,只能输入中英文及数字"></el-input>
      </el-form-item>
    </el-form>
  </div>
  <div>
    <createbtn class="Noprint" :setcomInfo="setcomInfo" @on-result-change="resetForm"></createbtn>
  </div>
</div>
  
</template>

<script>
import store from '@/store/store'
import {invoke} from '@/libs/fetchLib'
import api from '@/api/api'
import Createbtn from '@/components/createbtn'
import { checkUserEmail, checkAdmincontact, checkPoints, checkUsername, checkLimit, checkName, checkPassword, checkURL } from '@/behavior/regexp'
import { randomPassword } from '@/behavior/randomPassword'
export default {
  name: 'out-setform',
  components: {
    Createbtn
  },
  beforeCreate () {
    store.state.checkform.loginWhitelist = true
  },
  created () {
  },
  computed: {
    parentBills () {
      return '当前所属上级余额: ' + this.$store.state.variable.comparentBills.balance
    },
    parentRate () {
      return '当前所属上级抽成比: ' + this.$store.state.variable.comparentBills.rate + '%'
    }
  },
  mounted () {
    this.$store.dispatch('getcomParentBills')
    var data = {
      parent: ''
    }
    if (this.$store.state.variable.comcreate.parent === '') {
      data.parent = '01'
    } else {
      data.parent = this.$store.state.variable.comcreate.parent
    }
    invoke({
      url: api.allGames,
      method: api.post,
      data: data
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
        } else {
          var data = ret.data.payload
          // console.log(data)
          this.allGames = data
        }
      }
    )
  },
  data () {
    var checkRate = (rule, value, callback) => {
      var num = new RegExp(/^(\d{1,2}(\.\d{1,2})?|100(\.0{1,2})?)$/)
      if (value === '') {
        callback(new Error('请输入抽成比'))
        store.state.checkform.rate = false
      } else if (!num.test(value) || value.slice(0, 1) == '0' && value.indexOf('.') == -1) {
        callback(new Error('抽成比只能为0.00 - 100.00'))
        store.state.checkform.rate = false
      } else if (value < 0 || value > 100) {
        callback(new Error('抽成比应为0~100之间的数字'))
        store.state.checkform.rate = false
      } else if (Number(value) > Number(this.$store.state.variable.comparentBills.rate)) {
        callback(new Error('上级最大抽成比为' + this.$store.state.variable.comparentBills.rate + '%' + ' ' + '已超过上级最大抽成比'))
        store.state.checkform.rate = false
      } else {
        store.state.checkform.rate = true
        callback()
      }
    }
    var checkLoginWhiteList = (rule, value, callback) => {
      if (value) {
        var ip = new RegExp(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/)
        value = value.replace(/[\r\n]/g, '')
        var last = value.slice(value.length - 1, value.length)
        // console.log(last)
        if (last.toString() === ';') {
          value = value.substring(0, value.length - 1)
        }
        value = value.split(';')
        // console.log(value)
        for (var i = value.length - 1; i >= 0; i--) {
          if (!ip.exec(value[i])) {
            store.state.checkform.loginWhitelist = false
            callback(new Error('请输入正确的白名单'))
          } else {
            store.state.checkform.loginWhitelist = true
            callback()
          }
        }
      } else if (!value) {
        store.state.checkform.loginWhitelist = true
        callback()
      }
    } // 验证商户白名单
    var checkMSN = (rule, value, callback) => {
      var num = new RegExp(/^[0-9]/)
      if (value === '') {
        callback(new Error('请输入线路号'))
        store.state.checkform.msn = false
      } else if (value && value.slice(0, 3).toString() === '000') {
        callback(new Error('线路号格式错误'))
        store.state.checkform.msn = false
      } else if (value > 999 || value < 1) {
        callback(new Error('线路号的范围在1~999之间'))
        store.state.checkform.msn = false
      } else if (!num.exec(value)) {
        callback(new Error('请输入正确的线路号'))
        store.state.checkform.msn = false
      } else {
        store.state.checkform.msn = false
        invoke({
          url: api.checkMSN + '/' + value,
          method: api.get
        }).then(
          result => {
            const [err, ret] = result
            if (err) {
            } else {
              var data = ret.data.payload.avalible
              if (data === false) {
                callback(new Error('该线路号已注册或已停用'))
                store.state.checkform.msn = false
              } else {
                store.state.checkform.msn = true
                this.setcomInfo.msn = ((parseFloat(this.setcomInfo.msn) * 0.001).toFixed(3) + '').substring(2)
                callback()
              }
            }
          }
        )
      }
    } // 验证商户线路号
    return {
      selectFront: '', // 前端域名前缀
      allGames: [], // 获取到的游戏列表
      setcomInfo: {
        rate: '', // 商户抽成比
        points: '', // 初始代理点数
        msn: '', // 线路号
        gameList: [], // 拥有游戏
        loginWhiteList: '', // 商户白名单
        frontURL: '', // 商户前端域名
        username: '', // 商户管理员用户名
        password: '', // 商户管理员密码
        adminName: '', // 商户管理员姓名
        adminEmail: '', // 商户管理员邮箱
        adminContact: '' // 商户管理员联系方式
      },
      rules: {
        points: [
          {validator: checkPoints, trigger: 'blur'}
        ],
        msn: [
          {validator: checkMSN, trigger: 'change'}
        ],
        limit: [
          {validator: checkLimit, trigger: 'blur'}
        ],
        rate: [
          {validator: checkRate, trigger: 'blur'}
        ],
        username: [
          {validator: checkUsername, trigger: 'blur'}
        ],
        adminEmail: [
          {validator: checkUserEmail, trigger: 'blur'}
        ],
        adminContact: [
          {validator: checkAdmincontact, trigger: 'blur'}
        ],
        adminName: [
          {validator: checkName, trigger: 'blur'}
        ],
        password: [
          {validator: checkPassword, trigger: 'change'}
        ],
        loginWhiteList: [
          {validator: checkLoginWhiteList, trigger: 'blur'}
        ],
        frontURL: [
          {validator: checkURL, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    resetForm (val) {
      this.setcomInfo = val
    },
    randomPassword () {
      var newpassword = randomPassword()
      this.setcomInfo.password = newpassword
    },
    randomMSN () {
      invoke({
        url: api.randomMSN,
        method: api.get
      }).then(
        result => {
          const [err, ret] = result
          if (err) {
          } else {
            var data = ret.data.payload
            data = ((parseFloat(data) * 0.001).toFixed(3) + '').substring(2)
            this.setcomInfo.msn = data
            store.state.checkform.msn = true
          }
        }
      )
    },
    checkURL () {
      var url = this.selectFront + this.setcomInfo.frontURL
      window.open(url)
    }
  },
  beforeDestroy () {
    if (!this.setcomInfo.rate || !this.setcomInfo.points || !this.setcomInfo.msn || !this.setcomInfo.frontURL || !this.setcomInfo.username || !this.setcomInfo.password || !this.setcomInfo.adminName || !this.setcomInfo.adminEmail || !this.setcomInfo.adminContact) {
    } else {
      if (!this.setcomInfo.loginWhiteList) {
        this.setcomInfo.loginWhiteList = '0.0.0.0'
      }
      this.setcomInfo.frontURL = this.selectFront + this.setcomInfo.frontURL
      this.$store.commit({
        type: 'recordComcreate',
        data: this.setcomInfo
      })
      var comcreate = this.$store.state.variable.comcreate
      invoke({
        url: api.createUser,
        method: api.post,
        data: comcreate
      }).then(
        result => {
          const [err, ret] = result
          if (err) {
          } else {
            var data = ret.data.payload
            this.$store.commit({
              type: 'recordComsuccess',
              data: data
            })
          }
        }
      )
    }
  }
}
</script>

<style scoped>
.com-setform{width:45rem;margin: 0 auto;}
.com-setform .title{font-weight: normal;color: #5a5a5a;margin: 1rem 0 2rem 0;text-align: center;margin-left: -35rem}
.com-setform .input{width: 21rem}
@media print {
  .Noprint{ display: none }
}
</style>
