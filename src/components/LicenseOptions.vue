<script>
    import { getStatus } from '@/utils/license';

    export default { 
        props: { license: { type: Object, required: true } },
        computed:{
            status(){
                return getStatus(this.license);
            }
        },
        emits:
            ['revoke']
    }
</script>
<template>
     <div >
        <p>{{ license.name }} </p>
        <p>{{ license.expiresAt }} </p>
        <span v-if="status==='abgelaufen'" class="abgelaufen">Abgelaufen</span>
        <span  v-else-if="status==='laeuftbald'" class="lauftbald">Läuft bald ab</span>
        <span v-else class="aktiv">Aktiv</span>
        <button @click="$emit('revoke',license.id)">Entziehen</button>
        <RouterLink :to="{name:'LicenseDetailView', params:{id:license.id}}">Details</RouterLink>
    </div>
</template>
<style scoped>
.abgelaufen{
    color:red;
}
.aktiv{
    color: green;
}
.lauftbald {
 color:orange;
}
</style>