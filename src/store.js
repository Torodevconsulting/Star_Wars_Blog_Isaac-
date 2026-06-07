const STORAGE_KEY = "sw_databank";

function saveToStorage(store) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      people: store.people,
      vehicles: store.vehicles,
      planets: store.planets,
    }));
  } catch (e) {
    console.warn("localStorage save failed", e);
  }
}

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn("localStorage load failed", e);
  }
  return null;
}

export function initialStore() {
  const cached = loadFromStorage();
  if (cached && cached.people?.length > 0) {
    return {
      people: cached.people,
      vehicles: cached.vehicles,
      planets: cached.planets,
      favorites: [],
      loading: false,
      fromCache: true,
    };
  }
  return {
    people: [],
    vehicles: [],
    planets: [],
    favorites: [],
    loading: true,
    fromCache: false,
  };
}

export default function storeReducer(store, action) {
  let next;
  switch (action.type) {
    case "SET_PEOPLE":
      next = { ...store, people: action.payload };
      saveToStorage(next);
      return next;

    case "SET_VEHICLES":
      next = { ...store, vehicles: action.payload };
      saveToStorage(next);
      return next;

    case "SET_PLANETS":
      next = { ...store, planets: action.payload };
      saveToStorage(next);
      return next;

    case "SET_LOADING":
      return { ...store, loading: action.payload };

    case "TOGGLE_FAVORITE": {
      const { item, type } = action.payload;
      const exists = store.favorites.find(
        (f) => f.uid === item.uid && f.type === type
      );
      if (exists) {
        return {
          ...store,
          favorites: store.favorites.filter(
            (f) => !(f.uid === item.uid && f.type === type)
          ),
        };
      }
      return {
        ...store,
        favorites: [...store.favorites, { ...item, type }],
      };
    }

    case "REMOVE_FAVORITE":
      return {
        ...store,
        favorites: store.favorites.filter(
          (f) => !(f.uid === action.payload.uid && f.type === action.payload.type)
        ),
      };

    default:
      return store;
  }
}