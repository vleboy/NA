<template>
  <div class="searchbox">
    <el-radio-group v-model="companyInfo" @change="startSearch">
      <el-radio-button v-for="(item,index) of companyOptions" :key="index" :label="item.company">{{item.company}}</el-radio-button>
    </el-radio-group>
	</div>
</template>

<script type="text/ecmascript-6">
  import { invoke } from '@/libs/fetchLib'
  import api from '@/api/api'
export default {
  name: 'searchbox',
  data () {
    return {
      show: false,
      companyInfo: '全部厂商',
      companyOptions: [],
      boxContent: {
        gameName: '', // 按游戏名称
        createdDate: '', // 按创建时间搜索
        companyIden: '' // 按创建时间搜索
      }
    }
  },
  created (){
    this.getCompanyList() // 获取所属游戏商信息
  },
  computed: {
  },
  methods: {
    clearall () {
      this.boxContent = {
        gameName: '', // 按游戏名称
        createdDate: '', // 按创建时间搜索
        companyIden: '' // 按创建时间搜索
      }
      this.companyInfo = '全部'
      this.$store.commit({
        type: 'gerSearchcondition',
        data: JSON.parse(JSON.stringify(this.boxContent))
      }) // 发送搜索条件
      this.$store.dispatch('getGamelist')
    },
    startSearch () {
      this.boxContent.companyIden = this.companyInfo == '全部厂商' ? '' : this.companyInfo
      this.$store.commit({
        type: 'gerSearchcondition',
        data: JSON.parse(JSON.stringify(this.boxContent))
      }) // 发送搜索条件
      this.$store.dispatch('getGamelist')
    },
    getCompanyList () {
      invoke({
        url: api.companySelect,
        method: api.post,
        data: {
          parent: localStorage.loginRole == 1 ? '' : localStorage.loginId
        }
      }).then((data) => {
        let [err, res] = data
        if (err) {
          this.$message({
            message: err.msg,
            type: 'error'
          })
        } else {
          this.companyOptions = res.data.payload
          this.companyOptions.unshift({
            company:'全部厂商'
          })
      }
    })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.searchbox{    padding: 0 2rem;}
span{margin-right: 0.2rem}
.boxpre{padding: 2rem;}
.input{width: 30%!important;}
.justfy1{margin-left: 1rem;}
.justfy2{margin-left: 2rem}
</style>
