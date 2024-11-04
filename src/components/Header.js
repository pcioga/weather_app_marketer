import React, { useState } from "react";
import { fetchPlace } from "../api";

import "./Header.css";

export default function Header({ onSearch, error }) {
  const [searchValue, setSearchValue] = useState("");
  const [autocompleteCities, setAutocompleteCities] = useState([]);

  const handleSearch = async (event) => {
    const value = event.target.value;
    setSearchValue(value);

    const response = await fetchPlace(value);

    if (!autocompleteCities.includes(event.target.value) && response.features) {
      setAutocompleteCities(response.features.map((place) => place.place_name));
    }

    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <header className="header">
      <h2>How's the weather?</h2>
      <div className="search-container">
        <input
          className="search-input"
          list="city-list"
          type="search"
          id="city"
          name="city-search"
          aria-label="Search city"
          placeholder="Search city..."
          onChange={handleSearch}
          value={searchValue}
          pattern={autocompleteCities.join("|")}
          autoComplete="off"
        />
        <datalist id="city-list">
          {autocompleteCities.map((city, i) => (
            <option key={i}>{city}</option>
          ))}
        </datalist>
        {Boolean(error) && <span className="error-message">{error}</span>}
      </div>
    </header>
  );
}
