<template lang="html">
  <div class="lineup">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="排队开关" prop="status">
        <el-radio-group v-model="ruleForm.status">
          <el-radio label="开"></el-radio>
          <el-radio label="关"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排队人数(人)" prop="">
        <el-input-number v-model="ruleForm.countPeople" :min="1" :max="1000" :disabled="ruleForm.status === '关' || ruleForm.status ===''"></el-input-number>
      </el-form-item>
      <el-form-item label="排队时间(秒)" prop="">
        <el-input-number v-model="ruleForm.countTime" :min="1" :max="10000" :disabled="ruleForm.status === '关' || ruleForm.status ===''"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
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
      data: 'lineup'
    })
    this.$store.commit('returnLocalStorage')
  },
  watch: {
    'ruleForm.status': function(_new,_old) {
      if(_new === '关'){
        this.ruleForm.countPeople = ''
        this.ruleForm.countTime = ''
      }
    }
  },
  data() {
    return {
      ruleForm: {
        status: '',
        countPeople: 1,
        countTime: 1
      },
      rules: {
        status: [
          { required: true, message: '请设置排队开关', trigger: 'change' }
        ]
      }
    };
  },
  mounted() {
    const data = { code: 'queue'}
    invoke({
      url: api.lineUpGet,
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
          // console.log(ret)
          ret.data.payload.status === 1 ? ret.data.payload.status = '开' : ret.data.payload.status = '关'
          this.ruleForm = {
            status: ret.data.payload.status,
            countPeople: ret.data.payload.countPeople,
            countTime: ret.data.payload.countTime
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
        data.status === '开' ? data.status = 1 : data.status = 0
        if (valid) {
          invoke({
            url: api.lineUp,
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
            message: '请根据减示设置',
            type: 'error'
          })
          return false;
        }
      })
    }
  }
}
</script>

<style lang="css">
.lineup {
  width: 40rem;
  margin: 15% auto;
}
</style>
