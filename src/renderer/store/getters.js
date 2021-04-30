const getters = {
  staticRoutes: state => state.permission.staticRoutes,
  isPlay: state => state.player.isPlay, // 播放列表
  playList: state => state.player.list, // 播放列表
  playSong: state => state.player.song,// 当前播放歌曲
  playSongId: state => state.player.id,// 当前播放歌曲的 id
  musicUrls: state => state.player.music_urls,// 当前播放歌曲的 id

  uid: state => state.user.uid,
  userSongSheets: state => state.permission.userSongSheets,
  collectSheets: state => state.collect.collectSheets,

  delaySubscribeLists: state => state.delay.subscribeLists,
  delayCancelSubscribeLists: state => state.delay.cancelSubscribeLists
}
export default getters
