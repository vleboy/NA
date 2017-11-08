<template>
  <div class="adminlist">
    <searchbox></searchbox>
    <div class="search">
      <p>共搜索到 {{count}} 条数据</p>
    </div>
    <div class="adminlist-form">
      <el-table border tooltip-effect="dark" :data="adminList">
          <el-table-column type="index" width="65" align="center" label="序号">
          </el-table-column>
          <el-table-column prop="uname" label="用户名" align="center">
          </el-table-column>
          <el-table-column prop="adminName" label="真实姓名" align="center">
          </el-table-column>
          <el-table-column prop="subRole" label="管理员角色" align="center">
            <template scope="scope">
              <span>{{formatRole(scope.row.subRole)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="points" label="剩余点数" align="center">
            <template scope="scope">
              <span>{{formatPoints(scope.row.balance)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createdAt" label="创建时间"  align="center">
            <template scope="scope">
              <span>{{formatTime(scope.row.createdAt)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="adminEmail" label="邮箱" align="center">
          </el-table-column>
          <el-table-column prop="" label="操作" align="center">
            <template scope="scope">
              <span class="blue" @click="changePassword(scope.$index, scope.row)">修改密码</span> | 
              <span class="blue" @click="changeRight(scope.$index, scope.row)">修改角色</span>
            </template>
          </el-table-column>
      </el-table>
    </div>
    <div style="text-align:right;margin: 2rem 2rem 0 0">
        <el-button type='primary'>上一页</el-button>
        <el-button type='primary'>下一页</el-button>
    </div>
    <el-dialog title="修改密码" :visible.sync="changepassword" size="tiny" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" class="billTransfer">
        <el-form :model="passwordAbout" :ref="passwordAbout" :rules="rules" label-width="100px" label-position="right" v-if="isfinish === false">
            <el-form-item label="新密码" style="margin-left:10%" prop="newPassword">
              <el-input placeholder="请输入新密码" v-model="passwordAbout.newPassword" class="input"></el-input>
            </el-form-item>
            <el-form-item label="重复新密码" style="margin-left:10%" prop="repeatNew">
              <el-input placeholder="请重复新密码" v-model="passwordAbout.repeatNew" class="input"></el-input>
            </el-form-item>
        </el-form>
        <div class="bottom-btn" v-if="isfinish === false">
          <el-button @click="cancel(passwordAbout)" class="distance">取 消</el-button>
          <el-button type="primary" @click="postChange">继 续</el-button>
        </div>
        <div v-if="isfinish === true">
          <p class="success"><i class="el-icon-circle-check"></i>修改成功</p>
          <div style="text-align:center">
            <el-button type="primary" @click="confirm()">确定</el-button>
          </div>
        </div>
    </el-dialog>

    <el-dialog title="修改角色" :visible.sync="changeright" size="tiny" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" class="billTransfer">
        <div style="text-align:center;padding-bottom:5rem" v-if="!isfinish">
          <el-select v-model="changeData.subRole" filterable placeholder="请选择" clearable class="input">
            <el-option v-for="item in myRight" :key="item" :label="item.name" :value="item.name" style="max-width:336px"></el-option>
          </el-select>
        </div>
        <div class="bottom-btn" v-if="!isfinish">
          <el-button @click="cancelChange" class="distance">取 消</el-button>
          <el-button type="primary" @click="postRightChange" :loading="loading">继 续</el-button>
        </div>
        <div v-if="isfinish">
          <p class="success"><i class="el-icon-circle-check"></i>修改成功</p>
          <div style="text-align:center">
            <el-button type="primary" @click="confirmChange">确定</el-button>
          </div>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import { detailTime, formatPoints } from '@/behavior/format'
import {invoke} from '@/libs/fetchLib'
import api from '@/api/api'
import Searchbox from '@/components/searchbox'
export default {
  components: {
    Searchbox
  },
  beforeCreate () {
    this.$store.commit('startLoading')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'adminlist'
    })
    this.$store.commit('returnLocalStorage')
    this.$store.commit({
        type: 'postSearch_conditon',
        data: {}
      })
  },
  created () {
    this.$store.dispatch('getAdminlist')
  },
  computed: {
    adminList () {
      return this.$store.state.variable.adminList
    },
    count () {
      return this.$store.state.variable.adminList.length
    }
  },
  data () {
    var checkNewPassword = (rule, value, callback) => {
      var password = function passwordLevel (password) {
        var Modes = 0
        for (let i = 0; i < password.length; i++) {
          Modes |= CharMode(password.charCodeAt(i))
        }
        return bitTotal(Modes)
        // CharMode函数
        function CharMode (iN) {
          if (iN >= 48 && iN <= 57) {
            return 1
          } // 数字
          if (iN >= 65 && iN <= 90) {
            return 2
          } // 大小写
          if ((iN >= 97 && iN <= 122) || (iN >= 65 && iN <= 90)) {
            return 4
          } else {
            return 8
          } // 特殊字符
        }
        // bitTotal函数
        function bitTotal (num) {
          let modes = 0
          for (let i = 0; i < 4; i++) {
            if (num & 1) modes++
            num >>>= 1
          }
          return modes
        }
      }
      if (value === '') {
        callback(new Error('密码不能为空'))
        this.checknew = false
      } if (value === this.oldPassword) {
        callback(new Error('密码不能与原密码一致'))
        this.checknew = false
      } else if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
        this.checknew = false
      } else if (value.length > 16) {
        callback(new Error('密码不能多于16位'))
        this.checknew = false
      } else {
        var x = password(value)
        if (x < 3) {
          callback(new Error('密码必须包含大写字母、小写字母、数字、符号，中任意三种的组合'))
          this.checknew = false
        } else {
          value = value.trim()
          this.checknew = true
          callback()
        }
      }
    } // 验证密码
    var checkRepeatNew = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请重复新密码'))
        this.repeatNew = false
      } else if (value !== this.passwordAbout.newPassword) {
        callback(new Error('两次密码输入不一致'))
        this.repeatNew = false
      } else {
        value = value.trim()
        this.repeatNew = true
        callback()
      }
    } // 验证重复输入密码
    return {
      loading: false,
      changeright: false,
      changepassword: false,
      isfinish: false,
      userId: '',
      oldPassword: '',
      myRight: [], // 管理员角色列表
      changeData: {
        userId: '',
        subRole: ''
      },
      passwordAbout: {
        newPassword: '',
        repeatNew: ''
      },
      checknew: false,
      repeatnew: false,
      rules: {
        newPassword: [
          {validator: checkNewPassword, trigger: 'blur'}
        ],
        repeatNew: [
          {validator: checkRepeatNew, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    confirm () {
      this.changepassword = false
      this.isfinish = false
      this.userId = ''
      this.oldPassword = ''
      this.passwordAbout = {
        newPassword: '',
        repeatNew: ''
      }
      this.checknew = false
      this.repeatnew = false
    }, // 修改密码相关
    cancel () {
      this.changepassword = false
      this.$refs[this.passwordAbout].resetFields()
    }, // 修改密码相关
    formatRole (user) {
      if (user === 'admin') {
        user = '平台管理员'
      } else if (user === 'president') {
        user = '总裁'
      } else if (user === 'marketing') {
        user = '市场部管理员'
      } else if (user === 'operation') {
        user = '运营部管理员'
      } else if (user === 'finance') {
        user = '财务部管理员'
      }
      return user
    }, // 格式化管理员角色
    formatTime (time) {
      return detailTime(time)
    }, // 格式时间
    formatPoints (points) {
      return formatPoints(points)
    },
    changePassword (index, row) {
      // console.log('管理员密码为', row.password)
      this.userId = row.userId
      this.oldPassword = row.password
      this.changepassword = true
      this.isfinish = false
      this.passwordAbout.newPassword = ''
      this.passwordAbout.repeatNew = ''
    },
    postChange () {
      if (this.checknew === true && this.repeatNew === true) {
        var data = {
          userId: this.userId,
          password: this.passwordAbout.newPassword
        }
        invoke({
          url: api.changePassword,
          method: api.post,
          data: data
        }).then(
          result => {
            const [err, ret] = result
            if (err) {
            } else {
              var data = ret.data.payload
              // console.log(data)
              this.isfinish = true
              this.$store.dispatch('getAdminlist')
            }
          }
        )
      } else {
        this.$message({
          message: '请完善修改信息',
          type: 'error'
        })
      }
    }, // 传输修改密码
    changeRight (index, row) {
      this.changeright = true
      this.changeData.userId = row.userId
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
          }
        }
      )
      // console.log('这个逼的数据', row)
    }, // 开启修改角色
    postRightChange () {
      if (!this.changeData.subRole) {
        this.$message({
          type: 'warning',
          message: '请选择您的新角色！'
        })
      } else {
        this.loading = true
        invoke({
          url: api.adminUpdate,
          method: api.post,
          data: this.changeData
        }).then(
          result => {
            const [err, ret] = result
            if (err) {
              this.loading = false
            } else {
              this.$store.dispatch('getAdminlist')
              this.isfinish = true
              this.loading = false
            }
          }
        )
      }
    }, // 传递修改角色
    cancelChange () {
      this.changeright = false
      this.changeData = {
        userId: '',
        subRole: ''
      }
    }, // 取消修改角色
    confirmChange () {
      this.changeright = false
      this.isfinish = false
      this.changeData = {
        userId: '',
        subRole: ''
      }
    } // 确认角色修改
  }
}
</script>

<style scpoed>
.adminlist .search{margin-left: 2rem;margin-top: 2rem}
.adminlist .search p{padding-bottom: 1rem}
.adminlist .adminlist-form{width: 99%;margin: 0 auto;margin-top: 1rem}
.adminlist .blue{cursor: pointer;color: #20a0ff}
.adminlist .billTransfer .bottom-btn{text-align: center;}
.adminlist .billTransfer .distance{margin-right: 10%}
.adminlist .billTransfer .dialogInput{width: 80%}
.adminlist .billTransfer .success{text-align: center;margin-bottom: 2rem}
.adminlist .billTransfer .el-icon-circle-check{color: #00CC00;font-size: 1.5rem;vertical-align: -0.2rem;margin-right: 0.5rem}
.adminlist .billTransfer .success-content-one{text-align: center;margin-bottom: 2rem;color: #00CC00}
.adminlist .billTransfer .success-content-two{text-align: center;margin-bottom: 2rem;color: #FF3300}
.adminlist .billTransfer .input{max-width: 18rem;}
.adminlist .billTransfer .isforever{margin-left: 0.2rem}
</style>
