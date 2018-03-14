<template lang="html">
  <div class="bfsetting">
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <h2>包房代理配置</h2>
      <el-form-item label="庄对" prop="">
        <el-input-number v-model="ruleForm.banker" :min="0" :max="50"></el-input-number>
        %
      </el-form-item>
      <el-form-item label="对冲" prop="">
        <el-input-number v-model="ruleForm.hedging" :min="0" :max="50"></el-input-number>
        %
      </el-form-item>
      <el-form-item label="余量" prop="">
        <el-input-number v-model="ruleForm.remain" :min="0" :max="50"></el-input-number>
        %
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
export default {
  beforeCreate () {
    this.$store.commit('startLoading')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'bfsetting'
    })
    this.$store.commit('returnLocalStorage')
  },
  data() {
    return {
      ruleForm: {
        banker: 0,
        hedging: 0,
        remain: 0,
        code: 'bfagent'
      }
    };
  },
  mounted() {
    const data = { code: 'bfagent'}
    invoke({
      url: api.getBfSetting,
      method: api.post,
      data: data
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
          this.$message({
            message: err.msg,
            type: 'error'
          })
        } else {
          this.ruleForm = {
            code: 'bfagent',
            banker: ret.data.payload.banker,
            hedging: ret.data.payload.hedging,
            remain: ret.data.payload.remain
          }
          this.$store.commit('closeLoading')
        }
      }
    )
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        let data = Object.assign({}, this.ruleForm)
        if (valid) {
          invoke({
            url: api.bfSetting,
            method: api.post,
            data: data
          }).then(
            result => {
              const [err, ret] = result
              if (err) {
                this.$message({
                  message: err.msg,
                  type: 'error'
                })
              } else {
                this.$message({
                  message: '设置成功',
                  type: 'success'
                })
              }
            }
          )
        } else {
          this.$message({
            message: '请根据提示设置',
            type: 'error'
          })
          return false;
        }
      })
    },
    resetForm () {
      this.ruleForm = {
        banker: 0,
        hedging: 0,
        remain: 0,
        code: 'bfagent'
      }
    }
  }
}
</script>

<style lang="css" scoped>
.bfsetting {
  width: 40rem;
  margin: 1rem 1rem;
}
.bfsetting h2 {
  margin-bottom: 5rem;
}
</style>
