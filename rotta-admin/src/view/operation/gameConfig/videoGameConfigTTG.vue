<template>
  <div class="p-game-video">
    <div class="-search g-text-right">
      <el-row class="transition-box">
        <el-col :span="10" :offset='14' class="g-text-right">
          <el-input placeholder="请输入商户名称" class="input" v-model="searchInfo"></el-input>
          <el-button type="primary" @click="getTTGList">搜索</el-button>
          <el-button @click="resultSearch">重置</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="rebackinfo">
      <p>共搜索到 {{lineList.length || 0}} 条数据</p>
    </div>
    <div class="gameNoticeList">
      <el-table stripe :data="getItems">
        <el-table-column label="序号" align="center" type="index" width="65">
        </el-table-column>
        <el-table-column label="商户" prop="displayName" align="center" width="200">
        </el-table-column>
        <el-table-column label="所选游戏" align="center" >
          <template scope="scope">
            <span v-for="(item,index) in scope.row.subGameList">{{item.gameName}}&emsp;</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template scope="scope">
            <el-button type="text" @click="openModal(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination layout="prev, pager, next, sizes, jumper" :total="lineList.length"
                       :page-sizes="[20, 50]" :page-size="nowSize" @size-change="getNowsize" @current-change="getNowpage">
        </el-pagination>
      </div>
    </div>

    <el-dialog title="电子游戏配置" :visible.sync="isOpenModal" class="g-text-center">
      <el-form :model="lineInfo" ref="lineInfo" class="-p-c-form" label-width="80px"
               label-position="right">
        <el-form-item label="游戏" prop="lineCount">
          <div class="g-text-left">
            <el-checkbox :indeterminate="isIndeterminateBet" v-model="checkAllBet" @change="changeAll">全选</el-checkbox>
          </div>
          <el-checkbox-group v-model="lineInfo.gameItem" class="g-text-left">
            <el-checkbox :label="item" v-for="(item,index) in gameList" :key="item"  class="-p-c-radio"
                         @change="changeCheckbox(item)">{{item.gameName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="已选择" class="g-text-left">
          <el-tag
            style="margin-right: 15px"
            v-for="tag in tagsList"
            :key="tag.gameName"
            :closable="true"
            type="primary"
            @close="handleClose(tag)">
            {{tag.gameName}}
          </el-tag>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isOpenModal = false">取 消</el-button>
        <el-button type="primary" :load="isSending" @click="addVideoGame()">{{isSending ? '提交中' : '确 定'}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { invoke } from '@/libs/fetchLib'
import { pattern } from '@/behavior/regexp'
import api from '@/api/api'
export default{
  beforeCreate () {
    this.$store.commit('returnLocalStorage')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'videoGameConfigTTG'
    })
  },
  created () {
    this.getTTGList()
    this.getGameList()
  },
  data () {
    return {
      nowSize: 20,
      nowPage: 1,
      lineInfo: {
        gameItem: [],
        gameItems: ''
      }, // 创建列表
      lineList: [],
      searchInfo: '',
      storageInfo: '', // 暂存单个信息
      isOpenModal: false,
      isSending: false,
      checkAllBet: true, // 全选
      isIndeterminateBet: true, // 图标控制
      isCheckGame: false, // 判断tagsList是否存在相关游戏
      gameList: [],
      tagsList: []
    }
  },
  computed: {
    getItems () {
      if (this.nowPage === 1) {
        return this.lineList.slice(0, this.nowSize)
      } else {
        return this.lineList.slice(((this.nowPage - 1) * this.nowSize), this.nowSize * this.nowPage)
      }
    }
  },
  methods: {
    openModal (row) {
      this.tagsList = []
      this.lineInfo.gameItem = []
      this.storageInfo = row
      if(this.storageInfo.subGameList){
        this.tagsList = JSON.parse(JSON.stringify(this.storageInfo.subGameList))
      }
      this.isOpenModal = true
    },
    getTTGList () {
      let data = {}
      this.$store.commit('startLoading')
      if(this.searchInfo) {
        data = {
          query:{
            displayName: this.searchInfo
          }
        }
      }
      invoke({
        url: api.merchantTTGList,
        method: api.post,
        data: data
      }).then(
        result => {
          const [err, res] = result
          if (err) {
            this.$message({
              message: err.msg,
              type: 'error'
            })
          } else {
            this.lineList = res.data.payload
          }
          this.$store.commit('closeLoading')
        }
      )
    },
    addVideoGame () {
      if(this.isSending)return
      this.lineInfo.gameItem = this.tagsList
      if(!this.lineInfo.gameItem.length){
        return this.$message.error('请选择相关游戏')
      }
      this.isSending = true
      invoke({
        url: api.merchantTTGUpdate,
        method: api.post,
        data: {
          userId: this.storageInfo.userId,
          subGameList: this.lineInfo.gameItem
        }
      }).then(
        result => {
          const [err, res] = result
          if (err) {
            this.$message({
              message: err.msg,
              type: 'error'
            })
          } else if (res) {
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
            this.getTTGList()
            this.isOpenModal = false
            this.isSending = false
          }
        }
      )
    },
    resultSearch () {
      this.searchInfo = ''
      this.getTTGList()
    },

    changeAll (event) {
      this.lineInfo.gameItem = event.target.checked ? this.gameList : [];
      this.tagsList = JSON.parse(JSON.stringify(this.lineInfo.gameItem))
      this.isIndeterminateBet = false;
    }, // 游戏全选
    changeCheckbox(item) {
      this.isCheckGame = false
      for (let data of this.tagsList) {
        if(item.gameId == data.gameId) {
          this.isCheckGame = true
        }
      }
      if (!this.isCheckGame) {
        this.tagsList.push(item)
      }
      let checkedCountBet = this.lineInfo.gameItem.length;
      this.checkAllBet = checkedCountBet === this.gameList.length;
      this.isIndeterminateBet = checkedCountBet > 0 && checkedCountBet < this.gameList.length;
    },
    getNowsize (size) {
      this.nowSize = size
    },
    getNowpage (page) {
      this.nowPage = page
    },
    getGameList () {
      invoke({
        url: api.gameList,
        method: api.post
      }).then(
        result => {
          const [err, res] = result
          if (err) {
            this.$message({
              message: err.msg,
              type: 'error'
            })
          } else {
            for (let item of res.data.payload) {
              if (item.companyIden == 'TTG') {
                this.gameList.push(item)
              }
            }
          }
          // this.$store.commit('closeLoading')
        }
      )
    }, //获取运营商列表
    handleClose(tag){
      this.tagsList.splice(this.tagsList.indexOf(tag), 1)
      this.lineInfo.gameItem = JSON.parse(JSON.stringify(this.tagsList))
      this.checkAllBet = false
//      console.log(this.lineInfo.gameItem)
    } // 清除标签
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .p-game-video{
    margin-bottom: 4rem;
    padding: 2rem;
  .-search{
    margin-bottom: 2rem ;
    .input{
      width: 60%;
    }
  }
  .rebackinfo{
    margin-bottom: 10px;
  }
  .input{
     width: 100%;
   }
  .-p-c-form{

    .-p-c-radio{
      width: 20%;
      margin: 0;
      padding: 10px 20px 10px 0;
    }
  }

  .page {padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 2rem}
  }
</style>
