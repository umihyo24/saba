export function renderArea(area, hint, overlays = "", { cameraFor, renderBoardStage }) {
  const cam = cameraFor(area);
  return `
    <div class="field-shell">
      ${renderBoardStage(area, cam, hint)}
      ${overlays}
    </div>
  `;
}
