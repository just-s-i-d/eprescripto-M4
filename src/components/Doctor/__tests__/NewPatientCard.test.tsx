import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@test/matchMedia";
import NewPatientCard from "../NewPatientCard";
import { Form } from "antd";

const NewPatientCardWrapper = () => {
  const [mockForm] = Form.useForm();

  return <NewPatientCard newPatientForm={mockForm} />;
};
const formData = {
  pName: "John Doe",
  email: "john.doe@example.com",
  dob: "1990-01-01",
  gender: "male",
  contactNo: "9876543210",
  allergies: "Pollen",
};
export default NewPatientCardWrapper;

describe("NewPatientCard", () => {
  it("Renders NewPatientCard component with form", () => {
    const { asFragment } = render(<NewPatientCardWrapper />);
    expect(screen.getByLabelText("Patient Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Date of Birth")).toBeInTheDocument();
    expect(screen.getByLabelText("Gender")).toBeInTheDocument();
    expect(screen.getByLabelText("Mobile")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Mention allergies , if any"),
    ).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("form submission test", async () => {
    render(<NewPatientCardWrapper />);
    fireEvent.change(screen.getByLabelText("Patient Name"), {
      target: { value: formData.pName },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: formData.email },
    });
    fireEvent.change(screen.getByLabelText("Date of Birth"), {
      target: { value: formData.dob },
    });
    fireEvent.change(screen.getByLabelText("Gender"), {
      target: { value: formData.gender },
    });
    fireEvent.change(screen.getByLabelText("Mobile"), {
      target: { value: formData.contactNo },
    });
    fireEvent.change(screen.getByLabelText("Mention allergies , if any"), {
      target: { value: formData.allergies },
    });
    fireEvent.submit(screen.getByTestId("new-patient-form"));
  });
});
