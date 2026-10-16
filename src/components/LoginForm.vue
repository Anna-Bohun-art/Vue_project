<script setup>
import { ref, computed } from 'vue'
import { useSessionStore } from '@/stores/LoginStore'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const role = ref('')
const router = useRouter()
const ROLES = Object.freeze(['Schüler', 'Lehrkraft', 'Admin'])
const sessionStore = useSessionStore()
function resolveLogin() {
  if (!isValid.value) {
    return
  }
  sessionStore.login(email.value, role.value)
  router.push({ name: 'LicensesView' })
  email.value = ''
  password.value = ''
  role.value = ''
}
function resolveLogout() {
  sessionStore.logout()
  router.push({ name: 'LoginView' })
}
const emailError = computed(() => {
  if (
    email.value.length === 0 ||
    !email.value.includes('@') ||
    !email.value.includes('.') ||
    email.value.indexOf('@') > email.value.lastIndexOf('.')
  ) {
    return 'Bitte eine gültige E-Mail eingeben'
  }
  return ''
})
const passwordError = computed(() => {
  if (password.value.length < 8) {
    return 'Mindestens 8 Zeichen'
  }
  return ''
})
const roleError = computed(() => {
  if (!role.value) {
    return 'Bitte eine Rolle wählen'
  }
  return ''
})
const isValid = computed(() => {
  if (emailError.value || passwordError.value || roleError.value) {
    return false
  }
  return true
})
</script>

<template>
  <form v-if="!sessionStore.session" class="login" @submit.prevent="resolveLogin">
    <input type="email" autocomplete="username" v-model="email" placeholder="Your email" />
    <p v-if="email && emailError">{{ emailError }}</p>
    <input
      type="password"
      autocomplete="current-password"
      v-model="password"
      placeholder="Your password"
    />
    <p v-if="password && passwordError">{{ passwordError }}</p>
    <select v-model="role">
      <option value="" disabled>Rolle wählen</option>
      <option v-for="r in ROLES" :key="r" :value="r">{{ r }}</option>
    </select>
    <p v-if="email && password && roleError">{{ roleError }}</p>
    <button :disabled="!isValid">Login</button>
  </form>
  <button v-else @click="resolveLogout">Logout</button>
</template>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
}
.login {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
