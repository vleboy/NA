<template>
  <div class="print all">
    <div class="suclist">
    <div style="text-align: center" class="print-title">
      <h2>商户信息清单</h2>
    </div>
      <p>
        <span class="suclist-title">商户 : {{comdata.displayName}}</span>
        <span class="suclist-little-title">所属线路商 : {{comsuccess.parentName}}</span>
      </p>
      <p class="suclist-line1">
        <span class="">商户号 : {{comsuccess.displayId}}</span>
        <span class="">商户标识 : {{comdata.suffix}}</span>
        <span class="">线路号 : {{comdata.msn}}</span>
      </p>
      <p><span class="justfy1">商户Email : {{comdata.merchantEmail}}</span></p>
      <p class="suclist-line1">
        <span class="">负责人 : {{comdata.hostName}}</span>
      </p>
      <p>
        <span class="">负责人联系方式 : {{comdata.hostContact}}</span>
      </p>
      <p>
        <span class="">备注 : {{comdata.remark}}</span>
      </p>
      <div class="suclist-card">
        <p>商户密匙 : {{comsuccess.apiKey}}</p>
        <p class="suclist-line1">
          <span>商户初始点数 : {{comdata.points}}</span>
          <span>商户抽成比 : {{comdata.rate}}%</span>
        </p>
        <p>
          <span class="">代理游戏 : {{formList(comdata.gameList)}}</span>
        </p>
        <p>
          <span class="">商户白名单 : {{comdata.loginWhiteList}}</span>
        </p>
        <p>
          <span class="">商户域名 : {{comdata.frontURL}}</span>
        </p>
      </div>
      <div class="suclist-card">
        <!-- <p class="suclist-line2">
          <span>后台地址 : </span>
        </p> -->
        <p class="suclist-line2">
          <span>管理员账号 : {{comdata.username}}</span>
          <span>管理员密码 : {{comdata.password}}</span>
        </p>
        <p class="suclist-line2">
          <span>管理员姓名 : {{comdata.adminName}}</span>
          <span class="justfy1">管理员联系方式 : {{comdata.adminContact}}</span>
        </p>
        <p>管理员Email : {{comdata.adminEmail}}</p>
      </div>    
    </div>
    <div class="list-bottom">
      <p>生效时间 : {{formTime(comdata.contractPeriod)}}</p>
    </div>
  </div>
</template>

<script>
import { formatContractPeriod, formatGamelist } from '@/behavior/format'
export default {
  computed: {
    comsuccess () {
      return this.$store.state.variable.comsuccess
    },
    comdata () {
      return this.$store.state.variable.comcreate
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
.suclist-little-title{margin-left: 2rem;font-size: 0.8rem;font-weight: bold}
.suclist-line1{width: 100%;}
.suclist-line1 span{display: inline-block;width: 30%}
.suclist-line2{width: 100%;}
.suclist-line2 span{display: inline-block;width: 40%}
.list-bottom{text-align: right;}
.print-title{font-size: 1rem;font-weight: bold;display: none;margin-bottom: 1rem}
@media print {
  .print {width: 100%;margin-left: -2.5%;height: 100%}
  /* .print span {display: inline-block;width: 20%} */
  .justfy2{}
  .justfy3{}
  .print-title{display: block}
}
</style>
