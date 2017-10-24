<template>
    <div class="outdetail">
        <div class="outdetail-title">
            <h2>{{outdetail.displayName}}</h2>
        </div>
        <div class="simpleinfo">
            <h4>基本信息</h4>
            <div class="editform">
                <el-form label-width='110px' label-position="right" :model="outdetail" :rules="rules" ref="outdetail">
                    <el-row>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="线路商ID">
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
                                    <span v-if="outdetail.parentRole != '1'">
                                      <span v-if="this.outdetail.parent != '01' && this.loginLevel < this.outdetail.level" @click="goParent()" class="goParent">{{outdetail.parentDisplayName}}</span>
                                      <span v-if="this.outdetail.parent != '01' && this.loginLevel >= this.outdetail.level">
                                        {{outdetail.parentDisplayName}}</span>
                                    </span>
                                    <span v-if="outdetail.parentRole == '1'">
                                        直属于平台
                                    </span>
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
                                <el-form-item label="负责人" v-show="this.disable == true">
                                    {{outdetail.hostName}}
                                </el-form-item>
                                <el-form-item label="负责人" prop="hostName" v-show="this.disable == false">
                                    <el-input v-model="outdetail.hostName"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <span class="hidden">1</span>
                        </el-col>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="负责人联系方式" v-show="this.disable == true">
                                    {{outdetail.hostContact}}
                                </el-form-item>
                                <el-form-item label="负责人联系方式" prop="hostContact" v-show="this.disable == false">
                                    <el-input v-model="outdetail.hostContact"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <span class="hidden">1</span>
                        </el-col>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="抽成比" v-show="this.disable == true">
                                    {{outdetail.rate}}%
                                </el-form-item>
                                <el-form-item label="抽成比" prop="rate" v-show="this.disable == false">
                                    <el-input v-model="outdetail.rate">
                                        <template slot="prepend">%</template>
                                    </el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="可放商户名额" v-show="this.disable == true">
                                    {{outdetail.limit}}
                                </el-form-item>
                                <el-form-item label="可放商户名额" prop="limit" v-show="this.disable == false">
                                    <el-input v-model="outdetail.limit"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <span class="hidden">1</span>
                        </el-col>
                        <el-col :span="6">
                            <div class="" style="float:left">
                                <el-form-item label="线路商游戏" v-show="this.disable == true">
                                    <div v-for="item in outdetail.gameList" style="display:inline-block;margin-left:0.25rem">
                                        {{item.name}}
                                    </div>
                                </el-form-item>
                                <el-form-item label="线路商游戏" v-show="this.disable == false">
                                    <el-checkbox-group v-model="selectGame">
                                        <el-checkbox v-for="item in parentGamelist" :label="item" :key="item" style="display:inline-block;margin-left:0.25rem">{{item}}</el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <span class="hidden">1</span>
                        </el-col>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="线路商Email" v-show="this.disable == true">
                                    {{outdetail.managerEmail}}
                                </el-form-item>
                                <el-form-item label="线路商Email" prop="managerEmail" v-show="this.disable == false">
                                    <el-input v-model="outdetail.managerEmail"></el-input>
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
                        <el-col :span="18">
                            <div class="">
                                <el-form-item label="备注" v-show="this.disable == true">
                                    <div style="word-wrap: break-word;word-break: normal;">{{Remark(outdetail.remark)}}</div>
                                </el-form-item>
                                <el-form-item label="备注" v-show="this.disable == false">
                                    <el-input autosize v-model="outdetail.remark"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>
        <div class="manangeinfo">
            <h4>管理信息
              <div style="float:right;margin-right:2rem">
                <el-button type="primary" @click="submitEdit" :loading="loading" v-if="this.disable == false">提交修改</el-button>
                <el-button type="primary" @click="turnONedit" v-if="this.disable == true">编辑</el-button>
              </div>
            </h4>
            <div class="editform">
                <el-form label-width='110px' label-position="right" :model="outdetail" :rules="rules" ref="outdetail">
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
                                <el-form-item label="管理员姓名" v-show="this.disable == true">
                                    {{outdetail.adminName}}
                                </el-form-item>
                                <el-form-item label="管理员姓名" prop="adminName" v-show="this.disable == false">
                                    <el-input v-model="outdetail.adminName"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <span class="hidden">1</span>
                        </el-col>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="管理员密码" v-show="this.disable == true">
                                    {{outdetail.password}}
                                </el-form-item>
                                <el-form-item label="管理员密码" prop="password" v-show="this.disable == false">
                                    <el-input v-model="outdetail.password">
                                        <el-button slot="append" @click="randomPassword">生成</el-button>
                                    </el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="管理员Email" v-show="this.disable == true">
                                    {{outdetail.adminEmail}}
                                </el-form-item>
                                <el-form-item label="管理员Email" prop="adminEmail" v-show="this.disable == false">
                                    <el-input v-model="outdetail.adminEmail"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="生效时间" v-show="this.disable == true">
                                    {{contractPeriod(outdetail.contractPeriod)}}
                                </el-form-item>
                                <el-form-item label="生效时间" prop="contractPeriod" v-show="this.disable == false">
                                    <el-date-picker v-model="outdetail.contractPeriod" type="daterange" label="生效时间" :disabled="outdetail.isforever" :editable='false' :picker-options="pickerOptions"></el-date-picker>
                                    <el-checkbox v-model="outdetail.isforever" @change="changeContract">永久</el-checkbox>
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
                        <el-col :span="1">
                            <span class="hidden">1</span>
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
                                <el-form-item label="管理员联系方式" v-show="this.disable == true">
                                    {{outdetail.adminContact}}
                                </el-form-item>
                                <el-form-item label="管理员联系方式" prop="adminContact" v-show="this.disable == false">
                                    <el-input v-model="outdetail.adminContact"></el-input>
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
                    <el-button type="text" class="propertybtn" @click="refreshOut">刷新</el-button>
                    <el-button type="text" class="propertybtn" @click="pro_storePoints" v-if="this.outdetail.status === 1 && isRight">存点</el-button>
                    <el-button type="text" class="propertybtn" @click="pro_withdrawPoints" v-if="this.outdetail.status === 1 && isRight">提取</el-button>
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
                                <span v-if="scope.row.fromLevel < scope.row.toLevel">
                                    {{(scope.row.fromDisplayName)}} 对 {{(scope.row.toDisplayName)}} <span>存点</span>
                                </span>
                                <span v-if="scope.row.fromLevel > scope.row.toLevel">
                                    {{(scope.row.toDisplayName)}} 对 {{(scope.row.fromDisplayName)}} <span>提点</span>
                                </span>
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
                                    <span class="red"> - {{Math.abs(scope.row.amount)}}</span> =
                                    <span>{{scope.row.balance}}</span>
                                </p>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作人" prop="operator" align="center" width="">
                            <template scope="scope">
                                <span class="red">管理员 {{user(scope.row.operator)}}</span>
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
                      <el-pagination layout="prev, pager, next, sizes, jumper" :total="this.$store.state.variable.outdetailproperty.length" :page-sizes="[10, 20]" :page-size="waterFallSize" @size-change="getwaterFallSize" @current-change="getwaterFallPage"></el-pagination>
                    </div>
            </div>
        </div>
        <div class="propertyinfo">
            <h4>下级线路商列表</h4>
            <div class="propertyform">
                <div class="propertyform-header">
                    <span>当前剩余点数: <span style="color:#FF9900"> {{childManagersbill}} </span></span>
                    <el-button type="text" class="propertybtn" @click="refreshOutmanager">刷新</el-button>
                </div>
                <div class="propertyform-form">
                    <el-table style="width: 98%; font-size: 12px;" border max-height='10px' :data="childManagers">
                    <el-table-column prop="" label="序号" align="center" width="60" type="index"></el-table-column>
                    <el-table-column prop="suffix" label="线路商标识" align="center" width=""></el-table-column>
                    <el-table-column prop="displayName" label="线路商昵称" align="center" width="">
                        <template scope="scope">
                            <span class="gorouter" @click="outYouWanted(scope.row.userId)">{{(scope.row.displayName)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="balance" label="剩余点数" align="center" width=""></el-table-column>
                    <el-table-column label="操作人" prop="operator" align="center" width="">
                        <template scope="scope">
                            <span class="red">管理员 {{user(scope.row.operator)}}</span>
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
                    <el-table-column prop="" label="操作(对旗下线路商操作)" align="center" v-if="isRight">
                      <template scope="scope">
                        <el-button type="text" @click="damn_storePoints(scope.$index, scope.row)" v-if="scope.row.status === 1">存点</el-button>
                        <el-button type="text" @click="damn_withdrawPoints(scope.$index, scope.row)" v-if="scope.row.status === 1">提点</el-button>
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
                <!-- <span style="margin-left: 1rem">商户数：{{usedMerchant}}/{{outdetail.limit}}</span> -->
                <el-button type="text" class="propertybtn justfy2" @click="refreshOutmerchant">刷新</el-button>
            </div>
            <div class="propertyform-form">
                <el-table style="width: 98%; font-size: 12px;" border max-height='10px' :data="childMerchants">
                    <el-table-column prop="" label="序号" align="center" width="60" type="index"></el-table-column>
                    <el-table-column prop="suffix" label="商户标识" align="center" width=""></el-table-column>
                    <el-table-column prop="displayName" label="商户昵称" align="center" width="">
                        <template scope="scope">
                            <span class="gorouter" @click="comYouWanted(scope.row.userId)">{{(scope.row.displayName)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="balance" label="剩余点数" align="center" width=""></el-table-column>
                    <el-table-column label="操作人" prop="operator" align="center" width="">
                        <template scope="scope">
                            <span class="red">管理员 {{user(scope.row.operator)}}</span>
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
                    <el-table-column prop="" label="操作(对旗下商户操作)" align="center" v-if="isRight">
                      <template scope="scope">
                        <el-button type="text" @click="damn_storePoints(scope.$index, scope.row)" v-if="scope.row.status === 1">存点</el-button>
                        <el-button type="text" @click="damn_withdrawPoints(scope.$index, scope.row)" v-if="scope.row.status === 1">提点</el-button>
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
import { detailTime, formatContractPeriod, billType, formatRemark, formatUsername, formatPoints, formatGamelist } from '@/behavior/format'
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
import { randomPassword } from '@/behavior/randomPassword'
export default {
  components: {
    Billtransfer
  },
  beforeCreate () {
    this.$store.commit('startLoading')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'outdetail'
    })
    this.$store.commit('returnLocalStorage')
    this.$store.dispatch('getOutdetail')
    this.$store.dispatch('getOutdetail_child_merchants')
    this.$store.dispatch('getOutdetail_child_managers')
    this.$store.dispatch('getOutdetail_property')
  },
  mounted () {
    this.addGame()
  },
  computed: {
    outdetail () {
      return this.$store.state.variable.outdetaildata
    },
    isRight () {
      var right = false
      if (Number(localStorage.loginLevel) > this.$store.state.variable.outdetaildata.level) {
        right = false
      } else if (Number(localStorage.loginLevel) < this.$store.state.variable.outdetaildata.level) {
        right = true
      }
      return right
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
      return this.points(bills)
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
      return this.points(bills)
    }
  },
  data () {
    var checkPassword = (rule, value, callback) => {
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
      // console.log('该用户下级个数', this.outdetail.children)
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
      } else if (value < this.outdetail.merchantUsedCount) {
        callback(new Error('最小可放商户名额为' + this.outdetail.merchantUsedCount))
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
      } else if (value.length < 2 || value.length > 16) {
        callback(new Error('负责人姓名长度在2-16之间'))
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
      } else if (value.length < 2 || value.length > 16) {
        callback(new Error('姓名的长度应在2-16位之间'))
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
      if (value == 0) {
        this.isfinish.contractPeriod = true
        callback()
      } else if (value == [null, null]) {
        this.isfinish.contractPeriod = false
        callback(new Error('请选择合同生效时间'))
      } else if (value[0] !== null || value[1] !== null) {
        this.isfinish.contractPeriod = true
        callback()
      }
    } // 验证合同有效时间
    return {
      loginLevel: Number(localStorage.loginLevel), // 登陆用户等级
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      // isforever: true,
      gameList: [], // 上级拥有的游戏(包含所有的对象)
      parentGamelist: [], // 上级拥有的游戏(只带名字的)
      selectGame: [], // 修改游戏选中值(只带名字的)
      balance: 0, // 余额
      loading: false,
      disable: true, // 禁用输入框
      bills: '',  // 账户余额
      waterFallSize: 10, // 线路商详情页财务信息分页
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
    refreshOutmerchant () {
      this.$store.commit('startLoading')
      this.$store.dispatch('getOutdetail_child_merchants')
    }, // 刷新详情页下级商户账单
    refreshOutmanager () {
      this.$store.commit('startLoading')
      this.$store.dispatch('getOutdetail_child_managers')
    }, // 刷新详情页下级线路商账单
    refreshOut () {
      this.$store.commit('startLoading')
      this.$store.dispatch('getOutdetail_property')
    }, // 刷新该账户账单
    outYouWanted (ID) {
      // console.log('当前用户ID', ID)
      this.$store.commit({
        type: 'recordOutdetailID',
        data: ID
      })
      this.$store.commit('closeEdit')
      this.$router.push('outdetail')
      this.$store.commit('startLoading')
      this.$store.dispatch('getOutdetail')
      this.$store.dispatch('getOutdetail_property')
      this.$store.dispatch('getOutdetail_child_managers')
      this.$store.dispatch('getOutdetail_child_merchants')
    }, // 详情页下级线路商跳转
    comYouWanted (ID) {
      // console.log('当前用户ID', ID)
      this.$store.commit({
        type: 'recordComdetailID',
        data: ID
      })
      this.$router.push('comdetail')
      this.$store.commit('startLoading')
      this.$store.dispatch('getComdetail')
      this.$store.dispatch('getComdetail_property')
    }, // 详情页下级商户跳转
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
            this.gameList = data
            for(let item of data) {
              if (item.name) {
                this.parentGamelist.push(item.name)
              }
            }
          }
        }
      )
    }, // 获取上级拥有游戏
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
      for (let item of this.outdetail.gameList) {
        if (item.name) {
          this.selectGame.push(item.name)
        }
      }
      this.disable = false
    }, // 开启编辑
    changeContract () {
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
      var newpassword = randomPassword()
      this.outdetail.password = newpassword
    }, // 生成密码
    submitEdit () {
      var wrong = false
      for (let item of Object.values(this.isfinish)) {
        if (item == false) {
          wrong = true
          break
        }
      }
      if (wrong) {
        this.$message({
            message: '修改信息错误',
            type: 'error'
          })
      } else {
        wrong = !wrong
        this.loading = true
        var outdetailID = ''
        this.outdetail.gameList = []
        for (let outside of this.gameList) {
          for (let inside of this.selectGame) {
            if (outside.name == inside) {
              this.outdetail.gameList.push(outside)
            }
          }
        }
        this.outdetail.gameList = Array.from(new Set(this.outdetail.gameList))
        if (this.outdetail.contractPeriod !== 0) {
          for (var i = this.outdetail.contractPeriod.length - 1; i >= 0; i--) {
            if (isNaN(this.outdetail.contractPeriod[i].toString())) {
              this.outdetail.contractPeriod[i] = new Date(this.outdetail.contractPeriod[i].toString()).getTime()
            }
          }
        }
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
              this.$message({
                message: err.msg,
                type: 'warning'
              })
              this.loading = false
            } else {
              var data = ret.data.payload
              // console.log(data)
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
            // console.log('操作成功返回数据', data)
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
            // console.log('操作成功返回数据', data)
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
      var user = {
        username: this.outdetail.username,
        userId: this.outdetail.userId,
        role: this.outdetail.role,
        parentId: this.outdetail.parent,
        parentName: this.outdetail.parentDisplayName
      }
      this.$store.commit({
        type: 'recordNowlistUser',
        data: user
      })
      this.$store.commit({
        type: 'getpointsIndex',
        data: 'store'
      })
    }, // 管理员直接对详情页线路商存点
    pro_withdrawPoints () {
      var user = {
        username: this.outdetail.username,
        userId: this.outdetail.userId,
        role: this.outdetail.role,
        parentId: this.outdetail.parent,
        parentName: this.outdetail.parentDisplayName
      }
      this.$store.commit({
        type: 'recordNowlistUser',
        data: user
      })
      this.$store.commit({
        type: 'getpointsIndex',
        data: 'withdraw'
      })
    }, // 管理员直接对详情页线路商提点
    damn_storePoints (index, row) {
      var user = {
        username: row.username,
        userId: row.userId,
        role: row.role,
        parentId: row.parent,
        parentName: row.parentName
      }
      this.$store.commit({
        type: 'recordNowlistUser',
        data: user
      })
      this.$store.commit({
        type: 'getpointsIndex',
        data: 'store'
      })
    }, // 管理员或其上级线路商对其下级线路商或商户存点
    damn_withdrawPoints (index, row) {
      var user = {
        username: row.username,
        userId: row.userId,
        role: row.role,
        parentId: row.parent,
        parentName: row.parentName
      }
      this.$store.commit({
        type: 'recordNowlistUser',
        data: user
      })
      this.$store.commit({
        type: 'getpointsIndex',
        data: 'withdraw'
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
    .outdetail .el-icon-edit{color: #20a0ff;margin-left: 0.2rem;cursor: pointer;}
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

    .outdetail .manager-one{padding-top: 1rem}
    .outdetail .manager-two{}
    .outdetail .manager-three{padding-bottom: 1rem}

    .outdetail .margin{margin-bottom: 4rem}
    .outdetail .green{color: #00CC00}
    .outdetail .red{color: #FF3300}
    .outdetail .hidden{opacity: 0;}

    .outdetail .page {padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 0.5rem;margin-top: 2rem}

    .outdetail .goParent{color: #108EE9;cursor: pointer;}
    .outdetail .goParent:hover{text-decoration: underline;text-decoration-color: #108EE9}

    .outdetail .gorouter{cursor: pointer;color: #20a0ff}
</style>
