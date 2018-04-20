<template>
  <div class="searchbox">
		<div class="boxpre">
      <el-row>
        <el-col :span="10">
          <span>供应商名称: </span>
          <el-input placeholder="请输入" class="input" v-model="boxContent.companyName"></el-input>
        </el-col>
        <el-col :span="10">
          <span>供应商标识: </span>
          <el-input placeholder="请输入" class="input" v-model="boxContent.companyIden"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" class="justfy1" @click="startSearch">搜索</el-button>
          <el-button @click="clearall">重置</el-button>
        </el-col>
      </el-row>
		</div>
	</div>
</template>

<script>
export default {
  name: 'searchbox',
  data () {
    return {
      show: false,
      boxContent: {
        companyIden: '', // 标识
        companyName: '', // 供应商名称
        companyType: '', // 类型
        companyStatus: '' // 状态
      }
    }
  },
  methods: {
    clearall () {
      this.boxContent = {
        companyIden: '', // 标识
        companyName: '', // 供应商名称
        companyType: '', // 类型
        companyStatus: '' // 状态
      }
      this.$store.dispatch('getOperatorList')
    },
    startSearch () {
      this.$store.commit({
        type: 'gerSearchOperator',
        data: this.boxContent
      }) // 发送搜索条件
      this.$store.commit('getOperatorSearch')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.searchbox{background-color: #f5f5f5;margin:  auto 2rem ;}
span{display: inline-block; width: 75px;text-align: right}
.boxpre{padding: 20px;overflow: hidden;text-align: center}
.input{width: 80%}
.justfy1{margin-left: 1rem;}

</style>
