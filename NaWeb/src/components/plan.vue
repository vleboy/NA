<template lang="html">
  <div class="plan">
    <div class="title">
      <p>Solution</p>
      <h1>行业解决方案</h1>
    </div>
    <ul>
      <li v-for="(item, index) in Solutions" :key="index">
        <a href="javascript:;" class="img">
          <img :src="item.imgUrl" alt="">
        </a>
        <h2>{{item.title}}</h2>
        <p>{{item.content}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
       Solutions: [
         { title: '标题信息', content: '内容文字内容文字内容文字内容文字 保留两排超出给标点符号', imgUrl: '/static/11.png'},
         { title: '标题信息', content: '内容文字内容文字内容文字内容文字 保留两排超出给标点符号', imgUrl: '/static/22.png'},
         { title: '标题信息', content: '内容文字内容文字内容文字内容文字 保留两排超出给标点符号', imgUrl: '/static/33.png'},
         { title: '标题信息', content: '内容文字内容文字内容文字内容文字 保留两排超出给标点符号', imgUrl: '/static/444.png'}
       ]
    }
  }
}
</script>

<style lang="less">
.plan {
  width: 100%;
  height: 100%;
  background: url('../assets/planBg.jpg') no-repeat;
  background-size: cover;
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
      .img {
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
        .img {
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
</style>
