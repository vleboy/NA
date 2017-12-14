<template>
  <footer class="home-footer">
    <div class="container">
      <p> {{ new Date().getFullYear() }} © All Rights Reserved - <span>NEW ASIA COMPANY</span></p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'footer'
}
</script>

<style lang="stylus" scoped>
.home-footer
  background #222222
  color #FFFFFF 
  text-align center
  p
    font-size 14px
    padding 25px 0
    span
      color #FECB16
@media (max-width: 768px)
  .home-footer
    p
      padding 15px 0
</style>


