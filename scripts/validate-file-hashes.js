// scripts/validate-file-hashes.js
import fs from 'fs/promises';
import crypto from 'crypto';
import path from 'path';

const CWD = process.cwd();
const MANIFEST_FILE_PATH = path.join(CWD, 'file-integrity-manifest.json');

async function getFileHash(filePath) {
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return crypto.createHash('sha256').update(fileContent).digest('hex');
    } catch (error) {
        if (error.code === 'ENOENT') {
            // File not found, will be handled by the main validation logic
            return null;
        }
        // Other read errors
        throw error;
    }
}

async function main() {
    console.log('Starting validation of file integrity...');
    let manifest;
    try {
        const manifestContent = await fs.readFile(MANIFEST_FILE_PATH, 'utf-8');
        manifest = JSON.parse(manifestContent);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error(`🔴 Error: Manifest file not found at ${MANIFEST_FILE_PATH}.`);
            console.error('Please generate it first using "node scripts/generate-file-hashes.js".');
        } else {
            console.error(`🔴 Error reading or parsing manifest file ${MANIFEST_FILE_PATH}: ${error.message}`);
        }
        process.exit(1);
        return;
    }

    const errors = [];
    const manifestFiles = Object.keys(manifest);

    if (manifestFiles.length === 0) {
        console.warn('🟡 Warning: The integrity manifest is empty. No files to validate.');
        // Potentially exit with success or error based on desired strictness for an empty manifest
        // For now, let's consider it a pass if no files are expected to be tracked.
        // If KEY_FILES in generate-script is non-empty, an empty manifest is an issue.
        console.log('Consider running generate-file-hashes.js if key files are defined.');
        process.exit(0);
        return;
    }

    for (const relativeFilePath of manifestFiles) {
        const expectedHash = manifest[relativeFilePath];
        const absoluteFilePath = path.join(CWD, relativeFilePath);

        console.log(`Validating: ${relativeFilePath}`);

        try {
            const currentHash = await getFileHash(absoluteFilePath);

            if (!currentHash) { // File does not exist
                errors.push(`🔴 MISSING: Key file ${relativeFilePath} is listed in manifest but not found in the project.`);
                continue;
            }

            if (currentHash !== expectedHash) {
                errors.push(`🔴 MISMATCH: Hash for ${relativeFilePath} does not match the manifest. Expected ${expectedHash.substring(0,12)}... but got ${currentHash.substring(0,12)}...`);
            }

        } catch (readError) {
            // This catches errors from getFileHash other than ENOENT (which returns null)
             errors.push(`🔴 ERROR READING FILE: Could not read file ${relativeFilePath}. Error: ${readError.message}`);
        }
    }

    if (errors.length > 0) {
        console.error('\n--- File Integrity Validation Failed ---');
        errors.forEach(err => console.error(err));
        console.error('--------------------------------------');
        process.exit(1);
    } else {
        console.log('\n🟢 All key files passed integrity validation.');
    }
}

main().catch(err => {
    console.error(`🔴 Unhandled error in validation script: ${err.message}`);
    process.exit(1);
});
