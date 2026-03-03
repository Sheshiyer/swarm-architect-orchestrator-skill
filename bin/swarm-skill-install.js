#!/usr/bin/env node
import { spawnSync } from 'node:child_process';

const defaultRepo = 'Sheshiyer/swarm-architect-orchestrator-skill';
const args = process.argv.slice(2);

let repo = process.env.SWARM_SKILL_REPO || defaultRepo;
const passthrough = [];

for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === '--repo' && args[i + 1]) {
    repo = args[i + 1];
    i++;
    continue;
  }
  passthrough.push(a);
}

console.log(`🦾 Installing skill pack via skills.sh from: ${repo}`);
const cmd = ['-y', 'skills', 'add', repo, ...passthrough];
const result = spawnSync('npx', cmd, {
  stdio: 'inherit',
  shell: process.platform === 'win32'
});

if (result.status !== 0) {
  console.error('\n❌ skills installation failed.');
  console.error('Fallback command:');
  console.error(`   npx skills add ${repo}`);
  process.exit(result.status ?? 1);
}

console.log('\n✅ Swarm Architect skill pack installed.');
console.log('Try in OpenClaw: "Use swarm architect for this idea"');
