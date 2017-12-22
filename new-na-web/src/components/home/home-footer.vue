<template>
  <footer class="home-footer">
    <div class="footer-header">
       <div class="container columns">
         <div class="footer-header-items column is-4">
           <div class="footer-header-title">Location</div>
           <p>San Miguel Avenue corner Shaw Boulevard, Ortigas Center, Ortigas Center, Pasig City, Metro Manila,菲律宾</p>
         </div>

        <div class="footer-header-items column is-4">
           <div class="footer-header-title">Share with Love</div>
           <ul>
             <li><img src="../../assets/img/Shape11.png" alt=""></li>
             <li><img src="../../assets/img/Shape3.png" alt=""></li>
             <li><img src="../../assets/img/Shape6.png" alt=""></li>
           </ul>
         </div>

         <div class="footer-header-items footer-hearer-icon column is-4">
          <img src="../../assets/img/footericon.png" alt="">
         </div>
       </div>
    </div>

    <div class="footer-bottom">
      <div class="container">
        <p> {{ new Date().getFullYear() }} © All Rights Reserved - <span>NEW ASIA COMPANY</span></p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'home-footer'
}
</script>

<style lang="stylus" scoped>
.home-footer
  color #FFFFFF 
  text-align center

.footer-header
  font-size 14px
  background-color #2B2E4A
  padding 70px 0 100px

.footer-header-items
  > ul
      display flex
      justify-content center
      li
        margin-left 5px

.footer-header-title
  margin-bottom 20px

.footer-hearer-icon
  display flex
  align-items center
  justify-content center

.footer-bottom
  background-color #22243B
  p
    padding 30px 0
    span
      color #FECB16
@media (max-width: 768px)
  .home-footer
    p
      padding 15px 0
  .footer-header
    padding 35px 0 50px
</style>


