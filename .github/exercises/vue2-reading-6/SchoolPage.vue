<template>
  <div class="school-page">
    <select v-model="selectedSchoolId">
      <option v-for="school in schools" :key="school.id" :value="school.id">
        {{ school.name }}
      </option>
    </select>

    <SchoolLicenses :school-id="selectedSchoolId" />
  </div>
</template>

<script>
import SchoolLicenses from './SchoolLicenses.vue'

export default {
  name: 'SchoolPage',
  components: { SchoolLicenses },
  data() {
    return {
      schools: [
        { id: 1, name: 'Gymnasium Nord' },
        { id: 2, name: 'Realschule Süd' },
        { id: 3, name: 'Grundschule Mitte' },
      ],
      // the first school is selected when the page opens
      selectedSchoolId: 1,
    }
  },
}
</script>
