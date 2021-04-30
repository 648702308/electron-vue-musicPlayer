import {musicUrl, playListDetail, songDetail} from "@/api/apis";

export default {
  namespaced: true,
  state: {
    id:'',
    list: [],
    song: '',
    music_urls: [],
    isPlay: false,
    currentTime: 0
  },
  mutations: {
    // 正在播放音乐的id
    SET_ID:(state, data)=>{
      state.id = data
    },
    // 播放列表
    SET_PLAYER_LIST: (state, data) => {
      state.list = data
    },
    // 设置当前播放歌曲
    SET_CURRENT_SONG: (state, data) => {
      state.song = data
    },
    // 设置歌曲播放地址
    SET_MUSIC_URLS: (state, data) => {
      state.music_urls = data
    },
    // 播放状态
    SET_IS_PLAY:(state, data)=>{
      console.log(data)
      state.isPlay = data
    },
    // 时间
    SET_CURRENT_TIME:(state, data)=>{
      state.currentTime = data
    }
  },
  actions: {
    playMusic({commit, state, dispatch}, id) {
      if(id !== state.id){
        dispatch('playMusicId', id)
        commit('SET_IS_PLAY', false);
        commit('SET_CURRENT_TIME', 0);
        songDetail({ids: id}).then(res => {
          commit('SET_CURRENT_SONG', res.songs[0])
        });
        dispatch('playMusicUrl', id)
      }
    },
    playMusicUrl({commit, state, dispatch}, id) {
      musicUrl({id}).then(res => {
        commit('SET_MUSIC_URLS', res.data)
        commit('SET_IS_PLAY', true)
      })
    },
    playPlaylist({commit, state, dispatch}, id) {
      playListDetail({id}).then(res => {
        commit('SET_PLAYER_LIST', res.playlist.tracks);
        dispatch('playMusic', res.playlist.tracks[0].id)
      })
    },
    playMusicId({commit, state}, id){
      commit('SET_ID', id);
    }
  }
}
