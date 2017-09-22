<template>
  <div>
    <div class="successbtn">
      <el-button type="primary" @click="backlist">返回列表</el-button>
      <el-button class="justfy1" @click="checklist">查看</el-button>
      <el-button @click="printList">打印</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { invoke } from '@/libs/fetchLib'
  import api from '@/api/api'
  export default {
    name: 'successbtn',
    props: ['hash', 'detail'],
    methods: {
      backlist () {
        this.$router.push(this.hash)
        this.$store.commit({
          type: 'recordNowindex',
          data: this.hash
        })
      },
      checklist () {
        this.$router.push(this.detail)
        this.$store.commit({
          type: 'recordNowindex',
          data: this.detail
        })
        this.$store.commit('startLoading')
        if (this.detail === 'operatordetail') {
          var row = this.$store.state.variable.getSuccessOperator
          invoke({
            url: `${api.companyOne}/${row.companyName}/${row.companyId}`,
            method: api.get
          }).then((data) => {
            let [err, res] = data
            if (err) {
              this.$message({
                message: err.msg,
                type: 'error'
              })
            } else {
              this.$store.commit({
                type: 'gameDetailInfo',
                data: res.data.payload
              })
            }
            this.$store.commit('closeLoading')
          })
        } else {
          var rows = this.$store.state.variable.getSuccessGame
          invoke({
            url: `${api.gameOne}/${rows.gameType}/${rows.gameId}`,
            method: api.get
          }).then((data) => {
            let [err, res] = data
            if (err) {
              this.$message({
                message: err.msg,
                type: 'error'
              })
            } else {
              this.$store.commit({
                type: 'gameReadyDetailInfo',
                data: res.data.payload
              })
            }
            this.$store.commit('closeLoading')
          })
        }
      },
      printList () {
        window.print()
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .successbtn{margin-left: -4rem;padding: 2rem 0;}
  .justfy1{margin:0 7%;}
</style>
