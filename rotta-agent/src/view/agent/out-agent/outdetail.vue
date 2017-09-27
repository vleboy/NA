<template>
    <div class="outdetail">
        <div class="outdetail-title">
            <h2>{{outdetail.displayName}}</h2>
        </div>
        <div class="simpleinfo">
            <h4>基本信息</h4>
            <div class="simpleform" v-if="this.$store.state.variable.isEdit === false">
                <p class="simple">
                    <span>代理商ID: {{outdetail.displayId}}</span>
                    <span v-if="this.outdetail.parent === '01'">上级线路商: 无</span>
                    <span v-if="this.outdetail.parent !== '01'" @click="goParent()" class="goParent">上级线路商: {{outdetail.parentDisplayName}}</span>
                    <span>线路商标识: {{outdetail.suffix}}</span>
                    <span>负责人: {{outdetail.hostName}}</span>
                    <span>负责人联系方式: {{outdetail.hostContact}}</span>
                    <span>抽成比: {{outdetail.rate}}%</span>
                    <span>代理可放商户名额: {{outdetail.limit}}</span>
                    <span>代理游戏: 
                        <div v-for="item in outdetail.gameList" style="display:inline-block;margin-left:0.25rem">
                            {{item.name}}
                        </div>
                    </span>
                    <span>线路商Email: {{outdetail.managerEmail}}</span>
                    <span>线路商创建时间: {{formatTime(outdetail.createdAt)}}</span>
                    <span>最后登录时间: {{formatTime(outdetail.loginAt)}}</span>
                </p>
                <p class="remark">
                    <span>线路商备注: <span :title="outdetail.remark">{{Remark(outdetail.remark)}}</span></el-input>
                    </span>
                </p>
            </div>
            <div class="editform" v-if="this.$store.state.variable.isEdit === true">
                <el-form label-width='110px' label-position="right" :model="outdetail" ref="outdetail" :rules="rules">
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
                                    {{user(outdetail.parentName)}}
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
                                <el-form-item label="负责人" prop="hostName">
                                    <el-input v-model="outdetail.hostName" icon="edit" :on-icon-click="turnONedit" :disabled="disable"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <span class="hidden">1</span>
                        </el-col>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="负责人联系方式" prop="hostContact">
                                    <el-input v-model="outdetail.hostContact" icon="edit" :on-icon-click="turnONedit" :disabled="disable"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <span class="hidden">1</span>
                        </el-col>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="抽成比" prop="rate">
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
                                <el-form-item label="可放商户名额" prop="limit">
                                    <el-input v-model="outdetail.limit" icon="edit" :on-icon-click="turnONedit" :disabled="disable"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <span class="hidden">1</span>
                        </el-col>
                        <el-col :span="12">
                            <div class="" style="float:left">
                                <el-form-item label="代理游戏">
                                    <el-select v-model="outdetail.gameList" multiple placeholder="请选择" clearable :disabled="disable" style="min-width:21rem">
                                        <el-option v-for="item in outdetail.gameList" :key="item" :label="item.name" :value="item" style="max-width:336px"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <el-button type="text" @click="addGame" style="float:left;margin-left:0.1rem">添加</el-button>
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
                        <el-col :span="1">
                            <span class="hidden">1</span>
                        </el-col>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="线路商Email" prop="managerEmail">
                                    <el-input v-model="outdetail.managerEmail" icon="edit" :on-icon-click="turnONedit" :disabled="disable"></el-input>
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
                    <span>管理员账号: {{user(outdetail.username)}}</span>
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
                <el-form label-width='110px' label-position="right" :model="outdetail" ref="outdetail" :rules="rules">
                    <el-row>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="管理员账号">
                                    {{user(outdetail.username)}}
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <span class="hidden">1</span>
                        </el-col>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="管理员姓名" prop="adminName">
                                    <el-input v-model="outdetail.adminName" icon="edit" :on-icon-click="turnONedit" :disabled="disable"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <span class="hidden">1</span>
                        </el-col>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="管理员密码" prop="password">
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
                                <el-form-item label="管理员Email" prop="adminEmail">
                                    <el-input v-model="outdetail.adminEmail" icon="edit" :on-icon-click="turnONedit" :disabled="disable"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="生效时间" prop="contractPeriod">
                                    <el-date-picker v-model="outdetail.contractPeriod" type="daterange" label="生效时间" :disabled="disable" :editable='false' :picker-options="pickerOptions"></el-date-picker>
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
                                <el-form-item label="管理员联系方式" prop="adminContact">
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
                    <span>当前剩余点数: <span style="color:#FF9900">{{outdetailBill}}</span></span>
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
                                <span>{{user(scope.row.operator)}}</span> 
                                <span class="green" v-if="scope.row.action === 1">{{actions(scope.row.action)}}</span> 
                                <span class="red" v-if="scope.row.action === -1">{{actions(scope.row.action)}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="交易详情(原账+当前操作额=现在余额)" align="center" prop="balance">
                            <template scope="scope">
                                <p v-if="scope.row.action === 1">
                                    <span>{{scope.row.oldBalance}}</span>
                                    <span class="green"> + {{scope.row.amount}}</span> =
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
                                <span>管理员 {{user(scope.row.operator)}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="备注" prop="remark" align="center">
                            <template scope="scope">
                                <span>{{Remark(scope.row.remark)}}</span>
                            </template>
                        </el-table-column>
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
                    <el-table-column prop="balance" label="剩余点数" align="center" width=""></el-table-column>
                    <el-table-column prop="" label="操作人" align="center" width="">
                      <template scope="scope">
                        <span class="red">平台管理员{{scope.row.operator}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="lastBill.updatedAt" label="操作时间" align="center">
                        <template scope="scope">
                            <span>{{formatTime(scope.row.lastBill.updatedAt)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="lastBill.remark" label="备注" align="center">
                        <template scope="scope">
                            <span>{{Remark(scope.row.remark)}}</span>
                        </template>
                    </el-table-column>
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
                <span class="justfy1">商户剩余点数: <span style="color:#FF9900">{{childMerchantsbill}}</span></span>
                <span style="margin-left: 1rem">商户数：{{usedMerchant}}/{{outdetail.limit}}</span>
                <el-button type="text" class="propertybtn justfy2">刷新</el-button>
            </div>
            <div class="propertyform-form">
                <el-table style="width: 98%; font-size: 12px;" border max-height='10px' :data="childMerchants">
                    <el-table-column prop="" label="序号" align="center" width="60" type="index"></el-table-column>
                    <el-table-column prop="suffix" label="线路商标识" align="center" width=""></el-table-column>
                    <el-table-column prop="displayName" label="线路商昵称" align="center" width=""></el-table-column>
                    <el-table-column prop="balance" label="剩余点数" align="center" width=""></el-table-column>
                    <el-table-column prop="" label="操作人" align="center" width="">
                      <template scope="scope">
                        <span class="red">平台管理员</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="lastBill.updatedAt" label="操作时间" align="center" width="">
                        <template scope="scope">
                            <span>{{formatTime(scope.row.lastBill.updatedAt)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="lastBill.remark" label="备注" align="center">
                        <template scope="scope">
                            <span>{{Remark(scope.row.remark)}}</span>
                        </template>
                    </el-table-column>
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
// import { checkEmail, checkUserEmail, checkRate, checkHostname, checkName, checkHostcontact, checkContractPeriod, checkLimit, checkPassword, checkAdmincontact } from '@/behavior/regexp'
import Billtransfer from '@/components/billtransfer'
import { detailTime, formatContractPeriod, billType, formatRemark, formatUsername, formatPoints, formatGamelist } from '@/behavior/format'
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
// import store from '@/store/store'
// import checkform from '@/variables/checkform'
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
    this.$store.dispatch('getOutdetail_child_merchants')
    this.$store.dispatch('getOutdetail_child_managers')
    this.$store.dispatch('getOutdetail_property')
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
    outdetailBill () {
      var x = this.$store.state.variable.outdetailproperty[0] && this.$store.state.variable.outdetailproperty[0].balance || 0
      return this.points(x)
    },
    childManagersbill () {
      var bills = 0
      if (!this.childManagers) {
        bills = 0
      } else {
        for (var i = 0; i < this.childManagers.length; i++) {
          bills += this.childManagers[i].balance
        }
      }
      return bills
    },
    childMerchantsbill () {
      var bills = 0
      if (!this.childMerchants) {
        bills = 0
      } else {
        for (var i = 0; i < this.childMerchants.length; i++) {
          bills += this.childMerchants[i].balance
        }
      }
      return bills
    }
  },
  data () {
    var checkPassword = (rule, value, callback) => {
      // console.log('checkPassword', value)
      var password = function passwordLevel (password) {
        var Modes = 0
        for (let i = 0; i < password.length; i++) {
          Modes |= CharMode(password.charCodeAt(i))
        }
        return bitTotal(Modes)
        // CharMode函数
        function CharMode (iN) {
          if (iN >= 48 && iN <= 57) {
            return 1
          } // 数字
          if (iN >= 65 && iN <= 90) {
            return 2
          } // 大小写
          if ((iN >= 97 && iN <= 122) || (iN >= 65 && iN <= 90)) {
            return 4
          } else {
            return 8
          } // 特殊字符
        }
        // bitTotal函数
        function bitTotal (num) {
          let modes = 0
          for (let i = 0; i < 4; i++) {
            if (num & 1) modes++
            num >>>= 1
          }
          return modes
        }
      }
      if (value === '') {
        callback(new Error('密码不能为空'))
        this.isfinish.password = false
      } else if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
        this.isfinish.password = false
      } else if (value.length > 16) {
        callback(new Error('密码不能多于16位'))
        this.isfinish.password = false
      } else {
        var x = password(value)
        if (x < 3) {
          callback(new Error('密码中必须包含大写字母、小写字母、数字、符号，中任意三种的组合'))
          this.isfinish.password = false
        } else {
          value = value.trim()
          this.isfinish.password = true
          callback()
        }
      }
    } // 验证密码
    var checkLimit = (rule, value, callback) => {
      // console.log('limit', value)
      var num = new RegExp(/^[0-9]/)
      if (value === '') {
        callback(new Error('请输入可用名额'))
        this.isfinish.limit = false
      } else if (!num.exec(value)) {
        callback(new Error('请输入正确的可放商户名额'))
        this.isfinish.limit = false
      } else if (value > 10) {
        callback(new Error('最大可放商户名额为10'))
        this.isfinish.limit = false
      } else {
        this.isfinish.limit = true
        callback()
      }
    } // 验证昵称
    var checkManagerEmail = (rule, value, callback) => {
      // console.log('managerEmail', value)
      var email = new RegExp(/^([a-zA-Z0-9_-]){1,16}@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/)
      // console.log(value)
      if (value === '') {
        callback(new Error('请输入邮箱'))
        this.isfinish.managerEmail = false
      } else if (!email.exec(value)) {
        callback(new Error('请输入正确的邮箱地址'))
        this.isfinish.managerEmail = false
      } else {
        this.isfinish.managerEmail = true
        callback()
      }
    } // 验证线路商邮箱
    var checkadminEmail = (rule, value, callback) => {
      // console.log('adminEmail', value)
      var email = new RegExp(/^([a-zA-Z0-9_-]){1,16}@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/)
      // console.log(value)
      if (value === '') {
        callback(new Error('请输入邮箱'))
        this.isfinish.adminEmail = false
      } else if (!email.exec(value)) {
        callback(new Error('请输入正确的邮箱地址'))
        this.isfinish.adminEmail = false
      } else {
        this.isfinish.adminEmail = true
        callback()
      }
    } // 验证线路商管理员邮箱
    var checkRate = (rule, value, callback) => {
      // console.log('rate', value)
      var num = new RegExp(/^(\d{1,2}(\.\d{1,2})?|100(\.0{1,2})?)$/)
      // console.log(value)
      if (value === '') {
        callback(new Error('请输入抽成比'))
        this.isfinish.rate = false
      } else if (!num.test(value)) {
        callback(new Error('抽成比只能为0.00 - 100.00'))
        this.isfinish.rate = false
      } else if (value < 0 || value > 100) {
        callback(new Error('抽成比应为0~100之间的数字'))
        this.isfinish.rate = false
      } else {
        this.isfinish.rate = true
        callback()
      }
    } // 验证抽成比
    var checkHostname = (rule, value, callback) => {
      // console.log('hostName', value)
      var nick = new RegExp(/^[\u4E00-\u9FA5A-Za-z_]+$/)
      if (value === '') {
        callback(new Error('请输入负责人姓名'))
        this.isfinish.hostName = false
      } else if (!nick.test(value)) {
        callback(new Error('负责人姓名只能输入中文、英文'))
        this.isfinish.hostName = false
      } else if (value.length < 5 || value.length > 16) {
        callback(new Error('负责人姓名长度在5-16之间'))
        this.isfinish.hostName = false
      } else {
        this.isfinish.hostName = true
        callback()
      }
    } // 验证负责人姓名
    var checkHostcontact = (rule, value, callback) => {
      // console.log('hostContact', value)
      var nick = new RegExp(/^[\u4E00-\u9FA5A-Za-z0-9_]+$/)
      if (value === '') {
        callback(new Error('请输入负责人联系方式'))
        this.isfinish.hostContact = false
      } else if (!nick.exec(value)) {
        callback(new Error('负责人联系方式只能输入中文、英文、数字'))
        this.isfinish.hostContact = false
      } else if (value.length < 5 || value.length > 40) {
        callback(new Error('负责人联系方式长度应在5-40位之间'))
        this.isfinish.hostContact = false
      } else {
        this.isfinish.hostContact = true
        callback()
      }
    } // 验证负责人联系方式
    var checkAdminName = (rule, value, callback) => {
      // console.log('adminName', value)
      var nick = new RegExp(/^[\u4E00-\u9FA5A-Za-z_]+$/)
      if (value === '') {
        callback(new Error('请输入姓名'))
        this.isfinish.adminName = false
      } else if (value.length < 5 || value.length > 16) {
        callback(new Error('姓名的长度应在5-16位之间'))
        this.isfinish.adminName = false
      } else if (!nick.test(value)) {
        callback(new Error('姓名只能输入中文、英文'))
        this.isfinish.adminName = false
      } else {
        this.isfinish.adminName = true
        callback()
      }
    } // 验证线路商管理员姓名
    var checkAdmincontact = (rule, value, callback) => {
      // console.log('adminContact', value)
      var nick = new RegExp(/^[\u4E00-\u9FA5A-Za-z0-9_]+$/)
      if (value === '') {
        callback(new Error('请输入管理员联系方式'))
        this.isfinish.adminContact = false
      } else if (!nick.exec(value)) {
        callback(new Error('管理员联系方式只能输入中文、英文、数字'))
        this.isfinish.adminContact = false
      } else if (value.length < 5 || value.length > 40) {
        callback(new Error('管理员联系方式长度应在5-40位之间'))
        this.isfinish.adminContact = false
      } else {
        this.isfinish.adminContact = true
        callback()
      }
    } // 验证线路商管理员联系方式
    var checkContractPeriod = (rule, value, callback) => {
      // console.log('contractPeriod', value)
      if (value === 0) {
        this.isfinish.contractPeriod = true
        callback()
      } else if (value === [null, null]) {
        this.isfinish.contractPeriod = false
        callback(new Error('请选择合同生效时间'))
      } else if (value[0] !== null || value[1] !== null) {
        this.isfinish.contractPeriod = true
        callback()
      }
    } // 验证合同有效时间
    return {
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      // isforever: true,
      gameList: [],
      balance: 0, // 余额
      loading: false,
      disable: true, // 禁用输入框
      bills: '',  // 账户余额
      waterFallSize: 5, // 线路商详情页财务信息分页
      waterFallPage: 1, // 线路商详情页财务信息分页
      childManagersSize: 5, // 线路商详情页所属线路商分页
      childManagersPage: 1, // 线路商详情页所属线路商分页
      childMerchantsSize: 5, // 线路商详情页所属商户分页
      childMerchantsPage: 1, // 线路商详情页所属商户分页
      isfinish: {
        password: true,
        limit: true,
        adminEmail: true,
        managerEmail: true,
        rate: true,
        hostName: true,
        adminContact: true,
        adminName: true,
        hostContact: true,
        contractPeriod: true
      },
      rules: {
        password: [
          {validator: checkPassword, trigger: 'change'}
        ],
        limit: [
          {validator: checkLimit, trigger: 'change'}
        ],
        adminEmail: [
          {validator: checkadminEmail, trigger: 'change'}
        ],
        managerEmail: [
          {validator: checkManagerEmail, trigger: 'change'}
        ],
        rate: [
          {validator: checkRate, trigger: 'change'}
        ],
        hostName: [
          {validator: checkHostname, trigger: 'change'}
        ],
        adminContact: [
          {validator: checkAdmincontact, trigger: 'change'}
        ],
        adminName: [
          {validator: checkAdminName, trigger: 'change'}
        ],
        hostContact: [
          {validator: checkHostcontact, trigger: 'change'}
        ],
        contractPeriod: [
          {validator: checkContractPeriod, trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    addGame () {
      var data = {
        userId: this.$store.state.variable.outdetaildata.parent
      }
      invoke({
        url: api.allGames,
        method: api.post,
        data: data
      }).then(
        result => {
          const [err, ret] = result
          if (err) {
          } else {
            var data = ret.data.payload
            this.outdetail.gameList = data
          }
        }
      )
    }, // 新增游戏
    user (name) {
      return formatUsername(name)
    }, // 格式化用户名
    Remark (remark) {
      return formatRemark(remark)
    }, // 格式化备注
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
    formatGamelist (a) {
      return formatGamelist(a).join(' ')
    }, // 格式化游戏列表
    formatTime (time) {
      return detailTime(time)
    },
    points (points) {
      return formatPoints(points)
    }, // 格式化点数
    contractPeriod (time) {
      if (this.outdetail) {
        return formatContractPeriod(time)
      }
    },
    actions (bill) {
      return billType(bill)
    },
    turnONedit () {
      this.disable = false
    }, // 开启编辑
    changeContract () {
      console.log('永久', this.outdetail.isforever)
      // this.outdetail.isforever = !this.outdetail.isforever
      if (this.outdetail.isforever === true) {
        this.outdetail.contractPeriod = 0
        this.isfinish.contractPeriod = true
      } else {
        this.outdetail.contractPeriod = [null, null]
        this.isfinish.contractPeriod = false
      }
      console.log(this.outdetail.contractPeriod)
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
            this.isfinish.password = true
          }
        }
      )
    }, // 生成密码
    submitEdit () {
      // console.log('finish', this.isfinish)
      if (this.isfinish.password === false || this.isfinish.limit === false || this.isfinish.adminEmail === false || this.isfinish.managerEmail === false || this.isfinish.rate === false || this.isfinish.hostName === false || this.isfinish.adminContact === false || this.isfinish.adminName === false || this.isfinish.hostContact === false || this.isfinish.contractPeriod === false) {
        this.$message({
          message: '修改信息错误',
          type: 'error'
        })
      } else {
        this.loading = true
        var outdetailID = ''
        if (this.outdetail.contractPeriod !== 0) {
          for (var i = this.outdetail.contractPeriod.length - 1; i >= 0; i--) {
            if (isNaN(this.outdetail.contractPeriod[i].toString())) {
              this.outdetail.contractPeriod[i] = new Date(this.outdetail.contractPeriod[i].toString()).getTime()
            }
          }
        }
        if (!this.outdetail.remark) {
          this.outdetail.remark = 'NULL!'
        }
        if (!this.$store.state.variable.outdetailID) {
          outdetailID = localStorage.outdetailID
        } else {
          outdetailID = this.$store.state.variable.outdetailID
        }
        console.log('修改提交的数据是:', this.outdetail)
        invoke({
          url: api.managers + '/' + outdetailID,
          method: api.post,
          data: this.outdetail
        }).then(
          result => {
            const [err, ret] = result
            if (err) {
              this.$message({
                message: err.msg,
                type: 'warning'
              })
              this.loading = false
            } else {
              var data = ret.data.payload
              console.log(data)
              this.disable = true
              this.loading = false
              this.$message({
                message: '修改成功',
                type: 'success'
              })
            }
          }
        )
      }
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
            console.log('操作成功返回数据', data)
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
            console.log('操作成功返回数据', data)
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
      // console.log('操作的用户为 ' + row.username + ' / ' + '操作的用户ID为 ' + row.userId + '/' + '操作的用户role为' + row.role)
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
      // console.log('操作的用户为 ' + row.username + ' / ' + '操作的用户ID为 ' + row.userId + '/' + '操作的用户role为' + row.role)
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
	.outdetail .outdetail-title{text-align: center;}
	.outdetail h2{font-size: 2.5rem;font-weight: bold;padding: 1rem 0 0 0;}
	.outdetail h4{font-size: 1.8rem;font-weight: normal;padding: 2rem 0;color: #5a5a5a}
	.outdetail .simpleinfo,
	.outdetail .manangeinfo,
	.outdetail .propertyinfo{width: 98%;margin: 0 auto;vertical-align: baseline;font-size: 0.8rem}
	.outdetail .simpleform,
	.outdetail .manangeform,
	.outdetail .propertyform{background-color: #f5f5f5;padding-left: 3%;padding-bottom: 1rem}

	/**/
	.outdetail .editform{background-color: #f5f5f5;padding-top: 1rem;padding-left: 1rem}
	/**/
	.outdetail .simple span {display: inline-block;width: 30%;line-height: 3.5rem;}
	.outdetail .remark{padding-bottom: 1rem;margin-top: 1rem}
	.outdetail .remark span {display: inline-block;width: 50%;text-overflow: ellipsis; overflow: hidden; white-space: nowrap; vertical-align: -0.2rem}

	.outdetail .manager-one{padding-top: 1rem}
	.outdetail .manager-two{}
	.outdetail .manager-three{padding-bottom: 1rem}

	.outdetail .manager-one span{display: inline-block; width: 25%;line-height: 3.5rem}
	.outdetail .manager-two span{display: block; width: 50%;line-height: 3.5rem}
	.outdetail .manager-three span{display: inline-block; width: 30%;line-height: 3.5rem}

	.outdetail .margin{margin-bottom: 4rem}
	.outdetail .green{color: #00CC00}
    .outdetail .red{color: #FF3300}
    .outdetail .hidden{opacity: 0;}

    .outdetail .page {padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 0.5rem;margin-top: 2rem}

    .outdetail .goParent{color: #108EE9;cursor: pointer;}
    .outdetail .goParent:hover{text-decoration: underline;text-decoration-color: #108EE9}
</style>
