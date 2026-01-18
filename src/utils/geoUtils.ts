import * as turf from "@turf/turf";
import type { Feature, Polygon, MultiPolygon } from "geojson";

// Convert circle to polygon (Leaflet circle is not real polygon)
export function normalizeToPolygon(
  feature: Feature
): Feature<Polygon | MultiPolygon> {
  if (
    feature.geometry.type === "Polygon" ||
    feature.geometry.type === "MultiPolygon"
  ) {
    return feature as Feature<Polygon | MultiPolygon>;
  }

  throw new Error("Only polygonal geometries are supported");
}


// Main overlap processing function
export function processNewPolygon(
  newFeature: Feature<Polygon | MultiPolygon>,
  existing: Feature<Polygon | MultiPolygon>[]
): Feature<Polygon | MultiPolygon> | null {
  let finalFeature: Feature<Polygon | MultiPolygon> = newFeature;

  for (const old of existing) {
    //If new fully contains old → BLOCK
    if (turf.booleanContains(finalFeature, old)) {
      throw new Error("New shape cannot fully enclose existing shape");
    }

    //If intersects → CUT
    if (turf.booleanIntersects(finalFeature, old)) {
      const diff = turf.difference(
        turf.featureCollection([finalFeature, old])
      );

      if (!diff) {
        return null;
      }

      finalFeature = diff as Feature<Polygon | MultiPolygon>;
    }
  }

  return finalFeature;
}

