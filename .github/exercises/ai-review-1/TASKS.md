# AI code review 1: LicenseNotes

Stack: Vue 3, `<script setup>`, Pinia (your own `useLicenseStore` from `src/stores/licenseStore.js`).

A colleague asked an AI tool: "Write a component that lists the active licenses, lets teachers write a note per license, and has a revoke button. Use our license store." The AI produced `LicenseNotes.vue`. The colleague says: "Looks good to me, can you approve the pull request?"

The code looks clean and runs at first sight. It has **five problems** of different severity. Some lines are fine; don't flag those just because they look unusual.

## Task 1: review

For each problem write:

- **Where:** the line or block
- **What happens:** what the user would see or what could go wrong (be concrete)
- **Fix:** in words, one or two sentences
- **Severity:** blocker (must fix before merge) / should fix / nice to have

Write it like a review comment to a colleague: short and friendly.

## Task 2: verdict

Would you approve, approve with comments, or request changes? One sentence why.

## Task 3: thinking question

Which of the five problems would a quick click-through in the browser **not** reveal? What does that tell you about reviewing AI code?
