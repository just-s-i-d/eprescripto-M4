import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import "@test/matchMedia";
import DashboardLayout from "../DashboardLayout";

describe("DashboardLayout", () => {
  it("Snapshot test", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <DashboardLayout setIsDarkTheme={jest.fn()} />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("renders NavBar and SideBar test", async () => {
    render(
      <MemoryRouter>
        <DashboardLayout setIsDarkTheme={jest.fn()} />
      </MemoryRouter>,
    );
    await waitFor(() => {
      setTimeout(() => {
        expect(screen.findByText("ePrescripto")).toBeInTheDocument();
        expect(screen.findByRole("switch")).toBeInTheDocument();
      }, 500);
    });
  });
});