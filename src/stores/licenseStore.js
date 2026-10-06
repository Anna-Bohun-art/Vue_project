import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLicenseStore = defineStore('license', () => {
  const licenses = ref([{ id: 1, name: 'Mathe 7 Digital', expiresAt: '2027-03-31' },
  { id: 2, name: 'Deutsch Arbeitsheft', expiresAt: '2026-10-15' },
  { id: 3, name: 'Englisch Vokabeltrainer', expiresAt: '2026-06-30' },
  { id: 4, name: 'Biologie Interaktiv', expiresAt: '2026-10-20' },
  { id: 5, name: 'Geschichte Atlas', expiresAt: '2025-12-31' }]);
  const revokeLicense=(id)=>{licenses.value = licenses.value.filter(l=> l.id !==id)};

  return { licenses, revokeLicense }
})
