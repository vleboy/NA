<template>
  <div>
    <searchbox></searchbox>
    <p class="searchResult">共搜索到 {{counts.length||0}} 条数据</p>
    <el-button type="primary" class="justfy1" @click="goCreate">创建新游戏</el-button>
    <div class="outresult">
      <el-table stripe :data="gameItems">
        <el-table-column label="游戏名称" prop="gameName" align="center">
        </el-table-column>
        <el-table-column label="分类" :formatter="getType" align="center">
        </el-table-column>
        <el-table-column label="所属运营商" prop="company.companyName" align="center">
        </el-table-column>
        <!--<el-table-column label="游戏消耗总点数" prop="points" align="center">-->
        <!--</el-table-column>-->
        <el-table-column label="创建时间" prop="createdAt" :formatter="getAtime" >
        </el-table-column>
        </el-table-column>
        <el-table-column label="状态" align="center" :formatter="gameState">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <el-button type="text" class="myBtn" @click="goDetail(scope.row)">查看</el-button>
            <!--<el-button type="text" class="myBtn" @click="editUser(scope.$index, scope.row)">更多</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination layout="prev, pager, next, sizes, jumper" :total="gameItems.length"
                       :page-sizes="[5, 10]" :page-size="nowSize" @size-change="getNowsize" @current-change="getNowpage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import dateformat from 'dateformat'
import Searchbox from '@/components/game/searchGame'
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
export default {
  name: 'app',
  beforeCreate () {
    this.$store.commit('returnLocalStorage')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'gameList'
    })
  },
  created () {
    this.getGameType()
    this.$store.dispatch('getGamelist')
  },
  data () {
    return {
      nowSize: 5,
      nowPage: 1,
      gameTypeList: [],
      gameStatus: ['删除', '上线', '下线', '维护', '故障']
    }
  },
  computed: {
    counts () {
      return this.$store.state.variable.gameList
    },
    gameItems () {
      if (this.nowPage === 1) {
        return this.$store.state.variable.gameList.slice(0, this.nowSize)
      } else {
        return this.$store.state.variable.gameList.slice(((this.nowPage - 1) * this.nowSize), this.nowSize * this.nowPage)
      }
    }
  },
  methods: {
    goCreate () {
      this.$router.push('addGame')
    },
    getAtime (row, col) {
      var now = new Date(parseFloat(row.createdAt))
      var formatprev = dateformat(now, 'isoDate')
      return formatprev
    }, // 格式化创建时间
    goDetail (row) {
      this.$store.commit('startLoading')
      invoke({
        url: `${api.gameOne}/${row.gameType}/${row.gameId}`,
        method: api.get
      }).then((data) => {
        let [err, res] = data
        if (err) {
          this.$message({
            message: err.msg,
            type: 'error'
          })
        } else {
          this.$store.commit({
            type: 'gameReadyDetailInfo',
            data: res.data.payload
          })
        }
        this.$store.commit('closeLoading')
      })
      this.$router.push('gamedetail')
    },
    getType (row) {
      for (var i = 0; i < this.gameTypeList.length; i++) {
        if (this.gameTypeList[i].code === row.gameType) {
          return this.gameTypeList[i].name
        }
      }
    },
    gameState (row) {
      return this.gameStatus[row.gameStatus]
    },
    getGameType () {
      invoke({
        url: api.allGames,
        method: api.post
      })
        .then(res => {
          const [err, ret] = res
          if (err) {
            this.$message({
              message: err.msg,
              type: 'error'
            })
          } else {
            this.gameTypeList = ret.data.payload
          }
          this.$store.commit('closeLoading')
        })
    },
    getNowsize (size) {
      this.nowSize = size
      console.log('当前每页:' + size)
    },
    getNowpage (page) {
      this.nowPage = page
      console.log('当前是第:' + page + '页')
    }
  },
  components: {
    Searchbox
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .outresult{padding: 2rem;}
  .searchResult{padding: 1rem 2rem}
  .justfy1{margin:0 2rem;}
  .page {padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 2rem}
</style>
