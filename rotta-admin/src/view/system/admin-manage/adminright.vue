<template>
  <div class="adminright">
    <div class="topBtn">
      <el-button type="primary" @click="goCreate">创建新角色</el-button>
    </div>
    <div class="adminright-form">
      <el-table border tooltip-effect="dark" :data="rightList">
          <el-table-column type="index" width="65" align="center" label="序号">
          </el-table-column>
          <el-table-column prop="name" label="角色名" align="center">
          </el-table-column>
          <el-table-column prop="permissions" label="权限" align="center">
            <template scope="scope">
              <div slot="reference" class="permissions">
                  <el-tag v-for="item in scope.row.permissions" key={{item}} type="primary">{{ item }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="createdAt" label="创建时间"  align="center" width="180">
            <template scope="scope">
              <span>{{formatTime(scope.row.createdAt)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" align="center">
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
          <el-table-column prop="permissions" label="操作" align="center" width="180">
            <template scope="scope">
              <span class="blue" @click="editRight(scope.$index, scope.row)">编辑</span> |
              <span class="blue" @click="deleteRight(scope.$index, scope.row)">删除</span>
            </template>
          </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination layout="prev, pager, next, sizes, jumper" :total="this.$store.state.variable.rightList.length" :page-sizes="[10, 20]" :page-size="nowSize" @size-change="getNowsize" @current-change="getNowpage"></el-pagination>
    </div>
    <div v-loading="loading" element-loading-text="提交修改中">
    <p class="title" v-if="this.isEdit">权限列表</p>
    <div class="btn-group" v-if="this.isEdit">
      <el-button type="primary" style="" @click="selectAll">全选</el-button>
      <el-button @click="resetRight">清空</el-button>
      <el-button type="primary" @click="submitChange">提交修改</el-button>
    </div>
    <div class="rightSelect" v-if="this.isEdit">
      <div v-for="item in allRight">
        <p v-if="!item.hasParent"> 
          <span v-if="item.children">{{item.name}}</span>
            <el-checkbox v-if="!item.children" :label="item.name" :key="item" @change="recordSelect(item)" v-model="item.isChecked">
              <span>
                {{item.name}}
              </span>
            </el-checkbox>
          <p style="margin-left:1rem;" v-for="second in item.children">
            <span v-if="second.children">
              {{second.name}}
            </span>
            <el-checkbox v-if="!second.children" :label="second.name" :key="second" @change="recordSelect(second)" v-model="second.isChecked">
              <span>{{second.name}}</span>
            </el-checkbox>
            <span style="margin-left:2rem;display:block" v-for="third in second.children">
              <el-checkbox :label="third.name" :key="third" @change="recordSelect(third)" v-model="third.isChecked">
                <span>{{third.name}}</span>
              </el-checkbox>
            </span>
          </p>
        </p>
      </div>
    </div>
    </div>
    
  </div>
</template>

<script>
import { detailTime, formatRemark } from '@/behavior/format'
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
import { rightList } from '@/variables/allright'
export default {
  beforeCreate () {
    this.$store.commit('startLoading')
    this.$store.commit('returnLocalStorage')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'adminright'
    })
    this.$store.dispatch('getRightlist')
  },
  computed: {
    rightList () {
      var list = this.$store.state.variable.rightList
      if (this.nowPage === 1) {
        list = this.$store.state.variable.rightList.slice(0, this.nowSize)
      } else {
        list = this.$store.state.variable.rightList.slice(((this.nowPage - 1) * this.nowSize), this.nowSize * this.nowPage)
      }
      return list
    },
    allRight () {
      return this.all
    },
  },
  data () {
    return {
      all: rightList,
      isEdit: false,
      nowSize: 10,
      nowPage: 1,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      loading: false,
      nowName: '', // 当前编辑用户
      remark: '', // 编辑用户备注
      selectRight: [] // 选中值
    }
  },
  // watch: {
  //   selectRight (val) {
  //     console.log('选中', val)
  //   }
  // },
  methods: {
    recordSelect (data) {
      if (data.isChecked) {
        this.selectRight.push(data.name)
      } else {
        var index = this.selectRight.indexOf(data.name);
        if (index > -1) {
          this.selectRight.splice(index, 1);
        }
      }
    }, // 选择权限
    selectAll () {
      this.selectRight = []
      for (let first of this.all) {
        first.isChecked = true
        if (!first.children) {
          this.selectRight.push(first.name)
        }
        for (let second of first.children) {
          second.isChecked = true
          if (!second.children) {
            this.selectRight.push(second.name)
          }
          for (let third of second.children) {
            third.isChecked = true
            this.selectRight.push(third.name)
          }
        }
      }
    }, // 全选
    resetRight () {
      for (let first of this.all) {
        first.isChecked = false
        for (let second of first.children) {
          second.isChecked = false
          for (let third of second.children) {
            third.isChecked = false
          }
        }
      }
      this.selectRight = []
    }, // 清空选择
    editRight (index, row) {
      this.nowName = row.name
      this.remark = row.remark
      this.resetRight()
      var all = []
      for (let checked of row.permissions) {
        for (let first of this.all) {
          if (first.name == checked) {
            first.isChecked = true
            all.push(first.name)
          }    
          for (let second of first.children) {
            if (second.name == checked) {
              second.isChecked = true
              all.push(second.name)
            }  
            for (let third of second.children) {
              if (third.name == checked) {
                third.isChecked = true
                all.push(third.name)
              }
            }
          }
        }
      }
      this.selectRight = all
      this.isEdit = true
    }, // 开启编辑权限
    submitChange () {
      if (this.selectRight.length == 0) {
        this.$message({
          type: 'error',
          message: '权限不能为空！'
        })
      } else {
        this.loading = true
        var data = {
          name: this.nowName,
          remark: this.remark,
          permissions: this.selectRight
        }
        invoke({
          url: api.subRoleUpdate,
          method: api.post,
          data: data
        }).then(
          result => {
            const [err, ret] = result
            if (err) {
            } else {
              this.$message({
                type: 'success',
                message: '修改成功！'
              })
              this.loading = false
              this.isEdit = false
              this.resetRight()
              this.selectRight = []
              this.$store.dispatch('getRightlist')
            }
          }
        )
      }
    }, // 提交权限修改
    deleteRight (index, row) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var data = {
          name: row.name
        }
        invoke({
          url: api.subRoleDelete,
          method: api.post,
          data: data
        }).then(
          result => {
            const [err, ret] = result
            if (err) {
            } else {
              this.$message({
                type: 'success',
                message: '删除成功！'
              })
              this.$store.dispatch('getRightlist')
            }
          }
        )
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })      
      })
    }, // 删除权限角色
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
    },
    goCreate () {
      this.$router.push('addcharacter')
      this.$store.commit({
        type: 'recordNowindex',
        data: 'addcharacter'
      })
    }, // 跳转至创建新权限页面
  }
}
</script>

<style scoped>
.adminright{margin: 2rem 0 5rem 0}
.adminright .topBtn{margin-left: 0.5%}
.adminright .adminright-form{width: 99%;margin: 0 auto;margin-top: 1rem}
.adminright .page {padding-bottom: 1rem;text-align: right;margin-right: 1%;margin-top: 0.5rem;margin-top: 2rem}
.remarkBox{word-wrap: break-word; word-break: normal;width: 200px}

.adminright .title{font-size: 1.5rem;margin: 0 0 1rem 0.5%;color: #676A6D}
.adminright .btn-group{margin-left: 0.5%}
.adminright .rightSelect{width: 95%;margin: 1rem auto;}
.adminright .rightSelect span,
.adminright .rightSelect p{line-height: 2rem}
.adminright .blue{cursor: pointer;color: #20a0ff;margin:0 0.5rem;}
.adminright .blue:hover{text-decoration: underline;text-decoration-color: #20a0ff}
.adminright .permissions{text-align: left;padding: 0.5rem 0}
.adminright .permissions span{display: inline-block;text-align: center;margin:0.2rem;}
</style>
