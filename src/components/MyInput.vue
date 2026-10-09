<script setup>
import { getStatus } from '@/utils/license';
import { computed } from 'vue';

const props = defineProps({
    modelValue:{type:String, required: true}
})

const emit = defineEmits(['update:modelValue'])
</script>
<template>
    <div>
        <input :value="modelValue" @input="emit('update:modelValue',$event.target.value)"/>

    </div>
</template>

<style scoped>

</style>
