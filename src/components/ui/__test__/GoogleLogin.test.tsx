import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import GoogleLogin from "../GoogleLogin";
import { MemoryRouter } from "react-router-dom";

describe("GoogleLogin Component", () => {
  const host = "http://localhost:1337/";
  it("renders correctly", () => {
    const { asFragment } = render(<GoogleLogin host={host} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it("renders GoogleLogin component with a button", () => {
    render(<GoogleLogin host="host" />);
    expect(screen.getByText("Or")).toBeInTheDocument();
    expect(screen.getByText("Sign in with Google")).toBeInTheDocument();
  });

  it("button click triggers the correct URL", () => {
    render(
      <MemoryRouter>
        <GoogleLogin host={host} />
      </MemoryRouter>,
    );
    const btn = screen.getByRole("link");
    expect(btn).toHaveAttribute("href", `${host}api/connect/google`);
  });

  it("renders the Google SVG image", () => {
    render(<GoogleLogin host="host" />);
    expect(screen.getByAltText("google")).toBeInTheDocument();
  });
});
