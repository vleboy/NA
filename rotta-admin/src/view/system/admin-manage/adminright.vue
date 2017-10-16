<template>
  <div class="adminright">
    <div class="topBtn">
      <el-button type="primary">创建新角色</el-button>
    </div>
    <div class="adminright-form">
      <el-table border tooltip-effect="dark" :data="rightList">
          <el-table-column type="index" width="65" align="center" label="序号">
          </el-table-column>
          <el-table-column prop="uname" label="角色名" align="center">
          </el-table-column>
          <el-table-column prop="adminName" label="权限" align="center">
          </el-table-column>
          <el-table-column prop="createdAt" label="创建时间"  align="center">
            <template scope="scope">
              <span>{{formatTime(scope.row.createdAt)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="adminEmail" label="备注" align="center">
            <template scope="scope">
              <el-popover trigger="hover" placement="bottom">
                <div class="remarkBox">
                  <p>{{ Remark(scope.row.remark) }}</p>
                </div>
                <div slot="reference" class="">
                  <el-icon name="search" style="color:#108ee9"></el-icon>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作" align="center">
            <template scope="scope">
              <span class="blue" @click="changePassword(scope.$index, scope.row)">编辑</span>
            </template>
          </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination layout="prev, pager, next, sizes, jumper" :total="10" :page-sizes="[20, 50]" :page-size="nowSize" @size-change="getNowsize" @current-change="getNowpage"></el-pagination>
    </div>
    <p class="title">权限列表</p>
    <div class="rightSelect" :disable="true">
      <el-checkbox-group v-model="selectRight">
        <el-checkbox v-for="item in allRight" :label="item" :key="item" style="display:inline-block;margin-left:0.25rem">{{item}}</el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
import { detailTime, formatRemark } from '@/behavior/format'
export default {
  beforeCreate () {
    // this.$store.commit('startLoading')
    this.$store.commit('returnLocalStorage')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'adminright'
    })
  },
  data () {
    return {
      rightList: [],
      nowSize: 20,
      nowPage: 1,
      selectRight: [],
      allRight: []
    }
  },
  methods: {
    formatTime (data) {
      return detailTime(data)
    },
    Remark (data) {
      return formatRemark(data)
    },
    getNowsize (size) {
      this.nowSize = size
      // console.log('当前每页:' + size)
    },
    getNowpage (page) {
      this.nowPage = page
      // console.log('当前是第:' + page + '页')
    }
  }
}
</script>

<style scoped>
.adminright .topBtn{margin-left: 0.5%}
.adminright .adminright-form{width: 99%;margin: 0 auto;margin-top: 1rem}
.adminright .page {padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 0.5rem;margin-top: 2rem}
.remarkBox{word-wrap: break-word; word-break: normal;width: 200px}

.adminright .title{font-size: 1.5rem;margin: 0 0 1rem 0.5%;color: #676A6D}
.adminright .rightSelect{width: 99%;margin: 0 auto;margin-top: 1rem;border:1px solid #676A6D;min-height: 400px}
</style>
