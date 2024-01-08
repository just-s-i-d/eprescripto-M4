import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import DoctorAppointmentsPage from "../DoctorAppointmentsPage";
import "@testing-library/jest-dom";
import "@test/matchMedia";
import { cancelAppointment, getData } from "@utils/Doctor";
import { showToast } from "@utils/common";

jest.mock("@utils/Doctor", () => ({
  getData: jest.fn().mockResolvedValue([
    {
      id: 8,
      attributes: {
        pId: 1,
        pName: "John Doe",
        email: "john.doe@example.com",
        date: "12/20/23",
        timeSlot: "10:00 AM - 11:00 AM",
        referrer: "Dr. Smith",
        status: "Pending",
        contact: "123-456-7890",
      },
    },
    {
      id: 9,
      attributes: {
        pId: 2,
        pName: "Jane Smith",
        email: "jane.smith@example.com",
        date: "12/20/23",
        timeSlot: "11:30 AM - 12:30 PM",
        referrer: "Dr. Johnson",
        status: "Attended",
        contact: "987-654-3210",
      },
    },
  ]),
  cancelAppointment: jest
    .fn()
    .mockResolvedValue({ message: "Cancelled", type: "success" }),
  formatDateReadable: jest.fn().mockReturnValue("28 December 2023"),
}));

jest.mock("@utils/common", () => ({
  showToast: jest.fn(),
}));

describe("Doctor Appointments Page tests", () => {
  it("renders the component and displays appointments", async () => {
    const { asFragment } = render(<DoctorAppointmentsPage />);
    await waitFor(() => {
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it("Cancel appointment successfull test", async () => {
    render(<DoctorAppointmentsPage />);
    await waitFor(() => {
      const cancelAppointmentBtn = screen.getByTestId("cancel-appointment-btn");
      expect(cancelAppointmentBtn).toBeInTheDocument();
      fireEvent.click(cancelAppointmentBtn);
      const confirmBtn = screen.getByText("Sure");
      expect(confirmBtn).toBeInTheDocument();
      fireEvent.click(confirmBtn);
    });
    await waitFor(() => {
      expect(cancelAppointment).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(showToast).toHaveBeenCalledWith("Cancelled", "success");
    });
  });
  it("Cancel appointment failed test", async () => {
    (cancelAppointment as jest.Mock).mockRejectedValue({
      message: "Error",
      type: "error",
    });
    render(<DoctorAppointmentsPage />);
    await waitFor(() => {
      const cancelAppointmentBtn = screen.getByTestId("cancel-appointment-btn");
      expect(cancelAppointmentBtn).toBeInTheDocument();
      fireEvent.click(cancelAppointmentBtn);
      const confirmBtn = screen.getByText("Sure");
      expect(confirmBtn).toBeInTheDocument();
      fireEvent.click(confirmBtn);
    });
    await waitFor(() => {
      expect(cancelAppointment).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(showToast).toHaveBeenCalledWith("Error", "error");
    });
  });

  it("Error state handle test", async () => {
    (getData as jest.Mock).mockRejectedValue("Mocked result");
    render(<DoctorAppointmentsPage />);
    await waitFor(() => {
      expect(screen.getByText("Something went wrong"));
    });
  });
});
