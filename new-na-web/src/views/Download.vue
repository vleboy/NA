<template>
  <div class="Download">
    <img src="/static/Download.png" alt="">
    <home-download />
  </div>
</template>

<style lang="stylus" scoped>
.Download
  font-size 0
  img
    width 100%
</style>

<script>
import homeDownload from '@/components/home/home-download'
export default {
  name: 'Download',
  head: {
    title: '游戏下载'
  },
  components: {
    homeDownload
  }
}
</script>
<style lang="stylus" scoped>
  @media (max-width: 768px) {
    .Download{
      margin-top: 3.25rem
    }
  }
</style>

