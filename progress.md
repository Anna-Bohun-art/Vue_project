# Progress: Vue preparation for develop4edu

As of 2 October 2026. Probetag: 27 October.

## Status

- **Week 1:** done except the Vue docs (Essentials), planned for 2 October. TypeScript is not needed, because develop4edu uses JavaScript.
- **Week 2 (28 Sept – 2 Oct):** 2 October is the last day. Plan for today: `watch`, then Vue Router. Navigation guard, Pinia, form validation, list states and repo cleanup move to Week 3. That is fine: 3½ weeks left until 27 October.
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

## Friday, 2 October

1. [ ] Read the Vue docs, Essentials (1-2 hours): Reactivity Fundamentals, Computed Properties, Watchers, Props, Component Events
2. [x] Optional task 6: `watch` + `localStorage` for `search`
3. [x] Answer the two interview questions above in your own words (`computed` vs function, `watch` vs `computed`)
4. [x] Decide: new project or this one. **Decision: this project.**
5. [ ] Vue Router (see Week 2 tasks)
6. Later: optional tasks 5 (counter) and 7 (two empty messages)

## Project setup for the license app (in this project)

- [x] `git init` and a first commit, pushed to GitHub (`Anna-Bohun-art/Vue_project`)
- [ ] Move the practice components (`Counter.vue`, `Todo.vue`) to `src/exercises/`
- [ ] Remove the practice code from `App.vue` (greeting input, `toggleBox`, `greet`, unused CSS) so it only holds the layout, `<nav>` and `<RouterView />`
- [ ] Replace the demo views (`HomeView.vue`, `AboutView.vue`) with the license app views

## Week 2 tasks (from the plan)

Today: Vue Router. The rest moves to Week 3 (5-11 October).

- [ ] **Vue Router:** login page, license overview, detail page (`/licenses/:id`, read with `useRoute().params.id`), admin area
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
