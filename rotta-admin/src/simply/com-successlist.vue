<template>
<div>
  <div class="print all">
    <div class="suclist">
      <div style="text-align: center" class="print-title">
        <h2>商户信息清单</h2>
      </div>
      <p>
        <span class="suclist-title">商户昵称 : {{comdata.displayName}}</span>
        <span class="suclist-little-title" v-if="!this.$store.state.variable.comcreate.parent">所属线路商 : 直属于平台</span>
        <span class="suclist-little-title" v-else>所属线路商 : {{comsuccess.parentDisplayName}}</span>
      </p>
      <p class="suclist-line1">
        <span class="">商户号 : {{comsuccess.displayId}}</span>
        <span class="">标识 : {{comdata.suffix}}</span>
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
        <span class="remark">备注 : {{formRemark(comdata.remark)}}</span>
      </p>
      <div class="suclist-card">
        <p>商户密匙 : {{comsuccess.apiKey}}</p>
        <p class="suclist-line1">
          <span>商户初始点数 : {{comdata.points}}</span>
          <span>商户抽成比 : {{comdata.rate}}%</span>
          <span>商户标识 : {{comdata.sn}}</span>
        </p>
        <p>
          <span class="">商户代理游戏 :
            <div v-for="item in comdata.gameList" style="display:inline-block;margin-left:0.25rem">
              {{item.name}}
            </div>
          </span>
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
  <div>
    <createbtn class="Noprint"></createbtn>
  </div>
</div>
  
</template>

<script>
import Createbtn from '@/components/createbtn'
import { formatContractPeriod, formatGamelist, formatRemark } from '@/behavior/format'
export default {
  beforeCreate () {
    this.$store.commit('startLoading')
  },
  components: {
    Createbtn
  },
  computed: {
    comsuccess () {
      var data = this.$store.state.variable.comsuccess
      return data
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
    },
    formRemark (remark) {
      return formatRemark(remark)
    },
    formatUser (o) {
      if (o) {
        return o.split('_')[1]
      } else {
        return ''
      }
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
.all .suclist-little-title{margin-left: 2rem;font-size: 0.8rem;font-weight: bold}
.all .suclist-line1{width: 100%;}
.all .suclist-line1 span{display: inline-block;width: 30%}
.all .suclist-line2{width: 100%;}
.all .suclist-line2 span{display: inline-block;width: 40%}
.all .list-bottom{text-align: right;}
.all .remark{word-wrap: break-word; word-break: normal; word-break:break-all;}
.print-title{font-size: 1rem;font-weight: bold;display: none;margin-bottom: 1rem}
@media print {
  .print {width: 100%;margin-left: -2%;height: 100%}
  /* .print span {display: inline-block;width: 20%} */
  .justfy2{}
  .justfy3{}
  .print-title{display: block}
  .Noprint{display: none}
}
</style>
