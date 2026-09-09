window.__ModuleLoader__.load({
  id: "plugin-effort-slider",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
    const React = require("react");

    const NS = "effort-slider";
    const zh = { "slider.help": "拖动以调整推理强度", "slider.aria": "推理强度 {effort}", "model.aria": "选择模型，当前 {model}", "model.loading": "正在加载模型…", "model.empty": "没有可用的模型。" };
    const en = { "slider.help": "Drag to adjust reasoning effort", "slider.aria": "Effort {effort}", "model.aria": "Select model, current {model}", "model.loading": "Loading models…", "model.empty": "No models available." };
    const fr = { "slider.help": "Faites glisser pour ajuster l'effort", "slider.aria": "Effort {effort}", "model.aria": "Choisir le modèle, actuel {model}", "model.loading": "Chargement des modèles…", "model.empty": "Aucun modèle disponible." };

    // Single accent source = the same variable as the DSH send button, so a future
    // theme plugin only changes one variable and the slider follows everywhere.
    const ACCENT = "var(--dsw-alias-button-info-fill, var(--dsw-alias-brand-primary, #6b8afd))";
    const ACCENT_HOVER = "var(--dsw-alias-button-info-hover, var(--dsw-alias-brand-primary, #5b7cfa))";

    const CSS = `
/* ===== Single block: our model picker + slider (replaces the native selector when active) ===== */
[data-composer-card].efs-active .efs-trailing{ gap:8px !important; }
.efs-shipped-model-hidden{ display:none !important; }
.efs-pill{ position:relative; display:flex; align-items:center; min-height:36px; max-width:100%;
  border:1px solid var(--dsw-alias-border-l2); border-radius:999px; background:transparent; font-family:inherit;
  padding:3px 12px 3px 4px; box-sizing:border-box; }
.efs-model-btn{ display:flex; align-items:center; gap:4px; max-width:220px; height:30px; padding:0 8px;
  background:transparent; border:none; border-radius:999px; cursor:pointer; outline:none; flex:none;
  color:var(--dsw-alias-label-primary); font-size:13px; font-weight:500; line-height:20px; }
.efs-model-btn:hover:not(:disabled){ background:var(--dsw-alias-interactive-bg-hover); }
.efs-model-btn:focus-visible{ box-shadow:0 0 0 2px var(--dsw-alias-border-l3, #c4b5fd); }
.efs-model-btn:disabled{ cursor:default; opacity:0.6; }
.efs-model-label{ overflow:hidden; text-overflow:ellipsis; white-space:nowrap; min-width:0; }
.efs-model-chevron{ color:var(--dsw-alias-label-caption); flex:none; display:inline-flex; transition:transform 0.12s; }
.efs-model-chevron.open{ transform:rotate(180deg); }
.efs-sep{ width:1px; align-self:stretch; margin:8px 10px; background:var(--dsw-alias-border-l1); flex:none; }
/* ===== Model menu: direct list, no intermediate level ===== */
.efs-model-menu{ position:absolute; bottom:calc(100% + 8px); left:0; z-index:20;
  background:var(--dsw-specific-menu); box-shadow:var(--dsw-elevation-prominent);
  min-width:240px; max-width:min(340px, 90vw); max-height:min(320px, 60vh); overflow-y:auto;
  border-radius:20px; padding:4px; color:var(--dsw-alias-label-primary); }
.efs-model-status{ color:var(--dsw-alias-label-tertiary); padding:10px; font-size:13px; line-height:20px; }
.efs-model-group{ padding:2px 0 4px; }
.efs-model-grouptitle{ color:var(--dsw-alias-label-tertiary); font-size:11px; line-height:16px; font-weight:500;
  padding:6px 10px 2px; text-transform:none; }
.efs-model-opt{ display:flex; align-items:center; gap:8px; width:100%; text-align:left; cursor:pointer;
  background:transparent; border:none; border-radius:12px; padding:7px 10px;
  color:var(--dsw-alias-label-primary); font-size:13px; line-height:20px; }
.efs-model-opt:hover:not(:disabled){ background:var(--dsw-alias-interactive-bg-hover); }
.efs-model-opt:disabled{ cursor:default; opacity:0.6; }
.efs-model-optname{ flex:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.efs-model-check{ color:${ACCENT}; flex:none; font-weight:700; }
/* ===== Screenshot-style slider ===== */
.efs-root{ display:flex; flex-direction:row; align-items:center; gap:10px; width:208px; min-width:208px; max-width:208px; font-family:inherit; }
.efs-slider{ position:relative; flex:1; height:22px; display:flex; align-items:center; cursor:pointer; outline:none; border-radius:999px; min-width:0; touch-action:none; }
.efs-slider:focus-visible{ box-shadow:0 0 0 2px var(--dsw-alias-border-l3, #c4b5fd); }
.efs-slider:hover .efs-thumb circle{ fill:${ACCENT_HOVER}; }
.efs-track{ position:absolute; left:9px; right:9px; height:6px; background:var(--dsw-alias-interactive-bg-hover); border:none; border-radius:999px; top:50%; transform:translateY(-50%); }
.efs-trackFill{ position:absolute; left:9px; height:6px; background:${ACCENT}; opacity:1; border-radius:999px; top:50%; transform:translateY(-50%); pointer-events:none; transition:width 0.08s linear; }
.efs-dots{ display:flex; justify-content:space-between; width:100%; padding:0 7px; position:relative; z-index:1; align-items:center; pointer-events:none; }
.efs-dot{ width:6px; height:6px; aspect-ratio:1 / 1; border-radius:999px !important; background:var(--dsw-alias-label-caption); border:none; padding:0; flex:none; flex-shrink:0; box-sizing:border-box; transition:all 0.12s ease; }
/* Notches sitting on the blue bar: same DSH accent, barely lightened (like the mockup),
   slightly larger than the bar (8px vs 6px). They follow a future theme plugin automatically. */
.efs-dotPassed, .efs-dotActive{ width:8px; height:8px; aspect-ratio:1 / 1; border-radius:999px !important; border:none; outline:none; padding:0; margin:0; flex:none; box-sizing:border-box; display:block; line-height:0; opacity:1; transform:none; box-shadow:none;
  background:#89a1fd;
  background:color-mix(in srgb, var(--dsw-alias-button-info-fill, var(--dsw-alias-brand-primary, #6b8afd)) 80%, white); }
.efs-dotActive{ width:9px; height:9px;
  background:#7d98fd;
  background:color-mix(in srgb, var(--dsw-alias-button-info-fill, var(--dsw-alias-brand-primary, #6b8afd)) 88%, white); }
.efs-thumb{ position:absolute; display:block; line-height:0; width:18px; height:18px; min-width:18px; min-height:18px; max-width:18px; max-height:18px; padding:0; margin:0; border:none; outline:none; background:transparent; box-shadow:none;
  top:50%; transform:translate(-50%, -50%); pointer-events:none; z-index:2; transition:left 0.08s ease-out; }
.efs-thumb svg{ display:block; overflow:visible; }
.efs-thumb circle{ fill:${ACCENT}; transition:fill 0.12s ease; }
/* ===== Max effort: animated gradient à la DSH "deep diving" (1.8s shimmer).
   Everything derives from the same accent variable: a future theme plugin
   changes the accent and the gradient follows. */
.efs-max .efs-trackFill{
  background:linear-gradient(90deg, ${ACCENT} 0%, ${ACCENT} 38%, color-mix(in srgb, ${ACCENT} 32%, white) 50%, ${ACCENT} 62%, ${ACCENT} 100%);
  background-size:250% 100%; background-position:100% 0;
  animation:1.8s linear infinite efs-deep-dive-shimmer;
}
.efs-max .efs-thumb{ animation:1.8s ease-in-out infinite efs-thumb-breathe; }
@keyframes efs-deep-dive-shimmer{ to{ background-position:0 0; } }
@keyframes efs-thumb-breathe{ 0%,100%{ filter:drop-shadow(0 0 0 rgba(0,0,0,0)); } 50%{ filter:drop-shadow(0 0 5px ${ACCENT}); } }
@media (prefers-reduced-motion:reduce){ .efs-max .efs-trackFill, .efs-max .efs-thumb{ animation:none; } }
.efs-value{ width:64px; min-width:64px; max-width:64px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;
  font-size:13px; line-height:20px; font-weight:400; color:var(--dsw-alias-label-primary); background:transparent;
  border:none; padding:0; user-select:none; font-variant-numeric:tabular-nums; text-align:left; flex:none; }
.efs-busy{ opacity:1; }
.efs-busy .efs-model-btn{ opacity:0.6; }
/* ===== Context meter moved into the stats row (group stays centered, meter goes last) ===== */
[data-composer-stats].efs-with-meter{ justify-content:center !important; }
.efs-meter-moved{ margin-left:0 !important; order:99 !important; flex:none !important; }
/* ===== Slightly taller prompt area (~2 lines, like the 52px DSH hero).
   Stable attribute selectors (no hashed classes) + DSH font-size delta. */
[data-composer-card] [data-phase],
[data-composer-card] [data-placeholder]{ min-height:calc(52px + var(--dsh-content-font-delta,0px)*2); }
`;
    const TAG_ID = "plugin-effort-slider/effort.css";
    function ensureCss(ctx) {
      try {
        if (typeof styles !== "undefined" && styles && typeof styles.insert === "function") {
          return ctx.effect(() => styles.insert(CSS), "effort-slider: css");
        }
      } catch {}
      if (typeof document !== "undefined" && !document.querySelector(`style[data-plugin-css="${TAG_ID}"]`)) {
        const tag = document.createElement("style");
        tag.dataset.plugin = "plugin-effort-slider";
        tag.dataset.pluginCss = TAG_ID;
        tag.textContent = CSS;
        document.head.appendChild(tag);
      }
      return () => {};
    }

    const SHIPPED_MODEL_SEL = "button[aria-haspopup=\"menu\"]:not([data-efs-model-btn])";
    function findTrailing(card, sliderRoot) {
      let p = sliderRoot.parentElement;
      while (p && p !== card) {
        try {
          // Ignore our own pill: we are looking for the container holding the NATIVE selector.
          if (p.querySelector(SHIPPED_MODEL_SEL)) return p;
        } catch {}
        p = p.parentElement;
      }
      return null;
    }
    function findModelWrap(trailing, sliderRoot) {
      try {
        const kids = Array.from(trailing.children);
        const sliderWrap = kids.find((k) => { try { return k.contains(sliderRoot); } catch { return false; } }) || null;
        const modelWrap = kids.find((k) => k !== sliderWrap && (() => { try { return !!k.querySelector(SHIPPED_MODEL_SEL); } catch { return false; } })()) || null;
        return { sliderWrap, modelWrap };
      } catch { return { sliderWrap: null, modelWrap: null }; }
    }
    function findMeterNode(trailing) {
      try {
        const svgs = Array.from(trailing.querySelectorAll("svg"));
        for (const svg of svgs) {
          if (svg.querySelectorAll("circle").length >= 2) {
            let n = svg;
            while (n && n.parentElement !== trailing) n = n.parentElement;
            return n || svg;
          }
        }
      } catch {}
      return null;
    }
    function findStatsRoot(card) {
      try {
        const seat = card.closest("[data-composer-seat]") || card.parentElement;
        const scope = seat || document;
        return scope.querySelector("[data-composer-stats]");
      } catch {}
      try { return document.querySelector("[data-composer-stats]"); } catch { return null; }
    }

    // Hook-free guard: renders null while inactive, otherwise delegates to the inner
    // component so hooks stay stable.
    function EffortSlider(props) {
      const available = props.available;
      const directory = props.directory;
      if (!available) return null;
      if (!directory || !directory.subscribe) return null;
      return React.createElement(EffortSliderInner, props);
    }

    function EffortSliderInner(props) {
      const t = props.t || function (k, p) {
        if (p && p.effort) return k === "slider.aria" ? "Effort " + p.effort : k;
        if (p && p.model) return k === "model.aria" ? "Select model, current " + p.model : k;
        return k;
      };
      const directory = props.directory;
      const load = props.load;
      const select = props.select;
      const useSync = React.useSyncExternalStore || function (sub, get) { const [v, setV] = React.useState(get); React.useEffect(() => sub(() => setV(get())), [sub, get]); return v; };
      const state = useSync(directory.subscribe, directory.getSnapshot);
      React.useEffect(() => { if (state.status === "idle" || state.status === "loading") { try { load(); } catch (e) {} } }, [state.status]);
      const groups = state.groups || [];
      const current = state.current;
      let choice = null;
      let currentModelName = "";
      if (current) {
        for (let gi = 0; gi < groups.length; gi++) {
          const g = groups[gi];
          for (let mi = 0; mi < g.models.length; mi++) {
            const m = g.models[mi];
            if (g.id === current.provider && m.id === current.model) { choice = { group: g, model: m }; currentModelName = m.name || m.id; break; }
          }
          if (choice) break;
        }
        if (!currentModelName && current.model) currentModelName = String(current.model);
      }
      const reasoning = choice && choice.model && choice.model.reasoning;
      const hasReasoning = !!(reasoning && Array.isArray(reasoning.efforts) && reasoning.efforts.length >= 2);

      const wrapRef = React.useRef(null);
      const trackRef = React.useRef(null);
      const menuRootRef = React.useRef(null);
      const [dragIndex, setDragIndex] = React.useState(null);
      const [menuOpen, setMenuOpen] = React.useState(false);

      // Hides the native selector + moves the context meter.
      // No-op until the current model exposes reasoning levels (hasReasoning=false).
      React.useEffect(() => {
        if (!hasReasoning) return;
        const sliderRoot = wrapRef.current;
        if (!sliderRoot) return;
        let card = null;
        try { card = sliderRoot.closest("[data-composer-card]"); } catch {}
        if (!card) return;
        card.classList.add("efs-active");
        const trailing = findTrailing(card, sliderRoot);
        const restores = [];
        let modelWrap = null;
        if (trailing) {
          trailing.classList.add("efs-trailing");
          restores.push(() => { try { trailing.classList.remove("efs-trailing"); } catch {} });
          const found = findModelWrap(trailing, sliderRoot);
          modelWrap = found.modelWrap;
          if (modelWrap) {
            const prevDisplay = modelWrap.style.display;
            modelWrap.classList.add("efs-shipped-model-hidden");
            restores.push(() => { try { modelWrap.classList.remove("efs-shipped-model-hidden"); modelWrap.style.display = prevDisplay; } catch {} });
          }
        }

        // Moves the context meter (the two-circle ring) last into the stats row.
        let meterNode = null, statsRoot = null, placeholder = null, observer = null;
        const moveMeter = () => {
          try {
            if (!trailing) return;
            if (!statsRoot || !statsRoot.isConnected) statsRoot = findStatsRoot(card);
            if (!statsRoot) return;
            if (!meterNode || !meterNode.isConnected) meterNode = findMeterNode(trailing);
            if (meterNode && meterNode.parentElement === statsRoot) {
              statsRoot.classList.add("efs-with-meter");
              return;
            }
            if (!meterNode) return;
            if (!placeholder) placeholder = document.createComment("efs-meter");
            if (meterNode.parentElement === trailing && placeholder.parentElement !== trailing) {
              trailing.insertBefore(placeholder, meterNode);
            }
            statsRoot.appendChild(meterNode);
            meterNode.classList.add("efs-meter-moved");
            statsRoot.classList.add("efs-with-meter");
          } catch {}
        };
        moveMeter();
        try {
          observer = new MutationObserver(() => moveMeter());
          if (trailing) observer.observe(trailing, { childList: true });
          const seat = (card.closest && card.closest("[data-composer-seat]")) || card.parentElement;
          if (seat) observer.observe(seat, { childList: true, subtree: true });
        } catch {}

        return () => {
          try { if (observer) observer.disconnect(); } catch {}
          try {
            if (meterNode) {
              meterNode.classList.remove("efs-meter-moved");
              if (placeholder && placeholder.parentElement === trailing && meterNode.isConnected) {
                trailing.insertBefore(meterNode, placeholder);
              }
              if (placeholder && placeholder.parentElement) placeholder.parentElement.removeChild(placeholder);
            }
          } catch {}
          try {
            const stats = findStatsRoot(card);
            if (stats && !stats.querySelector(".efs-meter-moved")) stats.classList.remove("efs-with-meter");
          } catch {}
          try { restores.forEach((fn) => fn()); } catch {}
          try { if (card && !card.querySelector(".efs-pill")) card.classList.remove("efs-active"); } catch {}
        };
      }, [hasReasoning]);

      // Closes the model menu on outside click / Escape.
      React.useEffect(() => {
        if (!menuOpen) return;
        const onDown = (e) => {
          try {
            if (menuRootRef.current && !menuRootRef.current.contains(e.target)) setMenuOpen(false);
          } catch {}
        };
        const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
        document.addEventListener("mousedown", onDown);
        document.addEventListener("keydown", onKey);
        return () => {
          document.removeEventListener("mousedown", onDown);
          document.removeEventListener("keydown", onKey);
        };
      }, [menuOpen]);

      if (!hasReasoning) return null;
      const efforts = reasoning.efforts;
      const effectiveEffort = current && (current.reasoningEffort !== undefined ? current.reasoningEffort : reasoning.defaultEffort);
      let currentIndex = -1;
      if (effectiveEffort !== undefined) { for (let i = 0; i < efforts.length; i++) if (efforts[i].id === effectiveEffort) { currentIndex = i; break; } }
      if (currentIndex === -1) { const fb = reasoning.defaultEffort !== undefined ? reasoning.defaultEffort : (efforts[0] && efforts[0].id); for (let i = 0; i < efforts.length; i++) if (efforts[i].id === fb) { currentIndex = i; break; } if (currentIndex === -1) currentIndex = 0; }
      const dragging = dragIndex !== null;
      const displayIndex = dragging ? dragIndex : currentIndex;
      const isMax = displayIndex === efforts.length - 1;
      // While dragging there is no "busy" state: no dimming, no disabled controls, no tabIndex jump.
      // The server commit happens exactly once, on release (see handlePointerUp).
      const busy = state.status === "selecting" && !dragging;
      const currentEffortName = (efforts[currentIndex] && efforts[currentIndex].name) || effectiveEffort || "";
      const displayEffortName = (efforts[displayIndex] && efforts[displayIndex].name) || currentEffortName || "";
      React.useEffect(() => { if (!dragging) setDragIndex(null); }, [currentIndex, dragging]);
      const selectEffort = React.useCallback((id) => { if (!current) return; if (id === effectiveEffort) return; const sel = { provider: current.provider, model: current.model, reasoningEffort: id }; try { select(sel); } catch (e) {} }, [current, effectiveEffort, select]);
      const chooseModel = React.useCallback((provider, model) => {
        if (current && current.provider === provider && current.model === model) { setMenuOpen(false); return; }
        setMenuOpen(false);
        try { select({ provider, model }); } catch (e) {}
      }, [current, select]);
      const indexFromClientX = React.useCallback((clientX) => {
        const el = trackRef.current; if (!el) return currentIndex;
        const r = el.getBoundingClientRect();
        const inset = 9;
        const avail = r.width - inset * 2;
        if (avail <= 0) return currentIndex;
        const x = clientX - r.left - inset;
        const ratio = Math.max(0, Math.min(1, x / avail));
        return Math.max(0, Math.min(efforts.length - 1, Math.round(ratio * (efforts.length - 1))));
      }, [efforts.length, currentIndex]);
      const handlePointerDown = React.useCallback((e) => {
        e.preventDefault();
        const idx = indexFromClientX(e.clientX);
        setDragIndex(idx);
        try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
      }, [indexFromClientX]);
      const handlePointerMove = React.useCallback((e) => {
        if (dragIndex === null) return;
        if (e.buttons === 0) return;
        const idx = indexFromClientX(e.clientX);
        if (idx !== dragIndex) setDragIndex(idx);
      }, [dragIndex, indexFromClientX]);
      const handlePointerUp = React.useCallback((e) => {
        if (dragIndex === null) return;
        const idx = indexFromClientX(e.clientX);
        const finalIdx = (idx !== undefined && idx !== null) ? idx : dragIndex;
        setDragIndex(null);
        try { e.currentTarget.releasePointerCapture(e.pointerId); } catch {}
        if (finalIdx !== currentIndex && efforts[finalIdx]) selectEffort(efforts[finalIdx].id);
      }, [dragIndex, currentIndex, efforts, indexFromClientX, selectEffort]);
      const handlePointerCancel = React.useCallback((e) => { setDragIndex(null); try { e.currentTarget.releasePointerCapture(e.pointerId); } catch {} }, []);
      const onKeyDown = React.useCallback((e) => {
        if (e.key === "ArrowLeft" || e.key === "ArrowDown") { e.preventDefault(); const n = Math.max(0, currentIndex - 1); if (n !== currentIndex) selectEffort(efforts[n].id); }
        else if (e.key === "ArrowRight" || e.key === "ArrowUp") { e.preventDefault(); const n = Math.min(efforts.length - 1, currentIndex + 1); if (n !== currentIndex) selectEffort(efforts[n].id); }
        else if (e.key === "Home") { e.preventDefault(); selectEffort(efforts[0].id); }
        else if (e.key === "End") { e.preventDefault(); selectEffort(efforts[efforts.length - 1].id); }
      }, [currentIndex, efforts, selectEffort]);
      const ariaLabel = (function () { try { return t("slider.aria", { effort: displayEffortName }); } catch (e) { return "Effort " + displayEffortName; } })();
      const help = (function () { try { return t("slider.help"); } catch (e) { return "Drag to adjust"; } })();
      const modelAria = (function () { try { return t("model.aria", { model: currentModelName }); } catch (e) { return "Select model, current " + currentModelName; } })();
      const loadingText = (function () { try { return t("model.loading"); } catch (e) { return "Loading models…"; } })();
      const emptyText = (function () { try { return t("model.empty"); } catch (e) { return "No models available."; } })();
      const ratio = efforts.length > 1 ? (displayIndex / (efforts.length - 1)) : 0;
      const thumbLeft = `calc(9px + (100% - 18px) * ${ratio})`;
      const fillWidth = `calc((100% - 18px) * ${ratio})`;
      const Chevron = React.createElement("svg", { width: 14, height: 14, viewBox: "0 0 16 16", fill: "none", "aria-hidden": true, className: "efs-model-chevron" + (menuOpen ? " open" : "") },
        React.createElement("path", { d: "M4 6l4 4 4-4", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }));
      return React.createElement("div", { className: "efs-pill" + (busy ? " efs-busy" : ""), ref: wrapRef, title: help },
        React.createElement("div", { ref: menuRootRef, style: { display: "contents" } },
          React.createElement("button", { type: "button", className: "efs-model-btn", "data-efs-model-btn": "1", "aria-label": modelAria, "aria-haspopup": "menu", "aria-expanded": menuOpen, title: currentModelName, disabled: false, onClick: () => { try { load(); } catch (e) {} setMenuOpen((v) => !v); } },
            React.createElement("span", { className: "efs-model-label" }, currentModelName),
            Chevron
          ),
          menuOpen && React.createElement("div", { className: "efs-model-menu", role: "menu", "aria-label": modelAria },
            (state.status === "loading" || state.status === "idle") && groups.length === 0
              ? React.createElement("div", { className: "efs-model-status" }, loadingText)
              : groups.length === 0
                ? React.createElement("div", { className: "efs-model-status" }, emptyText)
                : groups.map((g) => React.createElement("div", { className: "efs-model-group", key: g.id, role: "group", "aria-label": g.name },
                    React.createElement("div", { className: "efs-model-grouptitle" }, g.name),
                    g.models.map((m) => {
                      const selected = current && current.provider === g.id && current.model === m.id;
                      return React.createElement("button", {
                        key: g.id + "/" + m.id, type: "button", role: "menuitemradio", "aria-checked": selected,
                        className: "efs-model-opt", disabled: false, title: m.name,
                        onClick: () => chooseModel(g.id, m.id)
                      },
                        React.createElement("span", { className: "efs-model-optname" }, m.name),
                        selected && React.createElement("span", { className: "efs-model-check", "aria-hidden": true }, "✓")
                      );
                    })
                  ))
          )
        ),
        React.createElement("div", { className: "efs-sep", "aria-hidden": true }),
        React.createElement("div", { className: "efs-root" + (isMax ? " efs-max" : ""), title: help },
          React.createElement("div", { className: "efs-slider", ref: trackRef, role: "slider", "aria-valuenow": displayIndex, "aria-valuemin": 0, "aria-valuemax": efforts.length - 1, "aria-valuetext": displayEffortName, "aria-label": ariaLabel, tabIndex: 0, onPointerDown: handlePointerDown, onPointerMove: handlePointerMove, onPointerUp: handlePointerUp, onPointerCancel: handlePointerCancel, onKeyDown: onKeyDown },
            React.createElement("div", { className: "efs-track" }),
            React.createElement("div", { className: "efs-trackFill", style: { width: fillWidth } }),
            React.createElement("div", { className: "efs-dots" }, efforts.map(function (e, i) { return React.createElement("div", { key: e.id, className: "efs-dot" + (i === displayIndex ? " efs-dotActive" : "") + (i < displayIndex ? " efs-dotPassed" : ""), title: e.name }); })),
            React.createElement("div", { className: "efs-thumb", style: { left: thumbLeft } },
              React.createElement("svg", { width: 18, height: 18, viewBox: "0 0 18 18", "aria-hidden": true },
                React.createElement("circle", { cx: 9, cy: 9, r: 9 })))
          ),
          React.createElement("span", { className: "efs-value", title: displayEffortName }, displayEffortName)
        )
      );
    }

    const inject = ["locale", "slots", "modelDirectories", "sessions", "remote", "remote.session"];
    function apply(ctx) {
      ctx.effect(() => ctx.locale.register(NS, { zh, en }), "effort-slider: dicts");
      try { ctx.effect(() => ctx.locale.register(NS, "fr", fr), "effort-slider: dict fr"); } catch (e) {}
      ctx.effect(() => {
        const tryAdd = () => { try { const s = ctx.locale; const snap = s.getLocale ? s.getLocale() : s.getSnapshot(); if (!snap.locales.some(l => l.id === "fr")) s.addLanguage({ id: "fr", label: "Français", fallback: "en" }); } catch (e) {} };
        tryAdd(); let u = () => {}; try { u = ctx.locale.subscribe(tryAdd); } catch {} return () => { try { u(); } catch {} };
      }, "effort-slider: ensure fr");
      ensureCss(ctx);
      const slots = ctx.slots;
      const modelDirectories = ctx.modelDirectories;
      const sessions = ctx.sessions;
      slots.inject("conversation.input.right", () => slots.register({
        name: "conversation.input.right", id: "effort-slider", order: -10, locale: NS,
        inject: function () {
          let sid = null;
          const a0 = arguments[0];
          if (typeof a0 === "string" && a0) sid = a0;
          else if (a0 && typeof a0 === "object" && a0.sessionId) sid = a0.sessionId;
          if (!sid) { try { const snap = sessions.list.getSnapshot(); sid = snap.current; } catch (e) {} }
          if (!sid || typeof sid !== "string") return { available: false, directory: { getSnapshot: () => ({ current: null, groups: [], status: "idle", error: null }), subscribe: () => () => {} }, load: () => {}, select: () => Promise.resolve(false) };
          try {
            const dir = modelDirectories.directoryFor(sid);
            let available = true; try { available = sessions.subagentAddress(sid) === undefined; } catch (e) { available = true; }
            return { available: available, directory: dir.store, load: function () { if (available) dir.load().catch(() => {}); }, select: function (sel) { if (!available) return Promise.resolve(false); return dir.select(sel).then(() => true, () => false); } };
          } catch (e) { return { available: false, directory: { getSnapshot: () => ({ current: null, groups: [], status: "idle", error: null }), subscribe: () => () => {} }, load: () => {}, select: () => Promise.resolve(false) }; }
        }
      }, EffortSlider));
    }

    exports.inject = inject;
    exports.apply = apply;
    return module.exports;
  }
});
