export type ShapeType = "polygon" | "rectangle" | "circle" | "line";

export interface ShapeItem {
  id: string;
  type: ShapeType;
  geojson: GeoJSON.Feature;
}
