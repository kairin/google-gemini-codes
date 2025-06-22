// src/scripts/generate-trees.js
// Generates a JSON file representing the directory tree and file relationships for key folders
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const dirs = ['src', 'scripts', 'public', 'data', 'dist'];
const output = {};

for (const dir of dirs) {
  try {
    // Use tree with -J for JSON output if available, else fallback to text
    let treeJson = null;
    try {
      const result = execSync(`tree -J -a -I 'node_modules|.git|.DS_Store' ${dir}`, { encoding: 'utf-8' });
      treeJson = JSON.parse(result);
    } catch {
      // Fallback: use text output
      treeJson = execSync(`tree -a -I 'node_modules|.git|.DS_Store' ${dir}`, { encoding: 'utf-8' });
    }
    output[dir] = treeJson;
  } catch (err) {
    output[dir] = { error: err.message };
  }
}

// Optionally, build a simple file relationship map (e.g., imports, links) for src/
// For now, just output the tree structure
const outPath = path.join('src', 'data', 'site-tree.json');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
console.log('Site tree written to', outPath);
