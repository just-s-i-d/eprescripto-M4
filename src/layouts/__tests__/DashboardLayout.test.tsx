import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import "@test/matchMedia";
import DashboardLayout from "../DashboardLayout";

describe("DashboardLayout", () => {
  it("Test to check if NavBar and Sidebar is rendered", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <DashboardLayout setIsDarkTheme={jest.fn()} />
      </MemoryRouter>,
    );
    expect(screen.getByText("ePrescripto")).toBeInTheDocument();
    expect(screen.getByRole("switch")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
