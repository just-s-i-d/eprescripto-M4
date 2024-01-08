import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NavBar from "./NavBar";
import "@test/matchMedia";
import { MemoryRouter } from "react-router-dom";

describe("NavBar component tests", () => {
  const mockedFunction = jest.fn();
  it("Test to check if the Navbar renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <NavBar collapsed={false} setCollapsed={mockedFunction} />
      </MemoryRouter>,
    );
    expect(screen.getByText("ePrescripto")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("NavBar side menu button test", () => {
    render(
      <MemoryRouter>
        <NavBar collapsed={false} setCollapsed={mockedFunction} />
      </MemoryRouter>,
    );
    const sideMenuBtn = screen.getByTestId("side-menu-btn");
    fireEvent.click(sideMenuBtn);
    expect(mockedFunction).toHaveBeenCalled();
  });
});
