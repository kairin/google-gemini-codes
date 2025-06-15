
export enum GirihTileType {
  Decagon = 'Decagon',
  ElongatedHexagon = 'ElongatedHexagon',
  BowTie = 'BowTie',
  Rhombus = 'Rhombus',
  Pentagon = 'Pentagon',
}

export interface GirihTileDefinition {
  name: string;
  svgPath: string;
  defaultColor: string;
  intrinsicWidth: number;
  intrinsicHeight: number;
}

export interface PlacedTile {
  id: string;
  type: GirihTileType;
  x: number;
  y: number;
  rotation: number;
  color: string;
}