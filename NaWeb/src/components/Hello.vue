<template>
  <div>
    <!-- <div id="dowebok" style="display: none">
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
    </div> -->
    <div id="dowebok">
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
    </div>
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
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
    $('#dowebok').fullpage (
      {
        scrollingSpeed: 500,
        anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7'],
        menu: '#menu'
      }
    )
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
