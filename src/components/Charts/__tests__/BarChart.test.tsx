import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import BarChart from "../BarChart";
import useStatesHook from "@hooks/useStatesHook";
import { ApiResponseDataType, ChartDataType } from "@constants/types";

jest.mock("@hooks/useStatesHook");

describe("BarChart Component", () => {
  const chartData = {
    id: 1,
    attributes: {
      labels: ["Label1", "Label2", "Label3", "Label4", "Label5"],
      data: [10, 20, 30, 15, 5],
      totalCount: 80,
    },
  };
  it("Test to check if it renders correctly or not", () => {
    (useStatesHook as jest.Mock).mockResolvedValue({
      data: chartData,
      error: false,
      loading: true,
      setRefresh: jest.fn(),
    });
    const barChart = useStatesHook<ApiResponseDataType<ChartDataType>>();
    const { asFragment } = render(
      <BarChart
        chartData={chartData}
        title="Test Title"
        label="Test Label"
        xAxesTitle="X Axes Title"
        yAxesTitle="Y Axes Title"
        barChart={barChart}
      />,
    );
    expect(screen.queryByText("Something went wrong")).toBeNull();
    expect(asFragment()).toMatchSnapshot();
  });
  it("Test to check error handling", async () => {
    const mockSetRefresh = jest.fn();
    (useStatesHook as jest.Mock).mockReturnValue({
      data: {},
      error: true,
      setRefresh: mockSetRefresh,
    });
    const barChart = useStatesHook<ApiResponseDataType<ChartDataType>>();
    render(
      <BarChart
        chartData={chartData}
        title="Test Title"
        label="Test Label"
        xAxesTitle="X Axes Title"
        yAxesTitle="Y Axes Title"
        barChart={barChart}
      />,
    );
    await waitFor(() => {
      expect(screen.getByText("Something went wrong")).toBeInTheDocument();
      fireEvent.click(screen.getByRole("button", { name: "Try again" }));
      expect(mockSetRefresh).toHaveBeenCalled();
    });
  });
});
