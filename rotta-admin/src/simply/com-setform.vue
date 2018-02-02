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
      <el-form-item label="商家占成(%)" prop="rate">
        <el-input v-model="setcomInfo.rate" class="input" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="商户线路号" prop="msn">
        <el-input v-model="setcomInfo.msn" class="input" placeholder="请输入"></el-input>
        <el-button type="text" class="" @click="randomMSN">试试手气</el-button>
      </el-form-item>
      <el-form-item label="商户标识" prop="sn">
        <el-input v-model="setcomInfo.sn" class="input" placeholder="3~5位,只能输入中英文、数字、@、_"></el-input>
      </el-form-item>
      <el-form-item label="商户拥有的游戏">
        <el-select v-model="setcomInfo.company" placeholder="请选择" clearable style="width:10rem;margin-right:0.5rem">
            <el-option v-for="item in CompanyList" :key="item" :label="item.client" :value="item.server" style="width:10rem"></el-option>
        </el-select>

        <el-select v-model="setcomInfo.selectGame" placeholder="请选择" clearable style="width:10rem;">
            <el-option v-for="item in CompanyGame" :key="item" :label="item.name" :value="item" style="width:10rem"></el-option>
        </el-select>

        <el-button type="text" @click="addGame">添加</el-button>
      </el-form-item>
      <el-form-item label="" prop="username">
        <el-table :data="setcomInfo.showSelect" border style="width: 35rem;margin-left:-9rem">
          <el-table-column prop="company" align="center" label="公司"></el-table-column>
          <el-table-column prop="gameName" align="center" label="游戏"></el-table-column>
          <el-table-column align="center" label="操作">
            <template scope="scope">
              <span @click="deleteGame(scope.row)" style="color: #20a0ff;cursor: pointer">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item label="商户API白名单" prop="loginWhiteList">
        <el-input v-model="setcomInfo.loginWhiteList" placeholder="请输入IP地址或IP范围,一行一个规则,每行以分号结尾,0.0.0.0为不限制任何IP" type="textarea" :rows="4" class="input" :maxlength="200"></el-input>
      </el-form-item>
      <el-form-item label="商户域名" prop="frontURL">
        <el-input v-model="setcomInfo.frontURL" class="input" placeholder="请输入">
          <el-select v-model="selectFront1" slot="prepend" placeholder="请选择" style="width:6.5rem">
            <el-option label="Http://" value="Http://"></el-option>
            <el-option label="Https://" value="Https://"></el-option>
          </el-select>
        </el-input>
        <el-button type="text" class="" @click="checkURL(selectFront1,setcomInfo.frontURL)">验证</el-button>
      </el-form-item>
      <el-form-item label="商户充值页面地址">
        <el-input v-model="setcomInfo.moneyURL" class="input" placeholder="选填">
          <el-select v-model="selectFront2" slot="prepend" placeholder="请选择" style="width:6.5rem">
            <el-option label="Http://" value="Http://"></el-option>
            <el-option label="Https://" value="Https://"></el-option>
          </el-select>
        </el-input>
        <el-button type="text" class="" @click="checkURL(selectFront2,setcomInfo.moneyURL)">验证</el-button>
      </el-form-item>
      <el-form-item label="商户注册页面地址">
        <el-input v-model="setcomInfo.registerURL" class="input" placeholder="选填">
          <el-select v-model="selectFront3" slot="prepend" placeholder="请选择" style="width:6.5rem">
            <el-option label="Http://" value="Http://"></el-option>
            <el-option label="Https://" value="Https://"></el-option>
          </el-select>
        </el-input>
        <el-button type="text" class="" @click="checkURL(selectFront3,setcomInfo.registerURL)">验证</el-button>
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
import { checkUserEmail, checkAdmincontact, checkPoints, checkUsername, checkLimit, checkName, checkPassword, checkURL, checksn } from '@/behavior/regexp'
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
      url: api.companySelect,
      method: api.post,
      data: data
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
        } else {
          var data = ret.data.payload
          for (let item of data) {
            item.client = item.client + '游戏'
          }
          this.CompanyList = data
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
        callback(new Error('抽成比应为0.00 ~ 100.00之间的数字'))
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
      selectFront1: '', // 前端域名前缀
      selectFront2: '', // 充值域名前缀
      selectFront3: '', // 注册域名前缀
      CompanyList: [], // 游戏大类列表
      CompanyGame: [], // 厂商的游戏列表
      setcomInfo: {
        company: '', // 选择的游戏厂商
        selectGame: '', // 选择的厂商的游戏
        showSelect: [], // 列表展示数据
        rate: '', // 商户抽成比
        points: '', // 初始代理点数
        msn: '', // 线路号
        sn: '', // 商户标识
        gameList: [], // 拥有游戏
        loginWhiteList: '', // 商户白名单
        frontURL: '', // 商户前端域名
        moneyURL: '', // 商户充值域名
        registerURL: '', // 商户注册域名
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
        sn: [
          {validator: checksn, trigger: 'blur'}
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
  watch: {
    'setcomInfo.company' (val) {
      if (val) {
        this.CompanyGame = []
        this.setcomInfo.selectGame = ''
        invoke({
          url: api.gameBigType,
          method: api.post,
          data: {
            companyIden: val
          }
        }).then(
          result => {
            const [err, ret] = result
            if (err) {
            } else {
              var data = ret.data.payload
              this.CompanyGame = data
            }
          }
        )
      } else {
        this.CompanyGame = []
        this.setcomInfo.selectGame = ''
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
    checkURL (http, data) {
      var url = http + data
      window.open(url)
    },
    addGame () {
      if (this.setcomInfo.company && this.setcomInfo.selectGame) {
        let data = {
          company: this.setcomInfo.company,
          gameName: this.setcomInfo.selectGame.name,
        }
        if (this.setcomInfo.showSelect.length == 0) {
          let select = this.setcomInfo.selectGame
          select.company = this.setcomInfo.company
          this.setcomInfo.gameList.push(select)
          this.setcomInfo.showSelect.push(data)
        } else {
          let repeat = false
          for (let item of this.setcomInfo.showSelect) {
            if (item.gameName == data.gameName) {
              repeat = true
              this.$message({
                type: 'info',
                message: '您已选择该游戏'
              })
            }
          }
          if (!repeat) {
            let select = this.setcomInfo.selectGame
            select.company = this.setcomInfo.company
            this.setcomInfo.gameList.push(select)
            this.setcomInfo.showSelect.push(data)
          }
        }
      } else {
        this.$message({
          type: 'warning',
          message: '请完善选择游戏！'
        })
      }
    },
    deleteGame (data) {
      this.setcomInfo.showSelect = this.setcomInfo.showSelect.filter(item => {
        return item.gameName != data.gameName
      })
      this.setcomInfo.gameList = this.setcomInfo.gameList.filter(item => {
        return item.name != data.gameName
      })
    }
  },
  beforeDestroy () {
    if (!this.setcomInfo.rate || !this.setcomInfo.points || !this.setcomInfo.msn || !this.setcomInfo.frontURL || !this.setcomInfo.username || !this.setcomInfo.password || !this.setcomInfo.adminName || !this.setcomInfo.adminEmail || !this.setcomInfo.adminContact || !this.setcomInfo.sn) {
    } else {
      let data = this.setcomInfo
      for (let outside of data.gameList) {
        for (let inside of this.CompanyList) {
          if (outside.company == inside.server) {
            outside.companyName = inside.companyName
          }
        }
      }
      delete data.selectGame
      delete data.showSelect
      delete data.company
      if (!data.loginWhiteList) {
        data.loginWhiteList = '0.0.0.0'
      }
      data.frontURL = this.selectFront1 + this.setcomInfo.frontURL
      data.moneyURL = this.selectFront2 + this.setcomInfo.moneyURL
      data.registerURL = this.selectFront3 + this.setcomInfo.registerURL
      this.$store.commit({
        type: 'recordComcreate',
        data: data
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
