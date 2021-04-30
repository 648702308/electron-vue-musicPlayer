import {constantRoutes} from '@/router/constantRoutes'
import {staticRoutes} from '@/router/modules/staticRoutes'

function deepCopy(source) {
  if (!source) {
    return source
  }
  let sourceCopy = source instanceof Array ? [] : {}
  for (let item in source) {
    sourceCopy[item] = typeof source[item] === 'object' ? deepCopy(source[item]) : source[item]
  }
  return sourceCopy
}

export default {
  namespaced: true,
  state: {
    staticRoutes: deepCopy(staticRoutes),
    routes: deepCopy(constantRoutes),
    addRoutes: [],
    /*用户歌单*/
    userSongSheets: []
  },
  mutations: {
    SET_USER_SONG_SHEETS: (state, data) => {
      state.userSongSheets = data
    }
  },
  actions: {
    userSongSheets: ({commit, state, dispatch}, datas) => {
      commit('SET_USER_SONG_SHEETS', datas)
    }
  }
}


