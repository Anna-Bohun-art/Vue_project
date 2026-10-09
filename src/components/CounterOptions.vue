<script>
export default{
    data(){
        return{
            counter: 0,
        }
    },
    methods:{
        increaseCounter(){
            this.counter++;
        },
        decreaseCounter(){
            this.counter--;
        }
    }
}
</script>
<template>
    <div>
        <p>{{ counter }}</p>
        <button @click="increaseCounter">Increase</button>
        <button @click="decreaseCounter">Decrease</button>
    </div>
</template>