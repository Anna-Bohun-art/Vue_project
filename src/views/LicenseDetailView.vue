<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import License from '@/components/License.vue'
import { useLicenseStore } from '../stores/licenseStore.js'

const route = useRoute()
const router = useRouter()
const store = useLicenseStore()
onMounted(() => {
  store.getData()
})
const license = computed(() => store.licenses.find((l) => l.id === Number(route.params.id)))
const revokeLicenseAndNavigate = async (id) => {
  await store.revokeLicense(id)
  if (store.errorStatus === null) {
    router.push({ name: 'LicensesView' })
  }
}
</script>
<template>
  <div>
    <h1>Detail</h1>
    <p v-if="store.isLoading">Lizenz wird geladen...</p>
    <p v-else-if="store.errorStatus !== null">{{ store.errorStatus }}</p>
    <License v-else-if="license" :license="license" @revoke="revokeLicenseAndNavigate" />
    <p v-else>Lizenz nicht gefunden</p>
  </div>
</template>
