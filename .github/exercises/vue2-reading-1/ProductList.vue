<template>
  <div class="product-list">
    <p v-if="isLoading">Produkte werden geladen…</p>
    <ul v-else>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} – {{ product.price | euro }}
        <button @click="addToCart(product)">In den Warenkorb</button>
      </li>
    </ul>
    <p>Artikel im Warenkorb: {{ cartCount }}</p>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'ProductList',
  props: {
    schoolType: { type: String, required: true },
  },
  computed: {
    ...mapState('shop', ['products', 'isLoading']),
    ...mapGetters('cart', ['cartCount']),
  },
  filters: {
    euro(value) {
      return value.toFixed(2).replace('.', ',') + ' €'
    },
  },
  // Bug (before): products were loaded only once, so switching the dropdown changed the prop
  // but never reloaded the list:
  //   created() {
  //     this.loadProducts(this.schoolType)
  //   },
  // Fix: watch the prop. Loading is a side effect, so watch, not computed.
  // immediate: true also runs the handler once at creation, which replaces created().
  watch: {
    schoolType: {
      handler(newType) {
        this.loadProducts(newType)
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions('shop', ['loadProducts']),
    ...mapActions('cart', ['addItem']),
    addToCart(product) {
      this.addItem({ id: product.id, quantity: 1 })
    },
  },
}
</script>
