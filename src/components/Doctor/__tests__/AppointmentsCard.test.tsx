import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AppoinmentsCard from "../AppoinmentsCard";
import useStatesHook from "@hooks/useStatesHook";
import { cancelAppointment, getData } from "@utils/Doctor";
import { ApiResponseData, AppointmentDataType } from "@constants/types";
import { showToast } from "@utils/common";
import "@test/matchMedia";
jest.mock("@utils/Doctor", () => ({
  getData: jest.fn().mockResolvedValue([
    {
      id: 8,
      attributes: {
        pName: "John Doe",
        timeSlot: "10:00 AM",
        status: "Pending",
        referrer: "Dr. Smith",
        contact: "123-456-7890",
      },
    },
  ]),
  cancelAppointment: jest
    .fn()
    .mockResolvedValue({ message: "Cancelled", type: "success" }),
}));
jest.mock("@utils/common", () => ({
  showToast: jest.fn(),
}));
jest.mock("@hooks/useStatesHook");

describe("AppoinmentsCard component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("Test to check if Appointments cards renders correctly with data", async () => {
    const mockedData: ApiResponseData<AppointmentDataType> =
      await getData("Mocked data");
    (useStatesHook as jest.Mock).mockReturnValue({
      data: mockedData,
      loading: false,
    });
    const mockUseStatesHook =
      useStatesHook<ApiResponseData<AppointmentDataType>>();
    const { asFragment } = render(
      <AppoinmentsCard
        appointments={mockedData}
        loading={false}
        appointmentsState={mockUseStatesHook}
        getDataForAppointments={() => {}}
      />,
    );
    await waitFor(() => {
      expect(
        screen.getByText(mockedData[0].attributes.pName),
      ).toBeInTheDocument();
      expect(
        screen.getByText(mockedData[0].attributes.timeSlot),
      ).toBeInTheDocument();
    });
    expect(asFragment()).toMatchSnapshot();
  });
  it("renders no data state", async () => {
    (useStatesHook as jest.Mock).mockReturnValue({ data: [] });
    const mockUseStatesHook =
      useStatesHook<ApiResponseData<AppointmentDataType>>();
    render(
      <AppoinmentsCard
        appointments={[]}
        loading={false}
        appointmentsState={mockUseStatesHook}
        getDataForAppointments={() => {}}
      />,
    );
    const noDataState = screen.getByText("No Appointments");
    expect(noDataState).toBeInTheDocument();
  });
  it("handling error state", async () => {
    (useStatesHook as jest.Mock).mockReturnValue({ data: [] });
    const mockUseStatesHook =
      useStatesHook<ApiResponseData<AppointmentDataType>>();
    const setRefreshMock = jest.fn();
    render(
      <AppoinmentsCard
        appointments={[]}
        loading={false}
        appointmentsState={{
          ...mockUseStatesHook,
          setRefresh: setRefreshMock,
          error: true,
        }}
        getDataForAppointments={() => {}}
      />,
    );
    const tryAgainBtn = screen.getByText("Try again");
    fireEvent.click(tryAgainBtn);
    expect(setRefreshMock).toHaveBeenCalled();
  });

  it("Cancel appointment successfull and show toast test", async () => {
    const mockedData: ApiResponseData<AppointmentDataType> =
      await getData("Mocked data");
    (useStatesHook as jest.Mock).mockReturnValue({
      data: mockedData,
      loading: false,
    });
    const mockUseStatesHook =
      useStatesHook<ApiResponseData<AppointmentDataType>>();
    render(
      <AppoinmentsCard
        appointments={mockedData}
        loading={false}
        appointmentsState={mockUseStatesHook}
        getDataForAppointments={() => {}}
      />,
    );
    const cancelBtn = screen.getByTestId("cancel-appointment-btn");
    expect(cancelBtn).toBeInTheDocument();
    fireEvent.click(cancelBtn);
    expect(screen.getByText("Cancel Appointment")).toBeInTheDocument();
    const confirmBtn = screen.getByText("Sure");
    fireEvent.click(confirmBtn);
    await waitFor(() => {
      expect(cancelAppointment).toHaveBeenCalledWith(mockedData[0]);
      expect(showToast).toHaveBeenCalledWith("Cancelled", "success");
    });
  });
  it("Cancel appointment Failure and show toast test", async () => {
    (cancelAppointment as jest.Mock).mockRejectedValue({
      message: "Error",
      type: "error",
    });
    const mockedData: ApiResponseData<AppointmentDataType> =
      await getData("Mocked data");
    (useStatesHook as jest.Mock).mockReturnValue({
      data: mockedData,
      loading: false,
    });
    const mockUseStatesHook =
      useStatesHook<ApiResponseData<AppointmentDataType>>();
    render(
      <AppoinmentsCard
        appointments={mockedData}
        loading={false}
        appointmentsState={mockUseStatesHook}
        getDataForAppointments={() => {}}
      />,
    );
    const cancelBtn = screen.getByTestId("cancel-appointment-btn");
    expect(cancelBtn).toBeInTheDocument();
    fireEvent.click(cancelBtn);
    expect(screen.getByText("Cancel Appointment")).toBeInTheDocument();
    const confirmBtn = screen.getByText("Sure");
    fireEvent.click(confirmBtn);
    await waitFor(() => {
      expect(cancelAppointment).toHaveBeenCalledWith(mockedData[0]);
      expect(showToast).toHaveBeenCalledWith("Error", "error");
    });
  });
});
