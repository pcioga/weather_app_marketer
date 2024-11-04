import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Header from "./Header";
import { fetchPlace } from "../api";

jest.mock("../api", () => ({
  fetchPlace: jest.fn(),
}));

describe("Header Component", () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders header title and search input", () => {
    render(<Header onSearch={mockOnSearch} />);

    expect(screen.getByText("How's the weather?")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search city...")).toBeInTheDocument();
  });

  test("calls onSearch with input value when typing", async () => {
    render(<Header onSearch={mockOnSearch} />);
    const searchInput = screen.getByPlaceholderText("Search city...");

    fetchPlace.mockResolvedValueOnce({ features: [{ place_name: "Coimbra" }] });

    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "Coimbra" } });
    });

    expect(mockOnSearch).toHaveBeenCalledWith("Coimbra");
    expect(fetchPlace).toHaveBeenCalledWith("Coimbra");
  });

  test("displays error message when error prop is provided", () => {
    render(<Header onSearch={mockOnSearch} error="City not found" />);

    expect(screen.getByText("City not found")).toBeInTheDocument();
  });

  test("displays autocomplete options based on fetchPlace results", async () => {
    render(<Header onSearch={mockOnSearch} />);
    const searchInput = screen.getByPlaceholderText("Search city...");

    fetchPlace.mockResolvedValueOnce({
      features: [{ place_name: "Coimbra, PT" }, { place_name: "Coimbra, BR" }],
    });

    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "C" } });
    });

    expect(await screen.findByText("Coimbra, PT")).toBeInTheDocument();
    expect(await screen.findByText("Coimbra, BR")).toBeInTheDocument();
  });
});
