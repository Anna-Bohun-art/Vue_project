<script setup>
import { ref } from 'vue'
let todos=ref([]);
let newTodo=ref("");
let nextId=0;
function appendTodo(){
    let text=newTodo.value.trim();
    if(!text) return;
    todos.value.push({id: nextId++, text:text, done: false})
    newTodo.value="";
    
    
}
function removeTodo(id){
    todos.value=todos.value.filter(t=> !t.done)
}
</script>

<template>
    <div class="counter">
        <div class="counter">
     
            <div class="button">
                <input v-model="newTodo" @keyup.enter="appendTodo" placeholder="New todo">
                <button @click="appendTodo">Append Todo</button>
                <div>
                    <p v-for="todo in todos" :key="todo.id">
                        <input type="checkbox" v-model="todo.done">
                        {{ todo.text }}</p>
                    <button @click="removeTodo">Remove Todo</button>
                </div>
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
