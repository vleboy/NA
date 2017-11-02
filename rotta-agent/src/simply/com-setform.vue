<template>
<div>
  <div class="com-setform">
    <h2 class="title">配置代理信息</h2>
    <el-form :model="setcomInfo" :rules="rules" ref="setcomInfo" class="setform" label-width="160px" label-position="right">
      <el-form-item label="代理游戏">
        <el-select v-model="setcomInfo.gameList" multiple placeholder="请选择" clearable class="input">
            <el-option v-for="item in allGames" :key="item" :label="item.name" :value="item" style="max-width:336px"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="代理点数" prop="points">
        <el-tooltip class="item" effect="dark" :content="parentBills" placement="right">
          <el-input v-model="setcomInfo.points" class="input" placeholder="请输入"></el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="代理成数(%)" prop="rate">
            <el-tooltip class="item" effect="dark" :content="parentRate" placement="right">
              <el-input v-model="setcomInfo.rate" class="input" placeholder="请输入"></el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="电子游戏洗码比(%)" prop="vedioMix">
            <el-tooltip class="item" effect="dark" :content="parentVedioMix" placement="right">
              <el-input v-model="setcomInfo.vedioMix" class="input" placeholder="请输入"></el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="真人视讯洗码比(%)" prop="liveMix">
            <el-tooltip class="item" effect="dark" :content="parentLiveMix" placement="right">
              <el-input v-model="setcomInfo.liveMix" class="input" placeholder="请输入"></el-input>
            </el-tooltip>
          </el-form-item>
    </el-form>
  </div>
  <div>
    <createbtn class="Noprint" :setcomInfo="setcomInfo" @on-result-change="resetForm"></createbtn>
  </div>
</div>
  
</template>

<script>
import store from '@/store/store'
import {invoke} from '@/libs/fetchLib'
import api from '@/api/api'
import Createbtn from '@/components/createbtn'
import { checkPoints, checkRate, checkLivemix, checkVediomix } from '@/behavior/regexp'
export default {
  name: 'out-setform',
  components: {
    Createbtn
  },
  beforeCreate () {
    store.state.checkform.loginWhitelist = true
  },
  computed: {
    parentBills () {
      return '上级代理余额为:' + this.$store.state.variable.comparentBills.balance
    },
    parentVedioMix () {
      return '上级代理电子游戏洗码比为:' + this.$store.state.variable.comparentBills.vedioMix + '%'
    },
    parentLiveMix () {
      return '上级代理真人游戏洗码比为:' + this.$store.state.variable.comparentBills.liveMix + '%'
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
      url: api.allGames,
      method: api.post,
      data: data
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
        } else {
          var data = ret.data.payload
          this.allGames = data
        }
      }
    )
  },
  data () {
    return {
      allGames: [], // 所有游戏
      setcomInfo: {
        gameList: [], // 代理游戏
        points: '', // 代理点数
        rate: '', // 代理抽成比
        liveMix: '', // 真人洗码比
        vedioMix: '' // 电子洗码比
      },
      rules: {
        points: [
          {validator: checkPoints, trigger: 'blur'}
        ],
        rate: [
          {validator: checkRate, trigger: 'blur'}
        ],
        liveMix: [
          {validator: checkLivemix, trigger: 'blur'}
        ],
        vedioMix: [
          {validator: checkVediomix, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    resetForm (val) {
      this.setcomInfo = val
    }
    // randomPassword () {
    //   var newpassword = randomPassword()
    //   this.setcomInfo.password = newpassword
    //   store.state.checkform.password = true
    // }
  },
  beforeDestroy () {
    this.$store.commit({
      type: 'recordComcreate',
      data: this.setcomInfo
    })
    var comcreate = this.$store.state.variable.comcreate
    // console.log('注册提交前的数据是', comcreate)
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
          // console.log('注册代理成功后返回数据是:', data)
          this.$store.commit({
            type: 'recordComsuccess',
            data: data
          })
        }
      }
    )
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
