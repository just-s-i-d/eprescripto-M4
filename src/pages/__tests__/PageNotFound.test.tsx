import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PageNotFound from "../PageNotFound";

describe("PageNotFound", () => {
  it("Renders PageNotFound component with 404 message and Home button", async () => {
    const { asFragment } = render(<PageNotFound />);
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(
      screen.getByText("Sorry the page you visited,does not exist"),
    ).toBeInTheDocument();
    const homeButton = screen.getByRole("link", { name: "Home" });
    expect(homeButton).toBeInTheDocument();
    expect(homeButton).toHaveAttribute("href", "/dashboard");
    expect(asFragment()).toMatchSnapshot();
  });
});
