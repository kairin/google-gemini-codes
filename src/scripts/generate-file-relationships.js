// Script to generate a JSON file mapping file relationships (imports, links, references)
// Scans .astro, .js, .jsx, .ts, .md files for import/require statements and internal links
import fs from 'fs';
import path from 'path';

const SRC_DIR = path.join(process.cwd(), 'src');
const OUT_FILE = path.join(SRC_DIR, 'data', 'file-relationships.json');
const exts = ['.astro', '.js', '.jsx', '.ts', '.md'];

function walk(dir) {
  let results = [];
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      results = results.concat(walk(full));
    } else if (exts.includes(path.extname(full))) {
      results.push(full);
    }
  });
  return results;
}

function extractLinksAndImports(filePath, content) {
  const imports = [];
  const links = [];
  // JS/TS/JSX/ASTRO imports
  const importRegex = /import\s+[^'"`]+['"`]([^'"`]+)['"`]/g;
  let match;
  while ((match = importRegex.exec(content))) {
    imports.push(match[1]);
  }
  // require()
  const requireRegex = /require\(['"`]([^'"`]+)['"`]\)/g;
  while ((match = requireRegex.exec(content))) {
    imports.push(match[1]);
  }
  // Markdown/ASTRO internal links: [text](./path) or [text](/path)
  const linkRegex = /\[[^\]]*\]\(([^)]+)\)/g;
  while ((match = linkRegex.exec(content))) {
    const href = match[1];
    if (href.startsWith('./') || href.startsWith('../') || href.startsWith('/')) {
      links.push(href);
    }
  }
  return { imports, links };
}

const files = walk(SRC_DIR);
const relationships = {};
for (const file of files) {
  const relPath = path.relative(SRC_DIR, file);
  const content = fs.readFileSync(file, 'utf-8');
  relationships[relPath] = extractLinksAndImports(file, content);
}

fs.writeFileSync(OUT_FILE, JSON.stringify(relationships, null, 2));
console.log('File relationships written to', OUT_FILE);
