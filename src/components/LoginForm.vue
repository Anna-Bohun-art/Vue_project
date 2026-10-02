<script setup>
import { ref } from 'vue'
import { getStatus } from '@/utils/license';

let email = ref("");
let password = ref("");
let role=ref("")
const ROLES=Object.freeze(["Schüler", "Lehrkraft", "Admin"]);
let users=ref([]);

function resolveLogin(){
    let newUser= {"email": email.value, "password": password.value, "role": role.value};
    users.value.push(newUser);
    console.log(newUser);
}
</script>

<template>
    <form class="counter" @submit.prevent="resolveLogin">
        <input type="email" v-model="email" placeholder="Your email">
        <input type="password" v-model="password" placeholder="Your password">
        <select v-model="role">
            <option v-for="role in ROLES" :key="role" :value="role">{{ role }}</option>
        </select>
    <button :disabled="!email ||!password || !role">Login</button>
    </form>
</template>

<style scoped>
.field {
    display: flex;
    flex-direction: column;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
