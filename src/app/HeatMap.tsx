"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";

// Define the type for a single data point
type HeatmapDataPoint = [number, number, number];

// Initialize the data array with type annotations
const data: HeatmapDataPoint[] = [];

// Function to generate random heatmap data points
function demoData(): HeatmapDataPoint {
  const minLat = 29.5826;
  const maxLat = 29.7306;
  const minLong = -82.4038;
  const maxLong = -82.2458;

  const randLat = Math.random() * (maxLat - minLat) + minLat;
  const randLong = Math.random() * (maxLong - minLong) + minLong;
  const randSev = Math.random() * 11;

  return [randLat, randLong, randSev];
}

// Generate 100 random data points
for (let i = 0; i < 1000; i++) {
  data.push(demoData());
}

// Main HeatMap component
const HeatMap: React.FC = () => {
  return (
    <MapContainer
      center={[29.6516, -82.3248]}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <HeatmapLayer data={data} />
    </MapContainer>
  );
};

// HeatmapLayer component that adds the heat layer to the map
interface HeatmapLayerProps {
  data: HeatmapDataPoint[];
}

const HeatmapLayer: React.FC<HeatmapLayerProps> = ({ data }) => {
  const map = useMap();

  useEffect(() => {
    // Create and add the heatmap layer
    const heatLayer = L.heatLayer(data, {
      radius: 17,
      blur: 10,
      maxZoom: 17,
      max: 1,
    }).addTo(map);

    // Cleanup: remove the heat layer when the component unmounts
    return () => {
      map.removeLayer(heatLayer);
    };
  }, [data, map]);

  return null; // This component only adds the heatmap layer, no visible elements
};

export default HeatMap;
