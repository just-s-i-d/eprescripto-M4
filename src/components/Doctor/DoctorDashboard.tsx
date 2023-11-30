import { useEffect, useState } from "react";

import NextPatientCard from "./NextPatientCard";
import InfoCards from "./InfoCards";
import ErrorBoundary from "@components/ErrorBoundary";
import PieChart from "../Charts/PieChart";
import LineChart from "@components/Charts/LineChart";
import BarChart from "@components/Charts/BarChart";
import AppoinmentsCard from "./AppoinmentsCard";
import {
  AppointmentsDataType,
  ChartDataType,
  InfoCardDetailsType,
  LineChartApiResDataType,
} from "@constants/types";
import {
  barChartDataEndPoint,
  getAppointmentData,
  getChartData,
  getDataForLineGraph,
  getInfoCardsData,
  lineChartDataEndPoint,
  pieChartDataEndPoint,
} from "@utils/Doctor";

const DoctorDashboard: React.FC = () => {
  const [lineChartData, setLineChartData] = useState<LineChartApiResDataType>();
  const [infoCardError, setInfoCardError] = useState(false);
  const [appointmentCardError, setAppointmentCardError] = useState(false);
  const [appointments, setAppointments] = useState<AppointmentsDataType>();
  const [infoCardsData, setInfoCardsData] = useState<InfoCardDetailsType>();
  const [pieChartData, setPieChartData] = useState<ChartDataType>();
  const [barChartData, setBarChartData] = useState<ChartDataType>();

  useEffect(() => {
    getInfoCardsData()
      .then((res) => {
        setInfoCardsData(res);
        setInfoCardError(false);
      })
      .catch(() => setInfoCardError(true));
    getAppointmentData()
      .then((res) => setAppointments(res))
      .catch(() => setAppointmentCardError(true));
    getChartData(pieChartDataEndPoint).then((res) => {
      setPieChartData(res.pieChartData);
    });
    getChartData(lineChartDataEndPoint).then((res) => {
      setLineChartData(res.lineChartData);
    });
    getChartData(barChartDataEndPoint).then((res) => {
      setBarChartData(res.barChartData);
    });
  }, []);
  return (
    <>
      <ErrorBoundary>
        <div className="max-w-full flex">
          <div className="w-full flex flex-col gap-6">
            <ErrorBoundary error={infoCardError}>
              <InfoCards cardDetails={infoCardsData} error={infoCardError} />
            </ErrorBoundary>
            <div className="flex flex-wrap justify-between gap-y-6 max-tablet:justify-center">
              <ErrorBoundary>
                <NextPatientCard
                  appointment={appointments && appointments[0]}
                  error={appointmentCardError}
                />
              </ErrorBoundary>
              <ErrorBoundary>
                <PieChart
                  chartData={pieChartData}
                  title="Ratings Composition"
                  label="Reviews"
                />
              </ErrorBoundary>
              <ErrorBoundary>
                <AppoinmentsCard
                  appointments={appointments}
                  loading={appointmentCardError}
                />
              </ErrorBoundary>
              <ErrorBoundary>
                <LineChart
                  chartData={lineChartData}
                  title="Patients in Last 7 Days"
                  xAxesTitle="Dates"
                  yAxesTitle="Number of Patients"
                  getDataForLineGraph={getDataForLineGraph}
                />
              </ErrorBoundary>
              <ErrorBoundary>
                <BarChart
                  chartData={barChartData}
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

export default DoctorDashboard;
