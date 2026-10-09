<script setup>

const props = defineProps({
    value:{type:String, required: true}
})

const emit = defineEmits(['input'])
</script>
<template>
    <div>
        <input :value="value" @input="emit('input',$event.target.value)"/>

    </div>
</template>

<style scoped>

</style>
