<template>
  <div class="addadmin">
    <div class="addmanager">
    <h2>基本信息</h2>
    <div class="addmanager-form">
      <el-form :model="addadmin" ref="addadmin" label-width="120px" label-position="right" :rules="rules">
        <el-form-item label="管理员角色">
          <el-select v-model="addadmin.subRole" filterable placeholder="请选择" clearable class="input">
            <el-option v-for="item in myRight" :key="item" :label="item.name" :value="item.name" style="max-width:336px"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="管理员用户名" prop="username">
          <el-input v-model="addadmin.username" class="input" placeholder="5~16位,只能输入英文和数字"></el-input>
        </el-form-item>
          <el-form-item label="管理员密码" prop="password">
            <el-input v-model="addadmin.password" class="input" placeholder="6~16位,包含字母、数字及符号中任意三种组合"></el-input>
          </el-form-item>
          <el-form-item label="管理员姓名" prop="adminName">
            <el-input v-model="addadmin.adminName" class="input" placeholder="2~16位,只能输入中英文"></el-input>
          </el-form-item>
          <el-form-item label="管理员Email" prop="adminEmail">
            <el-input v-model="addadmin.adminEmail" class="input" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="管理员联系方式" prop="adminContact">
            <el-input v-model="addadmin.adminContact" class="input" placeholder="5~40位,只能输入中英文及数字"></el-input>
          </el-form-item>
          <el-form-item label="" prop="adminContact">
             <el-button type="primary" class="subBtn" @click="registAdmin"> 提交</el-button>
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
import { checkPassword, checkUsername, checkName, checkUserEmail, checkAdmincontact } from '@/behavior/regexp'
export default {
  beforeCreate () {
    this.$store.commit('startLoading')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'addadmin'
    })
    this.$store.commit('returnLocalStorage')
  },
  mounted () {
    invoke({
      url: api.subRoleList,
      method: api.post
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
        } else {
          var data = ret.data.payload.Items
          this.myRight = data
          this.$store.commit('closeLoading')
        }
      }
    )
  },
  data () {
    return {
      myRight: [], // 管理员身份列表
      addadmin: {
        role: 1,
        username: '',
        subRole: '',
        password: '',
        adminName: '',
        adminEmail: '',
        adminContact: ''
      },
      rules: {
        username: [
          {validator: checkUsername, trigger: 'blur'}
        ],
        password: [
          {validator: checkPassword, trigger: 'blur'}
        ],
        adminName: [
          {validator: checkName, trigger: 'blur'}
        ],
        adminEmail: [
          {validator: checkUserEmail, trigger: 'blur'}
        ],
        adminContact: [
          {validator: checkAdmincontact, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    registAdmin () {
      // console.log(this.addadmin)
      if (this.$store.state.checkform.username === false || this.$store.state.checkform.password === false || this.$store.state.checkform.name === false || this.$store.state.checkform.userContact === false || this.$store.state.checkform.userEmail === false) {
        this.$message({
          message: '请完善配置信息',
          type: 'error'
        })
      } else if (this.addadmin.subRole === '') {
        this.$message({
          message: '请选择管理员角色',
          type: 'warning'
        })
      } else {
        invoke({
          url: api.createAdmin,
          method: 'post',
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
            } else {
              var data = ret.payload
              // console.log(data)
              this.$message({
                message: '创建成功',
                type: 'success'
              })
              this.resetAdmin()
              this.$router.push('adminlist')
            }
          }
        )
      }
    },
    resetAdmin () {
      this.addadmin = {
        role: 1,
        username: '',
        subRole: '',
        password: '',
        adminName: '',
        adminEmail: '',
        adminContact: ''
      }
    }
  }
}
</script>

<style scpoed>
.addadmin h2{font-size: 1.8rem;font-weight: normal;padding: 1rem 0 2rem 0;color: #5a5a5a;margin-left: -1rem}
.addadmin .addmanager{width:36rem;margin: 0 auto;margin-top: 4rem}
.addadmin .input{width: 21rem;}
.addadmin .subBtn{margin-top: 1rem;margin-left: 2rem;margin-right: 4rem}
/**/

/**/
</style>
