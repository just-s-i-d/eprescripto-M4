import { render, screen } from "@testing-library/react";
import DoctorDashboardPage from "../DoctorDashboardPage";
import "@test/matchMedia";
import "@testing-library/jest-dom";

jest.mock("@utils/Doctor", () => ({
  getData: jest.fn().mockResolvedValue("mockedResult"),
}));

describe("Doctor Dashboard Page test", () => {
  it("Test to check if all cards rendered correctly or not", () => {
    const { asFragment } = render(<DoctorDashboardPage darkMode={false} />);
    expect(screen.getByTestId("info-cards")).toBeInTheDocument();
    expect(screen.getByText("Next Patient")).toBeInTheDocument();
    expect(screen.getByText("Today's Appointments")).toBeInTheDocument();
    expect(screen.getByText("Ratings Composition")).toBeInTheDocument();
    expect(screen.getByText("Patients in Last Days")).toBeInTheDocument();
    expect(screen.getByText("Age Groups Comparison")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
