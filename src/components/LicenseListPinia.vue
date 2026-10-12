<script setup>

    import LicenseOptions from './LicenseOptions.vue';
    import { useLicenseStore } from '../stores/licenseStore.js'
    const store=useLicenseStore();
</script>
<template>
    <div>
        <LicenseOptions v-for="license in store.licenses" :key="license.id" :license="license" @revoke="store.revokeLicense" />
        <p>{{ store.licensesCount }} Lizenzen</p>
        <p>{{ store.expiredCount }} Abgelaufen </p>
    </div>
    
</template>
<style scoped>

</style>