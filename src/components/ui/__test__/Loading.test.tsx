import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Loading from "../Loading";

describe("Loading test", () => {
  it("Title test", () => {
    render(<Loading />);
    expect(screen.getByAltText("loader")).toBeInTheDocument();
  });
});
