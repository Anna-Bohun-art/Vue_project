<script setup>
import { ref } from 'vue'
import MyInput from '@/components/MyInput.vue'
import CounterOptions from '@/components/CounterOptions.vue'
import Counter from '@/components/Counter.vue'
import MyInput2 from '@/components/MyInput2.vue'

const name = ref('');
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <MyInput v-model="name" />
    <p>Typed: {{ name }}</p>
    <Counter />
    <CounterOptions />
    <MyInput2 :value="name" @input="name=$event"/>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
