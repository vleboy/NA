<template>
  <div>
    <div class="boothList -search">
      <el-row class="transition-box">
        <el-col :span="10">
          <span>物品ID: </span>
          <el-input placeholder="请输入" class="input" v-model="searchInfo.toolId"></el-input>
        </el-col>
        <el-col :span="10">
          <span>物品名称：</span>
          <el-input placeholder="请输入" class="input" v-model="searchInfo.toolName"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="startSearch">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-col>
      </el-row>
    </div>
    <p class="searchResult">共搜索到 {{boothList.length || 0}} 条数据</p>

    <div class="-booth-searchResult">
      <!--<el-col :span="5">-->
        <!--<el-radio-group v-model="radioInfo" @change="changeRadio()">-->
          <!--<el-radio-button v-for="(item, index) in boothType" :key="index" :label="item.code" >{{item.name}}</el-radio-button>-->
        <!--</el-radio-group>-->
      <!--</el-col>-->
      <el-col :span="24">
        <el-button type="primary" @click="openModal()">物品上架</el-button>
      </el-col>
    </div>
    <div class="boothList">
      <el-table stripe :data="getItems">
        <el-table-column label="展位" prop="order" align="center" width="90">
        </el-table-column>
        <el-table-column label="物品id" prop="seatId" align="center"  width="190">
          <template scope="scope">
            {{scope.row.content.toolId || scope.row.content.packageId}}
          </template>
        </el-table-column>
        <el-table-column label="物品名称" prop="content.toolName" align="center" :show-overflow-tooltip="true" width="190">
          <template scope="scope">
            {{scope.row.content.toolName || scope.row.content.packageName}}
          </template>
        </el-table-column>
        <el-table-column label="道具售价" prop="price" align="center" width="190" >
        </el-table-column>
        <el-table-column label="数量" prop="sum" align="center">
        </el-table-column>
        <el-table-column label="物品类型" prop="contentType" align="center"  width="190">
          <template scope="scope">
            {{scope.row.contentType==1?'道具':'礼包'}}
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createdAt" sortable :formatter="getAtime" width="190" align="center">
        </el-table-column>
        <el-table-column label="状态" align="center" width="90" class-name="green">
          <template scope="scope">
            <el-tag :type="boothClassStatus[scope.row.seatStatus]">
              {{boothStatus[scope.row.seatStatus]}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center" >
          <template scope="scope">
            <el-popover trigger="hover" placement="bottom-start" width="250">
              <p>{{ scope.row.remark === 'NULL!' ? '' : scope.row.remark}}</p>
              <div slot="reference" class="">
                <el-icon name="search" style="color:#108ee9"></el-icon>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center"  width="190">
          <template scope="scope">
            <el-button type="text" @click="openModal(scope.row)">编辑</el-button>
            <el-button type="text" @click="delProp(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination layout="prev, pager, next, sizes, jumper" :total="boothList.length"
                       :page-sizes="[20, 50]" :page-size="nowSize" @size-change="getNowsize" @current-change="getNowpage">
        </el-pagination>
      </div>
    </div>

    <el-dialog title="物品上架" :visible.sync="isAddProp" style="text-align: center">
      <el-form :model="boothInfo">
        <!--<el-form-item label="选择上架展位" label-width="110px" >-->
          <!--<el-select v-model="boothInfo.seatType" placeholder="请选择上架展位" clearable style="width: 100%" @change="changeType()">-->
            <!--<el-option v-for="(item, index) in boothType" :key="index" :label="item.name" :value="item.code"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item label="展位编号" label-width="110px" >
          <el-input v-model="boothInfo.order" placeholder="请输入展位编号" type="number" :maxlength='20'></el-input>
        </el-form-item>
        <el-form-item label="物品类型" label-width="110px" >
          <el-select v-model="boothInfo.contentType" placeholder="请选择物品类型" clearable style="width: 100%"
                     @change="changeGoods()">
            <el-option v-for="(item, index) in goodsType" :key="index" :label="item.name" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择物品" label-width="110px">
          <el-select v-model="boothInfo.prop" placeholder="请选择上架物品" filterable clearable :disabled="!isCheckGoods" style="width: 100%">
            <el-option v-for="(item, index) in oldPropList" :key="index" :laber="item.toolName"
                       :value="item.toolName" v-if="boothInfo.contentType==1">
            </el-option>
            <el-option v-for="(item, index) in packageList" :key="index" :laber="item.packageName"
                       :value="item.packageName" v-if="boothInfo.contentType==2">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="物品数量" label-width="110px" >
          <el-input v-model="boothInfo.sum" placeholder="请输入物品数量" type="number" :maxlength='100000000'></el-input>
        </el-form-item>
        <el-form-item label="物品售价" label-width="110px" >
          <el-input v-model="boothInfo.price" placeholder="请输入物品售价" type="number" :maxlength='100000000'></el-input>
        </el-form-item>
        <el-form-item label="是否促销" label-width="110px" style="text-align: left">
          <el-checkbox v-model="isChecked"></el-checkbox>
        </el-form-item>
        <el-form-item label="自定义图标" label-width="110px" style="text-align: left">
          <el-checkbox v-model="isShowIcon"></el-checkbox>
        </el-form-item>
        <el-form-item label="图标名称" label-width="110px" v-if="isShowIcon">
          <el-input v-model="boothInfo.icon" placeholder="请输入图标名称" :maxlength='20'></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="110px" >
          <el-input v-model="boothInfo.remark" type="textarea" :rows="4" auto-complete="off" placeholder="请输入备注"
                    :maxlength="200"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isAddProp = false">取 消</el-button>
        <el-button type="primary" :load="isSending" @click="submitProp(boothInfo.seatId)">{{isSending ? '提交中' : '确 定'}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { detailTime } from '@/behavior/format'
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
import { pattern } from '@/behavior/regexp'
export default {
  name: 'app',
  beforeCreate () {
    this.$store.commit('returnLocalStorage')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'boothList'
    })
    this.$store.commit('startLoading')
  },
  created () {
    this.getPropList()
    this.getBoothType()
    this.getPackageList()
  },
  data () {
    return {
      nowSize: 20,
      nowPage: 1,
      isAddProp: false,
      isSending: false,
      isChecked: false, // 是否促销
      isShowIcon: false, // 是否显示自定义图标
      isCheckGoods: false,
      radioInfo: this.$store.state.variable.boothType || '1',
      boothType: [],
      goodsType: [
        {
          code: 1,
          name: '道具列表'
        },
        {
          code: 2,
          name: '礼包列表'
        }
      ],
      boothClassStatus: ['gray', 'success', 'danger'],
      boothStatus: ['已停用', '正常', '促销'],
      boothList: [],
      oldPropList: [],
      propList: [],
      packageList: [],
      boothInfo: {
        seatType: 2,
        remark: '',
        order: '',
        sum: '',
        price: '',
        prop: '',
        seatStatus: '',
        contentType: '',
        icon: '',
        content: ''
      },
      searchInfo: {
        toolName: '',
        toolId: ''
      },
      searchArray: [] // 暂时加储
    }
  },
  computed: {
    getItems () {
      if (this.nowPage === 1) {
        return this.boothList.slice(0, this.nowSize)
      } else {
        return this.boothList.slice(((this.nowPage - 1) * this.nowSize), this.nowSize * this.nowPage)
      }
    }
  },
  methods: {
    getBoothList (type) {
      this.$store.commit('startLoading')
      invoke({
        url: api.boothList,
        method: api.post,
        data: {
          seatType: type || this.$store.state.variable.boothType || '2'
        }
      }).then(
        result => {
          const [err, res] = result
          if (err) {
            this.$message({
              message: err.msg,
              type: 'error'
            })
          } else {
            this.boothList = res.data.payload
            this.searchArray = res.data.payload
          }
          this.$store.commit('closeLoading')
        }
      )
    },
    getBoothType () {
      invoke({
        url: api.getBoothType,
        method: api.get
      }).then(
        result => {
          const [err, res] = result
          if (err) {
            this.$message({
              message: err.msg,
              type: 'error'
            })
          } else {
            // console.log(res)
            this.boothType = res.data.payload
            this.getBoothList()
          }
        }
      )
    },
    submitProp (id) {
      this.boothInfo.seatStatus = this.isChecked ? '2' : '1'
      this.boothInfo.icon = this.isShowIcon ? this.boothInfo.icon : ''
      if (this.boothInfo.contentType === 1) {
        this.oldPropList.forEach(item => {
          if (item.toolName === this.boothInfo.prop) {
            this.boothInfo.content = item
          }
        })
      } else if (this.boothInfo.contentType === 2) {
        this.packageList.forEach(item => {
          if (item.packageName === this.boothInfo.prop) {
            this.boothInfo.content = item
          }
        })
      }
      if (!this.boothInfo.seatType) {
        return this.$message.error('请选择展位')
      } else if (!this.boothInfo.order) {
        return this.$message.error('请输入展位编号')
      } else if (!pattern.positiveInteger.exec(this.boothInfo.order)) {
        return this.$message.error('展位编号为正整数')
      } else if (!this.boothInfo.content) {
        return this.$message.error('请选择物品')
      } else if (!this.boothInfo.price) {
        return this.$message.error('请输入物品售价')
      } else if (!this.boothInfo.sum) {
        return this.$message.error('请输入物品数量')
      } else if (!pattern.positiveInteger.exec(this.boothInfo.price) || this.boothInfo.price > 100000000) {
        return this.$message.error('物品售价范围为1-1000,000,00的正整数')
      } else if (!pattern.positiveInteger.exec(this.boothInfo.sum) || this.boothInfo.sum > 100000000) {
        return this.$message.error('物品数量范围为1-1000,000,00的正整数')
      } else if (this.isShowIcon && (!this.boothInfo.icon || this.boothInfo.icon=='NULL!')) {
        return this.$message.error('请选择自定义图标')
      }
      if (this.isSending) return // 防止重复提交
      this.isSending = true
      invoke({
        url: id ? api.updateBooth : api.addBooth,
        method: api.post,
        data: this.boothInfo
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
            this.isAddProp = false
            this.getBoothList()
            this.isSending = false
          }
        }
      )
    },
    delProp (row) {
      this.$confirm(`确定将${row.order}号展位中的物品下架吗？`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        invoke({
          url: api.delBooth,
          method: api.post,
          data: {
            seatId: row.seatId
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
              this.getBoothList()
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
    openModal (row = {}) {
      this.isAddProp = true
      this.boothInfo = JSON.parse(JSON.stringify(row))
      if (JSON.stringify(row) !== '{}') {
        this.isShowIcon = this.boothInfo.icon != "NULL!" // 看是否设定了自定义图
        this.boothInfo.remark = this.boothInfo.remark === 'NULL!' ? '' : this.boothInfo.remark
        this.isChecked = this.boothInfo.seatStatus === 2
        this.boothInfo.prop = (this.boothInfo.content.toolName || this.boothInfo.content.packageName)
        this.isCheckGoods = true
      } else {
        this.boothInfo = {
          seatType: 2,
          remark: '',
          order: '',
          sum: '',
          price: '',
          prop: '',
          seatStatus: '',
          contentType: '',
          content: ''
        }
        this.isShowIcon = false
        this.isChecked = false
      }
    },
    startSearch () {
      let {toolId, toolName} = this.searchInfo
      this.arrayLocal = JSON.parse(JSON.stringify(this.searchArray))
      // console.log(this.arrayLocal, 111)
      if ((!toolId && !toolName)) {
        this.searchArray = []
        this.getBoothList()
      } else if (toolName && toolId) {
        this.boothList = this.arrayLocal.filter(item => {
          return ((item.content.toolName ? item.content.toolName : item.content.packageName) === this.searchInfo.toolName &&
          (item.content.toolId ? item.content.toolId : item.content.packageId) === this.searchInfo.toolId)
        })
      } else {
        if (toolName) {
          this.boothList = this.arrayLocal.filter(item => {
            return (item.content.toolName ? item.content.toolName : item.content.packageName) === this.searchInfo.toolName
          })
        } else if (toolId) {
          this.boothList = this.arrayLocal.filter(item => {
            return (item.content.toolId ? item.content.toolId : item.content.packageId) === this.searchInfo.toolId
          })
        }
      }
    }, // 控制搜索条件
    resetSearch () {
      this.searchInfo = {}
      this.searchArray = []
      this.getBoothList()
    },
    changeRadio () {
      this.$store.commit({
        type: 'rememberBoothType',
        data: this.radioInfo
      })
      this.getBoothList(this.radioInfo)
    },
    getAtime (row, col) {
      return detailTime(row.createdAt)
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
              message: err.msg,
              type: 'error'
            })
          } else {
            for (let item of res.data.payload) {
              if (item.toolStatus) {
                this.oldPropList.push(item)
              }
            }
          }
        }
      )
    }, // 新增礼包获取道具列表
    getPackageList () {
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
            for (let item of res.data.payload) {
              if (item.packageStatus) {
                this.packageList.push(item)
              }
            }
          }
        }
      )
    }, // 新增礼包获取道具列表
    changeGoods () {
      if (this.boothInfo.contentType === 1) {
        this.boothInfo.prop = this.boothInfo.content.toolName
        this.isCheckGoods = true
      } else if (this.boothInfo.contentType === 2) {
        this.boothInfo.prop = this.boothInfo.content.packageName
        this.isCheckGoods = true
      } else {
        this.isCheckGoods = false
      }
    }, // 改变物品类型
    changeType () {
      if (this.boothInfo.seatType === '1') {
        this.propList = this.oldPropList.filter(item => {
          return (item.toolId === '100000')
        })
      } else {
        this.propList = this.oldPropList
      }
    } // 改变展品类型
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .boothList{padding:1rem 2rem;}
  .-search{margin:0 2rem; background-color: #f5f5f5; text-align: center }
  .input{width: 80%}
  .searchResult{padding: 1rem 2rem}
  .-booth-searchResult{overflow: hidden; padding: 0 2rem}
  .justfy1{margin:0 2rem;}
  .page {padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 2rem}
</style>
