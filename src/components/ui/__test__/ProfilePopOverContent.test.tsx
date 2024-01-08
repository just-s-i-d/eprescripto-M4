import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProfilePopOverContent from "../ProfilePopOverContent";
import * as doctorUtils from "@utils/Doctor";

describe("Profile Pop Over Log out Button", () => {
  it("Snapshot test", () => {
    const { asFragment } = render(<ProfilePopOverContent />);
    expect(asFragment()).toMatchSnapshot();
  });
  it("Log out", () => {
    const logoutMock = jest.spyOn(doctorUtils, "logout");
    render(<ProfilePopOverContent />);
    const logoutButton = screen.getByRole("button", { name: "Logout" });
    expect(logoutButton).toBeInTheDocument();
    fireEvent.click(logoutButton);
    expect(logoutMock).toHaveBeenCalled();
  });
});
