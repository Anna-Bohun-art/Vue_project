<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import LicenseOptions from './LicenseOptions.vue'

export default {
  name: 'LicenseListVuex',
  created() {
    this.fetchLicenses()
  },
  computed: {
    ...mapState(['licenses', 'isLoading', 'error']),
    ...mapGetters(['expiredCount', 'licensesCount']),
  },
  methods: {
    ...mapActions(['revokeLicense', 'fetchLicenses']),
  },
  components: {
    LicenseOptions,
  },
}
</script>
<template>
  <div>
    <p v-if="isLoading">Lade Lizenzen</p>
    <p v-else-if="error !== null">Lizenzen konnten nicht geladen werden</p>
    <p v-else-if="licenses.length === 0">Keine Lizenzen vorhanden</p>
    <div v-else>
      <LicenseOptions
        v-for="license in licenses"
        :key="license.id"
        :license="license"
        @revoke="revokeLicense"
      />
      <p>{{ licensesCount }} Lizenzen</p>
      <p>{{ expiredCount }} Abgelaufen</p>
    </div>
  </div>
</template>
<style scoped></style>
