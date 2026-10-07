import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSessionStore = defineStore('login', () => {
  const session = ref(null);
  const login=(email, role)=>{
    if(session.value){
        throw new  Error("You are already logged in. Please logout first.");
    } else{
         session.value={email:email, role: role};
    }
    };
  const logout=()=>{
    session.value=null;
  }

  return { session, login, logout }
})
