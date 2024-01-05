import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Loading from "../Loading";

describe("Loading test", () => {
  it("Test to check if loading renders or not", () => {
    const { asFragment } = render(<Loading />);
    expect(screen.getByAltText("loader")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
