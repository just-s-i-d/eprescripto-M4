import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DoughnutChart from "../DoughnutChart";
import useStatesHook from "@hooks/useStatesHook";
import { ApiResponseDataType, ChartDataType } from "@constants/types";

jest.mock("@hooks/useStatesHook");

const mockedChartData = {
  id: 1,
  attributes: {
    labels: ["Label1", "Label2", "Label3", "Label4", "Label5"],
    data: [10, 20, 30, 15, 5],
    totalCount: 80,
  },
};
describe("DoughnutChart Component", () => {
  it("Test to check if it renders correctly", () => {
    (useStatesHook as jest.Mock).mockReturnValue({
      data: mockedChartData,
      error: false,
      loading: true,
      setRefresh: jest.fn(),
    });
    const doughnutChart = useStatesHook<ApiResponseDataType<ChartDataType>>();
    const { asFragment } = render(
      <DoughnutChart
        darkMode={false}
        chartData={mockedChartData}
        title="Test Title"
        label="Test Label"
        doughnutChart={doughnutChart}
      />,
    );
    const chartElement = screen.getByTestId("doughnut-chart");
    expect(chartElement).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("handle error test", () => {
    (useStatesHook as jest.Mock).mockReturnValue({
      data: mockedChartData,
      error: true,
      loading: false,
      setRefresh: jest.fn(),
    });
    const doughnutChart = useStatesHook<ApiResponseDataType<ChartDataType>>();
    render(
      <DoughnutChart
        darkMode={false}
        error={true}
        chartData={mockedChartData}
        title="Test Title"
        label="Test Label"
        doughnutChart={doughnutChart}
      />,
    );
    const tryAgainBtn = screen.getByText("Try again");
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(tryAgainBtn).toBeInTheDocument();
    fireEvent.click(tryAgainBtn);
    expect(doughnutChart.setRefresh).toHaveBeenCalled();
  });
});
