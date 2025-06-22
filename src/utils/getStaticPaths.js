// src/utils/getStaticPaths.js
// Utility to generate static paths for projects and blogs using the content index JSON files
import fs from 'fs';
import path from 'path';
import { routeParamMap } from './routeParamMap.js';

const projectGlob = path.join(process.cwd(), 'src/data/content-index/project-*.json');
const blogGlob = path.join(process.cwd(), 'src/data/content-index/blog-*.json');

function getAllJsonFiles(globPattern) {
  // Node.js only: use fs.readdirSync for simplicity
  const dir = path.dirname(globPattern);
  const prefix = path.basename(globPattern).split('*')[0];
  return fs.readdirSync(dir)
    .filter(f => f.startsWith(prefix) && f.endsWith('.json'))
    .map(f => path.join(dir, f));
}

export function getProjectStaticPaths() {
  const files = getAllJsonFiles(projectGlob);
  const paths = [];
  const paramName = routeParamMap['projects'];
  for (const file of files) {
    const project = JSON.parse(fs.readFileSync(file, 'utf-8'));
    const sectionCount = project.sections?.length || 1;
    for (let i = 0; i < sectionCount; i++) {
      paths.push({
        params: { [paramName]: `${project.slug}/${i + 1}` },
        props: { project, sectionIndex: i },
      });
    }
  }
  return paths;
}

export function getBlogStaticPaths() {
  const files = getAllJsonFiles(blogGlob);
  const paths = [];
  const paramName = routeParamMap['blog'];
  for (const file of files) {
    const post = JSON.parse(fs.readFileSync(file, 'utf-8'));
    const sectionCount = post.sections?.length || 1;
    for (let i = 0; i < sectionCount; i++) {
      paths.push({
        params: { [paramName]: `${post.slug}/${i + 1}` },
        props: { post, sectionIndex: i },
      });
    }
  }
  return paths;
}
