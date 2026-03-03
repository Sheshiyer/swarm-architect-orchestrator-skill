---
name: "swarm-architect"
description: "Upgraded planning protocol for large-scale delivery plans: interactive discovery, 80-task default granularity, phase→wave→swarm orchestration, and execution-ready GitHub + agent automation."
---

# Swarm Architect

Use this skill to design and run execution-ready engineering plans from specs, architecture docs, and repo context.

This is not a checklist generator. It is a full orchestration protocol.

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

### Execution extension (required for orchestration)
Also include:
- `agent_class` (`planner` | `implementer` | `reviewer` | `qa` | `ops`)
- `execution_mode` (`manual` | `dispatch` | `event-driven`)
- `workflow_hook` (e.g., `taskmaster-dispatch`, `taskmaster-event-sync`, `taskmaster-milestone-digest`)

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

## 6) GitHub Synchronization Contract (Issues + Milestones + Dependencies)

When planning completes (or waves advance):
- Create/update GitHub issues mapped to phase/wave/swarm and task IDs
- Preserve task dependencies in issue relationships/comments/checklists
- Create/assign milestone(s) and keep progress synchronized
- Update issue states as execution progresses

Minimum issue metadata:
- `Task-ID` token in title/body
- area/type/priority labels
- dependency list using issue links
- acceptance + validation fields
- milestone assignment

---

## 7) Agent Orchestration Contract (Required)

Every wave must define agent leverage explicitly:
- Planner Agent: decomposes and refines tasks
- Implementer Agent: executes task-specific changes
- Reviewer Agent: checks design/code quality and correctness
- QA Agent: validates acceptance criteria and test evidence
- Ops Agent: monitors workflow health, retries, and release readiness

### Dispatch policy
- Use `workflow_dispatch` for task starts (`taskmaster-dispatch`)
- Pass `task_id`, `mode`, and `notes`
- Post run URL + status back to the task issue

### Completion policy
A task may be marked complete only when:
- Dispatch run is successful
- Acceptance evidence is attached
- Validation evidence is attached
- Dependencies are resolved or explicitly waived with justification

---

## 8) GitHub Actions Contract (Required for MVP)

Swarm Architect plans must define and/or leverage:
1. **`taskmaster-dispatch.yml`**
   - Input: `task_id`, `mode`, `notes`
   - Behavior: resolve task issue, post start comment, attach run URL
2. **`taskmaster-event-sync.yml`**
   - Trigger: issue/pr events
   - Behavior: sync issue state, labels, and trace comments
3. **`taskmaster-milestone-digest.yml`**
   - Trigger: schedule or manual
   - Behavior: compute milestone open/closed/progress and report

If any are missing, create stubs before execution and mark that as blocking infra work.

---

## 9) Planning Artifacts

Maintain these artifacts throughout planning/execution:
- `tasks/todo.md` → checklist grouped by Phase → Wave → Swarm
- `tasks/lessons.md` → correction-derived guardrails to prevent repeat mistakes
- `artefacts/swarm-runs.md` (recommended) → run IDs, run URLs, outcomes

Execution tracking protocol:
1. Write plan checklist first
2. Confirm/align with user
3. Mark items complete progressively
4. Summarize milestone progress
5. Add wave-level review notes
6. Persist lessons from feedback

---

## 10) Output Contract

When presenting a Swarm Architect plan, include in order:
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

## 12) Upgrade Controls (Strict Defaults)

Apply these defaults unless the user explicitly overrides them:
- Target task count: **80** (hard default)
- Phase 1 wave count: **minimum 3 waves**
- Swarms per wave: **minimum 2 swarms**
- Swarm scope rule: one primary concern per swarm (API, UI, Data, Infra, QA)
- Verification quota: each wave must include dedicated validation tasks
- CI/CD inclusion: include at least baseline pipeline tasks when delivery is production or hardening
- Agent leverage: each wave must include at least one dispatch-capable swarm

If constraints require deviations, document "why" in assumptions.

---

## 13) Definition of Done

A Swarm Architect plan is done only when:
- discovery is complete,
- structure includes phases/waves/swarms,
- tasks are 70–80+ and schema-complete,
- dependencies are coherent,
- milestones are defined and linked,
- GitHub Actions orchestration is defined,
- agent roles are mapped,
- and verification strategy is explicit.
