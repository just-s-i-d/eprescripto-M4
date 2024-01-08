import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import MedicationForm from "../MedicationForm";
import "@test/matchMedia";

const mockFields = {
  id: 1,
  medicine: "MedicineName1",
  dosage: "dosage1",
  timesPerDay: "frequency1",
  instruction: "instruction1",
};

const mockRemoveMedicationInput = jest.fn();

describe("MedicationForm", () => {
  it("Snapshot test", () => {
    const { asFragment } = render(
      <MedicationForm
        fields={mockFields}
        removeMedicationInput={mockRemoveMedicationInput}
      />,
    );
    expect(screen.getByText("Medication")).toBeInTheDocument();
    expect(screen.getByLabelText("Medicine Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Dosage")).toBeInTheDocument();
    expect(screen.getByLabelText("Frequency")).toBeInTheDocument();
    expect(screen.getByLabelText("Instruction")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("calls removeMedicationInput when remove field is clicked", async () => {
    render(
      <MedicationForm
        fields={mockFields}
        removeMedicationInput={mockRemoveMedicationInput}
        removeable={true}
      />,
    );
    await waitFor(() => {
      const removeFieldBtn = screen.getByTestId("remove-field");
      expect(removeFieldBtn).toBeInTheDocument();
      fireEvent.click(removeFieldBtn);
      expect(mockRemoveMedicationInput).toHaveBeenCalledWith(mockFields.id);
    });
  });
});
