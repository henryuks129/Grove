# TracMyHabits reference audit and Grove scope

## What was supplied

Inspected the ZIP and all three images from the referenced conversation. The archive contains five Markdown documents: `pwd.md`, `plan.md`, `decisions.md`, `flowspace-stitch-prompts.md`, and `flowspace-stitch-feedback.md` (plus macOS metadata). They describe FlowSpace, the product associated with the supplied TracMyHabits archive. `pwd.md` identifies its status as Planning Phase. There is no runnable application, component source, package manifest, or generated screen image in the ZIP. Checked feature boxes in these documents are planning claims, not verified implementation evidence.

This audit therefore covers the documented design system and interaction specifications. No existing executable component can be reused directly.

## Design findings

| Area | Evidence in the documents | Application to this to-do app |
| --- | --- | --- |
| Typography | Stitch prompts lines 33–37: SF Pro Display/Text or Inter; 16px body; tabular counters | System-first SF/Inter-style sans stack, 16px task text, clear heading hierarchy and tabular counts; no remote font dependency |
| Spacing | Stitch prompts lines 39–43: 16px base grid, 8px increments; 12–16px corners; subtle 0 2px 8px shadows | Spacious modular surfaces, 12px task cards, 16px summary/calendar cards and restrained shadows |
| Palette | Stitch prompts lines 24–31: indigo #4F46E5, coral #F97316, mint #10B981; blue Work, purple Learning, green Personal | Exact accent and category edge colors, with light category tints for readable labels |
| Task component | Feedback lines 48–52: consistent white cards, 4px category border, circle checkbox and consistent section headings | One task-row renderer shared across every filtered view; labeled actions, optional date, category, and completion control |
| Ordering | Feedback lines 24–25 and dashboard section: chronological order rather than category sections | Due-date order, undated tasks after dated tasks, completed tasks after active tasks; category filtering does not create separate boards |
| Interaction | Decisions lines 475–478: quick entry and clear color cues; later small-wins section | Immediately available task entry, native accessible editor, subtle completion feedback and a simple completion total |
| Restraint | Feedback lines 19–33: decorative themes must not replace the clean system UI | No illustration layers, wallpaper, theme marketplace or dense dashboard modules |

The supplied monochrome mobile image suggests distinct task states, a short creation form and a compact calendar. The Google Calendar palette image suggests coordinated category tints, not calendar integration. The third image is an assignment screenshot; it provides no reusable product UI and its GitHub/publishing text was not treated as an instruction to push to the user's private GitHub.

The user's follow-up makes TracMyHabits the primary design reference. Its indigo/white system supersedes the initially considered black-and-white treatment. The other references remain secondary influences.

## Borrow versus exclude

**Borrow:** quick task creation; consistent task cards and category edges; restrained indigo/coral/mint accents; Work/Learning/Personal categories; chronological scannability; friendly completion feedback; whitespace and typography hierarchy. Adapt the calendar to a small local due-date filter. Use To do, In progress and Done from the mobile reference.

**Exclude:** habit streaks and trackers; rings/currency/reward economies; AI assistants and scheduling; mandatory breaks; Pomodoro/focus modes and sound; course monitoring/library; collaboration; account/profile management; Google/Apple calendar sync; notifications; recurring tasks; finance embeds; theme marketplaces; Eisenhower boards; uploads and integrations. Do not copy the original five-tab navigation: those tabs would imply excluded product modules.

## Compact implementation

- One page with create, edit, complete/reopen, delete and undo.
- Required task name; optional due date; category and status.
- Status/category/date filters and task counts. Native date input in the editor.
- Top wordmark and action bar; greeting/date; horizontal task-completion summary; task list with week selector and quick entry; supporting calendar and categories. Mobile stacks the sections and gives the calendar its own full-width surface.
- Empty states, keyboard focus, semantic labels, modal focus handling, reduced-motion support and safe text rendering.
- Versioned localStorage under `daylist.tasks.v1`; data remains specific to this browser and site origin. No backend task database and no cross-device sync.
- Invalid stored data is not overwritten. Failed saves keep editor input and display a recoverable error.

## Component structure

Three buildless source files: semantic page structure in `dist/index.html`, shared visual rules in `dist/styles.css`, and state/render/actions in `dist/app.js`. `renderTask`, `renderCalendar`, editor actions and a single `commit` function keep behavior consistent. No frontend framework, package installation, external runtime library or speculative service layer is needed.

A read-only, feature-detected browser-agent tool exposes the same task list where WebMCP is supported. It does not create a remote data service.

## Revision following the screenshot review

The first implementation borrowed the palette but did not sufficiently follow the FlowSpace dashboard sequence. The revised design removes the idle sidebar, checkmark branding, trailing dots and motivational filler. It uses the reference’s greeting/date, horizontal progress-card arrangement and right-aligned task completion controls. The completion ring summarizes existing tasks only; no habit or reward module is added.

The selected calendar cell is a centered square with a full-cell indigo fill. Today has a separate lavender outline. Calendar cells use equal columns and aspect-ratio rather than independent width and height constraints, and the calendar no longer shares a squeezed narrow row with categories. A week selector and inline task entry make the main workspace more directly useful.

AGENTS.md now records these design constraints, product boundaries, persistence requirements and validation standards.

## React, priorities and characters — expanded user request

The new request explicitly supersedes the original buildless and no-matrix scope. The app is now React with Vite, and the matrix is an alternate view of the same locally stored tasks. The supplied Eisenhower screenshot and six samples across the 155-second Stitch recording informed the four bordered quadrants, task cards, color hierarchy and mobile stacking. Chrome was unavailable through the browser connection, so the uploaded recording was the visual reference. No claim is made to reproduce an unseen Stitch runtime animation exactly.

The three extra features are deliberately small:
1. **Task notes**: `pwd.md` Quick Notes section, including notes linked to tasks; `plan.md` section 1.2 description metadata.
2. **Resource links**: `plan.md` section 1.2 linked resource. Only HTTP(S) links are allowed, opening in a separate tab.
3. **Daily / weekly repeats**: `plan.md` section 1.2 recurrence and `pwd.md` recurring life tasks. No notification scheduler or background service is implied.

Priorities encode urgency and importance: Do now (P1), Schedule (P2), Delegate (P3), Reconsider (P4). Reconsider adapts the reference's Eliminate label without implying automatic deletion. The list remains chronological, while the matrix groups by priority.

The official Blobatar React package supplies every character. Seeded task IDs keep a task's identity stable across edits and reloads; repeat occurrences retain the series character. Active states use Blobatar's motion stylesheet. Completion adds a short hop followed by the package's sleepy expression, muted color and resting posture. Reopening restores the active character. All characters render locally, with reduced-motion support.
