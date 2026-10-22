# Vue 2 reading exercise 5: LicenseTable

Stack: Vue 2.7, Vuex 3, Options API.

Files:

- `store/index.js`: creates the store, registers the `licenses` module.
- `store/licenses.js`: namespaced module. The server sends the licenses newest first.
- `LicenseTable.vue`: a table of all licenses, sortable by title or school.
- `RecentLicenses.vue`: a box with the three newest licenses.

Both components are on the same start page.

## Task 1: explain it (short)

Where does the license list live? How does each component get it, and which one loads it from the server?

## Task 2: bug report

> "Seit es die sortierbare Tabelle gibt, zeigt die Box 'Zuletzt hinzugefügt' nicht mehr die neuesten Lizenzen, sondern die ersten drei nach Alphabet. Klicke ich auf 'Nach Schule', ändert sich die Box auch. In der Entwicklung steht in der Konsole: [vuex] do not mutate vuex store state outside mutation handlers."

Find the line that causes it and explain why the box changes even though `RecentLicenses.vue` was never touched.

## Task 3: fix

Describe the fix in words, then write it. The store must stay unchanged.

## Task 4: thinking questions

1. A colleague suggests: "Sort in a method and write the result back with `this.licenses = sorted`." What happens, and why?
2. Yesterday you learned that `[...arr]` is only a shallow copy. Is a shallow copy enough for your fix? Why or why not?
3. Why does the message appear only in development? What would users see in production?
