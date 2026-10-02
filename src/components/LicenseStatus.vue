<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import License from './License.vue';
import { getStatus } from '@/utils/license.js';
//const licenses=ref([])
const licenses = ref([]);
const isLoading=ref(true);
const search = ref(localStorage.getItem('search')??'');

onMounted(()=>{
    setTimeout(()=>{
        licenses.value=[{ id: 1, name: 'Mathe 7 Digital', expiresAt: '2027-03-31' },
  { id: 2, name: 'Deutsch Arbeitsheft', expiresAt: '2026-10-15' },
  { id: 3, name: 'Englisch Vokabeltrainer', expiresAt: '2026-06-30' },
  { id: 4, name: 'Biologie Interaktiv', expiresAt: '2026-10-20' },
  { id: 5, name: 'Geschichte Atlas', expiresAt: '2025-12-31' }];
  isLoading.value=false;
    }, 1000)  
});
watch(search, (newValue)=>{
    localStorage.setItem('search', newValue);
})
const statusFilter = ref('alle');
function revokeLicense(id){
    licenses.value = licenses.value.filter(l=> l.id !==id)
}

const filteredLicenses= computed(() => {
    return licenses.value.filter(license => license.name.toLowerCase().includes(search.value.toLowerCase()));
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
        <p v-else-if="licenses.length ===0">Keine Lizenzen vorhanden</p>
        <div v-else>
           <input v-model="search" placeholder="Nach einer Lizenz suchen">
           <select v-model="statusFilter">
                <option value="alle">Alle</option>
                <option value="aktiv">Aktiv</option>
                <option value="laeuftbald">Läuft bald ab</option>
                <option value="abgelaufen">Abgelaufen</option>
            </select>
           <License  v-for="license in filteredByStatus" :key="license.id" :license="license" @revoke="revokeLicense"/>
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
