<template>
  <div class="p-riskManagement">
    <div class="p-board-head">
      <el-row :gutter="20">
        <el-col :span="6"  class="head-all-item">
          <div class="head-item" style="padding: 0.85rem 0;">
            <div class="head-left">
              <img class="left-icon" src="/static/game-icon-1.png">
            </div>
            <div class="head-right">
              <div class="head-right-title color-gery">
                <el-select v-model="selectValue" placeholder="请选择" class="select" @change="changeSelect()">
                  <el-option
                    v-for="item in dataOne"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
                <div class="right-number" style="display: block">{{selectNum||0}}%</div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6" v-for="(item, index) in dataAll" :key="index" class="head-all-item">
          <div class="head-item">
            <div class="head-left">
              <img class="left-icon" :src="item.icon">
            </div>
            <div class="head-right">
              <div class="head-right-title color-gery">
                <div class="left-text">{{item.name}}</div>
                <el-tooltip class="item" effect="dark" :content="item.num.toString()" placement="right">
                  <div class="right-number">{{item.num}}</div>
                </el-tooltip>
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
            <div class="content-title">电子游戏风控图</div>
            <div>
              <div class="content-top">
                <el-col class="g-text-right">
                  <el-radio-group v-model="dateTypeTwo" size="small" @change="changeDateTypeTwo">
                    <el-radio-button label="0">1小时</el-radio-button>
                    <el-radio-button label="1">3小时</el-radio-button>
                    <el-radio-button label="2">6小时</el-radio-button>
                    <el-radio-button label="3">24小时</el-radio-button>
                    <el-radio-button label="4">三天</el-radio-button>
                    <el-radio-button label="5">七天</el-radio-button>
                    <el-radio-button label="6">一月</el-radio-button>
                  </el-radio-group>
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
        data: 'computerGame'
      })
      this.$store.commit('returnLocalStorage')
    },
    data () {
      return {
        dateTypeTwo: '0',
        dateIntervalTwo: '',
        totalData: [],
        statisticalIcon: ['/static/game-icon-2.png', '/static/game-icon-3.png', '/static/game-icon-4.png'],
        dateTypeArray: [],
        dataList: {},
        gameDate: {},
        isSetInterval: false, // 是否是定时刷新
        selectValue: '', // 统计栏下拉框值
        selectNum: '', // 是否是定时刷新
        dataAll: [],
        dataOne: []
      }
    },
    mounted () {
      let self = this
      self.changeDateTypeTwo()
      self.getStatisticalNum()
      self.intervalid = setInterval(() => {
        self.isSetInterval = true
        self.changeDateTypeTwo()
        self.getStatisticalNum()
      }, 60000);
    },
    computed: {
      optionSeriesLine () {
        let optionSeriesLine = [
          {
            name: '总杀数',
            type: 'line',
            data:  this.dataList.total
          },
          {
            name: '小厨娘',
            type: 'line',
            data: this.dataList.cate
          },
          {
            name: '塔罗之谜',
            type: 'line',
            data: this.dataList.tarrot
          }
        ]
        return optionSeriesLine
      },
      dateTypesLine () {
        return this.dataList.timeline
      }
    },
    methods: {
      getStatisticalNum (index) {
        invoke({
          url: api.statisticsGame,
          method: api.get
        }).then(
          result => {
            const [err, res] = result

            if (!this.isSetInterval) {
              for (let item of res.data.payload.data1.entries()){
                item[1].icon = this.statisticalIcon[item[0]]
              }
              this.dataAll = res.data.payload.data1
              this.dataOne = res.data.payload.data2
              this.selectValue = this.dataOne[0].name
              this.selectNum = this.dataOne[0].num
            } else {
              this.dataAll = this.dataAll.map(function(item, index){
                item.num = res.data.payload.data1[index].num
                return item
              })
              this.dataOne = this.dataOne.map(function(item, index){
                item.num = res.data.payload.data2[index].num
                return item
              })
              for (let item of this.dataOne) {
                if(this.selectValue == item.name){
                  this.selectNum = item.num
                }
              }
            }
          }
        )
      }, // 获取顶部统计数据
      getConsumeAndIncome () {
        let myChart = this.$echarts.init(document.getElementById('myChartAllLine'))
        myChart.showLoading({
          text: '图表加载中...',
          color: '#20a0ff',
          textColor: '#000',
          zlevel: 0
        })
        invoke({
          url: `${api.canvasGame}?type=${this.dateTypeTwo}`,
          method: api.get
        }).then(
          result => {
            const [err, ret] = result
            if (err) {
              this.$message.error(err.msg)
            } else {
              this.dataList = ret.data.payload.data
              this.drawAllLine()
            }
            myChart.hideLoading()
          }
        )
      }, // 获取售出，收益
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
                name: '总杀数',
                icon: 'circle'
              },
              {
                name: '小厨娘',
                icon: 'circle'
              },
              {
                name: '塔罗之谜',
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
      changeDateTypeTwo () {
        this.getConsumeAndIncome()
      }, // 售出收益日期筛选过滤切换
      changeSelect () {
        for (let item of this.dataOne) {
          if(this.selectValue == item.name){
            this.selectNum = item.num
          }
        }
      },
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

        return new Date(time + stepSunDay * 24 * 3600 * 1000+24*3600*1000);
      } // 处理周次
    },
    beforeDestroy (){
      this.isSetInterval = false
      clearInterval(this.intervalid)
    }
  }
</script>

<style scpoed lang="less">
  .p-riskManagement{
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

    .select{
      width: 86%;
    }
  }
  .right-number{
    padding-bottom: 0.5rem;
    font-size: 20px;
    color: #000000;
    max-width: 150px;
    text-overflow: ellipsis;
    overflow: hidden;
    display: inline-block;
    white-space: nowrap;
  }
  .color-gery{
    color: #b7b7b7;
  }
  /*content 内容*/
  .content-title{
    padding: 1rem;
    font-size: 18px;
    border-bottom: 1px solid #e8e8e8;
  }
  .left-text{
    padding-bottom: 0.5rem;
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
    height: 500px;
  }
  .el-input__inner{
    border: none;
    padding-left: 0;
    color: #b7b7b7 ;
    padding-bottom: 4px;
    height: 26px;
  }

  @media screen and (min-width: 1280px){
    .right-number{
      max-width: 250px!important;
    }
    .select{
      width: 50%!important;
    }
  }

  }



</style>
