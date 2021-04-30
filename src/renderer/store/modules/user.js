import locs from '@/utils/locs'
import {LoginStatus, userPlaylist} from '@/api/apis'

export default {
  namespaced: true,
  state: {
    is_login: locs.get('profile') ? true : false,
    account: locs.get('account'),
    bindings: locs.get('bindings'),
    profile: locs.get('profile'),
    uid: ''
  },
  mutations: {
    SET_USER_DATA: (state, data) => {
      Object.keys(data).forEach(function (key) {
        state[key] = data[key]
      })
    },
    SET_UID: (state, uid) => {
      state.uid = uid
    }
  },
  actions: {
    setLogin({commit, state}, res) {
      let data = {
        is_login: true,
        account: res.account,
        bindings: res.bindings,
        profile: res.profile
      }
      locs.set('account', res.account)
      locs.set('bindings', res.bindings)
      locs.set('profile', res.profile)
      commit("SET_USER_DATA", data)
    },
    checkLogin({commit, state, dispatch}) {
      LoginStatus().then(async res => {
        console.log('LoginStatus', res)
        const uid = await res.account.id
        commit("SET_UID", uid)
        dispatch('userAllPlaylist', uid)
      }).catch(err => {

      })
    },
    userAllPlaylist({commit, state, dispatch}, uid) {
      userPlaylist({uid: uid}).then(res => {
        const userPlaylists = res.playlist.filter(item => {
          return !item.subscribed
        })
        const collectPlaylists = res.playlist.filter(item => {
          return item.subscribed
        })
        /* 用户歌单 */
        dispatch('permission/userSongSheets', userPlaylists, {root: true})
        /* 用户收藏的歌单 */
        dispatch('collect/collectSheets', collectPlaylists, {root: true})
      })
    }
  }
}
