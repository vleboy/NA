<template>
  <div class="searchbox">
		<div class="boxpre">
      <span>游戏名称:&emsp; </span>
      <el-input placeholder="请输入" class="input" v-model="boxContent.gameName"></el-input>
      <span class="justfy2">所属运营商: </span>
      <el-input placeholder="请输入" class="input" v-model="boxContent.company"></el-input>
      <el-button type="primary" class="justfy1" v-show="!show" @click="startSearch">搜索</el-button>
      <el-button type="text" @click="show = !show" v-show="!show">展开 <i class="el-icon-arrow-down"></i></el-button>
		</div>
		<div class="boxnext">
			<el-collapse-transition>
        <div v-show="show">
          <div class="transition-box">
            <!--<span>运营商邮箱: </span><el-input placeholder="请输入" class="input" v-model="boxContent.Email"></el-input>-->
            <span>创建时间:&emsp; </span>
            <el-date-picker type="date" placeholder="选择日期范围" class="input" v-model="boxContent.createAt"></el-date-picker>
          </div>
          <div class="gosearch">
            <el-button type="primary" @click="startSearch">搜索</el-button>
            <el-button @click="clearall">重置</el-button>
            <el-button type="text" @click="show = !show">收起 <i class="el-icon-arrow-up"></i></el-button>
          </div>
        </div>
      </el-collapse-transition>
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
        gameName: '', // 按游戏名称
        company: '', // 所属运营商
        Email: '', // 按邮箱搜索
        createAt: '' // 按创建时间搜索
      }
    }
  },
  methods: {
    clearall () {
      this.boxContent = {
        gameName: '', // 按游戏名称
        company: '', // 所属运营商
        Email: '', // 按邮箱搜索
        createAt: '' // 按创建时间搜索
      }
      this.$store.dispatch('getGamelist')
    },
    startSearch () {
      var a = new Date(this.boxContent.createAt)
      this.boxContent.createAt = a.getTime()
      this.$store.commit({
        type: 'gerSearchcondition',
        data: this.boxContent
      }) // 发送搜索条件
      this.$store.commit('gamelistSearch')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.searchbox{background-color: #f5f5f5;width: 97%;margin: 2rem auto;}
span{margin-right: 0.2rem}
.boxpre{margin-bottom: 2rem;padding: 2rem 0 0 10%;}
.boxnext{padding: 1rem 0 0 10%;}
.gosearch{text-align: right;padding: 2rem;}
.input{width: 30%!important;}
.justfy1{margin-left: 1rem;}
.justfy2{margin-left: 2rem}
</style>
