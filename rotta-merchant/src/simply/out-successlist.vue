<template>
  <div class="all print">
    <div class="suclist">
    <div style="text-align: center" class="print-title">
      <h2>出口代理商信息清单</h2>
    </div>
      <p class="suclist-title">出口代理商 : {{outdata.displayName}}</p>
      <p class="suclist-line1">
        <span class="">代理商ID : {{outsuccess.displayId}}</span>
        <span class="">代理商标识 : {{outdata.suffix}}</span>
        <span class="">负责人 : {{outdata.hostName}}</span>
      </p>
      <p>
        <span class="">代理商Email : {{outdata.managerEmail}}</span>
      </p>
      <p>
        <span class="">备注 : {{outdata.remark}}</span>
      </p>
      <div class="suclist-card">
        <p class="suclist-line1">
          <span>代理初始点数 : {{outdata.points}}</span>
          <span>代理抽成比 : {{outdata.rate}}%</span>
          <span>代理可放商户名额 : {{outdata.limit}}</span>
        </p>
        <p>
          <span class="">代理游戏 : {{formList(outdata.gameList)}}</span>
        </p>
      </div>
      <div class="suclist-card">
        <p class="suclist-line2">
          <span>管理员账号 : {{outdata.username}}</span>
          <span>管理员密码 : {{outdata.password}}</span>
        </p>
        <p class="suclist-line2">
          <span>管理员姓名 : {{outdata.adminName}}</span>
          <span>管理员联系方式 : {{outdata.adminContact}}</span>
        </p>
        <p>管理员Email : {{outdata.adminEmail}}</p>
      </div>    
    </div>
    <div class="list-bottom justfy">
      <p>生效时间 : {{formTime(outdata.contractPeriod)}}</p>
    </div>
  </div>
</template>

<script>
import { formatContractPeriod, formatGamelist } from '@/behavior/format'
export default {
  computed: {
    outsuccess () {
      return this.$store.state.variable.outsuccess
    },
    outdata () {
      return this.$store.state.variable.outcreate
    }
  },
  methods: {
    formTime (time) {
      return formatContractPeriod(time)
    },
    formList (list) {
      return formatGamelist(list).join(' , ')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.all{width: 50rem;margin: 0 auto}
.suclist{background-color: #f5f5f5;padding: 1rem}
p{line-height: 2.4rem;color: #5a5a5a}

/**/
.suclist-card{border: 1px dashed #222222;padding: 0.5rem 1rem ;margin: 1rem 0 0 0;}
.suclist-card p{line-height: 3rem}
/**/
.suclist-title{font-size: 1.2rem;font-weight: bold}
.suclist-line1{width: 100%;}
.suclist-line1 span{display: inline-block;width: 30%}
.suclist-line2{width: 100%;}
.suclist-line2 span{display: inline-block;width: 40%}
.list-bottom{text-align: right;}
.print-title{font-size: 1rem;font-weight: bold;display: none;margin-bottom: 1rem}
@media print {
  .print {width: 85%;margin-left: 4%;height: 100%}
  .print span {display: inline-block;width: 50%}
  .print-title{display: block}
  .justfy{margin-left: -10%}
}
</style>
