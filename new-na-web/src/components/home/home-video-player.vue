<template>
  <div class="home-video-player" @click="playVideo">
    <video poster="/static/videoBg.jpg">
      <source src="" type="video/mp4">
      您的浏览器不能使用最新的视频播放方式呢
    </video>
  </div>
</template>

<script>
export default {
  name: 'home-video-player',
  data () {
    return {
      lag: true
    }
  },
  methods: {
    playVideo () {
      if (this.lag) {
        document.querySelector('video').play()
        this.lag = !this.lag
      } else {
        document.querySelector('video').pause()
        this.lag = !this.lag
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.home-video-player
  video
    width 100%
    max-height 680px
    background url('/static/videoBg.jpg') no-repeat
    background-size cover
</style>


