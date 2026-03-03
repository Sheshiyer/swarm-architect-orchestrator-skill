# OpenClaw Swarm Wrapper Playbook

## Intent
Convert idea-first requests in OpenClaw into structured swarm execution using this repository's skills and workflows.

## Flow

1. **Intake**
   - Capture `idea`
   - Ask missing discovery parameters
   - Validate against `swarm-intake.schema.json`

2. **Plan**
   - Invoke `swarm-architect` with discovery context
   - Produce phase/wave/swarm task map
   - Sync issues + milestones

3. **Orchestrate**
   - Trigger `openclaw-swarm-intake.yml`
   - Dispatch initial tasks via `taskmaster-dispatch.yml`
   - Enable event updates through `taskmaster-event-sync.yml`

4. **Observe + Adapt**
   - Track run URLs and issue comments
   - Publish digest with `taskmaster-milestone-digest.yml`
   - Re-plan on failures or dependency bottlenecks

## Recommended command phrase in OpenClaw

- "Use swarm architect for this idea"
- "Plan and dispatch taskmaster flow"
- "Run OpenClaw swarm intake for this initiative"

## Routing conventions

- Task IDs: `T001` format
- Issue title token: `[MVP-ORCH][Txxx]`
- Required labels: `type:*`, `area:*`, `priority:*`, `agent:*`, `exec:*`

## Evidence contract

A task is considered execution-started only when:
- dispatch run succeeded,
- issue comment includes run URL,
- task mode (`analyze` / `implement` / `verify`) is explicit.
