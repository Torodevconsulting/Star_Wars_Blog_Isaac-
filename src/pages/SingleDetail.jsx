import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useActions } from "../hooks/useActions";

const IMAGE_BASES = {
  people:   "https://starwars-visualguide.com/assets/img/characters",
  vehicles: "https://starwars-visualguide.com/assets/img/vehicles",
  planets:  "https://starwars-visualguide.com/assets/img/planets",
};

const DetailRow = ({ label, value }) => {
  if (!value || value === "unknown" || value === "n/a") return null;
  return (
    <div className="sw-detail__row">
      <span className="sw-detail__label">{label}</span>
      <span className="sw-detail__value">{value}</span>
    </div>
  );
};

const SingleDetail = ({ type }) => {
  const { uid } = useParams();
  const { store } = useGlobalReducer();
  const { toggleFavorite } = useActions();
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  const item = store[type]?.find((i) => String(i.uid) === String(uid));

   const FALLBACK = item                                                   
    ? `https://placehold.co/600x400/1a1f28/FFE81F?font=oswald&text=${encodeURIComponent(item.name)}`
    : `https://placehold.co/600x400/1a1f28/FFE81F?text=Loading...`;

  const isFav = item ? store.favorites.some((f) => f.uid === item.uid && f.type === type) : false;
  const imgSrc = imgError ? FALLBACK : `${IMAGE_BASES[type]}/${uid}.jpg`;

  const typeColor = { people: "#e8484a", vehicles: "#4a9edd", planets: "#4dbb6e" };
  const typeLabel = { people: "CHARACTER", vehicles: "VEHICLE", planets: "PLANET" };

  const getFields = () => {
    if (type === "people") return [
      { section: "BIOLOGICAL", fields: [
        { label: "Gender", value: item.gender },
        { label: "Birth Year", value: item.birth_year },
        { label: "Species", value: item.species },
      ]},
      { section: "PHYSICAL", fields: [
        { label: "Height", value: item.height ? `${item.height} cm` : null },
        { label: "Mass", value: item.mass ? `${item.mass} kg` : null },
        { label: "Hair Color", value: item.hair_color },
        { label: "Eye Color", value: item.eye_color },
        { label: "Skin Color", value: item.skin_color },
      ]},
    ];
    if (type === "vehicles") return [
      { section: "SPECIFICATIONS", fields: [
        { label: "Model", value: item.model },
        { label: "Class", value: item.vehicle_class },
        { label: "Manufacturer", value: item.manufacturer },
        { label: "Length", value: item.length ? `${item.length} m` : null },
        { label: "Crew", value: item.crew },
        { label: "Passengers", value: item.passengers },
      ]},
      { section: "PERFORMANCE", fields: [
        { label: "Max Speed", value: item.max_atmosphering_speed ? `${item.max_atmosphering_speed} km/h` : null },
        { label: "Cargo Capacity", value: item.cargo_capacity ? `${Number(item.cargo_capacity).toLocaleString()} kg` : null },
        { label: "Cost", value: item.cost_in_credits ? `${Number(item.cost_in_credits).toLocaleString()} credits` : null },
      ]},
    ];
    if (type === "planets") return [
      { section: "GEOGRAPHY", fields: [
        { label: "Climate", value: item.climate },
        { label: "Terrain", value: item.terrain },
        { label: "Diameter", value: item.diameter ? `${Number(item.diameter).toLocaleString()} km` : null },
        { label: "Surface Water", value: item.surface_water ? `${item.surface_water}%` : null },
      ]},
      { section: "DEMOGRAPHICS", fields: [
        { label: "Population", value: item.population !== "unknown" ? Number(item.population).toLocaleString() : "unknown" },
        { label: "Rotation Period", value: item.rotation_period ? `${item.rotation_period} hrs` : null },
        { label: "Orbital Period", value: item.orbital_period ? `${item.orbital_period} days` : null },
        { label: "Gravity", value: item.gravity },
      ]},
    ];
    return [];
  };

  if (store.loading) {
    return (
      <div className="sw-loading">
        <div className="sw-loading__inner">
          <div className="sw-loading__spinner" />
          <p className="sw-loading__text">Accessing Holocron entry...</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="sw-not-found">
        <h2>Entry not found in Holocron</h2>
        <button onClick={() => navigate(-1)} className="sw-card__btn" style={{ marginTop: "1rem" }}>← Go back</button>
      </div>
    );
  }

  return (
    <div className="sw-detail">
      <button className="sw-detail__back" onClick={() => navigate(-1)}>← Back to Databank</button>
      <div className="sw-detail__hero">
        <div className="sw-detail__img-col">
          <img src={imgSrc} alt={item.name} className="sw-detail__img" onError={() => setImgError(true)} />
        </div>
        <div className="sw-detail__info-col">
          <span className="sw-detail__tag" style={{ color: typeColor[type], borderColor: typeColor[type] }}>
            {typeLabel[type]}
          </span>
          <h1 className="sw-detail__name">{item.name}</h1>
          <p className="sw-detail__desc">
            {type === "people" && `${item.name} is a ${item.gender !== "n/a" ? item.gender : ""} character from the Star Wars universe, born in ${item.birth_year || "an unknown era"}.`}
            {type === "vehicles" && `The ${item.name} is a ${item.vehicle_class || "vehicle"} manufactured by ${item.manufacturer?.split(",")[0] || "unknown"}.`}
            {type === "planets" && `${item.name} is a ${item.climate || "diverse"} world with ${item.terrain || "varied"} terrain, home to ${item.population !== "unknown" ? Number(item.population).toLocaleString() : "an unknown number of"} inhabitants.`}
          </p>
          <button
            className={`sw-detail__fav-btn ${isFav ? "sw-detail__fav-btn--active" : ""}`}
            onClick={() => toggleFavorite(item, type)}
          >
            {isFav ? "★ Saved to Favorites" : "☆ Save to Favorites"}
          </button>
        </div>
      </div>
      <div className="sw-detail__fields">
        {getFields().map((section) => (
          <div key={section.section} className="sw-detail__section">
            <h3 className="sw-detail__section-title" style={{ color: typeColor[type] }}>{section.section}</h3>
            {section.fields.map((f) => <DetailRow key={f.label} label={f.label} value={f.value} />)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleDetail;