<template lang="html">
  <div class="header">
    <h1>
      <a href="/">
        <img src="../assets/logo.png" alt="">
      </a>
    </h1>
    <div class="mid">
      <ul>
        <li><a href="index.html#page1">首页<i>·</i></a></li>
        <li><a href="index.html#page2">关于我们<i>·</i></a></li>
        <li><a href="index.html#page3">立即下载<i>·</i></a></li>
        <li><a href="index.html#page4">行业解决方案<i>·</i></a></li>
        <li class="active"><a href="index.html#page5">公司产品<i>·</i></a></li>
        <li><a href="index.html#page7">联系我们</a></li>
      </ul>
    </div>
    <div class="right">
      <a href="javascript:;">
        <img src="../assets/nav.png" alt="">
      </a>
    </div>
    <div class="right-mobile">
      <a href="/index.html#page5">
        <img src="../assets/mobile/back.png" >
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'header'
}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 100px;
  border-bottom: 2px solid #ec3642;
  line-height: 100px;
  background-color: rgba(14, 14, 14, 0.9);
  position: fixed;
  z-index: 70;
  color: #fff;
  font-size: 18.67px;
  &:after {
    content: '';
    display: block;
    clear: both;
    height: 0;
    visibility: hidden;
    zoom: 1;
  }
  h1 {
    float: left;
    height: 100%;
    margin-left: 16.51%;
    a {
      display: inline-block;
      width: 157px;
      height: 78px;
      img {
        width: 100%;
        height: 100%;
        vertical-align: middle;
      }
    }
  }
  .mid {
    float: left;
    margin-left: 7.4%;
    ul {
      &:after {
        content: '';
        display: block;
        clear: both;
        height: 0;
        visibility: hidden;
        zoom: 1;
      }
      li {
        float: left;
        a {
          color: #fff;
        }
        i {
          display: inline-block;
          margin: 0 1.5rem;
          color: #fff !important;
        }
      }
      .active a{
        color: red;
      }
    }
  }
  .right {
    height: 100%;
    float: right;
    margin-right: 41px;
    a {
      display: inline-block;
      width: 36px;
      height: 29px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .right-mobile {
    display: none;
  }
}
@media screen and (min-width: 768px) and (max-width: 1280px) {
  .header {
    height: 69px;
    border-bottom: 1px solid #ec3642;
    line-height: 69px;
    font-size: 12.45px;
    h1 {
      margin-left: 16.48%;
      a {
        width: 105px;
        height: 52px;
      }
    }
    .mid {
      margin-left: 7.34%;
      ul {
        li {
          i {
            margin: 0 1.3rem;
          }
        }
      }
    }
    .right {
      margin-right: 27px;
      a {
        width: 25px;
        height: 20px;
      }
    }
    .right-mobile {
      display: none
    }
  }
}
@media (max-width: 768px) {
  .header {
    height: 50px;
    line-height: 50px;
    h1 {
      margin-left: 10px; 
      a {
        width: 80px;
        height: 40px;
        img {
          width: 100%;
          vertical-align: sub;
        }
      }
    }
    .mid {
      display: none
    }
    .right{
      display: none
    }
    .right-mobile{
      display: block;
      height: 100%;
      float: right;
      margin-right: 10px;
      a {
        display: inline-block;
        width: 30px;
        height: 30px;
        vertical-align: text-bottom;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  } 
}
@media screen and (orientation: landscape) {

}
</style>
