<template>
  <div class="p-debugJournal">
    <el-col :span="4">
      共 {{debugList.length}} 条数据
    </el-col>
    <el-col :span="20" class="g-text-right">
      <el-col :span="16">
        <el-select v-model="role" @change="getDebugJournalList">
          <el-option v-for="(item, index) in errorList" :key="index" :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="8" style="margin-bottom: 10px">
        <el-date-picker
          v-model="dataTime"
          type="date"
          placeholder="选择日期时间">
        </el-date-picker>
        <el-button type="primary" @click="searchAmount">搜索</el-button>
      </el-col>
    </el-col>
    <div class="-list">
      <el-table :data="dataList">
        <el-table-column prop="billId" label="时间" width="200" align="center" >
          <template scope="scope">
            <span>{{formatTime(scope.row.createdAt)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="detail" label="详情" align="center"></el-table-column>
        <el-table-column prop="inparams" label="参数" align="center"></el-table-column>
      </el-table>
    </div>
    <div class="-page">
      <el-pagination layout="prev, pager, next, sizes, jumper" :total="debugList.length" :page-sizes="[20, 50]"
                     :page-size="nowSize" @size-change="getNowsize"></el-pagination>
      </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { detailTime, formatUsername, simpleTime} from '@/behavior/format'
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
export default {
  beforeCreate () {
    this.$store.commit('returnLocalStorage')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'debugJournal'
    })
  },
  computed: {
    dataList () {
      if (this.nowPage === 1) {
        return this.debugList.slice(0, this.nowSize)
      } else {
        return this.debugList.slice(((this.nowPage - 1) * this.nowSize), this.nowSize * this.nowPage)
      }
    }
  },
  data () {
    return {
      dataTime: '',
      role: 2,
      debugList: [],
      debugListStorage: [],
      nowSize: 20,
      nowPage: 1,
      errorList:[
        {
          id: 2,
          name: '账单结算异常'
        },{
          id: 3,
          name: '超时流水异常'
        },{
          id: 4,
          name: '第三方战绩异常'
        }
      ]
    }
  },
  mounted(){
    this.getDebugJournalList()
  },
  methods: {
    getDebugJournalList () {
      this.$store.commit('startLoading')
      invoke({
        url: api.loginList,
        method: api.post,
        data: {
          role: this.role,
          type:"settlement",
          pageSize: 20,
          startKey: ''
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
          for(let item of res.data.payload.Items) {
            item.detail = JSON.stringify(item.detail)
            item.inparams = JSON.stringify(item.inparams)
          }
          this.debugList = res.data.payload.Items
          this.debugListStorage = res.data.payload.Items
        }
          this.$store.commit('closeLoading')
      }
    )
    },
    searchAmount() {
      if(this.dataTime) {
        let date = simpleTime(new Date(this.dataTime).getTime())
        this.debugList = []
        for(let item of this.debugListStorage) {
//          console.log(new Date(simpleTime(item.createdAt)).getTime(),date)
          if(simpleTime(item.createdAt) == date){
            this.debugList.push(item)
          }
        }
      } else {
        this.debugList = this.debugListStorage
      }
    },
    formatTime (time) {
      return detailTime(time)
    }, // 格式时间
    getNowsize (size) {
      this.nowSize = size
      // console.log('当前每页:' + size)
    },
    getNowpage (page) {
      this.nowPage = page
      // console.log('当前是第:' + page + '页')
    }
  },
  beforeDestroy () {
  }
}
</script>

<style scpoed lang="less">
  .p-debugJournal{
    padding: 0 2rem;

    .-search{
      overflow: hidden;
      display: inline-block;
    }
    .-list{
      margin-top: 10px;
    }
    .-page{
      text-align: right;
      margin:2rem 0
    }
  }
</style>
