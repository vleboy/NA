<template>
  <div id="app">

    <div class="lists" :class="{animations: show}">
      <ul v-for="items in gameLists">
        <li v-for="item in items">
          <a href="javascript:;" @click="beginGame(item.gameType, item.kindId, 0, (+item.kindId) - (+item.gameType), item.gameName)">
             <img v-lazy="getHtmlDocName(item.gameImg)" alt="">
          </a>
        </li>
      </ul>
    </div>

    <div class="loading" v-show="loading">
      <div class="loading-img">
         <img src="/static/loading.gif">
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app',
  data () {
    return {
      gameLists: null,
      show: false,
      loading: false
    }
  },
  mounted () {
    this.queryGame()
    window.alert = function (name) {
      var iframe = document.createElement('IFRAME')
      iframe.style.display = 'none'
      iframe.setAttribute('src', 'data:text/plain,')
      document.documentElement.appendChild(iframe)
      window.frames[0].window.alert(name)
      iframe.parentNode.removeChild(iframe)
    }
  },
  methods: {
    async queryGame () {
      try {
        const { data } = await axios({
          method: 'post',
          url: 'https://52qkggfn4d.execute-api.ap-southeast-1.amazonaws.com/dev/gameList',
          data: {
            gameType: '1010000',
            query: {
              gameStatus: 1
            }
          },
          headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Ik5BX05BMDEiLCJzdWZmaXgiOiJOQSIsInVzZXJJZCI6ODA5NjM3LCJpYXQiOjE1MTM3NTY5NzJ9.k32MLX0Fy-2TPuv48tNCvze2r1Cfy6XlX7ztucpuddA'
          }
        })
        // 断线重连
        const restartId = this.GetQueryString('restartId')
        if (restartId) {
          let game = data.payload.filter((item, index, arrs) => {
            if (item.kindId === restartId) {
              return item
            }
          })
          game = game[0]
          this.beginGame(game.gameType, game.kindId, 0, (+game.kindId) - (+game.gameType), game.gameName)
        }

        const result = Array.apply(null, {
          length: Math.ceil(data.payload.length / 2)
        }).map((x, i) => {
          return data.payload.slice(i * 2, (i + 1) * 2)
        })
        this.gameLists = result
        this.show = true
      } catch (err) {
        console.log(err)
      }
    },
    async beginGame (gameType, sid, ttgGameType, ttgGameId, ttgGameName) {
      try {
        this.loading = true
        const datas = {
          parent: this.GetQueryString('parent'),
          userId: this.GetQueryString('userId'),
          userName: this.GetQueryString('userName'),
          gameId: gameType,
          sid: sid,
          token: this.GetQueryString('token'),
          msn: this.GetQueryString('msn') || ''
        }
        const { data } = await axios({
          method: 'post',
          url: 'https://webgame.na77.org/webapi/ttgtoken',
          data: datas,
          headers: {
            'Content-type': 'application/json'
          }
        })
        if (data.code === 0) {
          window.location.href = `http://webpage.na77.org/ttg.html?playerHandle=${data.token}&userId=${datas.userId}&gameId=${datas.sid}&ttgGameType=${ttgGameType}&ttgGameId=${ttgGameId}&ttgGameName=${ttgGameName}&parent=${datas.parent}&userName=${datas.userName}&msn=${datas.msn}&naToken=${datas.token}`
          this.loading = false
        } else {
          this.loading = false
          alert(data.msg)
        }
      } catch (err) {
        this.loading = false
        alert(err)
      }
    },
    GetQueryString (name) {
      const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      const r = window.location.search.substr(1).match(reg)
      if (r !== null) return unescape(r[2]); return null
    },
    getHtmlDocName (a) {
      let str = a
      str = str.substring(str.lastIndexOf('/') + 1)
      return 'https://d38xgux2jezyfx.cloudfront.net/' + str
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
::-webkit-scrollbar {
  width: 0px;
  height: 1px;
}

html, body {
  background-color: rgb(29, 0, 0);
  position:fixed;
  overflow-y:hidden;
  width: 100%;
  height: 100vh;
}

#app {
  position: relative;
  width: 100%;
  height: 100%;
  background: url('http://d38xgux2jezyfx.cloudfront.net/lobby_bg.jpg') no-repeat;
  background-size: cover;
  display: flex;
  overflow: hidden;
}
ul {
  list-style: none;
}
ul li {
  width: 1.875rem;
  height: 1.875rem;
}
a {
  text-decoration: none;
  -webkit-tap-highlight-color:transparent
}

img {
  width: 100%;
  height: 100%;
}

.top {
  position: absolute;
  top: 0;
  width: 100%;
  height: .568rem;
  background: url('http://d38xgux2jezyfx.cloudfront.net/lobby_top.png') no-repeat;
  background-size: cover
}

.bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: .678rem;
  background: url('http://d38xgux2jezyfx.cloudfront.net/lobby_buttom.png') no-repeat;
  background-size: cover
}
.lists {
  display: flex;
  box-sizing:border-box;
  width: 100%;
  padding-left: .20834rem;
  overflow-x: auto;
  overflow-y: hidden;
  position: absolute;
  top: 50%;
}

/* .lists ul li {
  width: 360px;
  height: 360px;
} */
.loading {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .3)
}
.loading-img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px
}
.animations {
  animation: bounceRight 1s ease both
}

@keyframes bounceRight{
    0%{opacity:0;transform:translateX(50%)translateY(-50%);
        -webkit-transform:translateX(50%)translateY(-50%);}
    20%{opacity:0;transform:translateX(40%)translateY(-50%);
        -webkit-transform:translateX(40%)translateY(-50%);}
    100%{opacity:1;transform:translateX(0)translateY(-50%);
        -webkit-transform:translateX(0)translateY(-50%);}
}
</style>
