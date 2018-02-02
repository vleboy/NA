<template>
  <div>
    <p class="searchResult">共搜索到 {{horseRaceLampList.length || 0}} 条数据</p>

    <div class="-p-m-header">
      <el-col :span="11">
        <el-button type="primary" class="justfy1" @click="openModal()">创建跑马灯</el-button>
      </el-col>
      <el-col :span="10" class="g-text-right">
        <el-input placeholder="请输入跑马灯次数" class="input" v-model="searchInfo.searchName"></el-input>
      </el-col>
      <el-col :span="3" class="g-text-right">
        <el-button type="primary" @click="startSearch">搜索</el-button>
        <el-button @click="resetSearch">重置</el-button>
      </el-col>
    </div>
    <div class="horseRaceLampList">
      <el-table stripe :data="getItems">
        <el-table-column label="内容" prop="content" align="center">
          <template scope="scope">
            <el-popover trigger="hover" placement="top" >
              <p class="-p-h-remark">{{scope.row.content}}</p>
              <div slot="reference" class="text-ellipsis">
                {{ scope.row.content }}
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="开始时间" prop="startTime" :formatter="getStartTime">
        </el-table-column>
        <el-table-column label="结束时间" prop="endTime" :formatter="getEndTime">
        </el-table-column>
        <el-table-column label="间隔时间" prop="splitTime" :formatter="getHours" align="center">
        </el-table-column>
        <el-table-column label="播放次数" prop="count" align="center" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="100">
          <template scope="scope">
            <el-button type="text" @click="openModal(scope.row)">编辑</el-button>
            <el-button type="text" @click="delItem(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination layout="prev, pager, next, sizes, jumper" :total="horseRaceLampList.length"
                       :page-sizes="[20, 50]" :page-size="nowSize" @size-change="getNowsize" @current-change="getNowpage">
        </el-pagination>
      </div>
    </div>

    <el-dialog title="发布公告" :visible.sync="isOpenModal" style="text-align: center">
      <el-form :model="horseRaceLampInfo">
        <el-form-item label="公告内容" label-width="140px" >
          <el-input v-model="horseRaceLampInfo.content" type="textarea" :rows="4" auto-complete="off" placeholder="请输入公告内容"
                    :maxlength="200" @blur="changeShowTime()"></el-input>
        </el-form-item>
        <el-form-item label="时间间隔" label-width="140px">
          <el-date-picker
            @change="changeDatePicker()"
            v-model="dateTimeArray"
            type="datetimerange"
            style="width: 100%"
            :picker-options="dateOption"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="播放时间间隔" label-width="140px" >
          <el-col :span="6">
            <el-input class="-hrl-time" v-model="timeObj.day" type="number" placeholder="请输入天" @blur="changeCount"></el-input> 天
          </el-col>
          <el-col :span="6">
            <el-input class="-hrl-time" v-model="timeObj.hour" type="number" placeholder="请输入小时" @blur="changeCount"></el-input> 时
          </el-col>
          <el-col :span="6">
            <el-input class="-hrl-time" v-model="timeObj.minute" type="number" placeholder="请输入分钟" @blur="changeCount"></el-input> 分
          </el-col>
          <el-col :span="6">
            <el-input class="-hrl-time" v-model="timeObj.second" type="number" placeholder="请输入秒数" @blur="changeCount"></el-input> 秒
          </el-col>
        </el-form-item>
        <el-form-item label="单条公告显示时间" label-width="140px">
          <div style="text-align: left">{{(horseRaceLampInfo.showTime||'0')+'s'}}</div>
        </el-form-item>
        <el-form-item label="预计播放最多次数" label-width="140px" >
          <div style="text-align: left">{{(horseRaceLampInfo.count||0)+'次'}}</div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isOpenModal = false">取 消</el-button>
        <el-button type="primary" :load="isSending" @click="submitProp(horseRaceLampInfo.noid)">{{isSending ? '提交中' : '确 定'}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { detailTime, formatMillisecond } from '@/behavior/format'
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
export default {
  name: 'app',
  beforeCreate () {
    this.$store.commit('returnLocalStorage')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'horseRaceLampList'
    })
    this.$store.commit('startLoading')
  },
  created () {
    this.getHorseRaceLampList()
  },
  data () {
    return {
      nowSize: 20,
      nowPage: 1,
      isOpenModal: false,
      isSending: false,
      dateTimeArray: [],
      horseRaceLampList: [],
      horseRaceLampInfo: {
        startTime: '',
        endTime: '',
        splitTime: '',
        showTime: '',
        content: '',
        count: ''
      },
      timeObj: {
        day: 0,
        hour: 0,
        minute: 0,
        second: 0
      },
      searchInfo: {
        searchId: '',
        searchName: ''
      },
      searchArray: [], // 暂时加储
      dateOption: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 3600 * 1000 * 24
        }
      }
    }
  },
  computed: {
    getItems () {
      if (this.nowPage === 1) {
        return this.horseRaceLampList.slice(0, this.nowSize)
      } else {
        return this.horseRaceLampList.slice(((this.nowPage - 1) * this.nowSize), this.nowSize * this.nowPage)
      }
    }
  },
  methods: {
    getHorseRaceLampList () {
      this.$store.commit('startLoading')
      invoke({
        url: api.getHorseRaceLampList,
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
            this.horseRaceLampList = res.data.list.Items
            this.searchArray = res.data.list.Items
          }
          this.$store.commit('closeLoading')
        }
      )
    },
    submitProp (id) {
      const time = this.horseRaceLampInfo.endTime - this.horseRaceLampInfo.startTime
      if (!this.horseRaceLampInfo.startTime || !this.horseRaceLampInfo.endTime) {
        return this.$message.error('请选择时间段')
      } else if (!this.horseRaceLampInfo.content) {
        return this.$message.error('请输入公告内容')
      } else if (time < this.horseRaceLampInfo.splitTime) {
        return this.$message.error('时间间隔不能小于播放间隔时间')
      }
      if (this.isSending) return // 防止重复提交
      this.isSending = true
      invoke({
        url: id ? api.updateHorseRaceLamp : api.addHorseRaceLamp,
        method: api.post,
        data: this.horseRaceLampInfo
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
            this.getHorseRaceLampList()
          }
        }
      )
    },
    openModal (row = {}) {
      this.isOpenModal = true
      if (JSON.stringify(row) !== '{}') {
        this.horseRaceLampInfo = JSON.parse(JSON.stringify(row))
        this.dateTimeArray = [new Date(this.horseRaceLampInfo.startTime), new Date(this.horseRaceLampInfo.endTime)]
        this.timeObj.day = parseInt(this.horseRaceLampInfo.splitTime / (1000 * 60 * 60 * 24))
        this.timeObj.hour = parseInt((this.horseRaceLampInfo.splitTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        this.timeObj.minute = parseInt((this.horseRaceLampInfo.splitTime % (1000 * 60 * 60)) / (1000 * 60))
        this.timeObj.second = (this.horseRaceLampInfo.splitTime % (1000 * 60)) / 1000
      } else {
        this.horseRaceLampInfo = {}
        this.dateTimeArray = []
        this.timeObj = {
          day: 0,
          hour: 0,
          minute: 0,
          second: 0
        }
      }
    },
    startSearch () {
      let {searchId, searchName} = this.searchInfo
      this.arrayLocal = JSON.parse(JSON.stringify(this.searchArray))
      if ((!searchId && !searchName)) {
        this.searchArray = []
        this.getHorseRaceLampList()
      } else if (searchName && searchId) {
        this.horseRaceLampList = this.arrayLocal.filter(item => {
          return (item.count === Number(this.searchInfo.searchName) && item.noid === this.searchInfo.searchId)
        })
      } else {
        if (searchName) {
          this.horseRaceLampList = this.arrayLocal.filter(item => {
            return item.count === Number(this.searchInfo.searchName)
          })
        } else if (searchId) {
          this.horseRaceLampList = this.arrayLocal.filter(item => {
            return item.noid === this.searchInfo.searchId
          })
        }
      }
    }, // 控制搜索条件
    resetSearch () {
      this.searchInfo = {}
      this.searchArray = []
      this.getHorseRaceLampList()
    },
    getStartTime (row, col) {
      return detailTime(row.startTime)
    }, // 格式化创建时间
    getEndTime (row, col) {
      return detailTime(row.endTime)
    }, // 格式化创建时间
    getHours (row) {
      return formatMillisecond(row.splitTime)
    },
    getNowsize (size) {
      this.nowSize = size
      // console.log('当前每页:' + size)
    },
    getNowpage (page) {
      this.nowPage = page
      // console.log('当前是第:' + page + '页')
    },
    delItem (row) {
      this.$confirm(`确定要删除该公告吗？`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        invoke({
          url: api.delHorseRaceLamp,
          method: api.post,
          data: {
            noid: row.noid
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
                type: 'success',
                message: '删除成功!'
              })
              this.isOpenModal = false
              this.getHorseRaceLampList()
            }
          }
        )
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }, // 删除公告
    changeShowTime () {
      if (this.horseRaceLampInfo.content) {
        const contentLength = this.horseRaceLampInfo.content.length
        this.horseRaceLampInfo.showTime = (contentLength * 0.25) + (25 * 0.5)
      }
      this.changeDatePicker()
      this.changeCount()
//      this.dateTimeArray = []
    }, // 公告内容失去焦点 计算需要显示的时间
    changeDatePicker () {
      this.horseRaceLampInfo.startTime = new Date(this.dateTimeArray[0]).getTime()
      this.horseRaceLampInfo.endTime = new Date(this.dateTimeArray[1]).getTime()
      const dataTime = this.horseRaceLampInfo.endTime - this.horseRaceLampInfo.startTime
      this.horseRaceLampInfo.count = parseInt(dataTime / (this.horseRaceLampInfo.showTime * 1000))
    }, // 处理选择时间
    changeCount () {
      const dataTime = this.horseRaceLampInfo.endTime - this.horseRaceLampInfo.startTime
      const showTime = this.horseRaceLampInfo.showTime * 1000
      const segmentationDay = this.timeObj.day * 24 * 60 * 60 * 1000
      const segmentationHour = this.timeObj.hour * 60 * 60 * 1000
      const segmentationMinute = this.timeObj.minute * 60 * 1000
      const segmentationSecond = this.timeObj.second * 1000
      this.horseRaceLampInfo.splitTime = segmentationHour + segmentationMinute + segmentationSecond + segmentationDay
      this.horseRaceLampInfo.count = parseInt(dataTime / (showTime + this.horseRaceLampInfo.splitTime))
    } // 获取次数
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .horseRaceLampList{padding:1rem 2rem;}
  .-p-m-header{overflow: hidden;padding: 0 2rem}
  .input{width: 80%}
  .searchResult{padding: 1rem 2rem}
  .-p-h-remark{word-wrap: break-word; word-break: normal;width: 200px}
  .text-ellipsis{width: 100%; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;}
  .page {padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 2rem}
  .-hrl-time{width: 80%}
</style>
