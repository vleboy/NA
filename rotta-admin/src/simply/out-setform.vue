<template>
<div>
  <div class="out-setform">
    <h2 class="title">配置线路商信息</h2>
    <el-form :model="setOutinfo" :rules="rules" ref="setOutinfo" class="setform" label-width="160px" label-position="right">
      <el-form-item label="初始线路商点数" prop="points">
        <el-tooltip class="item" effect="dark" :content="parentBills" placement="right">
          <el-input v-model="setOutinfo.points" class="input" placeholder="请输入"></el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="商家占成(%)" prop="rate">
          <el-input v-model="setOutinfo.rate" class="input" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="线路商拥有的游戏">
        <el-select v-model="setOutinfo.company" placeholder="请选择" clearable style="width:10rem;margin-right:0.5rem">
            <el-option v-for="item in CompanyList" :key="item" :label="item.client" :value="item.server" style="width:10rem"></el-option>
        </el-select>

        <el-select v-model="setOutinfo.selectGame" placeholder="请选择" clearable style="width:10rem;">
            <el-option v-for="item in CompanyGame" :key="item" :label="item.name" :value="item" style="width:10rem"></el-option>
        </el-select>

        <el-button type="text" @click="addGame">添加</el-button>
      </el-form-item>
      <el-form-item label="" prop="username">
        <el-table :data="setOutinfo.showSelect" border style="width: 35rem;margin-left:-9rem">
          <el-table-column prop="company" align="center" label="公司"></el-table-column>
          <el-table-column prop="gameName" align="center" label="游戏"></el-table-column>
          <el-table-column align="center" label="操作">
            <template scope="scope">
              <span @click="deleteGame(scope.row)" style="color: #20a0ff;cursor: pointer">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <h2 class="title">配置线路商后台管理员</h2>
      <el-form-item label="管理员用户名" prop="username">
        <el-input v-model="setOutinfo.username" class="input" placeholder="5~16位,只能输入英文及数字"></el-input>
      </el-form-item>
      <el-form-item label="管理员密码" prop="password">
        <el-input v-model="setOutinfo.password" class="input" placeholder="6~16位,包含字母、数字及符号中任意三种组合"></el-input>
        <el-button type="text" class="" @click="randomPassword">生成</el-button>
      </el-form-item>
      <el-form-item label="管理员真实姓名" prop="adminName">
        <el-input v-model="setOutinfo.adminName" class="input" placeholder="2~16位,只能输入中英文"></el-input>
      </el-form-item>
      <el-form-item label="管理员邮箱" prop="adminEmail">
        <el-input v-model="setOutinfo.adminEmail" class="input" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="管理员联系方式" prop="adminContact">
        <el-input v-model="setOutinfo.adminContact" class="input" placeholder="5~40位,只能输入中英文及数字"></el-input>
      </el-form-item>
    </el-form>
  </div>
  <div>
    <createbtn class="Noprint" :setOutinfo="setOutinfo" @on-result-change="resetForm"></createbtn>
  </div>
</div>
</template>

<script>
import store from '@/store/store'
import {invoke} from '@/libs/fetchLib'
import api from '@/api/api'
import Createbtn from '@/components/createbtn'
import { checkUserEmail, checkAdmincontact, checkPoints, checkUsername, checkLimit, checkName, checkPassword } from '@/behavior/regexp'
import { randomPassword } from '@/behavior/randomPassword'
export default {
  name: 'out-setform',
  components: {
    Createbtn
  },
  beforeCreate () {
  },
  computed: {
    parentBills () {
      return '当前所属上级余额: ' + this.$store.state.variable.outparentBills.balance
    }
  },
  mounted () {
    this.$store.dispatch('getoutParentBills')
    var data = {
      parent: ''
    }
    if (this.$store.state.variable.outcreate.parent === '') {
      data.parent = '01'
    } else {
      data.parent = this.$store.state.variable.outcreate.parent
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
  watch: {
    'setOutinfo.company' (val) {
      if (val) {
        this.CompanyGame = []
        this.setOutinfo.selectGame = ''
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
        this.setOutinfo.selectGame = ''
      }
    }
  },
  data () {
    var checkRate = (rule, value, callback) => {
      var num = new RegExp(/^(\d{1,2}(\.\d{1,2})?|100(\.0{1,2})?)$/)
      if (value === '') {
        callback(new Error('请输入商家占成'))
        store.state.checkform.rate = false
      } else if (!num.test(value) || value.slice(0, 1) == '0' && value.indexOf('.') == -1) {
        callback(new Error('商家占成只能为0.00 - 100.00'))
        store.state.checkform.rate = false
      } else if (value < 0 || value > 100) {
        callback(new Error('商家占成应为0.00 ~ 100.00之间的数字'))
        store.state.checkform.rate = false
      } else {
        store.state.checkform.rate = true
        callback()
      }
    }
    return {
      CompanyList: [], // 游戏大类列表
      CompanyGame: [], // 厂商的游戏列表
      setOutinfo: {
        company: '', // 选择的游戏厂商
        selectGame: '', // 选择的厂商的游戏
        showSelect: [], // 列表展示数据
        rate: '', // 商家占成
        points: '', // 初始线路商点数
        gameList: [], // 拥有游戏
        username: '', // 线路商商管理员用户名
        password: '', // 线路商商管理员密码
        adminName: '', // 线路商商管理员姓名
        adminEmail: '', // 线路商商管邮箱
        adminContact: '' // 线路商商管理员联系方式
      },
      rules: {
        points: [
          {validator: checkPoints, trigger: 'blur'}
        ],
        limit: [
          {validator: checkLimit, trigger: 'blur'}
        ],
        username: [
          {validator: checkUsername, trigger: 'blur'}
        ],
        adminEmail: [
          {validator: checkUserEmail, trigger: 'blur'}
        ],
        rate: [
          {validator: checkRate, trigger: 'blur'}
        ],
        adminContact: [
          {validator: checkAdmincontact, trigger: 'blur'}
        ],
        adminName: [
          {validator: checkName, trigger: 'blur'}
        ],
        password: [
          {validator: checkPassword, trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    resetForm (val) {
      this.setOutinfo = val
    },
    randomPassword () {
      var newpassword = randomPassword()
      this.setOutinfo.password = newpassword
    },
    addGame () {
      if (this.setOutinfo.company && this.setOutinfo.selectGame) {
        let data = {
          company: this.setOutinfo.company,
          gameName: this.setOutinfo.selectGame.name,
        }
        if (this.setOutinfo.showSelect.length == 0) {
          let select = this.setOutinfo.selectGame
          select.company = this.setOutinfo.company
          this.setOutinfo.gameList.push(select)
          this.setOutinfo.showSelect.push(data)
        } else {
          let repeat = false
          for (let item of this.setOutinfo.showSelect) {
            if (item.gameName == data.gameName) {
              repeat = true
              this.$message({
                type: 'info',
                message: '您已选择该游戏'
              })
            }
          }
          if (!repeat) {
            let select = this.setOutinfo.selectGame
            select.company = this.setOutinfo.company
            this.setOutinfo.gameList.push(select)
            this.setOutinfo.showSelect.push(data)
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
      this.setOutinfo.showSelect = this.setOutinfo.showSelect.filter(item => {
        return item.gameName != data.gameName
      })
      this.setOutinfo.gameList = this.setOutinfo.gameList.filter(item => {
        return item.name != data.gameName
      })
    }
  },
  beforeDestroy () {
    if (!this.setOutinfo.rate || !this.setOutinfo.points || !this.setOutinfo.username || !this.setOutinfo.password || !this.setOutinfo.adminName || !this.setOutinfo.adminEmail || !this.setOutinfo.adminContact) {
    } else {
      let data = this.setOutinfo
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
      this.$store.commit({
        type: 'recordOutcreate',
        data: data
      })
      var outcreate = this.$store.state.variable.outcreate
      invoke({
        url: api.createUser,
        method: api.post,
        data: outcreate
      }).then(
        result => {
          const [err, ret] = result
          if (err) {
          } else {
            var data = ret.data.payload
            this.$store.commit({
              type: 'recordOutsuccess',
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
.out-setform{width:45rem;margin: 0 auto;}
.out-setform .title{font-weight: normal;color: #5a5a5a;margin: 1rem 0 2rem 0;text-align: center;margin-left: -35rem}
.out-setform .input{width: 21rem}
@media print {
  .Noprint{ display: none }
}
</style>
