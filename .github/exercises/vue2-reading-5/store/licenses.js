export default {
  namespaced: true,
  state: () => ({
    // newest first, as the server sends them
    licenses: [],
  }),
  mutations: {
    SET_LICENSES(state, licenses) {
      state.licenses = licenses
    },
  },
  actions: {
    async fetchLicenses({ commit }) {
      const response = await fetch('/api/licenses')
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      commit('SET_LICENSES', await response.json())
    },
  },
}
