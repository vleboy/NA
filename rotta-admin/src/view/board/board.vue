<template>
  <div class="p-board">
    <div class="p-board-head" v-if="totalItems.length">
      <el-row :gutter="20">
        <el-col :span="6" v-for="(item, index) in totalItems" :key="index" class="head-all-item">
          <div class="head-item">
            <div class="head-left">
              <img class="left-icon" :src="item.icon">
            </div>
            <div class="head-right">
              <div class="head-right-title color-gery">
                <span class="left-text">{{item.oneText}}: </span>
                <el-tooltip class="item" effect="dark" :content="item.oneNum.toString()" placement="right">
                  <span class="right-number">{{item.oneNum}}</span>
                </el-tooltip>
              </div>
              <div class="right-ratio">
                <div class="head-right-title color-gery">
                  <span class="left-text">{{item.twoText}}: </span>
                  <el-tooltip class="item" effect="dark" :content="item.twoNum.toString()" placement="right">
                    <span class="right-number">{{item.twoNum}}</span>
                  </el-tooltip>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="p-board-content">
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="content-border">
            <div class="content-title">平台游戏点数消耗分布</div>
            <div>
              <div class="content-top">
                <el-col :span="24" class="g-text-right" style="margin-bottom: 10px">
                  <el-radio-group v-model="companyInfo" @change="changeCompany()" size="small">
                    <el-radio-button v-for="(item,index) of companyList" :key="index" :label="item.server">{{item.companyName}}</el-radio-button>
                  </el-radio-group>
                </el-col>
                <el-col :span="6">
                  <div class="left-content-head">
                    <span class="strong">{{consumeNum}}点</span>
                    <span class="color-gery">总消耗</span>
                  </div>
                </el-col>
                <el-col :span="18" class="g-text-right">
                  <el-radio-group v-model="dateType" size="small" @change="changeDateType">
                    <el-radio-button label="1">本周</el-radio-button>
                    <el-radio-button label="2">本月</el-radio-button>
                    <el-radio-button label="3">三月</el-radio-button>
                  </el-radio-group>
                  <el-date-picker
                    style="margin-left: 1rem"
                    v-model="dateInterval"
                    type="daterange"
                    @change="changeConsume"
                    placeholder="选择日期范围">
                  </el-date-picker>
                </el-col>
              </div>
              <div>
                <div class="content-bottom">
                  <div id="myChartAllPie" class="content-bar"></div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="p-board-content">
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="content-border">
            <div class="content-title">售出/收益</div>
            <div>
              <div class="content-top">
                <el-col class="g-text-right">
                  <el-radio-group v-model="dateTypeTwo" size="small" @change="changeDateTypeTwo">
                    <el-radio-button label="1">本周</el-radio-button>
                    <el-radio-button label="2">本月</el-radio-button>
                    <el-radio-button label="3">三月</el-radio-button>
                  </el-radio-group>
                  <el-date-picker
                    style="margin-left: 1rem"
                    v-model="dateIntervalTwo"
                    type="daterange"
                    @change="changeConsumeTwo"
                    placeholder="选择日期范围">
                  </el-date-picker>
                </el-col>
              </div>
              <div>
                <div class="content-bottom">
                  <div id="myChartAllLine" class="content-bar"></div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import { invoke } from '@/libs/fetchLib'
  import { thousandFormatter } from '@/behavior/format'
  import api from '@/api/api'
  export default {
    beforeCreate () {
      this.$store.commit({
        type: 'recordNowindex',
        data: 'board'
      })
      this.$store.commit('returnLocalStorage')
    },
    data () {
      return {
        dateType: '1',
        dateTypeTwo: '1',
        dateInterval: '',
        dateIntervalTwo: '',
        totalData: [],
        dataChess: [],
        dataVideo: [],
        statisticalTextOne: localStorage.loginRole == '100' ? ['今日收益点数', '在线玩家'] : ['今日售出点数', '今日收益点数', '在线玩家', '今日签约数'],
        statisticalTextTwo: localStorage.loginRole == '100' ? ['历史收益点数', '玩家总数'] : ['历史售出点数', '历史收益点数', '玩家总数', '历史签约数'],
        statisticalIcon: localStorage.loginRole == '100' ? ['/static/icon-2.png', '/static/icon-3.png'] : ['/static/icon-1.png', '/static/icon-2.png', '/static/icon-3.png', '/static/icon-4.png'],
        dateTypeArray: [],
        consumeList: '',
        consumeAndIncomeList: '',
        consumeDataTime: {},
        consumeAndIncomeDataTime: {},
        isGoConsume: false, // 判断是否从搜索框跳转
        isGoConsumeAndIncome: false, // 判断是否从搜索框跳转
        isSetInterval: false, // 是否是定时刷新,
        dynamicNum: '', // 动态渲染游戏消耗总点数
        role: localStorage.loginRole, // 相应角色的权限（区分商户、线路商、平台角色）
        companyList: [], // 厂商列表
        companyInfo: '-1' // 厂商单独信息
      }
    },
    mounted () {
      let self = this
      if (this.role == '100') {
        for (let i = 0; i < 2; i++){
          self.getStatisticalNum(i)
        }
      } else {
        for (let i = 0; i < 4; i++){
          self.getStatisticalNum(i)
        }
      }
      self.changeDateType()
      self.changeDateTypeTwo()
      self.companySelect()
      self.intervalid = setInterval(() => {
        self.isSetInterval = true
        if (this.role == '100') {
          for (let i = 0; i < 2; i++){
            self.getStatisticalNum(i)
          }
        } else {
          for (let i = 0; i < 4; i++){
            self.getStatisticalNum(i)
          }
        }
        self.changeDateType()
        self.changeDateTypeTwo()
      }, 60000);
    },
    computed: {
      optionSeries () {
        let optionSeries = []
        for (let item of this.consumeList.values) {
          optionSeries.push({
            name: item.name,
            type: 'bar',
            data: item.list
          })
        }
        return optionSeries
      }, // 消耗点数图表数据动态
      optionTips () {
        let optionTips = []
        for (let item of this.consumeList.values) {
          optionTips.push({
            name: item.name,
            icon: 'rect'
          })
        }
        return optionTips
      },// 消耗点数动态图标
      optionSeriesLine () {
        let optionSeriesLine = [
          {
            name: '售出',
            type: 'line',
            data:  this.consumeAndIncomeList.sale
          },
          {
            name: '收益',
            type: 'line',
            data: this.consumeAndIncomeList.consume
          }
        ]
        return optionSeriesLine
      },
      dateTypes () {
        return this.consumeList.keys
      },
      dateTypesLine () {
        return this.consumeAndIncomeList.keys
      },
      totalItems () {
        return this.totalData
      },
      consumeNum () {
        return thousandFormatter(this.dynamicNum)
      }
    },
    methods: {
      getStatisticalNum (index) {
        invoke({
          url: api.statisticsAll,
          method: api.post,
          data: {
            type: index + ((this.role == '100') ? 2 : 1)
          }
        }).then(
          result => {
            const [err, res] = result
            if (!this.isSetInterval) {
              this.totalData.splice(index, 0, {
                index: index+1,
                icon: this.statisticalIcon[index],
                oneText: this.statisticalTextOne[index],
                twoText: this.statisticalTextTwo[index],
                oneNum: res ? res.data.type > 2 ? res.data.oneNum : thousandFormatter(res.data.oneNum) : '0.00',
                twoNum: res ? res.data.type > 2 ? res.data.twoNum : thousandFormatter(res.data.twoNum) : '0.00'
              })
            } else {
              for (let item of this.totalData) {
                if(this.role == '100') {
                  if (res && ((item.index+1) === res.data.type)) {
                    item.oneNum = res.data.type > 2 ? res.data.oneNum : thousandFormatter(res.data.oneNum)
                    item.twoNum = res.data.type > 2 ? res.data.twoNum : thousandFormatter(res.data.twoNum) // 大于2是用来判断是否是显示玩家人数
                  }
                } else {
                  if (res && ((item.index) === res.data.type)) {
                    item.oneNum = res.data.type > 2 ? res.data.oneNum : thousandFormatter(res.data.oneNum)
                    item.twoNum = res.data.type > 2 ? res.data.twoNum : thousandFormatter(res.data.twoNum) // 大于2是用来判断是否是显示玩家人数
                  }
                }

              }
            }
          }
        )
      }, // 获取顶部统计数据
      getStatisticsConsume () {
        let myChart = this.$echarts.init(document.getElementById('myChartAllPie'))
        myChart.showLoading({
          text: '图表加载中...',
          color: '#20a0ff',
          textColor: '#000',
          zlevel: 0
        })
        invoke({
          url: api.statisticsConsume,
          method: api.post,
          data: {
            startTime: this.consumeDataTime.startTime,
            endTime: this.consumeDataTime.endTime,
            company: this.companyInfo
          }
        }).then(
          result => {
            const [err, ret] = result
            if (err) {
              this.$message.error(err.msg)
            } else {
              this.consumeList = ret.data.data
              this.dynamicNum = this.consumeList.sum
              this.drawAllPie()
            }
            myChart.hideLoading()
          }
        )
      }, // 获取游戏消耗点数总
      getConsumeAndIncome () {
        let myChart = this.$echarts.init(document.getElementById('myChartAllLine'))
        myChart.showLoading({
          text: '图表加载中...',
          color: '#20a0ff',
          textColor: '#000',
          zlevel: 0
        })
        invoke({
          url: api.consumeAndIncome,
          method: api.post,
          data: this.consumeAndIncomeDataTime
        }).then(
          result => {
            const [err, ret] = result
            if (err) {
              this.$message.error(err.msg)
            } else {
              this.consumeAndIncomeList = ret.data.data
              this.drawAllLine()
            }
            myChart.hideLoading()
          }
        )
      }, // 获取售出，收益
      changeConsume () {
        this.isGoConsume = true
        let [start, end] = this.dateInterval
        // console.log(this.dateInterval)
        if (start != null || end != null) {
          this.dateType = ''
          this.consumeDataTime = {
            startTime: start.getTime(),
            endTime: end.getTime() + 24*3600*1000 - 1
          }
          this.getStatisticsConsume()
        }
      }, // 游戏消耗自选时间筛选
      changeConsumeTwo () {
        this.isGoConsumeAndIncome = true
        let [start, end] = this.dateIntervalTwo
        if (start != null || end != null) {
          this.dateTypeTwo = ''
          this.consumeAndIncomeDataTime = {
            startTime: start.getTime(),
            endTime: end.getTime() + 24*3600*1000 - 1
          }
          this.getConsumeAndIncome()
        }
      }, // 售出收益自选时间筛选
      drawAllPie () {
        // 基于准备好的dom，初始化echarts实例
        let self = this;
        let legendArray = []
        let myChart = this.$echarts.init(document.getElementById('myChartAllPie'))
        myChart.clear();
        myChart.on('legendselectchanged', function (params) {
          legendArray = Object.entries(params.selected)
          self.dynamicNum = 0
          for (let [index,data] of self.consumeList.values.entries()) {
            if(legendArray[index][1]){
              self.dynamicNum = data.sum + self.dynamicNum
            }
          }
        });
        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: this.optionTips,
            right: '3%'
          },
          xAxis: {
            data: this.dateTypes
          },
          grid: {
            left: '8%',
            right: '3%',
            bottom: '10%',
            top: '16%'
          },
          yAxis: {},
          series: this.optionSeries,
          color: ['#D32F2F', '#FFCDD2', '#7b1fa2', '#212121', '#757575', '#FFEB3B', '#F57C00', '#795548', '#64ffda', '#03A9F4', '#388E3C', '#FF4081', '#607D8B', '#536DFE']

        })
      }, // 多栏柱状图
      drawAllLine () {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChartAllLine'))
        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'line'
            }
          },
          legend: {
            data: [
              {
                name: '售出',
                icon: 'circle'
              },
              {
                name: '收益',
                icon: 'circle'
              }
            ],
            right: '3%'
          },
          xAxis: {
            boundaryGap:  false,
            axisTick: {
              alignWithLabel: true
            },
            data: this.dateTypesLine
          },
          grid: {
            left: '8%',
            right: '3%',
            bottom: '10%',
            top: '16%'
          },
          yAxis: {},
          series: this.optionSeriesLine,
          color: ['#49a9ee', '#98d87d', '#ffd86e', '#f3857b', '#8996e6']

        })
      }, // 折线图
      changeDateType () {
        let nowDate = new Date()
        !this.isGoConsume && (this.dateInterval = '')
        switch (+this.dateType) {
          case 1:
            this.consumeDataTime = {
              startTime: this.getWeek().setHours(0, 0, 0, 0),
              endTime: this.getWeek().setHours(0, 0, 0, 0) + 7*24*3600*1000 - 1
            }
            break
          case 2:
            this.consumeDataTime = {
              startTime: new Date(nowDate.setMonth(nowDate.getMonth(),1)).setHours(0,0,0,0),
              endTime: new Date(nowDate.setMonth(nowDate.getMonth()+1,0)).setHours(0,0,0,0)+24*3600*1000-1
            }
            break
          case 3:
            this.consumeDataTime = {
              endTime: new Date(nowDate.setMonth(nowDate.getMonth()+1,0)).setHours(0,0,0,0)+24*3600*1000-1,
              startTime: new Date(nowDate.setMonth(nowDate.getMonth()-2,1)).setHours(0,0,0,0)
            }
            console.log(this.consumeDataTime)
            break
        }
        this.isGoConsume = false
        this.getStatisticsConsume()
      }, // 游戏消耗日期筛选过滤切换
      changeDateTypeTwo () {
        let nowDate = new Date()
        !this.isGoConsumeAndIncome && (this.dateIntervalTwo = '')
        switch (+this.dateTypeTwo) {
          case 1:
            this.consumeAndIncomeDataTime = {
              startTime: this.getWeek().setHours(0, 0, 0, 0),
              endTime: this.getWeek().setHours(0, 0, 0, 0) + 7*24*3600*1000 - 1
            }
            break
          case 2:
            this.consumeAndIncomeDataTime = {
              startTime: new Date(nowDate.setMonth(nowDate.getMonth(),1)).setHours(0,0,0,0),
              endTime: new Date(nowDate.setMonth(nowDate.getMonth()+1,0)).setHours(0,0,0,0)+24*3600*1000-1
            }
            break
          case 3:
            this.consumeAndIncomeDataTime = {
              endTime: new Date(nowDate.setMonth(nowDate.getMonth()+1,0)).setHours(0,0,0,0)+24*3600*1000-1,
              startTime: new Date(nowDate.setMonth(nowDate.getMonth()-2,1)).setHours(0,0,0,0)
            }
            break
        }
        this.isGoConsumeAndIncome = false
        this.getConsumeAndIncome()
      }, // 售出收益日期筛选过滤切换
      getWeek() {
        //按周日为一周的最后一天计算
        let date = new Date();

        //今天是这周的第几天
        let today = date.getDay();

        //上周日距离今天的天数（负数表示）
        let stepSunDay = -today + 1;

        // 如果今天是周日
        if (today == 0) {
          stepSunDay = -7;
        }

        let time = date.getTime();

        return new Date(time + stepSunDay * 24 * 3600 * 1000);
      }, // 处理周次
      companySelect () {
        invoke({
          url: api.companySelect,
          method: api.post,
          data: {
            parent: localStorage.loginRole == 1 ? '' : localStorage.loginId
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
              this.companyList = res.data.payload
              this.companyList.unshift({
                server: '-1',
                companyName: '全部厂商'
              })
              this.changeCompany()
            }
            // this.$store.commit('closeLoading')
          }
        )
      }, //获取运营商列表
      changeCompany(){
        this.getStatisticsConsume()
      }
    },
    beforeDestroy (){
      this.isSetInterval = false
      clearInterval(this.intervalid)
    }
  }
</script>

<style scpoed lang="less">
  .p-board{
    padding:1rem;
    .p-board-head, .p-board-content{
      margin-bottom: 2rem;
    }
    .head-item {
      border: 1px solid #e8e8e8;
      border-radius: 4px;
      margin-top: 1rem;
      padding: 1rem 0;
      overflow: hidden;
    }
    .head-left{
      text-align: center;
      width: 30%;
      min-width: 30%;
      display: inline-block;
      position: relative;
      top:0.4rem;
    }
    .left-icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    .head-right{
      float: right;
      width: 70%;
      max-width: 70%;
      display: inline-block;
    }

    .right-number{
      padding-bottom: 0.5rem;
      font-size: 20px;
      color: #000000;
      max-width: 80px;
      display: inline-block;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .color-gery{
      color: #b7b7b7;
    }
    .strong{
      font-size: 20px;
    }
    /*content 内容*/
    .content-title{
      padding: 1rem;
      font-size: 18px;
      border-bottom: 1px solid #e8e8e8;
    }
    .left-content-head{
      padding: 0 1rem;
    }
    .left-text{
      padding-bottom: 0.5rem;
      display: inline-block;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .content-border{
      border-radius: 4px;
      border: 1px solid #e8e8e8;
    }
    .content-bottom{
      /*overflow: auto;*/
      padding: 0 1rem 1rem 1rem;
    }
    .content-top{
      overflow: hidden;
      padding: 20px 0
    }
    .content-bar{
      width: 100%;
      height: 340px;
    }
  }

  @media screen and (min-width: 1280px){
    .right-number{
      max-width: 140px!important;
    }
  }

</style>
