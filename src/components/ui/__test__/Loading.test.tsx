import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Loading from "../Loading";

describe("Loading test", () => {
  it("Snapshot test", () => {
    const { asFragment } = render(<Loading />);
    expect(asFragment()).toMatchSnapshot();
  });
  it("Title test", () => {
    render(<Loading />);
    expect(screen.getByAltText("loader")).toBeInTheDocument();
  });
});
