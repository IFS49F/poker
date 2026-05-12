# Repository Guidelines

## Project Structure & Module Organization

This is a Bun workspace with two applications under `apps/`.

- `apps/web` contains the React 19 frontend. Source lives in `apps/web/src`, with reusable UI in `components/`, route views in `pages/`, shared utilities and types in `lib/`, and static assets in `assets/`.
- `apps/server` contains the Socket.IO backend. Source lives in `apps/server/src`; `index.ts` boots the Bun server, while `socket.ts`, `state.ts`, `redis.ts`, and `types.ts` hold runtime logic and contracts.
- Build output is written to `dist/` inside each app. Do not edit generated files directly.

## Build, Test, and Development Commands

Run commands from the repository root unless noted.

```bash
bun install
bun dev
bun run --filter './apps/web' dev
bun run --filter './apps/server' dev
bun run --filter './apps/web' build
bun run --filter './apps/server' build
bun run --filter './apps/web' typecheck
```

`bun dev` starts all workspace dev servers in parallel. The filtered `dev` commands run one app at a time. Build commands generate production bundles in each app's `dist/`. Type checking is currently scripted for the web app.

## Coding Style & Naming Conventions

Use TypeScript and ES modules. Follow the existing style: two-space indentation, double quotes, semicolons, and trailing commas in multiline calls. React components use PascalCase folder and file names, for example `components/Share/Share.tsx`; colocate CSS as `Share.css`. Keep server modules focused by concern and prefer explicit event/type definitions in `apps/server/src/types.ts`.

## CI/CD Configuration

GitHub Actions workflows live in `.github/workflows/`.

- `web-deploy-cloudflare.yaml` deploys the web app to Cloudflare Pages on pushes to `master` that touch `apps/web/**`.
- `web-deploy-linode.yaml` deploys the web app to a Linode server via rsync on pushes to `master` that touch `apps/web/**`.
- `server-build-publish.yaml` builds and pushes a multi-arch Docker image to GHCR when a `server/v*` tag is created.

All workflows use `oven-sh/setup-bun@v2`, cache dependencies via `bun.lock`, and run `bun ci` for installation. No PR checks are currently configured; add a `pull_request` workflow to enforce lint, format, typecheck, and build gates before merging.

## Lint & Format Checks

`oxfmt` and `oxlint` are installed at the workspace root. Run them before committing:

```bash
bun run fmt
bun run lint
```

This repo also uses `lefthook` for pre-commit automation. After installing dependencies, set up the git hooks with:

```bash
bunx lefthook install
```

The pre-commit hook runs `bunx oxlint --fix` and `bunx oxfmt` so commits stay formatted and linted.

Add these to your PR verification flow or a `ci` script so they act as back pressure against style drift. Consider adding `oxfmt --check` and `oxlint` as required CI steps on `pull_request` to block merges that don't pass.

## Testing Guidelines

When adding tests, place them near the code they cover using `*.test.ts` or `*.test.tsx`, and add package scripts so they can run with Bun filters. At minimum, run the relevant `typecheck` and `build` commands before opening a PR.

## Commit & Pull Request Guidelines

Use short Conventional Commit style subjects such as `chore: clean slate`, `docs: ...`, and `fix: ...`. Keep commits imperative, scoped, and focused on one change.

Pull requests should include a concise description, testing performed, linked issues when applicable, and screenshots or screen recordings for visible UI changes. Call out required environment variables or migration steps.

## Security & Configuration Tips

Server configuration comes from `PORT`, `REDIS_URL`, and `WEB_BASE_URL`. The web app currently reads `BUN_PUBLIC_SERVER_BASE_URL` for the backend URL. Keep secrets out of source control; prefer local environment files or `mise.local.toml` overrides for developer-specific values.
