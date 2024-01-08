import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import DoctorReviewsPage from "../DoctorReviewsPage";
import "@testing-library/jest-dom";
import "@test/matchMedia";
import { getData } from "@utils/Doctor";

jest.mock("@utils/Doctor", () => ({
  getData: jest.fn().mockResolvedValue([
    {
      id: 8,
      attributes: {
        rating: 5,
        comment: "Excellent service!",
      },
    },
    {
      id: 9,
      attributes: {
        rating: 4,
        comment: "Good experience.",
      },
    },
  ]),
}));

describe("Doctor Reviews Pages tests", () => {
  it("Renders the component and displays reviews", async () => {
    const { asFragment } = render(<DoctorReviewsPage />);
    await waitFor(() => {
      expect(screen.getByText("Excellent service!")).toBeInTheDocument();
      expect(screen.getByText("Good experience.")).toBeInTheDocument();
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it("Error state handle test", async () => {
    (getData as jest.Mock).mockRejectedValue("Mocked result");
    render(<DoctorReviewsPage />);
    await waitFor(() => {
      expect(screen.getByText("Something went wrong"));
      const tryAgain = screen.getByText("Try again");
      expect(tryAgain).toBeInTheDocument();
      fireEvent.click(tryAgain);
    });
  });
});
