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
import type { ChartOptions } from "chart.js";

import ErrorBoundary from "@components/ErrorBoundary";
import CardTitle from "@components/ui/CardTitle";
import { ChartDataType } from "@constants/types";
import { useEffect, useState } from "react";
import UseStatesHook from "src/hooks/UseStatesHook";

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
  chartData: ChartDataType | undefined;
  title: string;
  label: string;
  xAxesTitle: string;
  yAxesTitle: string;
  barChart: ReturnType<typeof UseStatesHook<ChartDataType>>;
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
  const options: ChartOptions | undefined = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
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
    labels: chartData?.labels,
    datasets: [
      {
        label: label,
        data: chartData?.data,
        backgroundColor: "#96CCA3",
      },
    ],
  };
  return (
    <Card
      className="w-[49%] min-h-[30vh] max-desktop:w-[48%] max-tablet:basis-9/12 max-mobile:basis-[98%] overflow-hidden"
      bordered={false}
    >
      <ErrorBoundary
        error={barChart.error}
        refreshComponent={() => barChart.setRefresh((prev) => !prev)}
      >
        <CardTitle className="mb-14">{title}</CardTitle>
        {loading ? (
          <Skeleton.Avatar className="mt-2 ml-4" active shape="square" />
        ) : (
          <div className="overflow-scroll">
            <Bar options={options} data={data} width={"100%"} height={"60%"} />
          </div>
        )}
      </ErrorBoundary>
    </Card>
  );
};

export default BarChart;
