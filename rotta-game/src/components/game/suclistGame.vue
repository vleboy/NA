<template>
  <div class="suclist print">
    <div class="list-title">
      <el-row>
        <p class="title print-title">游戏名称 : {{suclist.gameName}}</p>
      </el-row>
      <el-row>
        <el-col :span="8">
          <span class="print-justfy1">游戏标识 : {{suclist.gameIden}}</span>
        </el-col>
        <el-col :span="8">
          <span class="print-justfy1">kindID : {{suclist.kindId}}</span><br>
        </el-col>
        <el-col :span="8">
          <span class="print-justfy1">所属供应商 : {{suclist.company.companyName}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <span class="print-justfy1">供应商标识 : {{suclist.companyIden}}</span>
        </el-col>
        <el-col :span="8">
          <span class=" print-justfy1">游戏简介 : {{suclist.gameRecommend}}</span>
        </el-col>
        <el-col :span="8">
          <span class="print-justfy1">网页游戏 : {{suclist.isWebGame!='0' ? '是' : '否' }}</span><br>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <span class=" print-justfy1">游戏简介 : {{suclist.gameRecommend}}</span>
        </el-col>
        <el-col :span="10">
          <span class="print-justfy1">游戏LOGO : <img style="width: 100%;margin-top: 1rem" :src="suclist.gameImg"></span>
        </el-col>
      </el-row>
    </div>

    <div class="list-bottom">
      <p>创建时间 : {{formTime(suclist.createdAt)}}</p>
    </div>
  </div>
</template>

<script>
import dateformat from 'dateformat'
export default {
  name: 'suclist',
  computed: {
    suclist () {
      return this.$store.state.variable.getSuccessGame
    }
  },
  methods: {
    formTime () {
      var start = this.suclist.createdAt
      start = dateformat(start, 'isoDate')
      return start
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.suclist{background-color: #f5f5f5;width: 60%;margin-left:19%;text-align: left;padding: 2rem;}
.list-title{margin-bottom: 2rem;}
.list-title p{line-height: 3rem;font-size: 1.1rem;color: #5a5a5a;}
.list-title .title{font-size: 1.3rem;font-weight: bold;color: #5a5a5a}
.list-bottom{text-align: right;color: #a5a5a5}
.print-justfy1{color: #a5a5a5; padding: 1rem 0;display: inline-block;word-break:break-all;
;}
/**/
@media print {
  .Noprint { display: none }
  .print{margin-left: -1rem;margin-top: 15rem;width: 57%;overflow: hidden;word-break:break-all;}
  .print p{font-size: 1.4rem;line-height: 5rem;}
  .print-ex span{width: 40%}
  .print-title{font-size: 1.8rem}
  .print-justfy{margin-top: -5.1rem;margin-left: 8rem}
  html,body{font-size: 16px}
  .PageNext{ page-break-after: always }
}
</style>
