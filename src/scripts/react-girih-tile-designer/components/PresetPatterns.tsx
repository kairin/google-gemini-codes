
import React from 'react';
import { PRESET_PATTERNS, PresetTileData } from '../constants';

interface PresetPatternsProps {
  onLoadPreset: (tiles: PresetTileData[]) => void;
}

export const PresetPatterns: React.FC<PresetPatternsProps> = ({ onLoadPreset }) => {
  return (
    <div className="w-full max-w-6xl mt-6 p-4 bg-slate-700 shadow-xl rounded-lg">
      <h2 className="text-2xl font-semibold text-sky-300 mb-4 text-center">Preset Patterns</h2>
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
        {Object.entries(PRESET_PATTERNS).map(([key, preset]) => (
          <button
            key={key}
            onClick={() => onLoadPreset(preset.tiles)}
            title={`Load ${preset.name} pattern`}
            className="px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded-lg text-white transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            {preset.name}
          </button>
        ))}
      </div>
    </div>
  );
};