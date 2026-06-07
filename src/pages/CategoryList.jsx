import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import Card from "../components/Card";

const typeConfig = {
  people:   { title: "CHARACTERS", subtitle: "Beings of the Galaxy",      color: "#e8484a", icon: "👤" },
  vehicles: { title: "VEHICLES",   subtitle: "Machines of War & Peace",   color: "#4a9edd", icon: "🚀" },
  planets:  { title: "PLANETS",    subtitle: "Worlds of the Galaxy",       color: "#4dbb6e", icon: "🪐" },
};

const CategoryList = ({ type }) => {
  const { store } = useGlobalReducer();
  const config = typeConfig[type];
  const items = store[type];

  if (store.loading) {
    return (
      <div className="sw-loading">
        <div className="sw-loading__inner">
          <div className="sw-loading__spinner" />
          <p className="sw-loading__text">Loading {config.title.toLowerCase()}...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="sw-category-page">
      <div className="sw-category-hero">
        <div className="sw-category-hero__inner">
          <span className="sw-category-hero__icon">{config.icon}</span>
          <div>
            <h1 className="sw-category-hero__title" style={{ color: config.color }}>{config.title}</h1>
            <p className="sw-category-hero__sub">{config.subtitle}</p>
          </div>
          <span className="sw-category-hero__count">{items.length} entries</span>
        </div>
      </div>
      <div className="sw-content">
        <div className="sw-cards-grid">
          {items.map((item) => <Card key={item.uid} item={item} type={type} />)}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;