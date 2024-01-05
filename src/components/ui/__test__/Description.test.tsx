import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Description from "../Description";

describe("Description Test", () => {
  const description = "Test Description";
  const className = "test";
  it("Test to check if description renders correctly", () => {
    const { asFragment } = render(
      <Description className={className}>{description}</Description>,
    );
    const descriptionElement = screen.getByText(description);
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement).toHaveClass(className);
    expect(asFragment()).toMatchSnapshot();
  });
});
