// src/scripts/check-content-index.js
import fs from 'fs/promises';
import path from 'path';

const requiredFiles = [
  'project-astro-rebuild-guide.json',
  'blog-how-to-add-projects-online.json',
  'blog-first-post.json',
  // Add more expected files here as needed
];

const dir = path.resolve('src/data/content-index');
let allExist = true;

for (const file of requiredFiles) {
  const filePath = path.join(dir, file);
  try {
    await fs.access(filePath);
    const content = await fs.readFile(filePath, 'utf8');
    JSON.parse(content); // Throws if not valid JSON
    console.log(`✓ Found and valid: ${file}`);
  } catch (err) {
    allExist = false;
    console.error(`✗ Missing or invalid: ${file}`);
  }
}

if (!allExist) {
  console.error('ERROR: One or more required content index JSON files are missing or invalid.');
  process.exit(1);
} else {
  console.log('All required content index JSON files are present and valid.');
}
