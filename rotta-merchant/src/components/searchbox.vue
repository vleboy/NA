<template>
  <div>
    <div class="searchbox">
      <el-form :inline="true" label-width='110px' label-position="right">
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
              <el-date-picker class="input" v-model="condition.condition_four" type="daterange" placeholder="选择日期范围" :editable="false"></el-date-picker>
            </el-form-item>
          </div>
        </el-collapse-transition>
      </el-form>
    </div>
    <div class="searchCount" v-if="this.nowindex === 'outlist'">共搜索到 <span v-text="this.$store.state.variable.outlist.length"></span> 条数据</div>
    <div class="searchCount" v-if="this.nowindex === 'comlist'">共搜索到 <span v-text="this.$store.state.variable.comlist.length"></span> 条数据</div>
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
        titleOne: '商户标识',
        titleTwo: '商户昵称',
        titleThree: '商户Email',
        titleFour: '创建时间'
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
.searchBtn{display: inline-block;}
.moreBox{margin-left: -12.3rem;}
.input{width: 15rem}
.searchCount{text-align: left;margin-left: 0.5rem;margin-top: 0.5rem;font-size: 0.8rem}
</style>
