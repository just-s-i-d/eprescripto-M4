import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@test/matchMedia";
import PersonalInfoCard from "../PersonalInfoCard";
import { updateUserData } from "@utils/Doctor";

jest.mock("@utils/Doctor", () => ({
  updateUserData: jest.fn().mockResolvedValue("updated"),
}));
const mockUserData = {
  docName: "John Doe",
  email: "john.doe@example.com",
  dob: "1/11/1999",
  gender: "male",
  city: "City",
  state: "State",
  country: "Country",
  profilePic: "profilePic.jpg",
};

describe("PersonalInfoCard", () => {
  it("Render the card with given user details", async () => {
    const { asFragment } = render(<PersonalInfoCard userData={mockUserData} />);
    expect(screen.getByText("Personal Information")).toBeInTheDocument();
    expect(screen.getByLabelText("Full Name")).toHaveValue(
      mockUserData.docName,
    );
    expect(screen.getByLabelText("E-mail")).toHaveValue(mockUserData.email);
    expect(screen.getByLabelText("City")).toHaveValue(mockUserData.city);
    expect(screen.getByLabelText("State")).toHaveValue(mockUserData.state);
    expect(screen.getByLabelText("Country")).toHaveValue(mockUserData.country);
    expect(asFragment()).toMatchSnapshot();
  });

  it("allows editing and saving user details", async () => {
    render(<PersonalInfoCard userData={mockUserData} />);
    fireEvent.click(screen.getByText("Edit Details"));
    fireEvent.change(screen.getByLabelText("Full Name"), {
      target: { value: "New Name" },
    });
    fireEvent.click(screen.getByText("Save"));
    expect(updateUserData).toHaveBeenCalledWith({
      ...mockUserData,
      docName: "New Name",
    });
  });
  it("User details update error", async () => {
    (updateUserData as jest.Mock).mockRejectedValue("mocked");
    render(<PersonalInfoCard userData={mockUserData} />);
    const editDetailsBtn = screen.getByText("Edit Details");
    fireEvent.click(editDetailsBtn);
    fireEvent.change(screen.getByLabelText("Full Name"), {
      target: { value: "New Name" },
    });
    const saveBtn = screen.getByText("Save");
    fireEvent.click(saveBtn);
    expect(updateUserData).toHaveBeenCalledWith({
      ...mockUserData,
      docName: "New Name",
    });
    await waitFor(() => {
      expect(screen.getByText("Edit Details")).toBeInTheDocument();
      expect(screen.queryByText("Save")).not.toBeInTheDocument();
    });
  });
  it("cancels the editing of user details", async () => {
    render(<PersonalInfoCard userData={mockUserData} />);
    fireEvent.click(screen.getByText("Edit Details"));
    fireEvent.change(screen.getByLabelText("Full Name"), {
      target: { value: "New Name" },
    });
    fireEvent.click(screen.getByText("Cancel"));
    expect(screen.getByText("Edit Details")).toBeInTheDocument();
    expect(screen.getByLabelText("Full Name")).toHaveValue(
      mockUserData.docName,
    );
    expect(screen.getByLabelText("City")).toHaveValue(mockUserData.city);
  });
});
