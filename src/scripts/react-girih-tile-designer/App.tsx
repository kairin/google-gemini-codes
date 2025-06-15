
import React, { useState, useCallback } from 'react';
import { Toolbar } from './components/Toolbar';
import { Canvas } from './components/Canvas';
import { PresetPatterns } from './components/PresetPatterns';
import { GirihTileType, PlacedTile } from './types';
import { GIRIH_TILE_DEFINITIONS, TILE_ROTATION_STEP, PresetTileData } from './constants';

const App: React.FC = () => {
  const [selectedTileType, setSelectedTileType] = useState<GirihTileType | null>(null);
  const [placedTiles, setPlacedTiles] = useState<PlacedTile[]>([]);
  const [currentRotation, setCurrentRotation] = useState<number>(0);

  const handleSelectTile = useCallback((type: GirihTileType) => {
    setSelectedTileType(prevType => (prevType === type ? null : type));
  }, []);

  const handlePlaceTile = useCallback((x: number, y: number) => {
    if (selectedTileType) {
      const definition = GIRIH_TILE_DEFINITIONS[selectedTileType];
      const newTile: PlacedTile = {
        id: Date.now().toString() + Math.random().toString(), // Simple unique ID
        type: selectedTileType,
        x,
        y,
        rotation: currentRotation,
        color: definition.defaultColor,
      };
      setPlacedTiles(prevTiles => [...prevTiles, newTile]);
    }
  }, [selectedTileType, currentRotation]);

  const handleRotate = useCallback(() => {
    setCurrentRotation(prevRotation => (prevRotation + TILE_ROTATION_STEP) % 360);
  }, []);

  const handleClearCanvas = useCallback(() => {
    setPlacedTiles([]);
    setSelectedTileType(null);
    setCurrentRotation(0);
  }, []);

  const handleLoadPreset = useCallback((presetTilesData: PresetTileData[]) => {
    handleClearCanvas(); // Clear existing tiles and selections

    const newTiles: PlacedTile[] = presetTilesData.map((tileData, index) => {
      const definition = GIRIH_TILE_DEFINITIONS[tileData.type];
      return {
        id: `preset-${Date.now()}-${index}`, // Unique ID for preset tiles
        type: tileData.type,
        x: tileData.x,
        y: tileData.y,
        rotation: tileData.rotation,
        color: definition.defaultColor,
      };
    });
    setPlacedTiles(newTiles);
  }, [handleClearCanvas]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-800 text-white p-4 font-sans">
      <header className="w-full max-w-6xl mb-6 text-center">
        <h1 className="text-4xl font-bold text-sky-400">Girih Tile Designer</h1>
        <p className="text-slate-300 mt-2">Click a tile to select, click canvas to place. Use rotate button before placing, or load a preset pattern below.</p>
      </header>
      <div className="w-full max-w-6xl bg-slate-700 shadow-2xl rounded-lg overflow-hidden">
        <Toolbar
          selectedTileType={selectedTileType}
          onSelectTile={handleSelectTile}
          onRotate={handleRotate}
          currentRotation={currentRotation}
          onClearCanvas={handleClearCanvas}
        />
        <Canvas
          placedTiles={placedTiles}
          onPlaceTile={handlePlaceTile}
          selectedTileType={selectedTileType}
          currentRotation={currentRotation}
        />
      </div>
      <PresetPatterns onLoadPreset={handleLoadPreset} />
      <footer className="mt-8 text-sm text-slate-400">
        Inspired by Girih Designer. Built with React, TypeScript, and Tailwind CSS.
      </footer>
    </div>
  );
};

export default App;