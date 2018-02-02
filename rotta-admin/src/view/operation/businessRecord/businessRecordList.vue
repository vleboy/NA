<template>
  <div class="businessRecordList">
    <div class="propList-search propList">
      <el-row class="transition-box">
        <el-col :span="10" class="g-text-right">
          <span>线路号: </span>
          <el-input placeholder="请输入" class="input" v-model="searchInfo.operatorMsn"></el-input>
        </el-col>
        <el-col :span="10" class="g-text-right">
          <span>商户昵称: </span>
          <el-input placeholder="请输入" class="input" v-model="searchInfo.operatorDisplayName"></el-input>
        </el-col>
        <el-button type="primary" @click="changeRadio()">搜索</el-button>
        <el-button @click="resultSearch">重置</el-button>
      </el-row>
    <div class="rebackinfo">
      类型：
      <el-radio-group v-model="radioType" @change="changeRadio()">
        <el-radio-button label="1">跑马灯管理</el-radio-button>
        <el-radio-button label="2">公告管理</el-radio-button>
        <el-radio-button label="3">邮件管理</el-radio-button>
        <el-radio-button label="4">展位管理</el-radio-button>
      </el-radio-group>
    </div>
    <div class="rebackinfo" style="padding-top: 0">
      <p>共搜索到 {{businessRecordList.length || 0}} 条数据</p>
    </div>
    <div class="playerform">
      <el-table :data="getItems" v-show="radioType == '1'">
        <el-table-column prop="operatorMsn" label="线路号" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="operatorDisplayName" label="商户昵称" align="center"></el-table-column>
        <el-table-column label="开始时间" align="center">
          <template scope="scope">
            {{formatterTime(scope.row.startTime)}}
          </template>
        </el-table-column>
        <el-table-column label="结束时间" align="center">
          <template scope="scope">
            {{formatterTime(scope.row.endTime)}}
          </template>
        </el-table-column>
        <el-table-column prop="count" label="播放次数" width="160" align="center"></el-table-column>
        <el-table-column label="内容" prop="content" align="center">
          <template scope="scope">
            <el-popover trigger="hover" placement="top" >
              <p class="-p-h-remark">{{scope.row.content}}</p>
              <div slot="reference" class="text-ellipsis">
                {{ scope.row.content }}
              </div>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="getItems" v-show="radioType == '2'">
        <el-table-column prop="operatorMsn" label="线路号" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="operatorDisplayName" label="商户昵称" align="center"></el-table-column>
        <el-table-column prop="adName" label="公告名称" align="center"></el-table-column>
        <el-table-column label="图片">
          <template scope="scope">
            <img :src="scope.row.img" style="width:50px;height: 50px;padding: 0.5rem 0;">
          </template>
        </el-table-column>
        <el-table-column prop="receiveAt" label="创建时间" width="200" align="center">
          <template scope="scope">
            {{formatterTime(scope.row.createdAt)}}
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" width="90" class-name="green">
          <template scope="scope">
            <el-tag :type="scope.row.adStatus == 1 ? 'success' : 'gray'">
              {{noticeStatus[scope.row.adStatus]}}
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
      </el-table>
      <el-table :data="getItems" v-show="radioType == '3'">
        <el-table-column prop="operatorMsn" label="线路号" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="operatorDisplayName" label="商户昵称" align="center"></el-table-column>
        <el-table-column label="邮件内容" prop="content" align="center">
          <template scope="scope">
            <el-popover trigger="hover" placement="top" width="200">
              <p class="-p-h-remark">{{scope.row.content}}</p>
              <div slot="reference" class="g-text-ellipsis">
                {{ scope.row.content }}
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="发送对象" align="center">
          <template scope="scope">
            {{scope.row.nickname === 'NULL!' ? '所有人' : scope.row.nickname}}
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template scope="scope">
            {{formatterTime(scope.row.createdAt)}}
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" >
          <template scope="scope">
            <el-tag type="success">正常</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="getItems" v-show="radioType == '4'">
        <el-table-column prop="operatorMsn" label="线路号" show-overflow-tooltip align="center" width="80"></el-table-column>
        <el-table-column prop='operatorDisplayName' label="商户昵称" align="center" width="180">
        </el-table-column>
        <el-table-column label="展位1" align="center">
          <template scope="scope">
            <span v-if="scope.row.name0!=''">{{scope.row.name0}}X{{scope.row.sum0}}  总价：{{scope.row.sum0*scope.row.prize0}}</span>
            <span v-else>暂无信息</span>
            <el-tag type="danger" v-if="scope.row.status0==2">促</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="receiveAt" label="展位2" align="center">
          <template scope="scope">
            <span v-if="scope.row.name1!=''">{{scope.row.name1}}X{{scope.row.sum1}}  总价：{{scope.row.sum1*scope.row.prize1}}</span>
            <span v-else>暂无信息</span>
            <el-tag type="danger" v-if="scope.row.status1==2">促</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="receiveAt" label="展位3" align="center">
          <template scope="scope">
            <span v-if="scope.row.name2!=''">{{scope.row.name2}}X{{scope.row.sum2}}  总价：{{scope.row.sum2*scope.row.prize2}}</span>
            <span v-else>暂无信息</span>
            <el-tag type="danger" v-if="scope.row.status2==2">促</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="receiveAt" label="展位4" align="center">
          <template scope="scope">
            <span v-if="scope.row.name3!=''">{{scope.row.name3}}X{{scope.row.sum3}}  总价：{{scope.row.sum3*scope.row.prize3}}</span>
            <span v-else>暂无信息</span>
            <el-tag type="danger" v-if="scope.row.status3==2">促</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="receiveAt" label="展位5" align="center">
          <template scope="scope">
            <span v-if="scope.row.name4!=''">{{scope.row.name4}}X{{scope.row.sum4}}  总价：{{scope.row.sum4*scope.row.prize4}}</span>
            <span v-else>暂无信息</span>
            <el-tag type="danger" v-if="scope.row.status4==2">促</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="receiveAt" label="展位6" align="center">
          <template scope="scope">
            <span v-if="scope.row.name5!=''">{{scope.row.name5}}X{{scope.row.sum5}}  总价：{{scope.row.sum5*scope.row.prize5}}</span>
            <span v-else>暂无信息</span>
            <el-tag type="danger" v-if="scope.row.status0==5">促</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right;margin:2rem 0">
        <el-pagination layout="prev, pager, next, sizes, jumper" :total="businessRecordList.length"
                       :page-sizes="[20, 50]" :page-size="nowSize" @size-change="getNowsize" @current-change="getNowpage">
        </el-pagination>
      </div>
    </div>
  </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { invoke } from '@/libs/fetchLib'
  import { formatUserName, unFormatUserName, detailTime, thousandFormatter } from '@/behavior/format'
  import api from '@/api/api'
  export default {
    beforeCreate () {
      this.$store.commit('returnLocalStorage')
      this.$store.commit({
        type: 'recordNowindex',
        data: 'businessRecord'
      })
    },
    data () {
      return {
        nowSize: 20,
        nowPage: 1,
        businessRecordList: [],
        noticeStatus: ['已停用', '正常'],
        radioType: '1',
        searchInfo: {}
      }
    },
    created () {
      this.changeRadio()
    },
    computed: {
      getItems () {
        if (this.nowPage === 1) {
          return this.businessRecordList.slice(0, this.nowSize)
        } else {
          return this.businessRecordList.slice(((this.nowPage - 1) * this.nowSize), this.nowSize * this.nowPage)
        }
      }
    },
    methods: {
      changeRadio (){
        if(this.searchInfo.operatorDisplayName == ''){
          delete this.searchInfo.operatorDisplayName
        }
        if (this.searchInfo.operatorMsn == '') {
          delete this.searchInfo.operatorMsn
        }

        this.businessRecordList = []
        switch (+(this.radioType)){
          case 1:
            this.getHorseRaceLampList()
                break;
          case 2:
            this.getGameNoticeList()
                break;
          case 3:
            this.getMailList()
                break;
          case 4:
            this.getBoothList()
                break;
        }
      },
      getHorseRaceLampList(){
        this.$store.commit('startLoading')
        invoke({
          url: api.getHorseRaceLampList,
          method: api.post,
          data:{
            operatorRole: '100',
            query: this.searchInfo
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
              this.businessRecordList = res.data.list.Items
            }
            this.$store.commit('closeLoading')
          }
        )
      }, // 跑马灯列表
      getGameNoticeList () {
        this.$store.commit('startLoading')
        invoke({
          url: api.getGameNoticeList,
          method: api.post,
          data:{
            operatorRole: '100',
            query: this.searchInfo
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
              this.businessRecordList = res.data.payload
            }
            this.$store.commit('closeLoading')
          }
        )
      }, //公告列表
      getMailList () {
        this.$store.commit('startLoading')
        invoke({
          url: api.getMailList,
          method: api.post,
          data:{
            operatorRole: '100',
            query: this.searchInfo
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
              this.businessRecordList = res.data.list.Items
            }
            this.$store.commit('closeLoading')
          }
        )
      },// 邮件列表
      getBoothList () {
        this.$store.commit('startLoading')
        invoke({
          url: api.seatAllList,
          method: api.post,
          data:{
            seatType:'2',
            operatorRole: '100',
            query: this.searchInfo
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
              this.storageObj = []
              this.businessRecordList = res.data.payload

              for (let item of this.businessRecordList){
                for (let i=0; i< (10-item.length); i++) {
                  item.push({
                    operatorDisplayName:'',
                    operatorMsn:'',
                    prop:'',
                    price:'0',
                    remark:'NULL!',
                    seatStatus:'',
                    sum:''
                  })
                }
              }

              for (let items of this.businessRecordList) {
                this.storageObj.push({
                  operatorMsn: items[0].operatorMsn,
                  operatorDisplayName: items[0].operatorDisplayName,
                  name0:items[0].prop,
                  status0:items[0].seatStatus,
                  sum0:items[0].sum,
                  name1:items[1].prop,
                  status1:items[1].seatStatus,
                  sum1:items[1].sum,
                  name2:items[2].prop,
                  status2:items[2].seatStatus,
                  sum2:items[2].sum,
                  name3:items[3].prop,
                  status3:items[3].seatStatus,
                  sum3:items[3].sum,
                  name4:items[4].prop,
                  status4:items[4].seatStatus,
                  sum4:items[4].sum,
                  name5:items[5].prop,
                  status5:items[5].seatStatus,
                  sum5:items[5].sum,
                  prize0: items[0].price,
                  prize1: items[1].price,
                  prize2: items[2].price,
                  prize3: items[3].price,
                  prize4: items[4].price,
                  prize5: items[5].price
                })
              }
              this.businessRecordList = this.storageObj
            }
            this.$store.commit('closeLoading')
          }
        )
      }, // 展位列表
      formatterTime (row) {
        return detailTime(row)
      }, // 格式化创建时间
      getNowsize (size) {
        this.nowSize = size
      },
      getNowpage (page) {
        this.nowPage = page
      },
      resultSearch () {
        this.searchInfo = {
          operatorDisplayName: '',
          operatorMsn: ''
        }
      }
    }
  }
</script>

<style scpoed lang="less">
  .businessRecordList{
    .transition-box{
      padding:1rem 2rem;
      margin: 0 2rem;
      text-align: center;
      background-color: #f5f5f5;
    }
    .-p-h-remark{
      word-wrap: break-word;
      word-break: normal;
      width: 200px;
    }
    .input{
      width: 80%!important;
    }
    .rebackinfo{
      padding:1rem 2rem;
    }
    .playerform{
      padding: 0 2rem;
      margin:0 auto;
    }
  }
</style>
