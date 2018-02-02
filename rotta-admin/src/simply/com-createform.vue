<template>
<div>
  <div class="com-createform">
    <h2 class="title">基本信息</h2>
    <el-form :model="merchantInfo" ref="merchantInfo" :rules="rules" label-width="120px" label-position="right">
        <el-form-item label="商户简称" prop="suffix">
          <el-input v-model="merchantInfo.suffix" class="input" placeholder="2~6 位,只能输入英文和数字(以字母开头)"></el-input>
        </el-form-item>
          <el-form-item label="商户昵称" prop="displayName">
            <el-input v-model="merchantInfo.displayName" class="input" placeholder="2~10 位,只能输入中英文及数字"></el-input>
          </el-form-item>
          <el-form-item label="商户邮箱" prop="merchantEmail">
            <el-input v-model="merchantInfo.merchantEmail" class="input" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="负责人" prop="hostName">
            <el-input v-model="merchantInfo.hostName" class="input" placeholder="2~16 位,只能输入中英文"></el-input>
          </el-form-item>
          <el-form-item label="负责人联系方式" prop="hostContact">
            <el-input v-model="merchantInfo.hostContact" class="input" placeholder="5~40位,只能输入中英文及数字"></el-input>
          </el-form-item>
          <el-form-item label="所属线路商">
            <el-select v-model="merchantInfo.parent" filterable placeholder="请选择" clearable class="input">
              <el-option v-for="item in parent" :key="item.value" :label="item.label" :value="item.value" style="max-width:336px"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="merchantInfo.remark" placeholder="请输入备注,最多不超过200个字符" type="textarea" :rows="3" class="input" :maxlength="200"></el-input>
          </el-form-item>
          <!-- <el-form-item label="生效时间" prop="contractPeriod">
            <el-date-picker v-model="merchantInfo.contractPeriod" type="daterange" placeholder="选择生效时间" class="input" label="生效时间" :editable='false' :disabled="merchantInfo.isforever" :picker-options="pickerOptions"></el-date-picker><el-checkbox v-model="merchantInfo.isforever" class="isforever" @change="changeContractPeriod">永久</el-checkbox>
          </el-form-item> -->
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
import { checkSuffix, checkDisplayname, checkEmail, checkHostname, checkHostcontact, checkContractPeriod } from '@/behavior/regexp'
import checkform from '@/variables/checkform'
import store from '@/store/store'
export default {
  name: 'com-createform',
  components: {
    Createbtn
  },
  beforeCreate () {
    this.$store.commit('startLoading')
    // checkform.isforever = false
    checkform.contractPeriod = false
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
          this.$store.commit('closeLoading')
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
      parent: [], // 可用上级商户列表
      merchantInfo: {
        suffix: '', // 商户简称
        displayName: '', // 商户昵称
        rate: '', // 商户抽成比
        merchantEmail: '', // 商户邮箱
        parent: this.$store.state.variable.nowParent || '', // 上级商户
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
        merchantEmail: [
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
.com-createform{width:40rem;margin: 0 auto;}
.com-createform .title{font-weight: normal;color: #5a5a5a;margin: 1rem 0 2rem 0;text-align: center;margin-left: -35rem}
.com-createform .input{width: 21rem}
.com-createform .isforever{margin-left: 0.2rem}
@media print {
  .Noprint{ display: none }
}
</style>
