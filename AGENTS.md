# Repository Guidelines

## Testing & Verification

- Colocate tests as `*.test.ts` or `*.test.tsx` and add package scripts so they run with Bun filters.
- Ensure Git hooks are installed with `lefthook install`.

## Commits & Pull Requests

- Use short, imperative Conventional Commit subjects; keep commits focused on one change.
- Include testing performed and screenshots or recordings for visible UI changes in PRs.
- Call out required environment variables or migration steps.
