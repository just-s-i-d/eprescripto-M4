import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@test/matchMedia";
import ProfessionalInfoForm from "../ProfessionalInfoForm";

describe("Professional info form test", () => {
  it("Render professional info fields correctly", () => {
    const { asFragment } = render(<ProfessionalInfoForm />);
    expect(screen.getByLabelText("License Number")).toBeInTheDocument();
    expect(screen.getByLabelText("Speciality")).toBeInTheDocument();
    expect(screen.getByLabelText("Experience")).toBeInTheDocument();
    expect(screen.getByLabelText("Organization Type")).toBeInTheDocument();
    expect(screen.getByLabelText("Organization Name")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
