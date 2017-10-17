<template>
  <div class="adminright">
    <div class="topBtn">
      <el-button type="primary" @click="goCreate">创建新角色</el-button>
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
      <el-pagination layout="prev, pager, next, sizes, jumper" :total="this.$store.state.variable.rightList.length" :page-sizes="[10, 20]" :page-size="nowSize" @size-change="getNowsize" @current-change="getNowpage"></el-pagination>
    </div>
    <div class="clearfix">
      <p class="title" style="float:left">权限列表</p>
      <el-button type="primary" style="float:right;margin-right:0.5%">提交修改</el-button>
    </div>
    <div class="rightSelect" v-loading="loading" element-loading-text="提交修改中">
      <el-tree :data="allRight.children" ref="tree" show-checkbox node-key="name" :props="defaultProps" :default-expand-all="true" :show-checkbox='true' @check-change="setRight">
      </el-tree>
      <!-- <el-checkbox-group v-model="selectRight">
        <el-checkbox v-for="item in allRight.children" :label="item" :key="item" style="display:block;margin:1rem 0 0 1rem">{{item.name}}</el-checkbox>
      </el-checkbox-group> -->
    </div>
  </div>
</template>

<script>
import { detailTime, formatRemark } from '@/behavior/format'
export default {
  beforeCreate () {
    this.$store.commit('startLoading')
    this.$store.commit('returnLocalStorage')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'adminright'
    })
    this.$store.dispatch('getRightlist')
    this.$store.dispatch('getAllright')
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
      return this.$store.state.variable.allRight
    }
  },
  data () {
    return {
      nowSize: 10,
      nowPage: 1,
      selectRight: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      loading: false
    }
  },
  watch: {
    // selectRight (val) {
    //   console.log('选中的值',val)
    // }
  },
  methods: {
    setRight (a,b,c) {
      // var hasParent = []
      // for (let item of this.allRight.children) {
        
      // }
      if (b) {
        this.selectRight.push(a.name)
      } else {
        var index = this.selectRight.indexOf(a.name)
        if (index > -1) {
          this.selectRight.splice(index, 1)
        }
        // for (let outside of this.allRight.children) {
        //   for (let inside of this.selectRight) {
        //     if (outside.children) {
        //       for (let final of outside.children) {
        //         if (final == inside) {
        //           console.log(123)
        //         }
        //       }
        //     }
        //   }
        // }
      }
    }, // 配置权限事件
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
    submitChange () {
      this.loading = true
      invoke({
      url: api.subRoleUpdate,
      method: api.psot,
      data: this.selectRight
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
        } else {
          var data = ret.data.payload
          context.commit({
            type: 'recordAllright',
            data: data
          })
          context.commit('closeLoading')
        }
      }
    )
    }, // 提交权限修改
  }
}
</script>

<style scoped>
.adminright .clearfix:after{clear:both;content:'.';display:block;width: 0;height: 0;visibility:hidden;}
.adminright .topBtn{margin-left: 0.5%}
.adminright .adminright-form{width: 99%;margin: 0 auto;margin-top: 1rem}
.adminright .page {padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 0.5rem;margin-top: 2rem}
.remarkBox{word-wrap: break-word; word-break: normal;width: 200px}

.adminright .title{font-size: 1.5rem;margin: 0 0 1rem 0.5%;color: #676A6D}
.adminright .rightSelect{width: 99%;margin: 1rem auto 4rem;}
</style>
