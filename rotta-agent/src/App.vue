<template>
  <div id="app">
    <div style="width:100%;height:100%">
      <!-- 顶部条 -->
      <div class="top Noprint" v-if="islogin" style='z-index:1001'>
        <div class="top-header">
          <bread class="Noprint"></bread>
          <loginbar class="Noprint"></loginbar>
        </div>
        <div class="tab"><Tab class="Noprint"></Tab></div>
      </div>
      <!-- 左侧导航条 -->
      <div class="main-left" v-if="islogin">
          <div class="left-content">
            <sidebar class="Noprint"></sidebar>
          </div>
      </div>
      <!-- 主内容区路由 -->
      <div class="main-right" id="routerBox">
        <div class="right-content" v-loading="loading" element-loading-text="正在为您加载" style='z-index:1000'>
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from '@/components/sidebar' // 导航条组件
import Bread from '@/components/bread' // 面包屑组件
import Tab from '@/components/tabs' // 面包屑组件
import Loginbar from '@/components/loginbar' // 顶部条组件
export default {
  components: {
    Loginbar,
    Bread,
    Sidebar,
    Tab
  },
  beforeCreate () {
    this.$store.commit('changeIslogin')
  },
  computed: {
    islogin () {
      return this.$store.state.variable.islogin
    },
    loading () {
      return this.$store.state.variable.isloading
    }
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
  }
}
</script>

<style>
/* reset */
html,body,h1,h2,h3,h4,h5,h6,div,dl,dt,dd,ul,ol,li,p,blockquote,pre,hr,figure,table,caption,th,td,form,fieldset,legend,input,button,textarea,menu{margin:0;padding:0;}
/* body,textarea,input,button,select,keygen,legend{font:12px/1.14 微软雅黑,\5b8b\4f53;outline:0;} */
body{background:#fff;}
html,body{width: 100%;height: 100%;font-size: 14px;font-family: '微软雅黑'}
/* 主体布局 */
#app{width: 100%;height: 100%;position: relative}
/* #20a0ff */
/**/
.top{width: calc(100% - 256px);position:fixed;top:0;left:256px;right:0;background-color:#fff;}
/*::-webkit-scrollbar {*/
/*width: 0px;*/
/*height: 1px;*/
/*}*/
.top-header{
  display: flex;
  justify-content: space-between;
}
/**/

.main-left{
  width: 256px;
  max-width: 256px;
  min-width: 256px;
  position:absolute;
  top:0;
  left:0;
  bottom:0;
  background-color: #324157;
}
.left-content{
  height:100%;
  overflow:auto
}

.main-right{
  width: 100%;
  height:100%;
  padding:99px 0 0 256px;
  box-sizing:border-box;
  overflow-x: hidden;
}

.right-content{
  width: 100%;
  height: auto;
  min-height: 100%;
}


.logoBox{width: 10%;float: left;height: 3rem;line-height: 3rem;text-align: center;background-color: #324157;color: #fff}

.fade-enter-active, .fade-leave-active {
  transition: all .5s ease-out;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  width: 0;
}
@media print {
  .Noprint { display: none }
}
.tab {
  width: 100%;
}
</style>
