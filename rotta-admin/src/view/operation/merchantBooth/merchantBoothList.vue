<template>
  <div class="merchantBoothList">
    <div class="merchantBoothList -search">
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
    <div>
      <el-table stripe :data="getItems">
        <el-table-column label="展位" prop="order" align="center" width="90">
        </el-table-column>
        <el-table-column label="物品id" prop="seatId" align="center">
          <template scope="scope">
            {{scope.row.content.toolId || scope.row.content.packageId}}
          </template>
        </el-table-column>
        <el-table-column label="物品名称" prop="content.toolName" align="center" :show-overflow-tooltip="true">
          <template scope="scope">
            {{scope.row.content.toolName || scope.row.content.packageName}}
          </template>
        </el-table-column>
        <el-table-column label="道具售价" prop="price" align="center">
        </el-table-column>
        <el-table-column label="数量" prop="sum" align="center">
        </el-table-column>
        <el-table-column label="物品类型" prop="contentType" align="center">
          <template scope="scope">
            {{scope.row.contentType==1?'道具':'礼包'}}
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createdAt" sortable :formatter="getAtime" width="190">
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
        <el-table-column label="操作" align="center" min-width="100">
          <template scope="scope">
            <el-button type="text" @click="openModalReplace(scope.row)">展位替换</el-button>
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

    <el-dialog title="商户物品上架" :visible.sync="isAddProp" style="text-align: center">
      <el-form :model="boothInfo">
        <!--<el-form-item label="选择上架展位" label-width="110px" >-->
          <!--<el-select v-model="boothInfo.seatType" placeholder="请选择上架展位" clearable style="width: 100%" @change="changeType()">-->
            <!--<el-option v-for="(item, index) in boothType" :key="index" :label="item.name" :value="item.code"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item label="展位编号" label-width="110px" >
          <div class="g-text-left" v-if="!isNewProp">{{boothInfo.order}}</div>
          <div class="g-text-left" v-else>
            <el-radio-group v-model="replaceType">
              <el-radio-button v-for="(item, index) in boothPositionList" :key="index" :label="item.value" :disabled="item.disabled">
                {{item.name}}
              </el-radio-button>
            </el-radio-group>
          </div>
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
          <el-input v-model="boothInfo.sum" placeholder="请输入物品数量" type="number" :maxlength='100000000' ></el-input>
        </el-form-item>
        <el-form-item label="物品总价" label-width="110px">
          <el-tooltip effect="dark" :content="tipsRatio" placement="right">
            <el-input v-model="boothInfo.price" placeholder="请输入物品售价" type="number" :maxlength='100000000'></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="是否促销" label-width="110px" style="text-align: left">
          <el-checkbox v-model="isChecked"></el-checkbox>
        </el-form-item>
        <el-form-item label="自定义图标" label-width="110px" style="text-align: left">
          <el-checkbox v-model="isShowIcon"></el-checkbox>
        </el-form-item>
        <el-form-item label="图标名称" label-width="110px" v-if="isShowIcon">
          <el-col :span="8" v-for="(item,index) of iconImg" :key="index"  >
            <div class="-icon">
              <img :src="item.img" class="-icon-img">
              <el-button :class="{'active':item.isIconChecked}" @click="checkIcon(item)">{{item.value}}</el-button>
            </div>
          </el-col>
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

    <el-dialog title="展位替换" :visible.sync="isBoothReplace" style="text-align: center">
      <el-form :model="replaceInfo">
        <el-form-item label="当前展位" label-width="110px">
          <div style="text-align: left">{{replaceInfo.order}}</div>
        </el-form-item>
        <el-form-item label="需要替换的展位" label-width="110px"  class="g-text-left">
          <el-radio-group v-model="replaceType" @change="changeTypeReplace()">
            <el-radio-button v-for="(item, index) in boothReplaceList" :key="index" :label="item.value" :disabled="item.disabled">
              {{item.name}}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isBoothReplace = false">取 消</el-button>
        <el-button type="primary" :load="isSending" @click="boothReplace()">{{isSending ? '提交中' : '确 定'}}</el-button>
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
      data: 'merchantBoothList'
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
      isBoothReplace: false,// 展位替换modal
      isSending: false,
      isChecked: false, // 是否促销
      isShowIcon: false, // 自定义图标
      isCheckGoods: false,
      isNewProp: false, // 是否是从新增里点击进入
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
      replaceInfo:{},
      searchInfo: {
        toolName: '',
        toolId: ''
      },
      searchArray: [], // 暂时加储
      replaceType: '', // 展位编号替换位置
      replaceStorage: '', // 展位替换暂存数据
      afterReplaceSeatId: '', // 展位替换后的ID
      allPriceUp: '', // 上浮最高总价
      allPriceLow: '', // 下浮最低总价
      iconImg:[
        {
          id: 1,
          value: 'RoomCard1',
          img: 'https://d38xgux2jezyfx.cloudfront.net/RoomCard1.png',
          isIconChecked: false
        },
        {
          id: 2,
          value: 'RoomCard2',
          img: 'https://d38xgux2jezyfx.cloudfront.net/RoomCard2.png',
          isIconChecked: false
        },
        {
          id: 3,
          value: 'RoomCard3',
          img: 'https://d38xgux2jezyfx.cloudfront.net/RoomCard3.png',
          isIconChecked: false
        },
        {
          id: 4,
          value: 'RoomCard4',
          img: 'https://d38xgux2jezyfx.cloudfront.net/RoomCard4.png',
          isIconChecked: false
        },
        {
          id: 5,
          value: 'RoomCard5',
          img: 'https://d38xgux2jezyfx.cloudfront.net/RoomCard5.png',
          isIconChecked: false
        },
        {
          id: 6,
          value: 'RoomCard6',
          img: 'https://d38xgux2jezyfx.cloudfront.net/RoomCard6.png',
          isIconChecked: false
        }
      ], // 自定义图标路径
      boothPositionList: [
        {
          value: 1,
          name: '1号展位',
          disabled: false
        },{
          value: 2,
          name: '2号展位',
          disabled: false
        },{
          value: 3,
          name: '3号展位',
          disabled: false
        },{
          value: 4,
          name: '4号展位',
          disabled: false
        },{
          value: 5,
          name: '5号展位',
          disabled: false
        },{
          value: 6,
          name: '6号展位',
          disabled: false
        }
      ], //展位
      boothReplaceList: [] //展位
    }
  },
  computed: {
    getItems () {
      if (this.nowPage === 1) {
        return this.boothList.slice(0, this.nowSize)
      } else {
        return this.boothList.slice(((this.nowPage - 1) * this.nowSize), this.nowSize * this.nowPage)
      }
    },
    tipsRatio () {
      let toolLow, toolUp, price, status= ''
      let packageStatus = []
      if (this.boothInfo.contentType ===1) {
        this.oldPropList.forEach(item => {
          if (item.toolName === this.boothInfo.prop) {
            toolLow = item.lowerRatio*0.01
            toolUp = item.comeUpRatio*0.01
            price = item.toolPrice
            status = item.status
            this.allPriceLow = (1-toolLow) > 0 ? (this.boothInfo.sum!='' ? (1-toolLow)*price*this.boothInfo.sum : (1-toolLow)*price) : 0
            this.allPriceUp = this.boothInfo.sum!='' ? toolUp*price*this.boothInfo.sum : toolUp*price
          }
        })
      } else if (this.boothInfo.contentType ===2){
        this.allPriceLow = 0
        this.allPriceUp = 0
        this.packageList.forEach(item => {
          if (item.packageName === this.boothInfo.prop) {
            for (let data of item.content){
              toolLow = data.lowerRatio*0.01
              toolUp = data.comeUpRatio*0.01
              price = data.toolPrice
              packageStatus.push(data.status)
              this.allPriceLow = ((1-toolLow) > 0 ? (this.boothInfo.sum!='' ? (1-toolLow)*price*this.boothInfo.sum : (1-toolLow)*price) : 0) + this.allPriceLow
              this.allPriceUp = (this.boothInfo.sum!='' ? toolUp*price*this.boothInfo.sum : toolUp*price) + this.allPriceUp
            }
          }
        })
//        主要处理道具礼包里道具是否有无限制的上浮率
        for (let item of packageStatus) {
          if(item=='1') {
            status = item
            break
          }
        }
      }

      return `物品总价的最低价格为：${this.allPriceLow||0},最高价格为：${status=='1' ? '无限制' : (this.allPriceUp||0)}`
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
            this.resultData()
            for (let item of this.boothList) {
              for (let item1 of this.boothPositionList){
                if (item.order == item1.value){
                    item1.disabled = true
                }
              }
            }
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
      this.boothInfo.order = this.replaceType || this.boothInfo.order
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
      } else if (!this.boothInfo.content) {
        return this.$message.error('请选择物品')
      } else if (this.boothInfo.price!='0'&&!this.boothInfo.price) {
        return this.$message.error('请输入物品总价')
      } else if (this.boothInfo.price>this.allPriceUp || this.boothInfo.price<this.allPriceLow) {
        return this.$message.error('请输入在物品范围总价之内的价格')
      } else if (!this.boothInfo.sum) {
        return this.$message.error('请输入物品数量')
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
      this.replaceType = ''
      this.isAddProp = true
      this.boothInfo = JSON.parse(JSON.stringify(row))
      if (JSON.stringify(row) !== '{}') {
        this.boothInfo.remark = this.boothInfo.remark === 'NULL!' ? '' : this.boothInfo.remark
        this.isChecked = this.boothInfo.seatStatus === 2
        this.isShowIcon = this.boothInfo.icon != "NULL!" // 看是否设定了自定义图标
        this.boothInfo.prop = (this.boothInfo.content.toolName || this.boothInfo.content.packageName)
        this.isCheckGoods = true
        this.isNewProp = false
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
        this.isNewProp = true
      }

      // 根据是否有自定义图标初始化icon图标的选择情况
      if (!this.isShowIcon){
        for (let item of this.iconImg) {
          item.isIconChecked = false
        }
      } else {
        for (let item of this.iconImg) {
          if(this.boothInfo.icon == item.value){
            item.isIconChecked = true
          } else {
            item.isIconChecked = false
          }
        }
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
    }, // 改变展品类型
    openModalReplace (row) {
      this.replaceType = ''
      this.isBoothReplace = true
      this.replaceInfo = JSON.parse(JSON.stringify(row))
      this.resultData()
      this.boothReplaceList = JSON.parse(JSON.stringify(this.boothPositionList))
      for (let item4 of this.boothReplaceList){
        if(item4.value == this.replaceInfo.order){
          item4.disabled = true
        } else {
          item4.disabled = false
        }
      }
    }, //打开展位替换窗口
    changeTypeReplace () {
      for (let item of this.boothList) {
        if (item.order == this.replaceType){
          this.afterReplaceSeatId = item.seatId
        }
      }
    }, // 根据选中的展位找出替换后的id
    checkIcon (item) {
      for(let data of this.iconImg) {
         if(item.id == data.id){
           item.isIconChecked = !item.isChecked
         } else {
           data.isIconChecked = false
         }
      }
      this.boothInfo.icon = item.isIconChecked ? item.value : ''
    }, // 选中icon
    boothReplace () {
      this.$store.commit('startLoading')
      invoke({
        url: api.boothReplace,
        method: api.post,
        data: {
          beforeSeatId: this.replaceInfo.seatId,
          beforeOrder: this.replaceInfo.order,
          afterSeatId: this.afterReplaceSeatId,
          afterOrder: this.replaceType
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
            this.$message.success('展位替换成功')
            this.getBoothList()
            this.isBoothReplace = false
          }
          this.$store.commit('closeLoading')
        }
      )
    }, //  展位替换提交
    resultData () {
      for (let item4 of this.boothPositionList){
        item4.disabled = false
      }
    } // 初始化boothPositionList的数据
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

  .merchantBoothList{
    padding: 2rem;
    .-search{background-color: #f5f5f5; text-align: center }
    .input{width: 80%}
    .searchResult{padding: 2rem 0}
    .-booth-searchResult{overflow: hidden; padding-bottom:2rem}
    .page {padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 2rem}
    .-icon{
      display: inline-block;
      overflow: hidden;
      width: 120px;

      .-icon-img{
        width: 60%;
      }
    }
    .active{
      color: #fff;
      background-color: #13ce66;
      border-color: #13ce66;
    }
  }


</style>
