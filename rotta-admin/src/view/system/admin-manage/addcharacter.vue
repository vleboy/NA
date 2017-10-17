<template>
  <div class="addcharacter">
    <div class="formBox">
      <h2>创建角色权限</h2>
      <div class="addcharacter-form">
        <el-form label-width="120px" label-position="right">
          <el-form-item label="角色名称">
            <el-input class="input" placeholder="输入创建权限名称"></el-input>
          </el-form-item>
          <el-form-item label="角色权限">
            <el-checkbox-group v-model="selectRight">
              <el-checkbox v-for="item in allRight" :label="item" :key="item" style="display:inline-block;margin-left:0.25rem">{{item}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="备注">
            <el-input placeholder="请输入备注(如没有可不填),最多不超过200个字符" type="textarea" :rows="3" class="input" :maxlength="200"></el-input>
          </el-form-item>
          <el-form-item label="" prop="adminContact">
             <el-button type="primary" class="subBtn" @click="createRight"> 确认创建</el-button>
             <el-button type="primary" class="subBtn" @click="resetRight"> 重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  beforeCreate () {
    // this.$store.commit('startLoading')
    this.$store.commit('returnLocalStorage')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'addcharacter'
    })
  },
  data () {
    return {
      addcharacter: []
    }
  },
  methods: {
    createRight () {
    },
    resetRight () {
    }
  }
}
</script>

<style scoped>
.addcharacter h2{font-size: 1.8rem;font-weight: normal;padding: 1rem 0;color: #5a5a5a;margin-left: -1rem}
.addcharacter .formBox{width:36rem;margin: 0 auto;margin-top: 1rem}
.addcharacter .addcharacter-form{width: 99%;margin: 0 auto;margin-top: 1rem}
.addcharacter .input{width: 21rem;}
.addcharacter .subBtn{margin-top: 1rem;margin-left: 2rem;margin-right: 4rem}
</style>
