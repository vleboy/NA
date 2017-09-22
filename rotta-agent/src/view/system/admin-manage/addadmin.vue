<template>
  <div class="addadmin">
    <div class="addmanager">
    <h2>基本信息</h2>
    <div class="addmanager-form">
      <el-form :model="addadmin" ref="addadmin" label-width="120px" label-position="right" :rules="rules">
        <el-form-item label="管理员用户名" prop="username">
          <el-input v-model="addadmin.username" class="input" placeholder="请输入"></el-input>
        </el-form-item>
          <el-form-item label="管理员密码" prop="password">
            <el-input v-model="addadmin.password" class="input" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="" prop="adminContact">
             <el-button type="primary" class="subBtn" @click="registAdmin" :loading="loading"> 提交</el-button>
             <el-button type="primary" class="subBtn" @click="resetAdmin"> 重置</el-button>
          </el-form-item>
      </el-form>
    </div>
    
  </div>
  </div>
</template>
<script>
import {invoke} from '@/libs/fetchLib'
import api from '@/api/api'
import { checkPassword, checkUsername } from '@/behavior/regexp'
export default {
  beforeCreate () {
    this.$store.commit({
      type: 'recordNowindex',
      data: 'addadmin'
    })
    this.$store.commit('returnLocalStorage')
  },
  data () {
    return {
      loading: false,
      addadmin: {
        role: 1000,
        username: '',
        password: ''
      },
      rules: {
        username: [
          {validator: checkUsername, trigger: 'blur'}
        ],
        password: [
          {validator: checkPassword, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    registAdmin () {
      // console.log(this.addadmin)
      if (this.$store.state.checkform.username === false || this.$store.state.checkform.password === false) {
        this.$message({
          message: '请完善配置信息',
          type: 'error'
        })
      } else {
        this.loading = true
        invoke({
          url: api.adminNew,
          method: api.post,
          data: this.addadmin
        }).then(
          result => {
            const [err, ret] = result
            if (err) {
              this.$message({
                message: err.msg,
                type: 'error'
              })
              this.resetAdmin()
              this.loading = false
            } else {
              var data = ret.payload
              console.log(data)
              this.$message({
                message: '创建成功',
                type: 'success'
              })
              this.resetAdmin()
              this.loading = false
              this.$router.push('adminlist')
            }
          }
        )
      }
    },
    resetAdmin () {
      this.addadmin = {
        username: '',
        password: ''
      }
    }
  }
}
</script>

<style scpoed>
.addadmin h2{font-size: 1.8rem;font-weight: normal;padding: 1rem 0 2rem 0;color: #5a5a5a;margin-left: -1rem}
.addadmin .addmanager{width:36rem;margin: 0 auto;margin-top: 4rem}
.addadmin .input{width: 20rem;}
.addadmin .subBtn{margin-top: 1rem;margin-left: 2rem;margin-right: 4rem}
/**/

/**/
</style>
