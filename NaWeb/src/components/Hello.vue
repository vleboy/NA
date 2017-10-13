<template>
  <div>
    <div id="dowebok">
      <div class="section">
        <Slider v-show="show" ></Slider>
        <Slider2 v-show="!show"></Slider2>
      </div>
      <div class="section">
        <About v-show="show"></About>
        <About2 v-show="!show"></About2>
      </div>
      <div class="section">
        <Download v-show="show"></Download>
        <Download2 v-show="!show"></Download2>
      </div>
      <div class="section">
        <Plan></Plan>
      </div>
      <div class="section">
        <Product v-show="show"></Product>
        <Product2 v-show="!show"></Product2>
      </div>
      <div class="section">
        <N2 v-show="show"></N2>
        <N22 v-show="!show"></N22>
      </div>
      <div class="section">
        <Contact></Contact>
      </div>
    </div>
    <!-- <div id="doweboks" v-if="!isShow">
      <div class="section">
        <Slider2></Slider2>
      </div>
      <div class="section">
        <About2></About2>
      </div>
      <div class="section">
        <Download2></Download2>
      </div>
      <div class="section">
        <Plan></Plan>
      </div>
      <div class="section">
        <Product2></Product2>
      </div>
      <div class="section">
        <N22></N22>
      </div>
      <div class="section">
        <Contact></Contact>
      </div>
    </div>  -->
  <!-- <pc v-if="isShow" />
  <mobile v-else /> -->
  </div>
</template>

<script>
import Slider from './slider'
import Slider2 from './slider2'
import About from './about'
import About2 from './About2'
import Download from './download'
import Download2 from './download2'
import Plan from './plan'
import Product from './product'
import Product2 from './product2'
import N2 from './n2'
import N22 from './n22'
import Contact from './contact'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      show: true
    }
  },
  mounted() {
    $('#dowebok').fullpage ({
      scrollingSpeed: 500,
      anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7'],
      menu: '#menu'
    })
    if(new RegExp(/(nokia|iphone|android|ipad|motorola|^mot\-|softbank|foma|docomo|kddi|up\.browser|up\.link|htc|dopod|blazer|netfront|helio|hosin|huawei|novarra|CoolPad|webos|techfaith|palmsource|blackberry|alcatel|amoi|ktouch|nexian|samsung|^sam\-|s[cg]h|^lge|ericsson|philips|sagem|wellcom|bunjalloo|maui|symbian|smartphone|midp|wap|phone|windows ce|iemobile|^spice|^bird|^zte\-|longcos|pantech|gionee|^sie\-|portalmmm|jig\s browser|hiptop|^ucweb|^benq|haier|^lct|opera\s*mobi|opera\*mini|320x320|240x320|176x220)/i).test(navigator.userAgent)){
      this.show = false
    } else {
    this.show = true
    }
  },
  components: {
    Slider, About, Plan, Product, N2, Contact, Download, Slider2, About2, Download2, Product2, N22
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
@import "../css/jquery.fullPage.css";
</style>
