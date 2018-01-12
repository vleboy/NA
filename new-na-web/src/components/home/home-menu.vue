<template>
  <div class="page">
    <div class="home-menu">
      <router-link to="/">
        <h1>
          <img src="../../assets/img/logo.png" alt="">
          <p>新亚洲集团</p>
        </h1>
      </router-link>
      <nav>
        <ul>
          <li :class="{active: $route.path === '/'}"><router-link to="/">{{$router.path}}首页</router-link></li>
          <li :class="{active: $route.path === '/Ascendant'}"><router-link to="/Ascendant">合作共赢</router-link></li>
          <li :class="{active: $route.path === '/Pro'}"><router-link to="/Pro">NA旗舰版</router-link></li>
          <li :class="{active: $route.path === '/Game'}"><router-link to="/Game">NA游戏</router-link></li>
          <li :class="{active: $route.path === '/Contact'}"><router-link to="/Contact">联系我们</router-link></li>
          <li :class="{active: $route.path === '/Download'}"><router-link to="/Download">游戏下载</router-link></li>
        </ul>
      </nav>
    </div>

    <div class="mobile-menu" :class="{bgColor: showMenu}">
      <div class="mobile-menu-left">
        <div class="mobile-menu-icon">
          <div class="navbar-burger" @click="showView" :class="{'is-active': showMenu}">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <h1><router-link to="/"><img src="../../assets/img/logo.png" alt=""></router-link></h1>
      </div>

      <transition name="mobileShow">
        <ul class="mobile" v-show="showMenu">
          <li :class="{active: $route.path === '/Ascendant'}"><router-link to="/Ascendant">合作共赢</router-link></li>
          <li :class="{active: $route.path === '/Pro'}"><router-link to="/Pro">NA旗舰版</router-link></li>          
          <li :class="{active: $route.path === '/Game'}"><router-link to="/Game">NA游戏</router-link></li>              
          <li :class="{active: $route.path === '/Contact'}"><router-link to="/Contact">联系我们</router-link></li>
          <li :class="{active: $route.path === '/Download'}"><router-link to="/Download">游戏下载</router-link></li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'home-menu',
  data () {
    return {
      showMenu: false
    }
  },
  methods: {
    showView () {
      if (this.showMenu) {
        $('html, body').off('touchmove')
        $('.mobile-menu').css('height', 'auto')
        this.showMenu = !this.showMenu
      } else {
        $('html, body').on('touchmove', function (e) {
          e.preventDefault()
        }, false)
        $('.mobile-menu').css('height', '100vh')
        this.showMenu = !this.showMenu
      }
    }
  },
  watch: {
    '$route': function () {
      this.showView()
    }
  }
}
</script>

<style lang="stylus" scoped>
.mobile-menu
  display  none
.home-menu
  position absolute
  top 0
  left 0
  width 300px
  height 100%
  color #ffffff
  background #00000073
  text-align center
  z-index 99 
  h1
    max-width 157px 
    margin 0 auto
    padding 50px 0 10px
    p
      font-size 30px
  nav
    ul
      li 
        height 50px
        border-bottom 1px solid #444444
        border-right 3px solid transparent
        display flex
        flex-direction column
        align-items center
        justify-content center
        cursor pointer
        &:hover 
          color #FFCB16
          background rgba(0, 0, 0, 0.3)
          border-right 3px solid #FFCB16
          border-bottom 1px solid transparent
      .active
        background #000000
        border-right 3px solid #FFCB16
        border-bottom 1px solid transparent
        a
          color #FFCB16
@media (min-width: 768px) and (max-width: 1200px)
  .home-menu
    width 170px
    h1
      max-width 90px
      padding 30px 0 10px
      p
        font-size 18px
    nav
      ul
        li
          height 30px
          font-size 12px
@media (max-width: 768px)
  .home-menu
    display none

  .mobile-menu
    display block
    position fixed
    top 0
    z-index 999
    width 100%
  .bgColor
    background-color #000000

  .mobile-menu-left
    display flex
    align-items center
    background-color rgba(0,0,0,0.8)
    h1
      position absolute
      left 50%
      width 35px
      height 20px
      margin-left -17.5px

  .navbar-burger
    color #ffffff

  .mobile
    height 100vh
    display flex
    flex-direction column
    align-items center
    text-align center
    color #ffffff
    padding-top 40px
    background-color #000000
    li
      width 200px
      border-bottom 1px solid #303030
      padding 15px 0
    .active
      a
        color #FFCB16 !important
  .mobileShow-enter-active, .mobileShow-leave-active
    transition opacity .5s
  .mobileShow-enter, .mobileShow-leave-to
    opacity 0
</style>