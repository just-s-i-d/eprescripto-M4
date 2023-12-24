import { useEffect, useState } from "react";

import { Card, Skeleton } from "antd";
import { ArcElement, Chart as ChartJs, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import type { Chart, ChartOptions } from "chart.js";

import CardTitle from "@components/ui/CardTitle";
import ErrorBoundary from "@components/ErrorBoundary";
import { ApiResponseDataType, ChartDataType } from "@constants/types";
import useStatesHook from "src/hooks/useStatesHook";

ChartJs.register(ArcElement, Tooltip, Legend);
export const options: ChartOptions = {
  plugins: {
    legend: {
      display: true,
      position: "bottom",
    },
  },
};

type PieChartPropsType = {
  chartData?: ApiResponseDataType<ChartDataType>;
  title: string;
  label: string;
  doughnutChart: ReturnType<
    typeof useStatesHook<ApiResponseDataType<ChartDataType>>
  >;
  darkMode: boolean;
};
const colors: string[] = [
  "#96CCA3",
  "#3db5e8",
  "#3159a4",
  "#f7a825",
  "#ec6424",
];
const DoughnutChart = ({
  chartData,
  title,
  label,
  doughnutChart,
}: PieChartPropsType) => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (chartData) setLoading(false);
  }, [chartData]);
  const data = {
    labels: chartData?.attributes?.labels,
    datasets: [
      {
        label: label,
        data: chartData?.attributes?.data,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  };
  const plugins = [
    {
      id: "Doughnut Chart",
      beforeDraw: function (chart: Chart) {
        const width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
        ctx.restore();
        let fontSize = (height / 300).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "top";
        const text1 = "Total Ratings",
          textX1 = Math.round((width - ctx.measureText(text1).width) / 2),
          textY1 = height / 2.9;
        ctx.fillText(text1, textX1, textY1);
        fontSize = (height / 100).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        const text2 = `${chartData?.attributes?.totalCount}`,
          textX2 = Math.round((width - ctx.measureText(text2).width) / 2),
          textY2 = height / 2.4;
        ctx.fillText(text2, textX2, textY2);
        ctx.save();
      },
    },
  ];
  return (
    <Card
      className="w-[32%] max-h-[60vh] max-xxl:w-[48%] max-xxl:h-[59vh] max-xl:w-[48%] max-md:w-9/12 max-sm:w-full"
      bordered={false}
    >
      <ErrorBoundary
        refreshComponent={() => doughnutChart.setRefresh((prev) => !prev)}
        error={doughnutChart.error}
      >
        <CardTitle>{title}</CardTitle>
        {loading ? (
          <Skeleton.Avatar active size={250} />
        ) : (
          <div className="h-[400px] flex justify-center items-center">
            <Doughnut data={data} options={options} plugins={plugins} />
          </div>
        )}
      </ErrorBoundary>
    </Card>
  );
};
export default DoughnutChart;
