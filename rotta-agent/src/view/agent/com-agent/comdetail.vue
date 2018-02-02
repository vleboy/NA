<template>
    <div class="comdetail">
        <div class="comdetail-title">
            <h2>{{comdetail.displayName}}</h2>
        </div>
        <div class="parent" style="margin-left:1rem">
            <h4>基本信息
                <span class="transition-icon" @click="show1 = !show1">
                    <span v-if="!show1">展开</span>
                    <span v-if="show1">收起</span>
                </span>
            </h4>
            <p v-if="this.comdetail.parent !== '01' && this.$store.state.variable.comdetailID != loginId">所属代理: <span class="router-link" title="跳转至所属上级详情页" @click="goParent">{{comdetail.parentDisplayName}}</span>
            </p>
            <p v-if="this.comdetail.parent !== '01' && this.$store.state.variable.comdetailID == loginId">所属代理: <span>{{comdetail.parentDisplayName}}</span>
            </p>
            <p v-if="this.comdetail.parent === '01'">所属代理: 无
            </p>
        </div>
        <el-collapse-transition>
            <div class="simpleinfo" v-show="show1">
                <div class="editform">
                    <el-form label-width='110px' label-position="right" :model="comdetail" ref="comdetail" :rules="rules">
                        <el-row>
                            <el-col :span="6">
                                <div class="">
                                    <el-form-item label="代理ID">
                                        {{comdetail.displayId}}
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="1">
                                <span class="hidden">1</span>
                            </el-col>
                            <el-col :span="6">
                                <div class="">
                                    <el-form-item label="代理标识">
                                        {{comdetail.sn}}
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="1">
                                <span class="hidden">1</span>
                            </el-col>
                            <el-col :span="6">
                                <div class="">
                                    <el-form-item label="代理成数" v-show="this.disable == true">
                                        {{comdetail.rate}}%
                                    </el-form-item>
                                    <el-form-item label="代理成数" prop="rate" v-show="this.disable == false">
                                        <el-tooltip class="item" effect="dark" :content="rateContent" placement="top">
                                          <el-input v-model="comdetail.rate">
                                            <template slot="prepend">%</template>
                                          </el-input>
                                        </el-tooltip>
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
                        <el-row>
                            <el-col :span="6">
                                <el-form-item label="LOGO" v-show="disable == true">
                                    <img :src="imgInfo.logoImg" alt="图片logo" style="float:left;width:178px;height:178px;border:1px solid #eee">
                                </el-form-item>
                                    <el-form-item label="LOGO" v-show="disable == false">
                                        <el-upload
                                            :action="url1"
                                            class="g-avatar-uploader"
                                            ref="upload"
                                            :http-request="logo_request"
                                            :on-error="handleError"
                                            :before-upload="logo_before"
                                            :file-list="fileList1"
                                            :show-file-list="false">
                                          <div v-loading="isUpdate1" element-loading-text="图片上传中">
                                            <img v-if="imgInfo.logoImg" :src="imgInfo.logoImg" class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                          </div>
                                        </el-upload>
                                </el-form-item>
                            </el-col>
                            <el-col :span="1">
                                <span class="hidden">1</span>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="NAME" v-show="disable == true">
                                    <img :src="imgInfo.nameImg" alt="图片name" style="float:left;width:178px;height:178px;border:1px solid #eee">
                                </el-form-item>
                                <el-form-item label="NAME" v-show="disable == false">
                                    <el-upload
                                        :action="url2"
                                        class="g-avatar-uploader"
                                        ref="upload"
                                        :http-request="name_request"
                                        :on-error="handleError"
                                        :before-upload="name_before"
                                        :file-list="fileList2"
                                        :show-file-list="false">
                                      <div v-loading="isUpdate2" element-loading-text="图片上传中">
                                        <img v-if="imgInfo.nameImg" :src="imgInfo.nameImg" class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                      </div>
                                    </el-upload>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </div>
        </el-collapse-transition>
        <h4 style="margin-left:1rem">游戏信息
            <span class="transition-icon" @click="show3 = !show3">
                <span v-if="!show3">展开</span>
                <span v-if="show3">收起</span>
            </span>
        </h4>
        <el-collapse-transition>
            <div class="editform" v-show="show3">
                <el-select v-model="selcetCompany" placeholder="请选择" clearable style="width:12rem;margin-right:0.5rem;margin-left:6rem" v-show="!disable">
                    <el-option v-for="item in CompanyList" :key="item" :label="item.client" :value="item.server" style="width:12rem"></el-option>
                </el-select>
                <el-select v-model="selectGame" placeholder="请选择" clearable style="width:12rem;" v-show="!disable">
                    <el-option v-for="item in CompanyGame" :key="item" :label="item.name" :value="item" style="width:12rem"></el-option>
                </el-select>
                <div v-show="selectGame">
                    <el-tooltip class="item" effect="dark" :content="'该上级代理' + selectGame.name + '洗码比为' + parentMix + '%'" placement="top">
                        <el-input class="input" type="number" placeholder="0.00~1.00,最大不超过其上级洗码比" v-model="selectGame.mix" style="width:19rem;margin:1rem 0 0 6rem"></el-input>
                    </el-tooltip>
                    <el-button type="text" @click="addGame" v-show="!disable">添加</el-button>
                </div>
                
                
                <el-table :data="comdetail.gameList" border style="width: 40rem;margin-top:1rem">
                  <el-table-column prop="company" align="center" label="公司"></el-table-column>
                  <el-table-column prop="name" align="center" label="游戏"></el-table-column>
                  <el-table-column prop="mix" align="center" label="洗码比">
                    <template scope="scope">
                      <span>{{scope.row.mix}}%</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="操作">
                    <template scope="scope">
                      <span @click="deleteGame(scope.row)" style="color: #20a0ff;cursor: pointer" v-show="!disable">删除</span>
                      <span v-show="disable">请编辑</span>
                    </template>
                  </el-table-column>
                </el-table>
            </div>
        </el-collapse-transition>
        <h4 style="margin-left:1rem">管理信息
            <span class="transition-icon" @click="show2 = !show2">
                <span v-if="!show2">展开</span>
                <span v-if="show2">收起</span>
            </span>
            <div style="float:right;margin-right:2rem">
              <el-button type="primary" @click="submitEdit" :loading="loading" v-if="this.disable === false">提交修改</el-button>
              <el-button type="primary" @click="turnONedit" v-if="this.disable === true && this.$store.state.variable.comdetailID != loginId">编辑</el-button>
            </div>
        </h4>
        <el-collapse-transition>
            <div class="manangeinfo" v-show="show2">
                <div class="manangeform" v-if="this.$store.state.variable.isEdit === false">
                    <p class="manager-one">
                        <span>管理员账号: {{(comdetail.username)}}</span>
                        <span>管理员密码: ********</span>
                    </p>
                    <p class="manager-three">
                        <!-- <span>生效时间: {{contractPeriod(comdetail.contractPeriod)}}</span> -->
                        <span>上次登录时间: {{formatTime(comdetail.loginAt)}}</span>
                        <span>上次登录IP: {{comdetail.lastIP}}</span>
                    </p>
                </div>
                <div class="editform" v-if="this.$store.state.variable.isEdit === true">
                    <el-form label-width='110px' label-position="right" :model="comdetail" ref="comdetail" :rules="rules">
                        <el-row>
                            <el-col :span="6">
                                <div class="">
                                    <el-form-item label="管理员账号">
                                        {{(comdetail.username)}}
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="1">
                                <span class="hidden">1</span>
                            </el-col>
                            <el-col :span="6">
                                <div class="">
                                    <el-form-item label="管理员密码" v-show="this.disable == true">
                                        ********
                                    </el-form-item>
                                    <el-form-item label="管理员密码" prop="password" v-show="this.disable == false">
                                        <el-input v-model="comdetail.password" type="password">
                                        </el-input>
                                    </el-form-item>
                                </div>
                            </el-col>
                        </el-row>
                        <!-- <el-row>
                            <el-col :span="8">
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
                        </el-row> -->
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
                    </el-form>
                </div>
            </div>
        </el-collapse-transition>
        <div class="propertyinfo">
            <h4>财务信息</h4>
            <div class="propertyform">
                <div class="propertyform-header">
                    <span>当前剩余点数: <span style="color:#FF9900">{{comBills}}</span></span>
                    <el-button type="text" class="propertybtn" @click="refreshAgent">刷新</el-button>
                    <el-button type="text" class="propertybtn" @click="storePoints" v-if="this.$store.state.variable.comdetailID != loginId">存点</el-button>
                    <el-button type="text" class="propertybtn" @click="withdrawPoints" v-if="this.$store.state.variable.comdetailID != loginId">提取</el-button>
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
                                <p v-if="scope.row.action == 1 && scope.row.fromLevel < scope.row.toLevel">
                                  {{scope.row.fromDisplayName}} 对 {{scope.row.toDisplayName}}<span> 存点</span>
                                </p>
                                <p v-if="scope.row.action == -1 && scope.row.fromLevel < scope.row.toLevel">
                                  {{scope.row.fromDisplayName}} 对 {{scope.row.toDisplayName}}<span> 存点</span>
                                </p>
                                <p v-if="scope.row.action == -1 && scope.row.fromLevel > scope.row.toLevel">
                                  {{scope.row.toDisplayName}} 对 {{scope.row.fromDisplayName}}<span> 提点</span>
                                </p>
                                <p v-if="scope.row.action == 1 && scope.row.fromLevel > scope.row.toLevel">
                                  {{scope.row.toDisplayName}} 对 {{scope.row.fromDisplayName}}<span> 提点</span>
                                </p>
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
                                <span>{{(scope.row.operator)}}</span>
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
                    <el-pagination layout="prev, pager, next, sizes, jumper" :total="this.$store.state.variable.comdetailproperty.length" :page-sizes="[5, 10]" :page-size="page" @size-change="getnowSize" @current-change="getnowPage"></el-pagination>
                </div>
            </div>
        </div>
        <div class="propertyinfo">
            <h4>一级代理列表</h4>
            <div class="propertyform">
                <div class="propertyform-header">
                    <span>当前剩余点数: <span style="color:#FF9900"> {{childAgentBills}} </span></span>
                    <el-button type="text" class="propertybtn" @click="refreshChildAgent">刷新</el-button>
                </div>
                <div class="propertyform-form">
                    <el-table style="width: 98%; font-size: 12px;" border max-height='10px' :data="childAgent">
                    <el-table-column prop="" label="序号" align="center" width="65" type="index"></el-table-column>
                    <!-- <el-table-column prop="suffix" label="代理标识" align="center" width=""></el-table-column> -->
                    <el-table-column prop="displayName" label="代理昵称" align="center" width="">
                        <template scope="scope">
                            <span class="gorouter" @click="outYouWanted(scope.row.userId)">{{(scope.row.displayName)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="balance" label="剩余点数" align="center" width="">
                        <template scope="scope">
                            <span>{{points(scope.row.balance)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="lastBill.updatedAt" label="操作时间" align="center">
                        <template scope="scope">
                            <span>{{formatTime(scope.row.lastBill.updatedAt)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="lastBill.remark" label="备注" align="center" width="65">
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
                    <el-table-column prop="" label="操作(对旗下线路商操作)" align="center" v-if="isRight">
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
                    <el-pagination layout="prev, pager, next, sizes, jumper" :total="this.$store.state.variable.detailChild.length"
                                   :page-sizes="[5, 10]" :page-size="childAgentSize" @size-change="getchildAgentSize"
                                   @current-change="getchildAgentPage"></el-pagination>
                </div>
            </div>
        </div>
        <div class="propertyinfo">
            <h4>直属玩家列表</h4>
            <div class="propertyform">
                <div class="propertyform-header">
                    <span>玩家拥有点数合计: <span style="color:#FF9900"> {{childPlayerBills}} </span></span>&emsp;
                    <span>玩家数: <span style="color:#FF9900"> {{this.$store.state.variable.detailPlayer.length}} </span></span>&emsp;
                    <el-button type="text" class="propertybtn" @click="getPlayerList">刷新</el-button>
                </div>
                <div class="propertyform-form">
                    <el-table style="width: 98%; font-size: 12px;" border max-height='10px' :data="playerData">
                    <el-table-column prop="" label="序号" align="center" width="65" type="index"></el-table-column>
                    <el-table-column prop="userName" label="用户名" align="center"></el-table-column>
                    <el-table-column prop="nickname" label="玩家昵称" align="center" width="">
                        <template scope="scope">
                            <span class="gorouter" @click="goPlayerdetail(scope.row.userName)">{{Remark(scope.row.nickname)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="balance" label="剩余点数" align="center" width="">
                        <template scope="scope">
                            <span>{{points(scope.row.balance)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="updatedAt" label="操作时间" align="center">
                        <template scope="scope">
                            <span>{{formatTime(scope.row.updatedAt)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="lastBill.remark" label="备注" align="center" width="65">
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
                    <el-table-column prop="" label="操作(对直属玩家操作)" align="center">
                      <template scope="scope">
                        <el-button type="text" @click="player_storePoints(scope.$index, scope.row)">存点</el-button>
                        <el-button type="text" @click="player_withdrawPoints(scope.$index, scope.row)">提点</el-button>
                        <el-button type="text" @click="lockPlayer(scope.row)" v-if="scope.row.status === 1">锁定</el-button>
                        <el-button type="text" @click="lockPlayer(scope.row)" v-if="scope.row.status === 0">解锁</el-button>
                      </template>
                    </el-table-column>
                </el-table>
                </div>
                <div class="page">
                    <el-pagination layout="prev, pager, next, sizes, jumper" :total="this.$store.state.variable.detailPlayer.length"
                                   :page-sizes="[5, 10]" :page-size="playerAgentSize" @size-change="getPlayerAgentSize"
                                   @current-change="getPlayerAgentPage"></el-pagination>
                </div>
            </div>
        </div>
        <billtransfer></billtransfer>
    </div>
</template>

<script>
import Billtransfer from '@/components/billtransfer'
import { detailTime, formatContractPeriod, billType, formatRemark, formatUsername, formatPoints } from '@/behavior/format'
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
export default {
  components: {
    Billtransfer
  },
  beforeCreate () {
    this.$store.commit('resetAjax')
    this.$store.commit('startLoading')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'comdetail'
    })
    this.$store.commit('returnLocalStorage')
    this.$store.dispatch('getComdetail')
    this.$store.dispatch('getComdetail_property')
    this.$store.dispatch('getComdetail_child')
    this.$store.dispatch('getDetailPlayer')
  },
  mounted() {
    let data = {
      parent: this.$store.state.variable.comdetaildata.parent
    }
    invoke({
      url: api.companySelect,
      method: api.post,
      data: data
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
          this.$message({
            message: err.msg,
            type: 'warning'
          })
        } else {
          var data = ret.data.payload
          for (let item of data) {
            item.client = item.client + '游戏'
          }
          this.CompanyList = data
        }
      }
    )
  },
  watch: {
    ajaxCount (val) {
      if (val == 4) {
        this.$store.commit('closeLoading')
      }
    },
    selcetCompany (val) {
      if (val) {
        this.selectGame = ''
        invoke({
          url: api.gameBigType,
          method: api.post,
          data: {
            companyIden: val
          }
        }).then(
          result => {
            const [err, ret] = result
            if (err) {
            } else {
              var data = ret.data.payload
              this.CompanyGame = data
            }
          }
        )
      } else {
        this.CompanyGame = []
        this.selectGame = ''
      }
    },
    selectGame (val) {
      if (val) {
        this.selectGame.mix = ''
        let data = {
          code: val.code,
          userId: ''
        }
        if (this.$store.state.variable.comdetaildata.parent == '01') {
          data.userId = localStorage.loginId
        } else {
          data.userId = this.$store.state.variable.comdetaildata.parent
        }
        invoke({
          url: api.checkAgentMix,
          method: api.post,
          data: data
        }).then(
          result => {
            const [err, ret] = result
            if (err) {
            } else {
              var data = ret.data.payload.mix
              this.parentMix = data
            }
          }
        )
      }
    }
  },
  computed: {
    ajaxCount () {
      return this.$store.state.ajaxCount
    },
    rateContent () {
      var content = this.parentInfo.rate
      return '上级代理成数为 ' + content + '%'
    },
    comdetail () {
      let data = this.$store.state.variable.comdetaildata
      if (data && data.launchImg) {
        this.imgInfo.logoImg = data.launchImg.logo[0]
        this.imgInfo.nameImg = data.launchImg.name[0]
      }
      return data
    },
    isRight () {
      var right = false
      if (localStorage.loginLevel > this.$store.state.variable.comdetaildata.level) {
        right = false
      } else if (localStorage.loginLevel < this.$store.state.variable.comdetaildata.level) {
        right = true
      }
      return right
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
    },
    childAgent () {
      var childAgent = this.$store.state.variable.detailChild
      if (this.childAgentPage === 1) {
        return childAgent.slice(0, this.childAgentSize)
      } else {
        return childAgent.slice(((this.childAgentPage - 1) * this.childAgentSize), this.childAgentSize * this.childAgentPage)
      }
    }, // 下级代理分页
    playerData () {
      var detailPlayer = this.$store.state.variable.detailPlayer
      if (this.playerAgentPage === 1) {
        return detailPlayer.slice(0, this.playerAgentSize)
      } else {
        return detailPlayer.slice(((this.playerAgentPage - 1) * this.playerAgentSize), this.playerAgentSize * this.playerAgentPage)
      }
    }, // 玩家数据分页
    childAgentBills () {
      var bills = 0
      if (!this.childAgent) {
        bills = 0
      } else {
        for (var i = 0; i < this.childAgent.length; i++) {
          bills += this.childAgent[i].balance
        }
      }
      return this.points(bills)
    }, // 下级代理总点数
    childPlayerBills () {
      var bills = 0
      if (!this.playerData) {
        bills = 0
      } else {
        for (var i = 0; i < this.playerData.length; i++) {
          bills += this.playerData[i].balance
        }
      }
      return this.points(bills)
    } // 下级玩家总点数
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
      } else if (value.length < 8) {
        callback(new Error('密码不能少于8位'))
        this.isfinish.password = false
      } else if (value.length > 16) {
        callback(new Error('密码不能多于16位'))
        this.isfinish.password = false
      } else {
        var x = password(value)
        if (x < 2) {
          callback(new Error('密码中必须包含字母、数字、符号，中任意两种的组合'))
          this.isfinish.password = false
        } else {
          value = value.trim()
          this.isfinish.password = true
          callback()
        }
      }
    } // 验证密码
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
      } else if (value > this.parentInfo.rate) {
        callback(new Error('超出上级成数'))
        this.isfinish.rate = false
      } else {
        this.isfinish.rate = true
        callback()
      }
    } // 验证代理成数
    // var checkContractPeriod = (rule, value, callback) => {
    //   if (value === 0) {
    //     this.isfinish.contractPeriod = true
    //     callback()
    //   } else if (value === [null, null]) {
    //     this.isfinish.contractPeriod = false
    //     callback(new Error('请选择合同生效时间'))
    //   } else if (value[0] !== null || value[1] !== null) {
    //     this.isfinish.contractPeriod = true
    //     callback()
    //   }
    // } // 验证合同有效时间
    return {
      imgInfo: {
        logoImg: '',
        nameImg: '',
      },
      url1: '', // 上传LOGO 阿里云url
      url2: '', // 上传NAME 阿里云url
      isUpdate1: false, // 上传LOGO Loading
      isUpdate2: false, // 上传NAME Loading
      fileList1: [], // 上传LOGO 数据
      fileList2: [], // 上传NAME 数据
      uploadAction1: '', // 上传LOGO URL
      uploadAction2: '', // 上传name URL
      imgFile1:{},  // 上传LOGO img
      imgFile2:{},  // 上传NAME img
      parentMix: '', // 上级洗码比  
      selcetCompany: '', // 选择的游戏运行商
      selectGame: '', // 选择的游戏
      CompanyList: [], // 所有游戏运营商
      CompanyGame: [], // 具体游戏运营商游戏
      show1: false, // 默认关闭信息展示,
      show2: false, // 默认关闭信息展示,
      show3: false, // 默认关闭信息展示,
      parentInfo: '',
      loginId: localStorage.loginId,
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      size: 5,
      page: 1,
      childAgentSize: 5,
      childAgentPage: 1,
      playerAgentSize: 5,
      playerAgentPage: 1,
      loading: false, // 加载动画
      disable: true, // 禁用输入框
      balance: 0,
      isfinish: {
        gameList: true,
        password: true,
        rate: true,
        contractPeriod: true
      },
      rules: {
        password: [
          {validator: checkPassword, trigger: 'change'}
        ],
        rate: [
          {validator: checkRate, trigger: 'change'}
        ],
      }
    }
  },
  methods: {
    refreshAgent () {
      this.$store.commit('startLoading')
      this.$store.dispatch('getComdetail_property')
    }, // 刷新详情页代理账单
    refreshChildAgent () {
      this.$store.commit('startLoading')
      this.$store.dispatch('getComdetail_child')
    }, // 刷新详情页代理下级代理账单
    user (name) {
      return formatUsername(name)
    }, // 格式化用户名
    Remark (remark) {
      return formatRemark(remark)
    }, // 格式化备注
    goParent () {
      // console.log('上级线路商ID', this.comdetail.parent, '上级线路商是:', this.comdetail.parentName)
      this.$store.commit({
        type: 'recordComdetailID',
        data: this.comdetail.parent
      })
      this.disable = true
      this.$store.commit('resetAjax')
      this.$store.commit('startLoading')
      this.$router.push('comdetail')
      this.$store.commit('closeEdit')
      this.$store.dispatch('getComdetail')
      this.$store.dispatch('getComdetail_property')
      this.$store.dispatch('getComdetail_child')
      this.$store.dispatch('getDetailPlayer')
    }, // 跳转至其上级代理
    outYouWanted (link) {
      // console.log('跳转用户的ID', link)
      this.$store.commit({
        type: 'recordComdetailID',
        data: link
      })
      this.disable = true
      this.$store.commit('resetAjax')
      this.$store.commit('startLoading')
      this.$router.push('comdetail')
      this.$store.dispatch('getComdetail')
      this.$store.dispatch('getComdetail_property')
      this.$store.dispatch('getComdetail_child')
      this.$store.dispatch('getDetailPlayer')
    }, // 详情页代理列表跳转
    damn_storePoints (index, row) {
      var obj = {
        userId: row.userId,
        role: '1000',
        username: row.username,
        parentDispalyName: row.parentDisplayName, // 上级昵称
        parentId: row.parent, // 上级ID
        parentName: row.parentName // 上级用户名
      }
      // console.log('操作的用户为 ' + row.username + ' / ' + '操作的用户ID为 ' + row.userId + '/' + '操作的用户role为' + row.role)
      this.$store.commit({
        type: 'getpointsObject',
        data: obj
      })
      this.$store.commit('startStoreDialog')
      this.$store.commit({
        type: 'getpointsIndex',
        data: 'billtransfer'
      })
    }, // 代理对其下级代理存点
    player_storePoints (index, row) {
      var obj = {
        type: 'player',
        userId: row.userId,
        userRole: '10000',
        username: row.userName,
        parentDispalyName: row.merchantName, // 上级昵称
        parentRoll: '1000', // 上级角色
        parentId: row.parent, // 上级ID
        parentName: row.parentName // 上级用户名
      }
      // console.log('操作的用户为 ' + row.userName + ' / ' + '操作的用户ID为 ' + row.userId + '/' + obj)
      // console.log(obj)
      this.$store.commit({
        type: 'getpointsObject',
        data: obj
      })
      this.$store.commit('startStoreDialog')
      this.$store.commit({
        type: 'getpointsIndex',
        data: 'billtransfer'
      })
    }, // 代理对玩家存点
    damn_withdrawPoints (index, row) {
      var obj = {
        userId: row.userId,
        role: '1000',
        username: row.username,
        parentDispalyName: row.parentDisplayName, // 上级昵称
        parentId: row.parent, // 上级ID
        parentName: row.parentName // 上级用户名
      }
      // console.log('操作的用户为 ' + row.username + ' / ' + '操作的用户ID为 ' + row.userId + '/' + '操作的用户role为' + row.role)
      this.$store.commit({
        type: 'getpointsObject',
        data: obj
      })
      this.$store.commit('startWithdrawDialog')
      this.$store.commit({
        type: 'getpointsIndex',
        data: 'billtransfer'
      })
    }, // 代理对其下级代理提点
    player_withdrawPoints (index, row) {
      var obj = {
        type: 'player',
        userId: row.userId,
        userRole: '10000',
        username: row.userName,
        parentDispalyName: row.merchantName, // 上级昵称
        parentRoll: '1000', // 上级角色
        parentId: row.parent, // 上级ID
        parentName: row.parentName // 上级用户名
      }
      // console.log('操作的用户为 ' + row.userName + ' / ' + '操作的用户ID为 ' + row.userId + '/' + obj)
      // console.log(obj)
      this.$store.commit({
        type: 'getpointsObject',
        data: obj
      })
      this.$store.commit('startWithdrawDialog')
      this.$store.commit({
        type: 'getpointsIndex',
        data: 'billtransfer'
      })
    }, // 代理对玩家提点
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
            this.$store.dispatch('getComdetail_child')
          }
        }
      )
    }, // 锁定代理
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
            this.$store.dispatch('getComdetail_child')
          }
        }
      )
    }, // 解锁代理
    lockPlayer (row) {
      this.$store.commit('startLoading')
      invoke({
        url: api.playerForzen,
        method: api.post,
        data: {
          userName: row.userName,
          state: row.state ? 0 : 1
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
            this.$store.dispatch('getDetailPlayer')
          }
          this.$store.commit('closeLoading')
        }
      )
    }, // 直属玩家解锁/锁定
    goPlayerdetail (player) {
      this.$store.commit({
        type: 'localPlayerInfoAgent',
        data: player
      })
      localStorage.setItem('playerName', player)
      this.$router.push('agentPlayerDetail')
      this.$store.commit({
        type: 'playerUserName',
        data: player
      })
    }, // 跳转到玩家详情页
    formatTime (time) {
      return detailTime(time)
    },
    points (points) {
      return formatPoints(points)
    }, // 格式化点数
    // contractPeriod (time) {
    //   return formatContractPeriod(time)
    // },
    bills (bill) {
      return billType(bill)
    },
    turnONedit () {
      var parentId = localStorage.parentID
      if (parentId == '01') {
        this.parentInfo = {
          rate: 100
        }
      } else {
        invoke({
          url: api.bills + '/' + parentId,
          method: api.get
        }).then(
          result => {
            const [err, ret] = result
            if (err) {
            } else {
              var data = ret.data.payload
              this.parentInfo = data
            }
          }
        )
      }
      this.disable = false
      this.show1 = true
      this.show2 = true
      this.show3 = true
      this.selcetCompany = ''
      this.selectGame = ''
      this.$store.commit('startEdit')
    }, // 开启编辑
    // changeContract () {
    //   if (this.comdetail.isforever === true) {
    //     this.comdetail.contractPeriod = 0
    //     this.isfinish.contractPeriod = true
    //   } else {
    //     this.comdetail.contractPeriod = [null, null]
    //     this.isfinish.contractPeriod = false
    //   }
    // }, // 设置永久时间
    submitEdit () {
      if (!this.isfinish.password || !this.isfinish.rate) {
        this.$message({
          message: '修改信息错误',
          type: 'error'
        })
      } else {
        this.loading = true
        // if (this.comdetail.contractPeriod !== 0) {
        //   for (var i = this.comdetail.contractPeriod.length - 1; i >= 0; i--) {
        //     if (isNaN(this.comdetail.contractPeriod[i].toString())) {
        //       this.comdetail.contractPeriod[i] = new Date(this.comdetail.contractPeriod[i].toString()).getTime()
        //     }
        //   }
        // }
        invoke({
          url: api.agentUpdate,
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
              this.disable = true
              this.$store.commit('closeEdit')
              this.selectGame = ''
              this.show1 = false
              this.show2 = false
              this.show3 = false
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
        userId: this.comdetail.userId,
        role: '1000',
        username: this.comdetail.username,
        parentDispalyName: this.comdetail.parentDisplayName, // 上级昵称
        parentId: this.comdetail.parent, // 上级ID
        parentName: this.comdetail.parentName // 上级用户名
      }
      this.$store.commit({
        type: 'getpointsObject',
        data: user
      })
      this.$store.commit({
        type: 'getpointsIndex',
        data: 'billtransfer'
      })
      this.$store.commit('startStoreDialog')
    }, // 代理详情页存点
    addGame () {
      if (!this.selectGame || !this.selcetCompany || !this.selectGame.mix || this.selectGame.mix > this.parentMix) {
        if (this.selectGame.mix > this.parentMix) {
          this.$message({
            type: 'warning',
            message: '洗码比超出上级！'
          })
        } else {
          this.$message({
            type: 'warning',
            message: '请完善要添加的游戏！'
          })
        }
      } else {
        let companyName = ''
        for (let item of this.CompanyList) {
          if (item.server == this.selcetCompany) {
            companyName = item.companyName
          }
        }
        let data = this.selectGame
        data.company = this.selcetCompany
        data.companyName = companyName
        if (this.comdetail.gameList.length == 0) {
          this.comdetail.gameList.push(data)
        } else {
          let repeat = false
          for (let item of this.comdetail.gameList) {
            if (item.name == data.name) {
              repeat = true
              this.$message({
                type: 'info',
                message: '您已选择该游戏'
              })
            }
          }
          if (!repeat) {
            this.comdetail.gameList.push(data)
          }
        }
      }
    }, // 获取上级拥有游戏
    deleteGame (data) {
      this.comdetail.gameList = this.comdetail.gameList.filter(item => {
        return item.name != data.name
      })
    }, // 删除所选游戏
    withdrawPoints () {
      var user = {
        userId: this.comdetail.userId,
        role: '1000',
        username: this.comdetail.username,
        parentDispalyName: this.comdetail.parentDisplayName, // 上级昵称
        parentId: this.comdetail.parent, // 上级ID
        parentName: this.comdetail.parentName // 上级用户名
      }
      this.$store.commit({
        type: 'getpointsObject',
        data: user
      })
      this.$store.commit({
        type: 'getpointsIndex',
        data: 'billtransfer'
      })
      this.$store.commit('startWithdrawDialog')
    }, // 代理详情页提点
    getPlayerList () {
      this.$store.commit(startLoading)
      this.$store.dispatch('getDetailPlayer')
    }, // 刷新玩家列表
    getnowSize (size) {
      this.size = size
    }, // 账户流水分页
    getnowPage (page) {
      this.page = page
    }, // 账户流水分页
    getchildAgentSize (size) {
      this.childAgentSize = size
    }, // 详情页下级代理分页
    getchildAgentPage (page) {
      this.childAgentPage = page
    }, // 详情页下级代理分页
    getPlayerAgentSize (size) {
      this.playerAgentSize = size
    }, // 直属玩家分页
    getPlayerAgentPage (page) {
      this.playerAgentPage = page
    }, // 直属玩家分页

    logo_uploadAli () {
      this.url = 'http://assetdownload.oss-cn-hangzhou.aliyuncs.com'
      let mi = new OSS.Wrapper({
        region: 'oss-cn-hangzhou',
        accessKeyId: this.uploadAction1[1].ali.AccessKeyId,
        accessKeySecret: this.uploadAction1[1].ali.AccessKeySecret,
        stsToken: this.uploadAction1[1].ali.SecurityToken,
        bucket: 'assetdownload'
      })
      let suffix = this.suffixFun(this.imgFile1.name)
      let date = new Date().getTime()
      let fileName = `image/${suffix[0]+date}.${suffix[1]}`
      mi.multipartUpload(fileName, this.imgFile1, {
      }).then((results) => {
        this.$message.success('上传成功')
        this.isUpdate1 = false
        this.comdetail.launchImg.logo[1] = results.url || `${this.url}/${results.name}`
        this.imgInfo.logoImg = results.url || `${this.url}/${results.name}`
      }).catch((err) => {
        this.isUpdate1 = false
        console.log(err);
      });
    }, // logo 阿里云上传
    logo_uploadAws() {
      const dev = `https://s3-ap-southeast-1.amazonaws.com/image-na-dev/${this.imgFile1.fileName}` //测试环境
      const prod = `https://d38xgux2jezyfx.cloudfront.net/${this.imgFile1.fileName}` //开发环境
      invoke({
        url: this.uploadAction1[0].aws,
        method: 'put',
        data: this.imgFile1,
        isToken: 'false'
      }).then(res => {
        const [err, ret] = res
        if (err) {
          this.isUpdate1 = false
          this.$message({
            message: err.msg,
            type: 'error'
          })
        } else {
          this.comdetail.launchImg.logo[0] = (process.env.NODE_ENV == 'development') ? dev : prod
          this.isUpdate1 = false
          this.$message.success('上传成功')
        }
      })
    },  // logo 上传亚马逊
    logo_request () {
      this.logo_uploadAli()
      this.logo_uploadAws()
    }, // logo 发送
    logo_before (file) {
      this.isUpdate1 = true
      let fileName = this.suffixFun(file.name)
      const isLt1M = file.size / 1024 / 1024 < 10
      const suffix = fileName[1].toLowerCase()
      const fileType = ['png', 'jpg']
      this.imgFile1 = file
      this.imgFile1.fileName = `${fileName[0]+new Date().getTime()}.${fileName[1]}`
      return new Promise((resolve, reject) =>{
        if (!(fileType.indexOf(suffix) > -1)) {
          this.isUpdate1 = false
          this.$message.error('上传图片只能是 JPG或者PNG 格式!')
          reject(false)
        } else if (!isLt1M) {
          this.isUpdate1 = false
          this.$message.error('大小不能超过 10MB!')
          reject(false)
        }
        invoke({
          url: api.uploadImg,
          method: api.post,
          data: {
            contentType: 'image',
            filePath: this.imgFile1.fileName
          }
        }).then(res => {
          const [err, ret] = res
          if (err) {
            this.isUpdate1 = false
            this.$message({
              message: err.msg,
              type: 'error'
            })
          } else {
            this.uploadAction1 = ret.data.payload
            resolve(true)
          }
        }).catch(err => {
          // console.log(err)
          reject(false)
        })
      })
    }, // 上传前的检验 格式、大小等

    name_uploadAli () {
      this.url = 'http://assetdownload.oss-cn-hangzhou.aliyuncs.com'
      let mi = new OSS.Wrapper({
        region: 'oss-cn-hangzhou',
        accessKeyId: this.uploadAction2[1].ali.AccessKeyId,
        accessKeySecret: this.uploadAction2[1].ali.AccessKeySecret,
        stsToken: this.uploadAction2[1].ali.SecurityToken,
        bucket: 'assetdownload'
      })
      let suffix = this.suffixFun(this.imgFile2.name)
      let date = new Date().getTime()
      let fileName = `image/${suffix[0]+date}.${suffix[1]}`
      mi.multipartUpload(fileName, this.imgFile2, {
      }).then((results) => {
        this.$message.success('上传成功')
        this.isUpdate2 = false
        this.comdetail.launchImg.name[1] = results.url || `${this.url}/${results.name}`
        this.imgInfo.nameImg = results.url || `${this.url}/${results.name}`
      }).catch((err) => {
        this.isUpdate2 = false
        console.log(err);
      });
    }, // name 阿里云上传
    name_uploadAws () {
      const dev = `https://s3-ap-southeast-1.amazonaws.com/image-na-dev/${this.imgFile2.fileName}` //测试环境
      const prod = `https://d38xgux2jezyfx.cloudfront.net/${this.imgFile2.fileName}` //开发环境
      invoke({
        url: this.uploadAction2[0].aws,
        method: 'put',
        data: this.imgFile2,
        isToken: 'false'
      }).then(res => {
        const [err, ret] = res
        if (err) {
          this.isUpdate2 = false
          this.$message({
            message: err.msg,
            type: 'error'
          })
        } else {
          this.comdetail.launchImg.name[0] = (process.env.NODE_ENV == 'development') ? dev : prod
          this.isUpdate2 = false
          this.$message.success('上传成功')
        }
      })
    }, // name上传亚马逊
    name_request () {
      this.name_uploadAli()
      this.name_uploadAws()
    }, // name 发送
    name_before (file) {
      this.isUpdate2 = true
      let fileName = this.suffixFun(file.name)
      const isLt1M = file.size / 1024 / 1024 < 10
      const suffix = fileName[1].toLowerCase()
      const fileType = ['png', 'jpg']
      this.imgFile2 = file
      this.imgFile2.fileName = `${fileName[0]+new Date().getTime()}.${fileName[1]}`
      return new Promise((resolve, reject) =>{
        if (!(fileType.indexOf(suffix) > -1)) {
          this.isUpdate2 = false
          this.$message.error('上传图片只能是 JPG或者PNG 格式!')
          reject(false)
        } else if (!isLt1M) {
          this.isUpdate2 = false
          this.$message.error('大小不能超过 10MB!')
          reject(false)
        }
        invoke({
          url: api.uploadImg,
          method: api.post,
          data: {
            contentType: 'image',
            filePath: this.imgFile2.fileName
          }
        }).then(res => {
          const [err, ret] = res
          if (err) {
            this.isUpdate2 = false
            this.$message({
              message: err.msg,
              type: 'error'
            })
          } else {
            this.uploadAction2 = ret.data.payload
            resolve(true)
          }
        }).catch(err => {
          // console.log(err)
          reject(false)
        })
      })
    }, // 上传前的检验 格式、大小等

    handleError () {
      this.isUpdate1 = false
      this.isUpdate2 = false
      this.$message.error('上传失败，请重新选择')
    }, // 错误回调
    suffixFun (o) {
      let arr = o.split('.')
      return arr
    } // 截取文件名的后缀
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
    .comdetail .editform{background-color: #f5f5f5;padding: 1rem;}
    /**/
    .comdetail .simple span {display: inline-block;width: 30%;line-height: 3.5rem;}
    .comdetail .remark{padding-bottom: 1rem;margin-top: 1rem}
    .comdetail .remark span {display: inline-block;width: 50%;text-overflow: ellipsis; overflow: hidden; white-space: nowrap; vertical-align: -0.2rem}
    .comdetail .information span{display: inline-block;width: 30%;line-height: 3.5rem;}

    .comdetail .manager-one{padding-top: 1rem}
    .comdetail .manager-two{}
    .comdetail .manager-three{padding-bottom: 1rem}

    .comdetail .manager-one span{display: inline-block; width: 30%;line-height: 3.5rem}
    .comdetail .manager-two span{display: block; width: 50%;line-height: 3.5rem}
    .comdetail .manager-three span{display: inline-block; width: 30%;line-height: 3.5rem}

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
  .comdetail .gorouter{cursor: pointer;color: #20a0ff}

  .comdetail .editIcon{cursor: pointer;color: #20a0ff;display: inline-block}

  .comdetail .transition-icon{cursor: pointer;color: #20a0ff;font-size: 1.2rem;margin-left: 1rem}
</style>
