<!--
  LicenseOverview.vue
  Lists the licenses of one school with a search field and a note per license.
  Uses the namespaced Vuex module `licenses`.
-->
<template>
  <div class="license-overview">
    <input ref="search" v-model="search" placeholder="Suchen …" />

    <p v-if="isLoading">Lade Lizenzen …</p>
    <p v-else-if="error" class="error">{{ error }}</p>
    <p v-else-if="licenses.length === 0">Keine Lizenzen vorhanden</p>

    <template v-else>
      <p v-if="allExpired" class="warning">Alle Lizenzen sind abgelaufen.</p>

      <ul>
        <li v-for="license in sortedLicenses" :key="license.id">
          <strong>{{ license.title }}</strong>
          ({{ license.active ? 'aktiv' : 'abgelaufen' }})

          <textarea
            :value="notes[license.id]"
            placeholder="Notiz …"
            @input="updateNote(license.id, $event.target.value)"
          ></textarea>
          <p class="preview">{{ notes[license.id] }}</p>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'LicenseOverview',

  props: {
    schoolId: { type: Number, required: true },
  },

  data() {
    return {
      search: '',
      // notes per license id, e.g. { 7: 'Klasse 5b' }
      notes: {},
    }
  },

  computed: {
    ...mapState('licenses', ['licenses', 'isLoading', 'error']),
    ...mapGetters('licenses', ['allExpired']),

    // Not a bug (decoy): copy → filter → sort in one chain is fine, each step returns an array.
    // copy first so the store array is not sorted in place
    sortedLicenses() {
      return [...this.licenses]
        .filter((l) => l.title.toLowerCase().includes(this.search.toLowerCase()))
        .sort((a, b) => a.title.localeCompare(b.title))
    },
  },

  created() {
    this.fetchLicenses(this.schoolId)
  },
  // Bug 5 (before), should fix: this.$refs.search.focus() was in created().
  // In created the data is ready but the DOM isn't → $refs.search is undefined →
  // TypeError in the console, no focus. The list still loads (fetch was called first).
  // Fix: move the focus to mounted(). Fetching can stay in created (needs no DOM).
  mounted() {
    // focus the search field for better UX
    this.$refs.search.focus()
  },

  methods: {
    ...mapActions('licenses', ['fetchLicenses']),

    // Bug 4 (before), blocker: this.notes[id] = text
    // notes starts as {}, so every id is a NEW key. In Vue 2 a key added with `=`
    // is not reactive → the preview <p> stays empty while the teacher types. Silent.
    // Fix: this.$set(this.notes, id, text) adds the key and makes it reactive.
    updateNote(id, text) {
      this.$set(this.notes, id, text)
    },
  },
}
</script>

<style scoped>
.error {
  color: red;
}
.warning {
  color: orange;
}
.preview {
  font-size: 0.9em;
  color: #555;
}
</style>
