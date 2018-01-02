<template>
  <div class="card-item">
    <h2>{{data.title}}</h2>
    <p>{{data.desc}}</p>
    <img :src="data.img" alt="">
  </div>
</template>

<script>
export default {
  name: 'card-item',
  props: {
    data: {
      required: true,
      type: Object
    }
  }
}
</script>

<style lang="stylus" scoped>
.card-item
  display flex
  flex-direction column
  justify-content center
  align-items center
  text-align center
  font-size 0
  h2
    font-size 2.5rem
    color #444444
    text-align center
    margin-top 70px
    margin-bottom 30px
  p
    width 50%
    margin-bottom 80px
    font-size 1rem
    color #666666
  img 
    width 45%
    min-height 45%
@media (min-width: 768px) and (max-width: 1200px)
  .card-item
    h2
      margin-top 50px
      margin-bottom 18px
      font-size 34px
    p
      font-size 14px
      margin-bottom 50px
@media (max-width: 768px)
  .card-item
    h2
      margin-top 1.4rem
      margin-bottom 18px
      font-size 20px
    p
      width 100%
      padding 0 10px
      margin-bottom 20px
    img
      width 100%
      min-height 100%
</style>


