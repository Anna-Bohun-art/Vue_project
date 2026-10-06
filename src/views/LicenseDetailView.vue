<script setup>
import { computed } from 'vue'  
import { useRoute, useRouter } from 'vue-router'
import License from '@/components/License.vue';
import { useLicenseStore } from '../stores/licenseStore.js'

const route =  useRoute();
const router = useRouter();
const store = useLicenseStore();
const license =computed(()=>store.licenses.find(l=>l.id===Number(route.params.id))); 
const  revokeLicenseAndNavigate=(id)=>{
    store.revokeLicense(id);
    router.push({name: "LicensesView"})
}
</script>
<template>
    <h1>Detail</h1>
    <License v-if="license" :license="license" @revoke="revokeLicenseAndNavigate"/>
    <p v-else>Lizensz nicht gefunden</p>
</template>