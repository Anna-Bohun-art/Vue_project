<!--
  LicenseNotes.vue
  Shows all active licenses. Teachers can write a note for each license
  and revoke licenses. Uses the existing Pinia store (useLicenseStore).
-->
<template>
  <div class="license-notes">
    <h2>Aktive Lizenzen ({{ activeCount }})</h2>

    <p v-if="isLoading">Lade Lizenzen …</p>
    <p v-else-if="errorStatus" class="error">{{ errorStatus }}</p>

    <ul v-else>
      <!--
        Bug 1 (before): v-for and v-if on the same element:
          <li v-for="(license, index) in licenses"
              v-if="getStatus(license) !== 'abgelaufen'" :key="index">
        In Vue 3, v-if runs before v-for, so `license` doesn't exist yet in v-if.
        Fix: filter in a computed (`activeLicenses`) and loop over that.

        Bug 2 (before): `:key="index"` and `notes[index]`.
        After a revoke the list shifts up, so the notes jump to the wrong license.
        Fix: use `license.id` for the key and for the notes.
      -->
      <li v-for="license in activeLicenses" :key="license.id">
        <strong>{{ license.name }}</strong> (bis {{ license.expiresAt }})

        <textarea v-model="notes[license.id]" placeholder="Notiz …"></textarea>
        <!--
          Bug 3 (before), blocker:
            <!- preview supports simple formatting like <b>bold</b> ->
            <p class="preview" v-html="notes[index]"></p>
          v-html renders user input as HTML → XSS (foreign JS runs on the page).
          Fix: {{ }} shows the text as plain text.
        -->
        <p class="preview">{{ notes[license.id] }}</p>

        <button @click="revoke(license.id)">Entziehen</button>
      </li>
    </ul>

    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useLicenseStore } from '@/stores/licenseStore'
import { getStatus } from '@/utils/license'

const store = useLicenseStore()

// Bug 4 (before): const { licenses, isLoading, errorStatus } = store
// Destructuring copies the current values once, so they aren't reactive:
// "Lade Lizenzen …" stays forever, the list never shows.
// Fix: storeToRefs(store) gives refs, so read them with `.value` in the script.
// destructure for cleaner template access
const { licenses, isLoading, errorStatus } = storeToRefs(store)

// Before: ref([]) with notes[index] (see Bug 2). Now an object keyed by license id.
const notes = ref({})
const successMessage = ref('')

// Before: activeCount filtered `store.licenses` itself. Now it reuses activeLicenses (filter in one place).
const activeCount = computed(() => activeLicenses.value.length)
const activeLicenses = computed(() => licenses.value.filter((l) => getStatus(l) !== 'abgelaufen'))

async function revoke(id) {
  await store.revokeLicense(id)
  // Bug 5 (before): successMessage was set right after the await, with no check.
  // revokeLicense catches its own error, so the await never throws →
  // "Lizenz wurde entzogen." even when the server failed (400, 500 or no server).
  // Fix: show the message only if the store has no error.
  if (errorStatus.value === null) {
    successMessage.value = 'Lizenz wurde entzogen.'
  }
}

onMounted(() => {
  store.getData()
})
</script>

<style scoped>
.error {
  color: red;
}
.success {
  color: green;
}
.preview {
  font-size: 0.9em;
  color: #555;
}
</style>
