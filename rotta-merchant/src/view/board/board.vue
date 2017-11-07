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
                <el-col :span="9">
                  <div class="left-content-head">
                    <span class="strong">{{consumeNum}}点</span>
                    <span class="color-gery">总消耗</span>
                  </div>
                </el-col>
                <el-col :span="15" class="g-text-right">
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
            <div class="content-title">收益</div>
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
        statisticalTextOne: ['今日收益点数', '在线玩家'],
        statisticalTextTwo: ['历史收益点数', '玩家总数'],
        statisticalIcon: ['/static/icon-2.png', '/static/icon-3.png'],
        dateTypeArray: [],
        consumeList: '',
        consumeAndIncomeList: '',
        consumeDataTime: {},
        consumeAndIncomeDataTime: {},
        isGoConsume: false, // 判断是否从搜索框跳转
        isGoConsumeAndIncome: false, // 判断是否从搜索框跳转
        isSetInterval: false, // 是否是定时刷新,
        dynamicNum: '' // 动态渲染游戏消耗总点数
      }
    },
    mounted () {
      let self = this
      for (let i = 0; i < 2; i++){
        self.getStatisticalNum(i)
      }
      self.changeDateType()
      self.changeDateTypeTwo()
      self.intervalid = setInterval(() => {
        self.isSetInterval = true
        for (let i = 0; i < 2; i++){
          self.getStatisticalNum(i)
        }
        self.changeDateType()
        self.changeDateTypeTwo()
      }, 60000);
    },
    computed: {
      optionSeries () {
        let optionSeries = [
          {
            name: '商城',
            type: 'bar',
            data: this.consumeList.store
          },
          {
            name: '真人视讯',
            type: 'bar',
            data: this.consumeList.vedio
          },
          {
            name: '电子游戏',
            type: 'bar',
            data: this.consumeList.elec
          }
        ]
        return optionSeries
      },
      optionSeriesLine () {
        let optionSeriesLine = [
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
        return this.thousandFormatter(this.dynamicNum)
      }
    },
    methods: {
      getStatisticalNum (index) {
        invoke({
          url: api.statisticsAll,
          method: api.post,
          data: {
            type: index+2
          }
        }).then(
          result => {
            const [err, res] = result
            if (!this.isSetInterval) {
              this.totalData.splice(index, 0, {
                index: index+2,
                icon: this.statisticalIcon[index],
                oneText: this.statisticalTextOne[index],
                twoText: this.statisticalTextTwo[index],
                oneNum: res ? this.thousandFormatter(res.data.oneNum) : '0',
                twoNum: res ? this.thousandFormatter(res.data.twoNum) : '0'
              })
            } else {
              for (let item of this.totalData) {
                if (res && (item.index === res.data.type)) {
                  item.oneNum = this.thousandFormatter(res.data.oneNum)
                  item.twoNum = this.thousandFormatter(res.data.twoNum)
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
          data: this.consumeDataTime
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
        let myChart = this.$echarts.init(document.getElementById('myChartAllPie'))
        myChart.on('legendselectchanged', function (params) {
          let storeNum = params.selected['商城'] ? self.consumeList.storeSum : 0 ;
          let vedio = params.selected['真人视讯'] ? self.consumeList.vedioSum : 0 ;
          let elec = params.selected['电子游戏'] ? self.consumeList.elecSum : 0 ;
          self.dynamicNum = storeNum + vedio + elec

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
            data: [
              {
                name: '商城',
                icon: 'rect'
              },
              {
                name: '真人视讯',
                icon: 'rect'
              },
              {
                name: '电子游戏',
                icon: 'rect'
              }
            ],
            right: '3%'
          },
          xAxis: {
            data: this.dateTypes
          },
          grid: {
            left: '4%',
            right: '3%',
            bottom: '10%',
            top: '16%'
          },
          yAxis: {},
          series: this.optionSeries,
          color: ['#49a9ee', '#98d87d', '#ffd86e', '#f3857b', '#8996e6']

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
            left: '4%',
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
              startTime: new Date(nowDate.setMonth(nowDate.getMonth()-3,1)).setHours(0,0,0,0)
            }
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
              startTime: new Date(nowDate.setMonth(nowDate.getMonth()-3,1)).setHours(0,0,0,0)
            }
            break
        }
        this.isGoConsumeAndIncome = false
        this.getConsumeAndIncome()
      }, // 售出收益日期筛选过滤切换
      thousandFormatter (num) {
        let toString = num.toString()
        let numOne = ''
        let numTwo = ''
        let formatterNum = ''
        if(toString.indexOf('.')>-1){
          [numOne,numTwo] = toString.split('.')
        }
        formatterNum = (numOne || num).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
        return numTwo ? `${formatterNum}.${numTwo}` : formatterNum
      }, // 千位符格式化
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
      } // 处理周次
    },
    beforeDestroy (){
      this.isSetInterval = false
      clearInterval(this.intervalid)
    }
  }
</script>

<style scpoed>
  .p-board{
    padding:1rem;
  }
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
    max-width: 75px;
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
    overflow: auto;
    padding: 0 1rem 1rem 1rem;
  }
  .content-top{
    overflow: hidden;
    padding: 20px 0
  }
  .content-bar{
    width: 100%;
    height: 260px;
  }
  @media screen and (min-width: 1280px){
    .right-number{
      max-width: 160px;
    }
  }

</style>
