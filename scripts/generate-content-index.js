// scripts/generate-content-index.js
import { getAllMarkdownFiles, readMarkdownFile, getFileStats, writeJSONFile, resolvePath } from '../src/utils/content-utils.js';
import path from 'path';

// Ensure output directory exists
import fs from 'fs/promises';

const allFiles = await getAllMarkdownFiles();
const outputDir = resolvePath('data/content-index');
await fs.mkdir(outputDir, { recursive: true });

for (const file of allFiles) {
  const { data } = await readMarkdownFile(file);
  const stats = await getFileStats(file);
  const type = file.includes('/projects/') ? 'project' : 'blog';
  const slug = path.basename(file, '.md');
  const json = {
    type,
    slug,
    ...data,
    ...stats,
    filePath: file
  };
  const outPath = path.join(outputDir, `${type}-${slug}.json`);
  await writeJSONFile(outPath, json);
}

console.log('Per-content JSON files generated in src/data/content-index/');
