<script setup>
import { computed } from 'vue'  
import { useRoute } from 'vue-router'
import License from '@/components/License.vue';
const route =  useRoute();
const licenses=[{ id: 1, name: 'Mathe 7 Digital', expiresAt: '2027-03-31' },
  { id: 2, name: 'Deutsch Arbeitsheft', expiresAt: '2026-10-15' },
  { id: 3, name: 'Englisch Vokabeltrainer', expiresAt: '2026-06-30' },
  { id: 4, name: 'Biologie Interaktiv', expiresAt: '2026-10-20' },
  { id: 5, name: 'Geschichte Atlas', expiresAt: '2025-12-31' }];
const license =computed(()=>licenses.find(l=>l.id===Number(route.params.id))); 
</script>
<template>
    <h1>Detail</h1>
    <License v-if="license" :license="license" />
    <p v-else>Lizensz nicht gefunden</p>
</template>