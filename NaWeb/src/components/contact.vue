<template>
  <div class="contact">
    <div class="header-bg">
      <div class="bg-opacity"></div>
      <div>
        <div class="color-white center-title">
          <div class="title-top">CLIENTS</div>
          <h1 class="title-down">合作伙伴</h1>
        </div>
        <div style="text-align: center">
          <img class="header-img" src="../assets/contact/header-img.png">
        </div>
      </div>
    </div>
    <div class="center-bg">
      <div class="center-outer"></div>
      <div class="center-text">
        <el-col class="color-white center-title">
          <div class="title-top">CONTACT US</div>
          <h1 class="title-down">联系我们</h1>
        </el-col>
        <el-col :offset="2" :span="7"  class="mobile-width color-white">
          <input placeholder="NAME" class="footer-left-input"
                 @blur="getBlur(1)" @focus="getFocus(1)" :class="{'blur-input':isBlurInputName}">
          <input placeholder="EMAIL" class="footer-left-input"
                 @blur="getBlur(2)" @focus="getFocus(2)" :class="{'blur-input':isBlurInputEmail}">
        <textarea placeholder="MESSAGE" class="footer-left-input left-textarea"
                  @blur="getBlur(3)" @focus="getFocus(3)" :class="{'blur-input':isBlurInputTex}"> </textarea>
          <div class="text-left">
            <img class="left-submit"  src="../assets/contact/submit.png" @click="submit">
          </div>
        </el-col>
        <el-col :offset="1" :span="5" class="mobile-width color-white  contact-center" >
          <h2 class="margin-bottom">CONTACT <span class="color-red">US</span></h2>
          <!-- <div class="-center-con">
            <img src="../assets/contact/tel.png" class="center-icon">+63 (2) 746 2177
          </div> -->
          <div class="-center-con">
            <img src="../assets/contact/attr.png" class="center-icon">Live:xinasia_2
          </div>
          <div class="-center-con">
            <img src="../assets/contact/message.png" class="center-icon">Newasia@na77.com
          </div>
        </el-col>
        <el-col :offset="1" :span="6" class="mobile-width mobile-display color-white contact-right">
          <h2 class=" margin-bottom">NEWSLETTER <span class="color-red"> SUBCRIPTION</span></h2>
          <div class="right-contact">
            <input class="footer-left-input" placeholder="example@example.com" style="width:70%;"
                   @blur="getBlur(4)" @focus="getFocus(4)" :class="{'blur-input':isBlurInputExample}">
            <img class="right-submit" src="../assets/contact/submit.png" @click="submit">
          </div>
          <!-- <h2 class="margin-bottom">SOCIAL <span class="color-red">NEWS</span></h2> -->
          <div><a href="https://www.facebook.com/NA-Gaming-491601904532399/" style="display:inline-block"><img src="../assets/contact/share.png" style="width: 100%"></a></div>
        </el-col>
      </div>
    </div>
    <div class="footer-bg">
      <div class="footer-outer">
        <div class="text-center">
          <img class="footer-logo" src="../assets/contact/logo.png">
        </div>
        <h4 class="color-white">© 2017, New Asia. All right reserved.</h4>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
     return {
       isBlurInputName: false,
       isBlurInputEmail: false,
       isBlurInputTex: false,
       isBlurInputExample: false
     }
    },
    methods: {
      getBlur (num) {
        switch (num) {
          case 1:
            this.isBlurInputName = false
                break
          case 2:
            this.isBlurInputEmail = false
                break
          case 3:
            this.isBlurInputTex = false
                break
          case 4:
            this.isBlurInputExample = false
                break
        }
      },
      getFocus (num) {
        switch (num) {
          case 1:
            this.isBlurInputName = true
            break
          case 2:
            this.isBlurInputEmail = true
            break
          case 3:
            this.isBlurInputTex = true
            break
          case 4:
            this.isBlurInputExample = true
            break
        }
      },
      submit () {
        alert('您反馈的信息已发送！')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .contact {
    width:100%;
    height:100%;
    .color-white{color:#fff}
    .color-red{
      color:#c00000;
      font-style: italic
    }
    .margin-bottom{
      margin-bottom: 20px;
      font-style: italic;
      font-weight: bold;
    }
    .text-left{text-align: left}

    .center-title{
      text-align: center;
      padding: 30px;
      position: relative;

      .title-top{
        font-size: 12px;
        margin-bottom: 10px;

      }
      .title-down{
        font-size: 32px;font-weight: normal
      }
    }
    .header-bg{
      background: url('../assets/contact/header-bg.png') no-repeat;
      background-size: cover;
      width: 100%;
      height: 35%;
      background-position: 40%;
      position: relative;
      .bg-opacity{
        height: 100%;
        width: 100%;
        position: absolute;
        background-color: #c00000;
        opacity: 0.6;
        top: 0;
      }
      .header-img{
        width:800px;
        position: relative;
      }
    }
    .footer-bg{
      background: url('../assets/contact/footer.png') no-repeat;
      width: 100%;
      height: 16%;
      overflow: hidden;
      padding: 20px 0;
      position: relative;
      text-align: center;
      h4{
        margin-top: 10px;
        font-size: 12px;
      }
      .footer-outer{
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        transform: translate(-50%,-50%);
        text-align: center;
      }
      .footer-logo{
        width:140px;
      }
    }
    .center-bg{
      overflow: hidden;
      /*background: url('../assets/contact/si.png') repeat;*/
      background-color: #000000;
      width: 100%;
      height:51%;
      /*padding-bottom:20px;*/
      position: relative;

      h2{
        font-size: 23px;
      }

      .center-outer{
        background: url('../assets/contact/si.png') repeat;
        background-size: 40%;
        width: 100%;
        height: 100%;
        -webkit-animation: scoll 50s linear 0s infinite;
        animation: scoll 50s linear 0s infinite;
      }

      @keyframes scoll {
        0% {
          background-position-x:0% ;
        }
        100% {
          background-position-x:-100% ;
        }
      }

      .center-text{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
      }
      .footer-left-input{
        width: 80%;
        margin-bottom: 20px;
        color: #fff;
        background-color: transparent;
        font-style: italic;
        border-radius: 25px;
        height: 50px;
        padding-left: 20px;
        border: 1px solid #737373;
        outline: none;
        font-weight: bold;
      }
      .left-textarea{
        height: 100px;
        padding-top: 10px;
        resize : none;
        font-weight: bold;
      }
    }
    .contact-center{
      font-size: 14px;
      font-style: italic;

      .center-icon{
        width: 15px;
        margin-right: 10px;
        vertical-align: middle;
      }
      .-center-con{
        /*font-style: italic;*/
        margin-bottom: 20px;
        font-size: 14px;
        color: #7b7b7b;
      }
    }

    .right-submit{
      position: absolute;
      right: 20px;
      top: -5px;
    }
    .right-contact{
      position: relative;
    }
    .blur-input{
      border: 1px solid #c00000!important;
    }
  }

  @media screen and (max-width: 1366px) {
    .contact{
      .header-bg{
        background: url('../assets/contact/header-bg.png') no-repeat;
        background-position: 50%;
        background-size: cover;
        width: 100%;
        height: 35%;
        position: relative;
        .header-img{
          width:600px;
          position: relative;
        }
      }
      .center-title{
        padding: 16px;

        .title-top{
          font-size: 12px;
          margin-bottom: 10px;
        }
        .title-down{
          font-size: 25px;font-weight: normal
        }
      }
      .center-bg {
        /*padding-bottom:20px;*/

        .contact-center{
          h2{
            font-size: 16px;
          }
        }
        .contact-right{
          h2{
            font-size: 16px;
          }
        }
        .right-submit{
          width:150px;
        }
        .footer-left-input{
          border-radius: 19px;
          height: 38px;
        }
        .left-textarea{
          height: 70px;
        }
        .left-submit{
          width:150px;
        }
      }
      .footer-bg{
        padding: 8px 0;
        .footer-logo{
          width: 60px;
        }
      }
    }
  }

  @media screen and (max-width: 750px){
      .contact{
          .header-bg{
              height:28%;
              .header-img{
                width:280px;
                position: relative;
              }
          }
          .center-title{
              padding: 22px ;
              .title-top{
                font-size: 12px;
                margin-bottom: 10px;
              }
              .title-down{
                font-size: 22px;
                font-weight: normal
              }
          }

          .center-bg {
            height:56%;
            .mobile-width{
              width: 40%;
            }
            .mobile-display{
              display: none;
            }
            .center-outer{
              width: 250%;
            }
            .contact-center{
              h2{
                font-size: 16px;
              }
            }
            .contact-right{
              h2{
                font-size: 16px;
              }
            }
            .right-submit{
              width:150px;
            }
            .footer-left-input{
              border-radius: 19px;
              height: 38px;
              font-size: 12px;
            }
            .left-textarea{
              height: 40px;
              margin-bottom: 15px
            }
            .left-submit{
              width:135px;
            }
            .contact-center{
              margin-left: 0;
              width: 50%;

              .center-icon{
                margin-right: 8px;
              }
            }
        }
      }
  }

  @media screen and (max-width: 320px){
      .contact{
          .header-bg{
              .header-img{
                width:230px;
              }
          }
          .center-title{
              padding: 20px ;
              .title-top{
                font-size: 12px;
                margin-bottom: 10px;
              }
              .title-down{
                font-size: 22px;
                font-weight: normal
              }
          }

          .center-bg {
            height:56%;
            .mobile-width{
              width: 40%;
            }
            .mobile-display{
              display: none;
            }
            .center-outer{
              width: 250%;
            }
            .left-textarea{
              height: 40px;
            }
            .left-submit{
              width:106px;
            }
            .contact-center{
              margin-left: 0;
              width: 50%;

              .center-icon{
                margin-right: 8px;
              }
            }
        }
      }
  }

@media screen and (max-width: 750px) and (orientation: landscape) {
  .contact {
    .center-title{
      padding: 5px;
      .title-top {
        padding-bottom: 5px;
      }
    }
    .header-bg {
      .header-img {
        width: 200px;
      }
    }
    .center-bg .footer-left-input {
      height: 25px;
      margin-bottom: 10px;
    }
    .center-bg .left-submit {
      width: 100px;
    }
  }
}

</style>
