<template>
  <div class="home-download">
    <div class="container">
      <h2>APP & 模拟器下载</h2>
      <div class="download-desc">
        <p>NA提供IOS与安卓两个版本的APP</p>
        <p>立即下载NA游戏平台，让手机成为您的移动线上赌场！</p>
      </div>
      <div class="download-button boxs">
        <a :href="ios">
          <img src="../../assets/img/iosButton.png" alt="">
          <div class="code-box">
            <div class="code">
              <div class="arrow"></div>
            </div>
          </div>
        </a>
        <a :href="android">
          <img src="../../assets/img/androidButton.png" alt="">
          <div class="code-box">
            <div class="code">
              <div class="arrow"></div>
            </div>
          </div>
        </a>
        <a href="http://dl.haima.me/download/DXDown/win/Z001/Droid4XInstaller.exe">
          <img src="../../assets/img/windowsButton.png" alt="">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'home-download',
  data () {
    return {
      ios: '',
      android: ''
    }
  },
  mounted () {
    this.ipQuery()
  },
  methods: {
    async ipQuery () {
      try {
        const { data } = await axios.get('https://3y68duvxk7.execute-api.ap-southeast-1.amazonaws.com/dev/ipquery')
        if (data.payload.data.country === '中国') {
          this.ios = 'itms-services://?action=download-manifest&url=https://a1.na12345.com/NAGame/Update/IOS/autoIntall.plist'
          this.android = 'http://a1.na12345.com/NAGame/Update/Android/NAGame.apk'
        } else {
          this.ios = 'itms-services://?action=download-manifest&url=https://oss.na12345.com/autoinstall1800.plist'
          this.android = 'http://oss.na12345.com/NAGame1800.apk'
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.home-download
  background url('../../assets/img/downloadBg.jpg') no-repeat
  background-size cover
  color #FFFFFF
  text-align center
  padding 100px 0
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
      &:hover .code-box
        // display block
        opacity 1
@media (min-width: 768px) and (max-width: 1200px)
  .home-download
    padding 95px 0
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
@media (max-width: 768px)
  .home-download
    padding 1.4rem 0
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
        pointer-events none
        margin 0
        img 
          width 80%
      a:last-child
        display none
</style>

