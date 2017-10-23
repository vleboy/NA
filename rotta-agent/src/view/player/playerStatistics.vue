<template>
  <div class="playerlist">
    <div class="propList-search propList">
      <el-row class="transition-box">
        <el-col :span="10">
          <span>&emsp;用户名: </span>
          <el-input placeholder="请输入" class="input" v-model="searchInfo.searchName"></el-input>
        </el-col>
        <el-col :span="10" class="text-left">
          <span>直属代理: </span>
          <el-input placeholder="请输入" class="input" v-model="searchInfo.parentName"></el-input>
        </el-col>
        <el-button type="primary" @click="startSearch">搜索</el-button>
        <el-button  @click="resultSearch">重置</el-button>
      </el-row>
    </div>
    <div class="rebackinfo">
      <p>共搜索到 {{playerList.length || 0}} 条数据</p>
    </div>
    <div class="playerform">
      <el-row style="margin-bottom: 2rem">
        <el-col :span="3">
          <el-button type="primary" @click="openAdd()">创建玩家</el-button>
        </el-col>
      </el-row>
      <el-table stripe :data="getItems">
        <el-table-column prop="userName" label="用户名" align="center">
        </el-table-column>
        <el-table-column prop="password" label="密码" align="center">
        </el-table-column>
        <el-table-column prop="balance" label="点数" show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column prop="parentName" label="直属代理" align="center">
        </el-table-column>
        <el-table-column prop="updateAt" width="200" label="最近登录游戏时间" :formatter="getAtime" align="center">
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template scope="scope">
            <el-tag :type="scope.row.state ? 'success' : 'danger'">
              {{playerStatus[scope.row.state]}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center" >
          <template scope="scope">
            <el-popover trigger="hover" placement="bottom-start" width="250">
              <div class="remarkBox">{{ scope.row.remark === 'NULL!' ? '' : scope.row.remark}}</div>
              <div slot="reference" class="">
                <el-icon name="search" style="color:#108ee9"></el-icon>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip align="center" width="250">
          <template scope="scope">
            <el-button style="margin-right: 10px"  type="text" @click="playDetail(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right;margin:2rem 0">
        <el-pagination layout="prev, pager, next, sizes, jumper" :total="playerList.length"
                       :page-sizes="[5, 10]" :page-size="nowSize" @size-change="getNowsize" @current-change="getNowpage">
        </el-pagination>
      </div>
    </div>

    <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
    <div id="myChart1" :style="{width: '300px', height: '300px'}"></div>
  </div>
</template>

<script>
  import { detailTime } from '@/behavior/format'
  import { invoke } from '@/libs/fetchLib'
  import api from '@/api/api'
  export default {
    beforeCreate () {
      this.$store.commit('returnLocalStorage')
      this.$store.commit({
        type: 'recordNowindex',
        data: 'agentPlayerStatistics'
      })
      this.$store.commit('startLoading')
    },
    data () {
      return {
        nowSize: 5,
        nowPage: 1,
        showSearch: false,
        isOpenModal: false,
        isSending: false,
        isSave: false,
        playerList: [],
        playerStatus: ['已锁定', '正常'],
        checkedArray: [],
        names: [],
        account: [],
        searchArray: [],
        searchInfo: {},
        balanceInfo: {}
      }
    },
    created () {
      this.getPlayList()
    },
    mounted () {
      this.drawLine()
      this.drawLine1()
    },
    computed: {
      getItems () {
        if (this.nowPage === 1) {
          return this.playerList.slice(0, this.nowSize)
        } else {
          return this.playerList.slice(((this.nowPage - 1) * this.nowSize), this.nowSize * this.nowPage)
        }
      }
    },
    methods: {
      getPlayList () {
        this.$store.commit('startLoading')
        invoke({
          url: api.getPlayerList,
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
              this.playerList = res.data.list
              this.searchArray = res.data.list
              // console.log(this.playerList, 'this.playerList')
            }
            this.$store.commit('closeLoading')
          }
        )
      },
      getAtime (row, col) {
        return detailTime(row.createAt)
      }, // 格式化创建时间
      startSearch () {
        let {searchName, parentName} = this.searchInfo
        this.arrayLocal = JSON.parse(JSON.stringify(this.searchArray))
        if ((!searchName && !parentName)) {
          this.getPlayList()
        } else if (searchName && parentName) {
          this.playerList = this.arrayLocal.filter(item => {
            return (item.userName === this.searchInfo.searchName && item.parentName === this.searchInfo.parentName)
          })
        } else {
          if (searchName) {
            this.playerList = this.arrayLocal.filter(item => {
              return item.userName === this.searchInfo.searchName
            })
          } else if (parentName) {
            this.playerList = this.arrayLocal.filter(item => {
              return item.parentName === this.searchInfo.parentName
            })
          }
        }
      },
      getNowsize (size) {
        this.nowSize = size
        // console.log('当前每页:' + size)
      },
      getNowpage (page) {
        this.nowPage = page
        // console.log('当前是第:' + page + '页')
      },
      resultSearch () {
        this.searchArray = []
        this.searchInfo = {}
        this.getPlayList()
      },
      drawLine () {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title: { text: '在Vue中使用echarts' },
          tooltip: {},
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        })
      },
      drawLine1 () {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart1'))
        // 绘制图表
        myChart.setOption({
          series: [
            {
              name: '访问来源',
              type: 'pie',
              roseType: 'angle',
              radius: ['55%', '70%'],
              data: [
                {value: 235, name: '视频广告'},
                {value: 274, name: '联盟广告'},
                {value: 310, name: '邮件营销'},
                {value: 335, name: '直接访问'},
                {value: 400, name: '搜索引擎'}
              ]
            }
          ]
        })
      }
    }
  }
</script>

<style scpoed>
  .playerlist .propList{padding: 2rem;}
  .playerlist .input{width: 80%}
  .playerlist .propList-search{margin: 2rem; background-color: #f5f5f5; text-align: center }
  .playerlist .text-left{text-align: left}
  .playerlist .rebackinfo{padding:0 2rem;}
  .playerlist .playerform{padding: 2rem;margin:0 auto;}
  .remarkBox{word-wrap: break-word; word-break: normal;width: 250px}
</style>
