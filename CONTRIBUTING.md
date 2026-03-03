# Contributing

Thanks for helping improve **swarm-architect-orchestrator-skill**.

## Development flow

1. Fork the repository
2. Create a branch: `feat/<short-name>` or `fix/<short-name>`
3. Make focused changes
4. Open a pull request with:
   - clear problem statement
   - implementation summary
   - validation evidence (examples/logs/screenshots if relevant)

## Skill change guidelines

When updating `skills/*/SKILL.md`:

- Keep discovery requirements explicit
- Preserve Phase → Wave → Swarm hierarchy requirements
- Keep task schema deterministic (`id`, dependencies, acceptance, validation)
- Include explicit agent orchestration fields (`agent_class`, `execution_mode`, `workflow_hook`)
- Include GitHub synchronization requirements (issues, dependencies, milestones)

## Workflow changes

When updating `.github/workflows/*.yml`:

- Ensure `workflow_dispatch` input names stay backward compatible
- Keep run trace comments posted to task issues
- Prefer idempotent behavior and safe retries
- Document any new required permissions in PR description

## Local validation checklist

- Verify Markdown rendering in README and skill files
- Validate workflow YAML syntax
- Confirm dispatch can resolve task IDs and post run links
- Confirm event sync and milestone digest workflows still run

## Commit style

Use clear, scoped commit messages:
- `feat(skills): ...`
- `fix(actions): ...`
- `docs(readme): ...`

Please include this co-author line in commits generated with Craft Agent:

`Co-Authored-By: Craft Agent <agents-noreply@craft.do>`
