<template>
    <div>
        <div class="comdetail-title">
            <h2>{{comdetail.displayName}}</h2>
        </div>
        <div class="simpleinfo">
            <div class="parent">
                <h4>基本信息</h4>
                <p v-if="this.comdetail.parent !== '01'">所属线路商: <span class="router-link" title="跳转至所属上级详情页" @click="goParent">{{comdetail.parentName.split('_')[1]}}</span>
                </p>
                <p v-else>所属线路商: <span>{{comdetail.parentName.split('_')[1]}}</span>
                </p>
            </div>
            <div class="simpleform" v-if="this.$store.state.variable.isEdit === false">
                <p class="simple">
                    <span>商户号: {{comdetail.displayId}}</span>
                    <span>线路号: {{comdetail.msn}}</span>
                    <span>商户标识: {{comdetail.suffix}}</span>
                    <span>负责人: {{comdetail.hostName}}</span>
                    <span>负责人联系方式: {{comdetail.hostContact}}</span>
                    <span>抽成比: {{comdetail.rate}}%</span>
                    <span>商户游戏: {{comdetail.gameList.join(' , ')}}</span>
                    <span>商户Email: {{comdetail.merchantEmail}}</span>
                    <span>商户创建时间: {{formatTime(comdetail.createdAt)}}</span>
                    <span>最后登录时间: {{formatTime(comdetail.loginAt)}}</span>
                </p>
                <p class="">
                    <span style="line-height:3.5rem">商户密匙: <span>{{comdetail.apiKey}}</span></span>
                </p>
                <p class="information">
                    <span>商户前端域名: <span>{{comdetail.frontURL}}</span></span>
                    <span>商户白名单: <span>{{comdetail.loginWhiteList}}</span></span>
                </p>
                <p class="remark">
                    <span>商户备注: <span>{{comdetail.remark}}</span></span>
                </p>
            </div>
            <div class="editform" v-if="this.$store.state.variable.isEdit === true">
                <el-form label-width='110px' label-position="right">
                    <el-row>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="商户商ID">
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
                                    {{comdetail.parentName}}
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
                                <el-form-item label="负责人">
                                    <el-input v-model="comdetail.hostName" icon="edit" :on-icon-click="turnONedit" :disabled="disable"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <span class="hidden">1</span>
                        </el-col>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="负责人联系方式">
                                    <el-input v-model="comdetail.hostContact" icon="edit" :on-icon-click="turnONedit" :disabled="disable"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <span class="hidden">1</span>
                        </el-col>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="抽成比">
                                    <el-input v-model="comdetail.rate" icon="edit" :on-icon-click="turnONedit" :disabled="disable">
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
                                    <el-input v-model="comdetail.limit" icon="edit" :on-icon-click="turnONedit" :disabled="disable"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <span class="hidden">1</span>
                        </el-col>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="商户Email">
                                    <el-input v-model="comdetail.managerEmail" icon="edit" :on-icon-click="turnONedit" :disabled="disable"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <span class="hidden">1</span>
                        </el-col>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="商户游戏">
                                    <el-select v-model="comdetail.gameList" multiple placeholder="请选择" clearable style="min-width:17.8rem" :disabled="disable">
                                        <el-option v-for="item in comdetail.gameList" :key="item" :label="item" :value="item" style="max-width:336px"></el-option>
                                    </el-select>
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
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="备注">
                                    <el-input autosize v-model="comdetail.remark" icon="edit" :on-icon-click="turnONedit" :disabled="disable"></el-input>
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
                    <span>管理员账号: {{comdetail.username.split('_')[1]}}</span>
                    <span>管理员姓名: {{comdetail.adminName}}</span>
                    <span>管理员密码: {{comdetail.password}}</span>
                </p>
                <p class="manager-two">
                    <span>管理员Email: {{comdetail.adminEmail}}</span>
                    <span>管理员联系方式: {{comdetail.adminContact}}</span>
                </p>
                <p class="manager-three">
                    <span>生效时间: {{contractPeriod(comdetail.contractPeriod)}}</span>
                    <span>上次登录时间: {{formatTime(comdetail.loginAt)}}</span>
                    <span>上次登录IP: {{comdetail.lastIP}}</span>
                </p>
            </div>
            <div class="editform" v-if="this.$store.state.variable.isEdit === true">
                <el-form label-width='110px' label-position="right">
                    <el-row>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="管理员账号">
                                    {{comdetail.username.split('_')[1]}}
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <span class="hidden">1</span>
                        </el-col>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="管理员姓名">
                                    <el-input v-model="comdetail.adminName" icon="edit" :on-icon-click="turnONedit" :disabled="disable"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <span class="hidden">1</span>
                        </el-col>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="管理员密码">
                                    <el-input v-model="comdetail.password" :disabled="disable">
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
                                    <el-input v-model="comdetail.adminEmail" icon="edit" :on-icon-click="turnONedit" :disabled="disable"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="生效时间">
                                    <el-date-picker v-model="comdetail.contractPeriod" type="daterange" label="生效时间" :disabled="disable" :editable='false'></el-date-picker>
                                    <el-checkbox v-model="comdetail.isforever" :disabled="disable" @change="changeContract">永久</el-checkbox>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <span class="hidden">1</span>
                        </el-col>
                        <el-col :span="6">
                            <div class="">
                                <el-form-item label="上次登录时间">
                                    {{formatTime(comdetail.loginAt)}}
                                </el-form-item>
                            </div>
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
                                <el-form-item label="管理员联系方式">
                                    <el-input v-model="comdetail.hostContact" icon="edit" :on-icon-click="turnONedit" :disabled="disable"></el-input>
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
                                <span>{{scope.row.fromUser}}</span> <span class="green" v-if="scope.row.action === 1">{{bills(scope.row.action)}}</span> <span class="red" v-if="scope.row.action === -1">{{bills(scope.row.action)}}</span>
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
                        <el-table-column label="操作人" prop="operator" align="center" width=""></el-table-column>
                        <el-table-column label="备注" prop="remark" align="center"></el-table-column>
                    </el-table>
                </div>
                <div class="page">
                    <el-pagination layout="prev, pager, next, sizes, jumper" :total="this.$store.state.variable.comdetailproperty.length" :page-sizes="[5, 10]" :page-size="page" @size-change="getnowSize" @current-change="getnowPage"></el-pagination>
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
      data: 'comlist'
    })
    this.$store.commit('returnLocalStorage')
    this.$store.dispatch('getComdetail')
    this.$store.dispatch('getComdetail_property')
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
    }
  },
  data () {
    return {
      size: 5,
      page: 1,
      loading: false, // 加载动画
      disable: true, // 禁用输入框
      balance: '' // 账户余额
    }
  },
  methods: {
    goParent () {
      
      this.$store.commit({
        type: 'recordOutdetailID',
        data: this.comdetail.parent
      })
      this.$router.push('outdetail')
      this.$store.commit('startLoading')
      this.$store.dispatch('getOutdetail')
      this.$store.dispatch('getOutdetail_property')
      this.$store.dispatch('getOutdetail_child_managers')
      this.$store.dispatch('getOutdetail_child_merchants')
    }, // 跳转至其上级线路商
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
      this.comdetail.contractPeriod = 0
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
            this.comdetail.password = data
            // store.state.checkform.password = true
          }
        }
      )
    }, // 生成密码
    submitEdit () {
      this.loading = true
      var comdetailID = ''
      if (!this.$store.state.variable.comdetailID) {
        comdetailID = localStorage.comdetailID
      } else {
        comdetailID = this.$store.state.variable.comdetailID
      }
      invoke({
        url: api.managers + '/' + comdetailID,
        method: api.post,
        data: this.comdetail
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
              url: api.managers + '/' + comdetailID,
              method: api.get
            }).then(
              result => {
                const [err, ret] = result
                if (err) {
                  this.$store.commit('closeLoading')
                  this.$message({
                    message: err.msg,
                    type: 'warning'
                  })
                } else {
                  var data = ret.data.payload
                  
                  this.comdetail = data
                  this.$store.commit('closeLoading')
                }
              }
            ) // 请求基本信息
            this.disable = true
            this.loading = false
            this.$store.commit('closeLoading')
            this.$message({
              message: '修改成功',
              type: 'success'
            })
          }
        }
      ) // 请求基本信息
    }, // 提交修改数据
    storePoints () {
      this.$store.commit('startStoreDialog')
      this.$store.commit({
        type: 'getpointsIndex',
        data: 'comdetail_pro'
      })
    }, // 存点
    withdrawPoints () {
      this.$store.commit('startWithdrawDialog')
      this.$store.commit({
        type: 'getpointsIndex',
        data: 'comdetail_pro'
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
	.comdetail-title{text-align: center;}
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
	.remark span {display: inline-block;width: 50%}
	.information span{display: inline-block;width: 30%;line-height: 3.5rem;}

	.manager-one{padding-top: 1rem}
	.manager-two{}
	.manager-three{padding-bottom: 1rem}

	.manager-one span{display: inline-block; width: 30%;line-height: 3.5rem}
	.manager-two span{display: block; width: 50%;line-height: 3.5rem}
	.manager-three span{display: inline-block; width: 30%;line-height: 3.5rem}

  .margin{margin-bottom: 4rem}
  .green{color: #00CC00}
  .red{color: #FF3300}
  .hidden{opacity: 0;}

  .parent h4,
  .parent p{display: inline-block;}
  .parent p{margin-left: 0.5rem;font-size: 1rem;color: #797979}
  .parent .router-link{cursor: pointer;color: #108DE9}

  .page {padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 0.5rem;margin-top: 2rem}
</style>
