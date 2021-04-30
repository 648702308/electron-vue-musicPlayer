import locs from '@/utils/locs'

export default {
  namespaced: true,
  state: {
    subscribeLists: locs.get('subscribeListIds') ? locs.get('subscribeListIds') : [],
    cancelSubscribeLists: locs.get('cancelSubscribeListIds') ? locs.get('cancelSubscribeListIds') : []
  },
  mutations: {
    /* 已订阅列表 */
    SET_SUBSCRIBE_LIST: (state, id) => {
      if (!state.subscribeLists.includes(id)) {
        state.subscribeLists.push(id)
        locs.set('subscribeListIds', state.subscribeLists)
      }
    },
    /* 取消的订阅列表 */
    SET_CANCEL_SUBSCRIBE_LIST: (state, id) => {
      if (!state.cancelSubscribeLists.includes(id)) {
        console.log(9)
        state.cancelSubscribeLists.push(id)
        locs.set('cancelSubscribeListIds', state.cancelSubscribeLists)
      }
    },
    /* 删除订阅的歌单ID */
    REMOVE_SUBSCRIBE_ID(state, id) {
      const index = state.subscribeLists.indexOf(id);
      if (index > -1) {
        state.subscribeLists.splice(index, 1);
        locs.set('subscribeListIds', state.subscribeLists)
      }
    },
    /* 删除订阅的歌单ID */
    REMOVE_CANCEL_SUBSCRIBE_ID(state, id) {
      const index = state.cancelSubscribeLists.indexOf(id);
      if (index > -1) {
        state.cancelSubscribeLists.splice(index, 1);
        locs.set('cancelSubscribeListIds', state.cancelSubscribeLists)
      }
    }
  },
  actions: {
    /* 保存订阅的歌单ID */
    setSubscribeLists: ({commit, state, dispatch}, obj) => {
      console.log(obj)
      if (obj.t === 1) {
        console.log('收藏')
        /* 收藏 */
        commit('SET_SUBSCRIBE_LIST', obj.id)
        commit('REMOVE_CANCEL_SUBSCRIBE_ID', obj.id)
      } else {
        console.log('取消收藏')
        /* 取消收藏 */
        commit('SET_CANCEL_SUBSCRIBE_LIST', obj.id)
        commit('REMOVE_SUBSCRIBE_ID', obj.id)
      }
    },
    /* 删除订阅的歌单ID */
    removeSubscribeId({commit, state, dispatch}, id) {
      commit('REMOVE_SUBSCRIBE_ID', id)
      commit('REMOVE_CANCEL_SUBSCRIBE_ID', id)
    }
  }
}
