import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders JSON Editor and Form Preview", () => {
  render(<App />);
  expect(screen.getByText("JSON Editor")).toBeInTheDocument();
  expect(screen.getByText("Form Preview")).toBeInTheDocument();
});
