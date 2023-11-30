import NextPatientCard from "./NextPatientCard";
import AppoinmentTable from "./AppoinmentTable";
import InfoCards from "./InfoCards";
// import RatingPieChart from "./RatingPieChart";
import ErrorBoundary from "@components/ErrorBoundary";
const DoctorDashboard: React.FC = () => {
  return (
    <>
      <ErrorBoundary>
        <div className="max-w-full flex">
          <div className="w-full flex flex-col gap-6">
            <ErrorBoundary>
              <InfoCards />
            </ErrorBoundary>
            <div className="flex gap-6 max-desktop:flex-wrap max-laptop:basis-2/5">
              <ErrorBoundary>
                <NextPatientCard />
              </ErrorBoundary>
              {/* <ErrorBoundary>
                <RatingPieChart />
              </ErrorBoundary> */}
              <ErrorBoundary>
                <AppoinmentTable />
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    </>
  );
};

export default DoctorDashboard;
