<template>
  <div class="p-detail">
    <div class="-p-logo">
      <div class="-p-mobile" v-if="isShowDetail && nowId != 3" @click="isShowDetail = false">
        <img class="-arrow" src="/static/arrow.png">
      </div>
      <router-link to="/"><img class="-img-logo" src="/static/logo.png" alt=""></router-link>
    </div>

    <div class="-p-jump" v-if="!isShowDetail">
      <div @click="jumpDetail(item.id)" v-for="item of jumpList">{{item.name}}</div>
    </div>

    <div class="-p-child" v-else>
      <div class="-p-header">
        <img :src="navTypeDetail.titleImg">
      </div>
      <div class="-p-content">
        <div class="-p-nav">
          <ul class="-n-ul">
            <li class="-n-li" :class="{'-active': data.isActive}"  @click="switchType(data)" v-for="data of detailList">
              {{data.name}}
            </li>
          </ul>
        </div>
        <div class="-p-img">
          <img :src="navTypeDetail.content">
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="stylus" scoped>
</style>

<script>
export default {
  name: 'business-detail',
  head: {
    title: '业务详情'
  },
  data () {
    return {
      isShowDetail: false,
      navTypeDetail: '',
      detailList: [],
      titleImg: '' // 顶部名称
    }
  },
  computed: {
    nowId () {
      return this.$route.query.id
    },
    jumpList () {
      let jumpType
      switch (+this.nowId) {
        case 1:
          jumpType = [
            {
              name: '信誉代理',
              id: 1
            },
            {
              name: '综合平台代理',
              id: 2
            }
          ]
          break
        case 2:
          jumpType = [
            {
              name: 'API标准版',
              id: 1
            },
            {
              name: 'API旗舰版',
              id: 2
            }
          ]
          break
        case 3:
          if (this.isPC()) {
            this.detailList =  [
              {
                id: 1,
                name: '建站业务介绍',
                content: require('@/assets/img/detail/jz-js.png'),
                titleImg: require('@/assets/img/detail/jz-01.png'),
                isActive: false
              },
              {
                id: 2,
                name: '商务合作',
                content: require('@/assets/img/detail/jz-sw.jpg'),
                titleImg: require('@/assets/img/detail/jz-01.png'),
                isActive: false
              },
              {
                id: 3,
                name: '对接说明',
                content:  require('@/assets/img/detail/jz-dj.jpg'),
                titleImg:  require('@/assets/img/detail/dj-01.png'),
                isActive: false
              }
            ]
          } else {
            this.detailList =  [
              {
                id: 1,
                name: '建站业务介绍',
                content: require('@/assets/img/detail/mobile/jz-js.jpg'),
                titleImg: require('@/assets/img/detail/jz-01.png'),
                isActive: false
              },
              {
                id: 2,
                name: '商务合作',
                content: require('@/assets/img/detail/mobile/jz-sw.jpg'),
                titleImg: require('@/assets/img/detail/jz-01.png'),
                isActive: false
              },
              {
                id: 3,
                name: '对接说明',
                content:  require('@/assets/img/detail/mobile/jz-dj.jpg'),
                titleImg:  require('@/assets/img/detail/mobile/api-dj-title.png'),
                isActive: false
              }
            ]
          }

          this.switchType(this.detailList[0])

          this.isShowDetail = true

          break
      }

      return jumpType
    }
  },
  methods: {
    jumpDetail (id) {
      if (this.isPC()) {
        switch (+this.nowId) {
          case 1:
            this.detailList =  [
              {
                id: 1,
                name: id == 1 ? '信誉代理介绍' : '综合平台代理',
                content: id == 1 ? require('@/assets/img/detail/dl-xy-js.jpg') : require('@/assets/img/detail/dl-zh-js.jpg'),
                titleImg: (id == 1 ? require('@/assets/img/detail/dl-xy-01.png') : require('@/assets/img/detail/dl-zh-01.png')),
                isActive: false
              },
              {
                id: 2,
                name: '商务合作',
                content: id == 1 ? require('@/assets/img/detail/dl-xy-sw.jpg') : require('@/assets/img/detail/dl-zh-sw.jpg'),
                titleImg: (id == 1 ? require('@/assets/img/detail/dl-xy-01.png') : require('@/assets/img/detail/dl-zh-01.png')),
                isActive: false
              },
              {
                id: 3,
                name: '对接说明',
                content:  require('@/assets/img/detail/dl-dj.jpg'),
                titleImg:  require('@/assets/img/detail/dj-01.png'),
                isActive: false
              }
            ]

            this.switchType(this.detailList[0])

            break

          case 2:
            this.detailList =  [
              {
                id: 1,
                name: id == 1 ? 'API标准版介绍' : 'API旗舰版介绍',
                content: id == 1 ? require('@/assets/img/detail/bz-js-02.jpg') : require('@/assets/img/detail/qj-js.jpg'),
                titleImg: (id == 1 ? require('@/assets/img/detail/bz-js-01.png') : require('@/assets/img/detail/qj-sw.png')),
                isActive: false
              },
              {
                id: 2,
                name: '商务合作',
                content: id == 1 ? require('@/assets/img/detail/bz-sw.jpg') : require('@/assets/img/detail/qj-sw.jpg'),
                titleImg: (id == 1 ? require('@/assets/img/detail/bz-js-01.png') : require('@/assets/img/detail/qj-sw.png')),
                isActive: false
              },
              {
                id: 3,
                name: '对接说明',
                content:  require('@/assets/img/detail/bz-dj-02.jpg'),
                titleImg:  require('@/assets/img/detail/dj-01.png'),
                isActive: false
              }
            ]

            this.switchType(this.detailList[0])

            break
        }
      } else {
        switch (+this.nowId) {
          case 1:
            this.detailList =  [
              {
                id: 1,
                name: id == 1 ? '信誉代理介绍' : '综合平台代理',
                content: id == 1 ? require('@/assets/img/detail/mobile/dl-xy-js.jpg') : require('@/assets/img/detail/mobile/dl-zh-js.jpg'),
                titleImg: (id == 1 ? require('@/assets/img/detail/dl-xy-01.png') : require('@/assets/img/detail/dl-zh-01.png')),
                isActive: false
              },
              {
                id: 2,
                name: '商务合作',
                content: id == 1 ? require('@/assets/img/detail/mobile/dl-xy-sw.jpg') : require('@/assets/img/detail/mobile/dl-zh-sw.jpg'),
                titleImg: (id == 1 ? require('@/assets/img/detail/dl-xy-01.png') : require('@/assets/img/detail/dl-zh-01.png')),
                isActive: false
              },
              {
                id: 3,
                name: '对接说明',
                content:  require('@/assets/img/detail/mobile/dl-dj.jpg'),
                titleImg:  require('@/assets/img/detail/mobile/api-dj-title.png'),
                isActive: false
              }
            ]

            this.switchType(this.detailList[0])

            break

          case 2:
            this.detailList =  [
              {
                id: 1,
                name: id == 1 ? 'API标准版介绍' : 'API旗舰版介绍',
                content: id == 1 ? require('@/assets/img/detail/mobile/bz-js.jpg') : require('@/assets/img/detail/mobile/qj-js.jpg'),
                titleImg: (id == 1 ? require('@/assets/img/detail/bz-js-01.png') : require('@/assets/img/detail/qj-sw.png')),
                isActive: false
              },
              {
                id: 2,
                name: '商务合作',
                content: id == 1 ? require('@/assets/img/detail/mobile/bz-sw.jpg') : require('@/assets/img/detail/mobile/qj-sw.jpg'),
                titleImg: (id == 1 ? require('@/assets/img/detail/bz-js-01.png') : require('@/assets/img/detail/qj-sw.png')),
                isActive: false
              },
              {
                id: 3,
                name: '对接说明',
                content:  require('@/assets/img/detail/mobile/api-dj.jpg'),
                titleImg:  require('@/assets/img/detail/mobile/api-dj-title.png'),
                isActive: false
              }
            ]

            this.switchType(this.detailList[0])

            break
        }
      }

      this.isShowDetail = !this.isShowDetail
    },
    switchType (item) {
      for (let data of this.detailList) {
        if (item.id == data.id) {
          data.isActive = true
        } else {
          data.isActive = false
        }
      }
      this.navTypeDetail = item
    },
    isPC(){
      var userAgentInfo = navigator.userAgent;
      var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
      var flag = true;
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
      }
      return flag;
    }
  }
}
</script>

<style lang="stylus">
  .p-detail{
    position: absolute;
    background:url("../assets/img/detail/detail-bg.jpg") no-repeat;
    background-size: cover;
    width: 100%;

    .-p-logo{
      position: absolute;
      left: 40px;
      top: 40px;

      .-p-mobile {
        display: none;
      }

      .-img-logo{
        width: 70%;
      }
    }

    .-p-header{
      width: 26%;
      margin: 90px auto 50px;
      text-align: center;

      img{
        width: 100%;
      }
    }

    .-p-content{
      width: 64%;
      margin: 0 auto;

      .-p-nav{

        .-n-ul{
          display: flex;
          justify-content: center;
        }

        .-n-li{
          padding: 10px 40px;
          background-color: #e6e7e7;
          width: calc(100%/3);
          text-align: center;
          border-right: 1px solid #adadad;
          font-weight: bold;
          font-size: 22px;
          cursor: pointer;
        }

        .-n-li:first-of-type{
          border-top-left-radius: 10px;
        }

        .-n-li:last-of-type{
          border-top-right-radius: 10px;
          border: none;
        }

        .-active{
          color: #fff;
          background-color: #1c1c1c;
        }
      }

      .-p-img {
        margin-bottom: 30%;
      }
    }
  }

  @media (max-width: 768px) {
    .p-detail {

      .-n-ul{
        display: inline!important;
      }
      .-p-logo {
        position: static;
        margin-top: 20px;
        width: 100%;
        text-align: center;
        .-p-mobile {
          display: inline-block;
          position: absolute;
          left: 20px;
          width: 40px;
          height: 40px;
        }
        .-img-logo {
          width: 20%;
        }

        .-arrow{
          width: 100%;
        }

      }

      .-p-header {
        width: 70%;
        margin: 16px auto;
        text-align: center;
      }

      .-p-content{
        width: 100%;

        .-p-nav{

          .-n-li{
            width: 100%;
            border-bottom: 1px solid #adadad;
            border-right: none;
          }

          .-n-li:first-of-type{
            border-top-left-radius: inherit;
          }

          .-n-li:last-of-type{
            border-top-right-radius: inherit;
          }

          .-active{
            color: #fff;
            background-color: #1c1c1c;
          }
        }

        .-p-img {
          margin-bottom: 0;

          img{
            vertical-align:middle;
            width: 100%;
          }
        }
      }
    }
  }
</style>


