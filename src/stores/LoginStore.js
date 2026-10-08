import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSessionStore = defineStore('login', () => {
  const session = ref(JSON.parse(localStorage.getItem('session')));
  const login=(email, role)=>{
    if(session.value){
        throw new  Error("You are already logged in. Please logout first.");
    } else{
         session.value={email:email, role: role};
         localStorage.setItem('session', JSON.stringify(session.value));
    }
    };
  const logout=()=>{
    session.value=null;
    localStorage.removeItem('session');
  }

  return { session, login, logout }
})
