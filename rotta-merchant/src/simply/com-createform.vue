<template>
  <div class="com-createform">
    <h2 class="title">基本信息</h2>
    <el-form :model="merchantInfo" ref="merchantInfo" :rules="rules" label-width="120px" label-position="right">
        <el-form-item label="商户标识" prop="suffix">
          <el-input v-model="merchantInfo.suffix" class="input" placeholder="请输入"></el-input>
        </el-form-item>
          <el-form-item label="商户昵称" prop="displayName">
            <el-input v-model="merchantInfo.displayName" class="input" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="商户抽成比(%)" prop="rate">
            <el-input v-model="merchantInfo.rate" class="input" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="商户邮箱" prop="merchantEmail">
            <el-input v-model="merchantInfo.merchantEmail" class="input" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="负责人" prop="hostName">
            <el-input v-model="merchantInfo.hostName" class="input" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="负责人联系方式" prop="hostContact">
            <el-input v-model="merchantInfo.hostContact" class="input" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="所属线路商">
            <el-select v-model="merchantInfo.parent" placeholder="请选择" clearable class="input">
              <el-option v-for="item in parent" :key="item.value" :label="item.label" :value="item.value" style="max-width:336px"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="merchantInfo.remark" placeholder="请输入备注,最多不超过200个字符" type="textarea" :rows="3" class="input" :maxlength="200"></el-input>
          </el-form-item>
          <el-form-item label="生效时间" prop="contractPeriod">
            <el-date-picker v-model="merchantInfo.contractPeriod" type="daterange" placeholder="选择生效时间" class="input" label="生效时间" :editable='false' :disabled="merchantInfo.isforever"></el-date-picker><el-checkbox v-model="merchantInfo.isforever" class="isforever">永久</el-checkbox>
          </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {invoke} from '@/libs/fetchLib'
import api from '@/api/api'
import { checkSuffix, checkDisplayname, checkEmail, checkRate, checkHostname, checkHostcontact } from '@/behavior/regexp'
export default {
  name: 'com-createform',
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
      parent: [], // 可用上级商户列表
      merchantInfo: {
        suffix: '', // 商户标识
        displayName: '', // 商户昵称
        rate: '', // 商户抽成比
        merchantEmail: '', // 商户邮箱
        parent: '', // 上级商户
        remark: '', // 备注
        hostName: '', // 负责人
        hostContact: '', // 负责人联系方式
        contractPeriod: [], // 生效时间
        isforever: false // 是否永久有效
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
        rate: [
          {validator: checkRate, trigger: 'blur'}
        ],
        hostName: [
          {validator: checkHostname, trigger: 'blur'}
        ],
        hostContact: [
          {validator: checkHostcontact, trigger: 'blur'}
        ]
      }
    }
  },
  beforeDestroy () {
    if (this.merchantInfo.isforever === true) {
      this.merchantInfo.contractPeriod = 0
    }
    this.$store.commit({
      type: 'recordComcreate',
      data: this.merchantInfo
    })
  }
}
</script>

<style scoped>
.com-createform{width:34rem;margin: 0 auto;}
.title{font-weight: normal;color: #5a5a5a;margin: 1rem 0 2rem 0;text-align: center;margin-left: -35rem}
.input{width: 20rem}
.isforever{margin-left: 0.2rem}
</style>
