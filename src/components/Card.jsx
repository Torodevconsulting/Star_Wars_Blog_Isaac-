import React, { useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useActions } from "../hooks/useActions";

const IMAGE_BASES = {
  people: "https://starwars-visualguide.com/assets/img/characters",
  vehicles: "https://starwars-visualguide.com/assets/img/vehicles",
  planets: "https://starwars-visualguide.com/assets/img/planets",
};

const Card = ({ item, type }) => {
  const { store } = useGlobalReducer();
  const { toggleFavorite } = useActions();

  const FALLBACK = `https://placehold.co/400x300/0a0c10/FFE81F?text=${encodeURIComponent(item.name)}`;

  const isFav = store.favorites.some((f) => f.uid === item.uid && f.type === type);
  const [imgSrc, setImgSrc] = useState(`${IMAGE_BASES[type]}/${item.uid}.jpg`);

  const subtitleLines = () => {
    if (type === "people") return [
      { label: "Gender", value: item.gender },
      { label: "Birth Year", value: item.birth_year },
      { label: "Height", value: item.height ? `${item.height} cm` : "n/a" },
    ];
    if (type === "vehicles") return [
      { label: "Model", value: item.model },
      { label: "Class", value: item.vehicle_class },
      { label: "Manufacturer", value: item.manufacturer?.split(",")[0] },
    ];
    if (type === "planets") return [
      { label: "Climate", value: item.climate },
      { label: "Population", value: item.population !== "unknown" ? Number(item.population).toLocaleString() : "unknown" },
      { label: "Terrain", value: item.terrain },
    ];
    return [];
  };

  const typeTag = { people: "CHARACTER", vehicles: "VEHICLE", planets: "PLANET" };
  const typeColor = { people: "#e8484a", vehicles: "#4a9edd", planets: "#4dbb6e" };

  return (
    <div className="sw-card">
      <div className="sw-card__img-wrap">
        <img src={imgSrc} alt={item.name} className="sw-card__img" onError={() => setImgSrc(FALLBACK)} />
        <span className="sw-card__type-tag" style={{ borderColor: typeColor[type], color: typeColor[type] }}>
          {typeTag[type]}
        </span>
        <button
          className={`sw-card__fav-btn ${isFav ? "sw-card__fav-btn--active" : ""}`}
          onClick={() => toggleFavorite(item, type)}
        >
          {isFav ? "★" : "☆"}
        </button>
      </div>
      <div className="sw-card__body">
        <h3 className="sw-card__name">{item.name}</h3>
        <div className="sw-card__meta">
          {subtitleLines().map((line) => (
            <div key={line.label} className="sw-card__meta-row">
              <span className="sw-card__meta-label">{line.label}</span>
              <span className="sw-card__meta-value">{line.value || "n/a"}</span>
            </div>
          ))}
        </div>
        <Link to={`/${type}/${item.uid}`} className="sw-card__btn">Learn more →</Link>
      </div>
    </div>
  );
};

export default Card;