<template>
  <div class="student-select">
    <p v-if="isLoading">Schüler werden geladen…</p>
    <ul v-else>
      <li v-for="student in students" :key="student.id">
        <label>
          <input type="checkbox" :checked="student.selected" @change="toggle(student)" />
          {{ student.name }}
        </label>
      </li>
    </ul>

    <p>{{ selectedCount }} ausgewählt</p>
    <button :disabled="selectedCount === 0" @click="assignLicense">Lizenz zuweisen</button>
  </div>
</template>

<script>
// Stands in for a server request: resolves with the students of one class.
function fetchStudents() {
  return Promise.resolve([
    { id: 1, name: 'Lena Maier' },
    { id: 2, name: 'Jonas Weber' },
    { id: 3, name: 'Aylin Demir' },
  ])
}

export default {
  name: 'StudentSelect',
  data() {
    return {
      students: [],
      isLoading: true,
    }
  },
  computed: {
    selectedCount() {
      return this.students.filter((s) => s.selected).length
    },
  },
  // Bug (before): the server objects have no `selected`, and the list was stored as it came:
  //   this.students = await fetchStudents()
  // toggle() then added `selected` as a new property. Vue 2 (Object.defineProperty) only tracks
  // properties that exist when the object becomes reactive, so selectedCount never updated.
  // Fix: add `selected: false` to every student before assigning to this.students.
  // (Alternative: this.$set(student, 'selected', true). Vue 3 tracks new properties via Proxy.)
  async created() {
    const students = await fetchStudents()
    this.students = students.map((student) => ({ ...student, selected: false }))
    this.isLoading = false
  },
  methods: {
    toggle(student) {
      student.selected = !student.selected
    },
    assignLicense() {
      const ids = this.students.filter((s) => s.selected).map((s) => s.id)
      this.$emit('assign', ids)
    },
  },
}
</script>
