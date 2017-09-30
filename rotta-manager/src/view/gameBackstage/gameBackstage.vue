<template>
  <div class="gamelist">
    <div class="list-outer">
        <div v-for="item in gameList" class="item-wapper">
          <el-row>
            <el-col :span="5" class="item-left">
              <div>
                <img :src="item.imgurl" class="item-img">
              </div>
              <div class="text-center img-text">{{item.name}}</div>
            </el-col>
            <el-col :span="13" class="item-center" >
              <div style="margin-bottom: 1rem">{{item.name}}简介：</div>
              <div class="center-indent">{{item.desc || '暂无'}}</div>
            </el-col>
            <el-col :span="6" class="item-right">
              <!-- <el-button type="primary">了解详情</el-button> -->
              <el-button type="primary" @click="getSign(item)">进入后台</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="item-wapper text-center" style="margin-bottom: 0" v-if="!gameList.length">暂无数据</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
export default{
  beforeCreate () {
    this.$store.commit('returnLocalStorage')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'gameBackstage'
    })
    this.$store.commit('startLoading')
  },
  created () {
    this.getGameType()
  },
  data () {
    return {
      searchInput: '',
      searchInfo: '',
      gameList: []
    }
  },
  methods: {
    getGameType () {
      this.$store.commit('startLoading')
      invoke({
        url: api.allGames,
        method: api.post,
        data: {
          parent: localStorage.loginRole === 1 ? '' : localStorage.loginId
        }
      })
        .then(res => {
          const [err, ret] = res
          if (err) {
            this.$message({
              message: err.msg,
              type: 'error'
            })
          } else {
            this.gameList = ret.data.payload
          }
          this.$store.commit('closeLoading')
        })
    },
    getSign (item) {
      this.$store.commit('startLoading')
      invoke({
        url: api.getSign,
        method: api.post,
        data: {
          gameType: item.code
        }
      })
        .then(res => {
          const [err, ret] = res
          if (err) {
            this.$message({
              message: err.msg,
              type: 'error'
            })
            this.$store.commit('closeLoading')
          } else {
            this.$store.commit('closeLoading')
            window.open(ret.data.url)
          }
        })
    },
    startSearch () {
      if (!this.searchInfo) {
        this.getGameType()
      } else {
        this.gameList = this.gameList.filter(item => {
          return item.name === this.searchInfo
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .text-center{
    text-align: center;
  }
  .game-search{
    padding: 0 4rem
  }
  .list-outer{
    background-color: #f1f1f1; margin-top: 2rem; padding: 2rem
  }
  .item-wapper{
    background-color: #ffffff; margin-bottom: 2rem;padding: 1rem;position: relative
  }
  .item-left{
    width: 10rem;margin: 0 auto;text-align: center;
  }
  .item-img{
    width: 120px;
    height: 120px;
  }
  .img-text{
    margin-top: 0.5rem;
  }
  .item-center{
    padding: 0 2rem;
  }
  .center-indent{
    text-indent: 2rem;
  }
  .item-right{
    text-align: right;position: relative;top: 6.5rem;
  }
</style>
