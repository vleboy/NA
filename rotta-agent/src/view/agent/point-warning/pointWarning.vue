<template>
  <div>
    <div class="point-warning">
      <div class="belong-list">
        <p class="title">管理员直管接入商</p>
        <el-table :data="allAgent">
          <el-table-column label="序号" prop="rank" align="left" width="75" type="index">
          </el-table-column>
          <el-table-column label="类型" prop="" align="left" :formatter="formatRole" width="80">
          </el-table-column>
          <el-table-column label="接入商标识" align="left" width="120">
            <template scope="scope">
              <span>{{scope.row.sn ? scope.row.sn : scope.row.suffix}}</span>
            </template>
          </el-table-column>
          <el-table-column label="接入商昵称" prop="displayName" align="left" width="140">
            <template scope="scope">
              <span @click="getChild(scope.row)" class="fontUrl">{{scope.row.displayName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="接入商游戏" prop="" align="left" width="160">
            <template scope="scope">
              <div slot="reference" class="gameName">
                  <el-tag v-for="item in scope.row.companyList" key={{item}}>{{ item.company }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="游戏状态" prop="" align="left" width="100">
            <template scope="scope">
              <div slot="reference" class="gameStatus">
                  <el-tag v-for="item in scope.row.companyList" key={{item}}><span :class="[item.status == 0 ? 'red' : 'green']">{{ formatStatus(item.status) }}</span></el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="游戏点数消耗分布" prop="" align="left">
            <template scope="scope">
              <div slot="reference" style="margin: 8px 0;border:1px solid #000;border-radius: 15px;text-align:center" v-for="item in scope.row.companyList" key={{item}}>
                <span class="progress-content">{{item.winloseAmount}} / {{item.topAmount}}</span>
                <div class="progress-index" v-if="item.usedRate < 1" :style="{'background-color': '#00cc66', 'width': item.usedRate}"><span style="opacity: 0;filter: 0">1</span></div>
                <div class="progress-index" v-if="item.usedRate == 1" :style="{'background-color': '#ff9900', 'width': item.usedRate}"><span style="opacity: 0;filter: 0">1</span></div>
                <div class="progress-index" v-if="item.usedRate > 1" :style="{'background-color': '#ff0000', 'width': item.usedRate}"><span style="opacity: 0;filter: 0">1</span></div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="" align="left" width="180">
            <template scope="scope">
              <div v-for="item in scope.row.companyList" key={{item}} class="click-zone">
                <span @click="setPoint(item)" class="list-btn">设定点数警告上限</span>
                <span @click="changeStatus(item)" class="list-btn">{{item.status == 1 ? '停用' : '启用'}}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="point-warning" v-for="child of nowChild">
      <div class="belong-list">
        <p class="title">{{nowParent}}下级接入商</p>
        <el-table :data="child">
          <el-table-column label="序号" prop="rank" align="left" width="75" type="index">
          </el-table-column>
          <el-table-column label="类型" prop="" align="left" :formatter="formatRole" width="80">
          </el-table-column>
          <el-table-column label="接入商标识" align="left" width="120">
            <template scope="scope">
              <span>{{scope.row.sn ? scope.row.sn : scope.row.suffix}}</span>
            </template>
          </el-table-column>
          <el-table-column label="接入商昵称" prop="displayName" align="left" width="140">
          </el-table-column>
          <el-table-column label="接入商游戏" prop="" align="left" width="160">
            <template scope="scope">
              <div slot="reference" class="gameName">
                  <el-tag v-for="item in scope.row.companyList" key={{item}}>{{ item.company }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="游戏状态" prop="" align="left" width="100">
            <template scope="scope">
              <div slot="reference" class="gameStatus">
                  <el-tag v-for="item in scope.row.companyList" key={{item}}><span :class="[item.status == 0 ? 'red' : 'green']">{{ formatStatus(item.status) }}</span></el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="游戏点数消耗分布" prop="" align="left">
            <template scope="scope">
              <div slot="reference" style="margin: 8px 0;border:1px solid #000;border-radius: 15px;text-align:center" v-for="item in scope.row.companyList" key={{item}}>
                <span class="progress-content">{{item.winloseAmount}} / {{item.topAmount}}</span>
                <div class="progress-index" v-if="item.usedRate < 1" :style="{'background-color': '#00cc66', 'width': item.usedRate}"><span style="opacity: 0;filter: 0">1</span></div>
                <div class="progress-index" v-if="item.usedRate == 1" :style="{'background-color': '#ff9900', 'width': item.usedRate}"><span style="opacity: 0;filter: 0">1</span></div>
                <div class="progress-index" v-if="item.usedRate > 1" :style="{'background-color': '#ff0000', 'width': item.usedRate}"><span style="opacity: 0;filter: 0">1</span></div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="" align="left" width="180">
            <template scope="scope">
              <div v-for="item in scope.row.companyList" key={{item}} class="click-zone">
                <span @click="setPoint(item)" class="list-btn">设定点数警告上限</span>
                <span @click="changeStatus(item)" class="list-btn">{{item.status == 1 ? '停用' : '启用'}}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 解锁/启用框 -->
    <div>
      <el-dialog title="停用" :visible.sync="isVisible" size="tiny" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
        <div style="text-align:center">
          <p style="font-size:1.2rem">{{status == 1 ? '停用' : '启用'}}</p>
          <p style="margin:10px auto">确认要{{status == 1 ? '停用' : '启用'}}该接入商的{{forceGame.company}}游戏吗？</p>
          <p style="width:60%;margin:10px auto 20px;text-align:left;color:red" v-if="status == 1">警告: 停用后,该接入商下的所有玩家都无法进入游戏,已在游戏中的玩家会被系统T出游戏。</p>
          <div style="width:50%;margin:30px auto 10px;" class="clearFix">
            <el-button type="primary" style="float:left" @click="post_changeStatus(forceGame)" :loading="loading">确定</el-button>
            <el-button style="float:right" @click="cancel">取消</el-button>
          </div>
        </div>
      </el-dialog>
    </div>

    <!-- 设置预警点数 -->
    <div>
      <el-dialog title="预警点数" :visible.sync="isSetpoint" size="tiny" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
        <div>
          <p style="font-size:1.2rem;text-align:center">{{forceGame.company}}游戏</p>
          <p style="width:80%;margin: 20px auto">当前值 {{forceGame.winloseAmount}} / {{forceGame.topAmount}}</p>
          <div style="width:80%;margin: 20px auto">
            <span>设定值: {{forceGame.winloseAmount}} / </span>
            <el-input placeholder="请输入" v-model="nowWarningPoint" clearable style="width:50%"></el-input>
          </div>
          <div style="width:50%;margin:30px auto 10px;" class="clearFix">
            <el-button type="primary" style="float:left" @click="post_setPoint(forceGame)" :loading="loading">确定</el-button>
            <el-button style="float:right" @click="cancel">取消</el-button>
          </div>
        </div>
      </el-dialog>
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
      belongAgent: [],
      loading: false,
      isVisible: false, // 是否启用弹框
      forceGame: '', // 当前停用游戏信息
      status: '', // 弹框状态
      isSetpoint: false, // 是否启用设置点数
      nowWarningPoint: '', // 设置的阈值点
      clickChild: [], // 点击查询下级
      rendered: [], // 已渲染的下级
      nowParent: '', // 现在渲染的下级所属上级昵称
    }
  },
  computed: {
    allAgent () {
      return this.belongAgent
    },
    nowChild () {
      return this.clickChild
    }
  },
  methods: {
    getAll_agent () {
      this.$store.commit('startLoading')
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
          this.$store.commit('closeLoading')
        } else {
          var child = ret.data.payload
          for (let item of child) {

            // 五个组长度一致且一一对应
            let userId = [] // 用户ID组
            let allCompany = [] // 用户游戏大类组
            let status = [] // 用户游戏状态组
            let winloseAmount = [] // 用户游戏输赢组
            let topAmount = [] // 用户设定阈值

            for (let terval in item.winloseAmountMap) {
              item.gameList.map(bull => {
                terval == bull.code ? bull.winloseAmount = item.winloseAmountMap[terval].winloseAmount : ''
              })
            } // 将有数据的输赢push到相应游戏类别里

            item.gameList.map(side => {
              side.topAmount ? '' : side.topAmount = 0;
              allCompany.push(side.company)
              userId.push(item.userId)
              topAmount.push(side.topAmount)
              let isStart = 0
              side.status ? '' : side.status = 1
              if (side.status = 1) {
                isStart = 1
              }
              status.push(isStart)

              let count = ''
              count += side.winloseAmount ? side.winloseAmount : 0
              winloseAmount.push(count)
              
            }) // 获取运营商名称与启用/停用状态
            let ruler = []
            let companyList = [] // 处理后的要渲染的数据
            for (let i = 0;i < allCompany.length;i++) {
              if (ruler.indexOf(allCompany[i]) == -1) {
                ruler.push(allCompany[i])
                companyList.push({
                  company: allCompany[i],
                  status: status[i],
                  winloseAmount: Number(winloseAmount[i]),
                  topAmount: Number(topAmount[i]),
                  userId: userId[i],
                  usedRate: topAmount[i] != 0 && winloseAmount[i] != 0 ? (topAmount[i] / winloseAmount[i] * 100).toFixed(2) : 0
                })
              }
            } // 合并去重数据
            item.companyList ? '' : item.companyList = companyList
          }
          this.belongAgent = child
          this.$store.commit('closeLoading')
        }
      })
    },
    getChild (parent) {
      this.$store.commit('startLoading')
      this.nowParent = parent.displayName
      let data = {
        parent: parent.userId
      }
      let will_render = {
        parent: parent.parent,
        userId: parent.userId
      }
      if (this.rendered.length == 0) {
        this.rendered.push(will_render)
        invoke({
          url: api.reportInfo,
          method: api.post,
          data: data
        }).then(result => {
          const [err, ret] = result
          if (err) {
            this.$store.commit('closeLoading')
          } else {
            var child = ret.data.payload
            if (child.length > 0) {
              for (let item of child) {

                // 五个组长度一致且一一对应
                let userId = [] // 用户ID组
                let allCompany = [] // 用户游戏大类组
                let status = [] // 用户游戏状态组
                let winloseAmount = [] // 用户游戏输赢组
                let topAmount = [] // 用户设定阈值

                for (let terval in item.winloseAmountMap) {
                  item.gameList.map(bull => {
                    terval == bull.code ? bull.winloseAmount = item.winloseAmountMap[terval].winloseAmount : ''
                  })
                } // 将有数据的输赢push到相应游戏类别里

                item.gameList.map(side => {
                  side.topAmount ? '' : side.topAmount = 0;
                  allCompany.push(side.company)
                  userId.push(item.userId)
                  topAmount.push(side.topAmount)
                  let isStart = 0
                  side.status ? '' : side.status = 1
                  if (side.status = 1) {
                    isStart = 1
                  }
                  status.push(isStart)

                  let count = ''
                  count += side.winloseAmount ? side.winloseAmount : 0
                  winloseAmount.push(count)
                  
                }) // 获取运营商名称与启用/停用状态
                let ruler = []
                let companyList = [] // 处理后的要渲染的数据
                for (let i = 0;i < allCompany.length;i++) {
                  if (ruler.indexOf(allCompany[i]) == -1) {
                    ruler.push(allCompany[i])
                    companyList.push({
                      company: allCompany[i],
                      status: status[i],
                      winloseAmount: Number(winloseAmount[i]),
                      topAmount: Number(topAmount[i]),
                      userId: userId[i],
                      usedRate: topAmount[i] != 0 && winloseAmount[i] != 0 ? (topAmount[i] / winloseAmount[i] * 100).toFixed(2) : 0
                    })
                  }
                } // 合并去重数据
                item.companyList ? '' : item.companyList = companyList
              }
              this.clickChild.push([])
              this.clickChild[this.clickChild.length - 1] = child
              this.$store.commit('closeLoading')
            } else {
              this.$store.commit('closeLoading')
            }
          }
        })
      } else {
        if (this.rendered[this.rendered.length - 1].parent.userId == parent.parent) {
          this.rendered.push(will_render)
          invoke({
            url: api.reportInfo,
            method: api.post,
            data: data
          }).then(result => {
            const [err, ret] = result
            if (err) {
              this.$store.commit('closeLoading')
            } else {
              var child = ret.data.payload
              if (child.length > 0) {
                for (let item of child) {

                  // 五个组长度一致且一一对应
                  let userId = [] // 用户ID组
                  let allCompany = [] // 用户游戏大类组
                  let status = [] // 用户游戏状态组
                  let winloseAmount = [] // 用户游戏输赢组
                  let topAmount = [] // 用户设定阈值

                  for (let terval in item.winloseAmountMap) {
                    item.gameList.map(bull => {
                      terval == bull.code ? bull.winloseAmount = item.winloseAmountMap[terval].winloseAmount : ''
                    })
                  } // 将有数据的输赢push到相应游戏类别里

                  item.gameList.map(side => {
                    side.topAmount ? '' : side.topAmount = 0;
                    allCompany.push(side.company)
                    userId.push(item.userId)
                    topAmount.push(side.topAmount)
                    let isStart = 0
                    side.status ? '' : side.status = 1
                    if (side.status = 1) {
                      isStart = 1
                    }
                    status.push(isStart)

                    let count = ''
                    count += side.winloseAmount ? side.winloseAmount : 0
                    winloseAmount.push(count)
                    
                  }) // 获取运营商名称与启用/停用状态
                  let ruler = []
                  let companyList = [] // 处理后的要渲染的数据
                  for (let i = 0;i < allCompany.length;i++) {
                    if (ruler.indexOf(allCompany[i]) == -1) {
                      ruler.push(allCompany[i])
                      companyList.push({
                        company: allCompany[i],
                        status: status[i],
                        winloseAmount: Number(winloseAmount[i]),
                        topAmount: Number(topAmount[i]),
                        userId: userId[i],
                        usedRate: topAmount[i] != 0 && winloseAmount[i] != 0 ? (topAmount[i] / winloseAmount[i] * 100).toFixed(2) : 0
                      })
                    }
                  } // 合并去重数据
                  item.companyList ? '' : item.companyList = companyList
                }
                this.clickChild.push([])
                this.clickChild[this.clickChild.length - 1] = child
                this.$store.commit('closeLoading')
              } else {
                this.$store.commit('closeLoading')
              }
            }
          })
        } else {
          this.rendered = []
          this.clickChild = []
          this.rendered.push(will_render)
          invoke({
            url: api.reportInfo,
            method: api.post,
            data: data
          }).then(result => {
            const [err, ret] = result
            if (err) {
              this.$store.commit('closeLoading')
            } else {
              var child = ret.data.payload
              if (child.length > 0) {
                for (let item of child) {

                  // 五个组长度一致且一一对应
                  let userId = [] // 用户ID组
                  let allCompany = [] // 用户游戏大类组
                  let status = [] // 用户游戏状态组
                  let winloseAmount = [] // 用户游戏输赢组
                  let topAmount = [] // 用户设定阈值

                  for (let terval in item.winloseAmountMap) {
                    item.gameList.map(bull => {
                      terval == bull.code ? bull.winloseAmount = item.winloseAmountMap[terval].winloseAmount : ''
                    })
                  } // 将有数据的输赢push到相应游戏类别里

                  item.gameList.map(side => {
                    side.topAmount ? '' : side.topAmount = 0;
                    allCompany.push(side.company)
                    userId.push(item.userId)
                    topAmount.push(side.topAmount)
                    let isStart = 0
                    side.status ? '' : side.status = 1
                    if (side.status = 1) {
                      isStart = 1
                    }
                    status.push(isStart)

                    let count = ''
                    count += side.winloseAmount ? side.winloseAmount : 0
                    winloseAmount.push(count)
                    
                  }) // 获取运营商名称与启用/停用状态
                  let ruler = []
                  let companyList = [] // 处理后的要渲染的数据
                  for (let i = 0;i < allCompany.length;i++) {
                    if (ruler.indexOf(allCompany[i]) == -1) {
                      ruler.push(allCompany[i])
                      companyList.push({
                        company: allCompany[i],
                        status: status[i],
                        winloseAmount: Number(winloseAmount[i]),
                        topAmount: Number(topAmount[i]),
                        userId: userId[i],
                        usedRate: topAmount[i] != 0 && winloseAmount[i] != 0 ? (topAmount[i] / winloseAmount[i] * 100).toFixed(2) : 0
                      })
                    }
                  } // 合并去重数据
                  item.companyList ? '' : item.companyList = companyList
                }
                this.clickChild.push([])
                this.clickChild[this.clickChild.length - 1] = child
                this.$store.commit('closeLoading')
              } else {
                this.$store.commit('closeLoading')
              }
            }
          })
        }
      }
    },
    formatRole (data) {
      return '代理'
    },
    formatStatus (data) {
      if (data == '1') {
        return '正常'
      } else {
        return '已停用'
      }
    },
    changeStatus (game) {
      this.forceGame = game
      this.status = game.status
      this.isVisible = true
    },
    post_changeStatus (data) {
      let obj = this.belongAgent.filter(item => {return item.userId == data.userId})[0]
      this.loading = true
      obj.companyList.map(item => {
        if (item.company == data.company) {
          item.status == 1 ? item.status = 0 : item.status = 1
        } 
      })
      invoke({
        url: api.userStatus,
        method: api.post,
        data: {
          userId: obj.userId,
          companyList: obj.companyList
        }
      }).then(result => {
        const [err, ret] = result
          if (err) {
            this.loading = false
          } else {
            var data = ret.data.payload
            this.loading = false
            this.isVisible = false
            this.getAll_agent()
            this.$message({
            type: 'success',
              message: '操作成功'
            })
            this.isVisible = false
          }
        }
      )
    },
    cancel () {
      this.$message({
        type: 'info',
        message: '已取消'
      })
      this.isVisible = false
      this.isSetpoint = false
      this.nowWarningPoint = ''
    },
    setPoint (game) {
      this.forceGame = game
      this.isSetpoint = true
    },
    post_setPoint (data) {
      if (this.nowWarningPoint && !isNaN(this.nowWarningPoint && Number(this.nowWarningPoint) > 0)) {
        let obj = this.belongAgent.filter(item => {return item.userId == data.userId})[0]
        this.loading = true
        obj.companyList.map(item => {
          if (item.company == data.company) {
            item.topAmount = this.nowWarningPoint
            item.usedRate = item.topAmount != 0 && item.winloseAmount > 0 ? (item.topAmount / item.winloseAmount * 100).toFixed(2) : 0
          }
        })
        invoke({
          url: api.userStatus,
          method: api.post,
          data: {
            userId: obj.userId,
            companyList: obj.companyList
          }
        }).then(result => {
          const [err, ret] = result
            if (err) {
              this.nowWarningPoint = ''
              this.loading = false
            } else {
              var data = ret.data.payload
              this.loading = false
              this.isVisible = false
              this.getAll_agent()
              this.$message({
              type: 'success',
                message: '操作成功'
              })
              this.isSetpoint = false
              this.nowWarningPoint = ''
            }
          }
        )
      } else {
        this.$message({
          type: 'warning',
          message: '请设置正确的预警点数'
        })
      }
    }
  }
}
</script>

<style scpoed>
.point-warning{margin-bottom: 2rem}
.point-warning .belong-list{width: 99%;margin: 0 auto}
.point-warning .belong-list .title{font-size: 1.5rem;margin: 0 0 0.5rem 0;font-weight: 600;}
.point-warning .belong-list .gameName span{width: 100%;text-align: left;margin: 5px 0;background-color: #fff;color: #000}
.point-warning .belong-list .gameStatus span{width: 100%;text-align: left;margin: 5px 0;background-color: #fff}

.point-warning .belong-list .progress{
  margin:5.5px;
  border-radius: 20px;
}
.point-warning .belong-list .progress-content{

}
.point-warning .belong-list .click-zone{margin: 10px 0;}
.point-warning .belong-list .list-btn{color: #409EFF;cursor: pointer;}
.point-warning .belong-list .list-btn:hover{text-decoration: underline}


.point-warning .belong-list .progress-content{
  color: #000;
}
.point-warning .belong-list .progress-index{
  margin-top: -24px;
  width: 50%;
  border-radius: 15px
}

.point-warning .belong-list .fontUrl{cursor: pointer;color: #20a0ff}
.point-warning .belong-list .fontUrl:hover{text-decoration: underline;}

/*.progress-green:{background-color: #00cc66}
.progress-yellow:{background-color: #ff9900}
.progress-red:{background-color: #ff0000}*/

.clearFix:after {clear:both;content:'.';display:block;width: 0;height: 0;visibility:hidden;}

.green{color: #00CC00}
.red{color: #FF3300}
</style>
