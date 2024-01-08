import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@test/matchMedia";
import DoctorPrescriptionPage from "../DoctorPrescriptionPage";
import { act } from "react-dom/test-utils";
import { addNewPatient, createNewPrescription } from "@utils/Doctor";
import { showToast } from "@utils/common";

jest.mock("@utils/Doctor", () => {
  return {
    ...jest.requireActual("@utils/Doctor"),
    getData: jest.fn().mockResolvedValue([]),
    addNewPatient: jest.fn(),
    createNewPrescription: jest.fn(),
  };
});

jest.mock("@utils/common", () => ({
  showToast: jest.fn(),
}));

export const mockedPrescriptionFormData = {
  dob: "2001-05-27",
  dosage2: "500mg",
  gender: "male",
  instruction2: "beforeFood",
  medicine2: "diclovin",
  pName: "siddharth paneri",
  prescriptionName: "record 2",
  timesPerDay2: 2,
};
describe("Doctor Prescriptions Page tests", () => {
  it("Renders the prescription form", () => {
    const { asFragment } = render(<DoctorPrescriptionPage />);
    expect(screen.getByText("Prescription Form")).toBeInTheDocument();
    expect(screen.getByTitle("Patient")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("Prescription Form cancel test", () => {
    render(<DoctorPrescriptionPage />);
    const cancelBtn = screen.getByText("Cancel");
    expect(cancelBtn).toBeInTheDocument();
    fireEvent.click(cancelBtn);
  });

  it("Add new patient modal test", async () => {
    (addNewPatient as jest.Mock).mockResolvedValue("Mocked Result");
    render(<DoctorPrescriptionPage />);
    const addNewPatientBtn = screen.getByRole("button", {
      name: "New Patient",
    });
    expect(addNewPatientBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(addNewPatientBtn);
    });
    await waitFor(() => {
      expect(
        screen.getByRole("dialog", { name: "New Patient" }),
      ).toBeInTheDocument();
      const addBtn = screen.getByText("Add Patient");
      fireEvent.click(addBtn);
    });
    await waitFor(() => {
      expect(addNewPatient).toHaveBeenCalled();
      expect(showToast).toHaveBeenCalled();
    });
  });

  it("Show patient allergies modal test", async () => {
    render(<DoctorPrescriptionPage />);
    const showPatientAllergiesBtn = screen.getByRole("button", {
      name: "Show Patient Allergies",
    });
    expect(showPatientAllergiesBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(showPatientAllergiesBtn);
    });
    await waitFor(() => {
      expect(screen.getByText("Patient Allergies")).toBeInTheDocument();
    });
  });

  it("Prescription Form submit test successfull", async () => {
    (createNewPrescription as jest.Mock).mockResolvedValue({
      message: "Created",
      type: "success",
    });
    render(<DoctorPrescriptionPage />);
    const prescriptionForm = screen.getByTestId("prescription-form");
    expect(prescriptionForm).toBeInTheDocument();
    expect(screen.getByLabelText("Prescription Name")).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Patient"), {
      target: { value: 1 },
    });
    fireEvent.change(screen.getByLabelText("Patient Name"), {
      target: { value: mockedPrescriptionFormData.pName },
    });
    fireEvent.change(screen.getByLabelText("Date of Birth"), {
      target: { value: mockedPrescriptionFormData.dob },
    });
    fireEvent.change(screen.getByLabelText("Gender"), {
      target: { value: mockedPrescriptionFormData.gender },
    });
    fireEvent.change(screen.getByLabelText("Prescription Name"), {
      target: { value: mockedPrescriptionFormData.prescriptionName },
    });
    fireEvent.change(screen.getByLabelText("Medicine Name"), {
      target: { value: mockedPrescriptionFormData.medicine2 },
    });
    fireEvent.change(screen.getByLabelText("Dosage"), {
      target: { value: mockedPrescriptionFormData.dosage2 },
    });
    fireEvent.change(screen.getByLabelText("Frequency"), {
      target: { value: mockedPrescriptionFormData.timesPerDay2 },
    });
    fireEvent.change(screen.getByLabelText("Instruction"), {
      target: { value: mockedPrescriptionFormData.instruction2 },
    });
    fireEvent.submit(prescriptionForm);
    await waitFor(() => {
      const submitFormBtn = screen.getByRole("button", {
        name: "Create Prescription",
      });
      fireEvent.click(submitFormBtn);
      expect(createNewPrescription).toHaveBeenCalled();
      expect(showToast).toHaveBeenCalledWith("Created", "success");
    });
  });
});
