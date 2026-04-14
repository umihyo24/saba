export function renderMiniMap(area, gameState, { tileAt, isDiscovered }) {
  let dots = "";
  const isTown = gameState.phase === "town";
  for (let y = 0; y < area.height; y++) {
    for (let x = 0; x < area.width; x++) {
      const t = tileAt(area, x, y);
      const discovered = isTown ? true : isDiscovered(x, y);
      const kind = !discovered ? "unknown" : t === "wall" ? "wall" : t === "water" ? "water" : t === "hole" ? "hole" : "floor";
      const current = x === area.playerPos.x && y === area.playerPos.y ? " player" : "";
      dots += `<span class="mini-dot ${kind}${current}"></span>`;
    }
  }
  const expandedClass = gameState.ui.minimapExpanded ? " expanded" : "";
  const hint = gameState.ui.minimapExpanded ? "クリックで元に戻す" : "クリックで拡大";
  return `<button type="button" data-ui-action="toggle-minimap" class="minimap${expandedClass}" title="${hint}" style="grid-template-columns:repeat(${area.width},5px)">${dots}</button>`;
}
