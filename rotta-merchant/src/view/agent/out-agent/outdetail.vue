<template>
    <div>
        <div class="outdetail-title">
            <h2>{{outdetail.displayName}}</h2>
        </div>
        <div class="simpleinfo">
            <h4>基本信息</h4>
            <div class="simpleform" v-if="this.$store.state.variable.isEdit === false">
                <p class="simple">
                    <span>代理商ID: {{outdetail.displayId}}</span>
                    <span v-if="this.outdetail.parent === '01'">上级线路商: {{outdetail.parentName}}</span>
                    <span v-if="this.outdetail.parent !== '01'" @click="goParent()" class="goParent">上级线路商: {{outdetail.parentName}}</span>
                    <span>线路商标识: {{outdetail.suffix}}</span>
                    <span>负责人: {{outdetail.hostName}}</span>
                    <span>负责人联系方式: {{outdetail.hostContact}}</span>
                    <span>抽成比: {{outdetail.rate}}%</span>
                    <span>代理可放商户名额: {{outdetail.limit}}</span>
                    <span>代理游戏: {{jionArray(outdetail.gameList)}}</span>
                    <span>线路商Email: {{outdetail.managerEmail}}</span>
                    <span>线路商创建时间: {{formatTime(outdetail.createdAt)}}</span>
                    <span>最后登录时间: {{formatTime(outdetail.loginAt)}}</span>
                </p>
                <p class="remark">
                    <span>线路商备注: <span>{{outdetail.remark}}</span></el-input>
                    </span>
                </p>
            </div>
            <div class="editform" v-if="this.$store.state.variable.isEdit === true">
                <el-form label-width='110px' label-position="right">
                    <el-row>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="代理商ID">
                                    {{outdetail.displayId}}
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <span class="hidden">1</span>
                        </el-col>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="上级线路商">
                                    {{outdetail.parentName}}
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <span class="hidden">1</span>
                        </el-col>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="线路商标识">
                                    {{outdetail.suffix}}
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="负责人">
                                    <el-input v-model="outdetail.hostName" icon="edit" :on-icon-click="turnONedit" :disabled="disable"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <span class="hidden">1</span>
                        </el-col>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="负责人联系方式">
                                    <el-input v-model="outdetail.hostContact" icon="edit" :on-icon-click="turnONedit" :disabled="disable"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <span class="hidden">1</span>
                        </el-col>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="抽成比">
                                    <el-input v-model="outdetail.rate" icon="edit" :on-icon-click="turnONedit" :disabled="disable">
                                        <template slot="prepend">%</template>
                                    </el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="可放商户名额">
                                    <el-input v-model="outdetail.limit" icon="edit" :on-icon-click="turnONedit" :disabled="disable"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <span class="hidden">1</span>
                        </el-col>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="线路商Email">
                                    <el-input v-model="outdetail.managerEmail" icon="edit" :on-icon-click="turnONedit" :disabled="disable"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <span class="hidden">1</span>
                        </el-col>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="代理游戏">
                                    <el-select v-model="outdetail.gameList" multiple placeholder="请选择" clearable style="min-width:17.8rem" :disabled="disable">
                                        <el-option v-for="item in outdetail.gameList" :key="item" :label="item" :value="item" style="max-width:336px"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="创建时间">
                                    {{formatTime(outdetail.createdAt)}}
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <span class="hidden">1</span>
                        </el-col>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="最后登录时间">
                                    {{formatTime(outdetail.loginAt)}}
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="备注">
                                    <el-input autosize v-model="outdetail.remark" icon="edit" :on-icon-click="turnONedit" :disabled="disable"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>
        <div class="manangeinfo">
            <h4>管理信息
              <div style="float:right;margin-right:2rem" v-if="this.disable === false">
                <el-button type="primary" @click="submitEdit" :loading="loading">提交修改</el-button>
              </div>
            </h4>
            <div class="manangeform" v-if="this.$store.state.variable.isEdit === false">
                <p class="manager-one">
                    <span>管理员账号: {{outdetail.username.split('_')[1]}}</span>
                    <span>管理员姓名: {{outdetail.adminName}}</span>
                    <span>管理员密码: {{outdetail.password}}</span>
                </p>
                <p class="manager-two">
                    <span>管理员Email: {{outdetail.adminEmail}}</span>
                    <span>管理员联系方式: {{outdetail.adminContact}}</span>
                </p>
                <p class="manager-three">
                    <span>生效时间: {{contractPeriod(outdetail.contractPeriod)}}</span>
                    <span>上次登录时间: {{formatTime(outdetail.loginAt)}}</span>
                    <span>上次登录IP: {{outdetail.lastIP}}</span>
                </p>
            </div>
            <div class="editform" v-if="this.$store.state.variable.isEdit === true">
                <el-form label-width='110px' label-position="right">
                    <el-row>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="管理员账号">
                                    {{outdetail.username.split('_')[1]}}
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <span class="hidden">1</span>
                        </el-col>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="管理员姓名">
                                    <el-input v-model="outdetail.adminName" icon="edit" :on-icon-click="turnONedit" :disabled="disable"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <span class="hidden">1</span>
                        </el-col>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="管理员密码">
                                    <el-input v-model="outdetail.password" :disabled="disable">
                                        <el-button slot="append" @click="randomPassword">生成</el-button>
                                    </el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="管理员Email">
                                    <el-input v-model="outdetail.adminEmail" icon="edit" :on-icon-click="turnONedit" :disabled="disable"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="生效时间">
                                    <el-date-picker v-model="outdetail.contractPeriod" type="daterange" label="生效时间" :disabled="disable" :editable='false'></el-date-picker>
                                    <el-checkbox v-model="outdetail.isforever" :disabled="disable" @change="changeContract">永久</el-checkbox>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <span class="hidden">1</span>
                        </el-col>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="上次登录时间">
                                    {{formatTime(outdetail.loginAt)}}
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="上次登录IP">
                                    {{outdetail.lastIP}}
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="管理员联系方式">
                                    <el-input v-model="outdetail.hostContact" icon="edit" :on-icon-click="turnONedit" :disabled="disable"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>
        <div class="propertyinfo">
            <h4>财务信息</h4>
            <div class="propertyform">
                <div class="propertyform-header">
                    <span>当前剩余点数: <span style="color:#FF9900" v-text="waterFall[0].balance"></span></span>
                    <el-button type="text" class="propertybtn">刷新</el-button>
                    <el-button type="text" class="propertybtn" @click="pro_storePoints">存点</el-button>
                    <el-button type="text" class="propertybtn" @click="pro_withdrawPoints">提取</el-button>
                </div>
                <div class="propertyform-form">
                    <el-table style="width: 98%; font-size: 12px;" :data="waterFall" border>
                        <el-table-column label="序号" prop="" type="index" align="center" width="80"></el-table-column>
                        <el-table-column label="账户余额" prop="balance" align="center" width=""></el-table-column>
                        <el-table-column label="交易点数" prop="" align="center" width="">
                            <template scope="scope">
                                <span class="green" v-if="scope.row.action === 1">{{scope.row.amount.toFixed(2)}}</span>
                                <span class="red" v-if="scope.row.action === -1">{{scope.row.amount.toFixed(2)}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="交易时间" prop="" align="center" width="">
                            <template scope="scope">
                                <span>{{formatTime(scope.row.updatedAt)}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="交易类型" prop="" align="center" width="">
                            <template scope="scope">
                                <span>{{scope.row.operator}}</span> <span class="green" v-if="scope.row.action === 1">{{bills(scope.row.action)}}</span> <span class="red" v-if="scope.row.action === -1">{{bills(scope.row.action)}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="交易详情(原账+当前操作额=现在余额)" align="center" prop="balance">
                            <template scope="scope">
                                <p v-if="scope.row.action === 1">
                                    <span>{{scope.row.oldBalance}}</span> +
                                    <span class="green">{{scope.row.amount}}</span> =
                                    <span>{{scope.row.balance}}</span>
                                </p>
                                <p v-if="scope.row.action === -1">
                                    <span>{{scope.row.oldBalance}}</span>
                                    <span class="red">{{scope.row.amount}}</span> =
                                    <span>{{scope.row.balance}}</span>
                                </p>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作人" prop="operator" align="center" width="">
                            <template scope="scope">
                                <span>管理员 {{scope.row.operator.split('_')[1]}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="备注" prop="remark" align="center"></el-table-column>
                    </el-table>
                </div>
                <div class="page">
                      <el-pagination layout="prev, pager, next, sizes, jumper" :total="this.$store.state.variable.outdetailproperty.length" :page-sizes="[5, 10]" :page-size="waterFallSize" @size-change="getwaterFallSize" @current-change="getwaterFallPage"></el-pagination>
                    </div>
            </div>
        </div>
        <div class="propertyinfo">
            <h4>下级线路商列表</h4>
            <div class="propertyform">
                <div class="propertyform-header">
                    <span>当前剩余点数: <span style="color:#FF9900"> {{childManagersbill}} </span></span>
                    <el-button type="text" class="propertybtn">刷新</el-button>
                </div>
                <div class="propertyform-form">
                    <el-table style="width: 98%; font-size: 12px;" border max-height='10px' :data="childManagers">
                    <el-table-column prop="" label="序号" align="center" width="60" type="index"></el-table-column>
                    <el-table-column prop="suffix" label="线路商标识" align="center" width=""></el-table-column>
                    <el-table-column prop="displayName" label="线路商昵称" align="center" width=""></el-table-column>
                    <el-table-column prop="balance" label="拥有点数" align="center" width=""></el-table-column>
                    <el-table-column prop="" label="操作人" align="center" width="">
                      <template scope="scope">
                        <span class="red">平台管理员{{scope.row.operator}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="lastBill.updatedAt" label="操作时间" align="center"></el-table-column>
                    <el-table-column prop="lastBill.remark" label="备注" align="center"></el-table-column>
                    <el-table-column prop="" label="操作(对旗下线路商操作)" align="center">
                      <template scope="scope">
                        <el-button type="text" @click="damn_storePoints(scope.$index, scope.row)">存点</el-button>
                        <el-button type="text" @click="damn_withdrawPoints(scope.$index, scope.row)">提点</el-button>
                        <el-button type="text" @click="lockUser(scope.$index, scope.row)" v-if="scope.row.status === 1">锁定</el-button>
                        <el-button type="text" @click="unlockUser(scope.$index, scope.row)" v-if="scope.row.status === 0">解锁</el-button>
                      </template>
                    </el-table-column>
                </el-table>
                </div>
                <div class="page">
                    <el-pagination layout="prev, pager, next, sizes, jumper" :total="this.$store.state.variable.outdetailmanagers.length" :page-sizes="[5, 10]" :page-size="childManagersSize" @size-change="getchildManagersSize" @current-change="getchildManagersPage"></el-pagination>
                </div>
            </div>
        </div>
        <div class="propertyinfo margin">
            <h4>拥有商户列表</h4>
            <div class="propertyform">
            <div class="propertyform-header">
                <span class="justfy1">商户拥有点数: <span style="color:#FF9900">{{childMerchantsbill}}</span></span>
                <span style="margin-left: 1rem">商户数：{{usedMerchant}}/{{outdetail.limit}}</span>
                <el-button type="text" class="propertybtn justfy2">刷新</el-button>
            </div>
            <div class="propertyform-form">
                <el-table style="width: 98%; font-size: 12px;" border max-height='10px' :data="childMerchants">
                    <el-table-column prop="" label="序号" align="center" width="60" type="index"></el-table-column>
                    <el-table-column prop="suffix" label="线路商标识" align="center" width=""></el-table-column>
                    <el-table-column prop="displayName" label="线路商昵称" align="center" width=""></el-table-column>
                    <el-table-column prop="balance" label="拥有点数" align="center" width=""></el-table-column>
                    <el-table-column prop="" label="操作人" align="center" width="">
                      <template scope="scope">
                        <span class="red">平台管理员</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="lastBill.updatedAt" label="操作时间" align="center" width=""></el-table-column>
                    <el-table-column prop="lastBill.remark" label="备注" align="center"></el-table-column>
                    <el-table-column prop="" label="操作(对旗下商户操作)" align="center">
                      <template scope="scope">
                        <el-button type="text" @click="damn_storePoints(scope.$index, scope.row)">存点</el-button>
                        <el-button type="text" @click="damn_withdrawPoints(scope.$index, scope.row)">提点</el-button>
                        <el-button type="text" @click="lockUser(scope.$index, scope.row)" v-if="scope.row.status === 1">锁定</el-button>
                        <el-button type="text" @click="unlockUser(scope.$index, scope.row)" v-if="scope.row.status === 0">解锁</el-button>
                      </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="page">
              <el-pagination layout="prev, pager, next, sizes, jumper" :total="this.$store.state.variable.outdetailmerchants.length" :page-sizes="[5, 10]" :page-size="childMerchantsSize" @size-change="getchildMerchantsSize" @current-change="getchildManagersPage"></el-pagination>
            </div>
        </div>
        </div>
        <billtransfer></billtransfer>
    </div>
</template>

<script>
import Billtransfer from '@/components/billtransfer'
import { detailTime, formatContractPeriod, billType } from '@/behavior/format'
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
export default {
  components: {
    Billtransfer
  },
  beforeCreate () {
    this.$store.commit('startLoading')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'outlist'
    })
    this.$store.commit('returnLocalStorage')
    this.$store.dispatch('getOutdetail')
    this.$store.dispatch('getOutdetail_property')
    this.$store.dispatch('getOutdetail_child_managers')
    this.$store.dispatch('getOutdetail_child_merchants')
  },
  computed: {
    outdetail () {
      return this.$store.state.variable.outdetaildata
    },
    waterFall () {
      var waterfall = this.$store.state.variable.outdetailproperty
      if (this.waterFallPage === 1) {
        return waterfall.slice(0, this.waterFallSize)
      } else {
        return waterfall.slice(((this.waterFallPage - 1) * this.waterFallSize), this.waterFallSize * this.waterFallPage)
      }
    },
    childManagers () {
      var childManagers = this.$store.state.variable.outdetailmanagers
      if (this.childManagersPage === 1) {
        return childManagers.slice(0, this.childManagersSize)
      } else {
        return childManagers.slice(((this.childManagersPage - 1) * this.childManagersSize), this.childManagersSize * this.childManagersPage)
      }
    },
    childMerchants () {
      var childMerchants = this.$store.state.variable.outdetailmerchants
      if (this.childMerchantsPage === 1) {
        return childMerchants.slice(0, this.childMerchantsSize)
      } else {
        return childMerchants.slice(((this.childMerchantsPage - 1) * this.childMerchantsSize), this.childMerchantsSize * this.childMerchantsPage)
      }
    },
    usedMerchant () {
      return this.$store.state.variable.outdetailmerchants.length
    },
    childManagersbill () {
      var bills = 0
      for (var i = 0; i < this.childManagers.length; i++) {
        bills += this.childManagers[i].balance
      }
      return bills
    },
    childMerchantsbill () {
      var bills = 0
      for (var i = 0; i < this.childMerchants.length; i++) {
        bills += this.childMerchants[i].balance
      }
      return bills
    }
  },
  data () {
    return {
      disable: true, // 禁用输入框
      balance: '',  // 账户余额
      waterFallSize: 5, // 线路商详情页财务信息分页
      waterFallPage: 1, // 线路商详情页财务信息分页
      childManagersSize: 5, // 线路商详情页所属线路商分页
      childManagersPage: 1, // 线路商详情页所属线路商分页
      childMerchantsSize: 5, // 线路商详情页所属商户分页
      childMerchantsPage: 1 // 线路商详情页所属商户分页
    }
  },
  methods: {
    goParent () {
      this.$store.commit({
        type: 'recordOutdetailID',
        data: this.outdetail.parent
      })
      this.$router.push('outdetail')
      this.$store.commit('startLoading')
      this.$store.dispatch('getOutdetail')
      this.$store.dispatch('getOutdetail_property')
      this.$store.dispatch('getOutdetail_child_managers')
      this.$store.dispatch('getOutdetail_child_merchants')
    }, // 跳转至其上级详情页
    jionArray (arr) {
      arr = arr.join(' , ')
      return arr
    },
    formatTime (time) {
      return detailTime(time)
    },
    contractPeriod (time) {
      return formatContractPeriod(time)
    },
    bills (bill) {
      return billType(bill)
    },
    turnONedit () {
      this.disable = false
    }, // 开启编辑
    changeContract () {
      this.outdetail.contractPeriod = 0
    }, // 设置永久时间
    randomPassword () {
      this.disable = false
      invoke({
        url: api.randomPassword,
        method: api.post
      }).then(
        result => {
          const [err, ret] = result
          if (err) {
          } else {
            var data = ret.data.payload.generatedPassword
            this.outdetail.password = data
            // store.state.checkform.password = true
          }
        }
      )
    }, // 生成密码
    submitEdit () {
      this.loading = true
      var outdetailID = ''
      if (!this.$store.state.variable.outdetailID) {
        outdetailID = localStorage.outdetailID
      } else {
        outdetailID = this.$store.state.variable.outdetailID
      }
      invoke({
        url: api.managers + '/' + outdetailID,
        method: api.post,
        data: this.outdetail
      }).then(
        result => {
          const [err, ret] = result
          if (err) {
            this.$store.commit('closeLoading')
            this.$message({
              message: err.msg,
              type: 'warning'
            })
            this.loading = false
          } else {
            var data = ret.data.payload
            
            invoke({
              url: api.managers + '/' + outdetailID,
              method: api.get
            }).then(
              result => {
                const [err, ret] = result
                if (err) {
                  this.disable = true
                  this.loading = false
                  this.$store.commit('closeLoading')
                  this.$message({
                    message: err.msg,
                    type: 'warning'
                  })
                } else {
                  var data = ret.data.payload
                  
                  this.outdetail = data
                  this.$store.commit('closeLoading')
                }
              }
            ) // 请求基本信息
            this.disable = true
            this.loading = false
            this.$message({
              message: '修改成功',
              type: 'success'
            })
          }
        }
      ) // 请求基本信息
    }, // 提交修改数据
    lockUser (index, row) {
      var user = {
        role: row.role,
        userId: row.userId,
        status: 0
      }
      invoke({
        url: api.userStatus,
        method: api.post,
        data: user
      }).then(
        result => {
          const [err, ret] = result
          if (err) {
          } else {
            var data = ret.payload
            
            this.$message({
              message: '锁定成功',
              type: 'success'
            })
            this.$store.dispatch('getOutdetail_child_managers')
            this.$store.dispatch('getOutdetail_child_merchants')
          }
        }
      )
    },
    unlockUser (index, row) {
      var user = {
        role: row.role,
        userId: row.userId,
        status: 1
      }
      invoke({
        url: api.userStatus,
        method: api.post,
        data: user
      }).then(
        result => {
          const [err, ret] = result
          if (err) {
          } else {
            var data = ret.payload
            
            this.$message({
              message: '解锁成功',
              type: 'success'
            })
            this.$store.dispatch('getOutdetail_child_managers')
            this.$store.dispatch('getOutdetail_child_merchants')
          }
        }
      )
    },
    pro_storePoints () {
      this.$store.commit('startStoreDialog')
      this.$store.commit({
        type: 'getpointsIndex',
        data: 'outdetail_pro'
      })
    }, // 管理员直接对详情页线路商存点
    pro_withdrawPoints () {
      this.$store.commit('startWithdrawDialog')
      this.$store.commit({
        type: 'getpointsIndex',
        data: 'outdetail_pro'
      })
    }, // 管理员直接对详情页线路商提点
    damn_storePoints (index, row) {
      var obj = {
        username: row.username,
        userId: row.userId,
        role: row.role,
        parent: row.parent,
        parentName: row.parentName
      }
      // 
      this.$store.commit({
        type: 'getpointsObject',
        data: obj
      })
      this.$store.commit('startStoreDialog')
      this.$store.commit({
        type: 'getpointsIndex',
        data: 'outdetail_damn'
      })
    }, // 管理员或其上级线路商对其下级线路商或商户存点
    damn_withdrawPoints (index, row) {
      var obj = {
        username: row.username,
        userId: row.userId,
        role: row.role,
        parent: row.parent,
        parentName: row.parentName
      }
      // 
      this.$store.commit({
        type: 'getpointsObject',
        data: obj
      })
      this.$store.commit('startWithdrawDialog')
      this.$store.commit({
        type: 'getpointsIndex',
        data: 'outdetail_damn'
      })
    }, // 管理员或其上级线路商对其下级线路商或商户提点
    getwaterFallSize (size) {
      this.waterFallSize = size
    },  // 详情页线路商财务分页
    getwaterFallPage (page) {
      this.waterFallPage = page
    },  // 详情页线路商财务分页
    getchildManagersSize (size) {
      this.childManagersSize = size
    },  // 详情页下级线路商分页
    getchildManagersPage (page) {
      this.childManagersPage = page
    },  // 详情页下级线路商分页
    getchildMerchantsSize (size) {
      this.childMerchantsSize = size
    },  // 详情页下级商户分页
    getchildMerchantsPage (page) {
      this.childMerchantsPage = page
    }  // 详情页下级商户分页
  }
}
</script>

<style scoped>
	.outdetail-title{text-align: center;}
	h2{font-size: 2.5rem;font-weight: bold;padding: 1rem 0 0 0;}
	h4{font-size: 1.8rem;font-weight: normal;padding: 2rem 0;color: #5a5a5a}
	.simpleinfo,
	.manangeinfo,
	.propertyinfo{width: 98%;margin: 0 auto;vertical-align: baseline;font-size: 0.8rem}
	.simpleform,
	.manangeform,
	.propertyform{background-color: #f5f5f5;padding-left: 3%;padding-bottom: 1rem}

	/**/
	.editform{background-color: #f5f5f5;padding-top: 1rem;padding-left: 1rem}
	/**/
	.simple span {display: inline-block;width: 30%;line-height: 3.5rem;}
	.remark{padding-bottom: 1rem;margin-top: 1rem}
	.remark span {display: inline-block;width: 50%;word-break: }

	.manager-one{padding-top: 1rem}
	.manager-two{}
	.manager-three{padding-bottom: 1rem}

	.manager-one span{display: inline-block; width: 25%;line-height: 3.5rem}
	.manager-two span{display: block; width: 50%;line-height: 3.5rem}
	.manager-three span{display: inline-block; width: 30%;line-height: 3.5rem}

	.margin{margin-bottom: 4rem}
	.green{color: #00CC00}
    .red{color: #FF3300}
    .hidden{opacity: 0;}

    .page {padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 0.5rem;margin-top: 2rem}

    .goParent{color: #108EE9;cursor: pointer;}
    .goParent:hover{text-decoration: underline;text-decoration-color: #108EE9}
</style>
