import ProfilePage from "@pages/ProfilePage";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@test/matchMedia";
import { deleteAccount } from "@utils/Doctor";

jest.mock("@utils/Doctor", () => ({
  getUserData: jest.fn().mockResolvedValue({
    docName: "John Doe",
    email: "john.doe@example.com",
    dob: "1990-01-01",
    gender: "male",
    city: "City",
    state: "State",
    country: "Country",
    profilePic: "profilePic.jpg",
    licenseNo: 1234,
    speciality: "Cardiology",
    experience: 5,
    organizationType: "hospital",
    organizationName: "ABC Hospital",
  }),
  deleteAccount: jest.fn(),
}));

describe("Profile Page Tests", () => {
  it("Personal info and Professional info card render test", () => {
    const { asFragment } = render(<ProfilePage darkMode={false} />);
    expect(screen.getByText("Personal Information")).toBeInTheDocument();
    expect(screen.getByText("Professional Information")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("delete btn render test", async () => {
    render(<ProfilePage darkMode={false} />);
    const deleteAccountBtn = screen.getByRole("button", {
      name: "Delete Account",
    });
    expect(deleteAccountBtn).toBeInTheDocument();
  });

  it("Account delete test", async () => {
    render(<ProfilePage darkMode={false} />);

    const deleteAccountBtn = screen.getByRole("button", {
      name: "Delete Account",
    });
    expect(deleteAccountBtn).toBeInTheDocument();
    fireEvent.click(deleteAccountBtn);
    const confirmBtn = screen.getByRole("button", { name: "Yes" });
    expect(confirmBtn).toBeInTheDocument();
    fireEvent.click(confirmBtn);
    await waitFor(() => {
      expect(deleteAccount).toHaveBeenCalled();
    });
  });
});
