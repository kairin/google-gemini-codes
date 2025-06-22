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

  // --- Robust Section extraction logic ---
  // Split content by PAGEBREAK, trim, and extract first heading as section title
  const rawSections = content.split(/<!--\s*PAGEBREAK\s*-->/ig).map(s => s.trim());
  let offset = 0;
  const sections = rawSections.map((section, idx) => {
    // Find first non-empty heading (e.g., #, ##, ###)
    const match = section.match(/^(#+)\s+(.+)$/m);
    const title = match ? match[2].trim() : `Section ${idx + 1}`;
    // Calculate start offset for navigation (character index in body)
    const anchor = `section-${idx + 1}`;
    const start = content.indexOf(section, offset);
    offset = start + section.length;
    return {
      title,
      index: idx,
      anchor,
      start
    };
  });

  // --- Automated pubDate logic ---
  let pubDate = data.pubDate;
  if (!pubDate) {
    pubDate = stats.fileCreated ? new Date(stats.fileCreated).toISOString() : new Date().toISOString();
  }

  const json = {
    type,
    slug,
    ...data,
    pubDate, // always present, ISO string
    ...stats,
    filePath: file,
    body: content, // include full markdown body
    sections // robust: array of section metadata with offsets
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
