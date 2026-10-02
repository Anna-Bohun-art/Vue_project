<script setup>
import { getStatus } from '@/utils/license';
import { ref } from 'vue'
//const licenses=ref([])
const prop = defineProps({
    license:{type:Object, required: true}
})
const showDetails = ref(false);

const emit = defineEmits(['revoke'])
</script>
<template>
    <div >
        <div v-if="getStatus(license)==='abgelaufen'" class="abgelaufen">
            <p>{{ license.name }} </p>
            <p>{{ license.expiresAt }} </p>
            <span>Abgelaufen</span>
            <button @click="emit('revoke',license.id)">Entziehen</button>
            <button @click="showDetails = !showDetails">Details</button>
            <div v-show="showDetails">
                <p>{{ license.id }}</p>
            </div>
        </div>
        <div v-else-if="getStatus(license)=='laeuftbald'" class="lauftbald">
            <p>{{ license.name }} </p>
            <p>{{ license.expiresAt }} </p>
            <span>Läuft bald ab</span>
            <button @click="emit('revoke',license.id)">Entziehen</button>
            <button @click="showDetails = !showDetails">Details</button>

            <div v-show="showDetails">
                <p>{{ license.id }}</p>
            </div>
        </div>
        <div v-else class="aktiv">
            <p>{{ license.name }} </p>
            <p>{{ license.expiresAt }} </p>
            <span>Aktiv</span>
           <button @click="emit('revoke',license.id)">Entziehen</button>
           <button @click="showDetails = !showDetails">Details</button> 
           <div v-show="showDetails">
                <p>{{ license.id }}</p>
            </div>
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
