<template>
  <div class="addadmin">
    <div class="addmanager">
    <h2>基本信息</h2>
    <div class="addmanager-form">
      <el-form :model="addadmin" ref="addadmin" label-width="120px" label-position="right">
        <el-form-item label="管理员用户名" prop="username">
          <el-input v-model="addadmin.username" class="input" placeholder="请输入"></el-input>
        </el-form-item>
          <el-form-item label="管理员密码" prop="password">
            <el-input v-model="addadmin.password" class="input" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="管理员姓名" prop="adminName">
            <el-input v-model="addadmin.adminName" class="input" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="管理员Email" prop="adminEmail">
            <el-input v-model="addadmin.adminEmail" class="input" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="管理员联系方式" prop="adminContact">
            <el-input v-model="addadmin.adminContact" class="input" placeholder="请输入"></el-input>
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
      addadmin: {
        username: '',
        password: '',
        adminName: '',
        adminEmail: '',
        adminContact: ''
      }
    }
  },
  methods: {
    registAdmin () {
    },
    resetAdmin () {
      this.addadmin = {
        username: '',
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
.addadmin .addmanager{width:34rem;margin: 0 auto;margin-top: 4rem}
.addadmin .addmanager-form .input{width: 18rem;}
.addadmin .addmanager-form .subBtn{margin-top: 1rem;margin-left: 2rem;margin-right: 4rem}
/**/

/**/
</style>
