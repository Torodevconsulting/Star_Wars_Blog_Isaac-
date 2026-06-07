import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useActions } from "../hooks/useActions.jsx";

const Home = () => {
  const { store } = useGlobalReducer();
  const { loadAll } = useActions();

  useEffect(() => {
    if (store.people.length === 0) loadAll();
  }, []);

  if (store.loading) {
    return (
      <div className="sw-loading">
        <div className="sw-loading__inner">
          <div className="sw-loading__spinner" />
          <p className="sw-loading__text">Accessing the Holocron...</p>
        </div>
      </div>
    );
  }

  const Section = ({ title, items, type, path }) => (
    <section className="sw-section">
      <div className="sw-section__header">
        <div className="sw-section__title-wrap">
          <span className="sw-section__line" />
          <h2 className="sw-section__title">{title}</h2>
        </div>
        <Link to={path} className="sw-section__view-all">View all →</Link>
      </div>
      <div className="sw-cards-grid">
        {items.slice(0, 6).map((item) => (
          <Card key={item.uid} item={item} type={type} />
        ))}
      </div>
    </section>
  );

  return (
    <div className="sw-home">
      <div className="sw-hero">
        <div className="sw-hero__content">
          <p className="sw-hero__eyebrow">THE FORCE AWAKENS IN</p>
          <h1 className="sw-hero__title">STAR WARS<br />DATABANK</h1>
          <p className="sw-hero__sub">
            Explore the galaxy far, far away. Browse characters, vehicles and planets
            from the complete Star Wars universe.
          </p>
          <div className="sw-hero__stats">
            <div className="sw-hero__stat">
              <span className="sw-hero__stat-n">{store.people.length}</span>
              <span className="sw-hero__stat-l">Characters</span>
            </div>
            <div className="sw-hero__stat-divider" />
            <div className="sw-hero__stat">
              <span className="sw-hero__stat-n">{store.vehicles.length}</span>
              <span className="sw-hero__stat-l">Vehicles</span>
            </div>
            <div className="sw-hero__stat-divider" />
            <div className="sw-hero__stat">
              <span className="sw-hero__stat-n">{store.planets.length}</span>
              <span className="sw-hero__stat-l">Planets</span>
            </div>
          </div>
        </div>
        <div className="sw-hero__crawl">
          <div className="sw-hero__crawl-text">
            A long time ago in a galaxy far, far away....
            The Force is strong with this Databank.
            Browse and explore the complete Star Wars universe.
          </div>
        </div>
      </div>
      <div className="sw-content">
        <Section title="CHARACTERS" items={store.people} type="people" path="/people" />
        <Section title="VEHICLES" items={store.vehicles} type="vehicles" path="/vehicles" />
        <Section title="PLANETS" items={store.planets} type="planets" path="/planets" />
      </div>
    </div>
  );
};

export { Home };
export default Home;