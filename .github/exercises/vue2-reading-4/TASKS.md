# Vue 2 reading exercise 4: ClassNameEditor

Stack: Vue 2.7, Options API.

Files:

- `ClassPage.vue`: the parent. It owns the class name and the number of students.
- `ClassNameEditor.vue`: a small form to rename the class.

## Task 1: explain it (short)

Where does the class name live, how does it get into the input, and how should a new name get back to the parent?

## Task 2: bug report

> "Ich tippe einen neuen Klassennamen ein, z. B. '7c'. Bevor ich auf 'Speichern' klicke, füge ich noch einen Schüler hinzu. Danach steht im Feld wieder '7b'. In der Konsole: [Vue warn]: Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders."

Why does the text jump back exactly when a student is added? Find the cause.

## Task 3: fix

Describe the fix in words: where should the typed text live while the user edits it, and what is its starting value? Then write it.

## Task 4: thinking question

Suppose the parent had `schoolClass: { name: '7b', year: 2026 }` in its `data()` instead, passed it with `:school-class="schoolClass"`, and the input used `v-model="schoolClass.name"`. Would Vue still print the warning? What would happen to the parent's data? (Hint: what you learned today about emitting an array.)
