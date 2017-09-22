<template lang="html">
  <div class="planpage">
    <VHeader></VHeader>
    <div class="bg"></div>
    <div class="content">
      <div class="bar">
        <div class="left">
          <i></i>
          <span>行业解决方案</span>
        </div>
        <div class="right">
          <i></i>
          <span> > 行业方案 > 动态标题</span>
        </div>
      </div>
      <div class="msg">
        <div class="msgContent">
          <h1>动态资讯标题</h1>
          <div class="msgImg">
            <img src="../assets/msg.png" alt="">
          </div>
          <p>后就哭了，违法的时间内喀麦隆轻松点v撒分别法国版韩国队能否梵蒂冈vwf给的服务而非额外如果维A额瓦负荷我ifvhaows分vijw扫荡符是山东fig怂滴感觉瑟瑟的风景索赔大佛可是iwqjed  缩放as发达省份所迫啊的风景四大佛教啊三等奖啊私人度假啊佛教啊审计法配送费就怕宋江示范点</p>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from './footer'
import VHeader from './header'
export default {
  components: {
    Footer, VHeader
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
      min-height: 495px;
      background-color: #fff;
      margin-top: 20px;
      border-top: 1px solid red;
      position: relative;
      .msgContent {
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%)translateY(-50%);
        h1 {
          font-size: 24px;
          color: #c00000;
        }
        .msgImg {
          width: 635px;
          height: 250px;
          margin: 0 auto;
          img {
            width: 100%;
            height: 100%;
          }
        }
        p {
          margin: 0 auto;
          margin-top: 18px;
          width: 925px;
          color: #7e7e7e;
          font-size: 16px;
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
        min-height: 330px;
        margin-top: 10px;
        .msgContent {
          h1 {
            font-size: 16px;
          }
          .msgImg {
            width: 425px;
            height: 165px;
            margin: 0 auto;
          }
          p {
            margin: 0 auto;
            margin-top: 10px;
            width: 620px;
            font-size: 10.67px;
          }
        }
      }
    }
  }
}
</style>
