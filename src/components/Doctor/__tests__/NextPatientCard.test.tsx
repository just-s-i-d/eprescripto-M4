import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import NextPatientCard from "../NextPatientCard";
import useStatesHook from "@hooks/useStatesHook";
import { AppointmentsApiResonseType } from "@constants/types";
import { cancelAppointment, formatDateReadable } from "@utils/Doctor";
import { showToast } from "@utils/common";

jest.mock("@utils/Doctor", () => ({
  cancelAppointment: jest.fn(() =>
    Promise.resolve({ message: "Cancelled", type: "success" }),
  ),
  getData: jest.fn(() => Promise.resolve([])),
  prescriptionsDataEndPoint: "mocked/prescription-endpoint",
  formatDateReadable: jest.fn().mockReturnValue("28 Dec 2023"),
}));

jest.mock("@hooks/useStatesHook");
jest.mock("@utils/common", () => ({
  showToast: jest.fn(),
}));

const mockAppointment = {
  id: 24,
  attributes: {
    id: 24,
    pId: "A01",
    userId: "A01",
    lastVisited: "11/17/23",
    pName: "John doe",
    referrer: "Dr. Verma",
    gender: "Male",
    timeSlot: "10:00 am to 11:00 am",
    contact: "9876543210",
    status: "Pending",
    profilePic: "profile-pic-url",
    createdAt: "2023-12-27T11:32:46.415Z",
    updatedAt: "2023-12-27T11:32:47.335Z",
    publishedAt: "2023-12-27T11:32:47.332Z",
    date: "12/27/23",
    email: "abc@abc.com",
  },
};

describe("NextPatientCard", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  (useStatesHook as jest.Mock).mockReturnValue({
    data: [mockAppointment],
    setData: jest.fn(),
    loading: false,
    setLoading: jest.fn(),
    error: false,
    setError: jest.fn(),
    refresh: false,
    setRefresh: jest.fn(),
  });

  const mockAppointments = useStatesHook<AppointmentsApiResonseType>();
  it("Test to check if it renders correctly", () => {
    const { asFragment } = render(
      <NextPatientCard
        error={false}
        appointment={mockAppointment}
        appointments={mockAppointments}
        getDataForAppointments={jest.fn()}
      />,
    );
    expect(screen.getByText("Next Patient")).toBeInTheDocument();
    expect(screen.getByAltText("profile-pic")).toBeInTheDocument();
    expect(screen.getByText("Patient Id")).toBeInTheDocument();
    expect(screen.getByText("Gender")).toBeInTheDocument();
    expect(screen.getByText("Last Visited")).toBeInTheDocument();
    expect(screen.getByText("Phone")).toBeInTheDocument();
    expect(screen.getByText("Time Slot")).toBeInTheDocument();
    expect(
      screen.getByText(mockAppointment.attributes.pName),
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockAppointment.attributes.email),
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockAppointment.attributes.pId),
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockAppointment.attributes.gender),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        formatDateReadable(mockAppointment.attributes.lastVisited),
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockAppointment.attributes.contact),
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockAppointment.attributes.timeSlot),
    ).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
  it("Error handle and try again btn test", async () => {
    render(
      <NextPatientCard
        error={false}
        appointment={mockAppointment}
        appointments={{ ...mockAppointments, error: true }}
        getDataForAppointments={jest.fn()}
      />,
    );
    await waitFor(() => {
      const tryAgainBtn = screen.getByText("Try again");
      expect(tryAgainBtn).toBeInTheDocument();
      fireEvent.click(tryAgainBtn);
      expect(mockAppointments.setRefresh).toHaveBeenCalled();
    });
  });
  it("Test to check if the appointment was cancelled successfully", async () => {
    render(
      <NextPatientCard
        error={false}
        appointment={mockAppointment}
        appointments={mockAppointments}
        getDataForAppointments={jest.fn()}
      />,
    );
    const cancelAppointmentBtn = screen.getByRole("button", {
      name: "Cancel Appointment",
    });
    fireEvent.click(cancelAppointmentBtn);
    const confirmBtn = screen.getByText("Sure");
    fireEvent.click(confirmBtn);
    await waitFor(() => {
      expect(cancelAppointment).toHaveBeenCalledWith(mockAppointment);
      expect(showToast).toHaveBeenCalledWith("Cancelled", "success");
    });
  });
  it("Test to check handling of error when appointment cancelletion fails", async () => {
    (cancelAppointment as jest.Mock).mockRejectedValue({
      message: "Error",
      type: "error",
    });
    render(
      <NextPatientCard
        error={false}
        appointment={mockAppointment}
        appointments={mockAppointments}
        getDataForAppointments={jest.fn()}
      />,
    );
    const cancelAppointmentBtn = screen.getByRole("button", {
      name: "Cancel Appointment",
    });
    fireEvent.click(cancelAppointmentBtn);
    const confirmBtn = screen.getByText("Sure");
    fireEvent.click(confirmBtn);
    await waitFor(() => {
      expect(cancelAppointment).toHaveBeenCalledWith(mockAppointment);
      expect(showToast).toHaveBeenCalledWith("Error", "error");
    });
  });
  it("Test to check if the precription button works properly or not", async () => {
    render(
      <NextPatientCard
        error={false}
        appointment={mockAppointment}
        appointments={mockAppointments}
        getDataForAppointments={jest.fn()}
      />,
    );
    await waitFor(() => {
      const prescriptionBtn = screen.getByRole("button", {
        name: "Prescriptions",
      });
      expect(prescriptionBtn).toBeInTheDocument();
      fireEvent.click(prescriptionBtn);
      expect(screen.getByText("All Prescriptions")).toBeInTheDocument();
    });
  });
});
