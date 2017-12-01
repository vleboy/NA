<template>
<div>
  <div class="com-createform">
    <h2 class="title">基本信息</h2>
    <el-form :model="merchantInfo" ref="merchantInfo" :rules="rules" label-width="140px" label-position="right">
          <el-form-item label="代理用户名" prop="username">
            <el-input v-model="merchantInfo.username" class="input" placeholder="5~16位,只能包含英文或数字"></el-input>
          </el-form-item>
          <el-form-item label="代理密码" prop="password">
            <el-input v-model="merchantInfo.password" class="input" placeholder="8~16位,必须包含英文、数字和符号任意两种组合"></el-input>
          </el-form-item>
          <el-form-item label="代理昵称" prop="displayName">
            <el-input v-model="merchantInfo.displayName" class="input" placeholder="2~10位,只能包含中文、英文或数字"></el-input>
          </el-form-item>
          <el-form-item label="所属代理">
            <el-select v-model="merchantInfo.parent" filterable placeholder="请选择" clearable class="input">
              <el-option v-for="item in parent" :key="item.userId" :label="item.displayName" :value="item.userId" style="max-width:336px"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="merchantInfo.remark" placeholder="请输入备注,最多不超过200个字符" type="textarea" :rows="3" class="input" :maxlength="200"></el-input>
          </el-form-item>
          <el-form-item label="生效时间" prop="contractPeriod">
            <el-date-picker v-model="merchantInfo.contractPeriod" type="daterange" placeholder="选择生效时间" class="input" label="生效时间" :editable='false' :disabled="merchantInfo.isforever" :picker-options="pickerOptions"></el-date-picker><el-checkbox v-model="merchantInfo.isforever" class="isforever" @change="changeContractPeriod">永久</el-checkbox>
          </el-form-item>
    </el-form>
  </div>
  <div>
    <createbtn class="Noprint" :merchantInfo="merchantInfo" @on-result-change="resetForm"></createbtn>
  </div>
</div>
  
</template>

<script>
import {invoke} from '@/libs/fetchLib'
import api from '@/api/api'
import Createbtn from '@/components/createbtn'
import { checkUsername, checkPassword, checkDisplayname, checkContractPeriod } from '@/behavior/regexp'
import checkform from '@/variables/checkform'
import store from '@/store/store'
export default {
  name: 'com-createform',
  components: {
    Createbtn
  },
  beforeCreate () {
    this.$store.commit('startLoading')
    checkform.isforever = false
  },
  mounted () {
    var data = {
      parent: ''
    }
    if (localStorage.loginParent === '00') {
      data.parent = null
    } else {
      data.parent = localStorage.loginId
    }
    invoke({
      url: api.parentAgent,
      method: api.post,
      data: data
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
        } else {
          var data = ret.data.payload
          data = data.filter(item => {
            return item.parentName != 'XYZBF'
          })
          this.parent = data
          this.parent.push({
            displayName: '直属',
            userId: ''
          })
          this.$store.commit('closeLoading')
        }
      }
    )
    if (this.$store.state.variable.nowParent == localStorage.loginId) {
      this.merchantInfo.parent = ''
    } else {
      this.merchantInfo.parent = this.$store.state.variable.nowParent
    }
  },
  data () {
    return {
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      parent: [], // 可用上级代理列表
      merchantInfo: {
        username: '', // 代理用户名
        password: '', // 代理密码
        displayName: '', // 代理昵称
        parent: '', // 上级代理
        remark: '', // 备注
        contractPeriod: [], // 生效时间
        isforever: false // 是否永久有效
      },
      rules: {
        username: [
          {validator: checkUsername, trigger: 'blur'}
        ],
        password: [
          {validator: checkPassword, trigger: 'blur'}
        ],
        displayName: [
          {validator: checkDisplayname, trigger: 'blur'}
        ],
        contractPeriod: [
          {validator: checkContractPeriod, trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    resetForm (val) {
      this.merchantInfo = val
    },
    changeContractPeriod () {
      if (this.merchantInfo.isforever === true) {
        this.merchantInfo.contractPeriod = 0
        store.state.checkform.contractPeriod = true
      } else {
        this.merchantInfo.contractPeriod = []
        store.state.checkform.contractPeriod = false
      }
    }
  },
  beforeDestroy () {
    if (!this.merchantInfo.parent && localStorage.loginParent == '00') {
      this.merchantInfo.parent = '01'
    } else if (!this.merchantInfo.parent && localStorage.loginParent != '00') {
      this.merchantInfo.parent = localStorage.loginId
    }
    if (this.merchantInfo.isforever === true) {
      this.merchantInfo.contractPeriod = 0
    }
    if (this.merchantInfo.contractPeriod !== 0) {
      for (var i = this.merchantInfo.contractPeriod.length - 1; i >= 0; i--) {
        this.merchantInfo.contractPeriod[i] = new Date(this.merchantInfo.contractPeriod[i].toString()).getTime()
      }
    }
    if (!this.merchantInfo.remark) {
      this.merchantInfo.remark = 'NULL!'
    }
    this.$store.commit({
      type: 'recordComcreate',
      data: this.merchantInfo
    })
  }
}
</script>

<style scoped>
.com-createform{width:38rem;margin: 0 auto;}
.com-createform .title{font-weight: normal;color: #5a5a5a;margin: 1rem 0 2rem 0;text-align: center;margin-left: -35rem}
.com-createform .input{width: 20rem}
.com-createform .isforever{margin-left: 0.2rem}
@media print {
  .Noprint{ display: none }
}
</style>
