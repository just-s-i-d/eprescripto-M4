import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Description from "../Description";

describe("Description Test", () => {
  const description = "Test Description";
  const className = "test";
  it("Title test", () => {
    render(<Description className={className}>{description}</Description>);
    const descriptionElement = screen.getByText(description);
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement).toHaveClass(className);
  });
});
