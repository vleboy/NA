<template>
  <div class="arcade_modal">
    <div class="arcade_modal_bg">
      <div class="arcade_modal_head" v-if="recordArray.length">
        <img class="head_img" :src="recordAllObj.winType">
        <span class="head_text">{{recordAllObj.userWin}}</span>
      </div>
      <div class="arcade_modal_content">
        <div v-for="(data,index) in recordArray" :key="index" class="arcade_modal_wrap">
          <div v-for="(item,indexChild) in data" :key="indexChild" class="arcade_modal_low"
               :style="{'background-image': 'url(' + item.img + ')','background-repeat':'no-repeat','background-size':'100%'}">
            <div class="item_left">x{{item.rate||0}}</div>
            <div class="item_right">
              <div class="right_top">{{item.total||0}}</div>
              <div class="right_bottom">{{item.bet||0}}</div>
            </div>
          </div>
          <div v-for="(item,indexChild) in data" :key="indexChild"  class="arcade_modal_low " :class="{'layer':!item.isWin}"></div>
        </div>
      </div>
      <div class="arcade_modal_footer">
        <div class="footer-div footer_left">
          <span>{{recordAllObj.totalBets||0}}</span>
        </div>
        <div class="footer-div footer_center">
          <span>{{recordAllObj.userWin||0}}</span>
        </div>
        <div class="footer-div footer_right">
          <span>1</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { detailTime, formatUserName, thousandFormatter } from '@/behavior/format'
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'

export default {
  name: 'ArcadeModal',
  props:['dataProp'],
  data () {
    return {
      recordAllObj: {}, // 获取战绩所有对象
      propInfo: {}, // 组件信息
      roundRates: [], // 赔率
      roundBets: [], // 下注数
      recordArray: [],
      roundIcon:[
        {
          imgOne:'static/playerBill/slxy/1hong.png',
          imgTwo:'static/playerBill/slxy/1hong_x.png'
        },
        {
          imgOne:'static/playerBill/slxy/1huang.png',
          imgTwo:'static/playerBill/slxy/1huang_x.png'
        },
        {
          imgOne:'static/playerBill/slxy/1lv.png',
          imgTwo:'static/playerBill/slxy/1lv_x.png'
        },
        {
          imgOne:'static/playerBill/slxy/2hong.png',
          imgTwo:'static/playerBill/slxy/2hong_x.png'
        },
        {
          imgOne:'static/playerBill/slxy/2huang.png',
          imgTwo:'static/playerBill/slxy/2huang_x.png'
        },
        {
          imgOne:'static/playerBill/slxy/2lv.png',
          imgTwo:'static/playerBill/slxy/2lv_x.png'
        },
        {
          imgOne:'static/playerBill/slxy/3hong.png',
          imgTwo:'static/playerBill/slxy/3hong_x.png'
        },
        {
          imgOne:'static/playerBill/slxy/3huang.png',
          imgTwo:'static/playerBill/slxy/3huang_x.png'
        },
        {
          imgOne:'static/playerBill/slxy/3lv.png',
          imgTwo:'static/playerBill/slxy/3lv_x.png'
        },
        {
          imgOne:'static/playerBill/slxy/4hong.png',
          imgTwo:'static/playerBill/slxy/4hong_x.png'
        },
        {
          imgOne:'static/playerBill/slxy/4huang.png',
          imgTwo:'static/playerBill/slxy/4huang_x.png'
        },
        {
          imgOne:'static/playerBill/slxy/4lv.png',
          imgTwo:'static/playerBill/slxy/4lv_x.png'
        },
        {
          imgOne:'static/playerBill/slxy/lanmogu.png',
          imgTwo:'static/playerBill/slxy/lanmogu_x.png'
        },
        {
          imgOne:'static/playerBill/slxy/baoxiang.png',
          imgTwo:'static/playerBill/slxy/baoxiang_x.png'
        },
        {
          imgOne:'static/playerBill/slxy/hongmogu.png',
          imgTwo:'static/playerBill/slxy/hongmogu_x.png'
        }
      ],
      winResultObj: {
        '1': 'static/playerBill/slxy/slxy_youwin.png' ,
        '2': 'static/playerBill/slxy/slxy_bigwin.png' ,
        '3': 'static/playerBill/slxy/slxy_magic.png' ,
        '4': 'static/playerBill/slxy/slxy_super.png'
      }
    }
  },
  methods:{
    getRecordSLXY() {
      this.recordArray = []
      invoke({
        url: api.playerRecord,
        method: api.post,
        data: {
          userName: localStorage.playerName,
          betId: this.dataProp.businessKey
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
            this.recordAllObj = res.data.data.record;
            if(this.recordAllObj.userWin<'100'){
              this.recordAllObj.winType = this.winResultObj[1]
            } else if (this.recordAllObj.userWin >= '100' && this.recordAllObj.userWin < '500') {
              this.recordAllObj.winType = this.winResultObj[2]
            } else if (this.recordAllObj.userWin >= '500' && this.recordAllObj.userWin < '1000') {
              this.recordAllObj.winType = this.winResultObj[3]
            } else if (this.recordAllObj.userWin >= '1000') {
              this.recordAllObj.winType = this.winResultObj[4]
            }
            // 组装渲染的列表
            for (let [index,item] of this.recordAllObj.roundBets.entries()) {
              this.recordArray.push({
                id: index+1,
                bet: item,
                rate: this.recordAllObj.roundRates[index],
                total: this.recordAllObj.roundBetsTotal[index],
                isWin: false,
                img: item > 0  ? this.roundIcon[index].imgTwo : this.roundIcon[index].imgOne
              })
            }
            // 判断中奖位置
            for (let data of this.recordAllObj.goalIndex){
              for (let data1 of this.recordArray){
                if (data == data1.id){
                  data1.isWin = true
                }
              }
            }
            this.recordArray = this.split_array(this.recordArray,3);
          }
        }
      )
    },
    split_array (arr, len) {
      var a_len = arr.length;
      var result = [];
      for(var i=0;i<a_len;i+=len){
        result.push(arr.slice(i,i+len));
      }
      return result;
    }
  }
}
</script>

<style scoped>
  .arcade_modal .arcade_modal_bg{
    background-repeat:no-repeat!important;
    background-size: 100% auto!important;
    height: 500px;
    position: relative;
    background: url("../../../static/playerBill/slxy/slxy_bg.jpg");
  }
  .arcade_modal .arcade_modal_head{
    position: absolute;
    width: 100%;
    top: 10%;
  }
  .arcade_modal .head_img{
    width: 42%;
  }

  .arcade_modal .head_text{
    font-size: 5.8rem;
    color: #ffffff;
    margin-left: 20px;
  }

  .arcade_modal .arcade_modal_content{
    position: absolute;
    top:34%;
    width: 100%;
  }

  .arcade_modal .layer{
    background-color: #050708;
    position: relative;
    top: -255px;
    opacity: 0.4;
  }

  .arcade_modal .arcade_modal_wrap{
    display: inline-block;
    overflow:hidden;
  }

  .arcade_modal .right_bottom{
    color: #ffffff;
  }
  .arcade_modal .right_top{
    color: #01deff;
    margin-bottom:8px;
  }

  .arcade_modal .item_right{
    width: 100px;
    float: right;
    position: relative;
    top: 16px;
    font-size: 16px;
  }

  .arcade_modal .item_left{
    float: left;
    color: #eca420;
    position: relative;
    top: 66px;
    left: 38px;
  }

  .arcade_modal .arcade_modal_low{
    display: block;
    width: 170px;
    height: 84px;
  }
  .arcade_modal .arcade_modal_footer{
    position: absolute;
    bottom:34px;
    font-size: 18px;
    color: #e4e4e4;
    width: 100%;
  }
  .arcade_modal .footer-div{
    display: inline-block;
    width: 100px;
  }

  .arcade_modal .footer_left{
    position: absolute;
    left: 85px;
  }
  .arcade_modal .footer_center{
    position: absolute;
    left: 184px;
  }
  .arcade_modal .footer_right{
    position: absolute;
    right: 126px;
  }
</style>
