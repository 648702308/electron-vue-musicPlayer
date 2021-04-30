export default {
  namespaced: true,
  state: {
    collectSheets: []
  },
  mutations: {
    SET_COLLECT_SHEETS: (state, data) => {
      state.collectSheets = data
    }
  },
  actions: {
    collectSheets: ({commit, state, dispatch}, datas) => {
      commit('SET_COLLECT_SHEETS', datas)
    }
  }
}
