<template>
  <div class="class-page">
    <ClassNameEditor :class-name="className" @save="saveName" />

    <p>{{ studentCount }} Schüler in der Klasse</p>
    <button @click="studentCount++">Schüler hinzufügen</button>
  </div>
</template>

<script>
import ClassNameEditor from './ClassNameEditor.vue'

export default {
  name: 'ClassPage',
  components: { ClassNameEditor },
  data() {
    return {
      className: '7b',
      studentCount: 24,
    }
  },
  methods: {
    saveName(newName) {
      this.className = newName
    },
  },
}
</script>
