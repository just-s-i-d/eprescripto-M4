import { render } from "@testing-library/react";
import App from "../App";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import "./matchMedia";

describe("App component tests", () => {
  it("Snapshot test", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
