import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getStatus } from '@/utils/license'

export const useLicenseStore = defineStore('licenses', () => {
  const licenses = ref([])
  const isLoading = ref(true)
  const errorStatus = ref(null)
  const revokeLicense = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/licenses/${id}`, { method: 'DELETE' })
      if (!response.ok) {
        throw new Error(`HTTP Error! Status ${response.status}`)
      }
      await getData()
    } catch (error) {
      console.log(error.message)
    }
  }
  const expiredCount = computed(
    () => licenses.value.filter((l) => getStatus(l) === 'abgelaufen').length,
  )
  const licensesCount = computed(() => licenses.value.length)
  const getData = async () => {
    isLoading.value = true
    try {
      const response = await fetch('http://localhost:3000/licenses')
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      licenses.value = await response.json()
      errorStatus.value = null
      console.log(licenses.value)
    } catch (error) {
      errorStatus.value = error.message
      console.log(`Error: ${error.message}`)
    } finally {
      isLoading.value = false
    }
  }
  return { licenses, isLoading, errorStatus, revokeLicense, expiredCount, licensesCount, getData }
})
