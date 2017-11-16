<template>
  <div class="vedioGame-report">

    <div class="nowUserlist">
      <p class="title">当前选择列表</p>
      <el-table stripe>
        <el-table-column label="序号" prop="rank" align="center" width="75" type="selection">
        </el-table-column>
        <el-table-column label="类型" prop="rank" align="center">
        </el-table-column>
        <el-table-column label="昵称" prop="rank" align="center">
        </el-table-column>
        <el-table-column label="管理员账号" prop="rank" align="center">
        </el-table-column>
        <el-table-column label="交易次数" prop="rank" align="center">
        </el-table-column>
        <el-table-column label="投注金额" prop="rank" align="center">
        </el-table-column>
        <el-table-column label="输赢金额" prop="rank" align="center">
        </el-table-column>
        <el-table-column label="获利比例" prop="rank" align="center">
        </el-table-column>
      </el-table>
      <div class="page">
          <el-pagination layout="prev, pager, next, sizes, jumper" :total="1"></el-pagination>
        </div>
    </div>

    <div class="childlist">
      <p class="title">下级列表</p>
      <el-table stripe>
        <el-table-column label="序号" prop="rank" align="center" width="75" type="selection">
        </el-table-column>
        <el-table-column label="类型" prop="rank" align="center">
        </el-table-column>
        <el-table-column label="昵称" prop="rank" align="center">
        </el-table-column>
        <el-table-column label="管理员账号" prop="rank" align="center">
        </el-table-column>
        <el-table-column label="交易次数" prop="rank" align="center">
        </el-table-column>
        <el-table-column label="投注金额" prop="rank" align="center">
        </el-table-column>
        <el-table-column label="输赢金额" prop="rank" align="center">
        </el-table-column>
        <el-table-column label="获利比例" prop="rank" align="center">
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination layout="prev, pager, next, sizes, jumper" :total="1"></el-pagination>
      </div>
    </div>

    <div class="playerlist">
      <p class="title">所属玩家列表</p>
      <el-table stripe>
        <el-table-column label="序号" prop="rank" align="center" width="75" type="selection">
        </el-table-column>
        <el-table-column label="用户名" prop="rank" align="center">
        </el-table-column>
        <el-table-column label="昵称" prop="rank" align="center">
        </el-table-column>
        <el-table-column label="交易次数" prop="rank" align="center">
        </el-table-column>
        <el-table-column label="投注金额" prop="rank" align="center">
        </el-table-column>
        <el-table-column label="输赢金额" prop="rank" align="center">
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination layout="prev, pager, next, sizes, jumper" :total="1"></el-pagination>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  beforeCreate () {
    this.$store.commit({
      type: 'recordNowindex',
      data: 'vedioGameReport'
    })
    this.$store.commit('returnLocalStorage')
  }
}
</script>

<style scpoed>
.vedioGame-report .page{padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 0.5rem;margin-top: 2rem}
.vedioGame-report .title{font-size: 1.5rem;margin: 0 0 0.5rem 0;font-weight: 600;display: inline-block}
.nowUserlist,
.childlist,
.playerlist{width: 99%;margin: 2rem auto}
</style>
