<template>
  <div class="helplist">
    <div class="helplist-Btn">
      <div style="float:left">
        <el-button type="primary">创建帮助类别</el-button>
        <el-button type="primary">新增帮助内容</el-button>
      </div>
      <div style="float:right">
        <el-input placeholder="输入搜索内容" style="width:15rem"></el-input>
        <el-button type="primary" style="margin-right: -0.7rem">搜索</el-button>
        <el-button >重置</el-button>
      </div>
    </div>
    <el-table stripe :data="helplist">
      <el-table-column label="序号" align="left" width="75" type="index">
      </el-table-column>
      <el-table-column label="标题" prop="title" align="left">
        <template scope="scope">
          <span class="helpTitle">{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属分类" prop="type" align="left" sortable>
      </el-table-column>
      <el-table-column label="备注" align="left" prop="remark">
        <template scope="scope">
          <el-popover trigger="hover" placement="bottom">
            <div class="remarkBox">
              <p>{{ (scope.row.remark) }}</p>
            </div>
            <div slot="reference" class="">
              <el-icon name="search" style="color:#108ee9"></el-icon>
            </div>
          </el-popover>
        </template>
      </el-table-column> 
      <el-table-column label="操作" align="left">
          <template scope="scope">
              <el-button type="text" class="myBtn" icon="edit">编辑</el-button>
              <el-button type="text" class="myBtn" icon="delete">删除</el-button>
          </template>
      </el-table-column>
    </el-table>
</div>
</template>
<script>
export default {
  beforeCreate () {
    this.$store.commit({
      type: 'recordNowindex',
      data: 'helplist'
    })
    this.$store.commit('returnLocalStorage')
  },
  data () {
    return {
      helplist: [
        {
          title: '帮助信息一',
          type: '功能类',
          remark: 'asdfsadf'
        },
        {
          title: '帮助信息二',
          type: '信息类',
          remark: '帮助信息一'
        },
        {
          title: '帮助信息三',
          type: '玩家类',
          remark: 'asdfsadf'
        },
        {
          title: '帮助信息四',
          type: '用户类',
          remark: 'asdfsadf'
        }
      ]
    }
  }
}
</script>

<style scpoed>
.helplist{width: 99%;margin: 2rem auto}
.helplist .helpTitle{cursor: pointer;color: #20a0ff}
.helplist-Btn{margin-bottom: 1.5rem}
.helplist-Btn:after{clear:both;content:'.';display:block;width: 0;height: 0;visibility:hidden;}
</style>
