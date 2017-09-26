<template lang="html">
  <div class="product">
    <div class="title">
      <p>Product</p>
      <h1>我们的产品</h1>
    </div>
    <ul>
      <li>
        <a href="#">
          <img src="../assets/1.png" alt="">
        </a>
        <h2>真人视讯</h2>
          <p>我们集合了当下最流行的真人视讯游戏类型整合了全新的互联网直播技术通过更逼真的赌场还原以及更流畅的服务，为客户提供全新的体验
          </p>
      </li>
      <li>
        <a href="#">
          <img src="../assets/2.png" alt="">
        </a>
        <h2>棋牌游戏</h2>
        <p>网络棋牌游戏正在被大家慢慢接受和喜欢我们把传统的棋牌游戏进行重新定义加上全新的呈现技术灵活的运营模式，推出了NA棋牌的产品序列</p>
      </li>
      <li>
        <a href="#">
          <img src="../assets/3.png" alt="">
        </a>
        <h2>电子游戏</h2>
        <p>NA电子游戏融合了传统的经典电子游戏加入了更加多元化的题材以及更加具有娱乐性的玩法让更多的玩家有丰富的游戏体验</p>
      </li>
      <li>
        <a href="#">
          <img src="../assets/4.png" alt="">
        </a>
        <h2>电子竞技</h2>
        <p>电子竞技的火热全世界都有目共睹，娱乐化职业化是未来电子竞技的未来NA电子竞技依托丰富的娱乐产品经验即将推出NA电子竞技产品序列，敬请期待……</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less">
.product {
  width: 100%;
  height: 100%;
  background-color: #000;
  .title {
    padding-top: 190px;
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
      padding-top: 127px;
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
