import { useEffect } from "react";

import NextPatientCard from "@components/Doctor/NextPatientCard";
import InfoCards from "@components/Doctor/InfoCards";
import ErrorBoundary from "@components/ErrorBoundary";
import LineChart from "@components/Charts/LineChart";
import BarChart from "@components/Charts/BarChart";
import AppoinmentsCard from "@components/Doctor/AppoinmentsCard";
import DoughnutChart from "@components/Charts/DoughnutChart";
import {
  appointmentsEndPoint,
  barChartDataEndPoint,
  doughnutChartDataEndPoint,
  getData,
  getDataForLineGraph,
  infoCardDataEndPoint,
  lineChartDataEndPoint,
} from "@utils/Doctor";
import useStatesHook from "../../hooks/useStatesHook";
import {
  ApiResponseData,
  ApiResponseDataType,
  AppointmentDataType,
  ChartDataType,
  InfoCardDetailsType,
  LineChartApiResDataType,
} from "@constants/types";

const DoctorDashboardPage: React.FC = () => {
  const infoCards = useStatesHook<ApiResponseData<InfoCardDetailsType>>();
  const appointments = useStatesHook<ApiResponseData<AppointmentDataType>>();
  const doughnutChart = useStatesHook<ApiResponseDataType<ChartDataType>>();
  const barChart = useStatesHook<ApiResponseDataType<ChartDataType>>();
  const lineChart =
    useStatesHook<ApiResponseDataType<LineChartApiResDataType>>();
  useEffect(() => {
    getData(infoCardDataEndPoint)
      .then((res) => {
        infoCards.setData(res);
        infoCards.setError(false);
      })
      .catch(() => {
        infoCards.setError(true);
      });
  }, [infoCards.refresh]); //eslint-disable-line

  useEffect(() => {
    getData(appointmentsEndPoint)
      .then((res) => {
        appointments.setData(res);
        appointments.setLoading(false);
        appointments.setError(false);
      })
      .catch(() => {
        appointments.setError(true);
        appointments.setLoading(false);
      });
  }, [appointments.refresh]); //eslint-disable-line

  useEffect(() => {
    getData(doughnutChartDataEndPoint)
      .then((res) => {
        doughnutChart.setData(res);
        doughnutChart.setLoading(false);
        doughnutChart.setError(false);
      })
      .catch(() => {
        doughnutChart.setError(true);
      });
  }, [doughnutChart.refresh]); //eslint-disable-line

  useEffect(() => {
    getData(lineChartDataEndPoint)
      .then((res) => {
        lineChart.setData(res);
        lineChart.setError(false);
      })
      .catch(() => {
        lineChart.setError(true);
      });
  }, [lineChart.refresh]); //eslint-disable-line

  useEffect(() => {
    getData(barChartDataEndPoint)
      .then((res) => {
        barChart.setData(res);
        barChart.setError(false);
      })
      .catch(() => {
        barChart.setError(true);
      });
  }, [barChart.refresh]); //eslint-disable-line

  return (
    <>
      <ErrorBoundary>
        <div className="max-w-full flex">
          <div className="w-full flex flex-col gap-6">
            <ErrorBoundary>
              <InfoCards cardDetails={infoCards.data} infoCards={infoCards} />
            </ErrorBoundary>
            <div className="flex flex-wrap justify-between gap-y-6 max-tablet:justify-center">
              <ErrorBoundary>
                <NextPatientCard
                  appointments={appointments}
                  appointment={appointments.data && appointments.data[0]}
                  error={appointments.error}
                />
              </ErrorBoundary>
              <ErrorBoundary>
                <DoughnutChart
                  doughnutChart={doughnutChart}
                  chartData={doughnutChart.data}
                  title="Ratings Composition"
                  label="Reviews"
                />
              </ErrorBoundary>
              <ErrorBoundary>
                <AppoinmentsCard
                  appointmentsState={appointments}
                  appointments={appointments.data}
                  loading={appointments.loading}
                />
              </ErrorBoundary>
              <ErrorBoundary>
                <LineChart
                  lineChart={lineChart}
                  chartData={lineChart.data}
                  title="Patients in Last 7 Days"
                  xAxesTitle="Dates"
                  yAxesTitle="Number of Patients"
                  getDataForLineGraph={getDataForLineGraph}
                />
              </ErrorBoundary>
              <ErrorBoundary>
                <BarChart
                  barChart={barChart}
                  chartData={barChart.data}
                  title="Age Groups Comparison"
                  label="Patients"
                  xAxesTitle="Different Age Groups (In Years)"
                  yAxesTitle="Number of Patients"
                />
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    </>
  );
};

export default DoctorDashboardPage;
