<template>
    <div class="comdetail">
        <div class="comdetail-title">
            <h2>{{comdetail.displayName}}</h2>
        </div>
        <div class="simpleinfo">
            <div class="parent">
                <h4>基本信息</h4>
                <p v-if="this.comdetail.parent !== '01'">所属线路商: <span class="router-link" title="跳转至所属上级详情页" @click="goParent">{{comdetail.parentDisplayName}}</span>
                </p>
            </div>
            <div class="editform">
                <el-form label-width='110px' label-position="right" :model="comdetail" ref="comdetail" :rules="rules">
                    <el-row>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="商户ID">
                                    {{comdetail.displayId}}
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <span class="hidden">1</span>
                        </el-col>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="上级商户">
                                    {{user(comdetail.parentName)}}
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <span class="hidden">1</span>
                        </el-col>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="商户标识">
                                    {{comdetail.suffix}}
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="负责人" v-show="this.disable == true">
                                    {{(comdetail.hostName)}}
                                </el-form-item>
                                <el-form-item label="负责人" prop="hostName" v-show="this.disable == false">
                                    <el-input v-model="comdetail.hostName"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <span class="hidden">1</span>
                        </el-col>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="负责人联系方式" v-show="this.disable == true">
                                    {{comdetail.hostContact}}
                                </el-form-item>
                                <el-form-item label="负责人联系方式" prop="hostContact" v-show="this.disable == false">
                                    <el-input v-model="comdetail.hostContact"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <span class="hidden">1</span>
                        </el-col>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="抽成比" v-show="this.disable == true">
                                    {{comdetail.rate}}%
                                </el-form-item>
                                <el-form-item label="抽成比" prop="rate" v-show="this.disable == false">
                                    <el-input v-model="comdetail.rate">
                                        <template slot="prepend">%</template>
                                    </el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="商户Email" v-show="this.disable == true">
                                    {{comdetail.merchantEmail}}
                                </el-form-item>
                                <el-form-item label="商户Email" prop="merchantEmail" v-show="this.disable == false">
                                    <el-input v-model="comdetail.merchantEmail"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <span class="hidden">1</span>
                        </el-col>
                        <el-col :span="12">
                            <div class="" style="float:left">
                                <el-form-item label="商户游戏" v-show="this.disable == true">
                                    <div v-for="item in comdetail.gameList" style="display:inline-block;margin-left:0.25rem">
                                        {{item.name}}
                                    </div>
                                </el-form-item>
                                <el-form-item label="商户游戏" v-show="this.disable == false">
                                    <el-checkbox-group v-model="selectGame">
                                        <el-checkbox v-for="item in parentGamelist" :label="item" :key="item" style="display:inline-block;margin-left:0.25rem">{{item}}</el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="创建时间">
                                    {{formatTime(comdetail.createdAt)}}
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <span class="hidden">1</span>
                        </el-col>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="最后登录时间">
                                    {{formatTime(comdetail.loginAt)}}
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <span class="hidden">1</span>
                        </el-col>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="线路号">
                                    {{msn(comdetail.msn)}}
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="商户前端域名" v-show="disable == true">
                                    {{comdetail.frontURL}}
                                </el-form-item>
                                <el-form-item label="商户前端域名" prop="frontURL" v-show="disable == false">
                                    <el-input autosize v-model="comdetail.frontURL"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="">
                                <el-form-item label="商户密匙">
                                    <span>{{comdetail.apiKey}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="商户白名单" v-show="disable == true">
                                    {{comdetail.loginWhiteList}}
                                </el-form-item>
                                <el-form-item label="商户白名单" prop="loginWhiteList" v-show="disable == false">
                                    <el-input autosize v-model="comdetail.loginWhiteList"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="18">
                            <div class="">
                                <el-form-item label="备注" v-show="this.disable == true">
                                    <div style="word-wrap: break-word;word-break: normal;">{{Remark(comdetail.remark)}}</div>
                                </el-form-item>
                                <el-form-item label="备注" v-show="this.disable == false">
                                    <el-input autosize v-model="comdetail.remark"></el-input>
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
              <el-button type="primary" @click="submitEdit" :loading="loading" v-if="this.disable === false">提交修改</el-button>
              <el-button type="primary" @click="turnONedit" v-if="this.disable === true">编辑</el-button>
            </div>
          </h4>
            <div class="editform">
                <el-form label-width='110px' label-position="right" :model="comdetail" ref="comdetail" :rules="rules">
                    <el-row>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="管理员账号">
                                    {{user(comdetail.username)}}
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <span class="hidden">1</span>
                        </el-col>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="管理员姓名" v-show="this.disable == true">
                                    {{comdetail.adminName}}
                                </el-form-item>
                                <el-form-item label="管理员姓名" prop="adminName" v-show="this.disable == false">
                                    <el-input v-model="comdetail.adminName"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <span class="hidden">1</span>
                        </el-col>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="管理员密码" v-show="this.disable == true">
                                    {{comdetail.password}}
                                </el-form-item>
                                <el-form-item label="管理员密码" prop="password" v-show="this.disable == false">
                                    <el-input v-model="comdetail.password">
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
                                    {{comdetail.adminEmail}}
                                </el-form-item>
                                <el-form-item label="管理员Email" prop="adminEmail" v-show="this.disable == false">
                                    <el-input v-model="comdetail.adminEmail"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <span class="hidden">1</span>
                        </el-col>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="生效时间" v-show="this.disable == true">
                                    {{contractPeriod(comdetail.contractPeriod)}}
                                </el-form-item>
                                <el-form-item label="生效时间" prop="contractPeriod" v-show="this.disable == false">
                                    <el-date-picker v-model="comdetail.contractPeriod" type="daterange" label="生效时间" :disabled="comdetail.isforever" :editable='false' :picker-options="pickerOptions"></el-date-picker>
                                    <el-checkbox v-model="comdetail.isforever" @change="changeContract">永久</el-checkbox>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="上次登录时间">
                                    {{formatTime(comdetail.loginAt)}}
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <span class="hidden">1</span>
                        </el-col>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="上次登录IP">
                                    {{comdetail.lastIP}}
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="管理员联系方式" v-show="this.disable == true">
                                    {{comdetail.adminContact}}
                                </el-form-item>
                                <el-form-item label="管理员联系方式" prop="adminContact" v-show="this.disable == false">
                                    <el-input v-model="comdetail.adminContact"></el-input>
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
                    <span>当前剩余点数: <span style="color:#FF9900">{{comBills}}</span></span>
                    <el-button type="text" class="propertybtn" @click="refreshCom">刷新</el-button>
                    <el-button type="text" class="propertybtn" @click="storePoints">存点</el-button>
                    <el-button type="text" class="propertybtn" @click="withdrawPoints">提取</el-button>
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
                                <span>{{user(scope.row.operator)}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="备注" prop="remark" align="center" width="65">
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
                    </el-table>
                </div>
                <div class="page">
                    <el-pagination layout="prev, pager, next, sizes, jumper" :total="this.$store.state.variable.comdetailproperty.length" :page-sizes="[20, 50]" :page-size="page" @size-change="getnowSize" @current-change="getnowPage"></el-pagination>
                </div>
            </div>
        </div>
        <billtransfer></billtransfer>
    </div>
</template>

<script>
import Billtransfer from '@/components/billtransfer'
import { detailTime, formatContractPeriod, billType, formatRemark, formatUsername, formatMSN, formatPoints } from '@/behavior/format'
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
      data: 'comdetail'
    })
    this.$store.commit('returnLocalStorage')
    this.$store.dispatch('getComdetail')
    this.$store.dispatch('getComdetail_property')
  },
  mounted () {
    this.addGame()
  },
  computed: {
    comdetail () {
      return this.$store.state.variable.comdetaildata
    },
    waterFall () {
      var waterFall = this.$store.state.variable.comdetailproperty
      if (this.page === 1) {
        waterFall = waterFall.slice(0, this.size)
      } else {
        waterFall = waterFall.slice(((this.page - 1) * this.size), this.size * this.page)
      }
      return waterFall
    },
    comBills () {
      var x = this.$store.state.variable.comdetailproperty[0] && this.$store.state.variable.comdetailproperty[0].balance || 0
      return this.points(x)
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
    var checkMerchantEmail = (rule, value, callback) => {
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
    } // 验证商户邮箱
    var checkadminEmail = (rule, value, callback) => {
      var email = new RegExp(/^([a-zA-Z0-9_-]){1,16}@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/)
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
    } // 验证商户管理员邮箱
    var checkRate = (rule, value, callback) => {
      var num = new RegExp(/^(\d{1,2}(\.\d{1,2})?|100(\.0{1,2})?)$/)
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
    } // 验证商户管理员姓名
    var checkAdmincontact = (rule, value, callback) => {
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
    } // 验证商户管理员联系方式
    var checkLoginWhiteList = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入白名单'))
        this.isfinish.loginWhitelist = false
      } else {
        var ip = new RegExp(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/)
        value = value.split(';')
        for (var i = value.length - 1; i >= 0; i--) {
          if (!ip.exec(value[i])) {
            this.isfinish.loginWhitelist = false
            callback(new Error('请输入正确的白名单'))
          } else {
            this.isfinish.loginWhitelist = true
            callback()
          }
        }
      }
    } // 验证商户白名单
    var checkURL = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入域名'))
        this.isfinish.frontURL = false
      } else {
        this.isfinish.frontURL = true
        callback()
      }
    } // 验证前端域名
    var checkContractPeriod = (rule, value, callback) => {
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
      gameList: [], // 上级拥有的游戏(包含所有的对象)
      parentGamelist: [], // 上级拥有的游戏(只带名字的)
      selectGame: [], // 修改游戏选中值(只带名字的)
      size: 20,
      page: 1,
      loading: false, // 加载动画
      disable: true, // 禁用输入框
      balance: 0,
      isfinish: {
        password: true,
        adminEmail: true,
        merchantEmail: true,
        rate: true,
        hostName: true,
        adminContact: true,
        adminName: true,
        hostContact: true,
        contractPeriod: true,
        loginWhiteList: true,
        frontURL: true
      },
      rules: {
        password: [
          {validator: checkPassword, trigger: 'change'}
        ],
        adminEmail: [
          {validator: checkadminEmail, trigger: 'change'}
        ],
        merchantEmail: [
          {validator: checkMerchantEmail, trigger: 'change'}
        ],
        loginWhiteList: [
          {validator: checkLoginWhiteList, trigger: 'change'}
        ],
        frontURL: [
          {validator: checkURL, trigger: 'change'}
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
    refreshCom () {
      this.$store.commit('startLoading')
      this.$store.dispatch('getComdetail_property')
    }, // 刷新商户详情页账单
    addGame () {
      var data = {
        userId: this.$store.state.variable.comdetaildata.parent
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
    }, // 新增游戏
    msn (msn) {
      return formatMSN(msn)
    }, // 格式化线路号
    user (name) {
      return formatUsername(name)
    }, // 格式化用户名
    Remark (remark) {
      return formatRemark(remark)
    }, // 格式化备注
    goParent () {
      // console.log('上级线路商ID', this.comdetail.parent, '上级线路商是:', this.comdetail.parentName)
      this.$store.commit({
        type: 'recordOutdetailID',
        data: this.comdetail.parent
      })
      this.$store.commit('closeEdit')
      this.$router.push('outdetail')
      this.$store.commit('startLoading')
      this.$store.dispatch('getOutdetail')
      this.$store.dispatch('getOutdetail_property')
      this.$store.dispatch('getOutdetail_child_managers')
      this.$store.dispatch('getOutdetail_child_merchants')
    }, // 跳转至其上级线路商
    formatTime (time) {
      return detailTime(time)
    }, // 格式化时间
    points (points) {
      return formatPoints(points)
    }, // 格式化点数
    formatGamelist (a) {
      if (a === '') {
        var sub = '无'
        return sub
      } else {
        var x = []
        for (var i = a.length - 1; i >= 0; i--) {
          x.push(a[i].name)
        }
        return x.join(' ')
      }
    }, // 格式化游戏列表
    contractPeriod (time) {
      return formatContractPeriod(time)
    },
    bills (bill) {
      return billType(bill)
    },
    turnONedit () {
      for (let item of this.comdetail.gameList) {
        if (item.name) {
          this.selectGame.push(item.name)
        }
      }
      this.disable = false
    }, // 开启编辑
    changeContract () {
      if (this.comdetail.isforever === true) {
        this.comdetail.contractPeriod = 0
        this.isfinish.contractPeriod = true
      } else {
        this.comdetail.contractPeriod = [null, null]
        this.isfinish.contractPeriod = false
      }
    }, // 设置永久时间
    randomPassword () {
      this.disable = false
      var newpassword = randomPassword()
      this.comdetail.password = newpassword
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
        var comdetailID = ''
        this.comdetail.gameList = []
        for (let outside of this.gameList) {
          for (let inside of this.selectGame) {
            if (outside.name == inside) {
              this.comdetail.gameList.push(outside)
            }
          }
        }
        this.comdetail.gameList = Array.from(new Set(this.comdetail.gameList))
          if (this.comdetail.contractPeriod !== 0) {
            for (var i = this.comdetail.contractPeriod.length - 1; i >= 0; i--) {
              if (isNaN(this.comdetail.contractPeriod[i].toString())) {
                this.comdetail.contractPeriod[i] = new Date(this.comdetail.contractPeriod[i].toString()).getTime()
              }
            }
          }
          if (!this.$store.state.variable.comdetailID) {
            comdetailID = localStorage.comdetailID
          } else {
            comdetailID = this.$store.state.variable.comdetailID
          }
        invoke({
          url: api.merchants + '/' + comdetailID,
          method: api.post,
          data: this.comdetail
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
    storePoints () {
      var user = {
        username: this.comdetail.username,
        userId: this.comdetail.userId,
        role: this.comdetail.role,
        parentId: this.comdetail.parent,
        parentName: this.comdetail.parentDisplayName
      }
      this.$store.commit({
        type: 'recordNowlistUser',
        data: user
      })
      this.$store.commit({
        type: 'getpointsIndex',
        data: 'store'
      })
    }, // 存点
    withdrawPoints () {
      var user = {
        username: this.comdetail.username,
        userId: this.comdetail.userId,
        role: this.comdetail.role,
        parentId: this.comdetail.parent,
        parentName: this.comdetail.parentDisplayName
      }
      this.$store.commit({
        type: 'recordNowlistUser',
        data: user
      })
      this.$store.commit({
        type: 'getpointsIndex',
        data: 'withdraw'
      })
    }, // 提点
    getnowSize (size) {
      this.size = size
    },  // 账户流水分页
    getnowPage (page) {
      this.page = page
    }  // 账户流水分页
  }
}
</script>

<style scoped>
    .comdetail .comdetail-title{text-align: center;}
    .comdetail h2{font-size: 2.5rem;font-weight: bold;padding: 1rem 0 0 0;}
    .comdetail h4{font-size: 1.8rem;font-weight: normal;padding: 2rem 0;color: #5a5a5a}
    .comdetail .simpleinfo,
    .comdetail .manangeinfo,
    .comdetail .propertyinfo{width: 98%;margin: 0 auto;vertical-align: baseline;font-size: 0.8rem}
    .comdetail .simpleform,
    .comdetail .manangeform,
    .comdetail .propertyform{background-color: #f5f5f5;padding-left: 3%;padding-bottom: 1rem}
    
    /**/
    .comdetail .editform{background-color: #f5f5f5;padding-top: 1rem;padding-left: 1rem}
    /**/
    .comdetail .simple span {display: inline-block;width: 30%;line-height: 3.5rem;}
    .comdetail .remark{padding-bottom: 1rem;margin-top: 1rem}
    .comdetail .remark span {display: inline-block;width: 50%;text-overflow: ellipsis; overflow: hidden; white-space: nowrap; vertical-align: -0.2rem}
    .comdetail .information span{display: inline-block;width: 30%;line-height: 3.5rem;}

    .comdetail .manager-one{padding-top: 1rem}
    .comdetail .manager-two{}
    .comdetail .manager-three{padding-bottom: 1rem}

    .comdetail .manager-one span,
    .comdetail .manager-two span,
    .comdetail .manager-three span{display: inline-block; width: 33%;line-height: 3.5rem}

  .comdetail .margin{margin-bottom: 4rem}
  .comdetail .green{color: #00CC00}
  .comdetail .red{color: #FF3300}
  .comdetail .hidden{opacity: 0;}

  .comdetail .parent h4,
  .comdetail .parent p{display: inline-block;}
  .comdetail .parent p{margin-left: 0.5rem;font-size: 1rem;color: #797979}
  .comdetail .parent .router-link{cursor: pointer;color: #108DE9}

  .comdetail .page {padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 0.5rem;margin-top: 2rem}

  .remarkBox{word-wrap: break-word; word-break: normal;width: 200px}
</style>
