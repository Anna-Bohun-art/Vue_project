import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getStatus } from '@/utils/license';

export const useLicenseStore = defineStore('licenses', ()=> {
  const licenses = ref([]);
  const revokeLicense=async(id)=>{

    try{
      const response = await fetch(`http://localhost:3000/licenses/${id}`, {method:'DELETE'});
      if(!response.ok){
        throw new Error(`HTTP Error! Status ${response.status}`)
      }
      const updatedLicenses=await (await fetch(`http://localhost:3000/licenses`)).json();
      licenses.value=updatedLicenses;

    } catch(error){console.log(error.message)}
  };
  const expiredCount= computed(()=> licenses.value.filter((l)=>getStatus(l)==="abgelaufen").length);
  const licensesCount=computed(()=> licenses.value.length)
   const getData=async()=>{
      try{
          const response= await fetch('http://localhost:3000/licenses');
          if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`)
          }
          licenses.value=await response.json();
          console.log(licenses.value);
      }
      catch(error){
          console.error('Error', error);
      }
   }
    return { licenses, revokeLicense, expiredCount, licensesCount, getData }
  })

