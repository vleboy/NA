<template>
  <div class="outcreate">
    <h2 class="title">运营商信息</h2>
    <el-form :model="managerInfo" :rules="rules" ref="managerInfo" class="createform" label-width="150px" label-position="right">
      <el-form-item label="运营商名称" prop="companyName">
        <el-input v-model="managerInfo.companyName" class="input" placeholder="请输入" :maxlength='20'></el-input>
      </el-form-item>
      <el-form-item label="运营商描述" prop="companyDesc">
        <el-input v-model="managerInfo.companyDesc" class="input" type="textarea" placeholder="请输入" :maxlength='200'></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="companyContact">
        <el-input v-model="managerInfo.companyContact" class="input" placeholder="请输入" :maxlength='16'></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="companyContactWay">
        <el-input v-model="managerInfo.companyContactWay" type="number" class="input" placeholder="请输入" :maxlength='20'></el-input>
      </el-form-item>
      <el-form-item label="联系邮箱（重要）" prop="companyEmail">
        <el-input v-model="managerInfo.companyEmail" class="input" placeholder="请输入" :maxlength='30'></el-input>
      </el-form-item>
    </el-form>
    <h2 class="title">合同信息</h2>
    <el-form :model="managerInfo" :rules="rules" ref="managerInfo" class="createform" label-width="150px" label-position="right">
      <el-form-item label="所属区域" prop="companyRegion">
        <el-select v-model="managerInfo.companyRegion" placeholder="请选择" clearable class="input">
          <el-option v-for="item in regionOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上传合同/执照">
        <el-upload
          class="upload-demo"
          action="//upload.qiniu.com"
          ref="upload"
          list-type="picture"
          :on-success="handleSuccess"
          :on-error="handleError"
          :before-upload="beforeUpload"
          :on-remove='changeRemove'
          :data="form">
        <el-button size="small" type="primary">选取文件</el-button>
        <div slot="tip" class="el-upload__tip">压缩包格式：.zip，且不超过20M；图片格式jpg/png，且不超过5M</div>
      </el-upload>
      </el-form-item>
      <el-form-item label="合同备注" prop="remark">
        <el-input v-model="managerInfo.remark" class="input" placeholder="请输入" type="textarea" :maxlength='200'></el-input>
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
        data: 'addOperator'
      })
    },
    data () {
      var validateCompanyName = (rule, value, callback) => {
        var regName = new RegExp(/^[\u4E00-\u9FA5A-Za-z0-9_]+$/)
        if (value === '') {
          callback(new Error('请输入运营商名称'))
        } else if (!regName.exec(value)) {
          callback(new Error('请输入中英文或者数字'))
        } else if (value.length < 2) {
          callback(new Error('必须为两位数'))
        } else {
          callback()
          this.isfinish.companyName = true
        }
      } // 运营商名称
      var validateCompanyDesc = (rule, value, callback) => {
        if (value && value.length < 2) {
          callback(new Error('必须为两位数'))
          this.isfinish.companyDesc = false
        } else {
          callback()
          this.isfinish.companyDesc = true
        }
      } // 运营商描述
      var validateCompanyEmail = (rule, value, callback) => {
        var email = new RegExp(/^([a-zA-Z0-9_-]){1,16}@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/)
        if (value === '') {
          callback(new Error('请输入邮箱'))
        } else if (!email.exec(value)) {
          callback(new Error('邮箱格式不对，长度为2-16个字符'))
        } else {
          callback()
          this.isfinish.companyEmail = true
        }
      } // 验证邮箱
      var validateCompanyContactWay = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入联系方式'))
        } else if (value.length < 2 || value.length > 20) {
          callback(new Error('长度位2-20个字符'))
        } else {
          callback()
          this.isfinish.companyContactWay = true
        }
      } // 联系方式
      var validateCompanyContact = (rule, value, callback) => {
        var reg = new RegExp(/^[\u4E00-\u9FA5A-Za-z0-9_]+$/)
        if (value === '') {
          callback(new Error('请输入联系人'))
        } else if (!reg.exec(value)) {
          callback(new Error('请输入中英文或者数字'))
        } else if (value.length < 2) {
          callback(new Error('必须为两位数'))
        } else {
          callback()
          this.isfinish.companyContact = true
        }
      } // 联系人
      var validateCompanyRegion = (rule, value, callback) => {
        console.log(value, 'value validateCompanyRegion')
        if (value === '') {
          callback(new Error('请选择所属区域'))
        } else {
          callback()
          this.isfinish.companyRegion = true
        }
      } // 选择所属区域
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
      return {
        isfinish: {
          companyName: false,
          companyDesc: true, // 不是必填  所以默认为true
          companyContactWay: false,
          companyContact: false,
          companyEmail: false,
          companyRegion: false,
          companyContract: false,
          remark: true, // 不是必填  所以默认为true
          license: false
        },
        managerInfo: {
          companyName: '', // 运营商名称
          companyDesc: '', // 运营商描述
          companyContactWay: '', // 联系方式
          companyContact: '', // 联系人
          companyEmail: '', // 邮箱
          companyRegion: '', // 所属区域
          companyContract: '', // 合同
          license: '', // 执照
          remark: '' // 类型
        }, // 创建列表
        rules: {
          companyName: [
            {validator: validateCompanyName, trigger: 'blur'}
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
          companyRegion: [
            {validator: validateCompanyRegion, trigger: 'blur'}
          ],
          companyContract: [
            {validator: validateCompanyContract, trigger: 'blur'}
          ],
          companyContact: [
            {validator: validateCompanyContact, trigger: 'blur'}
          ],
          remark: [
            {validator: validateRemark, trigger: 'blur'}
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
        form: {
          key: '',
          token: ''
        },
        fileList: [],
        fileSuffix: ['jpg', 'png', 'zip']
      }
    },
    computed: {},
    methods: {
      postCreateform () {
        this.fileList.forEach(item => {
          if (this.suffixFun(item.name).toLowerCase() === 'zip') {
            this.managerInfo.companyContract = `http://ouef62ous.bkt.clouddn.com/${item.name}`
          } else {
            this.managerInfo.license = `http://ouef62ous.bkt.clouddn.com/${item.name}`
          }
        })
        if (this.isfinish.companyName === false || this.isfinish.companyEmail === false || this.isfinish.companyDesc === false ||
          this.isfinish.companyContactWay === false || this.isfinish.remark === false || this.isfinish.companyContact === false) {
          this.$message({
            message: '请完善创建信息',
            type: 'error'
          })
        } else {
          this.$store.commit('startLoading')
          invoke({
            url: api.addCompanyNew,
            method: api.post,
            data: this.managerInfo
          }).then((data) => {
            let [err, res] = data
            console.log(err, res)
            if (err) {
              this.$message({
                message: err.msg,
                type: 'error'
              })
            } else if (res) {
              this.$store.commit({
                type: 'getSuccessOperator',
                data: res.data.payload
              })
              this.$store.commit({
                type: 'changeSteps'
              })
            }
            this.$store.commit('closeLoading')
          })
        }
      },
      resetData () {
        this.managerInfo = {
          companyName: '', // 运营商名称
          companyDesc: '', // 运营商描述
          companyContactWay: '', // 联系方式
          companyContact: '', // 联系人
          companyEmail: '', // 邮箱
          companyRegion: '', // 所属区域
          companyContract: '', // 合同
          license: '', // 执照
          remark: '' // 类型
        }
      },
      handleSuccess (response, file, fileList) {
        this.fileList = fileList
      }, // 文件上传成功回调
      beforeUpload (file) {
        const isSizeZip = file.size / 1024 / 1024 < 20
        const isSizeImg = file.size / 1024 / 1024 < 5
        const suffix = this.suffixFun(file.name).toLowerCase()

        return new Promise((resolve, reject) =>{
          if (!(this.fileSuffix.indexOf(suffix) > -1)) {
            this.$message.error('对不起，只能上传zip/jpg/png格式的文件')
            reject(false)
          } else if ((suffix === ('jpg' || 'png')) && !isSizeImg) {
            this.$message.error('大小不能超过5MB!')
            reject(false)
          } else if ((suffix === 'zip') && !isSizeZip) {
            this.$message.error('大小不能超过20MB!')
            reject(false)
          } else if (this.fileList.length === 3) {
            this.$message.error('对不起，只能上传两个附件')
            reject(false)
          } else if (this.fileList.length === 2 && (this.suffixFun(this.fileList[0].name) !== 'zip')) {
            if ((suffix === 'jpg') || (suffix === 'png')) {
              this.$message.error('请上传不同类型的附件（IMG/ZIP）')
              reject(false)
            }
          } else if (this.fileList.length === 2 && (this.suffixFun(this.fileList[0].name) === 'zip')) {
            if (this.suffixFun(this.fileList[0].name) === suffix) {
              this.$message.error('请上传不同类型的附件（IMG/ZIP）')
              reject(false)
            }
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
      handleError (err) {
        console.log(err)
        if (err) {
          this.$message.error('上传失败，请重新选择')
        }
      }, // 错误回调
      changeRemove (file) {
        if (file && (this.suffixFun(file.name).toLowerCase() === 'zip')) {
          this.managerInfo.companyContract = ''
        } else {
          this.managerInfo.license = ''
        }
        console.log(this.managerInfo, 'change')
      }, // 移除事件
      suffixFun (o) {
        let arr = o.split('.')
        return arr[arr.length - 1]
      } // 截取文件名的后缀
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*创建代理商列表*/
  .createform{width:52.5rem;margin: 0 auto;}
  .input{width: 100%;}
  .title{font-weight: normal;color: #5a5a5a;margin: 1rem 0 2rem 0;text-align: center;margin-left: -35rem}
  .stepbtn{text-align: center;}
</style>
