# AGENT.md

## Clean, Minimal Steps for Publishing Astro Site to GitHub Pages

**This guide ensures only your static site files are published, avoiding repeated errors and large file issues.**

---

### 1. Start Fresh on the Publishing Branch

```sh
git checkout gh-pages-clean
git rm -rf .
rm -rf actions-runner
rm -rf ~/astro-dist-backup
```

---

### 2. Build and Copy Only the Output

On `main`:
```sh
git checkout main
npm install        # Only if node_modules is missing
npm run build
cp -r dist ~/astro-dist-backup
```

Back on `gh-pages-clean`:
```sh
git checkout gh-pages-clean
cp -r ~/astro-dist-backup/* .
touch .nojekyll
rm -rf actions-runner
```

---

### 3. Double-Check Before Committing

```sh
ls -la
# Should show ONLY your static site files and .nojekyll
```

---

### 4. Stage, Commit, and Push

```sh
git add .
git commit -m "Publish only static site files to gh-pages"
git push -f origin HEAD:gh-pages
```

---

## Key Rules
- Never copy or commit `actions-runner` or any build/CI folders to `gh-pages`.
- Always check with `ls -la` before `git add .` to confirm only site files are present.
- If you see unwanted files, remove them before committing.

---

**If you follow these steps, you will avoid the repeated errors and keep your GitHub Pages deployment clean.**
