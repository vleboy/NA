<template>
  <div class="home-download">
    <div class="download-n1">
      <div class="container">
        <h2>APP & 建站APP下载</h2>
        <div class="download-desc">
          <p>NA提供IOS与安卓两个版本的APP</p>
          <p>立即下载NA游戏平台，让手机成为您的移动线上赌场！</p>
        </div>
        <div class="download-button boxs" v-if="ios">
          <a :href="ios">
            <img src="../../assets/img/iosButton.png" alt="">
            <div class="code-box is-mobile">
              <div class="code">
                <div class="arrow"></div>
              </div>
            </div>
          </a>
          <a :href="android">
            <img src="../../assets/img/androidButton.png" alt="">
            <div class="code-box is-mobile">
              <div class="code">
                <div class="arrow"></div>
              </div>
            </div>
          </a>
          <a href="http://app.risheng3d.com/emulator/emulator.exe">
            <img src="../../assets/img/windowsButton.png" alt="">
          </a>
        </div>
      </div>
    </div>
    <div class="download-n2">
      <div class="container">
        <h2>代理APP下载</h2>
        <div class="download-desc">
          <p>NA提供IOS与安卓两个版本的APP</p>
          <p>立即下载NA游戏平台，让手机成为您的移动线上赌场！</p>
        </div>
        <div class="download-button boxs" v-if="iosN2">
          <a :href="iosN2">
            <img src="../../assets/img/iosButton_n2.png" alt="">
            <div class="code-box is-mobile">
              <div class="code code-n2">
                <div class="arrow"></div>
              </div>
            </div>
          </a>
          <a :href="androidN2">
            <img src="../../assets/img/androidButton_n2.png" alt="">
            <div class="code-box is-mobile">
              <div class="code code-n2">
                <div class="arrow"></div>
              </div>
            </div>
          </a>
          <a href="http://app.risheng3d.com/emulator/emulator.exe">
            <img src="../../assets/img/windowsButton_n2.png" alt="">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'home-download',
    data() {
      return {
        ios: '',
        android: '',
        iosN2: '',
        androidN2: '',
        isFetching: false
      }
    },
    mounted() {
      this.ipQuery()
    },
    methods: {
      async ipQuery() {
        this.isFetching = true
        try {
          const {data} = await axios.get('http://ext.na77.org/webapi/ipquery')
          let item = data.payload.data
          if (item.country === '中国') {
            this.ios = `itms-services://?action=download-manifest&url=https://assetdownload.oss-cn-hangzhou.aliyuncs.com/ios/autoinstall${item.n1version}.plist`
            this.android = `http://app.risheng3d.com/apk/NAGame${item.n1version}.apk`
            this.iosN2 = `itms-services://?action=download-manifest&amp;url=https://assetdownload.oss-cn-hangzhou.aliyuncs.com/n2ios/n2install${item.n2version}.plist`
            this.androidN2 = `http://app.risheng3d.com/n2apk/n2apk${item.n2version}.apk`
          } else {
            this.ios = `itms-services://?action=download-manifest&url=https://oss.na12345.com/autoinstall${item.n1version}.plist`
            this.android = `http://oss.na12345.com/NAGame${item.n1version}.apk`
            this.iosN2 = `itms-services://?action=download-manifest&url=https://oss.na12345.com/n2/n2install${item.n2version}.plist`
            this.androidN2 = `http://oss.na12345.com/n2/n2apk${item.n2version}.apk`
          }
          this.isFetching = false
        } catch (err) {
          this.isFetching = false
          console.log(err)
        }
      }
    }
  }
</script>

<style lang="stylus" scoped type="text/stylus">
  .home-download
    color #FFFFFF
    text-align center
    background url('../../assets/img/download_bg.jpg') no-repeat
    background-size cover

    .download-n1
      padding 60px 0

    .download-n2
      padding 60px 0

    h2
      font-size 40px
      margin-bottom 26px
    .download-desc
      width 50%
      margin 0 auto 100px
      font-size 1rem
    .download-button
      display flex
      justify-content space-around
      a
        margin-left 60px
        position relative
        .code-box
          // display none
          opacity 0
          position absolute
          bottom 95px
          width 230px
          height 230px
          border-radius 5px
          background #ffffff
          padding 5px 5px
          transition opacity 1s
          .code
            width 100%
            height 100%
            background url('../../assets/img/code.jpg') no-repeat
            background-size cover
            .arrow
              position absolute
              bottom -12px
              left 50%
              width 16px
              height 14px
              background url('../../assets/img/arrow.png') no-repeat

          .code-n2
            background url('../../assets/img/N2_code.png') no-repeat
            background-size cover
        &:hover .code-box
          // display block
          opacity 1
    .is-mobile
      display block

  @media (min-width: 768px) and (max-width: 1200px)
    .home-download
      /*padding 95px 0*/
      h2
        font-size 34px
      .download-desc
        font-size 14px
        margin 0 auto 60px
      .download-button
        a
          img
            width 85%
          .code-box
            width 170px
            height 170px
            bottom 85px
            left 20px
      .is-mobile
        display block

  @media (max-width: 768px)
    .home-download
      /*padding 1.4rem 0*/
      overflow hidden
      h2
        font-size 20px
      .download-desc
        width 100%
        font-size 14px
        margin-bottom 40px
      .download-button
        justify-content space-between
        a
          /*pointer-events none*/
          margin 0
          img
            width 80%
        a:last-child
          display none
      .is-mobile
        display none
</style>

