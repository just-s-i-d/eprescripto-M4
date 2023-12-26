import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import CardTitle from "../CardTitle";

describe("Card Title Test", () => {
  const title = "Test Title";
  const className = "test";

  it("matches snapshot", () => {
    const { asFragment } = render(
      <CardTitle className={className}>{title}</CardTitle>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("Title test", () => {
    const { getByText } = render(
      <CardTitle className={className}>{title}</CardTitle>,
    );
    const titleElement = getByText(title);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass(className);
  });
});
