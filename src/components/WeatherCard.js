import React from "react";

import "./WeatherCard.css";

export default function WeatherCardGrid({ header, cards, onClick }) {
  return (
    <div className="weather-card-grid-container">
      {header && <h2>{header}</h2>}
      <div className="weather-card-grid">
        {cards.map((card) => {
          return <WeatherCard key={card.city} {...card} onClick={onClick} />;
        })}
      </div>
    </div>
  );
}

function WeatherCard({ icon, description, temperature, city, country }) {
  return (
    <div className="weather-card">
      <div className="details">
        <h3>
          {city}, {country}
        </h3>
        <p>{Math.round(temperature)}°C</p>
      </div>
      <img
        className="display--icon"
        src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
        alt={description}
      />
    </div>
  );
}
