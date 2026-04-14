export function handleUiAction(action, { gameState, render, dispatch }) {
  if (action === "toggle-minimap") {
    gameState.ui.minimapExpanded = !gameState.ui.minimapExpanded;
    render();
    return;
  }
  if (action === "restart-run") {
    dispatch("RESTART");
  }
}

export function bindUiEvents({ viewEl, windowObj, gameState, DIRS, dispatch, render, debugClickCapture }) {
  if (viewEl) {
    viewEl.addEventListener("click", (e) => {
      debugClickCapture(e);
      const actionEl = e.target instanceof Element ? e.target.closest("[data-ui-action]") : null;
      if (!actionEl) return;
      const action = actionEl.getAttribute("data-ui-action");
      if (!action) return;
      e.preventDefault();
      handleUiAction(action, { gameState, render, dispatch });
    });
  } else {
    console.error("[ui] #view not found; pointer interactions are disabled");
  }

  windowObj.addEventListener("keydown", (e) => {
    if (DIRS[e.key] && (gameState.phase === "town" || gameState.phase === "playing")) {
      e.preventDefault();
      if (gameState.input.lookMode) {
        dispatch("LOOK_FACE", { dx: DIRS[e.key].x, dy: DIRS[e.key].y });
        return;
      }
      dispatch("MOVE", { dx: DIRS[e.key].x, dy: DIRS[e.key].y });
    }
    if (e.key === "Shift" && (gameState.phase === "town" || gameState.phase === "playing")) {
      e.preventDefault();
      dispatch("SET_LOOK_MODE", { active: true });
    }
    if ((e.key === "e" || e.key === "E") && (gameState.phase === "town" || gameState.phase === "playing")) {
      e.preventDefault();
      dispatch("INTERACT");
    }
    if ((e.key === "z" || e.key === "Z") && gameState.phase === "playing") {
      e.preventDefault();
      dispatch("ATTACK");
    }
    if ((e.key === "x" || e.key === "X") && gameState.phase === "playing") {
      e.preventDefault();
      dispatch("SPECIAL");
    }
    if ((e.key === " " || e.code === "Space") && gameState.phase === "playing") {
      e.preventDefault();
      dispatch("WAIT");
    }
    if ((e.key === "p" || e.key === "P") && (gameState.phase === "town" || gameState.phase === "playing")) {
      e.preventDefault();
      dispatch("TOGGLE_STATUS");
    }
    if ((e.key === "c" || e.key === "C") && gameState.phase === "playing") {
      e.preventDefault();
      dispatch("TOGGLE_LOOK");
    }
    if ((e.key === "f" || e.key === "F") && gameState.phase === "playing") {
      e.preventDefault();
      dispatch("START_FIRE");
    }
    if ((e.key === "k" || e.key === "K") && gameState.phase === "playing") {
      e.preventDefault();
      dispatch("CRAFT");
    }
    if ((e.key === "v" || e.key === "V") && gameState.phase === "playing") {
      e.preventDefault();
      dispatch("UPGRADE_GEAR");
    }
    if ((e.key === "r" || e.key === "R") && gameState.phase === "gameover") {
      e.preventDefault();
      dispatch("RESTART");
    }
  });

  windowObj.addEventListener("keyup", (e) => {
    if (e.key === "Shift" && (gameState.phase === "town" || gameState.phase === "playing")) {
      e.preventDefault();
      dispatch("SET_LOOK_MODE", { active: false });
    }
  });
}
