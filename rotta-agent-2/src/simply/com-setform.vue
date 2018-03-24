<template>
<div>
  <div class="com-setform">
    <h2 class="title">配置代理信息</h2>
    <el-form :model="setcomInfo" :rules="rules" ref="setcomInfo" class="setform" label-width="160px" label-position="right">
      <el-form-item label="代理拥有的游戏">
        <el-select v-model="setcomInfo.company" placeholder="请选择" clearable style="width:10rem;margin-right:0.5rem" @change="changeCompany">
            <el-option v-for="(item,index) in CompanyList" :key="index" :label="item.client" :value="item.server" style="width:10rem"></el-option>
        </el-select>

        <el-select v-model="setcomInfo.selectGame" placeholder="请选择" clearable style="width:10rem;">
            <el-option v-for="(item,index) in CompanyGame" :key="index" :label="item.name" :value="item.code" style="width:10rem"></el-option>
        </el-select>

      </el-form-item>

      <el-form-item :label="secondGameList.name + '洗码比(%)'" v-show="setcomInfo.selectGame" prop="selectGame">
        <el-tooltip class="item" effect="dark" :content="'该上级代理' + secondGameList.name + '洗码比为' + parentMix + '%'" placement="top">
          <el-input class="input" type="number" placeholder="0.00~1.00,最大不超过其上级洗码比" v-model="secondGameList.mix"></el-input>
        </el-tooltip>
        <el-button type="text" @click="addGame">添加</el-button>
      </el-form-item>

      <el-form-item label="" prop="username" style="width: 45rem;margin-left:-8rem">
        <el-table :data="setcomInfo.showSelect" border>
          <el-table-column prop="company" align="center" label="公司"></el-table-column>
          <el-table-column prop="gameName" align="center" label="游戏">
          </el-table-column>
          <el-table-column prop="mix" align="center" label="洗码比">
            <template scope="scope">
              <span>{{scope.row.mix}}%</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template scope="scope">
              <span @click="deleteGame(scope.row)" style="color: #20a0ff;cursor: pointer">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="代理点数" prop="points">
        <el-tooltip class="item" effect="dark" :content="parentBills" placement="right">
          <el-input v-model="setcomInfo.points" class="input" placeholder="请输入点数,最大不超过其上级拥有点数"></el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="代理成数(%)" prop="rate">
        <el-tooltip class="item" effect="dark" :content="parentRate" placement="right">
          <el-input v-model="setcomInfo.rate" class="input" placeholder="0.00~100.00,最大不超过其上级成数"></el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="代理限红" v-if="setcomInfo.company">
        <el-checkbox-group v-model="checkChipList" v-if="chipList.length">
          <el-checkbox v-for="item of chipList" :label="item.id" style="margin-left: 0">
            {{item.text}}
          </el-checkbox>
        </el-checkbox-group>
        <div v-else>该代理暂无限红数据</div>
      </el-form-item>
    </el-form>
  </div>
  <div>
    <createbtn class="Noprint" :setcomInfo="setcomInfo" @on-result-change="resetForm" @submitAddAgent= 'addAgent'></createbtn>
  </div>
</div>

</template>

<script type="text/ecmascript-6">
import store from '@/store/store'
import {invoke} from '@/libs/fetchLib'
import api from '@/api/api'
import Createbtn from '@/components/createbtn'
import { checkPoints, checkRate } from '@/behavior/regexp'
export default {
  name: 'out-setform',
  data () {
    var checkMix = (rule, value, callback) => {
      var num = new RegExp(/^[0|1](\.[0-9]{1,2}){0,1}$/)
      if (!(this.parentMix.length > 3)) {
        this.parentMix = `${this.parentMix}`
      }
      if (!this.secondGameList.mix) {
        callback(new Error('请输入洗码比'))
      } else if (!num.test(this.secondGameList.mix) || this.secondGameList.mix > this.parentMix) {
        console.log(this.secondGameList.mix,this.parentMix)
        callback(new Error('超过上级洗码比'))
        this.isPassMix = false
      } else {
        this.isPassMix = true
        callback()
      }
    }

    var checkRate = (rule, value, callback) => {
      var num = new RegExp(/^(\d{1,2}(\.\d{1,2})?|100(\.0{1,2})?)$/)
      // console.log(value)
      if (value === '') {
        callback(new Error('请输入成数'))
        this.$store.state.checkform.rate = false
      } else if (!num.test(value)) {
        callback(new Error('成数只能为0.00 - 100.00'))
        this.$store.state.checkform.rate = false
      } else if (value < 0 || value > 100) {
        callback(new Error('成数应为0~100之间的数字'))
        this.$store.state.checkform.rate = false
      } else if (Number(value) > Number(this.$store.state.variable.comparentBills.rate)) {
        callback(new Error('所属代理成数已超过最大可分配额'))
        this.$store.state.checkform.rate = false
      } else {
        this.$store.state.checkform.rate = true
        callback()
      }
    } // 验证成数

    var checkPoints = (rule, value, callback) => {
      var num = new RegExp(/^[0-9]/)
      if (value === '') {
        callback(new Error('请输入初始点数'))
        this.$store.state.checkform.points = false
      } else if (!num.exec(value)) {
        callback(new Error('请输入正确的点数'))
        this.$store.state.checkform.points = false
      } else if (Number(value) > Number(this.$store.state.variable.comparentBills.balance)) {
        callback(new Error('所属账户已超过最大可分配额'))
        this.$store.state.checkform.points = false
      } else {
        this.$store.state.checkform.points = true
        callback()
      }
    } // 验证初始分配点数
    return {
      isPassMix: true, // 验证洗码比
      parentMix: '', // 上级洗码比
      CompanyList: [], // 游戏大类列表
      CompanyGame: [], // 厂商的游戏列表
      setcomInfo: {
        company: '', // 选择的游戏厂商
        selectGame: '', // 选择的厂商的游戏
        showSelect: [], // 列表展示数据
        gameList: [], // 代理游戏
        points: '', // 代理点数
        rate: '' // 代理抽成比
      },
      rules: {
        points: [
          {validator: checkPoints, trigger: 'blur'}
        ],
        rate: [
          {validator: checkRate, trigger: 'blur'}
        ],
        selectGame: [
          {validator: checkMix, trigger: 'blur'}
        ]
      },
      chipList: [],
      checkChipList: [],
      secondGameList: {}
    }
  },
  components: {
    Createbtn
  },
  beforeCreate () {
    localStorage.setItem('nowGameList', false)
  },
  computed: {
    parentBills () {
      return '上级代理余额为:' + this.$store.state.variable.comparentBills.balance
    },
    parentRate () {
      return '上级代理成数为:' + this.$store.state.variable.comparentBills.rate + '%'
    }
  },
  mounted () {
    this.$store.dispatch('getcomParentBills')
    var data = {
      parent: ''
    }
    if (this.$store.state.variable.comcreate.parent === '') {
      data.parent = '01'
    } else {
      data.parent = this.$store.state.variable.comcreate.parent
    }
    invoke({
      url: api.companySelect,
      method: api.post,
      data: data
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
        } else {
          var data = ret.data.payload
          for (let item of data) {
            item.client = item.client + '游戏'
          }
          this.CompanyList = data
        }
      }
    )
  },
  watch: {
    'setcomInfo.company' (val) {
      if (val) {
        this.CompanyGame = []
        this.setcomInfo.selectGame = ''
        let data = {
          companyIden: val
        }
        this.$store.state.variable.comcreate.parent == '01' ? '' : data.userId = this.$store.state.variable.comcreate.parent
        invoke({
          url: api.gameBigType,
          method: api.post,
          data: data
        }).then(
          result => {
            const [err, ret] = result
            if (err) {
            } else {
              var data = ret.data.payload
              this.CompanyGame = data
            }
          }
        )
      } else {
        this.CompanyGame = []
        this.setcomInfo.selectGame = ''
      }
    },
    'setcomInfo.selectGame' (val) {
      for (let item of this.CompanyGame) {
        if (item.code == val) {
          this.secondGameList = item
        }
      }
      if (this.secondGameList) {
        let data = {
          code: this.secondGameList.code,
          userId: ''
        }
        if (this.$store.state.variable.comcreate.parent == '01') {
          data.userId = localStorage.loginId
        } else {
          data.userId = this.$store.state.variable.comcreate.parent
        }
        invoke({
          url: api.checkAgentMix,
          method: api.post,
          data: data
        }).then(
          result => {
            const [err, ret] = result
            if (err) {
            } else {
              var data = ret.data.payload.mix
              this.parentMix = data
            }
          }
        )
      }
    },
    'setcomInfo.gameList.length' (val) {
      if (val && val > 0) {
        localStorage.setItem('nowGameList', true)
      } else {
        localStorage.setItem('nowGameList', false)
      }
    }
  },
  methods: {
    resetForm (val) {
      this.setcomInfo = val
    },
    addGame () {
      if (this.setcomInfo.company && this.secondGameList && this.secondGameList.mix && this.isPassMix) {
        let data = {
          company: this.setcomInfo.company,
          gameName: this.secondGameList.name,
          mix: this.secondGameList.mix
        }
        if (this.setcomInfo.showSelect.length == 0) {
          let select = this.secondGameList
          select.company = this.setcomInfo.company
          this.setcomInfo.gameList.push(select)
          this.setcomInfo.showSelect.push(data)
        } else {
          let repeat = false
          for (let item of this.setcomInfo.showSelect) {
            if (item.gameName == data.gameName) {
              repeat = true
              this.$message({
                type: 'info',
                message: '您已选择该游戏'
              })
            }
          }
          if (!repeat) {
            let select = this.secondGameList
            select.company = this.setcomInfo.company
            this.setcomInfo.gameList.push(select)
            this.setcomInfo.showSelect.push(data)
          }
        }
      } else {
        this.$message({
          type: 'warning',
          message: '请完善选择游戏！'
        })
      }
    },
    deleteGame (data) {
      this.setcomInfo.showSelect = this.setcomInfo.showSelect.filter(item => {
        return item.gameName != data.gameName
      })
      this.setcomInfo.gameList = this.setcomInfo.gameList.filter(item => {
        return item.name != data.gameName
      })
    },
    getChipList () {
      this.$store.commit('startLoading')
      invoke({
        url: api.chipList,
        method: api.post,
        data: {
          parentId: this.$store.state.variable.comcreate.parent == '01' ? '' : this.$store.state.variable.comcreate.parent
        }
      }).then(
        result => {
          const [err, ret] = result
          if (err) {
          } else {
            for (let item of ret.data.list) {
              this.chipList.push({
                id: item.id,
                text:`${item.gameId == 1 ? '百家乐' : '轮盘'}，最大：${item.max}，最小：${item.min}，筹码：${item.jtton}`,
                value: item
              })
            }
          }
        }
      )
      this.$store.commit('closeLoading')
    },
    changeCompany(){
      this.chipList = []
      this.setcomInfo.company && this.getChipList()
    },
    addAgent () {
      if (this.setcomInfo.gameList.length != 0 && this.setcomInfo.points && this.setcomInfo.rate) {
        let data = this.setcomInfo
        for (let outside of data.gameList) {
          for (let inside of this.CompanyList) {
            if (outside.company == inside.server) {
              outside.companyName = inside.companyName
            }
          }
        }
        delete data.selectGame
        delete data.showSelect
        delete data.company
        this.$store.commit({
          type: 'recordComcreate',
          data: data
        })
        var comcreate = this.$store.state.variable.comcreate
        let storageChipList = []
        for (let item of this.checkChipList) {
          for (let data of this.chipList) {
            if(item == data.id){
              storageChipList.push(data.value)
            }
          }
        }
        comcreate.chip = storageChipList // 处理限红 只有这么骚操作了
        invoke({
          url: api.createUser,
          method: api.post,
          data: comcreate
        }).then(
          result => {
            const [err, ret] = result
            if (err) {
            } else {
              var data = ret.data.payload
              this.$store.commit({
                type: 'recordComsuccess',
                data: data
              })
            }
          }
        )
      }
    }
  }
}
</script>

<style scoped>
.com-setform{width:42rem;margin: 0 auto;}
.com-setform .title{font-weight: normal;color: #5a5a5a;margin: 1rem 0 2rem 0;text-align: center;margin-left: -35rem}
.com-setform .input{width: 21rem}
@media print {
  .Noprint{ display: none }
}
</style>
