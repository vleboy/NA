<template lang="html">
  <div class="planpage">
    <VHeader></VHeader>
    <div class="bg"></div>
    <div class="content">
      <div class="bar">
        <div class="left">
          <i @click="goBack"></i>
          <span>{{title}}介绍</span>
        </div>
        <div class="right">
          <i></i>
          <span> > 公司产品 > {{title}}介绍</span>
        </div>
      </div>
      <div class="msg">
        <div class="msgContent">
          <div v-for="(item, index) in productData" :key="index">
            <h1>{{item.title}}</h1>
            <div class="msgImg">
              <img :src="item.imgUrl" alt="">
            </div>
            <p>{{item.content}}</p>
            <div v-for="e in item.tags">
              <h3>{{e.title}}</h3>
              <div class="msgImg">
                <img :src="e.img" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import VFooter from './footer'
import VHeader from './header'
export default {
  components: {
    VFooter, VHeader
  },
  data () {
    return {
      products: [
        {
          title: '塔罗之谜',
          imgUrl: '/static/ele.jpg',
          content: '  塔罗题材的电子游戏，有着小阿卡那牌【宝剑】【权杖】【圣杯】【星币】元素的符号预示着命运的真相。当出现3个及以上的【命运之轮】时，代表着你即将做一个重大的选择，五色卡牌分别对应五种决定命运的水晶球，跟随着直觉做出选择，带你进入全新的塔罗世界，感受塔罗的神秘力量。',
          tags: [
            {
              title: '【大奖】',
              img: '/static/tl_big.jpg'
            },
            {
              title: '【特色选择模式】',
              img: '/static/tl_choise.jpg'
            },
            {
              title: '【免费游戏】',
              img: '/static/tl_free.jpg'
            }
          ]
        },
        {
          title: '小厨娘',
          imgUrl: '/static/ele2.jpg',
          content: '有着传统中国风的美食题材电子游戏。一个民间普通的小厨娘，通过烹饪中国特色美食【北京烤鸭】【东坡肘子】【小笼包】【麻婆豆腐】【水煮鱼】受到皇帝了的青睐，下发御用【令牌】传召小厨娘进宫参加厨艺比赛。随着令牌传到的还有5卷诏书，小厨娘在选择一款拿手的调味方式后，将身着霓裳，进入华丽的皇宫参加比赛，根据自身的表现获得奖励。',
          tags: [
            {
              title: '【大奖】',
              img: '/static/xcn_big.jpg'
            },
            {
              title: '【特色选择模式】',
              img: 'static/xcn_choise.jpg'
            },
            {
              title: '【免费游戏】',
              img: '/static/xcn_free.jpg'
            }
          ]
        }
      ],
      chessData: [
        {
          title: '四川麻将',
          imgUrl: '',
          content: '《四川麻将》是NA娱乐出品的一款经典国粹麻将游戏。时尚简约的游戏画面，真人实时对战，伴您欢乐每一天。本产品基于开房模式开发，为玩家与好友提供一个稳定、安全的对局环境，即使好友不在身边也能随时开战，实时语音聊天。游戏中有十余种特殊规则可供开房者选择，以适配各地不同的玩法习惯。房间管理和个人战绩模块中提供了详细的对局详情记录功能，无论是开房者还是玩家都可以从中得知自己开设/参与的每场游戏中的战绩流水，从而更好的为玩家服务。',
          tags: [
            {
              title: '【胡】',
              img: '/static/qp1.jpg'
            },
             {
              title: '【胜利】',
              img: '/static/qp2.jpg'
            }
          ]
        },
        {
          title: '推锅',
          imgUrl: '',
          content: '《推锅》是NA娱乐出品的一款基于开房模式的经典牌九游戏。玩家通过在顺、天、地四个方位押注来与庄家对赌，比庄家大的庄家赔注，比庄家小的庄家吃注。《推锅》中每个房间最多可以支持十四名玩家同时进行游戏，其中包含十位旁观玩家和四位上座玩家。其中每位上座玩家都有坐庄的机会，而旁观玩家也能正常参与游戏中每一个回合的下注与结算。功能强大的房间管理系统使得开房者可以十分便捷地对房间进行管理，例如为玩家增加积分或为房间增加时间等。游戏中还为开房者提供了抽水模式的配置功能，开房者可以根据玩家习惯自由进行抽水模式的设置，并且房间管理中对于每个房间的抽水数额也都有着详细的记录与统计，以便于开房者进行结算。',
          tags: [
            {
              title: '【特效展示】',
              img: '/static/qp3.jpg'
            },
             {
              title: '【特效展示】',
              img: '/static/qp4.jpg'
            },
            {
              title: '【切牌阶段】',
              img: '/static/qp5.png'
            },
            {
              title: '【搓牌阶段】',
              img: '/static/qp6.png'
            },
            {
              title: '【开牌阶段】',
              img: '/static/qp7.png'
            },
            {
              title: '【房间管理】',
              img: '/static/qp8.png'
            },
            {
              title: '【对局详情】',
              img: '/static/qp9.png'
            }
          ]
        },
        {
          title: '推筒子',
          imgUrl: '',
          content: '《推筒子》是NA娱乐出品的一款基于开房模式的经典牌九游戏。玩家通过在顺、天、地四个方位押注来与庄家进行对赌，比庄家大的庄家赔注，比庄家小的庄家吃注。《推筒子》支持十四名玩家同时进行游戏，其中包含十位旁观玩家和四位上座玩家。其中每位上座玩家都有坐庄的机会，而旁观玩家也能正常参与游戏中每一个回合的下注与结算。功能强大的房间管理系统使得开房者可以十分便捷地对房间进行管理，例如为玩家增加积分或为房间增加时间等。游戏中还为开房者提供了抽水模式的配置功能，开房者可以根据玩家习惯自由进行抽水模式的设置，并且在房间管理中对于每个房间的抽水数额都有着详细的记录与统计，以便于开房者进行结算。',
          tags: [
            {
              title: '【掷骰子】',
              img: '/static/qp10.png'
            },
            {
              title: '【特效展示】',
              img: '/static/qp11.jpg'
            },
            {
              title: '【开牌阶段】',
              img: '/static/qp12.png'
            }
          ]
        }
      ],
      productData: [],
      demo: [
        {
          title: this.GetQueryString('title'),
          imgUrl: '/static/msg.png',
          content: '这是测试内容这是测试内容这是测试内容这是测试内容这是测试内容这是测试内容这是测试内容这是测试内容这是测试内容这是测试内容这是测试内容',
          tags: []
        }
      ],
      download: [
        {
          title: 'NA GAME DOWNLOAD',
          imgUrl: '/static/download.jpg',
          content: '',
          tags: []
        }
      ],
      title: '',
      electronData: [
        {
          title: 'NA游戏平台',
          imgUrl: '',
          content: 'NA游戏平台，是NA娱乐旗下针对博彩用户开发的全新游戏平台。它整合了NA娱乐旗下所有游戏，打造一个拥有直播、赛事、电子游戏、棋牌游戏的综合性博彩游戏平台，为所有玩家提供全新的游戏体验，让所有玩家都能通过NA游戏平台享受到博彩的乐趣。NA游戏平台除了提供基础的游戏服务外，还为玩家额外提供了完整的房间管理与数据记录功能，以便玩家对自己开设和参与的游戏数据进行管理和分析。同时内置道具商城为玩家提供更多的额外服务，从而获得更好的游戏体验。并且，在NA游戏平台中，内置的活动页面还可以让合作伙伴自由发布广告和活动，迅速而便捷地进行自我宣传和推广。',
          tags: [
            {
              title: '【大厅】',
              img: '/static/gameHall1.png'
            },
            {
              title: '【活动】',
              img: '/static/gameHall2.png'
            },
            {
              title: '【房间管理】',
              img: '/static/gameHall3.png'
            },
            {
              title: '【商城】',
              img: '/static/gameHall4.png'
            }
          ]
        }
      ],
      peopleData: [
        {
          title: '移动真人LIVE',
          imgUrl: '/static/people1.jpg',
          content: '移动真人LIVE集合了当下最受欢迎的真人视讯游戏，多种类投注方式，娱乐性强，稳定高效流畅体验。',
          tags: []
        },
        {
          title: '多样式投注玩法',
          imgUrl: '/static/people2.jpg',
          content: 'NA全新上线B27，免佣，SUPER 6投注模式，让玩家更多的享受多样化玩法。',
          tags: []
        },
        {
          title: '全明咪牌',
          imgUrl: '/static/people3.jpg',
          content: '为提高交互式体验，百家乐普通台全部玩家可进行咪牌操作！',
          tags: []
        },
        {
          title: '多台娱乐',
          imgUrl: '/static/people4.jpg',
          content: '玩家可根据选择进行多台娱乐，置顶与置底功能，更方便了客户的便捷性。运势佳的游戏台创造连赢机会，真正实际意义上给玩家纵观全场，把握致胜先机的最佳选择。',
          tags: []
        }
      ]
    }
  },
  created () {
    let type = this.GetQueryString('type')
    let titles = this.GetQueryString('title')
    this.title = titles
    if(type === 'tiger'){
      this.productData = this.products
    } else if(type === 'chess'){
      this.productData = this.chessData
    } else if(type === 'android' || type === 'ios'){
      this.productData = this.download
    } else if(type === 'electron'){
      this.productData = this.electronData
    } else if (type === 'people') {
      this.productData = this.peopleData
    } else {
      this.productData = this.demo
    }
  },
  methods: {
    GetQueryString: function (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
          return decodeURI(r[2]);
      }
      return null;
    },
    goBack: function () {
      history.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.planpage {
  width: 100%;
  height: 100%;
  background-color: #191919;
  // padding-bottom:100px;
  position: relative;
  .bg {
    width: 100%;
    height: 450px;
    background: url('../assets/pagebg.jpg') no-repeat;
    background-size: 100%;
    background-position: 0 -2px;
  }
  .content {
    margin: 27px 16.15% 0;
    padding-bottom: 57px;
  .bar {
      width: 100%;
      color: #fff;
      &:after {
        content: '';
        display: block;
        clear: both;
        height: 0;
        visibility: hidden;
        zoom: 1;
      }
      .left {
        float: left;
        i {
          display: inline-block;
          width: 25px;
          height: 25px;
          background: url('../assets/iconLeft.png') no-repeat;
          background-size: cover;
          cursor: pointer;
        }
        span {
          font-size: 26.67px;
          vertical-align: bottom;
        }
      }
      .right {
        float: right;
        i {
          display: inline-block;
          width: 15px;
          height: 15px;
          background: url('../assets/iconIndex.png') no-repeat;
          background-size: cover;
          vertical-align: middle;
        }
        span {
          font-size: 12px;
        }
      }
    }
    .msg {
      width: 100%;
      background-color: #fff;
      margin-top: 20px;
      border-top: 1px solid red;
      position: relative;
      text-align: center;
      .msgContent {
        padding: 50px;
        h1 {
          margin: 100px auto 50px;
          font-size: 40px;
          color: #c00000;
        }
        .msgImg {
          width: 635px;
          // height: 250px;
          margin: 0 auto;
          img {
            width: 100%;
            height: 100%;
          }
        }
        p {
          margin: 0 auto 20px;
          margin-top: 18px;
          width: 635px;
          color: #7e7e7e;
          font-size: 16px;
          line-height: 30px
        }
        h3 {
          margin: 100px 0 50px;
        }
      }
    }
  }
}
@media screen and (min-width: 768px) and (max-width: 1280px) {
  .planpage {
    padding-bottom:100px;
    .bg {
      height: 300px;//450
    }
    .content {
      padding-bottom: 35px;
      .bar {
        .left {
          i {
            width: 17px;
            height: 17px;
          }
          span {
            font-size: 17px;
          }
        }
        .right {
          i {
            width: 10px;
            height: 10px;
          }
          span {
            font-size: 8px;
          }
        }
      }
      .msg {
        margin-top: 10px;
        .msgContent {
          h1 {
            font-size: 25px;
          }
          .msgImg {
            width: 425px;
            // height: 165px;
            margin: 0 auto;
          }
          p {
            margin: 0 auto 40px;
            margin-top: 10px;
            width: 425px;
            font-size: 10.67px;
            line-height: 20px
          }
        }
      }
    }
  }
}
@media (max-width: 768px){
  .planpage {
    padding-bottom:0px; 
    background-color: #fff;
    .bg {
      height: 225px;
      background: url('../assets/mobile/bg.png') no-repeat;
      background-size: 100%;
    }
    .content {
      margin: 0;
      .bar {
        display: none
      }
      .msg {
        width: 100%;
        border-top: none;
        padding: 0 10px;
        .msgContent {
          width: 100%;
          padding: 0;
          h1 {
            margin: 50px auto 20px;
          }
          .msgImg {
            width: 100%;
          }
          p {
            width: 100%;
          }
          h3 {
            margin: 40px 0 20px;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 768px) and (orientation: landscape) {
  .planpage {
    .bg {
      height: 400px;
      background: url('../assets/mobile/bg2.jpg') no-repeat;
      background-size: 100%;
    }
  }
}
</style>
