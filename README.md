# Daylist

A simple responsive to-do app inspired by the supplied TracMyHabits/FlowSpace design documents. See AUDIT.md for reference findings and explicit scope.

## Run locally

From this directory:

```sh
python3 -m http.server 5173 --bind 127.0.0.1 --directory dist
```

Open http://127.0.0.1:5173. No build or dependency installation is required. Keep using the same origin/port to access the same localStorage data.

## Storage

Tasks live only in localStorage in the current browser, under `daylist.tasks.v1`. Clearing site data removes them. Another browser/device or the deployed URL has its own independent storage. No tasks are included in the source files or sent to a server.

## Edit

- `dist/index.html`: page and task editor
- `dist/styles.css`: responsive layout and reference-derived visual tokens
- `dist/app.js`: task state, validation, localStorage, filters and interactions

No habit, AI, sync, notification, collaboration or account features are included.
