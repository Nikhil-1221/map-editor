import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import type { LatLngExpression } from "leaflet";

import { SHAPE_LIMITS } from "../utils/config";
import type { ShapeItem, ShapeType } from "../types/shapes";
import * as L from "leaflet";
import * as turf from "@turf/turf";
import { normalizeToPolygon, processNewPolygon } from "../utils/geoUtils";

import ExportButton from "./ExportButton";


const MapView = () => {
  const [shapes, setShapes] = useState<ShapeItem[]>([]);

  const onCreated = (e: any) => {
  const layer = e.layer;
  const leafletType: string = e.layerType;

  let shapeType: ShapeType;

  if (leafletType === "polyline") {
    shapeType = "line";
  } else if (leafletType === "rectangle") {
    shapeType = "rectangle";
  } else if (leafletType === "circle") {
    shapeType = "circle";
  } else {
    shapeType = "polygon";
  }

  // Limit check
  const currentCount = shapes.filter((s) => s.type === shapeType).length;
  if (currentCount >= SHAPE_LIMITS[shapeType]) {
    alert(`Limit reached for ${shapeType}!`);
    layer.remove();
    return;
  }

  let geojson: any;

// If circle → convert to polygon using Turf
if (layer instanceof L.Circle) {
  const center = layer.getLatLng();
  const radius = layer.getRadius(); // meters

  const circlePoly = turf.circle(
    [center.lng, center.lat],
    radius / 1000,
    { steps: 64, units: "kilometers" }
  );

  geojson = circlePoly;
} else {
  geojson = layer.toGeoJSON();
}


  // Overlap rules only for polygon, rectangle, circle
  if (shapeType !== "line") {
    try {
      const newPoly = normalizeToPolygon(geojson);

      const existingPolys = shapes
        .filter((s) => s.type !== "line")
        .map((s) => normalizeToPolygon(s.geojson));

      const processed = processNewPolygon(newPoly, existingPolys);

      if (!processed) {
        alert("Shape fully overlaps existing shape. Not allowed.");
        layer.remove();
        return;
      }

      // Replace geometry with trimmed one
      geojson.geometry = processed.geometry;

    } catch (err: any) {
      alert(err.message || "Invalid shape");
      layer.remove();
      return;
    }
  }

  const newShape: ShapeItem = {
    id: crypto.randomUUID(),
    type: shapeType,
    geojson: geojson,
  };

  setShapes((prev) => [...prev, newShape]);

  console.log("All Shapes:", [...shapes, newShape]);
};

  const center: LatLngExpression = [28.6139, 77.209];

  return (
     <div style={{ width: "100%", height: "100%", position: "relative" }}>
    <ExportButton shapes={shapes} />

    <MapContainer
      center={center}
      zoom={5}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={onCreated}
          draw={{
            rectangle: true,
            polygon: true,
            circle: true,
            polyline: true,
            marker: false,
            circlemarker: false,
          }}
        />
      </FeatureGroup>
    </MapContainer>
     </div>
  );
};

export default MapView;
