<script setup>
import { computed } from 'vue'  
import { useRoute } from 'vue-router'
import License from '@/components/License.vue';
import { useLicenseStore } from '../stores/licenseStore.js'

const route =  useRoute();
const store = useLicenseStore();
const license =computed(()=>store.licenses.find(l=>l.id===Number(route.params.id))); 
</script>
<template>
    <h1>Detail</h1>
    <License v-if="license" :license="license" />
    <p v-else>Lizensz nicht gefunden</p>
</template>