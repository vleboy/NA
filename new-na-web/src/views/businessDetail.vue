<template>
  <div class="p-detail" :class="{'detail-height':!isShowDetail}">
    <div class="-p-logo">
      <div class="-p-mobile" v-if="isShowDetail && nowId != 3" @click="isShowDetail = false">
        <img class="-arrow" src="/static/arrow.png">
      </div>
      <div class="-p-mobile" v-else @click="toHome">
        <img class="-arrow" src="/static/arrow.png">
      </div>
      <div v-if="!isShowDetail || nowId == 3" @click="toHome">
        <img class="-img-logo" src="/static/logo.png" alt="">
        <img class="-img-logo -back-logo -p-pc" src="/static/back.png" alt="">
      </div>
      <img v-if="isShowDetail && nowId != 3" class="-img-logo " src="/static/logo.png" @click="isShowDetail = false">
      <img v-if="isShowDetail && nowId != 3" class="-img-logo -back-logo -p-pc" src="/static/back.png" @click="isShowDetail = false">
    </div>

    <div class="-p-jump" v-if="!isShowDetail" :class="backgroundObj">
      <div class="-jump-title" :class="{'-jump-title-all':nowId==4}"><img :src="jumpTitle" alt=""></div>
      <div class="-jump-btn">
        <div class="-btn-item" @click="jumpDetail(item)" v-for="item of jumpList" v-if="nowId!=4">
          <img :src="item.url" alt="">
        </div>
        <div class="-btn-item" :class="{'all-item':nowId==4}" v-for="(item,index) of jumpList" :key="index"
             v-if="nowId==4">
          <div class="-btn-item-two" v-for="(data,indexTwo) of item" :key="indexTwo" @click="jumpDetail(data,index)">
            <img :src="data.url" alt="" :class="{'-first-text':indexTwo==0,'last-text':(index==2 && indexTwo==2)}">
          </div>
        </div>
      </div>
    </div>

    <div class="-p-child" v-else>
      <div class="-p-header">
        <img :src="navTypeDetail.titleImg">
      </div>
      <div class="-p-content">
        <div class="-p-nav">
          <ul class="-n-ul">
            <li class="-n-li" :class="{'-active': data.isActive}" @click="switchType(data)" v-for="data of detailList">
              {{data.name}}
            </li>
          </ul>
        </div>
        <div class="-p-img">
          <img :src="navTypeDetail.content" alt="加载中...">
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="stylus" scoped>
</style>

<script>
  import $ from 'jquery'

  export default {
    name: 'business-detail',
    head: {
      title: '业务详情'
    },
    data() {
      return {
        isShowDetail: false,
        navTypeDetail: '',
        detailList: [],
        titleImg: '' // 顶部名称
      }
    },
    computed: {
      nowId() {
        return this.$route.query.id
      },
      jumpList() {
        let jumpType
        switch (+this.nowId) {
          case 1:
            jumpType = [
              {
                url: require('@/assets/img/detail/tz/dl-xy-btn.jpg'),
                id: 1
              },
              {
                url: require('@/assets/img/detail/tz/dl-zh-btn.jpg'),
                id: 2
              }
            ]
            break
          case 2:
            jumpType = [
              {
                url: require('@/assets/img/detail/tz/bz-btn.jpg'),
                id: 1
              },
              {
                url: require('@/assets/img/detail/tz/qj-btn.jpg'),
                id: 2
              }
            ]
            break
          case 3:
            if (this.isPC()) {
              this.detailList = [
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
                  content: require('@/assets/img/detail/jz-dj.jpg'),
                  titleImg: require('@/assets/img/detail/dj-01.png'),
                  isActive: false
                }
              ]
            } else {
              this.detailList = [
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
                  content: require('@/assets/img/detail/mobile/jz-dj.jpg'),
                  titleImg: require('@/assets/img/detail/mobile/api-dj-title.png'),
                  isActive: false
                }
              ]
            }

            this.switchType(this.detailList[0])

            this.isShowDetail = true

            break
          case 4:
            jumpType = [
              [
                {
                  url: require('@/assets/img/detail/tz/all-dl.png'),
                  id: 0,
                  isTitle: true
                },
                {
                  url: require('@/assets/img/detail/tz/dl-xy-btn.jpg'),
                  id: 1
                },
                {
                  url: require('@/assets/img/detail/tz/dl-zh-btn.jpg'),
                  id: 2
                }
              ],
              [
                {
                  url: require('@/assets/img/detail/tz/all-api.png'),
                  id: 0,
                  isTitle: true
                },
                {
                  url: require('@/assets/img/detail/tz/bz-btn.jpg'),
                  id: 1
                },
                {
                  url: require('@/assets/img/detail/tz/qj-btn.jpg'),
                  id: 2
                }
              ],
              [
                {
                  url: require('@/assets/img/detail/tz/all-jz.png'),
                  id: 0,
                  isTitle: true
                },
                {
                  url: require('@/assets/img/btn-nav/btn-nav-3.jpg'),
                  id: 1
                },
                {
                  url: require('@/assets/img/detail/tz/jz-null.png'),
                  id: 2,
                  isTitle: true
                }
              ]
            ]
        }
        return jumpType
      },
      backgroundObj() {
        return {
          '-jump-api-bg': this.nowId == 2,
          '-jump-dl-bg': this.nowId == 1,
          '-jump-all-bg': this.nowId == 4
        }
      },
      jumpTitle() {
        switch (+this.nowId) {
          case 1:
            return require('@/assets/img/detail/tz/dl-title.png')
            break
          case 2:
            return require('@/assets/img/detail/tz/api-title.png')
            break
          case 4:
            return require('@/assets/img/detail/tz/all-title.png')
            break
        }
      }
    },
    methods: {
      jumpDetail(data, index) {
        let id = data.id
        if (data.isTitle) return
        if (this.isPC()) {
          switch (+this.nowId) {
            case 1:
              this.detailList = [
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
                  name: '开户热线',
                  content: require('@/assets/img/detail/dl-dj.jpg'),
                  titleImg: require('@/assets/img/detail/dj-01.png'),
                  isActive: false
                }
              ]

              this.switchType(this.detailList[0])

              break
            case 2:
              this.detailList = [
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
                  content: require('@/assets/img/detail/bz-dj-02.jpg'),
                  titleImg: require('@/assets/img/detail/dj-01.png'),
                  isActive: false
                }
              ]

              this.switchType(this.detailList[0])

              break
            case 4:
              switch (+index) {
                case 0:
                  this.detailList = [
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
                      name: '开户热线',
                      content: require('@/assets/img/detail/dl-dj.jpg'),
                      titleImg: require('@/assets/img/detail/dj-01.png'),
                      isActive: false
                    }
                  ]
                  this.switchType(this.detailList[0])
                  break
                case 1:
                  this.detailList = [
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
                      content: require('@/assets/img/detail/bz-dj-02.jpg'),
                      titleImg: require('@/assets/img/detail/dj-01.png'),
                      isActive: false
                    }
                  ]
                  this.switchType(this.detailList[0])
                  break
                case 2:
                  this.detailList = [
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
                      content: require('@/assets/img/detail/jz-dj.jpg'),
                      titleImg: require('@/assets/img/detail/dj-01.png'),
                      isActive: false
                    }
                  ]
                  this.switchType(this.detailList[0])
                  break

              }
          }
        } else {
          switch (+this.nowId) {
            case 1:
              this.detailList = [
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
                  name: '开户热线',
                  content: require('@/assets/img/detail/mobile/dl-dj.jpg'),
                  titleImg: require('@/assets/img/detail/mobile/api-dj-title.png'),
                  isActive: false
                }
              ]

              this.switchType(this.detailList[0])

              break

            case 2:
              this.detailList = [
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
                  content: require('@/assets/img/detail/mobile/api-dj.jpg'),
                  titleImg: require('@/assets/img/detail/mobile/api-dj-title.png'),
                  isActive: false
                }
              ]

              this.switchType(this.detailList[0])

              break
            case 4:
              switch (+index) {
                case 0:
                  this.detailList = [
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
                      name: '开户热线',
                      content: require('@/assets/img/detail/mobile/dl-dj.jpg'),
                      titleImg: require('@/assets/img/detail/mobile/api-dj-title.png'),
                      isActive: false
                    }
                  ]
                  this.switchType(this.detailList[0])
                  break
                case 1:
                  this.detailList = [
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
                      content: require('@/assets/img/detail/mobile/api-dj.jpg'),
                      titleImg: require('@/assets/img/detail/mobile/api-dj-title.png'),
                      isActive: false
                    }
                  ]
                  this.switchType(this.detailList[0])
                  break
                case 2:
                  this.detailList = [
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
                      content: require('@/assets/img/detail/mobile/jz-dj.jpg'),
                      titleImg: require('@/assets/img/detail/mobile/api-dj-title.png'),
                      isActive: false
                    }
                  ]
                  this.switchType(this.detailList[0])
                  break

              }
          }
        }

        this.isShowDetail = !this.isShowDetail
      },
      switchType(item) {
        this.navTypeDetail = item
        for (let data of this.detailList) {
          if (item.id == data.id) {
            data.isActive = true
          } else {
            data.isActive = false
          }
        }
      },
      isPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
          if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
          }
        }
        return flag;
      },
      toHome() {
        this.$router.push({'path': '/', query: {'id': 1}})
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  .detail-height {
    height: 100%;
  }
  .p-detail {
    position: absolute;
    background: url("../assets/img/detail/detail-bg.jpg") no-repeat;
    background-size: cover;
    width: 100%;

    .-p-jump {
      position: absolute;
      width: 100%;
      height: 100%;

      .-jump-title {
        text-align: center;
        margin-top: 250px;
      }

      .-jump-btn {
        text-align: center;
      }

      .-btn-item {
        display: inline-block;
        width: 25%;
        padding: 50px 10px;
        cursor: pointer;

        img {
          width: 100%;
        }
      }

      .all-item {
        cursor: inherit
        width 20%
      }

      .-btn-item-two {

        .-first-text {
          padding 20px 0
        }

        img {
          cursor pointer
        }

        .last-text {
          cursor inherit
        }
      }

      .-btn-item-two:first-of-type {
        img {
          cursor inherit
        }
      }
    }

    .-jump-api-bg {
      background: url("../assets/img/detail/tz/tiaozhuan-01.jpg") no-repeat;
      background-size: cover;
    }

    .-jump-dl-bg {
      background: url("../assets/img/detail/tz/dl-tz-bg.jpg") no-repeat;
      background-size: cover;
    }
    .-jump-all-bg {
      background: url("../assets/img/detail/tz/all-tz-bg.jpg") no-repeat;
      background-size: cover;
    }

    .-p-logo {
      position: absolute;
      width 100%
      z-index: 99999;


      .-p-mobile {
        display: none;
      }

      .-img-logo {
        margin 40px
        width: 8%;
        cursor pointer
      }

      .-back-logo{
        cursor pointer
        width:6%;
        float right
      }
    }

    .-p-header {
      width: 26%;
      margin: 90px auto 50px;
      text-align: center;

      img {
        width: 100%;
      }
    }

    .-p-content {
      width: 64%;
      margin: 0 auto;

      .-p-nav {

        .-n-ul {
          display: flex;
          justify-content: center;
        }

        .-n-li {
          padding: 10px 40px;
          background-color: #e6e7e7;
          width: calc(100% / 3);
          text-align: center;
          border-right: 1px solid #adadad;
          font-weight: bold;
          font-size: 22px;
          cursor: pointer;
        }

        .-n-li:first-of-type {
          border-top-left-radius: 10px;
        }

        .-n-li:last-of-type {
          border-top-right-radius: 10px;
          border: none;
        }

        .-active {
          color: #fff;
          background-color: #1c1c1c;
        }
      }

      .-p-img {
        margin-bottom: 30%;
      }
    }
  }
  @media (max-width: 1366px){
    .p-detail{
      .-p-jump{
        .-jump-title{
          margin-top 180px
        }
      }
    }
  }
  @media (max-width: 768px) {
    .p-detail {
      background: #547eeb;
      .-p-jump {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;

        .-btn-item-two {

          .-first-text {
            padding 10px 0
          }
        }

        .-jump-title {
          margin-top: 200px;

          img {
            width: 70%;
          }
        }

        .-jump-title-all {
          margin-top: 150px;
          img {
            width: 60%;
          }
        }

        .-jump-btn {
          text-align: center;
        }

        .-btn-item {
          padding: 0;
          padding-top: 10px;
          width: 70%;

          img {
            width: 80%;
          }
        }
        .all-item{
          padding-top 0
          width 45%
        }
      }
      .-n-ul {
        display: inline !important;
      }
      .-p-logo {
        position: relative;
        left: 0;
        top: 35px;
        width: 100%;
        text-align: center;
        .-p-pc {
          display none
        }
        .-p-mobile {
          display: inline-block;
          position: absolute;
          left: 20px;
          width: 40px;
          height: 40px;
        }
        .-img-logo {
          margin 0
          width: 20%;
        }

        .-arrow {
          width: 100%;
        }

      }

      .-p-header {
        width: 70%;
        margin: 50px auto 15px;
        text-align: center;
      }

      .-p-content {
        width: 100%;

        .-p-nav {

          .-n-li {
            width: 100%;
            border-bottom: 1px solid #adadad;
            border-right: none;
          }

          .-n-li:first-of-type {
            border-top-left-radius: inherit;
          }

          .-n-li:last-of-type {
            border-top-right-radius: inherit;
          }

          .-active {
            color: #fff;
            background-color: #1c1c1c;
          }
        }

        .-p-img {
          margin-bottom: 0;

          img {
            vertical-align: middle;
            width: 100%;
          }
        }
      }
    }
  }
</style>


