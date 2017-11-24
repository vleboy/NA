<template>
  <div>
    <div class="searchbox">
      <el-form :inline="true" label-width='130px' label-position="right">
        <el-form-item :label="searchTitle.titleOne">
          <el-input class="input" placeholder="请输入" v-model="condition.condition_one" ></el-input>
        </el-form-item>
        <el-form-item :label="searchTitle.titleTwo">
          <el-input class="input" placeholder="请输入" v-model="condition.condition_two" ></el-input>
        </el-form-item>
        <div class="searchBtn">
          <el-button type="primary" @click="startSearch">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
          <el-button type="text" @click="show = !show" v-show="show">收起 <i class="el-icon-arrow-down"></i></el-button>
          <el-button type="text" @click="show = !show" v-show="!show">展开 <i class="el-icon-arrow-up"></i></el-button>
        </div>
        <el-collapse-transition>
              <div v-if="show" class="moreBox">
                <el-form-item :label="searchTitle.titleThree">
              <el-input class="input" placeholder="请输入" v-model="condition.condition_three" ></el-input>
            </el-form-item>
            <el-form-item :label="searchTitle.titleFour">
              <el-date-picker class="input" v-model="condition.condition_four" type="daterange" placeholder="选择日期时间范围" :editable="false"></el-date-picker>
            </el-form-item>
          </div>
        </el-collapse-transition>
      </el-form>
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
      condition_four: ''
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
        condition_four: ''
      }
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
        titleOne: '代理管理员标识',
        titleTwo: '代理管理员昵称',
        titleThree: '代理管理员用户名',
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
        titleOne: '代理昵称',
        titleTwo: '代理账号',
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
        titleOne: '代理昵称',
        titleTwo: '代理标识',
        titleThree: '最后登录IP',
        titleFour: '最后登录时间'
      }
    }
  },
  methods: {
    startSearch () {
      if (!this.condition.condition_one && !this.condition.condition_two && !this.condition.condition_three && !this.condition.condition_four) {
        // console.log(this.condition)
        this.$message({
          message: '请输入搜索条件',
          type: 'warning'
        })
      } else {
        this.$store.commit({
          type: 'postSearch_conditon',
          data: this.condition
        })
        if (this.nowindex === 'outlist') {
          this.$store.commit('searchOutlist')
        } else if (this.nowindex === 'comlist') {
          this.$store.commit('searchComlist')
        }
      }
    },
    resetSearch () {
      this.condition = {
        condition_one: '',
        condition_two: '',
        condition_three: '',
        condition_four: ''
      }
      if (this.nowindex === 'outlist') {
        this.$store.dispatch('getOutlist')
      } else if (this.nowindex === 'comlist') {
        this.$store.dispatch('getComlist')
      }
    }
  }
}
</script>

<style scoped>
.searchbox{text-align: center;padding-top: 2rem;background-color: #f5f5f5;height: 8rem;margin-top: 0.2rem}
.searchbox .searchBtn{display: inline-block;}
.searchbox .moreBox{margin-left: -14rem;}
.searchbox .input{width: 15rem}
.searchCount{text-align: left;margin-left: 0.5rem;margin-top: 0.5rem;font-size: 0.8rem}
</style>
