import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@test/matchMedia";
import AuthPage from "../AuthPage";

describe("Auth Page tests", () => {
  it("Auth page renders correctly or not", () => {
    const { asFragment } = render(<AuthPage />);
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
