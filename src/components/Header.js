import React, { useState } from "react";
import { fetchPlace } from "../api";

import "./Header.css";

export default function Header({ onSearch }) {
  const [searchValue, setSearchValue] = useState("");
  const [autocompleteCities, setAutocompleteCities] = useState([]);

  const handleSearch = async (event) => {
    const value = event.target.value;
    setSearchValue(value);

    const res = await fetchPlace(value);
    if (!autocompleteCities.includes(event.target.value) && res.features) {
      setAutocompleteCities(res.features.map((place) => place.place_name));
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
          list="places"
          type="text"
          id="city"
          name="citySearch"
          placeholder="Search city..."
          onChange={handleSearch}
          value={searchValue}
          pattern={autocompleteCities.join("|")}
          autoComplete="off"
        />
        <datalist id="places">
          {autocompleteCities.map((city, i) => (
            <option key={i}>{city}</option>
          ))}
        </datalist>
      </div>
    </header>
  );
}
