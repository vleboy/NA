<template>
  <div>
    <div class="searchbox">

      <el-row>
        <el-col :span="4">
          <span class="hidden">1</span>
        </el-col>
        <el-col :span="2">
          <span v-text="searchTitle.titleOne" class="input_label"></span>
        </el-col>
        <el-col :span="4">
          <div class="">
            <el-input placeholder="请输入" v-model="condition.condition_one" ></el-input>
          </div>
        </el-col>
        <el-col :span="2">
          <span v-text="searchTitle.titleTwo" class="input_label"></span>
        </el-col>
        <el-col :span="4">
          <div class="">
            <el-input placeholder="请输入" v-model="condition.condition_two" ></el-input>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="searchBtn">
            <el-button type="primary" @click="startSearch">搜索</el-button>
            <el-button @click="resetSearch">重置</el-button>
            <el-button type="text" @click="show = !show" v-show="show">收起 <i class="el-icon-arrow-up"></i></el-button>
            <el-button type="text" @click="show = !show" v-show="!show">展开 <i class="el-icon-arrow-down"></i></el-button>
          </div>
        </el-col>
        <el-col :span="4">
          <span class="hidden">1</span>
        </el-col>
      </el-row>

      <el-collapse-transition>
        <el-row v-if="show">
        <el-col :span="4">
          <span class="hidden">1</span>
        </el-col>
        <el-col :span="2">
          <span v-text="searchTitle.titleThree" class="input_label"></span>
        </el-col>
        <el-col :span="4">
          <div class="">
            <el-input placeholder="请输入" v-model="condition.condition_three" ></el-input>
          </div>
        </el-col>
        <el-col :span="2">
          <span v-text="searchTitle.titleFour" class="input_label"></span>
        </el-col>
        <el-col :span="5">
          <el-date-picker v-model="condition.condition_four" type="datetimerange" placeholder="选择日期时间范围" :editable="false"></el-date-picker>
        </el-col>
        <el-col :span="5">
          <span class="hidden">1</span>
        </el-col>
      </el-row>
      </el-collapse-transition>

    </div>

    <div>
      <div class="searchCount" v-if="this.nowindex === 'outlist'">共搜索到 <span v-text="this.$store.state.variable.outlist.length"></span> 条数据</div>

      <div class="searchCount" v-if="this.nowindex === 'comlist'">共搜索到 <span v-text="this.$store.state.variable.comlist.length"></span> 条数据</div>
    </div>

  </div>
  
</template>

<script>
export default {
  name: 'searchbox',
  beforeCreate () {
    this.condition = {
      condition_one: '',
      condition_two: '',
      condition_three: '',
      condition_four: []
    }
  },
  computed: {
    nowindex () {
      return this.$store.state.variable.nowIndex
    }
  },
  data () {
    return {
      show: false, // 搜索框样式
      searchTitle: {
        titleOne: '',
        titleTwo: '',
        titleThree: '',
        titleFour: ''
      },
      condition: {
        condition_one: '',
        condition_two: '',
        condition_three: '',
        condition_four: []
      }
    }
  },
  watch: {
    'condition.condition_one' (val) {
      this.$store.commit({
        type: 'postSearch_conditon',
        data: this.condition
      })
    },
    'condition.condition_two' (val) {
      this.$store.commit({
        type: 'postSearch_conditon',
        data: this.condition
      })
    },
    'condition.condition_three' (val) {
      this.$store.commit({
        type: 'postSearch_conditon',
        data: this.condition
      })
    },
    'condition.condition_four' (val) {
      this.$store.commit({
        type: 'postSearch_conditon',
        data: this.condition
      })
    }
  },
  mounted () {
    if (this.$store.state.variable.nowIndex === 'outlist') {
      this.searchTitle = {
        titleOne: '线路商标识',
        titleTwo: '线路商昵称',
        titleThree: '线路商Email',
        titleFour: '创建时间'
      }
    } else if (this.$store.state.variable.nowIndex === 'comlist') {
      this.searchTitle = {
        titleOne: '商户标识',
        titleTwo: '商户线路号',
        titleThree: '商户昵称',
        titleFour: '创建时间'
      }
    } else if (this.$store.state.variable.nowIndex === 'adminlist') {
      this.searchTitle = {
        titleOne: '用户名',
        titleTwo: '真实姓名',
        titleThree: '管理员Email',
        titleFour: '创建时间'
      }
    } else if (this.$store.state.variable.nowIndex === 'managerloginlist') {
      this.searchTitle = {
        titleOne: '线路商标识',
        titleTwo: '线路商昵称',
        titleThree: '最后登录IP',
        titleFour: '最后登录时间'
      }
    } else if (this.$store.state.variable.nowIndex === 'admindate') {
      this.searchTitle = {
        titleOne: '用户名',
        titleTwo: '真实姓名',
        titleThree: '管理员Email',
        titleFour: '创建时间'
      }
    } else if (this.$store.state.variable.nowIndex === 'merchantloginlist') {
      this.searchTitle = {
        titleOne: '商户标识',
        titleTwo: '商户昵称',
        titleThree: '最后登录IP',
        titleFour: '最后登录时间'
      }
    }
  },
  methods: {
    startSearch () {
      this.$store.commit('resetPage')
      if (this.condition.condition_four) {
        for (var i = this.condition.condition_four.length - 1; i >= 0; i--) {
          if (isNaN(this.condition.condition_four[i].toString())) {
            this.condition.condition_four[i] = new Date(this.condition.condition_four[i].toString()).getTime()
          }
        }
      }
      this.$store.commit({
        type: 'postSearch_conditon',
        data: this.condition
      })
      if (this.nowindex === 'outlist') {
        this.$store.dispatch('getOutlist')
      } else if (this.nowindex === 'comlist') {
        this.$store.dispatch('getComlist')
      } else if (this.nowindex === 'managerloginlist') {
        this.$store.commit('searchManagerloginlist')
      } else if (this.nowindex === 'merchantloginlist') {
        this.$store.commit('searchMerchantloginlist')
      } else if (this.nowindex === 'adminlist') {
        this.$store.dispatch('getAdminlist')
      }
    },
    resetSearch () {
      this.$store.commit('resetPage')
      this.condition = {
        condition_one: '',
        condition_two: '',
        condition_three: '',
        condition_four: []
      }
      this.$store.commit({
        type: 'postSearch_conditon',
        data: {}
      })
      if (this.nowindex === 'outlist') {
        this.$store.dispatch('getOutlist')
      } else if (this.nowindex === 'comlist') {
        this.$store.dispatch('getComlist')
      } else if (this.nowindex === 'managerloginlist') {
        this.$store.dispatch('getManager_LoginList')
      } else if (this.nowindex === 'merchantloginlist') {
        this.$store.dispatch('getMerchant_LoginList')
      } else if (this.nowindex === 'adminlist') {
        this.$store.dispatch('getAdminlist')
      }
    }
  }
}
</script>

<style scoped>
.searchbox .hidden{opacity: 0;}
.searchbox{text-align: center;padding-top: 2rem;background-color: #f5f5f5;min-height: 9rem;margin-top: 0.2rem}
.searchbox .input_label{line-height: 2.5rem}
.searchbox .searchBtn{display: inline-block;}
.searchbox .moreBox{margin-left: -14rem;}
.searchbox .input{width: 15rem}
.searchCount{text-align: left;margin-left: 0.5rem;margin-top: 0.5rem;font-size: 0.8rem}
</style>
