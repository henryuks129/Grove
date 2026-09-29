# Grove — React

A device-local task planner inspired by the supplied TracMyHabits / FlowSpace plans and Stitch recording. Grove uses React, Vite and the official Blobatar React library.

## Run

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. To create a portable production build:

```sh
npm test
npm run build
npm run preview
```

Use a stable hostname and port to retain the same browser-local data. The active task preview uses http://127.0.0.1:5173. If that port is occupied by the prior preview, stop that preview before starting Vite on it.

## Features

- Task creation, editing, completion, reopening, deletion with undo.
- Due dates and times, with a preview control that intentionally makes a task overdue so its moss growth can be tested.
- Plan view, date/category/status/priority filters, calendar and completion summary.
- Eisenhower matrix: P1 Do now, P2 Schedule, P3 Delegate, P4 Reconsider. Move cards by drag/drop on desktop or the priority selector on any device. Labels describe decisions; they do not delegate or delete tasks.
- A stable, locally rendered Blobatar on every task. Active characters breathe/blink; completed characters hop and settle into a sleepy state. Reopening wakes them. Reduced motion is respected.
- Three additions from the plans: task notes, HTTP(S) resource links, daily/weekly recurrence.
- A recurring task creates one next occurrence when completed, skipping past missed dates. Reopening keeps that next occurrence; completing the original again does not duplicate it. Editing an occurrence affects that occurrence, not the entire series.

## Storage and migration

The existing `daylist.tasks.v1` localStorage key is retained. The app reads version 1 or 2 envelopes and saves version 2 after a successful edit. Legacy IDs, titles, dates, categories and statuses are preserved. New fields receive defaults; a legacy backup is saved at `daylist.tasks.backup.v1` before the first migration write. Malformed storage is not overwritten. Saved data remains specific to the current browser and origin; clearing browser data deletes it. No cross-device sync or backend task storage.

Task avatar seeds use stable IDs, not names sent over the network. Blobatar is bundled and renders locally. Task content is not transmitted to Blobatar.

## Source

- `src/main.jsx`: React app composition and actions
- `src/components.jsx`: task cards, animated characters, calendar and icons
- `src/TaskEditor.jsx`: native dialog and task fields
- `src/Matrix.jsx`: four-quadrant board
- `src/useTaskStore.js`: persistence and optional read-only browser-agent tool
- `src/model.js`: migration, validation, recurrence and sorting
- `src/model.test.js`: meaningful state-transition tests
- `src/styles.css`: shared visual system and responsive layouts
- `dist/`: generated deployable assets; edit source and rebuild

Read AGENTS.md before future changes. AUDIT.md records the reference decisions and VALIDATION.md distinguishes tested behavior from remaining limitations.

## Attribution

Characters: [Blobatar](https://blobatar.dev/), MIT licensed, by Alain. The official `blobatar` and `@blobatar/react` packages are used directly. Their license notices are included in THIRD_PARTY_NOTICES.md.
