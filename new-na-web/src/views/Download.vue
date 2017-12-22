<template>
  <div class="Download">
    <img src="/static/Download.png" alt="">
    <home-download />
  </div>
</template>

<style lang="stylus" scoped>
.Download
  font-size 0
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

