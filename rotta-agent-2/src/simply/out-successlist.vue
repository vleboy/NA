<template>
<div>
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
        <span class="remark">备注 : {{formRemark(outdata.remark)}}</span>
      </p>
      <div class="suclist-card">
        <p class="suclist-line1">
          <span>代理初始点数 : {{outdata.points}}</span>
          <span>代理抽成比 : {{outdata.rate}}%</span>
          <span>代理可放商户名额 : {{outdata.limit}}</span>
        </p>
        <p>
          <span class="">代理游戏 :
            <div v-for="item in outdata.gameList" style="display:inline-block;margin-left:0.25rem">
              {{item.name}}
            </div>
          </span>
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
  <div>
    <createbtn class="Noprint"></createbtn>
  </div>
</div>
  
</template>

<script>
import Createbtn from '@/components/createbtn'
import { formatContractPeriod, formatRemark, formatGamelist } from '@/behavior/format'
export default {
  components: {
    Createbtn
  },
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
    },
    formRemark (remark) {
      return formatRemark(remark)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.all{width: 50rem;margin: 0 auto}
.all .suclist{background-color: #f5f5f5;padding: 1rem}
.all p{line-height: 2.4rem;color: #5a5a5a}

/**/
.all .suclist-card{border: 1px dashed #222222;padding: 0.5rem 1rem ;margin: 1rem 0 0 0;}
.all .suclist-card p{line-height: 3rem}
/**/
.all .suclist-title{font-size: 1.2rem;font-weight: bold}
.all .suclist-line1{width: 100%;}
.all .suclist-line1 span{display: inline-block;width: 30%}
.all .suclist-line2{width: 100%;}
.all .suclist-line2 span{display: inline-block;width: 40%}
.all .list-bottom{text-align: right;}
.all .print-title{font-size: 1rem;font-weight: bold;display: none;margin-bottom: 1rem}
.all .remark{word-wrap: break-word; word-break: normal; word-break:break-all;}
@media print {
  .print {width: 85%;margin-left: 4%;height: 100%}
  .print span {display: inline-block;width: 50%}
  .print-title{display: block}
  .justfy{margin-left: -10%}
  .Noprint{display: none}
}
</style>
