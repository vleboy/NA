<template lang="html">
  <div class="">
    <div class="indexHeader actives">
      <div class="mid">
        <ul id="menu">
          <li data-menuanchor="page1" class="active"><a href="#page1">首页<i>·</i></a></li>
          <li data-menuanchor="page2"><a href="#page2">关于我们<i>·</i></a></a></li>
          <li data-menuanchor="page3"><a href="#page3">立即下载<i>·</i></a></li>
          <li data-menuanchor="page4"><a href="#page4">行业解决方案<i>·</i></a></li>
          <li data-menuanchor="page5"><a href="#page5">公司产品<i>·</i></a></li>
          <li data-menuanchor="page7"><a href="#page7">联系我们</a></li>
        </ul>
      </div>
    </div>
    <div class="logo-top">
      <img src="../assets/logo.png" alt="">
    </div>
    <div class="navbars" @click="show()">
      <a href="javascript:;">
        <img src="../assets/nav.png" alt="">
      </a>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    show: function() {
      if($('.indexHeader').hasClass('actives')){
        $('.indexHeader').removeClass('actives')
      } else {
        $('.indexHeader').addClass('actives')
      }
    },
    moveTos: function(i) {
      $.fn.fullpage.moveTo(i)
    }
  },
}
</script>

<style lang="less" scoped>
.indexHeader {
  position: fixed;
  top: 0;
  right: 0;
  width: 80%;
  height: 100px;
  line-height: 100px;
  background: url('../assets/navbg.png') no-repeat;
  background-position: 10px 0;
  border-bottom: 2px solid red;
  border-image: -webkit-linear-gradient(-270deg, transparent, red)10 30;
  border-image: -moz-linear-gradient(-270deg, transparent, red)10 30;
  border-image: linear-gradient(-270deg, transparent, red)10 30;
  z-index: 99;
  color: #fff !important;
  font-size: 18.67px;
  text-align: center;
  transition: right .5s;
  .mid {
    float: left;
    margin-left: 15%;
    //
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
          margin: 0 35px;
          color: #fff !important;
        }
      }
      .active a{
        color: red !important;
      }
    }
  }
}
.logo-top {
  position: absolute;
  top: 35px;
  left: 45px;
  width: 160px;
  height: 80px;
  z-index: 99;
  img {
    width: 100%;
    height: 100%;
  }
}
.navbars {
  position: fixed;
  top: 35px;
  right: 41px;
  z-index: 99;
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
.actives {
  right: -80%;
  transition: right .5s;
}
@media screen and (min-width: 768px) and (max-width: 1280px) {
  .indexHeader {
    height: 66px;
    line-height: 66px;
    border-bottom: 1px solid red;
    font-size: 12px;
      ul {
        li {
          i {
            margin: 0 30px;
          }
        }
      }
    }
    .logo-top {
      top: 25px;
      left: 30px;
      width: 105px;
      height: 50px;
    }
  .navbars {
    top: 25px;
    right: 25px;
    z-index: 99;
    a {
      width: 25px;
      height: 20px;
    }
  }
}
@media screen and (max-width: 750px) {

    .logo-top {
      top:28px;
     img{
       width: 40%;
       height: 40%;
     }
    }
  .navbars {
    display: none;
  }
}
</style>
