import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import App from "./App";
import { getUserLocation, getWeather, fetchPlace } from "./api";

// Mock all API calls
jest.mock("./api");

// Mock timer functions for debounce
jest.useFakeTimers();

describe("App Integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    fetchPlace.mockResolvedValue({ features: [] });
  });

  test("loads and displays user location weather on startup", async () => {
    getUserLocation.mockResolvedValueOnce({ city: "Oslo" });
    getWeather.mockResolvedValueOnce({
      weather: "Clear",
      description: "clear sky",
      icon: "01d",
      temperature: 20,
      humidity: 50,
      windSpeed: 5,
      city: "Oslo",
      country: "NO",
    });

    await act(async () => {
      render(<App />);
    });

    const cityHeading = await screen.findByRole("heading", { level: 1 });
    expect(cityHeading).toHaveTextContent("Oslo, NO");
    expect(getUserLocation).toHaveBeenCalled();
    expect(getWeather).toHaveBeenCalledWith("Oslo");
  });

  test("searches for a new location and updates weather display", async () => {
    getWeather.mockResolvedValueOnce({
      weather: "Clouds",
      description: "cloudy",
      icon: "02d",
      temperature: 15,
      humidity: 70,
      windSpeed: 4,
      city: "London",
      country: "UK",
    });

    render(<App />);

    // Wait for initial render with New York data
    await screen.findByText("New York, US");

    const searchInput = screen.getByPlaceholderText("Search city...");

    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "London" } });
    });

    await act(async () => {
      // Wait for debounce timer
      jest.advanceTimersByTime(1000);
    });

    const cityHeading = await screen.findByRole("heading", { level: 1 });
    expect(cityHeading).toHaveTextContent("London, UK");
    expect(getWeather).toHaveBeenNthCalledWith(1, "London");
  });
});
