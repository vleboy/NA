<template>
  <div class="point-warning">
    <div class="belong-list">
      <p class="title">管理员直管接入商</p>
      <el-table :data="allAgent">
        <el-table-column label="序号" prop="rank" align="center" width="75" type="index">
        </el-table-column>
        <el-table-column label="类型" prop="" align="center" :formatter="formatRole" width="80">
        </el-table-column>
        <el-table-column label="接入商标识" align="center" width="120">
          <template scope="scope">
            <span>{{scope.row.sn ? scope.row.sn : scope.row.suffix}}</span>
          </template>
        </el-table-column>
        <el-table-column label="接入商昵称" prop="displayName" align="center" width="140">
        </el-table-column>
        <el-table-column label="接入商游戏" prop="" align="center" width="160">
          <template scope="scope">
            <div slot="reference" class="gameName">
                <el-tag v-for="item in scope.row.gameList" key={{item}}>{{ item.name }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="游戏状态" prop="" align="center" width="100">
          <template scope="scope">
            <div slot="reference" class="gameStatus">
                <el-tag v-for="item in scope.row.gameList" key={{item}}><span :class="[item.status == 1 ? 'green' : 'red']">{{ formatStatus(item.status) }}</span></el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="游戏点数消耗分布" prop="" align="center">
        </el-table-column>
        <el-table-column label="操作" prop="" align="center" width="180">
          <template scope="scope">
            <div v-for="item in scope.row.gameList" key={{item}} style="height:31px;line-height:31px;text-align:justify;">
              <span class="list-btn">设定点数警告上限</span>
              <span @click="changeStatus(item,scope.row)" class="list-btn">启用</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    
  </div>
</template>
<script>
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
export default {
  beforeCreate () {
    this.$store.commit({
      type: 'recordNowindex',
      data: 'point-warning'
    })
    this.$store.commit('returnLocalStorage')
  },
  created () {
    this.getAll_agent()
  },
  data () {
    return {
      belongAgent: []
    }
  },
  computed: {
    allAgent () {
      return this.belongAgent
    }
  },
  methods: {
    getAll_agent () {
      let data = {
        parent: '01'
      }
      invoke({
        url: api.reportInfo,
        method: api.post,
        data: data
      }).then(result => {
        const [err, ret] = result
        if (err) {
        } else {
          var child = ret.data.payload
          for (let item of child) {
            item.gameList.map(side => {side.status ? '' : side.status = 1})
          }
          this.belongAgent = child
        }
      })
    },
    formatRole (data) {
      return '代理'
    },
    formatStatus (data) {
      if (!data) return
      if (data == 1) {
        return '正常'
      } else {
        return '停用'
      }
    },
    changeStatus (game, user) {
      console.log(game)
      console.log(user)
    }
  }
}
</script>

<style scpoed>
.point-warning{margin-bottom: 2rem}
.point-warning .belong-list{width: 99%;margin: 0 auto}
.point-warning .belong-list .title{font-size: 1.5rem;margin: 0 0 0.5rem 0;font-weight: 600;}
.point-warning .belong-list .gameName span{width: 100%;text-align: center;margin: 0.25rem 0;background-color: #fff;color: #000}
.point-warning .belong-list .gameStatus span{width: 100%;text-align: center;margin: 0.25rem 0;background-color: #fff}

.point-warning .belong-list .list-btn{color: #409EFF;cursor: pointer;}
.point-warning .belong-list .list-btn:hover{text-decoration: underline}

.green{color: #00CC00}
.red{color: #FF3300}
</style>
