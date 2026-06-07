# 🌌 Star Wars Databank

A minimalist Star Wars Databank built with React, inspired by the official [starwars.com/databank](https://www.starwars.com/databank). Browse characters, vehicles and planets from the Star Wars universe with a futuristic dark aesthetic.

Built as a 4Geeks Academy project by [Toro Development](https://www.torodevelop.com).

---

## 🚀 Live Features

- **Browse** characters, vehicles and planets from the SWAPI
- **Detail pages** with full info for each entry
- **Favorites** system — save any item and access it from the navbar dropdown
- **Search** with autocomplete across all 3 categories + keyboard navigation (↑ ↓ Enter Esc)
- **localStorage cache** — data is fetched once and persisted, no repeated API calls on refresh
- **Responsive** design with hamburger menu on mobile
- **Futuristic UI** — Orbitron font, Star Wars yellow palette, animated star field background

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite | Build tool |
| React Router v6 | Client-side routing |
| useReducer + Context API | Global state (StoreProvider + useGlobalReducer hook) |
| SWAPI.tech | Star Wars data API |
| starwars-visualguide.com | Character/vehicle/planet images |
| placehold.co | Image fallback |
| Google Fonts (Orbitron + Rajdhani) | Typography |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Card.jsx          # Reusable card for people/vehicles/planets
│   ├── Footer.jsx        # Star Wars themed footer
│   ├── Navbar.jsx        # Navbar with favorites dropdown + search
│   ├── ScrollToTop.jsx   # Scroll to top on route change
│   ├── SearchBar.jsx     # Autocomplete search with keyboard nav
│   └── StarField.jsx     # Animated canvas star background
├── hooks/
│   ├── useActions.jsx    # All fetch logic + dispatch actions
│   └── useGlobalReducer.jsx  # Context + useReducer setup
├── pages/
│   ├── CategoryList.jsx  # Full list page (people/vehicles/planets)
│   ├── Home.jsx          # Landing page with section previews
│   ├── Layout.jsx        # Base layout with Navbar + Footer + Outlet
│   ├── Single.jsx        # (boilerplate default)
│   └── SingleDetail.jsx  # Detail page for individual entries
├── store.js              # Reducer, initialStore, localStorage persistence
├── routes.jsx            # React Router configuration
├── main.jsx              # App entry point
└── index.css             # Global styles
```

---

## 🗃️ State Management

Global state lives in `store.js` using the `useReducer` pattern:

```js
store: {
  people:    [],   // array of character objects from SWAPI
  vehicles:  [],   // array of vehicle objects from SWAPI
  planets:   [],   // array of planet objects from SWAPI
  favorites: [],   // saved items (each has an extra .type field)
  loading:   bool,
}
```

### Available actions (via `useActions.jsx`)

| Action | Description |
|--------|-------------|
| `loadAll()` | Fetches all 3 categories in parallel |
| `loadPeople()` | Fetches 20 characters from SWAPI |
| `loadVehicles()` | Fetches 20 vehicles from SWAPI |
| `loadPlanets()` | Fetches 20 planets from SWAPI |
| `toggleFavorite(item, type)` | Adds or removes an item from favorites |
| `removeFavorite(uid, type)` | Removes a specific item from favorites |

### localStorage

On first load, data is fetched from SWAPI and saved to `localStorage` under the key `sw_databank`. On subsequent visits, data is loaded from cache — no API calls made.

---

## 🌐 API

Data comes from **[SWAPI.tech](https://www.swapi.tech/documentation)**.

Each category requires two fetch steps:
1. **List**: `GET /api/people?page=1&limit=20` → returns basic list with URLs
2. **Detail**: `GET /api/people/{uid}` → returns full properties per item

Images come from `https://starwars-visualguide.com/assets/img/{type}/{uid}.jpg` with a `placehold.co` fallback if the image is unavailable.

---

## 🔧 Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run start

## 📄 Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `Home` | Landing with previews of all 3 categories |
| `/people` | `CategoryList` | Full list of characters |
| `/vehicles` | `CategoryList` | Full list of vehicles |
| `/planets` | `CategoryList` | Full list of planets |
| `/people/:uid` | `SingleDetail` | Character detail page |
| `/vehicles/:uid` | `SingleDetail` | Vehicle detail page |
| `/planets/:uid` | `SingleDetail` | Planet detail page |

---

## ✨ Credits

- Data: [SWAPI.tech](https://www.swapi.tech)
- Images: [Star Wars Visual Guide](https://starwars-visualguide.com)
- Bootcamp: [4Geeks Academy](https://4geeks.com)
- Developer: [Toro Development](https://www.torodevelop.com)

> *"May the Force be with you."*