import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useActions } from "../hooks/useActions.jsx";
import SearchBar from "./SearchBar.jsx";

const Navbar = () => {
  const { store } = useGlobalReducer();
  const { removeFavorite } = useActions();
  const [showFavs, setShowFavs] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleFavClick = (fav) => {
    setShowFavs(false);
    navigate(`/${fav.type}/${fav.uid}`);
  };

  const typeLabel = { people: "Character", vehicles: "Vehicle", planets: "Planet" };
  const typeIcon  = { people: "👤", vehicles: "🚀", planets: "🪐" };

  return (
    <>
      <nav className="sw-navbar">
        <div className="sw-navbar__inner">
          <Link to="/" className="sw-navbar__logo" onClick={() => setShowMenu(false)}>
            <svg viewBox="0 0 130 40" fill="white" xmlns="http://www.w3.org/2000/svg" height="32">
              <text x="0" y="30" fontSize="28" fontFamily="'Orbitron', sans-serif" letterSpacing="2" fill="white">SW</text>
              <line x1="64" y1="8" x2="64" y2="32" stroke="#FFE81F" strokeWidth="2"/>
              <text x="72" y="18" fontSize="8" fontFamily="'Orbitron', sans-serif" fill="#FFE81F" letterSpacing="1">STAR</text>
              <text x="72" y="30" fontSize="8" fontFamily="'Orbitron', sans-serif" fill="#FFE81F" letterSpacing="1">WARS</text>
            </svg>
          </Link>

          <div className="sw-navbar__links">
            <Link to="/" className="sw-navbar__link">Databank</Link>
            <Link to="/people" className="sw-navbar__link">Characters</Link>
            <Link to="/vehicles" className="sw-navbar__link">Vehicles</Link>
            <Link to="/planets" className="sw-navbar__link">Planets</Link>
          </div>
          
          <div className="sw-navbar__search-desktop">
            <SearchBar />
          </div>
          
          <div className="sw-navbar__actions">
            <div className="sw-navbar__fav-wrapper">
              <button className="sw-fav-btn" onClick={() => { setShowFavs(!showFavs); setShowMenu(false); }}>
                <span className="sw-fav-btn__icon">⭐</span>
                <span className="sw-fav-btn__label">Favorites</span>
                <span className="sw-fav-btn__badge">{store.favorites.length}</span>
              </button>

              {showFavs && (
                <>
                  <div className="sw-overlay" onClick={() => setShowFavs(false)} />
                  <div className="sw-fav-dropdown">
                    <div className="sw-fav-dropdown__header">
                      <span>SAVED ITEMS</span>
                      <button onClick={() => setShowFavs(false)}>✕</button>
                    </div>
                    {store.favorites.length === 0 ? (
                      <div className="sw-fav-dropdown__empty">
                        <span>No favorites yet</span>
                        <small>Add items using the ☆ button on any card</small>
                      </div>
                    ) : (
                      <div className="sw-fav-dropdown__list">
                        {store.favorites.map((fav) => (
                          <div key={`${fav.type}-${fav.uid}`} className="sw-fav-item">
                            <button className="sw-fav-item__info" onClick={() => handleFavClick(fav)}>
                              <span className="sw-fav-item__icon">{typeIcon[fav.type]}</span>
                              <div>
                                <span className="sw-fav-item__name">{fav.name}</span>
                                <span className="sw-fav-item__type">{typeLabel[fav.type]}</span>
                              </div>
                            </button>
                            <button className="sw-fav-item__remove" onClick={() => removeFavorite(fav.uid, fav.type)}>✕</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            <button
              className="sw-hamburger"
              onClick={() => { setShowMenu(!showMenu); setShowFavs(false); }}
              aria-label="Menu"
            >
              <span className={`sw-hamburger__bar ${showMenu ? "sw-hamburger__bar--open1" : ""}`} />
              <span className={`sw-hamburger__bar ${showMenu ? "sw-hamburger__bar--open2" : ""}`} />
              <span className={`sw-hamburger__bar ${showMenu ? "sw-hamburger__bar--open3" : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      {showMenu && (
        <>
          <div className="sw-overlay" onClick={() => setShowMenu(false)} />
          <div className="sw-mobile-menu">
            <div className="sw-mobile-menu__search">
              <SearchBar />
            </div>
            <nav className="sw-mobile-menu__nav">
              {[
                { to: "/", label: "🏠 Databank" },
                { to: "/people", label: "👤 Characters" },
                { to: "/vehicles", label: "🚀 Vehicles" },
                { to: "/planets", label: "🪐 Planets" },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="sw-mobile-menu__link"
                  onClick={() => setShowMenu(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export { Navbar };
export default Navbar;