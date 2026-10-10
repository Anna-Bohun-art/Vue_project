<script>

    import { mapActions, mapState, mapGetters } from 'vuex';
    import LicenseOptions from './LicenseOptions.vue';

    export default { 
        name: 'LicenseListVuex',
        computed:{
            ...mapState(['licenses']),
            ...mapGetters([ 'expiredCount', 'licensesCount']),
        },
        methods:{
            ...mapActions(['revokeLicense']),
        },
        components:{
            LicenseOptions
        }
    }
</script>
<template>
    <div>
        <LicenseOptions v-for="license in licenses" :key="license.id" :license="license" @revoke="revokeLicense" />
        <p>{{ licensesCount }} Lizenzen</p>
        <p>{{ expiredCount }} Abgelaufen </p>
    </div>
    
</template>
<style scoped>

</style>