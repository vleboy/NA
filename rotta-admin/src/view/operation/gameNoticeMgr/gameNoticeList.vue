<template>
  <div>
    <div class="gameNoticeList -search">
      <el-row class="transition-box">
        <el-col :span="10">
          <span>公告ID: </span>
          <el-input placeholder="请输入" class="input" v-model="searchInfo.searchId"></el-input>
        </el-col>
        <el-col :span="10">
          <span>公告名称：</span>
          <el-input placeholder="请输入" class="input" v-model="searchInfo.searchName"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="startSearch">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-col>
      </el-row>
    </div>
    <p class="searchResult">共搜索到 {{gameNoticeList.length || 0}} 条数据</p>
    <el-button type="primary" class="justfy1" @click="openModal()">创建公告</el-button>
    <div class="gameNoticeList">
      <el-table stripe :data="getItems">
        <el-table-column label="公告ID" prop="adId" align="center">
        </el-table-column>
        <el-table-column label="公告名称" prop="adName" align="center" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column label="图片" prop="createdAt" :formatter="getAtime">
          <template scope="scope">
            <img :src="scope.row.img" style="width:50px;height: 50px;padding: 0.5rem 0;">
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createdAt" :formatter="getAtime" width="190">
        </el-table-column>
        <el-table-column label="状态" align="center" width="90" class-name="green">
          <template scope="scope">
            <el-tag :type="scope.row.adStatus == 1 ? 'success' : 'gray'">
              {{noticeStatus[scope.row.adStatus]}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center" >
          <template scope="scope">
            <el-popover trigger="hover" placement="bottom-start" width="250">
              <p>{{ scope.row.remark === 'NULL!' ? '' : scope.row.remark}}</p>
              <div slot="reference" class="">
                <el-icon name="search" style="color:#108ee9"></el-icon>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="100">
          <template scope="scope">
            <el-button type="text" @click="changeStatus(scope.row)">{{scope.row.adStatus==1 ? '停用' : '开启'}}</el-button>
            <el-button type="text" @click="openModal(scope.row)">编辑</el-button>
            <el-button v-if="scope.row.adStatus" type="text" @click="delItem(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination layout="prev, pager, next, sizes, jumper" :total="gameNoticeList.length"
                       :page-sizes="[20, 50]" :page-size="nowSize" @size-change="getNowsize" @current-change="getNowpage">
        </el-pagination>
      </div>
    </div>

    <el-dialog title="发布公告" :visible.sync="isOpenModal" style="text-align: center">
      <el-form :model="noticeInfo" v-loading.body="dialogLoading" element-loading-text="上传中，请稍等">
        <el-form-item label="公告名称" label-width="140px" >
          <el-input v-model="noticeInfo.adName" auto-complete="off" placeholder="请输入公告名称" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="跳转链接" label-width="140px" >
          <el-input v-model="noticeInfo.url" auto-complete="off" placeholder="请输入跳转的链接 例（http://www.xxxx.com）" :maxlength="500"></el-input>
        </el-form-item>
        <el-form-item label="公告图标" label-width="140px" style="text-align: left">
          <el-upload
            :action="url"
            class="g-avatar-uploader"
            ref="upload"
            :http-request="requestHeader"
            :on-success="handleSuccess"
            :on-error="handleError"
            :before-upload="beforeUpload"
            :file-list="fileList"
            :show-file-list="false">
            <img v-if="noticeInfo.img" :src="noticeInfo.img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="el-upload__tip">只能上传一张jpg/png文件，且不超过10M</div>
        </el-form-item>
        <el-form-item label="备注" label-width="140px" >
          <el-input v-model="noticeInfo.remark" type="textarea" :rows="4" auto-complete="off" placeholder="请输入备注"
                    :maxlength="200"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isOpenModal = false">取 消</el-button>
        <el-button type="primary" :load="isSending" @click="submitProp(noticeInfo.adId)">{{isSending ? '提交中' : '确 定'}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { detailTime } from '@/behavior/format'
import { invoke } from '@/libs/fetchLib'
import { pattern } from '@/behavior/regexp'
import api from '@/api/api'
export default {
  name: 'app',
  beforeCreate () {
    this.$store.commit('returnLocalStorage')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'gameNoticeList'
    })
  },
  created () {
    this.getGameNoticeList()
  },
  data () {
    return {
      nowSize: 20,
      nowPage: 1,
      url: '',
      isOpenModal: false,
      isSending: false,
      dialogLoading: false,
      fileList: [],
      uploadAction: '',
      imgFile:{},
      noticeStatus: ['已停用', '正常'],
      gameNoticeList: [],
      noticeInfo: {
        adName: '',
        url: '',
        img: '',
        remark: ''
      },
      searchInfo: {
        searchId: '',
        searchName: ''
      },
      searchArray: [], // 暂时加储
      dateOption: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 3600 * 1000 * 24
        }
      }
    }
  },
  computed: {
    getItems () {
      if (this.nowPage === 1) {
        return this.gameNoticeList.slice(0, this.nowSize)
      } else {
        return this.gameNoticeList.slice(((this.nowPage - 1) * this.nowSize), this.nowSize * this.nowPage)
      }
    }
  },
  methods: {
    getGameNoticeList () {
      this.$store.commit('startLoading')
      invoke({
        url: api.getGameNoticeList,
        method: api.post
      }).then(
        result => {
          const [err, res] = result
          if (err) {
            this.$message({
              message: err.msg,
              type: 'error'
            })
          } else {
            this.gameNoticeList = res.data.payload
            this.searchArray = res.data.payload
          }
          this.$store.commit('closeLoading')
        }
      )
    },
    submitProp (id) {
      // console.log(pattern.url.exec(this.noticeInfo.url), this.noticeInfo.url)
      if (!this.noticeInfo.adName) {
        return this.$message.error('请输入公告名称')
      } else if (this.noticeInfo.url && !pattern.url.exec(this.noticeInfo.url)) {
        return this.$message.error('请输入格式正确的跳转链接')
      } else if (!this.noticeInfo.img) {
        return this.$message.error('请选择上传图片')
      }
      if (this.isSending) return // 防止重复提交
      this.isSending = true
      invoke({
        url: id ? api.updateGameNotice : api.addGameNotice,
        method: api.post,
        data: this.noticeInfo
      }).then(
        result => {
          const [err, res] = result
          if (err) {
            this.$message({
              message: err.msg,
              type: 'error'
            })
            this.isSending = false
          } else if (res) {
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            this.isOpenModal = false
            this.isSending = false
            this.getGameNoticeList()
            this.fileList = []
          }
        }
      )
    },
    openModal (row = {}) {
      this.isOpenModal = true
      this.isSending = false
      if (JSON.stringify(row) !== '{}') {
        this.fileList = []
        this.noticeInfo = JSON.parse(JSON.stringify(row))
        this.noticeInfo.remark = this.noticeInfo.remark === 'NULL!' ? '' : this.noticeInfo.remark
        this.fileList.push({
          name: '',
          url: this.noticeInfo.img
        })
      } else {
        this.noticeInfo = {
          adName: '',
          url: '',
          img: '',
          remark: ''
        }
        this.fileList = []
      }
    },
    changeStatus (row) {
      this.$store.commit('startLoading')
      invoke({
        url: api.changeGameNoticeStatus,
        method: api.post,
        data: {
          adId: row.adId,
          status: row.adStatus ? 0 : 1
        }
      }).then(
        result => {
          const [err, res] = result
          if (err) {
            this.$message({
              message: err.msg,
              type: 'error'
            })
          } else if (res) {
            this.$message({
              message: '状态改变成功',
              type: 'success'
            })
            this.getGameNoticeList()
          }
          this.$store.commit('closeLoading')
        }
      )
    }, // 更改道具状态
    startSearch () {
      let {searchId, searchName} = this.searchInfo
      this.arrayLocal = JSON.parse(JSON.stringify(this.searchArray))
      if ((!searchId && !searchName)) {
        this.searchArray = []
        this.getGameNoticeList()
      } else if (searchName && searchId) {
        this.gameNoticeList = this.arrayLocal.filter(item => {
          return (item.adName === this.searchInfo.searchName && item.adId === this.searchInfo.searchId)
        })
      } else {
        if (searchName) {
          this.gameNoticeList = this.arrayLocal.filter(item => {
            return item.adName === this.searchInfo.searchName
          })
        } else if (searchId) {
          this.gameNoticeList = this.arrayLocal.filter(item => {
            return item.adId === this.searchInfo.searchId
          })
        }
      }
    }, // 控制搜索条件
    resetSearch () {
      this.searchInfo = {}
      this.searchArray = []
      this.getGameNoticeList()
    },
    getAtime (row, col) {
      return detailTime(row.createdAt)
    }, // 格式化创建时间
    getNowsize (size) {
      this.nowSize = size
      // console.log('当前每页:' + size)
    },
    getNowpage (page) {
      this.nowPage = page
      // console.log('当前是第:' + page + '页')
    },
    delItem (row) {
      this.$confirm(`确定要删除该公告吗？`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        invoke({
          url: api.delGameNotice,
          method: api.post,
          data: {
            adId: row.adId
          }
        }).then(
          result => {
            const [err, res] = result
            if (err) {
              this.$message({
                message: err.msg,
                type: 'error'
              })
            } else if (res) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.isOpenModal = false
              this.getGameNoticeList()
            }
          }
        )
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }, // 删除公告
    requestHeader () {
//      this.uploadAli ()
      this.uploadAws ()
    },
    uploadAli () {
      this.url = 'http://assetdownload.oss-cn-hangzhou.aliyuncs.com'
      let mi = new OSS.Wrapper({
        region: 'oss-cn-hangzhou',
        accessKeyId: this.uploadAction[1].ali.AccessKeyId,
        accessKeySecret: this.uploadAction[1].ali.AccessKeySecret,
        stsToken: this.uploadAction[1].ali.SecurityToken,
        bucket: 'assetdownload'
      })
      console.log(this.imgFile.name)
      let suffix = this.suffixFun(this.imgFile.name)
      let date = new Date().getTime()
      let fileName = `image/${suffix[0]+date}.${suffix[1]}`
      mi.multipartUpload(fileName, this.imgFile, {
      }).then((results) => {
        this.$message.success('上传成功')
        this.dialogLoading = false
        this.noticeInfo.img = results.url || `${this.url}/${results.name}`
        console.log(results,this.noticeInfo.img, 'src')
      }).catch((err) => {
        this.dialogLoading = false
        console.log(err);
      });
    },
    uploadAws () {
      const dev = `https://s3-ap-southeast-1.amazonaws.com/image-na-dev/${this.imgFile.fileName}` //测试环境
      const prod = `https://d38xgux2jezyfx.cloudfront.net/${this.imgFile.fileName}` //开发环境
      invoke({
        url: this.uploadAction[0].aws,
        method: 'put',
        data: this.imgFile,
        isToken: 'false'
      }).then(res => {
        const [err, ret] = res
        if (err) {
          this.dialogLoading = false
          this.$message({
            message: err.msg,
            type: 'error'
          })
        } else {
          this.dialogLoading = false
          this.$message.success('上传成功')
          this.noticeInfo.img = (process.env.NODE_ENV == 'development') ? dev : prod
//           console.log(this.noticeInfo.img, 'this.noticeInfo.img')
        }
      })
    },
    handleSuccess (response, file, fileList) {
      this.dialogLoading = false
      this.$message.success('上传成功')
      this.fileList = fileList
//      this.noticeInfo.img = `https://ouef62ous.bkt.clouddn.com/${response.key}`
    }, // 图片上传成功回调
    beforeUpload (file) {
      let fileName = this.suffixFun(file.name)
      const isLt1M = file.size / 1024 / 1024 < 10
      const suffix = fileName[1].toLowerCase()
      const fileType = ['png', 'jpg']
      this.imgFile = file
      this.imgFile.fileName = `${fileName[0]+new Date().getTime()}.${fileName[1]}`
      return new Promise((resolve, reject) =>{
        this.dialogLoading = true
        if (!(fileType.indexOf(suffix) > -1)) {
          this.dialogLoading = false
          this.$message.error('上传图片只能是 JPG或者PNG 格式!')
          reject(false)
        } else if (!isLt1M) {
          this.dialogLoading = false
          this.$message.error('大小不能超过 10MB!')
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
            this.dialogLoading = false
          } else {
            this.dialogLoading = false
            this.uploadAction = ret.data.payload
            resolve(true)
          }
        }).catch(err => {
          this.dialogLoading = false
          // console.log(err)
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
  .gameNoticeList{padding:1rem 2rem;}
  .-search{margin: 0 2rem; background-color: #f5f5f5; text-align: center }
  .input{width: 80%}
  .searchResult{padding: 1rem 2rem}
  .justfy1{margin:0 2rem;}
  .page {padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 2rem}
</style>
