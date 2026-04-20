export function renderHudBar({ hudEl, gameState, getDungeonDef }) {
  if (!hudEl) {
    console.error("[render] #hud not found");
    return;
  }
  const hpRatio = Math.max(0, Math.min(1, gameState.player.hp / gameState.player.maxHp));
  const oxygenRatio = Math.max(0, Math.min(1, gameState.player.oxygen / gameState.player.maxOxygen));
  const hungerRatio = Math.max(0, Math.min(1, gameState.player.hunger / 100));
  const thirstRatio = Math.max(0, Math.min(1, gameState.player.thirst / 100));
  const hpState = hpRatio > 0.6 ? "safe" : hpRatio > 0.3 ? "mid" : "low";
  const dungeonName = gameState.phase === "playing" ? getDungeonDef(gameState.dungeon?.id).name : "拠点";
  const floorLabel = gameState.phase === "playing" ? `${gameState.dungeon.depth}F` : "-";
  const fireLabel = gameState.phase === "playing" && gameState.dungeon?.fire?.active ? `🔥${gameState.dungeon.fire.duration}` : "🔥-";
  hudEl.innerHTML = `
    <div class="hud-bar">
      <div class="hud-left">
        <div class="hud-dungeon">${dungeonName}</div>
        <div class="hud-floor">${floorLabel}</div>
      </div>
      <div class="hud-center">
        <div class="hp-wrap">
          <div class="hp-bar"><div class="hp-fill ${hpState}" style="width:${Math.round(hpRatio * 100)}%"></div></div>
          <span class="hud-hp">${gameState.player.hp}/${gameState.player.maxHp}</span>
        </div>
        <div class="oxy-wrap">
          <div class="oxy-bar"><div class="oxy-fill" style="width:${Math.round(oxygenRatio * 100)}%"></div></div>
          <span class="hud-oxy">${gameState.player.oxygen}/${gameState.player.maxOxygen}</span>
        </div>
        <div class="oxy-wrap">
          <div class="oxy-bar"><div class="oxy-fill hunger-fill" style="width:${Math.round(hungerRatio * 100)}%"></div></div>
          <span class="hud-oxy">空腹 ${Math.round(gameState.player.hunger)}</span>
        </div>
        <div class="oxy-wrap">
          <div class="oxy-bar"><div class="oxy-fill thirst-fill" style="width:${Math.round(thirstRatio * 100)}%"></div></div>
          <span class="hud-oxy">水分 ${Math.round(gameState.player.thirst)}</span>
        </div>
      </div>
      <div class="hud-right">${fireLabel}<br>💰 ${gameState.player.totalFish}</div>
    </div>
  `;
}

export function renderMessageBox({ logEl, gameState, logLimit }) {
  if (!logEl) {
    console.error("[render] #log not found");
    return;
  }
  const msgs = gameState.ui.messages.slice(0, logLimit);
  const [latest = "..."] = msgs;
  if (gameState.phase === "gameover") {
    logEl.innerHTML = `<div class="message-fixed latest">${latest}</div>`;
    return;
  }
  logEl.innerHTML = msgs
    .map((msg, idx) => `<div class="message-fixed ${idx === 0 ? "latest" : "older"}">${msg || ""}</div>`)
    .join("");
}

export function renderStatusPanel({ gameState, lungCapacity, carryingWeight, carryWeightLimit }) {
  if (!gameState.ui.statusOpen) return "";
  return `
    <div class="status-overlay">
      <h3>STATUS</h3>
      <div>LV ${gameState.player.level}</div>
      <div>EXP ${gameState.player.exp}/${gameState.player.nextExp}</div>
      <div>Lung ${gameState.player.breathSteps}/${lungCapacity}</div>
      <div>Stamina ${Math.round(gameState.player.stamina)}</div>
      <div>Weight ${carryingWeight()}/${carryWeightLimit}</div>
      <div class="meta">F:火 / K:クラフト / V:強化</div>
      <div class="meta">P: 閉じる</div>
    </div>
  `;
}

export function missionHintText(gameState) {
  const cleared = gameState.meta.clearedDungeons;
  if (!cleared.urayama || !cleared.forest) {
    const list = [];
    if (!cleared.urayama) list.push("裏山: 商人救出");
    if (!cleared.forest) list.push("もり: 教官救助");
    return `依頼: ${list.join(" / ")}`;
  }
  return "依頼: 追加探索で魚を集めよう";
}
