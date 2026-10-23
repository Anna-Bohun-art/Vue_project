<template>
  <div class="school-licenses">
    <p v-if="isLoading">Lade Lizenzen …</p>
    <p v-else-if="licenses.length === 0">Keine Lizenzen</p>
    <template v-else>
      <p v-if="allActive" class="badge">Alle Lizenzen aktiv</p>
      <ul>
        <li v-for="license in licenses" :key="license.id">
          {{ license.title }} ({{ license.active ? 'aktiv' : 'abgelaufen' }})
        </li>
      </ul>
    </template>
    <p v-if="savedHint">Gespeichert</p>
  </div>
</template>

<script>
export default {
  name: 'SchoolLicenses',
  props: {
    schoolId: { type: Number, required: true },
  },
  data() {
    return {
      licenses: [],
      isLoading: false,
      savedHint: false,
    }
  },
  computed: {
    allActive() {
      return this.licenses.every((l) => l.active)
    },
  },
  watch: {
    schoolId: {
      immediate: true,
      async handler(newId) {
        this.isLoading = true
        try {
          const response = await fetch(`/api/schools/${newId}/licenses`)
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
          }
          this.licenses = await response.json()
        } finally {
          this.isLoading = false
        }
      },
    },
  },
}
</script>
