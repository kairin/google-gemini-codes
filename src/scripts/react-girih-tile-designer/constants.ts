
import { GirihTileType, GirihTileDefinition } from './types';

export const TILE_TOOLBAR_DISPLAY_SIZE = 50;
export const TILE_CANVAS_DISPLAY_SIZE = 80;
export const TILE_ROTATION_STEP = 36; // Common rotation for Girih patterns (360 / 10)

export const GIRIH_TILE_DEFINITIONS: Record<GirihTileType, GirihTileDefinition> = {
  [GirihTileType.Decagon]: {
    name: 'Decagon',
    svgPath: "M25,-76.94208526611328L65.4508501291275,-47.552823066711426L80.90170200000637,0.000002558634037086449L65.4508528464005,47.552829159344014L25.000004199993015,76.94209384838882L-24.999996239723174,76.94209673407326L-65.45084842075129,47.55283661078049L-80.90170217195892,0.000011458965673227794L-65.45085662692233,-47.552816451664704L-25.000009320939867,-76.94208373373591Z",
    defaultColor: '#06b6d4', // Tailwind cyan-500
    intrinsicWidth: 162,
    intrinsicHeight: 154,
  },
  [GirihTileType.ElongatedHexagon]: {
    name: 'Elongated Hexagon',
    svgPath: "M52.95085144042969,-38.47104263305664L37.500001311302185,9.08178436756134L-2.950849168395912,38.47104821895604L-52.95085059891701,38.47104934938612L-37.50000110283708,-9.08177936106042L2.9508498697267598,-38.47104496783153Z",
    defaultColor: '#22c55e', // Tailwind green-500
    intrinsicWidth: 106,
    intrinsicHeight: 77,
  },
  [GirihTileType.BowTie]: {
    name: 'Bow-Tie',
    svgPath: "M52.95084762573242,-9.081780433654785L37.49999749660492,38.471046566963196L-2.950854224153943,9.081782438848151L-52.95085682136643,9.081781814023817L-37.50000529541284,-38.47104746360874L2.950848159272624,-9.081781303396891Z",
    defaultColor: '#ec4899', // Tailwind pink-500
    intrinsicWidth: 106,
    intrinsicHeight: 77,
  },
  [GirihTileType.Rhombus]: {
    name: 'Rhombus',
    svgPath: "M32.725425720214844,-23.776412963867188L17.27457559108734,23.776414036750793L-32.725426918181896,23.776414036750793L-17.274576013647533,-23.776415350324108Z",
    defaultColor: '#3b82f6', // Tailwind blue-500
    intrinsicWidth: 66,
    intrinsicHeight: 48,
  },
  [GirihTileType.Pentagon]: {
    name: 'Pentagon',
    svgPath: "M25,-38.47104263305664L40.4508501291275,9.08178436756134L-0.0000015916313200428111,38.471048495676385L-40.4508543974859,9.081783726555429L-25.00000321863169,-38.47104689058853Z",
    defaultColor: '#facc15', // Tailwind yellow-400
    intrinsicWidth: 81,
    intrinsicHeight: 77,
  },
};

export interface PresetTileData {
  type: GirihTileType;
  x: number;
  y: number;
  rotation: number;
}

export interface PresetPattern {
  name: string;
  tiles: PresetTileData[];
}

const CANVAS_CENTER_X = 350;
const CANVAS_CENTER_Y = 280; // Slightly adjusted for canvas height variations

// Approximate distances from center of tile to midpoint of a connecting edge
const DECAGON_APOTHEM = 76.94; 
const ELONGATED_HEXAGON_CONTACT_RADIUS = 29.38;
const BOWTIE_CONTACT_RADIUS = 29.38;
const PENTAGON_CONTACT_RADIUS = 31.21;
// const RHOMBUS_CONTACT_RADIUS = 25.0; // Not used in current complex presets, but good to have

const centralDecagonStarTiles: PresetTileData[] = [
  { type: GirihTileType.Decagon, x: CANVAS_CENTER_X, y: CANVAS_CENTER_Y, rotation: 0 },
];
for (let i = 0; i < 10; i++) {
  const angleDeg = i * 36;
  const angleRad = angleDeg * Math.PI / 180;

  const hexPlacementOffset = DECAGON_APOTHEM + ELONGATED_HEXAGON_CONTACT_RADIUS;
  centralDecagonStarTiles.push({
    type: GirihTileType.ElongatedHexagon,
    x: CANVAS_CENTER_X + hexPlacementOffset * Math.cos(angleRad),
    y: CANVAS_CENTER_Y + hexPlacementOffset * Math.sin(angleRad),
    rotation: angleDeg,
  });

  const bowtiePlacementOffset = DECAGON_APOTHEM + (2 * ELONGATED_HEXAGON_CONTACT_RADIUS) + BOWTIE_CONTACT_RADIUS;
  centralDecagonStarTiles.push({
    type: GirihTileType.BowTie,
    x: CANVAS_CENTER_X + bowtiePlacementOffset * Math.cos(angleRad),
    y: CANVAS_CENTER_Y + bowtiePlacementOffset * Math.sin(angleRad),
    rotation: angleDeg,
  });
}

const pentagonalStarBurstTiles: PresetTileData[] = [
  { type: GirihTileType.Decagon, x: CANVAS_CENTER_X, y: CANVAS_CENTER_Y, rotation: 0 },
];
for (let i = 0; i < 5; i++) {
  const angleDegPent = i * 72;
  const angleRadPent = angleDegPent * Math.PI / 180;
  const pentOffset = DECAGON_APOTHEM + PENTAGON_CONTACT_RADIUS;
  pentagonalStarBurstTiles.push({
    type: GirihTileType.Pentagon,
    x: CANVAS_CENTER_X + pentOffset * Math.cos(angleRadPent),
    y: CANVAS_CENTER_Y + pentOffset * Math.sin(angleRadPent),
    rotation: angleDegPent,
  });

  const angleDegBow = 36 + (i * 72);
  const angleRadBow = angleDegBow * Math.PI / 180;
  const bowtieOffset = DECAGON_APOTHEM + BOWTIE_CONTACT_RADIUS;
  pentagonalStarBurstTiles.push({
    type: GirihTileType.BowTie,
    x: CANVAS_CENTER_X + bowtieOffset * Math.cos(angleRadBow),
    y: CANVAS_CENTER_Y + bowtieOffset * Math.sin(angleRadBow),
    rotation: angleDegBow,
  });
}

const rhombusGridTiles: PresetTileData[] = [
  { type: GirihTileType.Rhombus, x: CANVAS_CENTER_X - GIRIH_TILE_DEFINITIONS.Rhombus.intrinsicWidth / 2, y: CANVAS_CENTER_Y - GIRIH_TILE_DEFINITIONS.Rhombus.intrinsicHeight / 2, rotation: 0 },
  { type: GirihTileType.Rhombus, x: CANVAS_CENTER_X + GIRIH_TILE_DEFINITIONS.Rhombus.intrinsicWidth / 2, y: CANVAS_CENTER_Y - GIRIH_TILE_DEFINITIONS.Rhombus.intrinsicHeight / 2, rotation: 0 },
  { type: GirihTileType.Rhombus, x: CANVAS_CENTER_X - GIRIH_TILE_DEFINITIONS.Rhombus.intrinsicWidth / 2, y: CANVAS_CENTER_Y + GIRIH_TILE_DEFINITIONS.Rhombus.intrinsicHeight / 2, rotation: 0 },
  { type: GirihTileType.Rhombus, x: CANVAS_CENTER_X + GIRIH_TILE_DEFINITIONS.Rhombus.intrinsicWidth / 2, y: CANVAS_CENTER_Y + GIRIH_TILE_DEFINITIONS.Rhombus.intrinsicHeight / 2, rotation: 0 },
];


export const PRESET_PATTERNS: Record<string, PresetPattern> = {
  rhombusGrid: {
    name: "Rhombus Grid (2x2)",
    tiles: rhombusGridTiles,
  },
  decagonCluster: {
    name: "Simple Cluster",
    tiles: [
      { type: GirihTileType.Decagon, x: CANVAS_CENTER_X, y: CANVAS_CENTER_Y - 50, rotation: 0 },
      { type: GirihTileType.Pentagon, x: CANVAS_CENTER_X + 60, y: CANVAS_CENTER_Y - 120, rotation: 18 },
      { type: GirihTileType.Pentagon, x: CANVAS_CENTER_X - 60, y: CANVAS_CENTER_Y - 120, rotation: -18 },
      { type: GirihTileType.BowTie, x: CANVAS_CENTER_X + 115, y: CANVAS_CENTER_Y - 35, rotation: 90 },
    ],
  },
  rhombusLine: {
    name: "Rhombus Line",
    tiles: [
      { type: GirihTileType.Rhombus, x: CANVAS_CENTER_X - 60, y: CANVAS_CENTER_Y + 50, rotation: 0 },
      { type: GirihTileType.Rhombus, x: CANVAS_CENTER_X, y: CANVAS_CENTER_Y + 50, rotation: 0 },
      { type: GirihTileType.Rhombus, x: CANVAS_CENTER_X + 60, y: CANVAS_CENTER_Y + 50, rotation: 0 },
    ],
  },
  hexagonFlower: {
    name: "Hexagon Flower",
    tiles: [
        { type: GirihTileType.ElongatedHexagon, x: CANVAS_CENTER_X, y: CANVAS_CENTER_Y, rotation: 0 },
        { type: GirihTileType.ElongatedHexagon, x: CANVAS_CENTER_X + 70, y: CANVAS_CENTER_Y - 40, rotation: 60 },
        { type: GirihTileType.ElongatedHexagon, x: CANVAS_CENTER_X + 70, y: CANVAS_CENTER_Y + 40, rotation: 120 },
        { type: GirihTileType.ElongatedHexagon, x: CANVAS_CENTER_X, y: CANVAS_CENTER_Y + 80, rotation: 180 },
        { type: GirihTileType.ElongatedHexagon, x: CANVAS_CENTER_X - 70, y: CANVAS_CENTER_Y + 40, rotation: 240 },
        { type: GirihTileType.ElongatedHexagon, x: CANVAS_CENTER_X - 70, y: CANVAS_CENTER_Y - 40, rotation: 300 },
    ]
  },
  pentagonalStarBurst: {
    name: "Pentagonal Starburst",
    tiles: pentagonalStarBurstTiles,
  },
  centralDecagonStar: {
    name: "Central Decagon Star",
    tiles: centralDecagonStarTiles,
  }
};
