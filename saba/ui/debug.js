export const DEBUG_UI = false;
export const DEBUG_FLOW = false;
export const DEBUG_CLICK_CAPTURE = false;

export function debugUi(...args) {
  if (!DEBUG_UI) return;
  console.debug("[ui-debug]", ...args);
}

export function debugFlow(...args) {
  if (!DEBUG_FLOW) return;
  console.debug("[flow-debug]", ...args);
}

export function debugClickCapture(e) {
  if (!DEBUG_CLICK_CAPTURE || !(e.target instanceof Element)) return;
  const pointX = typeof e.clientX === "number" ? e.clientX : -1;
  const pointY = typeof e.clientY === "number" ? e.clientY : -1;
  const atPoint = pointX >= 0 && pointY >= 0 ? document.elementFromPoint(pointX, pointY) : null;
  const path = typeof e.composedPath === "function" ? e.composedPath() : [];
  const actionEl = e.target.closest("[data-ui-action]");
  const buttonEl = e.target.closest("button");
  const overlays = {
    statusOverlay: !!document.querySelector(".status-overlay"),
    modalBackdrop: !!document.querySelector(".modal-backdrop"),
    modalBackdropOpen: !!document.querySelector(".modal-backdrop.is-open"),
  };
  const selectors = [
    "#view",
    ".dungeon-stage",
    ".stage-main",
    ".stage-corner-panel",
    ".stage-left-panel",
    ".status-overlay",
    ".modal-backdrop",
  ];
  const rows = selectors.map((selector) => {
    const el = document.querySelector(selector);
    if (!el) return { selector, exists: false };
    const rect = el.getBoundingClientRect();
    const st = getComputedStyle(el);
    return {
      selector,
      exists: true,
      left: Math.round(rect.left),
      top: Math.round(rect.top),
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      zIndex: st.zIndex,
      pointerEvents: st.pointerEvents,
      display: st.display,
      visibility: st.visibility,
      opacity: st.opacity,
    };
  });

  const stageMain = document.querySelector(".stage-main");
  const sidePanel = document.querySelector(".stage-corner-panel");
  const leftPanel = document.querySelector(".stage-left-panel");
  const statusOverlay = document.querySelector(".status-overlay");
  const modalBackdrop = document.querySelector(".modal-backdrop");

  console.groupCollapsed("[click-debug] view click");
  console.log("target:", e.target);
  console.log("composedPath:", path);
  console.log("closest [data-ui-action]:", actionEl);
  console.log("closest button:", buttonEl);
  console.log("click point:", { x: pointX, y: pointY });
  console.log("overlays:", overlays);
  console.log("elementFromPoint:", atPoint);
  console.table(rows);
  console.log("computed stage-main:", stageMain ? {
    gridColumnStart: getComputedStyle(stageMain).gridColumnStart,
    gridColumnEnd: getComputedStyle(stageMain).gridColumnEnd,
  } : null);
  console.log("computed stage-corner-panel:", sidePanel ? {
    gridColumnStart: getComputedStyle(sidePanel).gridColumnStart,
    gridColumnEnd: getComputedStyle(sidePanel).gridColumnEnd,
  } : null);
  console.log("computed stage-left-panel:", leftPanel ? {
    display: getComputedStyle(leftPanel).display,
    pointerEvents: getComputedStyle(leftPanel).pointerEvents,
  } : null);
  console.log("computed status-overlay:", statusOverlay ? {
    display: getComputedStyle(statusOverlay).display,
    pointerEvents: getComputedStyle(statusOverlay).pointerEvents,
  } : null);
  console.log("computed modal-backdrop:", modalBackdrop ? {
    pointerEvents: getComputedStyle(modalBackdrop).pointerEvents,
    opacity: getComputedStyle(modalBackdrop).opacity,
  } : null);
  console.groupEnd();
}
