<template>
  <div class="outcreate" v-loading.body="dialogLoading" element-loading-text="上传中，请稍等">
    <h2 class="title">游戏基本信息</h2>
    <el-form :model="managerInfo" :rules="rules" ref="managerInfo" class="createform" label-width="150px"
             label-position="right">
      <el-form-item label="游戏名称" prop="gameName">
        <el-input v-model="managerInfo.gameName" class="input" type="text" placeholder="请输入" :maxlength='20'></el-input>
      </el-form-item>
      <el-form-item label="游戏简介" prop="gameRecommend">
        <el-input v-model="managerInfo.gameRecommend" class="input" placeholder="请输入" type="textarea" :maxlength='200'></el-input>
      </el-form-item>
      <el-form-item label="KindId" prop="kindId">
        <el-input v-model="managerInfo.kindId" class="input" placeholder="请输入" type="number" :maxlength='5'></el-input>
      </el-form-item>
      <el-form-item label="所属分类" prop="gameType">
        <el-select v-model="managerInfo.gameType" placeholder="请选择" clearable class="input">
          <el-option v-for="item in options" :key="item.code" :label="item.name" :value="item.code" class="select-width"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属运营商" prop="company">
        <el-select v-model="managerInfo.company" placeholder="请选择" clearable class="input" :change="changeCompany()">
          <el-option v-for="item in companyOptions" :key="item.companyName" :value="item.companyName" class="select-width"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="key" v-if="companyKey">
        <el-tag type="danger">{{companyKey}}</el-tag>
      </el-form-item>
      <el-form-item label="游戏LOGO" prop="gameImg">
        <el-upload
          action="//upload.qiniu.com"
          class="g-avatar-uploader"
          ref="upload"
          :show-file-list="false"
          :on-success="handleSuccess"
          :on-error="handleError"
          :before-upload="beforeUpload"
          :data="form">
          <img v-if="managerInfo.gameImg" :src="managerInfo.gameImg" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="el-upload__tip">只能上传一张jpg/png文件，且不超过1M</div>
      </el-form-item>
      <el-form-item label="服务器" prop="ip">
        <el-input v-model="managerInfo.ip" class="input" placeholder="请输入 （如：xxx.xxx.xxx.xxx）"></el-input>
      </el-form-item>
      <el-form-item label="端口" prop="port">
        <el-input v-model="managerInfo.port" class="input" type="number" placeholder="请输入"></el-input>
      </el-form-item>
    </el-form>
    <div class="stepbtn createform">
      <el-button type="primary" class="nextBtn" @click="postCreateform" style="margin-left: 120px">下一步</el-button>
      <el-button @click="resetData">重置</el-button>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import { invoke } from '@/libs/fetchLib'
  import api from '@/api/api'
  export default {
    name: 'createform',
    beforeCreate () {
      this.$store.commit('returnLocalStorage')
      this.$store.commit({
        type: 'recordNowindex',
        data: 'addGame'
      })
    },
    data () {
      var validateGameName = (rule, value, callback) => {
        var regName = new RegExp(/^[\u4E00-\u9FA5A-Za-z0-9_]+$/)
        if (value === '') {
          callback(new Error('请输入游戏名称'))
          this.isfinish.gameName = false
        } else if (!regName.exec(value)) {
          callback(new Error('请输入中英文或者数字'))
          this.isfinish.gameName = false
        } else if (value.length < 2) {
          callback(new Error('必须为两位数'))
          this.isfinish.gameName = false
        } else {
          callback()
          this.isfinish.gameName = true
        }
      } // 游戏名称
      var validateGameType = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择游戏类别'))
        } else {
          callback()
          this.isfinish.gameType = true
        }
      } // 分类
      var validateCompany = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择所属运营商'))
          this.isfinish.company = false
        } else {
          callback()
          this.isfinish.company = true
        }
      } // 运营商
      var validateGameRecommend = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入游戏简介'))
          this.isfinish.gameRecommend = false
        } else if (value.length < 2) {
          callback(new Error('必须为两位数'))
          this.isfinish.gameRecommend = false
        } else {
          callback()
          this.isfinish.gameRecommend = true
        }
      } // 游戏简介
      var validateIp = (rule, value, callback) => {
        var ip = new RegExp(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/)
        if (value === '') {
          callback(new Error('请输入服务器'))
          this.isfinish.ip = false
        } else if (!ip.exec(value)) {
          callback(new Error('请输入正确的服务器格式'))
          this.isfinish.ip = false
        } else {
          callback()
          this.isfinish.ip = true
        }
      } // 服务器
      var validatePort = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入端口'))
          this.isfinish.port = false
        } else if (value < 1 || value > 65535) {
          callback(new Error('端口必须小于65535，大于1'))
          this.isfinish.port = false
        } else {
          callback()
          this.isfinish.port = true
        }
      } // 端口
      var validateKindId = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入KindId'))
          this.isfinish.kindId = false
        } else if (value < 0) {
          callback(new Error('必须为正数'))
          this.isfinish.kindId = false
        } else if (value.length !== 5) {
          callback(new Error('必须为五位数'))
          this.isfinish.kindId = false
        } else {
          callback()
          this.isfinish.kindId = true
        }
      } // 端口
      return {
        isfinish: {
          gameName: false,
          gameType: false,
          company: false,
          port: false,
          ip: false,
          kindId: false,
          gameRecommend: false
        },
        managerInfo: {
          gameName: '', // 名称
          gameType: '', // 类别
          company: '', // 运营商
          port: '', // 端口
          ip: '', // 服务器
          kindId: '', // kindId
          gameRecommend: '', // 简介
          gameImg: '' // 游戏logo
        }, // 创建列表
        rules: {
          gameName: [
            {validator: validateGameName, trigger: 'blur'}
          ],
          gameRecommend: [
            {validator: validateGameRecommend, trigger: 'blur'}
          ],
          gameType: [
            {validator: validateGameType, trigger: 'blur'}
          ],
          company: [
            {validator: validateCompany, trigger: 'blur'}
          ],
          port: [
            {validator: validatePort, trigger: 'blur'}
          ],
          ip: [
            {validator: validateIp, trigger: 'blur'}
          ],
          kindId: [
            {validator: validateKindId, trigger: 'blur'}
          ]
        }, // 列表验证规则
        options: [],
        fileList: [],
        form: {
          key: '',
          token: ''
        },
        dialogLoading: false
      }
    },
    computed: {
      companyOptions () {
        return this.$store.state.variable.operatorList
      }
    },
    created () {
      this.getGameType()
    },
    methods: {
      postCreateform () {
        if (!this.isfinish.gameName || !this.managerInfo.gameType || !this.managerInfo.company ||
          !this.isfinish.port || !this.isfinish.ip || !this.isfinish.gameRecommend || !this.isfinish.kindId || !this.managerInfo.gameImg) {
          this.$message({
            message: '请完善创建信息',
            type: 'error'
          })
        } else {
          this.$store.commit('startLoading')
          this.$store.state.variable.operatorList.forEach((item) => {
            if (item.companyName === this.managerInfo.company) {
              this.managerInfo.company = item
            }
          })
          invoke({
            url: api.addGame,
            method: api.post,
            data: this.managerInfo
          }).then((data) => {
            let [err, res] = data
            if (err) {
              this.$message({
                message: err.msg,
                type: 'error'
              })
            } else if (res) {
              this.$store.commit({
                type: 'getSuccessGame',
                data: res.data.payload
              })
              this.$store.commit('changeSteps')
            }
            this.$store.commit('closeLoading')
          })
        }
      },
      resetData () {
        this.managerInfo = {
          gameName: '', // 名称
          gameType: '', // 类别
          company: '', // 运营商
          port: '', // 端口
          ip: '', // 服务器
          gameRecommend: '', // 简介
          gameImg: '' // 图片上传 （暂不实现）
        }
      },
      changeCompany () {
        if (this.managerInfo.company) {
          this.companyOptions.forEach(item => {
            if (item.companyName === this.managerInfo.company) {
              this.companyKey = item.companyKey
            }
          })
        } else {
          this.companyKey = ''
        }
      }, // 处理select选择后联动
      getGameType () {
        invoke({
          url: api.allGames,
          method: api.post
        })
        .then(res => {
          const [err, ret] = res
          if (err) {
            this.$message({
              message: err.msg,
              type: 'error'
            })
          } else {
            this.options = ret.data.payload
          }
          this.$store.commit('closeLoading')
        })
      },
      handleSuccess (response, file, fileList) {
        this.dialogLoading = false
        this.$message.success('图片上传成功')
        this.fileList = fileList
        this.managerInfo.gameImg = `https://ouef62ous.bkt.clouddn.com/${response.key}`
      }, // 图片上传成功回调
      beforeUpload (file) {
        const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png')
        const isLt1M = file.size / 1024 / 1024 < 1
        return new Promise((resolve, reject) =>{
          this.dialogLoading = true
          if (!isJPG) {
            this.dialogLoading = false
            this.$message.error('上传头像图片只能是 JPG或者PNG 格式!')
            reject(false)
          } else if (!isLt1M) {
            this.dialogLoading = false
            this.$message.error('上传游戏LOGO大小不能超过 1MB!')
            reject(false)
          }

          invoke({
            url: api.getUploadImgToken,
            method: api.post,
            data: {
              fileKey: file.name
            }
          }).then(res => {
            const [err, ret] = res
            if (err) {
              this.$message({
                message: err.msg,
                type: 'error'
              })
            } else {
              this.form = {
                key: file.name,
                token: ret.data.payload
              }
              resolve(true)
            }
          }).catch(err => {
            console.log(err)
            reject(false)
          })
        })
      }, // 上传前的检验 格式、大小等
      handleError () {
        this.dialogLoading = false
        this.$message.error('上传失败，请重新选择')
      } // 错误回调
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*创建代理商列表*/
  .outcreate{margin-bottom: 4rem}
  .createform{width:52.5rem;margin: 0 auto;}
  .input{width: 100%  ;}
  .select-width{max-width: 336px}
  .title{font-weight: normal;color: #5a5a5a;margin: 1rem 0 2rem 0;text-align: center;margin-left: -30rem}
  .stepbtn{text-align: center}
</style>
