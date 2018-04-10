<template>
  <div class="home-btn-nav">
    <div v-for="item of imgList" class="-btn-wrap" @click="jumpUrl(item.id)">
      <img :src="item.url">
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-btn-nav',
  data () {
    return {
      imgList: [
        {
          id: 1,
          url: require('@/assets/img/btn-nav/btn-nav-1.jpg')
        },
        {
          id: 2,
          url: require('@/assets/img/btn-nav/btn-nav-2.jpg')
        },
        {
          id: 3,
          url: require('@/assets/img/btn-nav/btn-nav-3.jpg')
        }
      ]
    }
  },
  methods: {
    jumpUrl (id) {
      this.$router.push({path: '/detail', query: {id: id}})
    }
  }
}
</script>

<style lang="stylus" scoped>
.home-btn-nav {
  display: flex;
  .-btn-wrap{
    cursor: pointer;
    width: calc(100%/3);

    img{
      width: 100%;
    }
  }
}

</style>

