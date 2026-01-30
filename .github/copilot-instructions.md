## Repo snapshot

- Small static web project. Entry: `index.html` which loads `js/main.js` as an ES module.
- Main modules: `js/main.js` (entry), `js/api.js` (API layer), `js/game.js` (game & UI logic — currently empty).
- No build system, no package.json, no tests present.

## Big picture for an AI coding agent

- Purpose: a client-only MTG "Higher/Lower" game that queries EDHREC JSON endpoints (example used: `https://json.edhrec.com/cards/sol-ring`).
- Data flow: `index.html` -> `js/main.js` (entry) -> `js/api.js` (fetchCard) -> remote JSON -> returned card object { name, salt, image } -> UI logic should live in `js/game.js`.
- Architectural intent: keep network code in `js/api.js`, keep UI/game orchestration in `js/game.js`, and use `main.js` only to bootstrap the app.

## Project-specific conventions & patterns

- ES Modules only: files use `import`/`export` (see `js/main.js` and `js/api.js`). Keep this when adding new modules.
- Single-responsibility files: `api.js` is the API adapter (async fetch + shape mapping). New endpoints or data mapping should go here.
- Data shape (from `js/api.js`): after fetch the code returns an object like
  - name: string
  - salt: number
  - image: string | null (derived from `image_url`)
- Use async/await + try/catch for fetch operations (follow existing style in `js/api.js`). Log errors to console consistently.
- Keep DOM/UI code out of `api.js`. Put UI updates and event wiring into `js/game.js`.

## Debugging & developer workflow notes

- There is no build step. To run locally use a static file server (or open `index.html` in a browser but note fetch may fail with file:// due to CORS). Examples for PowerShell:
  - If Python is available: `python -m http.server 8000`
  - If Node/npm is available: `npx http-server -p 8000`
  Then open `http://localhost:8000`.
- Use browser DevTools (Console + Network) to inspect the fetch to `json.edhrec.com` and the shape of returned JSON.
- `js/api.js` already logs the mapped card object; replicate that pattern for quick validation when adding endpoints.

## Integration points & external dependencies

- External API: EDHREC JSON endpoints (example: `https://json.edhrec.com/cards/sol-ring`). Mind rate limits and availability.
- No package manager files in repo; if adding dependencies, document them and add a `package.json`.

## Where to make common changes (explicit examples)

- Add UI and game loops: edit `js/game.js`. The file is present but empty — this is where DOM elements, event handlers, and game state should live.
- To fetch a different card name, update `js/api.js` (there is a TODO to accept a card name parameter in `fetchCard`). Example change: add a parameter `fetchCard(cardName)` and build the URL `https://json.edhrec.com/cards/${encodeURIComponent(cardName)}`.
- To render card images, use the `image` field from the mapped card object (may be null). Store image-fallback behavior in `js/game.js`.

## Constraints and cautions for an AI agent

- Do not assume a backend exists — all changes should preserve client-only operation unless you add a server and update README.
- Avoid adding build/tooling without updating repo root (e.g., add `package.json` if you require npm). Document any non-trivial setup.
- When modifying network code, preserve existing error logging style and the mapped card shape so downstream UI code continues to work.

## Short checklist for PRs an AI agent should follow

1. Keep changes modular: API changes in `js/api.js`, UI in `js/game.js`, bootstrap in `js/main.js`.
2. If adding new files, use ES module exports/imports.
3. Run the app via a static server and verify fetches in the Network tab (CORS issues are common when opening file://).
4. Update this file if you change project structure, add a build step, or introduce dependencies.

---
If any section is unclear or you want more examples (e.g., a starter `js/game.js` implementation or local-run scripts), tell me which part to expand and I'll iterate.
