/**
 * plugin-effort-slider — host dummy
 * Pure client plugin; host does nothing but must exist for the bundle patch.
 * Keep it minimal and dependency-free.
 */
export const name = "plugin-effort-slider";
export function apply(ctx) {
  // No host logic — slider is 100% client (conversation.input.right)
  // This keeps the bundle layer valid and avoids Cordis validation errors.
  try { ctx.logger?.info?.("[effort-slider] host dummy ready"); } catch {}
}
