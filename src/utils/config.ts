import type { ShapeType } from "../types/shapes";

export const SHAPE_LIMITS: Record<ShapeType, number> = {
  polygon: 10,
  rectangle: 5,
  circle: 5,
  line: 20,
};
