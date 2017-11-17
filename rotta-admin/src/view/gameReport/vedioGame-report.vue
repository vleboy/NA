<template>
  <div class="vedioGame-report">

    <div class="nowUserlist">
      <p class="title">当前选择列表<span v-if="nowRole != 01" class="fontUrl" @click="goBack()" style="font-size:1.2rem;font-weight:normal;margin-left:1rem">回到上一级</span></p>
      <el-table :data="vedioNowlist" stripe>
        <el-table-column label="序号" prop="rank" align="center" width="75" type="selection">
        </el-table-column>
        <el-table-column label="类型" prop="role" align="center" :formatter="userType">
        </el-table-column>
        <el-table-column label="昵称" prop="displayName" align="center">
        </el-table-column>
        <el-table-column label="管理员账号" prop="username" align="center">
        </el-table-column>
        <el-table-column label="交易次数" prop="rank" align="center">
        </el-table-column>
        <el-table-column label="投注金额" prop="rank" align="center">
        </el-table-column>
        <el-table-column label="输赢金额" prop="rank" align="center">
        </el-table-column>
        <el-table-column label="获利比例" prop="rank" align="center">
        </el-table-column>
      </el-table>
      <div class="page">
          <el-pagination layout="prev, pager, next, sizes, jumper" :total="1"></el-pagination>
        </div>
    </div>

    <div class="childlist">
      <p class="title">下级列表</p>
      <el-table :data="vedioNowchild" stripe>
        <el-table-column label="序号" prop="" align="center" width="75" type="selection">
        </el-table-column>
        <el-table-column label="类型" prop="role" align="center" :formatter="userType">
        </el-table-column>
        <el-table-column label="昵称" prop="displayName" align="center">
           <template scope="scope">
            <span class="fontUrl" @click="checkUser(scope.row)">{{scope.row.displayName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="管理员账号" prop="uname" align="center">
        </el-table-column>
        <el-table-column label="交易次数" prop="rank" align="center">
        </el-table-column>
        <el-table-column label="投注金额" prop="rank" align="center">
        </el-table-column>
        <el-table-column label="输赢金额" prop="rank" align="center">
        </el-table-column>
        <el-table-column label="获利比例" prop="rank" align="center">
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination layout="prev, pager, next, sizes, jumper" :total="1"></el-pagination>
      </div>
    </div>

    <div class="playerlist">
      <p class="title">所属玩家列表</p>
      <el-table :data="vedioNowplayer" stripe>
        <el-table-column label="序号" prop="rank" align="center" width="75" type="selection">
        </el-table-column>
        <el-table-column label="用户名" prop="rank" align="center">
        </el-table-column>
        <el-table-column label="昵称" prop="rank" align="center">
        </el-table-column>
        <el-table-column label="交易次数" prop="rank" align="center">
        </el-table-column>
        <el-table-column label="投注金额" prop="rank" align="center">
        </el-table-column>
        <el-table-column label="输赢金额" prop="rank" align="center">
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination layout="prev, pager, next, sizes, jumper" :total="1"></el-pagination>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  beforeCreate () {
    this.$store.commit({
      type: 'recordNowindex',
      data: 'vedioGameReport'
    })
    this.$store.commit('returnLocalStorage')
    this.$store.commit({
      type: 'recordVedioID',
      data: ''
    })
    this.$store.commit('startLoading')
    this.$store.dispatch('getVedioNowlist')
    this.$store.dispatch('getVedioNowchild')
    this.$store.dispatch('getVedioNowplayer')
  },
  computed:{
    vedioNowlist () {
      let arr = []
      this.nowRole = this.$store.state.variable.vedioGameData.nowList.role
      arr.push(this.$store.state.variable.vedioGameData.nowList)
      return arr
    },
    vedioNowchild () {
      return this.$store.state.variable.vedioGameData.nowChildList
    },
    vedioNowplayer () {
      return this.$store.state.variable.vedioGameData.nowPlayerlist
    }
  },
  data () {
    return {
      nowRole: ''
    }
  },
  methods: {
    userType (data) {
      if (data.role == '1') {
        return '管理员'
      } else if (data.role == '10') {
        return '线路商'
      } else {
        return '商户'
      }
    },
    checkUser (data) {
      this.$store.commit({
        type: 'recordVedioID',
        data: data.userId
      })
      this.$store.commit('startLoading')
      this.$store.dispatch('getVedioNowlist')
      this.$store.dispatch('getVedioNowchild')
      this.$store.dispatch('getVedioNowplayer')
    },
    goBack () {
      var data = this.$store.state.variable.vedioGameData.nowList[0].parent
      this.$store.commit({
        type: 'recordVedioID',
        data: data
      })
      this.$store.commit('startLoading')
      this.$store.dispatch('getVedioNowlist')
      this.$store.dispatch('getVedioNowchild')
      this.$store.dispatch('getVedioNowplayer')
    }
  }
}
</script>

<style scpoed>
.vedioGame-report .page{padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 0.5rem;margin-top: 2rem}
.vedioGame-report .title{font-size: 1.5rem;margin: 0 0 0.5rem 0;font-weight: 600;display: inline-block}
.vedioGame-report .nowUserlist,
.vedioGame-report .childlist,
.vedioGame-report .playerlist{width: 99%;margin: 2rem auto}
.vedioGame-report .fontUrl{cursor: pointer;color: #20a0ff}
.vedioGame-report .fontUrl:hover{text-decoration: underline;}
</style>
