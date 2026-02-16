import React, { useCallback, useRef } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
} from 'react-simple-maps';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";


// Country code mappings for the Study Abroad countries
const countryMappings: Record<string, string[]> = {
  'USA': ['840'], // United States
  'UK': ['826'], // United Kingdom 
  'Canada': ['124'], // Canada
  'Australia': ['036'], // Australia
  'Germany': ['276'], // Germany
  'Ireland': ['372'], // Ireland
  'New Zealand': ['554'], // New Zealand
  'Singapore': ['702'], // Singapore
  'India': ['356'], // India
};

interface InteractiveWorldMapProps {
  hoveredCountry: string | null;
  onCountryHover?: (countryName: string | null) => void;
  tooltip?: { x: number; y: number; country: string } | null;
}

const InteractiveWorldMap: React.FC<InteractiveWorldMapProps> = ({
  hoveredCountry,
  onCountryHover,
  tooltip
}) => {
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCountryHover = useCallback((countryName: string | null) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    hoverTimeoutRef.current = setTimeout(() => {
      if (onCountryHover) {
        onCountryHover(countryName);
      }
    }, 50); // Small debounce to prevent rapid firing
  }, [onCountryHover]);
  const getCountryStyle = (geo: any) => {
    const countryCode = geo.id;
    const isHighlighted = hoveredCountry &&
      countryMappings[hoveredCountry]?.includes(countryCode);

    return {
      default: {
        fill: isHighlighted ? "#00C798" : "#E5E7EB",
        stroke: "#D1D5DB",
        strokeWidth: 0.5,
        outline: "none",
        transition: "all 0.3s ease",
      },
      hover: {
        fill: isHighlighted ? "#009c7a" : "#D1D5DB",
        stroke: "#9CA3AF",
        strokeWidth: 1,
        outline: "none",
        cursor: "pointer",
        transition: "all 0.3s ease",
      },
      pressed: {
        fill: isHighlighted ? "#009c7a" : "#D1D5DB",
        stroke: "#9CA3AF",
        strokeWidth: 1,
        outline: "none",
      },
    };
  };

  return (
    <div className="w-full h-full relative">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 120,
          center: [20, 20],
        }}
        width={800}
        height={400}
        style={{ width: "100%", height: "100%" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryCode = geo.id;
              const isHighlighted = hoveredCountry &&
                countryMappings[hoveredCountry]?.includes(countryCode);

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={getCountryStyle(geo)}
                  className={isHighlighted ? "drop-shadow-lg" : ""}
                  onMouseEnter={() => {
                    const countryName = geo.properties?.NAME || geo.properties?.name || 'Unknown';
                    handleCountryHover(countryName);
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {/* Highlight glow effect for hovered country */}
      {hoveredCountry && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-radial from-[#00C798]/20 to-transparent animate-pulse rounded-xl"></div>
        </div>
      )}

      {/* Tooltip for countries not in the list */}
      {tooltip && (
        <div
          className="absolute bg-black/80 text-white px-3 py-2 rounded-lg text-sm font-medium pointer-events-none z-50 shadow-lg"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translate(-50%, -100%)'
          }}
        >
          {tooltip.country}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
        </div>
      )}

      {/* Legend */}
      {/* <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-2 shadow-md">
        <div className="flex items-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-200 rounded border"></div>
            <span className="text-gray-600">Countries</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#00C798] rounded border shadow-sm"></div>
            <span className="text-gray-700 font-medium">Study Destinations</span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default InteractiveWorldMap;