<script setup>
import { ref } from 'vue';
import { useSessionStore } from '@/stores/LoginStore';
import { useRouter } from 'vue-router';

const email = ref("");
const password = ref("");
const role=ref("");
const router = useRouter();
const ROLES=Object.freeze(["Schüler", "Lehrkraft", "Admin"]);
const sessionStore = useSessionStore();
function resolveLogin(){
   sessionStore.login(email.value, role.value)
   router.push({name: "LicensesView"});
    email.value="";
    password.value="";
    role.value="";
}
function resolveLogout(){
    sessionStore.logout();
    router.push({name: "LoginView"});
}
</script>

<template>
    <form v-if="!sessionStore.session" class="login" @submit.prevent="resolveLogin">
        <input type="email" autocomplete="username" v-model="email" placeholder="Your email">
        <input type="password" autocomplete="current-password" v-model="password" placeholder="Your password">
        <select v-model="role">
            <option v-for="role in ROLES" :key="role" :value="role">{{ role }}</option>
        </select>
    <button :disabled="!email ||!password || !role">Login</button>
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
