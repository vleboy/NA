<template>
  <div class="managerloginlist">
    <el-row class="-search">
      <el-col :span="11">
        <span>代理昵称: </span>
        <el-input placeholder="请输入" class="input" v-model="searchInfo.displayName"></el-input>
      </el-col>
      <el-col :span="11">
        <span>代理账号：</span>
        <el-input placeholder="请输入" class="input" v-model="searchInfo.username"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="getMerchant_LoginList">搜索</el-button>
      </el-col>
    </el-row>
    <div class="search">
      <p>共搜索到 {{count}} 条数据</p>
      <!-- <el-button type="primary">导出excel</el-button> -->
    </div>
    <div class="outdate-list">
      <el-table stripe :data="loginList">
        <el-table-column label="序号" prop="" align="center" width="65" type="index">
        </el-table-column>
        <!-- <el-table-column label="代理标识" prop="suffix" align="center">
        </el-table-column> -->
        <el-table-column label="代理管理员昵称" prop="displayName" align="center">
        </el-table-column>
        <el-table-column label="代理管理员账号" prop="username" align="center">
          <template scope="scope">
            <span>{{(scope.row.username)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="最后登录IP" prop="lastIP"  align="center">
        </el-table-column>
        <el-table-column label="最后登录时间" prop="lastLogin" min-width="95" align="center">
          <template scope="scope">
            <span>{{formatTime(scope.row.lastLogin)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="status" align="center">
          <template scope="scope">
            <p v-if="scope.row.userStatus === 0" class="red"><span class="statusIcon1">&middot;</span>锁定</p>
            <p v-if="scope.row.userStatus === 1" class="green"><span class="statusIcon2">&middot;</span>正常</p>
          </template>
        </el-table-column>
        <el-table-column label="账号详情" prop="detail" align="center">
          <template scope="scope">
            <p v-if="scope.row.ret === 'N'" class="red"><span class="statusIcon1">&middot;</span>{{scope.row.detail}}</p>
            <p v-if="scope.row.ret === 'Y'" class="green"><span class="statusIcon2">&middot;</span>{{scope.row.detail}}</p>
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作" align="center" min-width="65">
            <template scope="scope">
              <el-button type="text" @click="lockUser(scope.$index, scope.row)" v-if="scope.row.userStatus === 1">锁定</el-button>
              <el-button type="text" @click="unlockUser(scope.$index, scope.row)" v-if="scope.row.userStatus === 0">解锁</el-button>
            </template>
        </el-table-column> -->
      </el-table>
    </div>
    <!--<div style="text-align:right;margin: 2rem 2rem 0 0">-->
      <!--<el-button type='primary'>上一页</el-button>-->
      <!--<el-button type='primary'>下一页</el-button>-->
    <!--</div>-->
  </div>
</template>
<script type="text/ecmascript-6">
import { detailTime, formatUsername } from '@/behavior/format'
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
export default {

  beforeCreate () {
    this.$store.commit('startLoading')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'managerloginlist'
    })
    this.$store.commit('returnLocalStorage')
  },
  data () {
    return {
      searchInfo :{
        displayName: '',
        username: ''
      },
      managerList: []
    }
  },
  computed: {
    loginList () {
      return this.managerList
    },
    count () {
      return this.managerList.length
    }
  },
  mounted(){
    this.getMerchant_LoginList()
  },
  methods: {
    user (name) {
      return formatUsername(name)
    },
    formatTime (time) {
      return detailTime(time)
    }, // 格式时间
    getMerchant_LoginList () {
      if(this.searchInfo.displayName == ''){
        delete this.searchInfo.displayName
      }
      if (this.searchInfo.username == '') {
        delete this.searchInfo.username
      }
      invoke({
        url: api.loginList,
        method: api.post,
        data: {
          role: '1000',
          type: 'login',
          pageSize: '20',
          startKey: null,
          level: 0,
          query: this.searchInfo
        }
      }).then(
        result => {
          const [res, ret] = result
          if (res) {
          } else {
            this.managerList = ret.data.payload.Items
          }
          this.$store.commit('closeLoading')
        }
      )
    } // 获取代理登录日志
  }
}
</script>

<style scpoed>
  .managerloginlist{margin:2rem}
.managerloginlist .search{margin-top: 1rem}
.managerloginlist .search{margin-top: 1rem}
.managerloginlist .-search{ background-color: #f5f5f5; text-align: center;padding:2rem}
.managerloginlist .-search .input{width: 80%}
.managerloginlist .outdate-list{width: 100%;margin-top: 1rem}
.managerloginlist .green{color: #00CC00}
.managerloginlist .red{color: #FF3300}
.managerloginlist .statusIcon1{font-size: 2rem;color:#F04134;display: inline-block;margin-right: 0.2rem;vertical-align: -0.3rem}
.managerloginlist .statusIcon2{font-size: 2rem;color:#00A854;display: inline-block;margin-right: 0.2rem;vertical-align: -0.3rem}
</style>
