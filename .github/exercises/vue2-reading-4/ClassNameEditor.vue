<template>
  <div class="class-name-editor">
    <label>
      Klassenname:
      <input v-model="editedName" />
    </label>
    <button @click="$emit('save', editedName)">Speichern</button>
  </div>
</template>

<script>
export default {
  name: 'ClassNameEditor',
  props: {
    className: { type: String, required: true },
  },
  data() {
    return {
      editedName: this.className,
    }
  },
}
</script>
