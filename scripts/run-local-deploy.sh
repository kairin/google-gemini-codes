#!/bin/bash
# Script to start the GitHub Actions runner, run a local build, and then trigger the deploy.yml workflow.

set -e

# 1. Start the self-hosted runner (assumes runner is in ../actions-runner)
echo "Starting self-hosted runner..."
cd ../actions-runner
./run.sh &

# 2. Go back to project root and run the build
cd ../google-gemini-codes
echo "Running local build..."
npm run build

# 3. Trigger the deploy.yml workflow using GitHub CLI
echo "Triggering deploy.yml workflow..."
gh workflow run deploy.yml

echo "All steps completed. Monitor the Actions tab or use 'gh run list' for status."
