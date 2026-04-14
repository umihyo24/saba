export const ENEMY_TYPES = {
  penguin: { id: "penguin", name: "ペンギン", emoji: "🐧", maxHp: 2, attack: 1, behavior: "ranged", range: 5, exp: 2, swimmer: true },
  penguinBoss: { id: "penguinBoss", name: "裏山の主", emoji: "👑", maxHp: 10, attack: 2, behavior: "ranged", range: 6, exp: 12, swimmer: true },
  cheetah: { id: "cheetah", name: "チーター", emoji: "🐆", maxHp: 3, attack: 1, behavior: "fast", speed: 2, exp: 4 },
  elephant: { id: "elephant", name: "ゾウ", emoji: "🦣", maxHp: 6, attack: 1, behavior: "slow", actEvery: 2, exp: 6 },
  hippo: { id: "hippo", name: "カバ", emoji: "🦛", maxHp: 4, attack: 2, behavior: "heavy", exp: 5, swimmer: true },
};
