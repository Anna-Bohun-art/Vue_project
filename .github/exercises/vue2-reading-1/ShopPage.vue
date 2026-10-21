<template>
  <div class="shop-page">
    <label>
      Schulform:
      <select v-model="selectedType">
        <option value="grundschule">Grundschule</option>
        <option value="gymnasium">Gymnasium</option>
      </select>
    </label>

    <ProductList :school-type="selectedType" />
  </div>
</template>

<script>
import ProductList from './ProductList.vue'

export default {
  name: 'ShopPage',
  components: { ProductList },
  data() {
    return {
      selectedType: 'grundschule',
    }
  },
}
</script>
