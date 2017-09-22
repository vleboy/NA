<template>
  <div>
    <indexHeader></indexHeader>
    <Hello></Hello>
    <Top></Top>
  </div>
</template>

<script>
import indexHeader from '../../components/indexHeader.vue'
import Top from '../../components/top.vue'
import Hello from '../../components/Hello'
export default {
  components: {
    indexHeader, Top, Hello
  }
}
</script>

<style>
@import "../../css/normalize.css";
body, div, span, header, footer, nav, section, aside, article, ul, dl, dt, dd, li, a, p, h1, h2, h3, h4,h5, h6, i, b, textarea, button, input, select, figure, figcaption {
    padding: 0;
    margin: 0;
    list-style: none;
    font-style: normal;
    text-decoration: none;
    border: none;
    box-sizing: border-box;
    font-family: "Microsoft Yahei",sans-serif;
    -webkit-tap-highlight-color:transparent;
    -webkit-font-smoothing: antialiased;
    &:focus {
        outline: none;
    }
}
body {
  background-color: #000;
}
a:hover {
  text-decoration: none;
}
</style>
