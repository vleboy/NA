<template>
  <div class="p-game-video">
    <el-row>
      <el-col><div class="-p-margin">电子游戏配置：</div></el-col>
      <el-col :span="10">
        <div class="-p-text-left -p-margin">线注</div>
        <el-select v-model="searchInfo" multiple placeholder="请选择" class="-p-text-right">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <div class="-p-text-left">线数</div>
        <el-select v-model="searchInfo" multiple placeholder="请选择" class="-p-text-right">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
export default{
  beforeCreate () {
    this.$store.commit('returnLocalStorage')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'videoGameConfig'
    })
  },
  created () {
  },
  data () {
    return {
      searchInput: '',
      searchInfo: '',
      options: []
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
 .p-game-video {
   margin: 0 28px;
   overflow: hidden;

   .-p-margin {
     margin-bottom: 15px;
   }
   .-p-text-left{
     display: inline-block;
     padding: 7.3px 10px;
     border: 1px solid #bfcbd9;
     color: #97a8be;
     background-color: #fbfdff;
     border-right-style: none;
     border-radius: 4px;
     border-top-right-radius: 0;
     border-bottom-right-radius: 0;
   }
   .-p-text-right {
     right: 6px ;

   }
 }
</style>
