// store/licenses.js
// Vuex module for the licenses of one school.

export default {
  namespaced: true,

  state: () => ({
    licenses: [],
    isLoading: false,
    error: null,
  }),

  getters: {
    // Bug 1 (before), blocker: state.licenses.some((l) => !l.active)
    // `some` is true if ONE license has expired → "Alle Lizenzen sind abgelaufen"
    // although only one has. Wrong information for the teacher, no error anywhere.
    // Fix: `every` (true only if ALL have expired), matches the comment below.
    // true when every license of the school has expired
    allExpired: (state) => state.licenses.every((l) => !l.active),
  },

  mutations: {
    SET_LICENSES(state, licenses) {
      state.licenses = licenses
    },
    SET_LOADING(state, value) {
      state.isLoading = value
    },
    SET_ERROR(state, message) {
      state.error = message
    },
  },

  actions: {
    async fetchLicenses({ commit, state }, schoolId) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const response = await fetch(`/api/schools/${schoolId}/licenses`)
        // Bug 2 (before), blocker: no response.ok check.
        // fetch resolves on 500 too, so `catch` never ran. response.json() returned the
        // error body (an object, not an array) → `[...this.licenses]` in the component
        // threw "not iterable", the list broke, no error message for the teacher.
        // (HTML error page → json() throws → "Unexpected token '<'", meaningless message.)
        // Fix: throw if !response.ok, so `catch` commits SET_ERROR.
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        // Bug 3 (before), should fix: state.licenses = await response.json()
        // An action must not change state itself. It works, but is silent:
        // no entry in the Vuex DevTools timeline, warning only with `strict: true`.
        // Fix: commit the existing mutation SET_LICENSES.
        // (`state` in { commit, state } is now unused and could go.)
        const licenses = await response.json()
        commit('SET_LICENSES', licenses)
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },
  },
}
