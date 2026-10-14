import { createStore } from 'vuex'
import { getStatus } from '@/utils/license'

export const vuexStore = createStore({
  state() {
    return {
      licenses: [],
      isLoading: false,
      error: null,
    }
  },
  getters: {
    licensesCount(state) {
      return state.licenses.length
    },
    expiredCount(state) {
      return state.licenses.filter((l) => getStatus(l) === 'abgelaufen').length
    },
  },
  mutations: {
    IS_LOADING(state) {
      state.isLoading = !state.isLoading
    },
    LICENSES_MUTATION(state, licenses) {
      state.licenses = licenses
    },
    SET_ERROR(state, message) {
      if (message) {
        state.error = message
      } else {
        state.error = null
      }
    },
  },
  actions: {
    async revokeLicense({ commit, dispatch }, id) {
      try {
        const response = await fetch(`http://localhost:3000/licenses/${id}`, { method: 'DELETE' })
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        await dispatch('fetchLicenses')
        commit('SET_ERROR')
      } catch (error) {
        commit('SET_ERROR', error.message)
        console.log(`Error: ${error.message}`)
      }
    },
    async fetchLicenses({ commit }) {
      commit('IS_LOADING')
      try {
        const response = await fetch('http://localhost:3000/licenses')
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const licenses = await response.json()
        commit('LICENSES_MUTATION', licenses)
        commit('SET_ERROR')
      } catch (error) {
        commit('SET_ERROR', error.message)
        console.log(`Error: ${error.message}`)
      } finally {
        commit('IS_LOADING')
      }
    },
  },
})
