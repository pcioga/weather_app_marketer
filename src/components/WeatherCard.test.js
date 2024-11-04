import React from "react";
import { render, screen } from "@testing-library/react";
import WeatherCardGrid from "./WeatherCard";

describe("WeatherCardGrid Component", () => {
  const mockCards = [
    {
      icon: "01d",
      description: "sunny",
      temperature: 25,
      city: "Coimbra",
      country: "PT",
    },
    {
      icon: "02d",
      description: "cloudy",
      temperature: 10,
      city: "Oslo",
      country: "NO",
    },
  ];

  test("renders grid with header and weather cards", async () => {
    render(<WeatherCardGrid header="Recent searches" cards={mockCards} />);

    expect(await screen.findByText("Recent searches")).toBeInTheDocument();
    expect(await screen.findByText("Coimbra, PT")).toBeInTheDocument();
    expect(await screen.findByText("Oslo, NO")).toBeInTheDocument();
    expect(await screen.findByText("25°C")).toBeInTheDocument();
    expect(await screen.findByText("10°C")).toBeInTheDocument();

    const weatherIcons = screen.getAllByRole("img");
    expect(weatherIcons[0]).toHaveAttribute(
      "src",
      "https://openweathermap.org/img/wn/01d@4x.png"
    );
    expect(weatherIcons[1]).toHaveAttribute(
      "src",
      "https://openweathermap.org/img/wn/02d@4x.png"
    );
  });
});
