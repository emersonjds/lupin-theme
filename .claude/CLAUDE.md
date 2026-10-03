# Lupin Theme

Dark editor theme for VS Code and Zed, inspired by the turso.tech code blocks. Display name "Lupin Theme", id and search slug `lupin-theme`. Card: ZED-5.

## Architecture

One palette, one generator per editor.

```
src/palette.ts         raw colors; the only file allowed to contain hex
src/roles.ts           semantic roles -> palette colors
src/targets/vscode.ts  roles -> VS Code color theme JSON
src/targets/zed.ts     roles -> Zed theme family JSON (schema v0.2.0)
scripts/build.ts       writes the generated JSON into extensions/
extensions/vscode/     VS Code extension (package.json + generated theme)
extensions/zed/        Zed extension (extension.toml + generated theme)
tests/                 contrast, hue separation, schema, key coverage, drift
```

Generated files in `extensions/*/themes/` are committed (Zed installs from git) and never edited by hand. A test fails if they drift from the build output.

## Commands

```
npm test            vitest with coverage gate (>90% on all four metrics)
npm run build       regenerate extensions/*/themes
npm run typecheck   tsc --noEmit
npm run lint        eslint
npm run package     build the .vsix
```

## Rules

- Specs in `docs/specs/`, plans in `docs/plans/`. No code without both.
- Color decisions need a computed number (contrast ratio, deltaE), recorded in the palette spec.
- Gitflow: `developer` is integration, `main` is release. Branches `feat|fix|chore|docs/ZED-<n>-<summary>`.

## Agents

| Agent | Model | Use for |
|---|---|---|
| color-scientist | opus | palette, contrast, perceptual checks |
| ide-ux-architect | sonnet | attention hierarchy of editor UI |
| ui-designer | sonnet | role-to-key surface map for both editors |
| theme-engineer | opus | implementation, test-first |
| theme-reviewer | opus | adversarial review, read-only |
