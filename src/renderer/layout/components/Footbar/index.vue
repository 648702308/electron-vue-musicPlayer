<template>
  <div class="player-view">
    <music-player></music-player>
  </div>
</template>

<script>
  import MusicPlayer from '@/components/MusicPlayer'

  export default {
    components: {MusicPlayer}
  }
</script>

<style scoped lang="scss">
  .player-view {
    height: 100%;
    width: 100%;
  }
</style>
