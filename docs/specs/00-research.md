# Research: turso.tech visual language

Source of truth for the Lupin palette. Extracted 2026-10-02 from turso.tech compiled HTML/CSS.
Card: ZED-5.

## Code block (homepage, hand-authored, no syntax highlighter)

| Role | Value | Source |
|---|---|---|
| Background (page and code card) | `#0D1318` | Tailwind `bunker`, `bg-[#0D1318]` |
| Secondary panels | `#0F1317`, `#101317` | `bg-[...]` |
| Raised surface | `#152029` | `bg-[#152029]` |
| Border | `#283945` (used at 60-80% opacity) | `border-[#283945]` |
| Active tab underline | `#4FF8D2` | `border-b border-[#4FF8D2]` |
| Base text | white at 90% | `text-white/90` |
| Comment | white at 35% | `text-white/35` |
| Muted label ("TURSO") | white at 20% | `text-white/20` |
| Keyword (`import`, `const`, `await`) | `#E879F9` (fuchsia-400) | `text-fuchsia-400` |
| Object key (`org:`, `name:`) | `#7DD3FC` (sky-300) | `text-sky-300` |
| String / template literal | `#34D399` (emerald-400) | `text-emerald-400` |
| Function call, constant, import path | `#4FF8D2` (brand teal) | `text-[#4FF8D2]` |

## Brand scale (CSS custom properties)

| Token | Hex |
|---|---|
| `--turso-primary-aqua` | `#4FF8D2` |
| `--turso-aqua-text` (hover) | `#88FFE4` |
| lightest aqua | `#7FFADE` |
| `--turso-dark-blue` | `#121B22` |
| `--turso-blue-3` | `#1B252D` |
| `--turso-blue-4` | `#232E36` |
| `--turso-dark-gray` | `#293945` |
| `--turso-gray` | `#7B8690` |
| `--turso-light-gray` | `#C5CACE` |
| `--turso-white` | `#FAFAFA` |
| `--turso-blue` | `#0F4F62` |
| `--turso-red` | `#FF6663` |
| `--turso-yellow` | `#E0CA3C` |
| `--turso-lime` | `#A4DF95` |
| docs accent (Mintlify) | `#1EBCA1` |

## Fonts

| Use | Family | License |
|---|---|---|
| Code | Geist Mono | SIL OFL |
| UI / prose | Inter | SIL OFL |
| Secondary mono (widgets) | IBM Plex Mono | SIL OFL |

Editor themes cannot set fonts in VS Code or Zed; fonts are a README recommendation.

## Market check

No Turso-inspired theme exists for VS Code or Zed (GitHub and Marketplace search, 2026-10-02).
Closest in feel: Tokyo Night, Rosé Pine, Catppuccin Mocha, Dracula. None uses the
near-black `#0D1318` with the `#4FF8D2` aqua accent.

Multi-editor themes (Catppuccin, Rosé Pine, Dracula) all keep one palette as the source
and generate or adapt per editor. Lupin follows that model.
