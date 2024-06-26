import { useEffect, useState } from "react";

import { Card, Skeleton } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  scales,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import ErrorBoundary from "@components/ErrorBoundary";
import CardTitle from "@components/ui/CardTitle";
import { ApiResponseDataType, ChartDataType } from "@constants/types";
import useStatesHook from "../../hooks/useStatesHook";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  scales,
);

type PieChartPropsType = {
  chartData?: ApiResponseDataType<ChartDataType>;
  title: string;
  label: string;
  xAxesTitle: string;
  yAxesTitle: string;
  barChart: ReturnType<
    typeof useStatesHook<ApiResponseDataType<ChartDataType>>
  >;
};

const BarChart = ({
  chartData,
  title,
  label,
  xAxesTitle,
  yAxesTitle,
  barChart,
}: PieChartPropsType) => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (chartData) setLoading(false);
  }, [chartData]);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: label,
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
  const data = {
    labels: chartData?.attributes.labels,
    datasets: [
      {
        label: label,
        data: chartData?.attributes.data,
        backgroundColor: "#96CCA3",
      },
    ],
  };
  return (
    <Card
      className="w-[49%] max-xl:w-[48%] max-xxl:w-[48%] max-md:w-9/12 max-sm:w-full"
      bordered={false}
    >
      <ErrorBoundary
        error={barChart.error}
        refreshComponent={() => barChart.setRefresh((prev) => !prev)}
      >
        <CardTitle className="mb-14">{title}</CardTitle>
        {loading ? (
          <Skeleton.Avatar
            className="mt-2 ml-4"
            active
            shape="square"
            size={200}
          />
        ) : (
          <Bar options={options} data={data} />
        )}
      </ErrorBoundary>
    </Card>
  );
};

export default BarChart;
