# Reduce Architecture

This document explains how **Reduce Engine** is structured: modules, data flow, schema, error handling, and extensibility. It’s designed for contributors and integrators to understand the internals quickly and make safe, modular changes.

---

## 🧱 Core modules

- **reduce.js**  
  - Orchestrates the end‑to‑end pipeline: input → classification → risk flags → report assembly → output.
  - Handles configuration, mode selection (Web/CLI), and premium/free field separation.

- **classify.js**  
  - Pure functions that classify identities (human, agentic AI, synthetic, unknown).
  - Returns normalized signals and risk flags; no I/O side effects.

- **utils/**  
  - Common helpers: validation, logging, time, file I/O (CLI), fetch (Web).
  - Keep utilities stateless and testable.

- **run-cli.js**  
  - Thin CLI wrapper: parses args, loads input JSON, invokes `reduce.js`, writes `report.json`.

- **scanEngine.js** (optional integration)  
  - Shared detection primitives used by Reduce and SCAN when present.
  - Do not couple Reduce to SCAN—import only stable, documented functions.

---

## 🔄 Data flow

1. **Input acquisition**  
   - Web: JSON from form/file upload or demo sample.  
   - CLI: `--input accounts.json` loaded from disk.

2. **Validation**  
   - Validate shape and required fields; reject malformed records with explicit errors.

3. **Classification**  
   - `classify.js` computes `classification` and `riskFlags` using deterministic rules.

4. **Report assembly**  
   - Map results to `reportSchema.json` fields.  
   - Separate **free** vs **premium** fields at assembly time.

5. **Output**  
   - Web: render JSON and badges in UI.  
   - CLI: write `--output report.json` to disk.

---

## 📊 Schema contract

- **Schema source:** `schema/reportSchema.json`  
- **Sample:** `schema/reportSample.json`

### Required fields (free tier)
- `accountId` (string)  
- `classification` (enum: `human`, `agentic_ai`, `synthetic`, `unknown`)  
- `riskFlags` (array of strings)  
- `timestamp` (ISO 8601)

### Optional fields (premium tier)
- `severity` (enum: `low`, `medium`, `high`)  
- `signals` (object: normalized detection signals)  
- `remediation` (array of actionable steps)  
- `meta` (object: source, runId, engineVersion)

Rules:
- Never emit premium fields in free mode.  
- Always conform to `reportSchema.json`; validation must fail fast with clear messages.

---

## ⚙️ Configuration

- **Modes:** `FREE` (default), `PREMIUM`  
- **Sources:**  
  - Web: `window.__reduceConfig` or embedded defaults  
  - CLI: `--mode`, `--input`, `--output`, `--strict`

Example CLI:
```bash
npm run reduce -- --mode FREE --input accounts.json --output report.json --strict
Strict mode:
- Fails on unknown fields, empty arrays, or non‑conforming records.
- Logs a summary and exits with non‑zero code on validation errors.
🧪 Testing strategy
- Unit tests: pure functions in classify.js and utils/
- Schema tests: validate reportSample.json against reportSchema.json
- Integration tests: end‑to‑end run via run-cli.js with fixture inputs
- Golden files: lock known outputs to detect regressions
Naming:
- tests/unit/*.test.js
- tests/integration/*.test.js
- tests/fixtures/*.json
🛡️ Error handling & logging
- Principles: explicit, contextual, non‑silent.
- Levels: INFO, WARN, ERROR
- Patterns:
- Wrap I/O with try/catch; include file path and operation.
- Validation errors list offending fields and record index.
- Classification errors fall back to unknown with a logged reason.
CLI exit codes:
- 0 success
- 1 validation failure
- 2 I/O or configuration erro
🌐 Web vs CLI runtime
- Web (GitHub Pages):
- No filesystem; use File API and render JSON to UI.
- Debounce heavy operations; avoid blocking the main thread.
- CLI (Node.js):
- Stream large inputs; avoid loading entire files into memory.
- Respect --strict and exit codes for CI integration.
🔌 Extensibility
- New detectors: add pure functions in classify.js; export via a stable interface.
- Signals: extend signals object—document keys and ranges.
- Premium features: gate behind mode === 'PREMIUM'; never leak into free outputs.
- Plugins (optional): define a registerDetector(fn) that accepts (record) => { flags, signals }.
Versioning:
- Bump minor for new fields (backward compatible).
- Bump major for breaking schema changes.
🚀 Performance & scale
- Prefer streaming and chunked processing in CLI.
- Cache repeated lookups (e.g., domain risk lists) in memory per run.
- Avoid deep cloning large objects; use immutable patterns where feasible.
- Measure with simple timers and log total processed records and duration.
🔒 Security & privacy
- Do not log PII—log counts and IDs only when necessary.
- Sanitize inputs; reject unexpected types and oversized payloads.
- In Web mode, never persist data; keep processing in memory.
- In CLI, write outputs only to the specified path; avoid temp leaks.
📦 File layout (reference
reduce/
├── assets/                  # Logos, banners, favicons
├── docs/
│   ├── architecture.md      # This document
│   └── contributing.md      # Onboarding guide
├── schema/
│   ├── reportSchema.json    # Contract
│   └── reportSample.json    # Example output
├── src/
│   ├── reduce.js            # Orchestrator
│   ├── classify.js          # Detectors & classification
│   └── utils/               # Helpers (validation, logging, I/O)
├── tests/                   # Unit & integration tests
├── run-cli.js               # CLI entry
└── README.md                # Project overview
✅ Implementation checklist
- [ ] Inputs validated against reportSchema.json
- [ ] Free vs premium fields correctly gated
- [ ] Errors logged with context; CLI exit codes respected
- [ ] Unit and integration tests passing
- [ ] Sample updated when schema changes
- [ ] README and docs kept in sync with behavior


