import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import SideBar from "./Sidebar";
import { act } from "react-dom/test-utils";

describe("SideBar Component", () => {
  const setIsDarkThemeMock = jest.fn();
  const setCollapsedMock = jest.fn();
  it("Test to check if the side bar renders correctly for doctor role", () => {
    const role = "doctor";
    const { asFragment } = render(
      <MemoryRouter>
        <SideBar
          textColor="white"
          role={role}
          setIsDarkTheme={setIsDarkThemeMock}
          collapsed={false}
          setCollapsed={setCollapsedMock}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText("Write Prescription")).toBeInTheDocument();
    expect(screen.getByText("Reviews")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("Test to check if the side bar renders correctly for patient role", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <SideBar
          textColor="white"
          role="patient"
          setIsDarkTheme={setIsDarkThemeMock}
          collapsed={false}
          setCollapsed={setCollapsedMock}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText("Prescriptions")).toBeInTheDocument();
    expect(screen.getByText("Doctors")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("Test to check of the theme swtich button works correctly", () => {
    render(
      <MemoryRouter>
        <SideBar
          textColor="white"
          role="doctor"
          setIsDarkTheme={setIsDarkThemeMock}
          collapsed={false}
          setCollapsed={setCollapsedMock}
        />
      </MemoryRouter>,
    );
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toBeInTheDocument();
    act(() => {
      fireEvent.click(switchElement);
    });
    expect(setIsDarkThemeMock).toHaveBeenCalled();
  });
});
