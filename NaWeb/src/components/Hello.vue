<template>
  <div id="dowebok">
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

</template>

<script>
// $(function () {
//   $('#dowebok').fullpage ({})
// })
import Slider from './slider'
import About from './about'
import Download from './download'
import Plan from './plan'
import Product from './product'
import N2 from './n2'
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
    Slider, About, Plan, Product, N2, Contact, Download
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
@import "../css/jquery.fullPage.css";
</style>
