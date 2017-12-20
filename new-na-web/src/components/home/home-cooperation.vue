<template>
  <div class="home-cooperation">
    <div class="container">
      <div class="company-item boxs pc" v-for = "lists in companyLists ">
        <ul>
          <li v-for="item in lists"><img :src="item.url" alt="1"></li>
        </ul>
      </div>

      <div class="company-item boxs mobile" v-for = "lists in companyLists2 ">
        <ul>
          <li v-for="item in lists"><img :src="item.url" alt="1"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-cooperation',
  data () {
    return {
      companyLists: [
        [
          { url: require('@/assets/img/company1.png') },
          { url: require('@/assets/img/company2.png') },
          { url: require('@/assets/img/company3.png') },
          { url: require('@/assets/img/company4.png') },
          { url: require('@/assets/img/company5.png') }
        ],
        [
          { url: require('@/assets/img/company6.png') },
          { url: require('@/assets/img/company7.png') },
          { url: require('@/assets/img/company8.png') },
          { url: require('@/assets/img/company9.png') },
          { url: require('@/assets/img/company10.png') }
        ]
      ],
      companyLists2: [
        [
          { url: require('@/assets/img/company1.png') },
          { url: require('@/assets/img/company2.png') },
          { url: require('@/assets/img/company3.png') }
        ],
        [
          { url: require('@/assets/img/company4.png') },
          { url: require('@/assets/img/company5.png') },
          { url: require('@/assets/img/company6.png') }
        ],
        [
          { url: require('@/assets/img/company7.png') },
          { url: require('@/assets/img/company8.png') },
          { url: require('@/assets/img/company9.png') }
        ],
        [
          { url: require('@/assets/img/company10.png') }
        ]
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.home-cooperation
  background url('../../assets/img/cooperation.png') no-repeat
  background-size cover
  padding 60px 0
  .company-item
    margin 30px 0 30px
    padding 60px 15px
    background #ffffff
    border-radius 7px 
    ul
      display flex
      li
        flex-basis 20%
        padding  0 45px
  .pc
    display block
  .mobile
    display none
@media (min-width: 768px) and (max-width: 1200px)
  .home-cooperation
    padding 20px 0
@media (max-width: 768px)
  .home-cooperation
    padding 20px 0
    .company-item
      ul
        justify-content: space-between
        li
          flex-basis 30%
          padding 0
    .pc
      display none
    .mobile
      display block
</style>


