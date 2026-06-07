import useGlobalReducer from "./useGlobalReducer.jsx";

export function useActions() {
  const { dispatch, store } = useGlobalReducer();

  const loadPeople = async () => {
    try {
      const res = await fetch("https://www.swapi.tech/api/people?page=1&limit=10");
      const data = await res.json();
      const detailed = await Promise.all(
        data.results.map(async (p) => {
          const r = await fetch(p.url);
          const d = await r.json();
          return { ...d.result.properties, uid: d.result.uid };
        })
      );
      dispatch({ type: "SET_PEOPLE", payload: detailed });
    } catch (e) {
      console.error("Error loading people", e);
    }
  };

  const loadVehicles = async () => {
    try {
      const res = await fetch("https://www.swapi.tech/api/vehicles?page=1&limit=20");
      const data = await res.json();
      const detailed = await Promise.all(
        data.results.map(async (v) => {
          const r = await fetch(v.url);
          const d = await r.json();
          return { ...d.result.properties, uid: d.result.uid };
        })
      );
      dispatch({ type: "SET_VEHICLES", payload: detailed });
    } catch (e) {
      console.error("Error loading vehicles", e);
    }
  };

  const loadPlanets = async () => {
    try {
      const res = await fetch("https://www.swapi.tech/api/planets?page=1&limit=20");
      const data = await res.json();
      const detailed = await Promise.all(
        data.results.map(async (p) => {
          const r = await fetch(p.url);
          const d = await r.json();
          return { ...d.result.properties, uid: d.result.uid };
        })
      );
      dispatch({ type: "SET_PLANETS", payload: detailed });
    } catch (e) {
      console.error("Error loading planets", e);
    }
  };

  const loadAll = async () => {
    // Si ya hay datos en el store (vinieron de localStorage), no hace fetch
    if (store.people.length > 0) return;
    dispatch({ type: "SET_LOADING", payload: true });
    await Promise.all([loadPeople(), loadVehicles(), loadPlanets()]);
    dispatch({ type: "SET_LOADING", payload: false });
  };

  const toggleFavorite = (item, type) => {
    dispatch({ type: "TOGGLE_FAVORITE", payload: { item, type } });
  };

  const removeFavorite = (uid, type) => {
    dispatch({ type: "REMOVE_FAVORITE", payload: { uid, type } });
  };

  return { loadAll, loadPeople, loadVehicles, loadPlanets, toggleFavorite, removeFavorite };
}