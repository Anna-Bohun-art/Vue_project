<script setup>
import { ref } from 'vue'
let counter=ref(0);
function increaseCounter(){
    counter.value++;
}
function decreaseCounter(){
    counter.value--;
}
</script>

<template>
    <div class="counter">
        <div class="counter">
            <div class="number">
                <p>{{counter}}</p>
            </div>
            <div class="button">
                <button @click="increaseCounter">Increase me</button>
                <button @click="decreaseCounter">Descrease me</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}
.number{
    display:flex;
    margin-right: 40vw;
    margin-left: 40vw;
}
.number p {
  text-align: center;
}
.button{
    max-width: 60vw;
    display: flex;
    justify-content: space-between;

}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
