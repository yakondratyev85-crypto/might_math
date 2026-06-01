#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
const result = spawnSync('/root/.nvm/versions/node/v24.15.0/bin/tsc', process.argv.slice(2), { stdio: 'inherit' });
process.exit(result.status ?? 1);
