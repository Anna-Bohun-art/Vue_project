# Progress: Vue preparation for develop4edu

As of 2 October 2026. Probetag: 27 October.

## Status

- **Week 1:** done except the Vue docs (Essentials), planned for 2 October. TypeScript is not needed, because develop4edu uses JavaScript.
- **Week 2 (28 Sept – 2 Oct):** finished on 2 October with `watch`, git + GitHub, and Vue Router (`/licenses`, `/login`, `/licenses/:id`). Navigation guard, Pinia, form validation, list states and repo cleanup move to Week 3. That is fine: 3½ weeks left until 27 October.
- **Decision (2 October):** continue in this project, no new project. Vue Router and Pinia are already installed and registered in `src/main.js`.
- **Tests (Vitest, Playwright):** postponed on purpose. Do them in Week 4 or 5, before 27 October.

## Done

| Component | Practised |
|---|---|
| `Counter.vue` | `ref`, events |
| `Todo.vue` | `v-for`, `:key`, `v-model` on a checkbox |
| `LoginForm.vue` | `v-model` on different inputs, `@submit.prevent`, `:disabled` |
| `LicenseStatus.vue` + `License.vue` | `v-if` / `v-else-if` / `v-else`, `v-show`, empty state, `defineProps`, `defineEmits` |
| Exercise 6, requirement 1 | `onMounted` + `setTimeout`, loading state |
| Exercise 6, requirements 2-4 | search with `v-model`, status `<select>`, two chained `computed` (`filteredLicenses` → `filteredByStatus`), shared `getStatus` in `src/utils/license.js` |

## Open: exercise 6 (`LicenseStatus.vue`)

Required parts are done (see table above).

Optional:

- [ ] **5. Counter:** "3 von 5 Lizenzen" with a second `computed`.
- [x] **6. `watch`:** save `search` to `localStorage` and read it back on load.
- [ ] **7. Two empty messages:** "Keine Lizenzen vorhanden" (list empty) vs "Keine Treffer" (filter hides everything).

Interview questions to answer afterwards:

- [x] `computed` vs a normal function like `daysLeft`: what is the difference, and when do you use which?
- [x] `watch` vs `computed`: why is saving to `localStorage` a job for `watch`?

## Learned on 1 October

- **`computed`** is a value derived from refs. Vue tracks which refs it reads (here `licenses`, `search`, `statusFilter`) and reruns it only when one of them changes. Otherwise it returns the cached result. It is lazy: it first runs when something reads it (here after loading, when the `v-else` list renders).
- **A computed takes no parameters.** It reads refs directly. In `<script>` a computed is read with `.value` (`filteredLicenses.value`), in the template without.
- **Chaining computeds:** `filteredByStatus` starts from `filteredLicenses.value`, not `licenses.value`, so search and status filter work together.
- **`filter` needs a callback** that returns `true` / `false`: `licenses.value.filter(l => condition)`. No ternary needed.
- **`emit` vs shared function:** `emit` is for the child telling the parent that something *happened* (click on "Entziehen" → `emit('revoke', id)` → parent's `revokeLicense`). A calculation both components need (`getStatus`) goes into a plain JS file under `src/utils/` and is imported in both. "Props down, events up."
- **Typical mistakes made today:** `=` instead of `===`; `//` (comment) instead of `/`; `if-else` instead of `else if` (`v-else-if` has a dash, JS does not); `1` (digit) instead of `l` (letter); `<option>` value not matching the string `getStatus` returns; `v-model="search.value"` instead of `v-model="search"`.

## Open: small leftovers in finished components

`LicenseStatus.vue`:

- [ ] Remove the commented-out `//const licenses=ref([])` line
- [ ] Remove the `.greetings` and status CSS (the status colours live in `License.vue`)

`LoginForm.vue`:

- [ ] `let` to `const` for all refs (lines 3-5, 7, 10)
- [ ] Placeholder option: `<option value="" disabled>Rolle wählen</option>`
- [ ] Rename the loop variable `role` to `r` (line 21). It shadows the `role` ref.
- [ ] `autocomplete="username"` on email, `autocomplete="current-password"` on password
- [ ] Optional: "Angemeldet bleiben" checkbox, and show the saved users below the form (without password)

`License.vue`:

- [ ] Optional: write name, date and buttons once and use `v-if` / `v-else-if` / `v-else` only for the status label
- [ ] `color: yellow` to `orange` (readability)
- [ ] Remove the unused `.greetings` CSS
- [ ] `const prop` is never used: rename it to `props` (needed for the next item) or remove it
- [ ] Optional: `const status = computed(() => getStatus(props.license))` instead of calling `getStatus(license)` three times in the template (good practice for the interview question)

## Next session

1. [ ] Read the Vue docs, Essentials, if not done yet (Reactivity Fundamentals, Computed Properties, Watchers, Props, Component Events), and bring questions
2. [ ] Router step 3: "Details" `RouterLink` in `License.vue` (see Week 2 tasks)
3. [ ] Start Week 3 with the **Pinia store for licenses**: one place for the mock list, used by `LicenseStatus.vue` and `LicenseDetailView.vue` (removes the copied list)
4. Later: optional tasks 5 (counter) and 7 (two empty messages)

## Learned on 2 October

- **`watch(ref, (newValue) => ...)`** is for side effects (e.g. `localStorage.setItem`). Read the saved value as the ref's starting value: `ref(localStorage.getItem('search') ?? '')`, at the top level, not in `onMounted`.
- **`localStorage`** is client-side key-value storage, strings only, survives reloads and closing the browser (`sessionStorage` is cleared when the tab closes).
- **`??` vs `||`:** `??` only falls back on `null` / `undefined`, `||` on every falsy value (`0`, `''`, `false`).
- **Re-render vs reload:** functions in the template run on every re-render, a `computed` only when its dependencies change.
- **Router:** `routes` maps paths to components, `<RouterLink :to="{ name }">` navigates, `<RouterView />` is replaced by the current page. The `<nav>` stays outside `RouterView` so it is visible on every page. `:id` in a path is a placeholder, read it with `useRoute().params.id` (a string).
- **`find` vs `filter`:** `find` returns one element or `undefined`, `filter` always an array.
- **Typical mistakes today:** `<script type="setup">` instead of `<script setup>`; `to="{...}"` without `:` (passes a string); missing `import { computed }`; `50 vh` with a space (invalid CSS, silently ignored); a later media query overriding a CSS value; forgetting to save a file.

## Project setup for the license app (in this project)

- [x] `git init` and a first commit, pushed to GitHub (`Anna-Bohun-art/Vue_project`)
- [ ] Move the practice components (`Counter.vue`, `Todo.vue`) to `src/exercises/`
- [x] Remove the practice code from `App.vue` (greeting input, `toggleBox`, `greet`, unused CSS) so it only holds the layout, `<nav>` and `<RouterView />`
- [ ] Replace the demo views (`HomeView.vue`, `AboutView.vue`) with the license app views

## Week 2 tasks (from the plan)

Today: Vue Router. The rest moves to Week 3 (5-11 October).

- [ ] **Vue Router:** login page, license overview, detail page (`/licenses/:id`, read with `useRoute().params.id`), admin area
  - [x] `/licenses` (`LicensesView.vue`) and `/login` (`LoginView.vue`), links by name in `App.vue`, `App.vue` cleaned up (2 October)
  - [x] Detail page `/licenses/:id` (`LicenseDetailView.vue`): `useRoute().params.id`, `find` + `Number(...)`, `v-if` / `v-else` for "not found" (2 October)
  - [ ] **Next:** in `License.vue`, replace the "Details" button with a `RouterLink` to the detail route (`name` + `params`), then remove `showDetails` and the `v-show` part
  - [ ] Think about: what happens when you click "Entziehen" on the detail page? (nobody listens to `revoke` there → reason for the Pinia store)
  - [ ] Admin area
- [ ] **Navigation guard:** users who are not logged in go to the login page
- [ ] **Pinia store** for login status and user role
- [ ] **Second Pinia store** for licenses, with mock data for now
- [ ] **Form with validation:** error messages, disabled button, loading state
- [ ] **Loading, empty and error state** for every list
- [ ] **Clean repository:** small commits with clear messages, README with setup instructions

Postponed to Week 4/5:

- [ ] Add Playwright (`npm init playwright@latest`), one component test with Vitest, one flow test with Playwright

## Not coding, but time-sensitive

- [ ] Email to develop4edu with the questions from the plan (stack, preparation, laptop, schedule, pay), if not sent yet
- [ ] Update the plan (doc and PDF): remove "TypeScript aktivieren" from Week 1
