<template>
  <div class="outcreate" v-loading.body="dialogLoading" element-loading-text="上传中，请稍等">
    <h2 class="title">游戏基本信息</h2>
    <el-form :model="managerInfo" :rules="rules" ref="managerInfo" class="createform" label-width="150px"
             label-position="right">
      <el-form-item label="游戏名称" prop="gameName">
        <el-input v-model="managerInfo.gameName" class="input" type="text" :disabled="this.$store.state.variable.isEdit" placeholder="请输入游戏名称" :maxlength='20'></el-input>
      </el-form-item>
      <el-form-item label="游戏标识" prop="gameIden">
        <el-input v-model="managerInfo.gameIden" class="input" type="text" :disabled="this.$store.state.variable.isEdit" placeholder="请输入游戏标识(必须首字母开头并且大写)" :maxlength='20'></el-input>
      </el-form-item>
      <el-form-item label="游戏简介" prop="gameRecommend">
        <el-input v-model="managerInfo.gameRecommend" class="input" placeholder="请输入游戏简介" type="textarea" :maxlength='200'></el-input>
      </el-form-item>
      <el-form-item label="所属供应商" prop="companyName">
        <el-select v-model="managerInfo.companyName" placeholder="请选择所属供应商" clearable class="input" @change="changeCompany">
          <el-option v-for="item in companyOptions" :key="item.companyName" :value="item.companyName" class="select-width"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="游戏类别" prop="gameType">
      <el-select v-model="managerInfo.gameType" placeholder="请选择游戏类别" clearable class="input">
        <el-option v-for="item in gameTypeOptions" :key="item.code" :label="item.name" :value="item.code" class="select-width"></el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="KindId" prop="kindId">
        <el-input v-model="managerInfo.kindId" class="input" placeholder="请输入KindId(范围1-99999)" type="number" :maxlength='5'></el-input>
      </el-form-item>
      <el-form-item label="key" v-if="companyKey">
        <el-tag type="danger">{{companyKey}}</el-tag>
      </el-form-item>
      <el-form-item label="游戏LOGO" prop="gameImg">
        <el-upload
          :action="uploadAction"
          class="g-avatar-uploader"
          ref="upload"
          :http-request="requestHeader"
          :show-file-list="false"
          :on-success="handleSuccess"
          :on-error="handleError"
          :before-upload="beforeUpload">
          <img v-if="managerInfo.gameImg" :src="managerInfo.gameImg" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="el-upload__tip">只能上传一张jpg/png文件，且不超过1M</div>
      </el-form-item>
      <el-form-item label="服务器" prop="ip">
        <el-input v-model="managerInfo.ip" class="input" placeholder="请输入ip地址 （如：xxx.xxx.xxx.xxx）"></el-input>
      </el-form-item>
      <el-form-item label="端口" prop="port">
        <el-input v-model="managerInfo.port" class="input" type="number" placeholder="请输入端口号"></el-input>
      </el-form-item>
      <el-form-item label="网页游戏" style="text-align: left">
        <el-checkbox v-model="isShowWebGame"></el-checkbox>
      </el-form-item>
      <el-form-item label="网页地址" v-if="isShowWebGame">
        <el-input v-model="managerInfo.gameLink" placeholder="请输入网页游戏地址"></el-input>
      </el-form-item>
    </el-form>
    <div class="stepbtn createform">
      <el-button type="primary" class="nextBtn" @click="postCreateform" style="margin-left: 120px">
        {{this.$store.state.variable.isEdit ? '确认修改' : '下一步'}}
      </el-button>
      <el-button @click="resetData" v-if="!this.$store.state.variable.isEdit">重置</el-button>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import { invoke } from '@/libs/fetchLib'
  import { pattern } from '@/behavior/regexp'
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
          callback(new Error('请选择所属供应商'))
          this.isfinish.company = false
        } else {
          callback()
          this.isfinish.company = true
        }
      } // 供应商
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
        } else if (!pattern.positiveInteger.exec(value) || value > 99999) {
          callback(new Error('必须为正整数，范围在1-99999之间'))
          this.isfinish.kindId = false
        } else {
          callback()
          this.isfinish.kindId = true
        }
      } // kindID
      var validateGameIden = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入游戏标识'))
          this.isfinish.gameIden = false
        } else if (!pattern.nonChinese.exec(value)|| (value.substring(0,1) != value.substring(0,1).toUpperCase())) {
          callback(new Error('请输入字母或者数字（首位必须是大写字母）'))
          this.isfinish.gameIden = false
        } else if (value.length > 10) {
          callback(new Error('标识长度最多为10位'))
          this.isfinish.gameIden = false
        } else {
          callback()
          this.isfinish.gameIden = true
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
          gameRecommend: false,
          gameIden: false
        },
        managerInfo: {
          gameName: '', // 名称
          gameType: '', // 类别
          company: '', // 供应商
          port: '', // 端口
          ip: '', // 服务器
          kindId: '', // kindId
          gameRecommend: '', // 简介
          gameImg: '', // 游戏logo
          gameLink: '', // 网页游戏链接
          isWebGame: '', // 网页游戏标识
          gameIden: '', // 标识
          companyIden: '', // 供应商标识
          companyName: '' // 供应商名称
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
          ],
          gameIden: [
            {validator: validateGameIden, trigger: 'blur'}
          ]
        }, // 列表验证规则
        options: [],
        fileList: [],
        uploadAction: '',
        imgFile:{},
        form: {
          key: '',
          token: ''
        },
        dialogLoading: false,
        isShowWebGame: false,
        gameTypeOptions: [],
        companyIden: '',
        companyKey: ''
      }
    },
    computed: {
      companyOptions () {
        return this.$store.state.variable.operatorList
      }
    },
    created () {
      const storeInfo = this.$store.state.variable.gameOneItem
      if (this.$store.state.variable.isEdit) {
        this.managerInfo = {
          gameId: storeInfo.gameId,
          gameName: storeInfo.gameName, // 供应商名称
          gameIden: storeInfo.gameIden, // 供应商名标识
          gameRecommend: storeInfo.gameRecommend, // 简介
          kindId: Number(storeInfo.kindId)-Number(storeInfo.gameType), // kindId
          gameType: storeInfo.gameType, // 游戏类别
          gameImg: storeInfo.gameImg, // logo
          ip: storeInfo.ip, // 服务器ip
          isWebGame: storeInfo.isWebGame, // 是否是网页游戏
          port: storeInfo.port, // 端口
          gameLink: storeInfo.gameLink, // 链接
          company: storeInfo.company, // 游戏厂商规则
          companyName: storeInfo.companyName // 游戏厂商规则
        }
//        console.log(this.managerInfo)
        this.isShowWebGame = storeInfo.isWebGame == '1'
        this.companyIden = storeInfo.companyIden
        this.isfinish = {
          gameName: true,
          gameType: true,
          company: true,
          port: true,
          ip: true,
          kindId: true,
          gameRecommend: true,
          gameIden: true
        }
        this.getGameType()
      }
    },
    methods: {
      postCreateform () {
        if (!this.isfinish.gameName || !this.managerInfo.gameType  || !this.isfinish.gameIden ||
          !this.isfinish.port || !this.isfinish.ip || !this.isfinish.gameRecommend || !this.isfinish.kindId || !this.managerInfo.gameImg) {
          this.$message({
            message: '请完善创建信息',
            type: 'error'
          })
        } else {
          this.$store.state.variable.operatorList.forEach((item) => {
            if (item.companyName === this.managerInfo.companyName) {
              this.managerInfo.company = item
              this.managerInfo.companyIden = item.companyIden
            }
          })
          if (this.isShowWebGame && !this.managerInfo.gameLink) {
            return this.$message.error('请输入网页游戏链接')
          }
          this.managerInfo.isWebGame = this.isShowWebGame ? '1' : '0'
          this.managerInfo.gameLink = this.isShowWebGame ? this.managerInfo.gameLink : ''
          this.$store.commit('startLoading')
          invoke({
            url: !this.$store.state.variable.isEdit ? api.addGame : api.gameUpdate,
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
              if(!this.$store.state.variable.isEdit){
                this.$store.commit({
                  type: 'getSuccessGame',
                  data: res.data.payload
                })
                this.$store.commit('changeSteps')
                } else {
                this.$router.push('gameList')
              }
            }
            this.$store.commit('closeLoading')
          })
        }
      },
      resetData () {
        this.managerInfo = {
          gameName: '', // 名称
          gameType: '', // 类别
          company: '', // 供应商
          port: '', // 端口
          ip: '', // 服务器
          gameRecommend: '', // 简介
          gameImg: '', // 图片上传 （暂不实现）
          gameLink: '', // 网页游戏链接
          isWebGame: '', // 网页游戏标识
          gameIden: '', // 标识
          companyIden: '', // 供应商标识
          companyName: '' // 供应商名称
        }
      },
      changeCompany () {
        if (this.managerInfo.companyName) {
          for(let item of this.companyOptions) {
            if (item.companyName === this.managerInfo.companyName) {
              this.companyKey = item.companyKey
              this.companyIden = item.companyIden
            }
          }
        } else {
          this.companyKey = ''
        }
        this.getGameType()
      }, // 处理select选择后联动
      getGameType () {
        !this.$store.state.variable.isEdit && (this.managerInfo.gameType = '')
        invoke({
          url: api.gameBigType,
          method: api.post,
          data: {
            companyIden: this.managerInfo.companyName ? this.companyIden : ''
          }
        })
        .then(res => {
          const [err, ret] = res
          if (err) {
            this.$message({
              message: err.msg,
              type: 'error'
            })
          } else {
            this.gameTypeOptions = ret.data.payload
          }
        })
      },
      requestHeader () {
        const dev = `https://s3-ap-southeast-1.amazonaws.com/image-na-dev/${this.imgFile.name}` //测试环境
        const prod = `https://d38xgux2jezyfx.cloudfront.net/${this.imgFile.name}` //开发环境
        invoke({
          url: this.uploadAction,
          method: 'put',
          data: this.imgFile,
          isToken: 'false'
        }).then(res => {
          const [err, ret] = res
          if (err) {
            this.$message({
              message: err.msg,
              type: 'error'
            })
          } else {
            this.dialogLoading = false
            this.$message.success('上传成功')
            this.managerInfo.gameImg = (process.env.NODE_ENV == 'development') ? dev : prod
//            console.log(this.managerInfo.gameImg, 'this.managerInfo')
          }
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
        let fileName = this.suffixFun(file.name)
        this.imgFile = file
//        this.imgFile.fileName = `${fileName[0]+new Date().getTime()}.${fileName[1]}`
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
            url: api.uploadImg,
            method: api.post,
            data: {
              contentType: 'image',
              filePath: this.imgFile.name
            }
          }).then(res => {
            const [err, ret] = res
            if (err) {
              this.$message({
                message: err.msg,
                type: 'error'
              })
            } else {
              this.uploadAction = ret.data.payload[0].aws
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
      }, // 错误回调
      suffixFun (o) {
        let arr = o.split('.')
        return arr
      } // 截取文件名的后缀
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*创建代理商列表*/
  .outcreate{margin-bottom: 4rem}
  .createform{width:52.5rem;margin: 0 auto;}
  .input{width: 100%  ;}
  /*.select-width{max-width: 336px}*/
  .title{font-weight: normal;color: #5a5a5a;margin: 1rem 0 2rem 0;text-align: center;margin-left: -30rem}
  .stepbtn{text-align: center}
</style>
