<template>
  <div class="license-table">
    <button @click="sortKey = 'title'">Nach Titel</button>
    <button @click="sortKey = 'schoolName'">Nach Schule</button>

    <table>
      <tr v-for="license in sortedLicenses" :key="license.id">
        <td>{{ license.title }}</td>
        <td>{{ license.schoolName }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'LicenseTable',
  data() {
    return {
      sortKey: 'title',
    }
  },
  computed: {
    ...mapState('licenses', ['licenses']),
    sortedLicenses() {
      const licensesCopy = [...this.licenses]
      return licensesCopy.slice().sort((a, b) => a[this.sortKey].localeCompare(b[this.sortKey]))
    },
  },
  methods: {
    ...mapActions('licenses', ['fetchLicenses']),
  },
  created() {
    this.fetchLicenses()
  },
}
</script>
