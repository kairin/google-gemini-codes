// scripts/check-layout-integrity.js
import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';

const CWD = process.cwd();
const LAYOUT_PATH = path.join(CWD, 'src/layouts/Layout.astro');
const PAGES_DIR = path.join(CWD, 'src/pages');

let hasErrors = false;

async function checkLayoutFile() {
    console.log(`Checking layout file: ${LAYOUT_PATH}`);
    try {
        const layoutContent = await fs.readFile(LAYOUT_PATH, 'utf-8');
        // Refined checks to be less naive about comments
        // This regex looks for '<tagname' not immediately preceded by '<!--'
        const navRegex = /(?<!<!--\s*)<nav/;
        const slotRegex = /(?<!<!--\s*)<slot/; // Handles <slot /> and <slot>
        const footerRegex = /(?<!<!--\s*)<footer/;

        if (!navRegex.test(layoutContent)) {
            console.error(`🔴 Error: src/layouts/Layout.astro is missing a <nav> element (or it's commented out).`);
            hasErrors = true;
        }
        // For slot, Astro allows <slot /> or <slot></slot>. The regex `/<slot/` covers both starts.
        // The original check `!layoutContent.includes('<slot />') && !layoutContent.includes('<slot>')` was actually fine for slot.
        // Let's stick to a similar regex pattern for consistency, but the original check for slot was okay.
        if (!slotRegex.test(layoutContent)) {
            console.error(`🔴 Error: src/layouts/Layout.astro is missing a <slot /> or <slot> element (or it's commented out).`);
            hasErrors = true;
        }
        if (!footerRegex.test(layoutContent)) {
            console.error(`🔴 Error: src/layouts/Layout.astro is missing a <footer> element (or it's commented out).`);
            hasErrors = true;
        }
        if (!hasErrors) {
            console.log(`🟢 Layout file src/layouts/Layout.astro passed checks.`);
        }
    } catch (error) {
        console.error(`🔴 Error reading src/layouts/Layout.astro: ${error.message}`);
        hasErrors = true;
    }
}

async function checkPageFile(filePath) {
    console.log(`Checking page file: ${filePath}`);
    let pageHasErrors = false;
    try {
        const pageContent = await fs.readFile(filePath, 'utf-8');
        const relativeLayoutPath = path.relative(path.dirname(filePath), LAYOUT_PATH).replace(/\\/g, '/'); // Handle windows paths

        // Check for layout import: import Layout from '...@/layouts/Layout.astro'; or '../layouts/Layout.astro'; etc.
        // A more robust regex might be needed for complex aliasing or pathing, but this covers common cases.
        const importRegex = new RegExp(`import\\s+\\w+\\s+from\\s+['"]((@/layouts/Layout\\.astro)|(\\.\\./layouts/Layout\\.astro)|(\\.\\.\\/\\.\\./layouts/Layout\\.astro)|(${relativeLayoutPath}))['"]`);
        if (!importRegex.test(pageContent)) {
            console.error(`🔴 Error: ${filePath} does not seem to import Layout.astro.`);
            pageHasErrors = true;
            hasErrors = true;
        }

        // Check for layout usage: <Layout ...> or <Layout>
        if (!pageContent.includes('<Layout')) {
            console.error(`🔴 Error: ${filePath} does not seem to use the <Layout> component.`);
            pageHasErrors = true;
            hasErrors = true;
        }
        if (!pageHasErrors) {
            console.log(`🟢 Page file ${filePath} passed checks.`);
        }

    } catch (error) {
        console.error(`🔴 Error reading or processing ${filePath}: ${error.message}`);
        hasErrors = true;
    }
}

async function main() {
    console.log('Starting layout integrity check...');

    await checkLayoutFile();

    console.log('\nChecking page files...');
    const pageFiles = await glob('src/pages/**/*.astro', { cwd: CWD, absolute: true, ignore: ['src/pages/api/**/*.astro'] }); // Assuming api routes might not use Layout

    if (pageFiles.length === 0) {
        console.warn('🟡 Warning: No page files found in src/pages to check. This might be an issue with the glob pattern or directory structure.');
    }

    for (const file of pageFiles) {
        await checkPageFile(file);
    }

    if (hasErrors) {
        console.error('\n🔴 Layout integrity check failed with errors.');
        process.exit(1);
    } else {
        console.log('\n🟢 All layout integrity checks passed.');
    }
}

main().catch(err => {
    console.error(`🔴 Unhandled error in script: ${err.message}`);
    process.exit(1);
});
