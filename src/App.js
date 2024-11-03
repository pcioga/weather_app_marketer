import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import WeatherDisplay from "./components/WeatherDisplay";
import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <WeatherDisplay />
    </div>
  );
}

export default App;
