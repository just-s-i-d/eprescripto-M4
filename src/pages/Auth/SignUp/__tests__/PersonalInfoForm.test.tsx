import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@test/matchMedia";
import PersonalInfoForm from "../PersonalInfoForm";

describe("Personal form tests", () => {
  it("Render the form fields correctly", () => {
    const { asFragment } = render(<PersonalInfoForm />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Gender")).toBeInTheDocument();
    expect(screen.getByLabelText("Date of Birth")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
