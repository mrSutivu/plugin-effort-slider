# DeepSeek Harness Effort Slider 插件

![version](https://img.shields.io/badge/version-1.2.0-blue)
![DSH](https://img.shields.io/badge/DSH-plugin-6b8afd)
![license](https://img.shields.io/badge/license-MIT-green)

[English](README.md) | **中文**

为 [DeepSeek Harness (DSH)](https://github.com/deepseek-ai/deepseek-harness) 打造的**推理强度刻度滑杆**——对标 Codex / Claude Code，但原生融入 DSH 输入框。在同一个圆角胶囊里选模型、拖强度，所见即所得。

![输入框中的 Effort Slider 胶囊](docs/banner-slider.png)

| 深色 | 浅色 |
| ---- | ---- |
| ![深色主题输入框](docs/screenshot-composer.png) | ![浅色主题输入框](docs/screenshot-light.png) |

## 功能

- **一体化圆角胶囊**——模型选择器 + 强度滑杆共用 DSH 风格边框与中间分隔线，滑杆位于模型右侧（如截图所示）。
- **模型直选**——一键展开完整 provider/模型列表（无 Model/Effort 二级菜单），强度只走滑杆。
- **刻度滑杆**——按模型开放的强度档位生成刻度（2～7+ 档），支持实时拖拽与键盘操作（`←/→`、`Home`/`End`），完整 ARIA slider 语义。
- **最高档呼吸渐变**——拉到最高档时整条轨道变为致敬 DSH “Deep diving…” 的流光渐变（`prefers-reduced-motion` 下自动关闭）。
- **原生可换肤**——所有颜色走 DSH 主题变量（accent 唯一来源，即发送按钮同款变量），浅色/深色及未来主题插件自动适配。
- **三语**——界面跟随 DSH 语言设置（`en` / `fr` / `zh`）；模型名与强度名不翻译（来自模型本身）。
- **上下文圆环归位**——插件激活时，发送按钮旁的上下文占用圆环移到统计行（`turns/steps · Cache hit`）末尾，不再挤占发送区。
- **输入框加高**——约两行高度（`52px`，对标 DSH hero），使用稳定属性选择器。
- **零侵入**——100% 模块化 bundle，不动 DSH 核心，卸载无残留。

## 环境要求

- DeepSeek Harness（`dsh`）+ `web` profile。
- 支持推理强度的模型（仅此时显示滑杆，如 `low / medium / high / xhigh`）。

## 安装

从 GitHub 安装（无需 npm 账号）：

```sh
dsh plugin --profile web add github:mrSutivu/plugin-effort-slider
```

或先 clone：

```sh
git clone https://github.com/mrSutivu/plugin-effort-slider.git
dsh plugin --profile web add ./plugin-effort-slider
```

然后重启一次 `web` profile（`dsh web`）并刷新页面。之后纯前端更新只需刷新页面。

从 npm 安装：

```sh
dsh plugin --profile web add plugin-effort-slider
```

## 使用

1. 在输入框胶囊里选择带推理能力的模型。
2. 拖动滑杆（或聚焦后用 `←`/`→`）——松开即生效。
3. 拉到最高档可触发流光渐变。

当前模型没有推理档位时，胶囊自动隐藏，原生 DSH 选择器不受影响。

## 换肤

所有颜色解析自 DSH 变量——accent 唯一来源是 `var(--dsw-alias-button-info-fill)`（发送按钮同款）。换肤插件改这一个变量，滑杆、刻度、最高档渐变与选中勾选自动跟随。

## 国际化

界面文案位于 `effort-slider` locale 命名空间（`en`、`fr`、`zh`）。欢迎 PR 新语言：注册该命名空间的字典即可（如需可通过 `locale.addLanguage` 添加语言包）！

## 卸载

```sh
dsh plugin --profile web remove plugin-effort-slider
```

重启一次 `dsh web`。所有改动（胶囊、样式、圆环位移、输入框高度）自动还原。

## 开发

无需构建——`lib/client.js` 开箱即用，改完刷新页面即可。host 入口（`lib/index.js`）是为保证 bundle 层合法而设的空实现。

## 贡献

欢迎 Issues 与 PR——尤其是新语言字典、主题边界情况与各 provider 档位数差异。

## 协议

MIT © Sutivu
