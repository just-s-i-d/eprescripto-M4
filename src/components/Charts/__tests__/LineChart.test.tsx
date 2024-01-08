import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import LineChart from "../LineChart";
import useStatesHook from "@hooks/useStatesHook";
import {
  ApiResponseDataType,
  LineChartApiResDataType,
  LineChartDataType,
} from "@constants/types";
import { getDataForLineGraph } from "@utils/Doctor";
import { getLabels } from "@constants/constants";
jest.mock("@hooks/useStatesHook");

jest.mock("@constants/constants", () => ({
  getLabels: jest.fn().mockResolvedValue(["labels"]),
}));
const mockGetLabels = getLabels;
jest.mock("@utils/Doctor", () => ({
  getDataForLineGraph: jest.fn(
    (data: LineChartApiResDataType, days: number = 7): LineChartDataType => {
      const labels = mockGetLabels(days);
      switch (days) {
        case 7:
          return { labels, data: data.seven };
        case 10:
          return { labels, data: data.ten };
        case 30:
          return { labels, data: data.thirty };
        default:
          return { labels, data: data.seven };
      }
    },
  ),
}));
describe("LineChart", () => {
  const mockChartData = {
    id: 1,
    attributes: {
      seven: [13, 5, 9, 19, 13, 10, 6],
      ten: [13, 5, 9, 19, 13, 10, 6, 13, 5, 9],
      thirty: [
        13, 5, 9, 19, 13, 10, 6, 13, 5, 9, 13, 5, 9, 19, 13, 10, 6, 13, 5, 9,
        13, 5, 9, 19, 13, 10, 6, 13, 5, 9,
      ],
    },
  };
  (useStatesHook as jest.Mock).mockReturnValue({
    data: mockChartData,
    error: false,
    loading: true,
    setRefresh: jest.fn(),
  });
  const mockLineChart =
    useStatesHook<ApiResponseDataType<LineChartApiResDataType>>();
  const mockGetDataForLineGraph = getDataForLineGraph;

  it("Test to check if it renders correctly or not", () => {
    const { asFragment } = render(
      <LineChart
        chartData={mockChartData}
        title="Test Title"
        xAxesTitle="X Axis"
        yAxesTitle="Y Axis"
        getDataForLineGraph={mockGetDataForLineGraph}
        lineChart={mockLineChart}
      />,
    );
    expect(screen.queryByText("Something went wrong")).toBeNull();
    expect(asFragment()).toMatchSnapshot();
  });

  it("handles error state", () => {
    render(
      <LineChart
        chartData={mockChartData}
        title="Test Title"
        error={true}
        xAxesTitle="X Axis"
        yAxesTitle="Y Axis"
        getDataForLineGraph={mockGetDataForLineGraph}
        lineChart={mockLineChart}
      />,
    );
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    const tryAgainbtn = screen.getByText("Try again");
    fireEvent.click(tryAgainbtn);
    expect(mockLineChart.setRefresh).toHaveBeenCalled();
  });

  it("updates chart data on select change", () => {
    render(
      <LineChart
        chartData={mockChartData}
        title="Test Title"
        xAxesTitle="X Axis"
        yAxesTitle="Y Axis"
        getDataForLineGraph={mockGetDataForLineGraph}
        lineChart={mockLineChart}
      />,
    );
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "10" } });
    expect(mockGetDataForLineGraph).toHaveBeenCalledWith(
      mockChartData.attributes,
    );
  });
});
