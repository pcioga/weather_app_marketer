import React from "react";
import { render, screen } from "@testing-library/react";
import WeatherDisplay from "./WeatherDisplay";

describe("WeatherDisplay Component", () => {
  const mockWeatherData = {
    icon: "01d",
    description: "clear sky",
    humidity: 60,
    temperature: 20,
    windSpeed: 5,
    city: "Coimbra",
    country: "PT",
  };

  test("renders weather information correctly", async () => {
    render(<WeatherDisplay {...mockWeatherData} />);

    expect(await screen.findByText("Coimbra, PT")).toBeInTheDocument();
    expect(await screen.findByText("Temperature: 20°C")).toBeInTheDocument();
    expect(
      await screen.findByText("Conditions: clear sky")
    ).toBeInTheDocument();
    expect(await screen.findByText("Humidity: 60%")).toBeInTheDocument();
    expect(await screen.findByText("Wind Speed: 5 m/s")).toBeInTheDocument();

    const weatherIcon = screen.getByRole("img");
    expect(weatherIcon).toHaveAttribute(
      "src",
      "https://openweathermap.org/img/wn/01d@4x.png"
    );
  });
});
