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
      <el-form-item label="线路商抽成比(%)" prop="rate">
        <el-tooltip class="item" effect="dark" :content="parentRate" placement="right">
          <el-input v-model="setOutinfo.rate" class="input" placeholder="请输入"></el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="线路商可放商户名额" prop="limit">
        <el-input v-model="setOutinfo.limit" class="input" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="线路商拥有的游戏">
        <el-select v-model="setOutinfo.gameList" multiple placeholder="请选择" clearable class="input">
            <el-option v-for="item in allGames" :key="item" :label="item.name" :value="item" style="max-width:336px"></el-option>
        </el-select>
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
    },
    parentRate () {
      return '当前所属上级抽成比: ' + this.$store.state.variable.outparentBills.rate + '%'
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
      } else if (Number(value) > Number(this.$store.state.variable.outparentBills.rate)) {
        callback(new Error('上级最大抽成比为' + this.$store.state.variable.outparentBills.rate + '%' + ' ' + '已超过上级最大抽成比'))
        store.state.checkform.rate = false
      } else {
        store.state.checkform.rate = true
        callback()
      }
    }
    return {
      allGames: [], // 游戏大类
      setOutinfo: {
        rate: '', // 线路商抽成比
        points: '', // 初始线路商点数
        limit: '', // 可放名额
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
    }
  },
  beforeDestroy () {
    this.$store.commit({
      type: 'recordOutcreate',
      data: this.setOutinfo
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
          console.log('注册线路商成功后返回数据是:', data)
          this.$store.commit({
            type: 'recordOutsuccess',
            data: data
          })
        }
      }
    )
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
