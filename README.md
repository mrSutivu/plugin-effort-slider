# Effort Slider for DeepSeek Harness

![version](https://img.shields.io/badge/version-1.2.0-blue)
![DSH](https://img.shields.io/badge/DSH-plugin-6b8afd)
![license](https://img.shields.io/badge/license-MIT-green)

A notched **reasoning-effort slider** for [DeepSeek Harness (DSH)](https://github.com/deepseek-ai/deepseek-harness) — like Codex / Claude Code, but native to the DSH composer. Pick a model and drag the effort in one rounded pill, right where you type.

![Effort slider pill live in the composer](docs/banner-slider.png)


## Features

- **One rounded pill** — model picker + effort slider grouped with a DSH-style border, vertical separator, slider on the right of the model.
- **Direct model list** — one click opens the full provider/model list (no Model/Effort submenu); effort lives only on the slider.
- **Notched slider** — one notch per effort level exposed by the model (2 to 7+), with live drag, keyboard support (`←/→`, `Home`/`End`) and full ARIA slider semantics.
- **Max-effort celebration** — at the highest notch, the bar turns into an animated gradient in the spirit of DSH's own “Deep diving…” shimmer (disabled under `prefers-reduced-motion`).
- **Themeable by design** — every color goes through DSH theme variables (single accent source: the same variable as the send button), so light/dark and future theme plugins just work.
- **i18n** — chrome follows the DSH language setting (`en` / `fr` / `zh`); model and effort names are never translated (they come from the model).
- **Context meter relocation** — while active, the context ring moves last into the stats row (`turns/steps · Cache hit`) instead of crowding the send button.
- **Taller prompt area** — ~2 lines (`52px`, like the DSH hero) via stable attribute selectors.
- **Zero core changes** — 100% modular bundle, removable without a trace.

## Requirements

- DeepSeek Harness (`dsh`) with the `web` profile.
- A model exposing reasoning efforts (the slider only appears then — e.g. `low / medium / high / xhigh`).

## Install

From GitHub (no npm account needed):

```sh
dsh plugin --profile web add github:mrSutivu/plugin-effort-slider
```

Or clone it first:

```sh
git clone https://github.com/mrSutivu/plugin-effort-slider.git
dsh plugin --profile web add ./plugin-effort-slider
```

Then restart the `web` profile once (`dsh web`) and refresh the page. Client-only updates afterwards apply with a simple page refresh.

From npm:

```sh
dsh plugin --profile web add plugin-effort-slider
```

## Usage

1. Select a reasoning model in the composer pill.
2. Drag the slider (or focus it and use `←`/`→`) — the change applies on release.
3. Hit the top notch for the animated max-effort gradient.

When the current model has no reasoning levels, the pill stays out of the way and the native DSH selector is untouched.

## Theming

All colors resolve to DSH variables — the single accent is `var(--dsw-alias-button-info-fill)` (the send-button fill). A theme plugin that redefines the accent automatically recolors the slider, the notches, the max-effort gradient and the selection check.

## i18n

UI strings live under the `effort-slider` locale namespace (`en`, `fr`, `zh`). To add your language, register the namespace dictionaries and, if needed, a language pack via `locale.addLanguage` — then open a PR!

## Uninstall

```sh
dsh plugin --profile web remove plugin-effort-slider
```

Restart `dsh web` once. Everything (pill, styles, meter move, prompt height) is restored.

## Dev

No build step — `lib/client.js` ships ready to serve. Edit it, refresh the page, done. The host entry (`lib/index.js`) is an intentional no-op that keeps the bundle layer valid.

## Contributing

Issues and PRs welcome — especially new locale dictionaries, theme edge cases and provider quirks (effort counts vary per model).

## License

MIT © Sutivu
