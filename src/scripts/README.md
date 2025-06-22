# Scripts

This directory contains project automation scripts.

- `generate-content-index.js`: Generates per-content JSON index files for all projects and blog posts. These are placed in `src/data/content-index/` and can be imported by any component or page.

## Usage

From the project root, run:

```sh
node src/scripts/generate-content-index.js
```

This will (re)generate all JSON index files for your content.

## Notes
- All reusable logic is in `src/utils/content-utils.js`.
- Do not duplicate logic; import helpers from `src/utils/` as needed.
