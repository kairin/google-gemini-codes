
import React from 'react';
import { GirihTileType } from '../types';
import { GirihTileDisplay } from './GirihTileDisplay';
import { GIRIH_TILE_DEFINITIONS } from '../constants';
import { RotateCcwIcon, Trash2Icon } from './icons/ActionIcons';


interface ToolbarProps {
  selectedTileType: GirihTileType | null;
  onSelectTile: (type: GirihTileType) => void;
  onRotate: () => void;
  currentRotation: number;
  onClearCanvas: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  selectedTileType,
  onSelectTile,
  onRotate,
  currentRotation,
  onClearCanvas,
}) => {
  return (
    <div className="bg-slate-900 p-4 flex flex-wrap items-center justify-center gap-3 md:gap-4 shadow-md">
      {Object.values(GirihTileType).map(tileType => (
        <GirihTileDisplay
          key={tileType}
          type={tileType}
          isToolbarButton={true}
          onClick={() => onSelectTile(tileType)}
          isSelected={selectedTileType === tileType}
        />
      ))}
      <div className="h-12 w-px bg-slate-700 mx-2 hidden md:block"></div>
      <button
        onClick={onRotate}
        title={`Rotate (Current: ${currentRotation}°)`}
        className="p-3 bg-slate-600 hover:bg-slate-500 rounded-lg text-white transition-colors duration-150 ease-in-out flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
      >
        <RotateCcwIcon className="w-18 h-18" />
        <span className="hidden sm:inline">{currentRotation}°</span>
      </button>
      <button
        onClick={onClearCanvas}
        title="Clear Canvas"
        className="p-3 bg-red-600 hover:bg-red-500 rounded-lg text-white transition-colors duration-150 ease-in-out flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        <Trash2Icon className="w-18 h-18" />
         <span className="hidden sm:inline">Clear</span>
      </button>
    </div>
  );
};