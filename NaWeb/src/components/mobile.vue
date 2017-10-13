<template>
    <div id="doweboks">
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
</template>

<script>
import Slider2 from './slider2'
import About2 from './About2'
import Download2 from './download2'
import Plan from './plan'
import Product2 from './product2'
import N22 from './n22'
import Contact from './contact'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  },
  mounted() {
    $('#doweboks').fullpage (
      {
        scrollingSpeed: 500,
        anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7'],
        menu: '#menu'
    })
  },
  components: {
    Plan, Contact, Slider2, About2, Download2, Product2, N22
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
@import "../css/jquery.fullPage.css";
</style>
