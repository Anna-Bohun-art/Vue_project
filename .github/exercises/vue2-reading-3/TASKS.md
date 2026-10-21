# Vue 2 reading exercise 3: LicensePool

Stack: Vue 2.7, Options API.

A school has a fixed number of licenses for one product. The teacher assigns them to students from a waiting list, one at a time.

## Task 1: explain it (short)

Which parts come from the parent, which belong to the component, and which are derived? What does the parent learn through `changed`?

## Task 2: bug report

> "Zuweisen klappt. Aber wenn ich bei einem Schüler auf 'Entfernen' klicke, passiert nichts. In der Konsole steht: TypeError: Cannot read properties of undefined (reading 'assigned')"

Find the cause and describe the fix in words.

## Task 3: thinking question

`assignNext` also contains arrow functions (inside `find` and `some`), and they use `this` without problems. Why do they work there, but not in `unassign`?
