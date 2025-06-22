// src/utils/content-utils.js
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { globSync } from 'glob';
import { fileURLToPath } from 'url';

export async function getAllMarkdownFiles() {
  const projectFiles = globSync('src/content/projects/*.md');
  const blogFiles = globSync('src/content/blog/*.md');
  return [...projectFiles, ...blogFiles];
}

export async function readMarkdownFile(file) {
  const raw = await fs.readFile(file, 'utf8');
  const { data, content } = matter(raw);
  return { data, content };
}

export async function getFileStats(file) {
  const stats = await fs.stat(file);
  return {
    fileCreated: stats.birthtime.toISOString(),
    fileModified: stats.mtime.toISOString(),
  };
}

export async function writeJSONFile(outPath, json) {
  await fs.writeFile(outPath, JSON.stringify(json, null, 2));
}

export function resolvePath(...segments) {
  // ESM __dirname workaround
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.join(__dirname, '..', ...segments);
}
