# AI code review 2: LicenseOverview

Stack: Vue 2.7, Vuex 3, Options API.

A colleague asked an AI tool: "Write a component that shows the licenses of one school, with a search field and a note per license. Put the loading into a Vuex module. The search field should have the focus when the page opens." The AI produced two files. The colleague says: "Tested it quickly, looks fine. Can you approve the pull request?"

Files:

- `licenses.js`: the Vuex module, registered in the store as `licenses` (`namespaced: true`, so from outside its names start with `licenses/`, e.g. `dispatch('licenses/fetchLicenses', 3)`).
- `LicenseOverview.vue`: the component. It gets `schoolId` from the page. The page shows one school, so `schoolId` never changes while the component is on screen.

The server sends a list like `[{ id: 7, title: 'Mathe 5', active: true }, ...]`. `active: false` means expired.

Two small helpers you may not know:

- `$event.target.value`: in `@input`, `$event` is the browser's input event, `target` is the `<textarea>`, `value` is the text typed so far.
- `a.title.localeCompare(b.title)`: compares two strings alphabetically (knows German umlauts), returns a negative number, 0 or a positive number. That is what `sort` needs.

The code has **five problems** of different severity. Some lines look unusual but are fine; don't flag those just because they look unusual.

## Task 1: review

For each problem write:

- **Where:** the file and the line or block
- **What happens:** what the user would see or what could go wrong (be concrete)
- **Fix:** in words, one or two sentences
- **Severity:** blocker (must fix before merge) / should fix / nice to have

Write it like a review comment to a colleague: short and friendly.

## Task 2: verdict

Would you approve, approve with comments, or request changes? One sentence why.

## Task 3: thinking question

The colleague "tested it quickly". Which of the five problems show a red error or a warning in the browser console, and which are completely silent? What does that mean for how you review?
