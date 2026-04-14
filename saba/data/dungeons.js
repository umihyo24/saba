export const DUNGEON_THEMES = {
  cave: {
    floor: "floor_cave",
    wall: "wall_cave",
  },
  ice: {
    floor: "floor_ice",
    wall: "wall_ice",
  },
};

export const DUNGEON_DEFS = {
  urayama: {
    id: "urayama",
    name: "裏山",
    maxDepth: 5,
    theme: "ice",
    mission: "裏山の主を倒して商人を救出する",
    events: {
      bossFloor: 5,
    },
    fov: {
      corridorRadius: 2,
      corridorMax: 3,
      roomPadding: 1,
    },
  },
  forest: {
    id: "forest",
    name: "ちかくのもり",
    maxDepth: 5,
    theme: "cave",
    mission: "倒れている訓練教官を救助する",
    events: {
      downedNpcFloor: 3,
    },
    fov: {
      corridorRadius: Number.POSITIVE_INFINITY,
      corridorMax: Number.POSITIVE_INFINITY,
      roomPadding: Number.POSITIVE_INFINITY,
    },
  },
};

export const DEFAULT_DISCOVERY_FOV = {
  corridorRadius: 2,
  corridorMax: 3,
  roomPadding: 1,
};
