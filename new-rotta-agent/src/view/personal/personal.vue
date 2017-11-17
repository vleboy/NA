<template>
  <div class="g-page">
    <p class="g_main_title g_center">主标题</p>
    <div>
    	<p class="g_middle_title">管理信息</p>
    	<el-row class="g_normal_article">
	      <el-col :span="1"><div class="g-hidden">hidden</div></el-col>
		  <el-col :span="5"><div class="">代理管理员账号</div></el-col>
		  <el-col :span="3"><div class="g-hidden">hidden</div></el-col>
		  <el-col :span="5"><div class="">代理管理员密码</div></el-col>
		</el-row>

		<el-row class="g_normal_article">
	      <el-col :span="1"><div class="g-hidden">hidden</div></el-col>
		  <el-col :span="5"><div class="">代理管理员成数</div></el-col>
		  <el-col :span="3"><div class="g-hidden">hidden</div></el-col>
		  <el-col :span="5"><div class="">电子游戏洗码比</div></el-col>
		  <el-col :span="3"><div class="g-hidden">hidden</div></el-col>
		  <el-col :span="5"><div class="">真人视讯洗码比</div></el-col>
		</el-row>

		<el-row class="g_normal_article">
	      <el-col :span="1"><div class="g-hidden">hidden</div></el-col>
		  <el-col :span="5"><div class="">代理创建时间</div></el-col>
		  <el-col :span="3"><div class="g-hidden">hidden</div></el-col>
		  <el-col :span="5"><div class="">上次登录时间</div></el-col>
		  <el-col :span="3"><div class="g-hidden">hidden</div></el-col>
		  <el-col :span="5"><div class="">上次登录IP</div></el-col>
		</el-row>

		<el-row class="g_normal_article">
	      <el-col :span="1"><div class="g-hidden">hidden</div></el-col>
		  <el-col :span="10"><div class="">备注</div></el-col>
		</el-row>
    </div>

    <div>
    	<p class="g_middle_title">代理点数操作记录</p>
    	<p class="">当前代理剩余点数</p>
    	<el-table :data="[]" border style="font-size: 12px;">
		    <el-table-column prop="" align="center" label="序号" width="70" type="index">
		    </el-table-column>
		    <el-table-column prop="" align="center" label="账户余额">
		    </el-table-column>
		    <el-table-column prop="" align="center" label="交易点数">
		    </el-table-column>
		    <el-table-column prop="" align="center" label="交易时间" width="110">
		    </el-table-column>
		    <el-table-column prop="" align="center" label="交易对象">
		    </el-table-column>
		    <el-table-column prop="" align="center" label="交易类型" width="100">
		    </el-table-column>
		    <el-table-column prop="" align="center" label="交易详情(原账+当前操作额=现在余额)">
		    </el-table-column>
		    <el-table-column prop="" align="center" label="操作人">
		    </el-table-column>
		    <el-table-column prop="" align="center" label="备注" width="70">
		    </el-table-column>
  		</el-table>
    </div>
	<pagination></pagination>
  </div>
</template>

<script>
import Pagination from '@/components/pagination/pagination'
export default {
  name: 'personal',
  components: {
    Pagination
  }
}
</script>

<style lang="stylus" scoped>
</style>


