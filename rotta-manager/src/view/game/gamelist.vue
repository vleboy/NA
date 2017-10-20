<template>
  <div class="gamelist">
    <div class="gametab">
        <div class="tabcard-left">
          <el-button class="" @click="getAlllist">全部游戏</el-button>
          <el-button class="myBtn" v-for="item in gameType" :key="item" @click="getnowlist(item.code)">{{item.name}}</el-button>
        </div>
        <!-- <div class="tabcard-right">
          <el-input placeholder="请输入关键词" class="input"></el-input>
          <el-button class="gamesearch" type="primary">搜索</el-button>
        </div> -->
      </div>
      <p class="backinfocount">共搜索到 {{count}} 条数据</p>
      
      <div class="cardlist">
        <el-row>
          <el-col v-for="(o, index) in allgames" :key="o" class="card" :span="7">
              <div class="card-top">
                <img :src="o.gameImg" alt="游戏缩略图">
                <p class="p1">游戏名称: {{o.gameName}}</p>
                <p class="p2" :title="o.gameRecommend">游戏简介: {{o.gameRecommend}}</p>
                <p class="p3" v-if="o.gameType === '0'">游戏类型：棋牌游戏</p>
                <p class="p3" v-if="o.gameType === '1'">游戏类型：电子游戏</p>
                <p class="p3" v-if="o.gameType === '2'">游戏类型：真人视讯</p>
              </div>
              <div class="card-bottom">
                <span>
                    <span class="statu1" v-if="o.gameStatus === 1">&bull;</span>
                    <span class="statu2" v-if="o.gameStatus === 2">&bull;</span>
                    <span class="statu3" v-if="o.gameStatus === 3">&bull;</span>
                    <span class="statu4" v-if="o.gameStatus === 4">&bull;</span>
                    <span class="subscribe1" v-if="o.gameStatus === 1">在线</span>
                    <span class="subscribe2" v-if="o.gameStatus === 2">离线</span>
                    <span class="subscribe3" v-if="o.gameStatus === 3">维护</span>
                    <span class="subscribe4" v-if="o.gameStatus === 4">故障</span>
                    <span class="time">{{formatTime(o.updatedAt)}}</span>
                </span>
                <!-- <el-dropdown trigger="click" class="moreIcon">
                  <span class="el-dropdown-link"><i class="el-icon-more"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <p @click="onlineGame(o)" v-if="o.gameStatus !== 1"><el-dropdown-item>上线</el-dropdown-item></p>
                        <p @click="offlineGame(o)" v-if="o.gameStatus === 1"><el-dropdown-item>下线</el-dropdown-item></p>
                        <p @click="maintainGame(o)"><el-dropdown-item>维护</el-dropdown-item></p>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown trigger="click" class="editIcon">
                  <span class="el-dropdown-link"><i class="el-icon-edit"></i></span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>编辑</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown> -->
              </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import { detailTime } from '@/behavior/format'
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
export default {
  beforeCreate () {
    this.$store.commit('startLoading')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'gamelist'
    })
    this.$store.commit('returnLocalStorage')
    this.$store.dispatch('getGamelistData')
  },
  computed: {
    gameType () {
      return this.$store.state.variable.gameListData
    },
    count () {
      return this.allgames.length
    }
  },
  mounted () {
    this.getAlllist()
  },
  data () {
    return {
      allgames: []
    }
  },
  methods: {
    // searchGame () {
    //   if (!this.searchGameName) {
    //     this.$message({
    //       message: '请输入关键词',
    //       type: 'error'
    //     })
    //   } else {
    //     this.$store.commit('startLoading')
    //     var data = {
    //       gameType: null,
    //       keyword: this.searchGameName
    //     }
    //     invoke({
    //       url: api.gameList,
    //       method: api.post,
    //       data: data
    //     }).then(
    //       result => {
    //         const [err, ret] = result
    //         if (err) {
    //           this.$message({
    //             message: '未找到该游戏',
    //             type: 'error'
    //           })
    //         } else {
    //           var data = ret.data.payload
    //           console.log('搜索的返回结果:', data)
    //           this.allgames = data
    //           this.$store.commit('closeLoading')
    //         }
    //       }
    //     )
    //   }
    // }, // 搜索游戏
    // resetGamelist () {
    //   this.searchGameName = ''
    //   this.getAlllist()
    // }, // 重置游戏列表
    formatTime (time) {
      return detailTime(time)
    },
    getnowlist (code) {
      this.$store.commit('startLoading')
      var data = {
        gameType: code
      }
      // console.log(code)
      invoke({
        url: api.gameList,
        method: api.post,
        data: data
      }).then(
        result => {
          const [err, ret] = result
          if (err) {
          } else {
            var list = ret.data.payload
            // console.log(list)
            this.allgames = list
            this.$store.commit('closeLoading')
          }
        }
      )
    }, // 获取当前类型游戏
    getAlllist () {
      this.$store.commit('startLoading')
      var type = []
      for (var i = this.$store.state.variable.gameListData.length - 1; i >= 0; i--) {
        type.push(Number(this.$store.state.variable.gameListData[i].code))
      }
      type = type.join(',').toString()
      var data = {
        gameType: type
      }
      invoke({
        url: api.gameList,
        method: api.post,
        data: data
      }).then(
        result => {
          const [err, ret] = result
          if (err) {
          } else {
            var list = ret.data.payload
            // console.log(list)
            this.allgames = list
            this.$store.commit('closeLoading')
          }
        }
      )
    }, // 获取所有游戏
    onlineGame (o) {
      var data = {
        gameType: o.gameType,
        gameId: o.gameId,
        status: '1'
      }
      invoke({
        url: api.changeGame,
        method: api.post,
        data: data
      }).then(
        result => {
          const [err, ret] = result
          if (err) {
            this.$message({
              message: err.msg,
              type: 'error'
            })
          } else {
            var data = ret.data.payload
            // console.log(data)
            this.getnowlist()
            this.getAlllist()
            this.$message({
              message: '操作成功',
              type: 'success'
            })
          }
        }
      )
    }, // 上线游戏
    offlineGame (o) {
      var data = {
        gameType: o.gameType,
        gameId: o.gameId,
        status: '2'
      }
      invoke({
        url: api.changeGame,
        method: api.post,
        data: data
      }).then(
        result => {
          const [err, ret] = result
          if (err) {
            this.$message({
              message: err.msg,
              type: 'error'
            })
          } else {
            var data = ret.data.payload
            // console.log(data)
            this.getnowlist()
            this.getAlllist()
            this.$message({
              message: '操作成功',
              type: 'success'
            })
          }
        }
      )
    }, // 下线游戏
    maintainGame (o) {
      var data = {
        gameType: o.gameType,
        gameId: o.gameId,
        status: '3'
      }
      invoke({
        url: api.changeGame,
        method: api.post,
        data: data
      }).then(
        result => {
          const [err, ret] = result
          if (err) {
            this.$message({
              message: err.msg,
              type: 'error'
            })
          } else {
            var data = ret.data.payload
            // console.log(data)
            this.getnowlist()
            this.getAlllist()
            this.$message({
              message: '操作成功',
              type: 'success'
            })
          }
        }
      )
    } // 维护游戏
  }
}
</script>

<style scpoed>

.gamelist .gametab{background-color: #f5f5f5;padding: 2rem;height: 3rem;margin-top: 1rem}
.gamelist .input{width: 18rem;}
.gamelist .tabcard:after{clear:both;content:'.';display:block;width: 0;height: 0;visibility:hidden;}
.gamelist .tabcard-left{float: left;}
.gamelist .tabcard-right{float: right;}

.gamelist .backinfocount{margin-top: 1rem;margin-left: 2rem}

.gamelist .card{display: inline-block;width: 32%;margin-left: 1rem;margin-top: 1rem;padding: 0;border:1px solid #919191;border-radius: 0.4rem;padding:1rem}
.gamelist .card-top{border-bottom: 1px solid #bfbfbf;}
.gamelist .card-top:after{clear:both;content:'.';display:block;width: 0;height: 0;visibility:hidden;}
.gamelist .card-top img{display: inline-block;width: 30%;height: 8rem;float: left;margin-bottom: 1rem}
.gamelist .card-top p{float: left;width: 50%;margin-left: 1.5rem}
.gamelist .card-top .p1{font-size: 1rem}
.gamelist .card-top .p2{font-size: 0.8rem;margin-top: 0.5rem;color: #919191;max-width: 80%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}

.gamelist .card-bottom{padding-top: 1rem;padding-bottom: 0.5rem}

.gamelist .moreIcon{float: right;}
.gamelist .editIcon{float: right;margin-right: 1rem}
.gamelist i{color: gray;float: right;font-size: 1.2rem;margin-top: 0.75rem}

.statu1{color: #0ECA5B;font-size: 1.5rem;vertical-align: -0.15rem;} /*在线状态*/
.statu2{color: #919191;font-size: 1.5rem;vertical-align: -0.15rem;} /*离线状态*/
.statu3{color: #ffbf00;font-size: 1.5rem;vertical-align: -0.15rem;} /*维护状态*/
.statu4{color: red;font-size: 1.5rem;vertical-align: -0.15rem;} /*故障状态*/

.subscribe1{color: #0ECA5B;font-size: 1rem}
.subscribe2{color: #919191;font-size: 1rem}
.subscribe3{color: #ffbf00;font-size: 1rem}
.subscribe4{color: red;font-size: 1rem}

.time{font-size: 0.85rem;color: #919191;margin-left: 0.2rem}
</style>
