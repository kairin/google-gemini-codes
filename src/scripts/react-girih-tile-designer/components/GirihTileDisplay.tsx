
import React from 'react';
import { GirihTileType, GirihTileDefinition } from '../types';
import { GIRIH_TILE_DEFINITIONS, TILE_TOOLBAR_DISPLAY_SIZE, TILE_CANVAS_DISPLAY_SIZE } from '../constants';

interface GirihTileDisplayProps {
  type: GirihTileType;
  color?: string;
  rotation?: number;
  isToolbarButton?: boolean;
  onClick?: () => void;
  svgTransform?: string; // For positioning on SVG canvas, e.g., "translate(x y)"
  isSelected?: boolean;
}

export const GirihTileDisplay: React.FC<GirihTileDisplayProps> = ({
  type,
  color,
  rotation = 0,
  isToolbarButton = false,
  onClick,
  svgTransform,
  isSelected,
}) => {
  const definition = GIRIH_TILE_DEFINITIONS[type];
  if (!definition) return null;

  const displaySize = isToolbarButton ? TILE_TOOLBAR_DISPLAY_SIZE : TILE_CANVAS_DISPLAY_SIZE;
  const baseStrokeWidth = 2.5; // Desired visual stroke width in pixels

  let scale: number;
  let strokeWidthForPath: number;

  if (isToolbarButton) {
    const desiredViewBoxFillFactor = 0.9; // Icon aims to fill 90% of the viewBox
    const viewBoxUniversalWidth = 200;    // From hardcoded viewBox="-100 -100 200 200"
    const viewBoxUniversalHeight = 200;

    // Calculate CSS scale factor to make intrinsic path fill the viewBox appropriately
    const scaleX = (viewBoxUniversalWidth * desiredViewBoxFillFactor) / definition.intrinsicWidth;
    const scaleY = (viewBoxUniversalHeight * desiredViewBoxFillFactor) / definition.intrinsicHeight;
    scale = Math.min(scaleX, scaleY);

    // With vector-effect="non-scaling-stroke", strokeWidth is in user units.
    // User units for toolbar SVG are viewBox units scaled to displaySize.
    // 1 user unit = displaySize / viewBoxWidth screen pixels.
    // We want final_stroke_px = baseStrokeWidth.
    // strokeValueInUserUnits * (displaySize / viewBoxWidth) = baseStrokeWidth
    // strokeValueInUserUnits = baseStrokeWidth * viewBoxWidth / displaySize
    strokeWidthForPath = baseStrokeWidth * viewBoxUniversalWidth / TILE_TOOLBAR_DISPLAY_SIZE;
  } else {
    // Canvas tiles: CSS scale directly maps intrinsic to pixels (approx, as no outer viewBox).
    const scaleToFitWidth = TILE_CANVAS_DISPLAY_SIZE / definition.intrinsicWidth;
    const scaleToFitHeight = TILE_CANVAS_DISPLAY_SIZE / definition.intrinsicHeight;
    // This scale is the factor from intrinsic units to ~screen pixels
    scale = Math.min(scaleToFitWidth, scaleToFitHeight); // Removed * 0.9 for better preset fitting

    // With vector-effect="non-scaling-stroke", and CSS transform on path,
    // stroke width is relative to coordinate system before CSS transform.
    // So, if we want baseStrokeWidth pixels, and path is scaled by 'scale',
    // strokeWidth attribute should be baseStrokeWidth / scale (in intrinsic units).
    // However, with vector-effect, it's simpler: it's in parent coordinate system (pixels for canvas).
    strokeWidthForPath = baseStrokeWidth;
  }

  const effectiveColor = color || definition.defaultColor;
  const strokeColor = isSelected && isToolbarButton ? '#FFFFFF' : '#1f2937';

  const pathElement = (
    <path
      d={definition.svgPath}
      fill={effectiveColor}
      stroke={strokeColor}
      strokeWidth={strokeWidthForPath}
      vectorEffect="non-scaling-stroke" // Crucial for consistent stroke independent of CSS scale
      transform-origin="0 0" 
      style={{ transform: `scale(${scale}) rotate(${rotation}deg)` }}
    />
  );

  if (isToolbarButton) {
    return (
      <button
        title={definition.name}
        onClick={onClick}
        className={`p-2 rounded-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-400
                    ${isSelected ? 'bg-sky-500 shadow-lg ring-2 ring-sky-300' : 'bg-slate-600 hover:bg-slate-500'}`}
      >
        <svg
          viewBox="-100 -100 200 200" 
          width={displaySize}
          height={displaySize}
          className="overflow-visible" 
        >
          {pathElement}
        </svg>
      </button>
    );
  }

  return (
    <g transform={svgTransform} style={{ pointerEvents: 'none' }}>
      {pathElement}
    </g>
  );
};
