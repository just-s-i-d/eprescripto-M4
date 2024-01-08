import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@test/matchMedia";
import ProfessionalInfoCard from "../ProfessionalInfoCard";
import { updateUserData } from "@utils/Doctor";

jest.mock("@utils/Doctor", () => ({
  updateUserData: jest.fn().mockResolvedValue("updated"),
}));
const mockUserData = {
  licenseNo: 1234,
  speciality: "Cardiology",
  experience: 5,
  organizationType: "hospital",
  organizationName: "ABC Hospital",
};

describe("ProfessionalInfoCard", () => {
  it("Render the card with given user data", () => {
    const { asFragment } = render(
      <ProfessionalInfoCard userData={mockUserData} />,
    );
    expect(screen.getByText("Professional Information")).toBeInTheDocument();
    expect(screen.getByLabelText("License Number")).toHaveValue(
      mockUserData.licenseNo,
    );
    expect(screen.getByLabelText("Speciality")).toHaveValue(
      mockUserData.speciality,
    );
    expect(screen.getByLabelText("Experience")).toHaveValue(
      mockUserData.experience,
    );
    expect(screen.getByLabelText("Organization Name")).toHaveValue(
      mockUserData.organizationName,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("renders ProfessionalInfoCard component with user data", async () => {
    render(<ProfessionalInfoCard userData={mockUserData} />);
  });

  it("allows editing and saving professional details", async () => {
    render(<ProfessionalInfoCard userData={mockUserData} />);
    fireEvent.click(screen.getByText("Edit Details"));
    fireEvent.change(screen.getByLabelText("License Number"), {
      target: { value: 5678 },
    });
    fireEvent.click(screen.getByText("Save"));
    expect(updateUserData).toHaveBeenCalledWith({
      ...mockUserData,
      licenseNo: "5678",
    });
  });

  it("cancels the editing of professional details", async () => {
    render(<ProfessionalInfoCard userData={mockUserData} />);
    fireEvent.click(screen.getByText("Edit Details"));
    fireEvent.change(screen.getByLabelText("License Number"), {
      target: { value: 5678 },
    });
    fireEvent.click(screen.getByText("Cancel"));
    expect(screen.getByText("Edit Details")).toBeInTheDocument();
    expect(screen.getByLabelText("License Number")).toHaveValue(
      mockUserData.licenseNo,
    );
  });
});
