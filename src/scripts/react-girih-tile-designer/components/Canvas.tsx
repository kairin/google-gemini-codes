
import React, { useRef, useState, useCallback } from 'react';
import { PlacedTile, GirihTileType } from '../types';
import { GirihTileDisplay } from './GirihTileDisplay';

interface CanvasProps {
  placedTiles: PlacedTile[];
  onPlaceTile: (x: number, y: number) => void;
  selectedTileType: GirihTileType | null;
  currentRotation: number;
}

export const Canvas: React.FC<CanvasProps> = ({
  placedTiles,
  onPlaceTile,
  selectedTileType,
  currentRotation,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  const getSVGCoordinates = useCallback((event: React.MouseEvent<SVGSVGElement>): { x: number; y: number } | null => {
    if (svgRef.current) {
      const svgPoint = svgRef.current.createSVGPoint();
      svgPoint.x = event.clientX;
      svgPoint.y = event.clientY;
      const screenCTM = svgRef.current.getScreenCTM();
      if (screenCTM) {
        const transformedPoint = svgPoint.matrixTransform(screenCTM.inverse());
        return { x: transformedPoint.x, y: transformedPoint.y };
      }
    }
    return null;
  }, []);


  const handleMouseMove = useCallback((event: React.MouseEvent<SVGSVGElement>) => {
    if (selectedTileType) {
      const coords = getSVGCoordinates(event);
      if (coords) {
        setMousePos(coords);
      }
    } else {
      setMousePos(null); // Clear mouse position if no tile is selected
    }
  }, [selectedTileType, getSVGCoordinates]);

  const handleClick = useCallback((event: React.MouseEvent<SVGSVGElement>) => {
    if (selectedTileType) {
      const coords = getSVGCoordinates(event);
      if (coords) {
        onPlaceTile(coords.x, coords.y);
      }
    }
  }, [selectedTileType, onPlaceTile, getSVGCoordinates]);

  const handleMouseLeave = useCallback(() => {
    setMousePos(null);
  }, []);

  return (
    <div className="flex-grow bg-slate-800 relative cursor-crosshair" style={{ minHeight: '60vh', maxHeight: 'calc(100vh - 250px)' }}>
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        className="absolute top-0 left-0"
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Optional: Background grid */}
        <defs>
          <pattern id="gridpattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(100, 116, 139, 0.5)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#gridpattern)" />

        {/* Placed Tiles */}
        {placedTiles.map(tile => (
          <GirihTileDisplay
            key={tile.id}
            type={tile.type}
            color={tile.color}
            rotation={tile.rotation}
            svgTransform={`translate(${tile.x} ${tile.y})`}
          />
        ))}

        {/* Ghost Tile for preview */}
        {selectedTileType && mousePos && (
          <g opacity="0.6" style={{ pointerEvents: 'none' }}>
            <GirihTileDisplay
              type={selectedTileType}
              rotation={currentRotation}
              svgTransform={`translate(${mousePos.x} ${mousePos.y})`}
            />
          </g>
        )}
      </svg>
    </div>
  );
};