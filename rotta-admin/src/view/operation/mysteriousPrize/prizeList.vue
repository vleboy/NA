<template>
  <div class="prizeList">
    <div class="propList-search propList">
      <el-row class="transition-box">
        <el-col :span="10" class="g-text-right">
          <span>用户名: </span>
          <el-input placeholder="请输入" class="input" v-model="searchInfo.userName"></el-input>
        </el-col>
        <el-col :span="10" class="g-text-right">
          <span>玩家昵称: </span>
          <el-input placeholder="请输入" class="input" v-model="searchInfo.nickname"></el-input>
        </el-col>
        <el-button type="primary" @click="getPrizeList">搜索</el-button>
        <el-button @click="resultSearch">重置</el-button>
      </el-row>
      <el-row class="transition-box" style="margin-top: 2rem">
        <el-col :span="10" class="g-text-right">
        <span>所属商户: </span>
        <el-input placeholder="请输入" class="input" v-model="searchInfo.merchantName"></el-input>
        </el-col>
        <el-col :span="10" class="g-text-right">
          <span>线路号: </span>
          <el-input placeholder="请输入" class="input" v-model="searchInfo.msn"></el-input>
        </el-col>
      </el-row>
      <el-row class="transition-box" style="margin-top: 2rem">
        <el-col :span="10" class="g-text-right">
        <span>获取时间: </span>
          <el-date-picker
            class="input"
            v-model="dateTime"
            type="datetimerange"
            placeholder="选择时间范围">
          </el-date-picker>
        </el-col>
      </el-row>
    </div>

    <div class="rebackinfo" style="margin-bottom: 28px">
      <el-button type="primary" @click="goPrizeConfig()">奖品配置</el-button>
    </div>
    <div class="rebackinfo">
      <p>共搜索到 {{prizeList.length || 0}} 条数据</p>
    </div>
    <div class="playerform">
      <el-table stripe :data="getItems"  @sort-change="sortFun">
        <el-table-column prop="userName" label="用户名" align="center"></el-table-column>
        <el-table-column prop="msn" label="线路号" show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column prop="merchantName" label="所属商户" align="center">
          <template scope="scope">
            {{ scope.row.merchantName === 'NULL!' ? '-' : scope.row.merchantName}}
          </template>
        </el-table-column>
        <el-table-column prop="gameType" label="所属游戏" align="center">
          <template scope="scope">
            {{gameTypeObj[scope.row.gameType]}}
          </template>
        </el-table-column>
        <el-table-column prop="nickname" label="玩家昵称" align="center">
          <template scope="scope">
            {{ scope.row.nickname === 'NULL!' ? '-' : scope.row.nickname}}
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template scope="scope">
            <el-tag :type="scope.row.status ? 'success' : 'danger'">
              {{playerStatus[scope.row.status]}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="领取面值" align="center">
          <template scope="scope">
            {{formatPoints(scope.row.amount)}}
          </template>
        </el-table-column>
        <el-table-column prop="winAt" label="大奖获取时间" :formatter="getAtime" sortable="custom"  align="center"></el-table-column>
        <el-table-column prop="receiveAt" label="大奖领取时间" :formatter="getBtime" sortable="custom"  align="center"></el-table-column>
        <el-table-column prop="operateNick" label="操作人" width="160" align="center">
          <template scope="scope">
            {{ scope.row.operateNick === 'NULL!' ? '-' : scope.row.operateNick}}
          </template>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip align="center">
          <template scope="scope">
            <el-button  type="text" @click="changeStatus(scope.row)">{{scope.row.status ? '撤销领取' : '领取'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right;margin:2rem 0">
        <el-pagination layout="prev, pager, next, sizes, jumper" :total="prizeList.length"
                       :page-sizes="[20, 50]" :page-size="nowSize" @size-change="getNowsize" @current-change="getNowpage">
        </el-pagination>
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
        data: 'prizePlayerList'
      })
    },
    data () {
      return {
        nowSize: 20,
        nowPage: 1,
        prizeList: [],
        playerStatus: ['未领取', '已领取'],
        gameTypeObj: {
          '10001': '推锅',
          '10002': '推筒子',
          '20001': '四川麻将',
          '20002': '山西麻将',
          '30000': '真人视讯',
          '30001': '百家乐',
          '40000': '老虎机',
          '40001': '罗塔之谜',
          '40002': '小厨娘',
          '41001': '街机马戏团'
        },
        dateTime: [],
        searchInfo: {
          userName: '',
          nickname: '',
          merchantName: '',
          msn: ''
        },
        sortInfo: {}
      }
    },
    created () {
      this.getPrizeList()
    },
    computed: {
      getItems () {
        if (this.nowPage === 1) {
          return this.prizeList.slice(0, this.nowSize)
        } else {
          return this.prizeList.slice(((this.nowPage - 1) * this.nowSize), this.nowSize * this.nowPage)
        }
      }
    },
    methods: {
      getPrizeList () {
        if(this.searchInfo.userName == ''){
          delete this.searchInfo.userName
        }
        if (this.searchInfo.nickname == '') {
          delete this.searchInfo.nickname
        }
        if (this.searchInfo.merchantName == '') {
          delete this.searchInfo.merchantName
        }
        if (this.searchInfo.msn == '') {
          delete this.searchInfo.msn
        }
        if (this.dateTime.length) {
          if (this.dateTime[0]!=null){
            this.dateTime = this.dateTime.map((item) => {
              return item == 0 ?  '' : new Date(item).getTime()
            })
            this.searchInfo.winAt = this.dateTime
          } else {
            delete this.searchInfo.winAt
            this.dateTime = []
          }
        }
        this.$store.commit('startLoading')
        invoke({
          url: api.mysteryList,
          method: api.post,
          data: {
            code: "mystery",
            sortkey: this.sortKey,
            sort:this.sort,
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
              this.prizeList = res.data.payload
            }
            this.$store.commit('closeLoading')
          }
        )
      },
      changeStatus (row) {
        this.$store.commit('startLoading')
        invoke({
          url: api.mysteryOperate,
          method: api.post,
          data: {
            sn: row.sn,
            winAt: row.winAt,
            status: row.status ? 0 : 1
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
                message: '操作成功',
                type: 'success'
              })
              this.getPrizeList()
            }
          }
        )
      }, // 更改玩家状态
      goPrizeConfig () {
        this.$router.push('prizeConfig')
      },
      getAtime (row, col) {
        return detailTime(row.winAt)
      }, // 格式化创建时间
      getBtime (row, col) {
        return row.receiveAt ? detailTime(row.receiveAt) : '-'
      }, // 格式化创建时间
      getNowsize (size) {
        this.nowSize = size
      },
      getNowpage (page) {
        this.nowPage = page
      },
      resultSearch () {
        this.searchInfo = {}
        this.getPrizeList()
      },
      sortFun (col){
        if(col.prop!=null){
          this.sortKey = col.prop
          this.sort = col.order== 'ascending' ? 'asce':'desc';
          this.getPrizeList()
        } else {
          this.sortKey = ''
          this.sort = ''
        }
      },
      formatPoints (num) {
        return thousandFormatter(num)
      }
    }
  }
</script>

<style scpoed>
  .prizeList .propList{padding: 2rem;}
  .prizeList .input{width: 80%!important;}
  .prizeList .propList-search{margin: 2rem; background-color: #f5f5f5; text-align: center }
  .prizeList .text-left{text-align: left}
  .prizeList .rebackinfo{padding:0 2rem;}
  .prizeList .playerform{padding: 2rem;margin:0 auto;}
</style>
