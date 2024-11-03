import React, { useState, useEffect } from "react";

export default function Header({ onSearch }) {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchValue(value);

    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <header className="header">
      <h2 className="header--title">How's the weather?</h2>
      <input
        className="header--search"
        type="search"
        placeholder="Search"
        name="citySearch"
        value={searchValue}
        onChange={handleSearch}
      />
    </header>
  );
}
