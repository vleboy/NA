<template>
<div>
  <div class="out-createform">
    <h2 class="title">基本信息</h2>
    <el-form :model="managerInfo" ref="managerInfo" :rules="rules" label-width="120px" label-position="right">
        <el-form-item label="线路商标识" prop="suffix">
          <el-input v-model="managerInfo.suffix" class="input" placeholder="2~6 位,只能输入英文和数字(以字母开头)"></el-input>
        </el-form-item>
          <el-form-item label="线路商昵称" prop="displayName">
            <el-input v-model="managerInfo.displayName" class="input" placeholder="2~10 位,只能输入中英文及数字"></el-input>
          </el-form-item>
          <el-form-item label="线路商邮箱" prop="managerEmail">
            <el-input v-model="managerInfo.managerEmail" class="input" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="上级线路商">
            <el-select v-model="managerInfo.parent" filterable placeholder="请选择" clearable class="input">
              <el-option v-for="item in parent" :key="item.value" :label="item.label" :value="item.value" style="max-width:336px"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="managerInfo.remark" placeholder="请输入备注,最多不超过200个字符" type="textarea" :rows="3" class="input" :maxlength="200"></el-input>
          </el-form-item>

          <el-form-item label="负责人" prop="hostName">
            <el-input v-model="managerInfo.hostName" class="input" placeholder="2~16 位,只能输入中英文"></el-input>
          </el-form-item>

          <el-form-item label="负责人联系方式" prop="hostContact">
            <el-input v-model="managerInfo.hostContact" class="input" placeholder="5~40位,只能输入中英文及数字"></el-input>
          </el-form-item>

          <!-- <el-form-item label="生效时间" prop="contractPeriod">
            <el-date-picker v-model="managerInfo.contractPeriod" type="daterange" placeholder="选择生效时间" class="input" label="生效时间" :editable='false' :disabled="managerInfo.isforever" :picker-options="pickerOptions"></el-date-picker><el-checkbox v-model="managerInfo.isforever" class="isforever" @change="changeContractPeriod">永久</el-checkbox>
          </el-form-item> -->
    </el-form>
  </div>
  <div>
    <createbtn class="Noprint" :managerInfo="managerInfo" @on-result-change="resetForm"></createbtn>
  </div>
</div>
</template>

<script>
import {invoke} from '@/libs/fetchLib'
import api from '@/api/api'
import checkform from '@/variables/checkform'
import Createbtn from '@/components/createbtn'
import { checkDisplayname, checkEmail, checkHostname, checkHostcontact, checkContractPeriod } from '@/behavior/regexp'
import store from '@/store/store'
export default {
  name: 'out-createform',
  components: {
    Createbtn
  },
  beforeCreate () {
    this.$store.commit('startLoading')
    // checkform.isforever = false
    checkform.contractPeriod = false
  },
  created () {
    invoke({
      url: api.parentList,
      method: api.get
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
        } else {
          var data = ret.data.payload
          this.parent = data
          this.parent.push({
            label: '直属',
            value: ''
          })
          this.$store.commit('closeLoading')
        }
      }
    )
    this.managerInfo.parent = this.$store.state.variable.nowParent
  },
  mounted () {
  },
  data () {
    const checkSuffix = (rule, value, callback) => {
      var str = new RegExp(/^[a-zA-Z]/)
      // var nick = new RegExp(/^[\u4E00-\u9FA5A-Za-z0-9_]+$/)
      var suffix = new RegExp(/^[a-zA-Z]{1}[a-zA-z0-9]{1,5}$/)
      if (value === '') {
        callback(new Error('请输入线路商标识'))
        store.state.checkform.suffix = false
      } else if (!str.exec(value.slice(0, 1))) {
        callback(new Error('标识必须以字母开头'))
        store.state.checkform.suffix = false
      } else if (value.length > 6) {
        callback(new Error('标识长度不能超过6位'))
        store.state.checkform.suffix = false
      } else if (value.length < 2) {
        callback(new Error('标识长度不能少于2位'))
        store.state.checkform.suffix = false
      } else if (!suffix.exec(value)) {
        callback(new Error('标识只能输入英文、数字'))
        store.state.checkform.suffix = false
      } else {
        var manager = {
          suffix:{
            role: '10',
            suffix: value,
            username: '0'
          }
        }
        invoke({
          url: api.checkExist,
          method: api.post,
          data: manager
        }).then(
          result => {
            const [err, ret] = result
            if (err) {
            } else {
              var suffixStatus = ret.data.payload
              // console.log('标识状态为', suffixStatus)
              if (suffixStatus === false) {
                callback(new Error('该标识已存在'))
                store.state.checkform.suffix = false
              } else {
                store.state.checkform.suffix = true
                callback()
              }
            }
          }
        )
      }
    } // 验证线路商标识
    return {
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      parent: [], // 可用上级线路商列表
      managerInfo: {
        suffix: '', // 线路商标识
        displayName: '', // 线路商昵称
        managerEmail: '', // 线路商邮箱
        parent: '', // 上级线路商
        remark: '', // 备注
        hostName: '', // 负责人
        hostContact: '', // 负责人联系方式
        contractPeriod: [], // 生效时间
        isforever: true // 是否永久有效
      },
      rules: {
        suffix: [
          {validator: checkSuffix, trigger: 'blur'}
        ],
        displayName: [
          {validator: checkDisplayname, trigger: 'blur'}
        ],
        managerEmail: [
          {validator: checkEmail, trigger: 'blur'}
        ],
        hostName: [
          {validator: checkHostname, trigger: 'blur'}
        ],
        hostContact: [
          {validator: checkHostcontact, trigger: 'blur'}
        ],
        contractPeriod: [
          {validator: checkContractPeriod, trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    resetForm (val) {
      this.managerInfo = val
    },
    changeContractPeriod () {
      if (this.managerInfo.isforever === true) {
        this.managerInfo.contractPeriod = 0
        store.state.checkform.contractPeriod = true
      } else {
        this.managerInfo.contractPeriod = []
        store.state.checkform.contractPeriod = false
      }
    }
  },
  beforeDestroy () {
    if (!this.managerInfo.remark) {
      this.managerInfo.remark = 'NULL!'
    }
    this.$store.commit({
      type: 'recordOutcreate',
      data: this.managerInfo
    })
  }
}
</script>

<style scoped>
.out-createform{width:40rem;margin: 0 auto;}
.out-createform .title{font-weight: normal;color: #5a5a5a;margin: 1rem 0 2rem 0;text-align: center;margin-left: -35rem}
.out-createform .input{width: 21rem}
.out-createform .isforever{margin-left: 0.2rem}
/* .resetBtn{float: right;} */
@media print {
  .Noprint{ display: none }
}
</style>
