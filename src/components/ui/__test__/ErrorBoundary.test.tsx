import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ErrorBoundary from "../../ErrorBoundary";

describe("Error Boundary tests", () => {
  it("Renders children of Error boundary when there is no error", () => {
    const { asFragment } = render(
      <ErrorBoundary error={true}>Test Content</ErrorBoundary>,
    );
    render(<ErrorBoundary error={false}>Test Content</ErrorBoundary>);
    expect(screen.getByText("Test Content")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("render error boundary for error with try again button", () => {
    const mockedFunction = jest.fn();
    render(
      <ErrorBoundary error={true} refreshComponent={mockedFunction}>
        Test Error
      </ErrorBoundary>,
    );
    expect(screen.queryByText("Test Error")).not.toBeInTheDocument();
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    const tryAgainBtn = screen.getByRole("button", { name: "Try again" });
    expect(tryAgainBtn).toBeInTheDocument();
    fireEvent.click(tryAgainBtn);
    expect(mockedFunction).toHaveBeenCalled();
  });
});
