import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CardTitle from "../CardTitle";

describe("Card Title Test", () => {
  const title = "Test Title";
  const className = "test";
  it("Title test", () => {
    render(<CardTitle className={className}>{title}</CardTitle>);
    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass(className);
  });
});
