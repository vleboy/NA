<template>
<div>
  <div class="out-createform">
    <h2 class="title">基本信息</h2>
    <el-form :model="managerInfo" ref="managerInfo" :rules="rules" label-width="120px" label-position="right">
        <el-form-item label="线路商标识" prop="suffix">
          <el-input v-model="managerInfo.suffix" class="input" placeholder="请输入"></el-input>
        </el-form-item>
          <el-form-item label="线路商昵称" prop="displayName">
            <el-input v-model="managerInfo.displayName" class="input" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="线路商邮箱" prop="managerEmail">
            <el-input v-model="managerInfo.managerEmail" class="input" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="线路商抽成比(%)" prop="rate">
            <el-input v-model="managerInfo.rate" class="input" placeholder="请输入"></el-input>
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
            <el-input v-model="managerInfo.hostName" class="input" placeholder="请输入"></el-input>
          </el-form-item>

          <el-form-item label="负责人联系方式" prop="hostContact">
            <el-input v-model="managerInfo.hostContact" class="input" placeholder="请输入"></el-input>
          </el-form-item>

          <el-form-item label="生效时间" prop="contractPeriod">
            <el-date-picker v-model="managerInfo.contractPeriod" type="daterange" placeholder="选择生效时间" class="input" label="生效时间" :editable='false' :disabled="managerInfo.isforever" :picker-options="pickerOptions"></el-date-picker><el-checkbox v-model="managerInfo.isforever" class="isforever" @change="changeContractPeriod">永久</el-checkbox>
          </el-form-item>
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
import { checkDisplayname, checkEmail, checkRate, checkHostname, checkHostcontact, checkContractPeriod } from '@/behavior/regexp'
import store from '@/store/store'
export default {
  name: 'out-createform',
  components: {
    Createbtn
  },
  beforeCreate () {
    checkform.isforever = false
  },
  mounted () {
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
        }
      }
    )
  },
  data () {
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
        rate: '', // 线路商抽成比
        managerEmail: '', // 线路商邮箱
        parent: '', // 上级线路商
        remark: '', // 备注
        hostName: '', // 负责人
        hostContact: '', // 负责人联系方式
        contractPeriod: [], // 生效时间
        isforever: false // 是否永久有效
      },
      rules: {
        displayName: [
          {validator: checkDisplayname, trigger: 'blur'}
        ],
        managerEmail: [
          {validator: checkEmail, trigger: 'blur'}
        ],
        rate: [
          {validator: checkRate, trigger: 'blur'}
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
    if (this.managerInfo.isforever === true) {
      this.managerInfo.contractPeriod = 0
    }
    if (this.managerInfo.contractPeriod !== 0) {
      for (var i = this.managerInfo.contractPeriod.length - 1; i >= 0; i--) {
        this.managerInfo.contractPeriod[i] = new Date(this.managerInfo.contractPeriod[i].toString()).getTime()
      }
    }
    if (!this.managerInfo.remark) {
      this.managerInfo.remark = 'NULL!'
    }
    console.log(this.managerInfo)
    this.$store.commit({
      type: 'recordOutcreate',
      data: this.managerInfo
    })
  }
}
</script>

<style scoped>
.out-createform{width:34rem;margin: 0 auto;}
.out-createform .title{font-weight: normal;color: #5a5a5a;margin: 1rem 0 2rem 0;text-align: center;margin-left: -35rem}
.out-createform .input{width: 20rem}
.out-createform .isforever{margin-left: 0.2rem}
/* .resetBtn{float: right;} */
@media print {
  .Noprint{ display: none }
}
</style>
