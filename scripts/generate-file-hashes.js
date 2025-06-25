// scripts/generate-file-hashes.js
import fs from 'fs/promises';
import crypto from 'crypto';
import path from 'path';

const CWD = process.cwd();
const MANIFEST_FILE_PATH = path.join(CWD, 'file-integrity-manifest.json');

// Key files list (confirmed in plan step 1)
const KEY_FILES = [
    // Core Configuration & Setup:
    'astro.config.mjs',
    'package.json',
    'tsconfig.json',
    'src/SITE_DEPLOYMENT_INFO.ts',
    'src/content/config.ts',
    // Core Layout & Structure:
    'src/layouts/Layout.astro',
    'src/components/SiteHead.astro',
    // Critical Reusable Components:
    'src/components/BaseLink.astro',
    // Core Page Templates/Entry Points:
    'src/pages/index.astro',
    'src/pages/blog/[...blogslug].astro',
    'src/pages/projects/[...slug].astro',
    // Key Scripts (Automation & Build):
    'src/scripts/generate-content-index.js',
    'src/scripts/check-content-index.js',
    'src/scripts/generate-trees.js',
    'src/scripts/generate-file-relationships.js',
    'scripts/check-protected-files.js', // Root level script
    'scripts/check-layout-integrity.js', // Root level script (added during AGENTS.MD creation for scripts/)
    // Global Styles:
    'src/styles/global.css',
    // Important Utilities:
    'src/utils/getStaticPaths.js',
    'src/utils/content-utils.js'
];

async function generateFileHash(filePath) {
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const hash = crypto.createHash('sha256').update(fileContent).digest('hex');
        return hash;
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error(`🔴 Error: Key file not found: ${filePath}. Please ensure it exists.`);
        } else {
            console.error(`🔴 Error reading or hashing file ${filePath}: ${error.message}`);
        }
        return null; // Return null if hashing fails or file not found
    }
}

async function main() {
    console.log('Starting generation of file integrity manifest...');
    const manifest = {};
    let allFilesProcessedSuccessfully = true;

    for (const relativeFilePath of KEY_FILES) {
        const absoluteFilePath = path.join(CWD, relativeFilePath);
        console.log(`Processing: ${relativeFilePath}`);
        const hash = await generateFileHash(absoluteFilePath);
        if (hash) {
            manifest[relativeFilePath] = hash;
        } else {
            allFilesProcessedSuccessfully = false;
        }
    }

    if (!allFilesProcessedSuccessfully) {
        console.error('\n🔴 Errors occurred while processing some key files. Manifest will not be written.');
        process.exit(1);
    }

    if (Object.keys(manifest).length === 0 && KEY_FILES.length > 0) {
        console.error('\n🔴 No hashes were generated. This likely means none of the key files were found or could be read.');
        process.exit(1);
    }

    try {
        await fs.writeFile(MANIFEST_FILE_PATH, JSON.stringify(manifest, null, 2));
        console.log(`\n🟢 Successfully wrote file integrity manifest to: ${MANIFEST_FILE_PATH}`);
        console.log(`Processed ${Object.keys(manifest).length} files.`);
    } catch (error) {
        console.error(`\n🔴 Error writing manifest file ${MANIFEST_FILE_PATH}: ${error.message}`);
        process.exit(1);
    }
}

main().catch(err => {
    console.error(`🔴 Unhandled error in script: ${err.message}`);
    process.exit(1);
});
