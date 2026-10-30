# Project Guidelines

## Project
- `estatic` is a TypeScript CLI static file server.
- Keep changes focused and follow the existing patterns in `src/`.

## Build and Checks
- Install dependencies with `pnpm install`.
- Build with `pnpm build`.
- Run lint checks with `pnpm lint`.

## Commit Messages
- Use the Conventional Commits format: `<type>(<scope>): <description>`.
- Use an imperative, concise description. Common types include `feat`, `fix`, `docs`, `refactor`, `perf`, `test`, `build`, `ci`, and `chore`.
- Add a scope when it clarifies the affected area, for example `fix(server): handle port conflicts`.
- Mark breaking changes with `!` after the type or scope and describe them in a `BREAKING CHANGE:` footer.
- Do not use vague messages such as `update` or `misc`.
