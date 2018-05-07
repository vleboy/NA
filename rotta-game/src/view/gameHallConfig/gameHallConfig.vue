<template>
  <div class="p-gameHall">
    <el-button type="primary" class="-top-btn" @click="openModal()">创建游戏资源</el-button>
    <el-table stripe :data="gameItems">
      <el-table-column label="游戏名称" prop="gameName" align="center" width="100">
      </el-table-column>
      <el-table-column label="游戏类别"  align="center" width="100">
        <template scope="scope">
          {{gameType[scope.row.gameType]}}
        </template>
      </el-table-column>
      <el-table-column label="推荐图片"  align="center" width="150">
        <template scope="scope">
          <img :src="scope.row.recommendImg" style="width: 100%;padding: 10px">
        </template>
      </el-table-column>
      <el-table-column label="背景图片"  align="center" width="150">
        <template scope="scope">
          <img :src="scope.row.bgImg" style="width: 100%;padding: 10px">
        </template>
      </el-table-column>
      <el-table-column label="轮播图片"  align="center">
        <template scope="scope">
          <img v-for="item of scope.row.carouselImg" :src="item.url" style="width: 20%;padding: 10px">
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state" align="center" width="80">
        <template scope="scope">
          {{gameStatus[scope.row.state]}}
        </template>
      </el-table-column>
      <el-table-column label="推荐" align="center" width="80">
        <template scope="scope">
          {{scope.row.isRecommend ? '是' : '否' }}
        </template>
      </el-table-column>
      <el-table-column label="推荐排序" align="center" width="100" prop="sort">
      </el-table-column>
      <el-table-column label="视频链接(阿里云)" align="center" width="150">
        <template scope="scope">
          {{scope.row.urlAli}}
        </template>
      </el-table-column>
      <el-table-column label="视频链接(亚马逊)" align="center" width="150">
        <template scope="scope">
          {{scope.row.url}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template scope="scope">
          <el-button type="text" class="myBtn" @click="changeRecommend(scope.row)">{{scope.row.isRecommend ? '取消推荐':'推荐'}}</el-button>
          <el-button type="text" class="myBtn" @click="openModal(scope.row)">编辑</el-button>
          <el-button type="text" class="myBtn" @click="delGame(scope.row.businessKey)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑游戏配置" :visible.sync="isOpenModal">
      <el-form :model="gameHallInfo" v-loading.body="dialogLoading" element-loading-text="上传中，请稍等">
        <el-form-item label="游戏名称" label-width="140px" >
          <el-select v-model="gameHallInfo.businessKey" placeholder="请选择" clearable style="width: 100%">
            <el-option v-for="(item, index) in gameList" :key="index" :label="item.gameName" :value="item.kindId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="视频链接(阿里云)" label-width="140px" >
          <el-input v-model="gameHallInfo.urlAli" auto-complete="off" placeholder="请输入正确视频链接 例（http://www.xxxx.com）" :maxlength="500"></el-input>
        </el-form-item>
        <el-form-item label="视频链接(亚马逊)" label-width="140px" >
          <el-input v-model="gameHallInfo.url" auto-complete="off" placeholder="请输入正确视频链接 例（http://www.xxxx.com）" :maxlength="500"></el-input>
        </el-form-item>
        <el-form-item label="推荐排序" label-width="140px" >
          <el-input v-model="gameHallInfo.sort" type="number" auto-complete="off" placeholder="请输入需要推荐的顺序"></el-input>
        </el-form-item>
        <el-form-item label="是否推荐" label-width="140px">
          <el-switch
            v-model="gameHallInfo.isRecommend"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item label="状态" label-width="140px">
          <el-radio-group v-model="gameHallInfo.state">
            <el-radio-button label="0">无</el-radio-button>
            <el-radio-button label="1">最新</el-radio-button>
            <el-radio-button label="2">最热</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="推荐图片" label-width="140px">
          <el-upload
            :action="AliUrl"
            class="g-avatar-uploader"
            ref="upload"
            :http-request="requestHeaderThree"
            :before-upload="beforeUploadThree"
            :file-list="fileListThree"
            :show-file-list="false">
            <img v-if="gameHallInfo.recommendImg" :src="gameHallInfo.recommendImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="el-upload__tip">只能上传一张jpg/png文件，且不超过1M</div>
        </el-form-item>
        <el-form-item label="背景图片" label-width="140px">
          <el-upload
            :action="AliUrl"
            class="g-avatar-uploader"
            ref="upload"
            :http-request="requestHeader"
            :before-upload="beforeUpload"
            :file-list="fileList"
            :show-file-list="false">
            <img v-if="gameHallInfo.bgImg" :src="gameHallInfo.bgImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="el-upload__tip">只能上传一张jpg/png文件，且不超过1M</div>
        </el-form-item>
        <el-form-item label="轮播图片" label-width="140px">
          <el-upload
            :action="AliUrl"
            list-type="picture-card"
            ref="upload"
            :http-request="requestHeaderTwo"
            :before-upload="beforeUploadTwo"
            :file-list="fileListTwo"
            :show-file-list="false">
            <i class="el-icon-plus"></i>
          </el-upload>
          <div class="el-upload__tip">只能上传最多四张jpg/png文件，且不超过1M</div>
          <div class="-img-list">
            <div v-for="(item,index) of fileListTwo" class="-img-item">
              <img :src="item.url">
              <img class="-icon" src="/static/del.png" @click="delImg(index)">
            </div>
          </div>

        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isOpenModal = false">取 消</el-button>
        <el-button type="primary" :load="isSending" @click="submitProp(gameHallInfo.adId)">{{isSending ? '提交中' : '确 定'}}</el-button>
      </div>
    </el-dialog>
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
      data: 'gameHallConfig'
    })
    this.$store.commit('startLoading')
  },
  created () {
    this.getGameHallList()
    this.getGameList()
  },
  data () {
    return {
      AliUrl: '',
      gameList: [],
      gameItems: [],
      fileList: [],
      uploadAction: [],
      imgFile:{},
      fileListTwo: [],
      fileListTwoAli: [],
      uploadActionTwo: [],
      imgFileTwo:{},
      fileListThree: [],
      uploadActionThree: [],
      imgFileThree:{},
      gameHallInfo: {},
      isOpenModal: false,
      dialogLoading: false,
      isSending: false,
      gameType: {
        '10000':'棋牌游戏',
        '30000':'真人视讯',
        '40000':'电子游戏',
        '50000':'街机游戏'
      },
      gameStatus: {
        '0': '正常',
        '1': '最新',
        '2': '最热'
      }
    }
  },
  methods: {
    getGameHallList () {
      this.$store.commit('startLoading')
      invoke({
        url: api.configMultList,
        method: api.post,
        data:{
          code: 'lobbyconfig'
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
            this.gameItems = ret.data.payload
          }
          this.$store.commit('closeLoading')
        })
    },
    getGameList () {
      this.$store.commit('startLoading')
      invoke({
        url: api.gameList,
        method: api.post,
        data: {
          query:{
            companyIden: "NA"
          }
        }
      })
        .then(res => {
          const [err, ret] = res
          if (err) {
            this.$message({
              message: err.msg,
              type: 'error'
            })
            this.$store.commit('closeLoading')
          } else {
            this.gameList = ret.data.payload
            this.$store.commit('closeLoading')
          }
        })
    },
    delGame (id) {
      this.$confirm('确认要删除该游戏配置吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        invoke({
          url: api.configMultDel,
          method: api.post,
          data: {
            code: 'lobbyconfig',
            businessKey: id
          }
        })
          .then(res => {
            const [err, ret] = res
            if (err) {
              this.$message({
                message: err.msg,
                type: 'error'
              })
              this.$store.commit('closeLoading')
            } else {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.$store.commit('closeLoading')
              this.getGameHallList()
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    openModal (item) {
      this.isOpenModal = true
      this.isSending = false
      this.fileList = []
      this.fileListTwo = []
      this.fileListThree = []
      if (item) {
        this.gameHallInfo = JSON.parse(JSON.stringify(item))
        this.gameHallInfo.url = this.gameHallInfo.url === 'NULL!' ? '' : this.gameHallInfo.url
        this.gameHallInfo.urlAli = this.gameHallInfo.urlAli === 'NULL!' ? '' : this.gameHallInfo.urlAli
        this.fileList.push({
          name: '',
          url: this.gameHallInfo.bgImg
        })
        this.fileListThree.push({
          name: '',
          url: this.gameHallInfo.recommendImg
        })
        this.fileListTwo = this.gameHallInfo.carouselImg || []
        this.fileListTwoAli = this.gameHallInfo.carouselImgAli || []
      } else {
        this.gameHallInfo = {
          businessKey: '',
          bgImg: '',
          bgImgAli: '',
          recommendImg: '',
          recommendImgAli: '',
          carouselImg: [],
          carouselImgAli: [],
          isRecommend: false,
          state: 0
        }
      }
    },
    changeRecommend (item) {
      let array = []
      for(let data of this.gameItems) {
        if(data.isRecommend) {
          array.push(data)
        }
      }
      if ((array.length>=12) && !item.isRecommend) {
        return this.$message.error('游戏推荐不能超过12个')
      } else {
        this.submitProp(item)
      }
    },
    submitProp (item) {

      if(item) {
        this.gameHallInfo = JSON.parse(JSON.stringify(item))
        this.gameHallInfo.isRecommend = !this.gameHallInfo.isRecommend
      } else {
        if(this.gameHallInfo.url =='NULL!') this.gameHallInfo.url = '';
        if(this.gameHallInfo.urlAli =='NULL!') this.gameHallInfo.urlAli = '';

        if (!this.gameHallInfo.businessKey) {
          return this.$message.error('请选择游戏')
        }

        this.gameHallInfo.code = 'lobbyconfig'

        this.gameHallInfo.carouselImg = this.fileListTwo

        this.gameHallInfo.carouselImgAli = this.fileListTwoAli

        this.gameHallInfo.sort = Number(this.gameHallInfo.sort)

        for (let item of this.gameList) {
          if(item.kindId == this.gameHallInfo.businessKey) {
            Object.assign(this.gameHallInfo,item)
          }
        }
      }

      if (this.isSending) return // 防止重复提交
      this.isSending = true
      invoke({
        url: api.configMultNew,
        method: api.post,
        data: this.gameHallInfo
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
            this.fileListTwoAli = []
            this.fileListTwo = []
            this.getGameHallList()
          }
        }
      )
    },

    // 背景图
    requestHeader () {
      this.uploadAli ()
      this.uploadAws ()
    },
    beforeUpload (file) {
      let fileName = this.suffixFun(file.name)
      const isLt1M = file.size / 1024 / 1024 < 1
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
          this.$message.error('大小不能超过 1MB!')
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
    uploadAli () {
      this.AliUrl = 'http://assetdownload.oss-cn-hangzhou.aliyuncs.com'
      let mi = new OSS.Wrapper({
        region: 'oss-cn-hangzhou',
        accessKeyId: this.uploadAction[1].ali.AccessKeyId,
        accessKeySecret: this.uploadAction[1].ali.AccessKeySecret,
        stsToken: this.uploadAction[1].ali.SecurityToken,
        bucket: 'assetdownload'
      })
      let suffix = this.suffixFun(this.imgFile.name)
      let date = new Date().getTime()
      let fileName = `image/${suffix[0]+date}.${suffix[1]}`
      mi.multipartUpload(fileName, this.imgFile, {
      }).then((results) => {
        this.$message.success('上传成功')
        this.dialogLoading = false
        this.gameHallInfo.bgImgAli = results.url || `${this.AliUrl}/${results.name}`

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
          this.gameHallInfo.bgImg = (process.env.NODE_ENV == 'development') ? dev : prod
        }
      })
    },

    // 轮播图
    requestHeaderTwo () {
      if(!(this.fileListTwo.length>3)){
        this.uploadAliTwo ()
        this.uploadAwsTwo()
      } else {
        return this.$message.error('最多上传四张轮播图片')
      }
    },
    beforeUploadTwo (file)  {
      let fileName = this.suffixFun(file.name)
      const isLt1M = file.size / 1024 / 1024 < 1
      const suffix = fileName[1].toLowerCase()
      const fileType = ['png', 'jpg']
      if(this.fileListTwo.length>3) return
      this.imgFileTwo = file
      this.imgFileTwo.fileName = `${fileName[0]+new Date().getTime()}.${fileName[1]}`
      return new Promise((resolve, reject) =>{
        this.dialogLoading = true
        if (!(fileType.indexOf(suffix) > -1)) {
          this.dialogLoading = false
          this.$message.error('上传图片只能是 JPG或者PNG 格式!')
          reject(false)
        } else if (!isLt1M) {
          this.dialogLoading = false
          this.$message.error('大小不能超过 1MB!')
          reject(false)
        }

        invoke({
          url: api.uploadImg,
          method: api.post,
          data: {
            contentType: 'image',
            filePath: this.imgFileTwo.fileName
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
            this.uploadActionTwo = ret.data.payload
            resolve(true)
          }
        }).catch(err => {
          this.dialogLoading = false
          // console.log(err)
          reject(false)
        })
      })
    }, // 上传前的检验 格式、大小等
    uploadAliTwo () {
      this.AliUrl = 'http://assetdownload.oss-cn-hangzhou.aliyuncs.com'
      let mi = new OSS.Wrapper({
        region: 'oss-cn-hangzhou',
        accessKeyId: this.uploadActionTwo[1].ali.AccessKeyId,
        accessKeySecret: this.uploadActionTwo[1].ali.AccessKeySecret,
        stsToken: this.uploadActionTwo[1].ali.SecurityToken,
        bucket: 'assetdownload'
      })
//      console.log(this.imgFileTwo.name)
      let suffix = this.suffixFun(this.imgFileTwo.name)
      let date = new Date().getTime()
      let fileName = `image/${suffix[0]+date}.${suffix[1]}`
      mi.multipartUpload(fileName, this.imgFileTwo, {
      }).then((results) => {
        this.$message.success('上传成功')
        this.dialogLoading = false
//        this.gameHallInfo.fileListTwoAli = results.url || `${this.AliUrl}/${results.name}`
        this.fileListTwoAli.push({
          name: results.name,
          url: results.url || `${this.AliUrl}/${results.name}`
        })
      }).catch((err) => {
        this.dialogLoading = false
        console.log(err);
      });
    },
    uploadAwsTwo () {
      const dev = `https://s3-ap-southeast-1.amazonaws.com/image-na-dev/${this.imgFileTwo.fileName}` //测试环境
      const prod = `https://d38xgux2jezyfx.cloudfront.net/${this.imgFileTwo.fileName}` //开发环境
      invoke({
        url: this.uploadActionTwo[0].aws,
        method: 'put',
        data: this.imgFileTwo,
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
          this.fileListTwo.push({
            name: this.imgFileTwo.fileName,
            url: (process.env.NODE_ENV == 'development') ? dev : prod
          })
        }
      })
    },
    delImg (id) {
      this.fileListTwo.splice(id,1)
    },

    // 推荐图
    requestHeaderThree () {
      this.uploadAliThree ()
      this.uploadAwsThree ()
//      console.log(this.gameHallInfo, 'src')
    },
    beforeUploadThree (file) {
      let fileName = this.suffixFun(file.name)
      const isLt1M = file.size / 1024 / 1024 < 1
      const suffix = fileName[1].toLowerCase()
      const fileType = ['png', 'jpg']
      this.imgFileThree = file
      this.imgFileThree.fileName = `${fileName[0]+new Date().getTime()}.${fileName[1]}`
      return new Promise((resolve, reject) =>{
        this.dialogLoading = true
        if (!(fileType.indexOf(suffix) > -1)) {
          this.dialogLoading = false
          this.$message.error('上传图片只能是 JPG或者PNG 格式!')
          reject(false)
        } else if (!isLt1M) {
          this.dialogLoading = false
          this.$message.error('大小不能超过 1MB!')
          reject(false)
        }

        invoke({
          url: api.uploadImg,
          method: api.post,
          data: {
            contentType: 'image',
            filePath: this.imgFileThree.fileName
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
            this.uploadActionThree = ret.data.payload
            resolve(true)
          }
        }).catch(err => {
          this.dialogLoading = false
          // console.log(err)
          reject(false)
        })
      })
    }, // 上传前的检验 格式、大小等
    uploadAliThree () {
      this.AliUrl = 'http://assetdownload.oss-cn-hangzhou.aliyuncs.com'
      let mi = new OSS.Wrapper({
        region: 'oss-cn-hangzhou',
        accessKeyId: this.uploadActionThree[1].ali.AccessKeyId,
        accessKeySecret: this.uploadActionThree[1].ali.AccessKeySecret,
        stsToken: this.uploadActionThree[1].ali.SecurityToken,
        bucket: 'assetdownload'
      })
//      console.log(this.imgFileThree.name)
      let suffix = this.suffixFun(this.imgFileThree.name)
      let date = new Date().getTime()
      let fileName = `image/${suffix[0]+date}.${suffix[1]}`
      mi.multipartUpload(fileName, this.imgFileThree, {
      }).then((results) => {
        this.$message.success('上传成功')
        this.dialogLoading = false
        this.gameHallInfo.recommendImgAli = results.url || `${this.AliUrl}/${results.name}`
      }).catch((err) => {
        this.dialogLoading = false
        console.log(err);
      });
    },
    uploadAwsThree () {
      const dev = `https://s3-ap-southeast-1.amazonaws.com/image-na-dev/${this.imgFileThree.fileName}` //测试环境
      const prod = `https://d38xgux2jezyfx.cloudfront.net/${this.imgFileThree.fileName}` //开发环境
      invoke({
        url: this.uploadActionThree[0].aws,
        method: 'put',
        data: this.imgFileThree,
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
          this.gameHallInfo.recommendImg = (process.env.NODE_ENV == 'development') ? dev : prod
        }
      })
    },


    suffixFun (o) {
      let arr = o.split('.')
      return arr
    } // 截取文件名的后缀
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .p-gameHall{
    padding: 0 28px;
  }

  .p-gameHall .-top-btn{
    margin-bottom:1rem
  }

  .p-gameHall .-img-list{
    display: flex;
  }

  .p-gameHall .-img-item{
    padding: 10px;
    width: 25%;
    overflow: hidden;
    position: relative;
  }

  .p-gameHall .-img-list img{
    width: 100%;
  }

  .p-gameHall .-img-list .-icon{
    position: absolute;
    top: 0;
    right: 0;
    width: 10%;
    cursor: pointer;
  }
</style>
