<template lang="html">
  <div class="plan">
    <div class="plan-content">
      <div class="title">
        <p>SOLUTION</p>
        <h1>行业解决方案</h1>
      </div>
      <ul>
        <li v-for="(item, index) in Solutions" :key="index">
          <a href="javascript:;" class="img">
            <!-- <div><img :src="item.imgUrl" alt=""></div> -->
            <i :style="`background: url(${item.imgUrl}) 3px 0 no-repeat;background-size: cover;`"></i>
          </a>
          <h2>{{item.title}}</h2>
          <!-- <p>{{item.content}}</p> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
       Solutions: [
         { title: '移动端解决方案', content: '内容文字内容文字内容文字内容文字 保留两排超出给标点符号', imgUrl: '/static/p1.png'},
         { title: 'WEB端解决方案', content: '内容文字内容文字内容文字内容文字 保留两排超出给标点符号', imgUrl: '/static/p2.png'},
         { title: 'PC端解决方案', content: '内容文字内容文字内容文字内容文字 保留两排超出给标点符号', imgUrl: '/static/p3.png'},
         { title: '直播系统解决方案', content: '内容文字内容文字内容文字内容文字 保留两排超出给标点符号', imgUrl: '/static/p4.png'}
       ]
    }
  }
}
</script>

<style lang="less" scoped>
.plan {
  width: 100%;
  height: 100%;
  background: url('../assets/planBg.jpg') no-repeat;
  background-size: cover;
  display: table;
  .plan-content {
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
      .img {
        position: relative;
        display: inline-block;
        width: 90%;
        height: 0;
        padding-bottom: 90%;
        background: url('../assets/plansbg.png') no-repeat;
        background-size: cover;
        border-radius: 100%;
        margin-bottom: 20px;
        &:hover i {
          background-position: 3px -150px!important;
        }
        i {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateX(-50%)translateY(-50%);
          display: inline-block;
          width: 150px;
          height: 0;
          padding-bottom: 150px;
        }
        img {
          width: 30%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translateX(-50%)translateY(-50%);
        }
      }
      h2 {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 24px;
        margin-left: 3px;
      }
      p {
        width: 192px;
        margin: 0 auto;
        font-size: 12px;
        line-height: 29px;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      button {
        width: 137px;
        height: 37px;
        margin-top: 22px;
        background: url('../assets/btn.png') no-repeat;
        background-size: cover;
        color: #fff;
        font-size: 14px;
        outline: none;
        cursor: pointer;
      }
    }
  }
}
@media screen and (min-width: 768px) and (max-width: 1280px) {
  .plan {
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
        .img {
          margin-bottom: 13px;
          &:hover i {
            background-position: 3px -100px!important;
          }
          i {
            width: 100px;
            height: 0;
            padding-bottom: 100px;
          }
        }
        h2 {
          font-size: 12px;
          margin-bottom: 15px
        }
        p {
          width: 129px;
          font-size: 8px;
          line-height: 29px;
        }
        button {
          width: 92px;
          height: 25px;
          margin-top: 14px;
          font-size: 9px;
        }
      }
    }
  }
}
@media screen and (max-width: 750px) and (orientation: portrait){
  .plan {

    .plan-content {
      height: 100%;
      display: block;
    }
    .title {
      position: relative;
      top:13%;

      h1 {
        font-size: 30px;
      }
    }
    ul {
      position: relative;
      top:6%;

      li {
        width: 50%;
        float: left;
        margin-bottom: 20px;
        .img {
          margin-bottom: 13px;
          &:hover i {
            background-position: 3px -100px!important;
          }
          i {
            width: 100px;
            height: 0;
            padding-bottom: 100px;
          }
        }
        h2 {
          font-size: 12px;
          margin-bottom: 15px
        }
        p {
          width: 129px;
          font-size: 8px;
          line-height: 29px;
        }
        button {
          width: 92px;
          height: 25px;
          margin-top: 14px;
          font-size: 9px;
        }
      }
    }
  }
}
@media screen and (max-width: 750px) and (orientation: landscape){
  .plan {
    .title {
      position: relative;
      top:13%;
      p {
        font-size: 12px;
      }
      h1 {
        font-size: 23px;
      }
    }
    ul {
      margin-top: 5%;
      li {
        .img {
          margin-bottom: 10px;
          &:hover i {
            background-position: 3px -75px!important;
          }
          i {
            width: 75px;
            height: 0;
            padding-bottom: 75px;
          }
        }
        h2 {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
