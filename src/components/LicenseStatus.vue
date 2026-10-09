<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { getStatus } from '@/utils/license.js';
import { useLicenseStore } from '../stores/licenseStore.js'
import License from './License.vue';

const isLoading=ref(true);
const search = ref(localStorage.getItem('search')??'');
const store=useLicenseStore();
onMounted(()=>{
    setTimeout(()=>{
        isLoading.value=false;
    }, 1000)  
});
const revokeLicense=store.revokeLicense;

watch(search, (newValue)=>{
    localStorage.setItem('search', newValue);
})
const statusFilter = ref('alle');

const filteredLicenses= computed(() => {
    return store.licenses.filter(license => license.name.toLowerCase().includes(search.value.toLowerCase()));
})
const filteredByStatus= computed(() => {
   if(statusFilter.value!=='alle'){
    return filteredLicenses.value.filter(license => statusFilter.value===getStatus(license));
   }
   else{
    return filteredLicenses.value;
   }
    
})

</script>

<template>
    <div class="licenseStatus">
        <p v-if="isLoading">Lade Lizenzen</p>
        <p v-else-if="store.licenses.length ===0">Keine Lizenzen vorhanden</p>
        <div v-else>
           <input v-model="search" placeholder="Nach einer Lizenz suchen">
           <select v-model="statusFilter">
                <option value="alle">Alle</option>
                <option value="aktiv">Aktiv</option>
                <option value="laeuftbald">Läuft bald ab</option>
                <option value="abgelaufen">Abgelaufen</option>
            </select>
           <License v-for="license in filteredByStatus" :key="license.id" :license="license" @revoke="revokeLicense"/>
        </div>   
    </div>
</template>

<style scoped>
.abgelaufen p{
    color:red;
}
.aktiv p{
    color: green;
}
.lauftbald p {
 color:yellow;
}
@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
