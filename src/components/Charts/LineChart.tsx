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
import {
  ApiResponseDataType,
  LineChartApiResDataType,
  LineChartDataType,
} from "@constants/types";
import useStatesHook from "src/hooks/useStatesHook";

ChartJs.register(LineElement, CategoryScale, LinearScale, PointElement, scales);

type LineChartProps = {
  chartData?: ApiResponseDataType<LineChartApiResDataType>;
  title: string;
  error?: boolean;
  xAxesTitle: string;
  yAxesTitle: string;
  lineChart: ReturnType<
    typeof useStatesHook<ApiResponseDataType<LineChartApiResDataType>>
  >;
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
  error,
}: LineChartProps) => {
  const [currentLineChartData, setCurrentLineChartData] =
    useState<LineChartDataType>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (chartData) {
      setCurrentLineChartData(getDataForLineGraph(chartData.attributes));
      setLoading(false);
    }
  }, [chartData, getDataForLineGraph]);
  const handleChange = (value: number) => {
    if (chartData)
      setCurrentLineChartData(getDataForLineGraph(chartData.attributes, value));
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
  const options: ChartOptions<"line"> = {
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
      className="w-[49%] max-xl:w-[48%] max-xxl:w-[48%] max-md:w-9/12 max-sm:w-full"
      bordered={false}
    >
      <ErrorBoundary
        refreshComponent={() => lineChart.setRefresh((prev) => !prev)}
        error={error || lineChart.error}
      >
        <div className="flex justify-between">
          <CardTitle>{title}</CardTitle>
          <Select
            className="xs:w-[120px] xxl:w-[200px] float-right mr-2"
            options={selectOptions}
            onChange={handleChange}
            defaultValue={7}
          />
        </div>

        {loading ? (
          <Skeleton.Avatar size={200} className="mt-2" active shape="square" />
        ) : (
          <Line data={data} options={options} className="overflow-scroll" />
        )}
      </ErrorBoundary>
    </Card>
  );
};
export default LineChart;
