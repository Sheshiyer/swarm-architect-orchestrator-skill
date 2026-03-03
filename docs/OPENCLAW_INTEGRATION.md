# OpenClaw Integration — Swarm Architect Wrapper

This repository supports an **idea-first OpenClaw wrapper flow** so users can say:

> "Use swarm architect for this idea"

…and trigger interactive planning + GitHub orchestration without manual CLI steps.

## What the wrapper does (MVP)

1. Receives OpenClaw intake payload (idea + constraints)
2. Normalizes input against `swarm-intake.schema.json`
3. Starts orchestration via `openclaw-swarm-intake.yml`
4. Dispatches initial Taskmaster tasks through `taskmaster-dispatch.yml`
5. Posts execution trace to GitHub issues

## Trigger options

- `workflow_dispatch` (manual / UI / API)
- `repository_dispatch` with event type `openclaw.swarm.intake`

## Required payload

See: [`integrations/openclaw/swarm-intake.schema.json`](../integrations/openclaw/swarm-intake.schema.json)

## Example payload

```json
{
  "idea": "Build an AI-first issue orchestration loop",
  "planning_depth": "deeply_detailed",
  "delivery_mode": "prototype",
  "release_model": "single_milestone",
  "quality_bar": "medium",
  "team_topology": "solo",
  "timeline": "2-3 days",
  "initial_tasks": ["T001", "T003", "T006"]
}
```

## OpenClaw UX contract

The wrapper is designed to support a conversational OpenClaw experience:

1. User provides idea
2. OpenClaw asks discovery questions (if missing)
3. OpenClaw confirms generated swarm plan
4. OpenClaw triggers dispatch and streams run updates
5. OpenClaw summarizes milestone progress and blockers

## Notes

- This is a wrapper/bridge layer for fast integration.
- It does not require replacing existing taskmaster workflows.
- Extend with OpenClaw runtime endpoints later if you need direct in-app execution APIs.
