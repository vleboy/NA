<template>
  <div class="outcreate" v-loading.body="dialogLoading" element-loading-text="上传中，请稍等">
    <h2 class="title">供应商信息</h2>
    <el-form :model="managerInfo" :rules="rules" ref="managerInfo" class="createform" label-width="150px" label-position="right">
      <el-form-item label="供应商名称" prop="companyName">
        <el-input v-model="managerInfo.companyName" class="input" :disabled="this.$store.state.variable.isEdit" placeholder="请输入供应商名称" :maxlength='20'></el-input>
      </el-form-item>
      <el-form-item label="供应商标识" prop="companyIden">
        <el-input v-model="managerInfo.companyIden" class="input" :disabled="this.$store.state.variable.isEdit" placeholder="请输入供应商标识（1-6位非中文）" :maxlength='20'></el-input>
      </el-form-item>
      <el-form-item label="供应商描述" prop="companyDesc">
        <el-input v-model="managerInfo.companyDesc" class="input" type="textarea" placeholder="请输入供应商描述" :maxlength='200'></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="companyContact">
        <el-input v-model="managerInfo.companyContact" class="input" placeholder="请输入联系人" :maxlength='16'></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="companyContactWay">
        <el-input v-model="managerInfo.companyContactWay" type="number" class="input" placeholder="请输入联系方式" :maxlength='20'></el-input>
      </el-form-item>
      <el-form-item label="联系邮箱（重要）" prop="companyEmail">
        <el-input v-model="managerInfo.companyEmail" class="input" placeholder="请输入联系邮箱（重要）" :maxlength='30'></el-input>
      </el-form-item>
      <el-form-item label="游戏类别（可多选）" prop="gameTypeList" >
        <el-select v-model="managerInfo.gameTypeList" allow-create filterable multiple placeholder="请选择游戏类别（可多选）" clearable class="input">
          <el-option v-for="item in optionsList" :key="item.code" :label="item.name" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <h2 class="title">合同信息</h2>
    <el-form :model="managerInfo" :rules="rules" ref="managerInfo" class="createform" label-width="150px" label-position="right">
      <el-form-item label="供应商接入类型" prop="companyType" >
        <el-select v-model="managerInfo.companyType" placeholder="请选择" clearable class="input" :disabled="this.$store.state.variable.isEdit">
          <el-option v-for="item in companyTypeArray" :key="item.id" :label="item.value" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属区域" prop="companyRegion" v-if='managerInfo.companyType==1'>
        <el-select v-model="managerInfo.companyRegion" placeholder="请选择" clearable class="input">
          <el-option v-for="item in regionOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上传合同" v-if='managerInfo.companyType==1'>
        <el-upload
          class="upload-demo"
          :action="uploadAction"
          ref="upload"
          :on-success="handleSuccess"
          :on-error="handleError"
          :before-upload="beforeUpload"
          :http-request="requestHeader"
          :on-remove='changeRemove'
          :file-list="arrayList"
          :data="form">
        <el-button size="small" type="primary">选取文件</el-button>
        <div slot="tip" class="el-upload__tip">压缩包格式：.zip，且不超过20M</div>
      </el-upload>
      </el-form-item>
      <el-form-item label="上传执照" prop="license" v-if='managerInfo.companyType==1'>
        <el-upload
          :action="uploadAction"
          class="g-avatar-uploader"
          ref="upload"
          :show-file-list="false"
          :http-request="requestHeaderTwo"
          :on-success="handleSuccessTwo"
          :on-error="handleErrorTwo"
          :before-upload="beforeUploadTwo"
          :data="form">
          <img v-if="managerInfo.license" :src="managerInfo.license" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="el-upload__tip">只能上传一张jpg/png文件，且不超过5M</div>
        <el-button type="text" @click="removeLicense" v-if="managerInfo.license">清除执照</el-button>
      </el-form-item>
      <el-form-item label="接入分成比(%)" prop="companyRatio" v-if='managerInfo.companyType==2'>
        <el-input v-model="managerInfo.companyRatio" class="input" placeholder="请输入接入分成比(范围0.00-100.00)" :maxlength='16'></el-input>
      </el-form-item>
      <!--<el-form-item label="接入KEY" prop="companyKey" v-if='managerInfo.companyType==2'>-->
      <!--<el-input v-model="managerInfo.companyKey" class="input" placeholder="请输入接入KEY" :maxlength='16'></el-input>-->
    <!--</el-form-item>-->

      <el-form-item label="合同备注" prop="remark">
        <el-input v-model="managerInfo.remark" class="input" placeholder="请输入合同备注" type="textarea" :maxlength='200'></el-input>
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
        data: 'addOperator'
      })
    },
    data () {
      var validateCompanyName = (rule, value, callback) => {
        var regName = new RegExp(/^[\u4E00-\u9FA5A-Za-z0-9_]+$/)
        if (value === '') {
          this.isfinish.companyName = false
          callback(new Error('请输入供应商名称'))
        } else if (!regName.exec(value)) {
          this.isfinish.companyName = false
          callback(new Error('请输入中英文或者数字'))
        } else if (value.length < 2) {
          this.isfinish.companyName = false
          callback(new Error('必须为两位数'))
        } else {
          callback()
          this.isfinish.companyName = true
        }
      } // 供应商名称
      var validateCompanyIden = (rule, value, callback) => {
        if (value === '') {
          this.isfinish.companyIden = false
          callback(new Error('请输入供应商标识'))
        } else if (!pattern.nonChinese.exec(value) || value.length > 6 || value.length < 1) {
          this.isfinish.companyIden = false
          callback(new Error('请输入1-6位非中文字符'))
        } else {
          callback()
          this.isfinish.companyIden = true
        }
      } // 供应商标识
      var validateCompanyDesc = (rule, value, callback) => {
        if (value && value.length < 2) {
          callback(new Error('必须为两位数'))
          this.isfinish.companyDesc = false
        } else {
          callback()
          this.isfinish.companyDesc = true
        }
      } // 供应商描述
      var validateCompanyEmail = (rule, value, callback) => {
        var email = new RegExp(/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/)
        if (value === '') {
          this.isfinish.companyEmail = false
          callback(new Error('请输入邮箱'))
        } else if (!email.exec(value)) {
          this.isfinish.companyEmail = false
          callback(new Error('邮箱格式不对，长度为2-16个字符'))
        } else {
          callback()
          this.isfinish.companyEmail = true
        }
      } // 验证邮箱
      var validateCompanyContactWay = (rule, value, callback) => {
        if (value === '') {
          this.isfinish.companyContactWay = false
          callback(new Error('请输入联系方式'))
        } else if (value.length < 2 || value.length > 20) {
          this.isfinish.companyContactWay = false
          callback(new Error('长度位2-20个字符'))
        } else {
          callback()
          this.isfinish.companyContactWay = true
        }
      } // 联系方式
      var validateCompanyContact = (rule, value, callback) => {
        var reg = new RegExp(/^[\u4E00-\u9FA5A-Za-z0-9_]+$/)
        if (value === '') {
          this.isfinish.companyContact = false
          callback(new Error('请输入联系人'))
        } else if (!reg.exec(value)) {
          this.isfinish.companyContact = false
          callback(new Error('请输入中英文或者数字'))
        } else if (value.length < 2) {
          this.isfinish.companyContact = false
          callback(new Error('必须为两位数'))
        } else {
          callback()
          this.isfinish.companyContact = true
        }
      } // 联系人
      var validateCompanyRatio = (rule, value, callback) => {
        if(this.managerInfo.companyType == 2) {
          if (value === '') {
            callback(new Error('请输入成数'))
            this.isfinish.companyRatio = false
          } else if (!pattern.digitalRange.exec(value)) {
            callback(new Error('成数范围在0.00-100之间'))
            this.isfinish.companyRatio = false
          } else {
            callback()
            this.isfinish.companyRatio = true
          }
        }
      } // 成数
      var validateCompanyType = (rule, value, callback) => {
        if (value === '') {
          this.isfinish.companyType = false
          callback(new Error('请选择接入类型'))
        } else {
          callback()
          this.isfinish.companyType = true
        }
      } // 接入类型
      var validateCompanyContract = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请上传合同'))
        } else {
          callback()
          this.isfinish.companyContract = true
        }
      } // 验证负责人联系方式
      var validateRemark = (rule, value, callback) => {
        if (value && value.length < 2) {
          callback(new Error('必须为两位数'))
          this.isfinish.remark = false
        } else {
          callback()
          this.isfinish.remark = true
        }
      } // 类型
      var validateGameTypeList = (rule, value, callback) => {
        if (!value.length) {
          callback(new Error('请选择游戏类别'))
          this.isfinish.gameTypeList = false
        } else {
          callback()
          this.isfinish.gameTypeList = true
        }
      } // 类型
      return {
        isfinish: {
          companyName: false,
          companyIden: false,
          companyDesc: true, // 不是必填  所以默认为true
          companyContactWay: false,
          companyContact: false,
          companyEmail: false,
          companyRegion: false,
          companyType: false,
          companyContract: false,
          companyRatio: false,
          remark: true, // 不是必填  所以默认为true
          license: false,
          gameTypeList: false
        },
        managerInfo: {
          companyName: '', // 供应商名称
          companyDesc: '', // 供应商描述
          companyContactWay: '', // 联系方式
          companyContact: '', // 联系人
          companyEmail: '', // 邮箱
          companyRegion: '', // 所属区域
          companyContract: '', // 合同
          license: '', // 执照
          remark: '', // 类型
          companyKey: '', // key（B类才有）
          companyRatio: '', // 成数 （B类才有）
          companyType: '', // 供应商类别
          companyIden: '', // 供应商标识
          gameTypeList : [] // 游戏类别
        }, // 创建列表
        rules: {
          companyName: [
            {validator: validateCompanyName, trigger: 'blur'}
          ],
          companyIden: [
            {validator: validateCompanyIden, trigger: 'blur'}
          ],
          companyDesc: [
            {validator: validateCompanyDesc, trigger: 'blur'}
          ],
          companyContactWay: [
            {validator: validateCompanyContactWay, trigger: 'blur'}
          ],
          companyEmail: [
            {validator: validateCompanyEmail, trigger: 'blur'}
          ],
          companyRatio: [
            {validator: validateCompanyRatio, trigger: 'blur'}
          ],
          companyType: [
            {validator: validateCompanyType, trigger: 'blur'}
          ],
          companyContract: [
            {validator: validateCompanyContract, trigger: 'blur'}
          ],
          companyContact: [
            {validator: validateCompanyContact, trigger: 'blur'}
          ],
          remark: [
            {validator: validateRemark, trigger: 'blur'}
          ],
          gameTypeList: [
            {validator: validateGameTypeList, trigger: 'blur'}
          ]
        }, // 列表验证规则
        regionOptions: [
          {
            label: '亚太',
            value: '1'
          }, {
            label: '大陆',
            value: '2'
          }, {
            label: '港澳台',
            value: '3'
          }, {
            label: '欧洲',
            value: '4'
          }, {
            label: '美洲',
            value: '5'
          }
        ],
        uploadAction: '',
        imgFile:{},
        form: {
          key: '',
          token: ''
        },
        arrayList: [],
        fileList: [],
        fileSuffix: ['zip'],
        dialogLoading: false,
        companyTypeArray:[
          {
          id: 1,
          value: 'A类（接入公司的游戏供应商）'
          },{
            id: 2,
            value: 'B类（公司接入的游戏供应商）'
          }],
        optionsList: []
      }
    },
    created () {
      this.getGameTypeList()
      const storeInfo = this.$store.state.variable.operatorItem
      if (this.$store.state.variable.isEdit) {
        this.managerInfo = {
          companyId: storeInfo.companyId,
          companyName: storeInfo.companyName, // 供应商名称
          companyIden: storeInfo.companyIden.toUpperCase(), // 供应商名标识
          companyDesc: storeInfo.companyDesc == 'NULL!' ? '' : storeInfo.companyDesc, // 供应商描述
          companyContactWay: storeInfo.companyContactWay, // 联系方式
          companyContact: storeInfo.companyContact, // 联系人
          companyEmail: storeInfo.companyEmail, // 邮箱
          companyType: storeInfo.companyType, // 类型
          companyKey: storeInfo.companyKey, // key
          companyRatio: storeInfo.companyRatio, // 成数
          gameTypeList: storeInfo.gameTypeList, // 游戏类别
          companyRegion: storeInfo.companyRegion == 'NULL!' ? '' : storeInfo.companyRegion, // 所属区域
          companyContract: storeInfo.companyContract == 'NULL!' ? '' : storeInfo.companyContract, // 合同
          license: storeInfo.license == 'NULL!' ? '' : storeInfo.license, // 执照
          remark: storeInfo.remark == 'NULL!' ? '' : storeInfo.remark// 类型
        }
        if(this.managerInfo.companyContract) {
          this.arrayList.push({
            name: this.managerInfo.companyContract.split('/')[3],
            url: this.managerInfo.companyContract
          })
        }

        this.isfinish = {
            companyName: true,
            companyContactWay: true,
            companyContact: true,
            companyIden: true,
            companyRatio: true,
            companyEmail: true,
            companyRegion: true,
            gameTypeList : true
        }
      } else {
        this.managerInfo = {
          companyName: '', // 供应商名称
          companyIden: '', // 供应商标识
          companyDesc: '', // 供应商描述
          companyContactWay: '', // 联系方式
          companyContact: '', // 联系人
          companyEmail: '', // 邮箱
          companyRegion: '', // 所属区域
          companyContract: '', // 合同
          companyType: '', // 类型
          companyKey: '', // key
          companyRatio: '', // 成数
          license: '', // 执照
          remark: '', // 类型
          gameTypeList : [] // 游戏类别
        }
      }
    },
    computed: {},
    methods: {
      getGameTypeList () {
        this.$store.commit('startLoading')
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
              this.optionsList = ret.data.payload
            }
            this.$store.commit('closeLoading')
          })
      },
      postCreateform () {
        if (!this.isfinish.companyName || !this.isfinish.companyEmail || this.isfinish.companyDesc == false ||
          !this.isfinish.companyContactWay || this.isfinish.remark == false || !this.isfinish.companyContact ||
          !this.isfinish.companyIden || !this.managerInfo.companyType || (!this.isfinish.companyRatio && (this.managerInfo.companyType==2))||
          !this.managerInfo.gameTypeList.length) {
          this.$message({
            message: '请完善创建信息',
            type: 'error'
          })
        } else {
          this.$store.commit('startLoading')
          this.managerInfo.companyRatio = +this.managerInfo.companyRatio
          invoke({
            url: this.$store.state.variable.isEdit ? api.companyUpdate : api.addCompanyNew,
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
              if (!this.$store.state.variable.isEdit){
                this.$store.commit({
                  type: 'getSuccessOperator',
                  data: res.data.payload
                })
                this.$store.commit({
                  type: 'changeSteps'
                })
              } else {
                this.$router.push('operatorList')
              }
            }
            this.$store.commit('closeLoading')
          })
        }
      },
      resetData () {
        this.managerInfo = {
          companyName: '', // 供应商名称
          companyIden: '', // 供应商标识
          companyDesc: '', // 供应商描述
          companyContactWay: '', // 联系方式
          companyContact: '', // 联系人
          companyEmail: '', // 邮箱
          companyKey: '', // key
          companyRatio: '', // 成数
          companyRegion: '', // 所属区域
          companyType: '', // 供应商类型
          companyContract: '', // 合同
          license: '', // 执照
          remark: '', // 类型
          gameTypeList : [] // 游戏类别
        }
      },
      requestHeader () {
        const dev = `https://s3-ap-southeast-1.amazonaws.com/image-na-dev/${this.imgFile.fileName}` //测试环境
        const prod = `https://d38xgux2jezyfx.cloudfront.net/${this.imgFile.fileName}` //开发环境
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
            this.managerInfo.companyContract = (process.env.NODE_ENV == 'development') ? dev : prod
//            console.log(this.managerInfo.companyContract, 'this.managerInfo')
          }
        })
      },

      // 合同文件
      handleSuccess (response, file, fileList) {
        this.dialogLoading = false
        this.$message.success('上传成功')
        this.fileList = fileList
        this.managerInfo.companyContract = `https://ouef62ous.bkt.clouddn.com/${response.key}`
      }, // 文件上传成功回调
      beforeUpload (file, fileList) {
        let fileName = this.suffixFun(file.name)
        const isSizeZip = file.size / 1024 / 1024 < 10
        const suffix = fileName[1].toLowerCase()
        this.imgFile = file
        this.imgFile.fileName = `${fileName[0]+new Date().getTime()}.${fileName[1]}`
        return new Promise((resolve, reject) =>{
          this.dialogLoading = true
          if (suffix != 'zip') {
            this.dialogLoading = false
            this.$message.error('上传文件只能是zip格式!')
            reject(false)
          } else if (!isSizeZip) {
            this.dialogLoading = false
            this.$message.error('文件大小不能超过 20MB!')
            reject(false)
          } else if (this.fileList.length>1) {
            this.dialogLoading = false
            this.$message.error('文件只能上传一个')
            reject(false)
          }

          invoke({
            url: api.uploadImg,
            method: api.post,
            data: {
              contentType: 'image',
              filePath: this.imgFile.fileName
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
//            console.log(err)
            reject(false)
          })
        })
      }, // 上传前的检验 格式、大小等
      handleError (err) {
        this.dialogLoading = false
        this.$message.error('上传失败，请重新选择')
      }, // 错误回调
      changeRemove (file) {
        this.managerInfo.companyContract = ''
//        console.log(this.managerInfo)
      }, // 移除事件

      // 上传执照
      requestHeaderTwo () {
        const dev = `https://s3-ap-southeast-1.amazonaws.com/image-na-dev/${this.imgFile.fileName}` //测试环境
        const prod = `https://d38xgux2jezyfx.cloudfront.net/${this.imgFile.fileName}` //开发环境
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
            this.managerInfo.license = (process.env.NODE_ENV == 'development') ? dev : prod
//            console.log(this.managerInfo.license, 'this.managerInfo')
          }
        })
      },

      handleSuccessTwo (response, file, fileList) {
        this.dialogLoading = false
        this.$message.success('上传成功')
        this.managerInfo.license = `https://ouef62ous.bkt.clouddn.com/${response.key}`
      }, // 图片上传成功回调
      beforeUploadTwo (file) {
        const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png')
        const isLt1M = file.size / 1024 / 1024 < 5
        let fileName = this.suffixFun(file.name)
        this.imgFile = file
        this.imgFile.fileName = `${fileName[0]+new Date().getTime()}.${fileName[1]}`
        return new Promise((resolve, reject) =>{
          this.dialogLoading = true
          if (!isJPG) {
            this.dialogLoading = false
            this.$message.error('上传头像图片只能是 JPG或者PNG 格式!')
            reject(false)
          } else if (!isLt1M) {
            this.dialogLoading = false
            this.$message.error('上传游戏LOGO大小不能超过 5MB!')
            reject(false)
          }

          invoke({
            url: api.uploadImg,
            method: api.post,
            data: {
              contentType: 'image',
              filePath: this.imgFile.fileName
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
//            console.log(err)
            reject(false)
          })
        })
      }, // 上传前的检验 格式、大小等
      removeLicense () {
        this.managerInfo.license = ''
      },
      handleErrorTwo (err) {
        this.dialogLoading = false
        this.$message.error('上传失败，请重新选择')
      }, // 错误回调
      suffixFun (o) {
        let arr = o.split('.')
        return arr
      } // 截取文件名的后缀
    },
    beforeDestroy () {
      this.$store.commit('isCloseEdit')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*创建代理商列表*/
  .outcreate{margin-bottom: 40px}
  .createform{width:52.5rem;margin: 0 auto;}
  .input{width: 100%;}
  .title{font-weight: normal;color: #5a5a5a;margin: 1rem 0 2rem 0;text-align: center;margin-left: -35rem}
  .stepbtn{text-align: center;}
</style>
