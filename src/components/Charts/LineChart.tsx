import { Line } from "react-chartjs-2";
import { Card, Select, Skeleton } from "antd";
import CardTitle from "@components/ui/CardTitle";

import {
  Chart as ChartJs,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  scales,
} from "chart.js";
import type { ChartOptions } from "chart.js";

import ErrorBoundary from "@components/ErrorBoundary";
import { useEffect, useState } from "react";
import { LineChartApiResDataType, LineChartDataType } from "@constants/types";
import UseStatesHook from "src/hooks/UseStatesHook";

ChartJs.register(LineElement, CategoryScale, LinearScale, PointElement, scales);

type LineChartProps = {
  chartData: LineChartApiResDataType | undefined;
  title: string;
  xAxesTitle: string;
  yAxesTitle: string;
  lineChart: ReturnType<typeof UseStatesHook<LineChartApiResDataType>>;
  getDataForLineGraph: (
    data: LineChartApiResDataType,
    days?: number,
  ) => LineChartDataType;
};
const selectOptions = [
  { value: 7, label: "Last 7 days" },
  { value: 10, label: "Last 10 days" },
  { value: 30, label: "Last 30 days" },
];
const LineChart = ({
  chartData,
  title,
  xAxesTitle,
  yAxesTitle,
  getDataForLineGraph,
  lineChart,
}: LineChartProps) => {
  const [currentLineChartData, setCurrentLineChartData] =
    useState<LineChartDataType>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (chartData) {
      setCurrentLineChartData(getDataForLineGraph(chartData));
      setLoading(false);
    }
  }, [chartData, getDataForLineGraph]);
  const handleChange = (value: number) => {
    if (chartData)
      setCurrentLineChartData(getDataForLineGraph(chartData, value));
  };
  const data = {
    labels: currentLineChartData?.labels,
    datasets: [
      {
        data: currentLineChartData?.data,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };
  const options: ChartOptions = {
    layout: {
      padding: {
        top: 20,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: xAxesTitle,
          color: "#19504C",
        },
      },
      y: {
        title: {
          display: true,
          text: yAxesTitle,
          color: "#19504C",
        },
      },
    },
  };
  return (
    <Card
      className="w-[49%] max-desktop:w-[48%] max-tablet:w-9/12 max-mobile:w-full"
      bordered={false}
    >
      <ErrorBoundary
        refreshComponent={() => lineChart.setRefresh((prev) => !prev)}
        error={lineChart.error}
      >
        <CardTitle>{title}</CardTitle>
        <Select
          className="w-[200px] max-mobile:w-[150px] float-right mr-2"
          options={selectOptions}
          onChange={handleChange}
          defaultValue={7}
        />
        {loading ? (
          <Skeleton.Avatar
            className="mt-2"
            style={{ width: "full", height: "300px" }}
            active
            shape="square"
          />
        ) : (
          <Line data={data} options={options} />
        )}
      </ErrorBoundary>
    </Card>
  );
};
export default LineChart;
