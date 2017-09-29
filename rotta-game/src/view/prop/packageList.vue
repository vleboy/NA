<template>
  <div>
    <div class="packageList -search">
      <el-row class="transition-box">
        <el-col :span="10">
          <span>礼包ID: </span>
          <el-input placeholder="请输入" class="input" v-model="searchInfo.packageId"></el-input>
        </el-col>
        <el-col :span="10">
          <span>礼包名称：</span>
          <el-input placeholder="请输入" class="input" v-model="searchInfo.packageName"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="startSearch">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-col>
      </el-row>
    </div>
    <p class="searchResult">共搜索到 {{packageList.length || 0}} 条数据</p>
    <el-button type="primary" class="justfy1" @click="openModal()">创建新礼包</el-button>
    <div class="packageList">
      <el-table stripe :data="getItems">
        <el-table-column label="礼包id" prop="packageId" align="center">
        </el-table-column>
        <el-table-column type="expand">
          <template scope="scope">
            礼包内容：
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item v-for="item in scope.row.content" :key="item.id">
                <span>{{item.toolName}} x {{item.toolNum}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="礼包名称" prop="packageName" align="center">
        </el-table-column>
        <el-table-column label="图标" prop="icon" align="center">
        </el-table-column>
        <el-table-column label="持续时间" prop="duration" align="center">
          <template scope="scope">
            {{scope.row.duration == 0 ? '永久' : (scope.row.duration + '天')}}
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createdAt" :formatter="getAtime">
        </el-table-column>
        </el-table-column>
        <el-table-column label="状态" align="center" width="90" class-name="green">
          <template scope="scope">
            <el-tag :type="scope.row.packageStatus ? 'success' : 'gray'">
              {{packageStatus[scope.row.packageStatus]}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center" >
          <template scope="scope">
            <el-popover trigger="hover" placement="bottom-start" width="250">
              <div class="remarkBox">{{ scope.row.remark === 'NULL!' ? '' : scope.row.remark}}</div>
              <div slot="reference" class="">
                <el-icon name="search" style="color:#108ee9"></el-icon>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="100">
          <template scope="scope">
            <el-button type="text" class="myBtn" @click="changeStatus(scope.row)">{{scope.row.packageStatus ? '锁定' : '解锁'}}</el-button>
            <el-button type="text" @click="openModal(scope.row)">编辑</el-button>
            <el-button v-if="scope.row.packageStatus" type="text" @click="delPackage(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination layout="prev, pager, next, sizes, jumper" :total="packageList.length"
                       :page-sizes="[20, 50]" :page-size="nowSize" @size-change="getNowsize" @current-change="getNowpage">
        </el-pagination>
      </div>
    </div>

    <el-dialog title="添加礼包" :visible.sync="isAddProp" style="text-align: center">
      <el-form :model="packageInfo">
        <el-form-item label="礼包名称" label-width="110px" >
          <el-input v-model="packageInfo.packageName" placeholder="请输入礼包名称" :maxlength='20' :disabled="editStatus"></el-input>
        </el-form-item>
        <el-form-item label="礼包图标" prop="icon" label-width="110px" >
          <el-select v-model="packageInfo.icon" placeholder="请选择" clearable style="width: 100%">
            <el-option v-for="item in numberOptions" :key="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="持续时间（天）" label-width="110px" >
          <el-input v-model="packageInfo.duration" placeholder="请输入持续时间" type="number" :maxlength='10'></el-input>
        </el-form-item>
        <el-form-item label="添加道具" label-width="110px">
          <el-row>
            <el-col :span="12">
              <el-col :span="4">类别</el-col>
              <el-col :span="18">
                <el-select v-model="addToolInfo.toolName" placeholder="请选择" filterable clearable style="width: 100%">
                  <el-option v-for="item in propList" :key="item.toolName" :laber="item.toolName" :value="item.toolName"></el-option>
                </el-select>
              </el-col>
            </el-col>
            <el-col :span="12">
              <el-col :span="4">数量</el-col>
              <el-col :span="18">
                <el-input v-model="addToolInfo.toolNum" placeholder="请输入数量" type="number" :maxlength='10'></el-input>
              </el-col>
            </el-col>
          </el-row>
          <div style="margin-top: 2rem">
            <el-row class="-package-add">
              <el-table :data="addToolList">
                <el-table-column prop="toolName" label="道具" align="center">
                </el-table-column>
                <el-table-column prop="toolNum" label="数量" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                  <template scope="scope">
                    <el-button type="text" @click="updatePackage(scope.row)">编辑</el-button>
                    <el-button type="text" @click="delAddPackage(scope.$index)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
            <el-row style="text-align: right;margin-top: 2rem">
              <el-button @click="addProp">{{isEditPackage ? '修改' : '添加'}}</el-button>
            </el-row>
          </div>
        </el-form-item>
        <el-form-item label="备注" label-width="110px" >
          <el-input v-model="packageInfo.remark" type="textarea" :rows="4" auto-complete="off" placeholder="请输入备注"
                    :maxlength="200"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isAddProp = false">取 消</el-button>
        <el-button type="primary" :load="isSending" @click="submitProp(packageInfo.packageId)">{{isSending ? '提交中' : '确 定'}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import dateformat from 'dateformat'
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
export default {
  name: 'app',
  beforeCreate () {
    this.$store.commit('returnLocalStorage')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'packageList'
    })
  },
  created () {
    this.getPackageList()
    this.getPropList()
  },
  data () {
    return {
      nowSize: 20,
      nowPage: 1,
      isAddProp: false,
      isSending: false,
      editStatus: false,
      isEditPackage: false, // 新增礼包道具编辑状态控制
      packageStatus: ['已锁定', '正常'],
      packageList: [],
      packageInfo: {
        packageName: '',
        duration: '0',
        remark: '',
        content: [],
        icon: ''
      },
      searchInfo: {
        packageName: '',
        packageId: ''
      },
      numberOptions: this.getNumber(),
      searchArray: [], // 暂时存储
      addToolInfo: {
        toolName: '',
        toolNum: ''
      }, // 暂存新增的道具
      propList: [], // 获取道具列表
      addToolList: [] // 添加新增道具列表（本地暂存）
    }
  },
  computed: {
    getItems () {
      if (this.nowPage === 1) {
        return this.packageList.slice(0, this.nowSize)
      } else {
        return this.packageList.slice(((this.nowPage - 1) * this.nowSize), this.nowSize * this.nowPage)
      }
    }
  },
  methods: {
    getPackageList () {
      this.$store.commit('startLoading')
      invoke({
        url: api.packageList,
        method: api.post
      }).then(
        result => {
          const [err, res] = result
          if (err) {
            this.$message({
              message: err.msg,
              type: 'error'
            })
          } else {
            this.packageList = res.data.payload
            this.searchArray = res.data.payload
          }
          this.$store.commit('closeLoading')
        }
      )
    },
    submitProp (id) {
      this.packageInfo.content = this.addToolList
      if (!this.packageInfo.packageName) {
        return this.$message.error('请输入礼包名称')
      } else if (!this.packageInfo.icon) {
        return this.$message.error('请选择礼包图标')
      } else if (!this.packageInfo.duration) {
        this.packageInfo.duration = 0
      } else if (!this.packageInfo.content.length) {
        return this.$message.error('请添加礼包道具')
      } else if (this.packageInfo.duration < 0) {
        return this.$message.error('时间不能为负')
      }

      if (this.isSending) return // 防止重复提交
      this.isSending = true
      invoke({
        url: id ? api.packageUpdate : api.addPackage,
        method: api.post,
        data: this.packageInfo
      }).then(
        result => {
          const [err, res] = result
          if (err) {
            this.$message({
              message: err.msg,
              type: 'error'
            })
          } else if (res) {
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            this.addToolList = []
            this.isAddProp = false
            this.getPackageList()
          }
          this.isSending = false
        }
      )
    },
    changeStatus (row) {
      this.$store.commit('startLoading')
      invoke({
        url: api.changePackageStatus,
        method: api.post,
        data: {
          packageName: row.packageName,
          packageId: row.packageId,
          status: row.packageStatus ? 0 : 1
        }
      }).then(
        result => {
          const [err, res] = result
          if (err) {
            this.$message({
              message: err.msg,
              type: 'error'
            })
          } else if (res) {
            this.$message({
              message: '状态改变成功',
              type: 'success'
            })
            this.getPackageList()
          }
          this.$store.commit('closeLoading')
        }
      )
    }, // 更改礼包状态
    openModal (row = {}) {
      this.isAddProp = true
      this.isEditPackage = false
      this.addToolInfo = {
        toolName: '',
        toolNum: ''
      }
      if (JSON.stringify(row) !== '{}') {
        this.editStatus = true
        this.packageInfo = JSON.parse(JSON.stringify(row))
        this.addToolList = this.packageInfo.content
        this.packageInfo.remark = this.packageInfo.remark === 'NULL!' ? '' : this.packageInfo.remark
      } else {
        this.packageInfo = {
          packageName: '',
          duration: '0',
          remark: '',
          content: [],
          icon: ''
        }
        this.addToolList = []
        this.editStatus = false
      }
    },
    delPackage (row) {
      this.$confirm('删除后该礼包无法恢复，你还要继续吗？', `确定删除礼包${row.packageName}吗？`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        invoke({
          url: api.packageDelete,
          method: api.post,
          data: {
            packageId: row.packageId,
            packageName: row.packageName
          }
        }).then(
          result => {
            const [err, res] = result
            if (err) {
              this.$message({
                message: err.msg,
                type: 'error'
              })
            } else if (res) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.isAddProp = false
              this.getPackageList()
            }
          }
        )
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }, // 删除
    startSearch () {
      let {packageId, packageName} = this.searchInfo
      this.arrayLocal = JSON.parse(JSON.stringify(this.searchArray))
      if ((!packageId && !packageName)) {
        this.searchArray = []
        this.getPackageList()
      } else if (packageName && packageId) {
        this.packageList = this.arrayLocal.filter(item => {
          return (item.packageName === this.searchInfo.packageName && item.packageId === this.searchInfo.packageId)
        })
      } else {
        if (packageName) {
          this.packageList = this.arrayLocal.filter(item => {
            return item.packageName === this.searchInfo.packageName
          })
        } else if (packageId) {
          this.packageList = this.arrayLocal.filter(item => {
            return item.packageId === this.searchInfo.packageId
          })
        }
      }
    }, // 控制搜索条件
    resetSearch () {
      this.searchInfo = {}
      this.searchArray = []
      this.getPackageList()
    },
    getAtime (row, col) {
      var now = new Date(parseFloat(row.createdAt))
      var formatprev = dateformat(now, 'isoDate')
      return formatprev
    }, // 格式化创建时间
    getNowsize (size) {
      this.nowSize = size
      console.log('当前每页:' + size)
    },
    getNowpage (page) {
      this.nowPage = page
      console.log('当前是第:' + page + '页')
    },
    getNumber () {
      const numberArray = []
      for (var i = 1; i < 33; i++) {
        numberArray.push({
          name: i
        })
      }
      return numberArray
    },
    getPropList () {
      invoke({
        url: api.propList,
        method: api.post
      }).then(
        result => {
          const [err, res] = result
          if (err) {
            this.$message({
              message: err.msg,
              type: 'error'
            })
          } else {
            for (let item of res.data.payload) {
              if (item.toolStatus) {
                this.propList.push(item)
              }
            }
          }
        }
      )
    }, // 新增礼包获取道具列表
    addProp () {
      let reg = new RegExp(/^[0-9]*[1-9][0-9]*$/)
      if (!this.addToolInfo.toolName) {
        return this.$message.error('请选择道具')
      } else if (!this.addToolInfo.toolNum) {
        return this.$message.error('请选择数量')
      } else if (!reg.exec(this.addToolInfo.toolNum)) {
        return this.$message.error('道具数量范围为1-1000,000,00的正整数')
      }
      if (this.isEditPackage) {
        let updateTool = {}
        this.propList.forEach(item => {
          if (item.toolName === this.addToolInfo.toolName) {
            updateTool = JSON.parse(JSON.stringify(Object.assign(this.addToolInfo, item)))
          }
        })
        this.addToolList.forEach((item, index, array) => {
          if (item.id === updateTool.id) {
            array.splice(index, 1, updateTool)
          }
        })
        this.isEditPackage = false
      } else {
        let toolObj = {}
        this.propList.forEach(item => {
          if (item.toolName === this.addToolInfo.toolName) {
            this.addToolInfo.id = this.addToolList.length + 1
            toolObj = JSON.parse(JSON.stringify(Object.assign(this.addToolInfo, item)))
            this.addToolList.push(toolObj)
          }
        })
      }
    }, // 新增道具
    delAddPackage (index) {
      this.addToolList.splice(index, 1)
    }, // 删除新增的道具
    updatePackage (row) {
      this.isEditPackage = true
      this.addToolInfo = JSON.parse(JSON.stringify(row))
      console.log(this.addToolInfo, '编辑')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .packageList{padding: 2rem;}
  .-search{margin: 2rem; background-color: #f5f5f5; text-align: center }
  .input{width: 80%}
  .searchResult{padding: 1rem 2rem}
  .justfy1{margin:0 2rem;}
  .page {padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 2rem}
  .remarkBox{word-wrap: break-word; word-break: normal;width: 250px}
  .-package-add{max-height: 161px;  overflow: auto;}
  /*面包屑组件*/
  .title{padding: 2rem;}
  .large{font-size: 1.5rem;color: #000;position: relative;top: -0.3rem;}
</style>
