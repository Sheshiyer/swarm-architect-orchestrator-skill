---
name: task-master-planner
description: Interactive Taskmaster planning protocol that produces 70–80+ granular tasks, organized into phases/waves/swarms, with verification gates and execution-ready GitHub + agent orchestration.
---

# Task Master Planner

Use this skill to design and execute delivery-ready engineering plans from specs, architecture docs, and repo context.

This is not a lightweight checklist generator. It is a full orchestration workflow.

---

## 1) Session Start: Interactive Discovery (Mandatory)

Before generating tasks, run a short discovery dialogue to lock planning depth and delivery constraints.

Capture at minimum:
- Planning depth: **lean / standard / deeply detailed**
- Delivery mode: prototype, production, or hardening
- CI/CD expectations: none / basic / production-grade
- Release model: single milestone or phased rollout
- Quality bar: testing depth, observability, performance, security requirements
- Team topology: solo / small squad / multi-squad
- External constraints: deadline, compliance, platform constraints

Do not skip discovery unless all values are explicitly provided in the request.

---

## 2) Inputs to Load

Load all available planning context, prioritizing:
- `DesignSpec.md`
- `ProjectArchitecture.md`
- `.context/architecture/overview.md`
- `.context/architecture/patterns.md`
- `.context/auth/overview.md`
- `.context/testing.md`
- `.context/workflows.md`
- `.context/errors.md`
- `.context/api/headers.md`
- `.context/feature-flags.md`
- `.context/performance.md`
- `.context/monitoring.md`
- `.context/ui/patterns.md`

If user asks to process all context docs, enumerate and include all `.context/**` files relevant to requirements and constraints.

---

## 3) Plan Size and Structure Rules

### Minimum granularity
- Minimum total tasks: **70**
- Default target: **80 tasks**
- Expand beyond 80 for large scope; never compress by hiding complexity

### Required hierarchy
- Top-level: **Phases**
- **Phase 1 must be split into multiple Waves**
- Each Wave must include **multiple Swarms** (parallel work clusters)
- Swarms should be dependency-aware and independently executable where possible

### Dependency discipline
- Define explicit dependencies across tasks
- Preserve execution order where needed (schema → API → UI, auth → protected routes, etc.)
- Maximize parallelism only when dependencies permit

---

## 4) Required Task Schema (Per Task)

Each task must include:
- `id` (stable string)
- `title` (short, action-oriented)
- `area` (`frontend` | `backend` | `data` | `infra` | `qa` | `product`)
- `owner_role` (e.g., Frontend Eng, Backend Eng, DevOps, QA)
- `est_hours` (numeric)
- `dependencies` (array of task IDs)
- `deliverable` (one sentence)
- `acceptance` (testable one sentence)
- `validation` (how completion is proven: tests/logs/metrics/checks)

### Execution extension (required)
Also include:
- `agent_class` (`planner` | `implementer` | `reviewer` | `qa` | `ops`)
- `execution_mode` (`manual` | `dispatch` | `event-driven`)
- `workflow_hook` (`taskmaster-dispatch` | `taskmaster-event-sync` | `taskmaster-milestone-digest`)

Recommended effort range: **4–16 hours** for most tasks.

---

## 5) Orchestration Policy (Enforced)

### A. Plan-node default
- Any non-trivial work (3+ steps or architecture decisions) starts in planning mode
- If execution drifts or fails, stop and re-plan
- Include verification work in plan scope, not just build work

### B. Parallel/swarm strategy
- Use independent swarms for independent tracks
- One tactical focus per swarm (avoid mixed-goal swarms)
- Keep cross-swarm dependency contracts explicit

### C. Verification before done
- Never mark done without evidence
- Require concrete proof: tests, logs, status checks, metrics, or diff validation

### D. Elegance gate (balanced)
- For non-trivial changes, challenge the design for cleaner alternatives
- Replace brittle hacks with robust solutions when justified
- Avoid over-engineering simple fixes

### E. Autonomous bug-fix behavior
- For bug reports: diagnose from failing evidence, fix root cause, verify, then close

---

## 6) GitHub Synchronization + Milestones (Required)

When task planning completes (or waves advance):
- Create/update GitHub issues mapped to phase/wave/swarm and task IDs
- Preserve dependencies in issue links/comments/checklists
- Create or update milestones automatically
- Keep milestone progress in sync with issue state changes

Minimum issue structure:
- title token `[Task-ID]`
- labels (type/priority/area)
- milestone assignment
- dependency section
- acceptance + validation section

---

## 7) Agent Execution Model (Required)

Task Master Planner must go beyond issue creation:

- Assign each task an `agent_class`
- Route execution via `taskmaster-dispatch` workflow
- Use event automations for lifecycle state updates
- Require run evidence per task (workflow URL + outcome)

### Recommended flow
1. Plan and sync tasks to GitHub
2. Dispatch agent runs per task/swarm
3. Event-sync status and comments
4. Publish milestone digest
5. Re-plan based on blockers

---

## 8) GitHub Actions Integration (Required)

Planner output must define how to leverage:
- **`taskmaster-dispatch.yml`** for task-level starts
- **`taskmaster-event-sync.yml`** for issue/pr event reactions
- **`taskmaster-milestone-digest.yml`** for progress reporting

If workflows are missing, generate them as execution prerequisites.

---

## 9) Planning Artifacts

Maintain these artifacts throughout planning/execution:
- `tasks/todo.md` → checklist grouped by Phase → Wave → Swarm
- `tasks/lessons.md` → user-correction-derived guardrails
- `artefacts/taskmaster-runs.md` (recommended) → task ↔ run URL ↔ status

Execution tracking protocol:
1. Write plan checklist first
2. Confirm/align with user
3. Mark items complete progressively
4. Summarize milestone progress
5. Add wave-level review notes
6. Persist lessons from feedback

---

## 10) Output Contract

When presenting a Taskmaster plan, include in order:
1. Discovery summary
2. Assumptions and constraints
3. Phase map
4. Detailed Phase 1 Wave/Swarm layout
5. Full task list (70–80+)
6. Dependency rationale
7. Verification strategy
8. GitHub sync + milestone strategy
9. Agent + Actions orchestration strategy
10. Risks and fallback plan

---

## 11) Mini Cookbook References

Use these quick recipes when available in the active runtime:
- `dispatching-parallel-agents` for swarm-level parallelization
- `using-superpowers` for skill-selection discipline before action
- GitHub issue/PR workflow recipes for synchronization and status transitions

---

## 12) Definition of Done

A Taskmaster plan is done only when:
- discovery is complete,
- structure includes phases/waves/swarms,
- tasks are 70–80+ and schema-complete,
- dependencies are coherent,
- milestones are mapped,
- GitHub Actions hooks are defined,
- agent assignment is explicit,
- and verification strategy is explicit.
