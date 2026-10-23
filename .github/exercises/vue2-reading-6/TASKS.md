# Vue 2 reading exercise 6: SchoolLicenses

Stack: Vue 2.7, Options API.

Files:

- `SchoolPage.vue`: the parent. A dropdown of schools; the selected id goes to `SchoolLicenses` as the prop `schoolId`.
- `SchoolLicenses.vue`: loads and shows the licenses of one school.

## Task 1: explain it (short)

What happens when the user picks another school in the dropdown? Go from the `<select>` to the list on screen.

## Task 2: bug report

> "Wenn ich die Seite öffne, steht da 'Keine Lizenzen', obwohl das Gymnasium Nord welche hat. Wähle ich eine andere Schule und dann wieder Gymnasium Nord, sind sie plötzlich da. Im Netzwerk-Tab gibt es beim Öffnen gar keinen Request."

Why is there no request when the page opens? Find the cause.

## Task 3: fix

Describe the fix in words, then write it. There are two ways; name both and say which you prefer.

## Task 4: thinking questions

1. The badge "Alle Lizenzen aktiv" uses `every`. What would it show if a colleague wrote `some` instead, for a school with one active and one expired license? And what does `every` return for an empty list? (Look at the template: can that case reach the badge?)
2. A colleague adds this at the end of the `try` block, to show "Gespeichert" for two seconds:

   ```js
   this.savedHint = true
   setTimeout(function () {
     this.savedHint = false
   }, 2000)
   ```

   "Gespeichert" never goes away. Why? What is `this` inside that function, and what is the smallest change that fixes it?
3. Later the parent keeps an object in its `data`, `filters: { schoolId: 1, onlyActive: true }`, and passes it with `:filters="filters"`. The child watches the prop `filters` (a plain `filters(newFilters) { ... }` watcher, like `schoolId` now). The parent then runs `this.filters.onlyActive = false`. Does the child's watcher run? Name two ways to make it react.
