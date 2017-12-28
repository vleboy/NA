<template>
  <div class="p-game-video">
    <div class="-search g-text-right">
      <el-row class="transition-box">
        <el-col :span="10" :offset='14' class="g-text-right">
          <el-input placeholder="请输入商户名称" class="input" v-model="searchInfo"></el-input>
          <el-button type="primary" @click="getLineList">搜索</el-button>
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
        <el-table-column label="说明" align="center" >
          <template scope="scope">
            <div v-if="scope.row.content">
              <span v-for="(item,index) in scope.row.content.content" :key="index">
                <span>{{gameList[item.gameType]}}</span>:
                <span>线数：{{item.lineCount}}</span>;
                <span>线注：<span v-for="(data,index) in item.lineBet" :key="index">{{data}},&ensp;</span></span>
              </span>
            </div>
            <div v-else>-</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template scope="scope">
            <el-button type="text" @click="openModal(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination layout="prev, pager, next, sizes, jumper" :total="getItems.length"
                       :page-sizes="[20, 50]" :page-size="nowSize" @size-change="getNowsize" @current-change="getNowpage">
        </el-pagination>
      </div>
    </div>

    <el-dialog title="电子游戏配置" :visible.sync="isOpenModal" class="g-text-center">
      <el-form :model="lineInfo" ref="lineInfo" class="-p-c-form" label-width="80px"
               label-position="right">
        <el-form-item label="选择游戏" class="g-text-left">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <el-checkbox-group v-model="lineInfo.gameType">
            <el-checkbox :label="item.id" v-for="(item,index) in gameTypeList" :key="index" class="-p-c-radio"
                         @change="handleCheckedChange">{{item.value}}</el-checkbox >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="线注" prop="lineBet" class="g-text-left">
          <el-checkbox :indeterminate="isIndeterminateBet" v-model="checkAllBet" @change="handleCheckAllChangeBet">全选</el-checkbox>
          <el-checkbox-group v-model="lineInfo.lineBet" class="g-text-left">
            <el-checkbox :label="item" v-for="(item,index) in lineBetList" :key="index" class="-p-c-radio"
                         @change="handleCheckedChangeBet"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="线数" prop="lineCount">
          <el-input v-model="lineInfo.lineCount" class="input" type="number" placeholder="范围在 1 ~ 25 之间的正整数"></el-input>
        </el-form-item>
        <el-form-item label="说明" class="g-text-left" >
          <div v-if="storageInfo.content">
            <span v-for="(item,index) in storageInfo.content.content" :key="index">
              <span>{{gameList[item.gameType]}}</span>;
              <span>线数：{{item.lineCount}}</span>;
              <span>线注：<span v-for="(data,index) in item.lineBet" :key="index">{{data}},&ensp;</span></span>;
            </span>
          </div>
          <div v-else>暂无游戏配置</div>
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
      data: 'videoGameConfig'
    })
  },
  created () {
    this.getLineList()
  },
  data () {
    return {
      nowSize: 20,
      nowPage: 1,
      isfinish: {
        lineBet: false,
        lineCount: false
      },
      lineInfo: {
        lineBet: [], // 线注
        lineCount: '', // 线数
        gameType: []
      }, // 创建列表
      lineBetList: ['0.01','0.25','0.5','1','1.25','2.5','3.75','5','10', '20', '25', '50', '100', '125', '200'], // 线注选项
      lineList: [],
      addInfo: [], // 最后提交的数据
      searchInfo: '',
      storageInfo: '', // 暂存单个信息
      gameList:{
        'xcn': '小厨娘',
        'tlzm': '塔罗之谜',
        'csjb': '财神进宝',
        'fyht': '福运亨通',
        'sfss': '四方神兽',
        'slxy': '祥龙献瑞'
      },
      gameTypeList: [
        {
          value: '小厨娘',
          id: 'xcn'
        },{
          value: '塔罗之谜',
          id: 'tlzm'
        },{
          value: '财神进宝',
          id: 'csjb'
        },{
          value: '福运亨通',
          id: 'fyht'
        },{
          value: '四方神兽',
          id: 'sfss'
        },{
          value: '祥龙献瑞',
          id: 'slxy'
        }
      ],
      isOpenModal: false,
      isSending: false,
      checkAll: true, // 游戏类别全选
      checkAllBet: true, // 线注全选
      isIndeterminate: true, // 游戏类别图标控制
      isIndeterminateBet: true // 线注图标控制
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
    openModal (data) {
      this.lineInfo = {
        lineBet: [], // 线注
        lineCount: '', // 线数
        gameType: []
      }
      this.addInfo = []
      this.storageInfo = data
      this.isOpenModal = true
    },
    getLineList () {
      let data
      this.$store.commit('startLoading')
      if(this.searchInfo) {
        data = {
          code: "videoconfig",
          query:{
            displayName: this.searchInfo
          }
        }
      } else {
        data = {
          code: "videoconfig"
        }
      }
      invoke({
        url: api.configMultList,
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
      if (this.lineInfo.lineCount == ''){
        return this.$message.error('请输入线数')
      } else if (!pattern.positiveInteger.exec(this.lineInfo.lineCount) || this.lineInfo.lineCount<0 || this.lineInfo.lineCount>25) {
        return this.$message.error('请输入1-25的正整数')
      }
      if(this.isSending)return
      // 判断是否存在已经设置了线注和线数
      if(this.storageInfo.content) {
        // 先判断游戏类别是单选还是多选情况
        this.addInfo = JSON.parse(JSON.stringify(this.storageInfo.content.content))
        for(let item of this.lineInfo.gameType){
          for(let itemAdd of this.addInfo) {
            if(item == itemAdd.gameType) {
              itemAdd.lineCount = this.lineInfo.lineCount;
              itemAdd.lineBet = this.lineInfo.lineBet
            } else {
              this.addInfo.push({
                gameType: item,
                lineCount: this.lineInfo.lineCount,
                lineBet: this.lineInfo.lineBet
              })
            }
          }
        }
//        数组对象去重
        let hash = {};
        this.addInfo = this.addInfo.reduce(function(item, next) {
          hash[next.gameType] ? '' : hash[next.gameType] = true && item.push(next);
          return item
        }, [])

      } else {
        for(let item of this.lineInfo.gameType){
          this.addInfo.push({
            gameType: item,
            lineCount: this.lineInfo.lineCount,
            lineBet: this.lineInfo.lineBet
          })
        }
      }
      if(this.lineInfo.lineBet.length==0 ||this.lineInfo.gameType.length==0 ||this.lineInfo.lineCount==''){
        return this.$message.error('请配置完整信息')
      }
      this.isSending = true
      invoke({
        url: api.configMultNew,
        method: api.post,
        data: {
          code: 'videoconfig',
          businessKey: this.storageInfo.displayId,
          content: this.addInfo
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
            this.getLineList()
            this.isOpenModal = false
            this.isSending = false
          }
        }
      )
    },
    resultSearch () {
      this.searchInfo = ''
      this.getLineList()
    },
    handleCheckAllChange (event) {
      this.lineInfo.gameType = event.target.checked ? ['xcn','tlzm'] : [];
      this.isIndeterminate = false;
    },
    handleCheckedChange() {
      let checkedCount = this.lineInfo.gameType.length;
      this.checkAll = checkedCount === this.gameTypeList.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.gameTypeList.length;
    },
    handleCheckAllChangeBet (event) {
      this.lineInfo.lineBet = event.target.checked ? this.lineBetList : [];
      this.isIndeterminateBet = false;
    }, // 线注全选
    handleCheckedChangeBet() {
      let checkedCountBet = this.lineInfo.lineBet.length;
      this.checkAllBet = checkedCountBet === this.lineBetList.length;
      this.isIndeterminateBet = checkedCountBet > 0 && checkedCountBet < this.lineBetList.length;
    },
    getNowsize (size) {
      this.nowSize = size
      // console.log('当前每页:' + size)
    },
    getNowpage (page) {
      this.nowPage = page
      // console.log('当前是第:' + page + '页')
    }
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
      margin: 0;
      padding: 10px 20px 10px 0;
    }
  }

  .page {padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 2rem}
  }
</style>
