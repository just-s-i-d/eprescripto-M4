import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ForbiddenAccessPage from "@pages/ForbiddenAccessPage";

describe("PageNotFound", () => {
  it("Snapshot test", () => {
    const { asFragment } = render(<ForbiddenAccessPage />);
    expect(screen.getByText("403")).toBeInTheDocument();
    expect(
      screen.getByText("Sorry, you are not authorized to access this page."),
    ).toBeInTheDocument();
    const homeButton = screen.getByTestId("home-btn");
    expect(homeButton).toBeInTheDocument();
    expect(homeButton).toHaveAttribute("href", "/dashboard");
    expect(asFragment()).toMatchSnapshot();
  });
});
