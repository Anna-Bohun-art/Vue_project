<template>
  <div class="license-pool">
    <h2>{{ productName }}</h2>
    <p>{{ freeCount }} von {{ total }} Lizenzen frei</p>

    <ul>
      <li v-for="student in assigned" :key="student.id">
        {{ student.name }}
        <button @click="unassign(student.id)">Entfernen</button>
      </li>
    </ul>

    <button :disabled="freeCount === 0" @click="assignNext">Nächsten Schüler zuweisen</button>
  </div>
</template>

<script>
export default {
  name: 'LicensePool',
  props: {
    productName: { type: String, required: true },
    total: { type: Number, required: true },
    waitingList: { type: Array, default: () => [] },
  },
  data() {
    return {
      assigned: [],
    }
  },
  computed: {
    freeCount() {
      return this.total - this.assigned.length
    },
  },
  methods: {
    assignNext() {
      const next = this.waitingList.find(
        (student) => !this.assigned.some((a) => a.id === student.id),
      )
      if (next) {
        this.assigned.push(next)
        this.$emit('changed', this.assigned.length)
      }
    },
    // Bug (before): written as an arrow function:
    //   unassign: (id) => { ... }
    // An arrow function has no own `this`. It takes `this` from the module top level, which is
    // undefined, so this.assigned threw a TypeError. (The object literal is not a scope.)
    // Fix: a normal method, so Vue binds `this` to the component.
    unassign(id) {
      this.assigned = this.assigned.filter((student) => student.id !== id)
      this.$emit('changed', this.assigned.length)
    },
  },
}
</script>
