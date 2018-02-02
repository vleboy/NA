<template>
  <div>
    <p class="searchResult">共搜索到 {{mailList.length || 0}} 条数据</p>
    <div class="-p-m-header">
      <el-col :span="11">
        <el-button type="primary" @click="openModal()">创建邮件</el-button>
      </el-col>
      <el-col :span="10" class="g-text-right">
        <el-input placeholder="请输入邮件主题" class="input" v-model="searchInfo.mailName"></el-input>
      </el-col>
      <el-col :span="3" class="g-text-right">
        <el-button type="primary" @click="startSearch">搜索</el-button>
        <el-button @click="resetSearch">重置</el-button>
      </el-col>
    </div>

    <div class="mailList">
      <el-table stripe :data="getItems">
        <!--<el-table-column label="邮件ID" prop="emid" align="center">-->
        <!--</el-table-column>-->
        <el-table-column label="邮件主题" prop="title" align="center" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column label="邮件内容" prop="content" align="center" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column label="包含物品" prop="desc" align="center" :show-overflow-tooltip="true" v-if="role!='100'">
          <template scope="scope">
            <div v-if="scope.row.tools.length" v-for="(item, index) in scope.row.tools" style="padding-right:0.5rem;display: inline-block">
              <span>{{item.toolName}} x {{item.sum}}</span>;
            </div>
            <span v-if="!scope.row.tools.length">暂无物品</span>
          </template>
        </el-table-column>
        <el-table-column label="发送对象" align="center">
          <template scope="scope">
            {{scope.row.nickname === 'NULL!' ? '所有人' : scope.row.nickname}}
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createdAt" :formatter="getAtime">
        </el-table-column>
        <el-table-column label="发送时间" prop="sendTime" :formatter="getBtime">
        </el-table-column>
        <el-table-column label="状态" align="center" >
          <template scope="scope">
            <el-tag type="success">正常</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination layout="prev, pager, next, sizes, jumper" :total="mailList.length"
                       :page-sizes="[20, 50]" :page-size="nowSize" @size-change="getNowsize" @current-change="getNowpage">
        </el-pagination>
      </div>
    </div>

    <el-dialog title="发布邮件" :visible.sync="isAddMail" style="text-align: center">
      <el-form :model="mailInfo">
        <el-form-item label="发送对象" label-width="100px" style="text-align: left">
          <el-radio class="radio" v-model="radioInfo" :label="1">所有人</el-radio>
          <el-radio class="radio" v-model="radioInfo" :label="2">玩家</el-radio>
        </el-form-item>
        <el-form-item label="玩家昵称" label-width="100px" v-if="radioInfo == 2">
          <el-input v-model="mailInfo.nickname" placeholder="请输入玩家昵称" :maxlength='20'></el-input>
        </el-form-item>
        <el-form-item label="邮件主题" label-width="100px" >
          <el-input v-model="mailInfo.title" placeholder="请输入邮件主题" :maxlength='20'></el-input>
        </el-form-item>
        <el-form-item label="邮件内容" label-width="100px" >
          <el-input v-model="mailInfo.content" type="textarea" :rows="4" auto-complete="off" placeholder="请输入邮件内容"
                    :maxlength="200"></el-input>
        </el-form-item>
        <el-form-item label="发送方式" label-width="100px" style="text-align: left">
          <el-radio class="radio" v-model="checkTime" :label="1">立即发送</el-radio>
          <el-radio class="radio" v-model="checkTime" :label="2">定时发送</el-radio>
        </el-form-item>
        <el-form-item label="选择时间" label-width="100px" v-if="checkTime == 2">
          <el-date-picker
            v-model="mailInfo.sendTime"
            type="datetime"
            :picker-options="dateOption"
            style="width: 100%"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="包含物品" label-width="100px" v-if="role!='100'">
          <el-row>
            <el-col :span="8">
              <el-col :span="4">类型</el-col>
              <el-col :span="18">
                <el-select v-model="contentType" placeholder="请选择" clearable style="width: 100%"
                           @change="changeType()" :disabled="isEditPackage">
                  <el-option v-for="(item, index) in goodsType" :key="index" :laber="item.name" :value="item.name"></el-option>
                </el-select>
              </el-col>
            </el-col>
            <el-col :span="8">
              <el-col :span="4">道具</el-col>
              <el-col :span="18">
                <el-select v-model="addToolInfo.toolName" placeholder="请选择" filterable clearable style="width: 100%">
                  <el-option v-for="(item, index) in propList" :key="index" :laber="item.toolName"
                             :value="item.toolName" v-if="contentType == '道具列表'">
                  </el-option>
                  <el-option v-for="(item, index) in packageList" :key="index" :laber="item.packageName"
                             :value="item.packageName" v-if="contentType == '礼包列表'">
                  </el-option>
                </el-select>
              </el-col>
            </el-col>
            <el-col :span="8">
              <el-col :span="4">数量</el-col>
              <el-col :span="18">
                <el-input v-model="addToolInfo.sum" placeholder="请输入数量" type="number" :maxlength='10'></el-input>
              </el-col>
            </el-col>
          </el-row>
          <div style="margin-top: 2rem">
            <el-row class="-package-add">
              <el-table :data="addToolList">
                <el-table-column prop="toolName" label="道具" align="center">
                </el-table-column>
                <el-table-column prop="sum" label="数量" align="center">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isAddMail = false">取 消</el-button>
        <el-button type="primary" :load="isSending" @click="submitProp()">{{isSending ? '提交中' : '确 定'}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { detailTime } from '@/behavior/format'
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
// import { pattern } from '@/behavior/regexp'
export default {
  name: 'app',
  beforeCreate () {
    this.$store.commit('returnLocalStorage')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'gameMailList'
    })
//    this.$store.commit('startLoading')
  },
  created () {
    this.getMailList()
    this.getPackageList()
    this.getPropList()
  },
  data () {
    return {
      nowSize: 20,
      nowPage: 1,
      isAddMail: false,
      isSending: false,
      radioInfo: 1,
      checkTime: 1,
      isEditPackage: false, // 新增礼包道具编辑状态控制
      contentType: '', // 选择物品的类型
      mailList: [],
      packageList: [],
      goodsType: [{
        code: 1,
        name: '道具列表'
      },
      {
        code: 2,
        name: '礼包列表'
      }],
      mailInfo: {
        nickname: '',
        title: '',
        sendTime: '',
        content: '',
        tools: []
      },
      searchInfo: {
        mailName: '',
        mailId: ''
      },
      searchArray: [], // 暂时加储
      addToolInfo: {
        toolName: '',
        sum: '',
        contentType: ''
      }, // 暂加新增的道具
      propList: [], // 获取道具列表
      addToolList: [], // 添加新增道具列表（本地暂加）
      dateOption: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 3600 * 1000 * 24
        }
      },
      role: localStorage.loginRole // 相应角色的权限（区分商户、线路商、平台角色）
    }
  },
  computed: {
    getItems () {
      if (this.nowPage === 1) {
        return this.mailList.slice(0, this.nowSize)
      } else {
        return this.mailList.slice(((this.nowPage - 1) * this.nowSize), this.nowSize * this.nowPage)
      }
    }
  },
  methods: {
    getMailList () {
      this.$store.commit('startLoading')
      invoke({
        url: api.getMailList,
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
            this.mailList = res.data.list.Items
            this.searchArray = res.data.list.Items
          }
          this.$store.commit('closeLoading')
        }
      )
    },
    submitProp () {
      this.mailInfo.tools = this.addToolList
      if (!this.mailInfo.nickname && (this.radioInfo === 2)) {
        return this.$message.error('请输入玩家昵称')
      } else if (!this.mailInfo.title) {
        return this.$message.error('请输入邮件标题')
      } else if (!this.mailInfo.content) {
        return this.$message.error('请输入邮件内容')
      } else if (!this.mailInfo.sendTime && (this.checkTime === 2)) {
        return this.$message.error('请选择发送时间')
      }
      this.mailInfo.sendTime = this.mailInfo.sendTime ? new Date(this.mailInfo.sendTime).getTime() : new Date().getTime()
      this.mailInfo.nickname = this.radioInfo == 2 ? this.mailInfo.nickname : ''
      if (this.isSending) return // 防止重复提交
      this.isSending = true
      invoke({
        url: api.addMail,
        method: api.post,
        data: this.mailInfo
      }).then(
        result => {
          const [err, res] = result
          if (err) {
            this.$message({
              message: err.msg,
              type: 'error'
            })
            this.isSending = false
          } else if (res) {
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            this.addToolList = []
            this.isAddMail = false
            this.isSending = false
            this.getMailList()
          }
        }
      )
    },
    openModal () {
      this.isAddMail = true
      this.isEditPackage = false
      this.mailInfo = {
        nickname: '',
        title: '',
        sendTime: '',
        content: '',
        tools: []
      }
      this.addToolInfo = {
        toolName: '',
        sum: ''
      }
    },
    startSearch () {
      let {mailId, mailName} = this.searchInfo
      this.arrayLocal = JSON.parse(JSON.stringify(this.searchArray))
      if ((!mailId && !mailName)) {
        this.searchArray = []
        this.getMailList()
      } else if (mailName && mailId) {
        this.mailList = this.arrayLocal.filter(item => {
          return (item.title === this.searchInfo.mailName && item.emid === this.searchInfo.mailId)
        })
      } else {
        if (mailName) {
          this.mailList = this.arrayLocal.filter(item => {
            return item.title === this.searchInfo.mailName
          })
        } else if (mailId) {
          this.mailList = this.arrayLocal.filter(item => {
            return item.emid === this.searchInfo.mailId
          })
        }
      }
    }, // 控制搜索条件
    resetSearch () {
      this.searchInfo = {}
      this.searchArray = []
      this.getMailList()
    },
    getAtime (row, col) {
      return detailTime(row.createdAt)
    }, // 格式化创建时间
    getBtime (row, col) {
      return detailTime(row.sendTime)
    }, // 格式化创建时间
    getNowsize (size) {
      this.nowSize = size
      // console.log('当前每页:' + size)
    },
    getNowpage (page) {
      this.nowPage = page
      // console.log('当前是第:' + page + '页')
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
              message: err.response.data.err.msg,
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
    }, // 获取道具列表
    getPackageList () {
      invoke({
        url: api.packageList,
        method: api.post
      }).then(
        result => {
          const [err, res] = result
          if (err) {
            this.$message({
              message: err.response.data.err.msg,
              type: 'error'
            })
          } else {
            this.packageList = res.data.payload
          }
        }
      )
    }, // 获取礼包列表
    addProp () {
      let reg = new RegExp(/^[0-9]*[1-9][0-9]*$/)
      if (!this.addToolInfo.toolName) {
        return this.$message.error('请选择道具')
      } else if (!this.addToolInfo.sum) {
        return this.$message.error('请选择数量')
      } else if (!reg.exec(this.addToolInfo.sum)) {
        return this.$message.error('道具数量范围为1-1000,000,00的正整数')
      } else if (this.addToolList.length > 12) {
        return this.$message.error('物品数量不能多于12个')
      }
      if (this.isEditPackage) {
        let updateTool = {}
        if (this.contentType === '道具列表') {
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
        } else {
          this.packageList.forEach(item => {
            if (item.packageName === this.addToolInfo.toolName) {
              updateTool = JSON.parse(JSON.stringify(Object.assign(this.addToolInfo, item)))
            }
          })
          this.addToolList.forEach((item, index, array) => {
            if (item.id === updateTool.id) {
              array.splice(index, 1, updateTool)
            }
          })
        }
        this.isEditPackage = false
      } else {
        if (this.contentType === '道具列表') {
          let toolObj = {}
          this.propList.forEach(item => {
            if (item.toolName === this.addToolInfo.toolName) {
              this.addToolInfo.id = this.addToolList.length + 1
              this.addToolInfo.contentType = this.contentType === '道具列表' ? 1 : 2
              toolObj = JSON.parse(JSON.stringify(Object.assign(this.addToolInfo, item)))
              this.addToolList.push(toolObj)
            }
          })
        } else {
          let packObj = {}
          this.packageList.forEach(item => {
            if (item.packageName === this.addToolInfo.toolName) {
              this.addToolInfo.id = this.addToolList.length + 1
              this.addToolInfo.contentType = this.contentType === '道具列表' ? 1 : 2
              packObj = JSON.parse(JSON.stringify(Object.assign(this.addToolInfo, item)))
              this.addToolList.push(packObj)
            }
          })
        }
      }
      // console.log(this.addToolList, 'addToolList')
    }, // 新增道具
    delAddPackage (index) {
      if(!this.isEditPackage) {
        this.addToolList.splice(index, 1)
      } else {
        this.$message.error('编辑状态无法删除')
      }

    }, // 删除新增的道具
    updatePackage (row) {
      this.isEditPackage = true
      this.addToolInfo = JSON.parse(JSON.stringify(row))
      this.contentType = this.addToolInfo.contentType
      // console.log(this.addToolInfo, '编辑')
    },
    changeType () {
      if (!this.isEditPackage) {
        this.addToolInfo = {
          toolName: '',
          sum: ''
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .-p-m-header{overflow: hidden;padding: 0 2rem}
  .mailList{padding: 1rem 2rem;}
  .-search{margin: 2rem; background-color: #f5f5f5; text-align: center }
  .input{width: 80%}
  .searchResult{padding: 1rem 2rem}
  .page {padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 2rem}
  .-package-add{max-height: 154px;  overflow: auto;}
</style>
