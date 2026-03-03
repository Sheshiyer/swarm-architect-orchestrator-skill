# NPX Install Layer

This repo provides a thin NPX wrapper on top of the skills.sh ecosystem.

## One-liner

```bash
npx @sheshiyer/swarm-architect-skill
```

Equivalent underlying command:

```bash
npx skills add Sheshiyer/swarm-architect-orchestrator-skill
```

## Options

- Override source repo:

```bash
npx @sheshiyer/swarm-architect-skill --repo Sheshiyer/swarm-architect-orchestrator-skill
```

- Pass through extra args to `skills add`:

```bash
npx @sheshiyer/swarm-architect-skill -- --help
```
