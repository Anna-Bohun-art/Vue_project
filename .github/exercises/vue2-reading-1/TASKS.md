# Vue 2 reading exercise 1: ProductList

Stack: Vue 2.7, Options API, Vuex 3 with modules.

Files:

- `ShopPage.vue`: the parent page. It has a dropdown and passes the selected value to `ProductList` as `schoolType`.
- `ProductList.vue`: the component to read.

## Task 1: explain it

Go through `ProductList.vue` block by block in your own words: what each part does and where the data comes from.

Two things not used in this project yet:

- `mapState('shop', [...])` has a first argument. What could `'shop'` mean?
- `{{ product.price | euro }}` and the `filters` block. What happens to the price before it is shown?

## Task 2: bug report

> "When I switch the dropdown from Grundschule to Gymnasium, the product list doesn't change. It still shows the Grundschule products. After a page reload it's correct."

Find the cause and describe the fix in words. No code needed.
