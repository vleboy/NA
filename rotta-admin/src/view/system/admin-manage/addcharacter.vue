<template>
  <div class="addcharacter" v-loading="loading" element-loading-text="创建权限中">
    <div class="formBox">
      <h2>创建角色</h2>
      <div class="addcharacter-form">
        <el-form label-width="120px" label-position="right">
          <el-form-item label="角色名称">
            <el-input class="input" placeholder="输入创建角色名称" v-model="addcharacter.name"></el-input>
          </el-form-item>
          <el-form-item label="角色权限">
            <div class="rightSelect">
              <div v-for="item in allRight">
                <p v-if="!item.hasParent"> 
                  <span v-if="item.children">{{item.name}}</span>
                    <el-checkbox v-if="!item.children" :label="item.name" :key="item" @change="recordSelect(item)" v-model="item.isChecked">
                      <span>
                        {{item.name}}
                      </span>
                    </el-checkbox>
                  <p style="margin-left:1rem;" v-for="second in item.children">
                    <span v-if="second.children">
                      {{second.name}}
                    </span>
                    <el-checkbox v-if="!second.children" :label="second.name" :key="second" @change="recordSelect(second)" v-model="second.isChecked">
                      <span>{{second.name}}</span>
                    </el-checkbox>
                    <span style="margin-left:2rem;display:block" v-for="third in second.children">
                      <el-checkbox :label="third.name" :key="third" @change="recordSelect(third)" v-model="third.isChecked">
                        <span>{{third.name}}</span>
                      </el-checkbox>
                    </span>
                  </p>
                </p>
              </div>
            </div>
            <div style="text-align:center;">
              <el-button type="primary" style="margin-left:-30%" @click="selectAll">全选</el-button>
            </div>
          </el-form-item>
          <el-form-item label="备注">
            <el-input placeholder="请输入备注(如没有可不填),最多不超过200个字符" type="textarea" :rows="3" class="input" :maxlength="200" v-model="addcharacter.remark"></el-input>
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
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
import { rightList } from '@/variables/allright'
export default {
  beforeCreate () {
    this.$store.commit('returnLocalStorage')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'addcharacter'
    })
  },
  created () {
    this.resetRight()
  },
  computed: {
    allRight () {
      return this.all
    }
  },
  data () {
    return {
      all: rightList, // 所有权限列表
      loading: false,
      addcharacter: {
        name: '', // 权限名称
        permissions: [], // 拥有权限
        remark: '' // 权限备注
      }
    }
  },
  watch: {
    'addcharacter.permissions' (val) {
      // console.log('选中的值', val)
    }
  },
  methods: {
    createRight () {
      // console.log(this.addcharacter)
      if (this.addcharacter.permissions.length == 0 || !this.addcharacter.name) {
        this.$message({
          type: 'error',
          message: '请配置权限或完善权限名称'
        })
      } else {
        this.loading = true
        invoke({
          url: api.subRoleNew,
          method: api.post,
          data: this.addcharacter
        }).then(
          result => {
            const [err, ret] = result
            if (err) {
            } else {
              this.$message({
                type: 'success',
                message: '创建成功！'
              })
              this.loading = false
              this.resetRight()
            }
          }
        )
      }
    },
    recordSelect (data) {
      if (data.isChecked) {
        this.addcharacter.permissions.push(data.name)
      } else {
        var index = this.addcharacter.permissions.indexOf(data.name);
        if (index > -1) {
          this.addcharacter.permissions.splice(index, 1);
        }
      }
    }, // 选择权限
    selectAll () {
      this.addcharacter.permissions = []
      for (let first of this.all) {
        first.isChecked = true
        if (!first.children) {
          this.addcharacter.permissions.push(first.name)
        }
        for (let second of first.children) {
          second.isChecked = true
          if (!second.children) {
            this.addcharacter.permissions.push(second.name)
          }
          for (let third of second.children) {
            third.isChecked = true
            this.addcharacter.permissions.push(third.name)
          }
        }
      }
    }, // 全选
    resetRight () {
      for (let first of this.all) {
        first.isChecked = false
        for (let second of first.children) {
          second.isChecked = false
          for (let third of second.children) {
            third.isChecked = false
          }
        }
      }
      this.addcharacter = {
        name: '', // 权限名称
        permissions: [], // 拥有权限
        remark: '' // 权限备注
      }
    } // 清空选择
  }
}
</script>

<style scoped>
.addcharacter h2{font-size: 1.8rem;font-weight: normal;padding: 1rem 0;color: #5a5a5a;margin-left: -1rem}
.addcharacter .formBox{width:40rem;margin: 0 auto;margin-top: 1rem}
.addcharacter .addcharacter-form{width: 99%;margin: 0 auto;margin-top: 1rem}
.addcharacter .input{width: 21rem;}
.addcharacter .subBtn{margin-top: 1rem;margin-left: 2rem;margin-right: 4rem}
</style>
