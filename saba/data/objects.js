export function createObjectTypes({ gameState, addLog, startDungeonRun, descendDepth, onNpcRescued, endPlayerTurn }) {
  return {
    T: {
      label: "トレーニング",
      hint: "E: トレーニング",
      symbol: "🏋️",
      renderType: "train",
      interact() {
        if (!gameState.meta.unlocked.trainingFacility) {
          addLog("訓練所はまだ使えない。");
          return;
        }
        gameState.player.maxHp += 1;
        gameState.player.hp = gameState.player.maxHp;
        addLog("トレーニングした。");
      },
    },
    R: {
      label: "休憩所",
      hint: "E: 休む",
      symbol: "🍖",
      renderType: "rest",
      interact() {
        gameState.player.hp = gameState.player.maxHp;
        gameState.player.pp = gameState.player.maxPp;
        addLog("腹ごしらえして休んだ。");
      },
    },
    B: {
      label: "依頼板",
      hint: "E: 依頼を見る",
      symbol: "📜",
      renderType: "board",
      interact() {
        gameState.mission.accepted = true;
        const urayamaDone = !!gameState.meta.clearedDungeons.urayama;
        const forestDone = !!gameState.meta.clearedDungeons.forest;
        if (!urayamaDone || !forestDone) {
          const targets = [];
          if (!urayamaDone) targets.push("裏山: 商人救出");
          if (!forestDone) targets.push("もり: 教官救助");
          addLog(`依頼板: ${targets.join(" / ")}`);
        } else {
          addLog("依頼板: 追加の探索依頼あり。");
        }
      },
    },
    D: {
      label: "ダンジョン入口",
      hint: "入口: 踏み込んで探索開始",
      symbol: "🕳️",
      renderType: "gate",
      autoTriggerOnStep: true,
      interact(_, obj) {
        startDungeonRun(obj?.destinationDungeonId || "urayama");
      },
      getSymbol(obj) {
        if (obj?.destinationDungeonId === "forest") return "🌲";
        return "🕳️";
      },
    },
    S: {
      label: "看板",
      hint: "S: カンバンを読む",
      symbol: "🪧",
      renderType: "board",
      interact() {
        addLog("ペンギン村へようこそ！");
      },
    },
    V: {
      label: "渦",
      hint: "渦: 深く潜る",
      symbol: "🌀",
      renderType: "gate",
      autoTriggerOnStep: true,
      interact() {
        descendDepth();
        descendDepth();
      },
    },
    N: {
      label: "倒れている教官",
      hint: "E: 薬草で手当て",
      symbol: "🧑‍🏫",
      renderType: "board",
      interact(_, obj) {
        if (!obj || obj.rescued) return;
        onNpcRescued(obj);
      },
      getSymbol(obj) {
        return obj && obj.rescued ? "🙂" : "🧑‍🏫";
      },
    },
    C: {
      label: "宝箱",
      hint: "E: 宝箱を開ける",
      symbol: "🎁",
      renderType: "item",
      interact(_, obj) {
        if (obj.opened) return;
        obj.opened = true;
        const rewardRoll = Math.random();
        if (rewardRoll < 0.4) {
          gameState.player.hp = Math.min(gameState.player.maxHp, gameState.player.hp + 3);
          addLog("宝箱から回復薬。HPが3回復した。");
        } else if (rewardRoll < 0.75) {
          gameState.player.pp = Math.min(gameState.player.maxPp, gameState.player.pp + 1);
          addLog("宝箱から集中薬。PPが1回復した。");
        } else {
          gameState.player.fishThisRun += 1;
          gameState.mission.retrieved = true;
          addLog("宝箱から魚を見つけた。");
        }
        endPlayerTurn("interact");
      },
      getSymbol(obj) {
        return obj && obj.opened ? "🧰" : "🎁";
      },
    },
  };
}
