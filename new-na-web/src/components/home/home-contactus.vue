<template>
  <div class="contact-us">
    <div class="container">
      <h2>联系我们</h2>
      <div class="line"><i></i></div>
      <div class="contact-desc">7x24小时客服为您服务</div>
      <div class="contact-us-container boxs">
        <div class="contact-us-form">
          <div class="field is-horizontal">
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <input class="input is-danger" type="text" placeholder="Md. Shah Newaz Mazumder">
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-danger" type="text" placeholder="EMAIL*">
                </div>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <textarea class="textarea is-danger" placeholder="MESSAGE*"></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <button class="button is-submit">
                    SEND MESSAGE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="us-info">
          <div class="us-info-title">公司信息</div>
          <div class="us-info-item"> 
            <p>San Miguel Avenue corner Shaw Boulevard,</p>
            <p>Ortigas Center, Ortigas Center, </p>
            <p>Pasig City, Metro Manila, 菲律宾</p>
          </div>
          <div class="us-info-item"> 
            <p>SKYPE: XINASIA_2</p>
            <p>EMAIL: NEWASIA@NA77.COM</p>
          </div>
          <div class="us-info-item">
            FOLLOW US ON SOCIAL NETWORK
          </div>
          <div class="us-info-share">
            <span><img src="../../assets/img/Instagram.png" alt=""></span>
            <span><img src="../../assets/img/Twitter.png" alt=""></span>
            <span><img src="../../assets/img/Facebook.png" alt=""></span>
            <span><img src="../../assets/img/Google.png" alt=""></span>
            <span><img src="../../assets/img/Linkedin.png" alt=""></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'contact-us'
}
</script>

<style lang="stylus" scoped>
.contact-us
  h2
    font-size 2.5rem
    color #444444
    text-align center
    margin-top 70px
    margin-bottom 30px
  .line
    text-align center
    font-size 0
    margin-bottom 30px
    i
      display inline-block
      width 80px
      height 1px
      background #FECB16
  .contact-desc
    text-align center
    font-size 1rem
    color #666666
    margin-bottom 80px
  .contact-us-container
    margin-bottom 80px
    display flex
    justify-content space-between
    .contact-us-form
      width 50%
      font-size 1rem
      .is-danger 
        border-color: #FECB16
      .is-submit
        width 100%
        color #222222
        background #FECB16
        border-color #FECB16
        outline-color #FECB16
        font-size 23px
        margin-top 20px
    .us-info
      font-size 14px
      color #666666
      text-align right 
      .us-info-title
        font-size 23px
        color #FECB16
        margin-bottom 20px
      .us-info-item
        margin-bottom 20px
      .us-info-share
        font-size 0
        span 
          display inline-block
          width 17px
          height 17px
          margin-left 20px
          cursor pointer
@media (min-width: 768px) and (max-width: 1200px)
  .contact-us
    h2
      margin-top 50px
      margin-bottom 18px
      font-size 34px
    .contact-desc
      font-size 14px
      margin 0  auto 50px
    .contact-us-container
      margin-bottom 65px
      .contact-us-form
        font-size 13px
        .is-submit
          font-size 18px
      .us-info
        font-size 12px
        .us-info-title
          font-size 18px
        .us-info-share
          span
            width 14px
            height 14px
@media (max-width: 768px)
  .contact-us
    h2
      margin-top 1.4rem
      margin-bottom 18px
      font-size 20px
    .contact-desc
      margin-bottom 20px
    .contact-us-container
      flex-direction column
      .contact-us-form
        width 100%
        margin-bottom 20px
      .us-info
        width 100%
        text-align left 
        .us-info-share
          span:first-child
            margin-left 0
</style>

