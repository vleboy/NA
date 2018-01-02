<template>
  <div id="app" v-show="show">
    <div class="content">
      <div class="button">
          <a href="javascript:;" v-if="!ios"><img src="/static/mobile-1.png" alt=""></a>
          <a href="javascript:;" v-else><img src="/static/mobile-2.png" alt=""></a>
          <p v-if="ios">IOS安装教程 (请下滑!)</p>
      </div>
    </div>
    <div class="section" v-if="ios">
      <img src="/static/mobile-guide1.png" alt="">
    </div>
   <div class="section" v-if="ios">
      <img src="/static/mobile-guide2.png" alt="">
   </div>
   <div class="section" v-if="ios">
      <img src="/static/mobile-guide3.jpg" alt="">
  </div>
  <div class="section" v-if="ios">
    <img src="/static/mobile-guide4.jpg" alt="">
  </div>
  <div class="section" v-if="ios">
    <img src="/static/mobile-guide5.jpg" alt="">
  </div>
  <div class="section" v-if="ios">
    <img src="/static/mobile-guide6.png" alt="">
  </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app',
  data () {
    return {
      show: false,
      ios: false
    }
  },
  created () {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    isiOS === true ? this.ios = true : this.ios = false
    console.log(isAndroid,isiOS)
    function is_weixin(){
      let ua = navigator.userAgent.toLowerCase()
      if(ua.match(/MicroMessenger/i)=="micromessenger") {return true} else {return false}
    }
    function is_QQInnerBro(){
      let ua = navigator.userAgent.toLowerCase()
      if (ua.match(/QQ/i) == "qq") {
          return true;
        } else {
            return false;
        }
		}
    if (!is_weixin() && !is_QQInnerBro()) {
      this.show = false
      if(isAndroid){
        axios.get(`${url}/dev/ipquery`)
          .then(function (res) {
            if(res.data.payload.data.country === '中国'){
              window.location.href = `http://app.risheng3d.com/apk/NAGame${res.data.payload.version}.apk`
            } else {
              window.location.href = `http://oss.na12345.com/NAGame${res.data.payload.version}.apk`
            }
          })
          .catch(function (error) {
            console.log(error)
          });
      } else if(isiOS){
         axios.get(`${url}/dev/ipquery`)
         .then(function (res) {
           if(res.data.payload.data.country === '中国'){
             window.location.href = `itms-services://?action=download-manifest&url=https://assetdownload.oss-cn-hangzhou.aliyuncs.com/ios/autoinstall${res.data.payload.version}.plist`
           } else {
             window.location.href = `itms-services://?action=download-manifest&url=https://oss.na12345.com/autoinstall${res.data.payload.version}.plist`
           }
         })
         .catch(function (error) {
           console.log(error)
         })
      }
    }else if (is_weixin() || is_QQInnerBro()) {
      this.show = true
    }
  }
}
</script>

<style>
html, body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  font-size: 0;
}
.content {
  width: 100%;
  height: 100%;
  position: relative;
  background: url('./assets/mobile-bg.png') no-repeat;
  background-size: cover;
}
.button {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 2%;
  width: 80%;
  font-size: 0;
  text-align: center;
}
.button a {
  display: inline-block;
  width: 40%;
  margin: 0 5%;
  text-decoration: none;
  outline:none;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
p {
  font-weight: bold;
  font-size: 22px;
  color: #ffffff;
}
p > i {
  display: inline-block;
  width: 50px;
  height: 50px;
  background: url('./assets/mobile-down.png') no-repeat;
  background-size: cover;
  vertical-align: middle;
}
img {
  width: 100%;
  height: 100%;
}
</style>
