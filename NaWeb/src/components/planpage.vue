<template lang="html">
  <div class="planpage">
    <VHeader></VHeader>
    <div class="bg"></div>
    <div class="content">
      <div class="bar">
        <div class="left">
          <i></i>
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
            <h3>【大奖】</h3>
            <div class="msgImg">
              <img :src="item.img1" alt="">
            </div>
            <h3>【特色选择模式】</h3>
            <div class="msgImg">
              <img :src="item.img2" alt="">
            </div>
            <h3>【免费游戏】</h3>
            <div class="msgImg">
              <img :src="item.img3" alt="">
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
          imgUrl: '/static/ele.png',
          content: '  塔罗题材的电子游戏，有着小阿卡那牌【宝剑】【权杖】【圣杯】【星币】元素的符号预示着命运的真相。当出现3个及以上的【命运之轮】时，代表着你即将做一个重大的选择，五色卡牌分别对应五种决定命运的水晶球，跟随着直觉做出选择，带你进入全新的塔罗世界，感受塔罗的神秘力量。',
          img1: '/static/tl_big.jpg',
          img2: '/static/tl_choise.jpg',
          img3: '/static/tl_free.jpg'
        },
        {
          title: '小厨娘',
          imgUrl: '/static/ele2.jpg',
          content: '有着传统中国风的美食题材电子游戏。一个民间普通的小厨娘，通过烹饪中国特色美食【北京烤鸭】【东坡肘子】【小笼包】【麻婆豆腐】【水煮鱼】受到皇帝了的青睐，下发御用【令牌】传召小厨娘进宫参加厨艺比赛。随着令牌传到的还有5卷诏书，小厨娘在选择一款拿手的调味方式后，将身着霓裳，进入华丽的皇宫参加比赛，根据自身的表现获得奖励。',
          img1: '/static/xcn_big.jpg',
          img2: '/static/xcn_choise.jpg',
          img3: '/static/xcn_free.jpg'
        }
      ],
      productData: [],
      demo: [
        {
          title: this.GetQueryString('title'),
          imgUrl: '/static/msg.png',
          content: '这是测试内容这是测试内容这是测试内容这是测试内容这是测试内容这是测试内容这是测试内容这是测试内容这是测试内容这是测试内容这是测试内容',
          img1: '/static/msg.png',
          img2: '/static/msg.png',
          img3: '/static/msg.png'
        }
      ],
      title: ''
    }
  },
  created () {
    let type = this.GetQueryString('type')
    let titles = this.GetQueryString('title')
    this.title = titles
    type === 'tiger' ? this.productData = this.products : this.productData = this.demo
  },
  methods: {
    GetQueryString: function (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
          return decodeURI(r[2]);
      }
      return null;
    }
  }
}
</script>

<style lang="less">
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
    background-size: cover;
    background-position: 0 -2px;
  }
  .content {
    margin: 27px 310px 55px;
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
      margin: 15px 205px 35px;
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
</style>
