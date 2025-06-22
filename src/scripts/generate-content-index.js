// src/scripts/generate-content-index.js
import { getAllMarkdownFiles, readMarkdownFile, getFileStats, writeJSONFile, resolvePath } from '../utils/content-utils.js';
import path from 'path';
import fs from 'fs/promises';

const allFiles = await getAllMarkdownFiles();
console.log('Discovered markdown files:', allFiles);
const outputDir = resolvePath('data/content-index'); // Write to src/data/content-index
console.log('Output directory:', outputDir);
await fs.mkdir(outputDir, { recursive: true });

for (const file of allFiles) {
  const { data, content } = await readMarkdownFile(file); // content is the markdown body
  const stats = await getFileStats(file);
  const type = file.includes('/projects/') ? 'project' : 'blog';
  const slug = path.basename(file, '.md');
  const json = {
    type,
    slug,
    ...data,
    ...stats,
    filePath: file,
    body: content // include full markdown body
  };
  const outPath = path.join(outputDir, `${type}-${slug}.json`);
  console.log('Writing JSON to:', outPath);
  try {
    await writeJSONFile(outPath, json);
    console.log('Successfully wrote:', outPath);
  } catch (err) {
    console.error('Error writing file:', outPath, err);
  }
}

console.log('Per-content JSON files generated in src/data/content-index/');
