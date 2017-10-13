<template lang="html">
  <div class="n2">
    <div class="n2-content">
      <div class="title">
        <p>N² PLAN</p>
        <h1>N² 计划</h1>
      </div>
      <div class="content">
        <div class="left">
          <i></i>
          <p>{{lefts.content}}</p>
          <!--<img :src="lefts.imgUrl">-->
        <!-- <h2><span>N²计划</span></h2> -->
        </div>
        <div class="right">
          <ul>
            <li v-for="(item, index) in rights" :key="index">
              <div class="img" :style="`background:url(${item.imgUrl}) no-repeat;background-size: cover`">
                <h2><span>{{item.title}}</span></h2>
                <div class="bg"></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      lefts: {
        content: '新亚洲集团基于多年的行业运营经验，总结和分析未来数字娱乐的发展方向，对接了全球优秀的技术资源，本着向行业提供更加多元，更加优质的电子娱乐内容的初衷，即将推出N²计划，敬请期待……',
        imgUrl: ''
      },
      rights: [
        {title: '全新的产品形态,待续...', imgUrl: '/static/n1.JPG'},
        {title: '全新的用户体验,待续...', imgUrl: '/static/n2.jpg'},
        {title: '全新的运营思路,待续...', imgUrl: '/static/n3.jpg'},
        {title: '全新的合作方式,待续...', imgUrl: '/static/n4.jpg'}
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.n2 {
  width: 100%;
  height: 100%;
  background: url('../assets/n2Bg.png') no-repeat;
  background-size: cover;
  display: table;
  .n2-content {
    display: table-cell;
    vertical-align: middle;
  }
  .title {
    text-align: center;
    color: #fff;
    p {
      font-size: 14px;
      margin-bottom: 22px;
    }
    h1 {
      font-size: 43.13px;
    }
  }
  .content {
    margin: 74px 19.53125% 0;
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
      position: relative;
      width: 50%;//567px
      // height: 617px;
      padding-bottom: 50%;
      height: 0;
      color: #ffffff;
      text-align: center;
      border-radius: 15px;
      background: url('../assets/plan1.png') no-repeat;
      background-size: cover;
      overflow: hidden;
      i {
        display: inline-block;
        width: 265px;
        height: 89px;
        background: url('../assets/tag.png') no-repeat;
        background-size: cover;
        position: absolute;
        top: 35px;
        left: -10px;
      }
      p {
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translateX(-50%)translateY(-50%);
                transform: translateX(-50%)translateY(-50%);
        width: 408px;
        font-size: 16px;
        line-height: 26.40005px;
      }
    }
    .right {
      float: left;
      width: 50%;// 600px;
      ul {
        color: #fff;
        text-align: center;
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
          width: 50%;
          // height: 296px;
          padding-bottom: 50%;
          height: 0;
          margin-bottom: 25px;
          padding-left: 15px;
          .img {
            position: relative;
            width: 100%;
            // height: 100%;
            padding-bottom: 100%;
            height: 0;
            border-radius: 15px;
            // background: url('../assets/plan1.png') no-repeat;
            background-size: cover;
            overflow: hidden;
            &:hover .bg {
              opacity: 0.2;
              -webkit-transition: opacity .5s;
              transition: opacity .5s;
            }}
            h2 {
              position: absolute;
              bottom: 0px;
              width: 100%;
              height: 61px;
              line-height: 61px;
              background-color: rgba(0, 0, 0, .4);
              font-size: 16px;
            }
            .bg {
              position: absolute;
              bottom: 0px;
              width: 100%;
              height: 100%;
              background-color: red;
              opacity: 0;
              -webkit-transition: opacity .5s;
              transition: opacity .5s;
            }
          }
        }
      }
    }
  }
@media screen and (min-width: 768px) and (max-width: 1280px) {
  .n2 {
    .title {
      p {
        font-size: 9.33px;
        margin-bottom: 14px;
      }
      h1 {
        font-size: 28.76px;
      }
    }
    .content {
      margin: 48px 19.140625% 0;
      .left {
        width: 50%;// 379px
        // height: 412px;
        padding-bottom: 50%;
        height: 0;
        i {
          width: 177px;
          height: 60px;
          top: 24px;
          left: -10px;
        }
        p {
          width: 273px;
          font-size: 10.67px;
          line-height: 26.40005px;
        }
      }
      .right {
        width: 50%;//407px
        ul {
          li {
            width: 50%;
            // height: 198px;
            padding-bottom: 50%;
            height: 0;
            margin-bottom: 15px;
            padding-left: 10px;
            .img {
              h2 {
                bottom: 0px;
                width: 100%;
                height: 41px;
                line-height: 41px;
                font-size: 10.67px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
