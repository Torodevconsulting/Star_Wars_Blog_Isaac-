import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const typeIcon  = { people: "👤", vehicles: "🚀", planets: "🪐" };
const typeLabel = { people: "Character", vehicles: "Vehicle", planets: "Planet" };
const typeColor = { people: "#e8484a", vehicles: "#4a9edd", planets: "#4dbb6e" };

const SearchBar = () => {
  const { store } = useGlobalReducer();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
        setQuery("");
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Scroll el item activo a la vista si el dropdown es largo
  useEffect(() => {
    if (activeIndex >= 0 && itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex].scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  const handleChange = (e) => {
    const q = e.target.value;
    setQuery(q);
    setActiveIndex(-1);
    if (q.trim().length < 2) { setResults([]); setOpen(false); return; }
    const lower = q.toLowerCase();
    const matched = [
      ...store.people.filter((i) => i.name.toLowerCase().includes(lower)).slice(0, 4).map((i) => ({ ...i, type: "people" })),
      ...store.vehicles.filter((i) => i.name.toLowerCase().includes(lower)).slice(0, 4).map((i) => ({ ...i, type: "vehicles" })),
      ...store.planets.filter((i) => i.name.toLowerCase().includes(lower)).slice(0, 4).map((i) => ({ ...i, type: "planets" })),
    ];
    setResults(matched);
    setOpen(matched.length > 0);
  };

  const handleSelect = (item) => {
    navigate(`/${item.type}/${item.uid}`);
    setQuery(""); setOpen(false); setResults([]); setActiveIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setOpen(false); setQuery(""); setActiveIndex(-1);
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % results.length);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev <= 0 ? results.length - 1 : prev - 1));
    }
    if (e.key === "Enter" && activeIndex >= 0) {
      handleSelect(results[activeIndex]);
    }
  };

  return (
    <div className="sw-search" ref={wrapperRef}>
      <div className={`sw-search__input-wrap ${focused ? "sw-search__input-wrap--focused" : ""}`}>
        <span className="sw-search__icon">⌕</span>
        <input
          type="text"
          className="sw-search__input"
          placeholder="Search the galaxy..."
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoComplete="off"
        />
        {query && (
          <button className="sw-search__clear" onClick={() => { setQuery(""); setOpen(false); setActiveIndex(-1); }}>✕</button>
        )}
      </div>

      {open && results.length > 0 && (
        <div className="sw-search__dropdown">
          {results.map((item, index) => (
            <button
              key={`${item.type}-${item.uid}`}
              ref={(el) => (itemRefs.current[index] = el)}
              className={`sw-search__result ${activeIndex === index ? "sw-search__result--active" : ""}`}
              onClick={() => handleSelect(item)}
            >
              <span className="sw-search__result-icon">{typeIcon[item.type]}</span>
              <div className="sw-search__result-info">
                <span className="sw-search__result-name">{item.name}</span>
                <span className="sw-search__result-type" style={{ color: typeColor[item.type] }}>{typeLabel[item.type]}</span>
              </div>
              <span className="sw-search__result-arrow">→</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;