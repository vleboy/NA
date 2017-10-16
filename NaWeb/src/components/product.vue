<template lang="html">
  <div class="product">
    <div class="product-content">
      <div class="title">
        <p>PRODUCTS</p>
        <h1>我们的产品</h1>
      </div>
      <ul>
        <li v-for="(item, index) in Products" :key="index">
          <a :href='`/about.html?type=${item.type}&title=${item.title}`'>
            <img :src="item.imgUrl" alt="">
          </a>
          <h2>{{item.title}}</h2>
            <p>{{item.content}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      Products: [
        {title: '游戏平台', type: 'electron', content: 'NA游戏平台，是NA娱乐针对博彩行业开发的全新游戏平台。它整合了NA娱乐旗下所有游戏，打造一个拥有真人直播、电子游戏、棋牌游戏的综合性博彩游戏平台，为所有玩家提供全新的游戏体验。',imgUrl: '/static/g4.png'},
        {title: '真人视讯', type: 'people', content: '我们集合了当下最流行的真人视讯游戏类型整合了全新的互联网直播技术通过更逼真的赌场还原以及更流畅的服务，为客户提供全新的体验。',imgUrl: '/static/g1.png'},
        {title: '棋牌游戏', type: 'chess', content: '网络棋牌游戏正在被大家慢慢接受和喜欢我们把传统的棋牌游戏进行重新定义加上全新的呈现技术灵活的运营模式，推出了NA棋牌的产品序列。',imgUrl: '/static/g3.png'},
        {title: '电子游戏', type: 'tiger', content: 'NA电子游戏融合了传统的经典电子游戏加入了更加多元化的题材以及更加具有娱乐性的玩法让更多的玩家有丰富的游戏体验。',imgUrl: '/static/g2.png'}
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.product {
  width: 100%;
  height: 100%;
  background-color: #000;
  display: table;
  .product-content {
    display: table-cell;
    vertical-align: middle;
  }
  .title {
    text-align: center;
    color: #fff;
    p {
      font-size: 14px;
      margin-bottom: 23px;
    }
    h1 {
      font-size: 43px;
    }
  }
  ul {
    width:100%;
    padding: 0 10.73%;
    margin-top: 80px;
    text-align: center;
    color: #fff;
    &:after {
      content: '';
      display: block;
      clear: both;
      height: 0;
      visibility: hidden;
      zoom: 1;
    }
    li {
      width: 25%;
      float: left;
      a {
        display: inline-block;
        width: 90%;
        height: 90%;
        border-radius: 100%;
        margin-bottom: 20px;
        border: 4px solid transparent;
        -webkit-transition: border .5s;
        transition: border .5s;
        &:hover {
          border: 4px solid red;
          -webkit-transition: border .5s;
          transition: border .5s;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
      h2 {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 24px
      }
      p {
        width: 192px;
        margin: 0 auto;
        font-size: 12px;
        line-height: 3em;
      }
    }
  }
}
@media screen and (min-width: 768px) and (max-width: 1280px) {
  .product {
    .title {
      p {
        font-size: 9.33px;
        margin-bottom: 14px;
      }
      h1 {
        font-size: 28.67px;
      }
    }
    ul {
      padding: 0 10.7%;
      margin-top: 54px;
      li {
        a {
          width: 90%;
          height: 90%;
          margin-bottom: 13px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        h2 {
          font-size: 12px;
          margin-bottom: 15px
        }
        p {
          width: 129px;
          font-size: 8px;
          line-height: 2em;
        }
      }
    }
  }
}
</style>
