<template>
  <div>
    <!-- <div id="dowebok" v-if="isShow">
      <div class="section">
        <Slider></Slider>
      </div>
      <div class="section">
        <About></About>
      </div>
      <div class="section">
        <Download></Download>
      </div>
      <div class="section">
        <Plan></Plan>
      </div>
      <div class="section">
        <Product></Product>
      </div>
      <div class="section">
        <N2></N2>
      </div>
      <div class="section">
        <Contact></Contact>
      </div>
    </div>
    <div id="doweboks" v-if="!isShow">
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
    </div> -->
  <pc v-if="isShow" />
  <mobile v-else />
  </div>
</template>

<script>
// import Slider from './slider'
// import Slider2 from './slider2'
// import About from './about'
// import About2 from './About2'
// import Download from './download'
// import Download2 from './download2'
// import Plan from './plan'
// import Product from './product'
// import Product2 from './product2'
// import N2 from './n2'
// import N22 from './n22'
// import Contact from './contact'
import pc from './pc'
import mobile from './mobile'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      isShow: true
    }
  },
  mounted() {
    // if(new RegExp(/(nokia|iphone|android|ipad|motorola|^mot\-|softbank|foma|docomo|kddi|up\.browser|up\.link|htc|dopod|blazer|netfront|helio|hosin|huawei|novarra|CoolPad|webos|techfaith|palmsource|blackberry|alcatel|amoi|ktouch|nexian|samsung|^sam\-|s[cg]h|^lge|ericsson|philips|sagem|wellcom|bunjalloo|maui|symbian|smartphone|midp|wap|phone|windows ce|iemobile|^spice|^bird|^zte\-|longcos|pantech|gionee|^sie\-|portalmmm|jig\s browser|hiptop|^ucweb|^benq|haier|^lct|opera\s*mobi|opera\*mini|320x320|240x320|176x220)/i).test(navigator.userAgent)){
    //   console.log("m")
    //   this.isShow = false
    //   $('#myContainer').fullpage (
    //   {
    //     scrollingSpeed: 500,
    //     anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7'],
    //     menu: '#menu'
    //   }
    // )
    // } else {
    //   console.log("p")
    //   this.isShow = true
    //   $('#dowebok').fullpage (
    //   {
    //     scrollingSpeed: 500,
    //     anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7'],
    //     menu: '#menu'
    //   }
    // )
    // }
    var $ww = $(window).width();
    if($ww < 768){
      this.isShow = false
    } else {
    this.isShow = true
    }
  },
  components: {
    mobile, pc
    // Slider, About, Plan, Product, N2, Contact, Download, Slider2, About2, Download2, Product2, N22
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
@import "../css/jquery.fullPage.css";
</style>
