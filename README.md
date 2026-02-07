map-editor/
```
map-editor
 ├── src/
 │   ├── components/
 │   │   ├── MapView.tsx
 │   │   ├── ExportButton.tsx
 │   │
 │   ├── utils/
 │   │   ├── geoUtils.ts
 │   │   ├── config.ts
 │   │
 │   ├── types/
 │   │   └── shapes.ts
 │   │
 │   ├── App.tsx
 │   ├── main.tsx
 │   └── index.css
 │
 ├── package.json
 ├── tsconfig.json
 ├── vite.config.ts
 └── README.md
```

# 🗺️ Web GIS Drawing Tool (React + TypeScript + Leaflet)

This is a web-based GIS drawing application built using **React, TypeScript, Leaflet, and Turf.js**.

Users can draw geometrical features on an OpenStreetMap base layer and export them as **GeoJSON**.

---

## 🚀 Features

- 🗺️ OpenStreetMap base layer (free tiles)
- ✏️ Draw:
  - Polygon
  - Rectangle
  - Circle
  - LineString
- 🚫 Non-overlapping rule for:
  - Polygon
  - Rectangle
  - Circle
- ✂️ Auto-trimming of overlapping shapes using Turf.js
- ❌ Blocks shape if it fully encloses another shape
- ➖ Lines can overlap freely
- 🔢 Dynamic shape limits (config-based)
- 📤 Export all shapes as GeoJSON file

---

## 🧱 Tech Stack

- React + TypeScript
- Leaflet + React-Leaflet
- Leaflet Draw
- Turf.js (for spatial operations)
- Vite

---

## ⚙️ Setup & Run

```bash
npm install
npm run dev



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
