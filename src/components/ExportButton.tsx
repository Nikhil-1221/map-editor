import type { ShapeItem } from "../types/shapes";

type Props = {
  shapes: ShapeItem[];
};

const ExportButton = ({ shapes }: Props) => {
  const handleExport = () => {
    if (shapes.length === 0) {
      alert("No shapes to export!");
      return;
    }

    const geojson = {
      type: "FeatureCollection",
      features: shapes.map((s) => ({
        ...s.geojson,
        properties: {
          ...(s.geojson.properties || {}),
          shapeType: s.type,
          id: s.id,
        },
      })),
    };

    const blob = new Blob([JSON.stringify(geojson, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "shapes.geojson";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      style={{
        position: "absolute",
        top: 10,
        left: 10,
        zIndex: 1000,
        padding: "10px 16px",
        background: "#2563eb",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      📤 Export GeoJSON
    </button>
  );
};

export default ExportButton;
