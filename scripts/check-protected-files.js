#!/usr/bin/env node
// Pre-commit/protected file check script
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// Replicate __dirname behavior in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const protectedList = fs.readFileSync(path.join(__dirname, '../PROTECTED_FILES.txt'), 'utf-8')
  .split('\n')
  .map(l => l.trim())
  .filter(l => l && !l.startsWith('#'));

// Get staged files
const staged = execSync('git diff --cached --name-only', { encoding: 'utf-8' })
  .split('\n')
  .map(f => f.trim())
  .filter(Boolean);

const violated = staged.filter(f => protectedList.includes(f));
if (violated.length > 0) {
  console.error('\n\x1b[31mERROR: The following protected files are staged for commit:\x1b[0m');
  violated.forEach(f => console.error('  - ' + f));
  console.error('\nPlease do not edit these files directly. See PROTECTED_FILES.txt for details.');
  process.exit(1);
}
// If no violations, explicitly exit with 0, though it's the default.
// console.log('\n\x1b[32m✓ No protected files violated in this commit.\x1b[0m');
process.exit(0);
