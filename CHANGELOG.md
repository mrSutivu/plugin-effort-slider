# Changelog

## 1.2.2

- Native selector detection now matches the current model name, so a third-party menu button in the same row can never be hidden by mistake.
- Declared minimum engine version (`dsh.engines.dsh >= 0.1.2-alpha`).

## 1.2.1

- Fix crash when switching to a single-effort model: all hooks now run unconditionally, so coming back to a multi-effort model no longer needs a page reload.

## 1.2.0

- Full codebase and comments in English; debug logs removed.
- Verified i18n dictionaries (`en`, `fr`, `zh`) for every UI string.
- Publishable packaging: repository/bugs/homepage links, keywords, MIT license file.
- `screenshots.json` so storefronts can show the banner and screenshots.
- Compatibility and permissions notes (profile, credentials, platforms, limitations).

## 1.1.0

- Single rounded pill grouping the model picker and the slider; native selector hidden while active.
- Direct model list on one click (no Model/Effort submenu).
- Max-effort animated gradient in the spirit of DSH "Deep diving".
- Taller prompt area (~2 lines).
- Context meter moved last into the stats row.
- Fixed-width effort label (no layout shift).

## 1.0.0

- First release: notched reasoning-effort slider beside the model picker.
- Realtime drag with pointer capture, keyboard support, ARIA slider semantics.
- Themeable through DSH variables (single accent source).
- Hides the effort suffix in the native model trigger.
