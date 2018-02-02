<template>
  <div>
    <div class="propPrizeList -search">
      <el-row class="transition-box">
        <el-col :span="10">
          <span>物品ID: </span>
          <el-input placeholder="请输入" class="input" v-model="searchInfo.toolId"></el-input>
        </el-col>
        <el-col :span="10">
          <span>道具名称：</span>
          <el-input placeholder="请输入" class="input" v-model="searchInfo.toolName"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="getPropPrizeList">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-col>
      </el-row>
    </div>
    <p class="searchResult">共搜索到 {{propPrizeList.length || 0}} 条数据</p>
    <div class="propPrizeList" style="padding-top: 0">
      <el-table stripe :data="getItems">
        <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
        <el-table-column label="物品ID" prop="toolId" align="center"></el-table-column>
        <el-table-column label="道具名称" prop="toolName"></el-table-column>
        <el-table-column label="道具单价" prop="toolPrice">
          <template scope="scope">
            <p>{{ scope.row.toolPrice === 'NULL!' ? '-' : scope.row.toolPrice}}</p>
          </template>
        </el-table-column>
        <el-table-column label="商户最低定价下浮百分比" prop="lowerRatio" align="center">
          <template scope="scope">
            <p>{{ scope.row.lowerRatio === 'NULL!' ? '-' : scope.row.lowerRatio}}</p>
          </template>
        </el-table-column>
        <el-table-column label="商户最高定价上浮百分比" prop="comeUpRatio" align="center">
          <template scope="scope">
            <p>{{ scope.row.comeUpRatio === 'NULL!' ? '无限制' : scope.row.comeUpRatio}}</p>
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center" >
          <template scope="scope">
            <el-popover trigger="hover" placement="bottom-start" width="250">
              <p>{{ scope.row.remark === 'NULL!' ? '' : scope.row.remark}}</p>
              <div slot="reference" class="">
                <el-icon name="search" style="color:#108ee9"></el-icon>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="100">
          <template scope="scope">
            <el-button type="text" @click="openModal(scope.row)">定价</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination layout="prev, pager, next, sizes, jumper" :total="propPrizeList.length"
                       :page-sizes="[20, 50]" :page-size="nowSize" @size-change="getNowsize" @current-change="getNowpage">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="编辑定价" :visible.sync="isOpenModal" style="text-align: center">
      <el-form :model="propPrizeInfo">
        <el-form-item label="道具名称" label-width="180px">
          <div style="text-align: left">{{propPrizeInfo.toolName}}</div>
        </el-form-item>
        <el-form-item label="道具基准价格" label-width="180px" >
          <el-input v-model="propPrizeInfo.toolPrice" placeholder="请输入道具基本价格"
                    :maxlength="200"></el-input>
        </el-form-item>
        <el-form-item label="商户最低定价下浮百分比" label-width="180px" >
          <el-input v-model="propPrizeInfo.lowerRatio" placeholder="请输入商户最低定价下浮百分比（范围0.00~100.00）"
                    :maxlength="200"></el-input>
        </el-form-item>
        <el-form-item label="商户最高定价上浮百分比" label-width="180px" >
          <el-input v-model="propPrizeInfo.comeUpRatio" placeholder="请输入商户最高定价上浮百分比（范围0.00~100.00）"
                    :maxlength="200" :disabled="!isUnlimited"></el-input>
        </el-form-item>
        <el-form-item label="是否限制商户最高定价" label-width="180px" class="g-text-left">
          <el-switch
            v-model="isUnlimited"
            on-text="是"
            off-text="否"
            @change="changeSwitch()">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isOpenModal = false">取 消</el-button>
        <el-button type="primary" :load="isSending" @click="submitProp(propPrizeInfo)">{{isSending ? '提交中' : '确 定'}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { detailTime, formatMillisecond } from '@/behavior/format'
import { pattern } from '@/behavior/regexp'
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
export default {
  name: 'app',
  beforeCreate () {
    this.$store.commit('returnLocalStorage')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'propPrice'
    })
    this.$store.commit('startLoading')
  },
  created () {
    this.getPropPrizeList()
  },
  data () {
    return {
      nowSize: 20,
      nowPage: 1,
      isOpenModal: false,
      isSending: false,
      isUnlimited: true,
      propPrizeList: [],
      propPrizeInfo: {
        toolPrice: '',
        comeUpRatio: '',
        lowerRatio: '',
        status: ''
      },
      searchInfo: {}
    }
  },
  computed: {
    getItems () {
      if (this.nowPage === 1) {
        return this.propPrizeList.slice(0, this.nowSize)
      } else {
        return this.propPrizeList.slice(((this.nowPage - 1) * this.nowSize), this.nowSize * this.nowPage)
      }
    }
  },
  methods: {
    getPropPrizeList () {
      this.$store.commit('startLoading')
      if(this.searchInfo.toolId == ''){
        delete this.searchInfo.toolId
      }
      if (this.searchInfo.toolName == '') {
        delete this.searchInfo.toolName
      }
      invoke({
        url: api.propList,
        method: api.post,
        data:{
          query:this.searchInfo
        }
      }).then(
        result => {
          const [err, res] = result
          if (err) {
            this.$message({
              message: err.msg,
              type: 'error'
            })
          } else {
            this.propPrizeList = res.data.payload
          }
          this.$store.commit('closeLoading')
        }
      )
    },
    submitProp () {
      if (!pattern.positive.exec(this.propPrizeInfo.lowerRatio) || !this.propPrizeInfo.lowerRatio) {
        return this.$message.error('请输入正确的商户最低定价下浮百分比 范围0.00~限制')
      } else if (!pattern.positive.exec(this.propPrizeInfo.toolPrice) || !this.propPrizeInfo.toolPrice) {
        return this.$message.error('请输入正确的道具价格，范围0.00~限制')
      } else if ((!pattern.positive.exec(this.propPrizeInfo.comeUpRatio)||!this.propPrizeInfo.comeUpRatio) && this.isUnlimited) {
        return this.$message.error('请输入正确的商户最高定价上浮百分比 范围0.00~无限制')
      }
      if (this.isSending) return // 防止重复提交
      this.isSending = true
      this.propPrizeInfo.status = this.isUnlimited ? '2' : '1'
      invoke({
        url: api.toolSetPrice,
        method: api.post,
        data: this.propPrizeInfo
      }).then(
        result => {
          const [err, res] = result
          if (err) {
            this.$message({
              message: err.msg,
              type: 'error'
            })
            this.isSending = false
          } else if (res) {
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            this.isOpenModal = false
            this.isSending = false
            this.getPropPrizeList()
          }
        }
      )
    },
    openModal (row = {}) {
      this.isOpenModal = true
      if (JSON.stringify(row) !== '{}') {
        this.propPrizeInfo = JSON.parse(JSON.stringify(row))
        this.propPrizeInfo.toolPrice = (this.propPrizeInfo.toolPrice === 'NULL!') ? '' : this.propPrizeInfo.toolPrice
        this.propPrizeInfo.comeUpRatio = (this.propPrizeInfo.comeUpRatio === 'NULL!') ? '' : this.propPrizeInfo.comeUpRatio
        this.propPrizeInfo.lowerRatio = (this.propPrizeInfo.lowerRatio === 'NULL!') ? '' : this.propPrizeInfo.lowerRatio
//        this.propPrizeInfo.status = this.isUnlimited ? '2' : '1'
        this.isUnlimited = this.propPrizeInfo.status == 2
      } else {
        this.propPrizeInfo = {}
      }
    },
    startSearch () {
    }, // 控制搜索条件
    resetSearch () {
      this.searchInfo = {}
      this.getPropPrizeList()
    },
    changeSwitch () {
      this.isUnlimited = !this.isUnlimited
      if(!this.isUnlimited){
        this.propPrizeInfo.comeUpRatio = ""
      }
    }, // 格式化创建时间
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
<style scoped>
  .propPrizeList{padding:1rem 2rem;}
  .-search{margin:0 2rem; background-color: #f5f5f5; text-align: center }
  .input{width: 80%}
  .searchResult{padding: 1rem 2rem}
  .page {padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 2rem}

</style>
