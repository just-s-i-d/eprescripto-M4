import { Card, Image, Space, Skeleton, Button } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CardTitle from "@components/ui/CardTitle";
import { useEffect, useState } from "react";
import PopModal from "@components/ui/PopModal";
import TableCard from "@components/ui/TableCard";
import ErrorBoundary from "@components/ErrorBoundary";
import {
  AppointmentDataType,
  AppointmentsDataType,
  PrescrtionsDataType,
} from "@constants/types";
import { cancelAppointment, getPrescriptions } from "@utils/Doctor";
import UseStatesHook from "../../hooks/UseStatesHook";
import { columns } from "@constants/constants";

type NextPatientCardProps = {
  appointment: AppointmentDataType | undefined;
  error: boolean;
  appointments: ReturnType<typeof UseStatesHook<AppointmentsDataType>>;
};

const NextPatientCard = ({
  appointment,
  appointments,
}: NextPatientCardProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [visibililty, setVisibility] = useState(false);
  const prescriptions = UseStatesHook<PrescrtionsDataType>();
  const setPrescriptionsData = () => {
    getPrescriptions()
      .then((res) => {
        prescriptions.setData(res);
        prescriptions.setLoading(false);
        prescriptions.setError(false);
      })
      .catch(() => {
        prescriptions.setError(true);
      });
  };
  const handlePrescriptionClick = async () => {
    setVisibility(true);
    prescriptions.setLoading(true);
    setPrescriptionsData();
  };
  const confirmHandler = async () => {
    if (appointment) {
      const response = await cancelAppointment(appointment);
      response?.type === "success" && toast.success(response.message);
      response?.type === "error" && toast.error(response.message);
    }
  };
  useEffect(() => {
    appointment && setLoading(false);
  }, [appointment]);
  useEffect(() => {
    setPrescriptionsData();
  }, [prescriptions.refresh]); //eslint-disable-line
  return (
    <Card
      className="w-[32%] max-xxl:h-[60vh] max-h-[59vh] max-xl:w-[48%] max-md:w-9/12 max-sm:w-full max-sm:max-h-[60vh]"
      bordered={false}
    >
      <CardTitle>Next Patient</CardTitle>
      <ErrorBoundary
        error={appointments.error}
        refreshComponent={() => appointments.setRefresh((prev) => !prev)}
      >
        <div className="flex flex-col items-center">
          {loading ? (
            <Skeleton.Avatar active size={100} />
          ) : (
            <Image
              src={appointment?.profilePic}
              preview={false}
              width={100}
              className="rounded-[50%]"
            />
          )}
          <Space direction="vertical" align="center" className="mt-2">
            {loading ? (
              <Skeleton.Input active />
            ) : (
              <span className="xxl:text-[22px] max-xl:text-[18px] font-extrabold">
                {appointment?.pName}
              </span>
            )}
            {loading ? (
              <Skeleton.Input active />
            ) : (
              <span className="text-base font-bold">{appointment?.email}</span>
            )}
          </Space>
          <Space className="flex items-start text-lg mt-2">
            <Skeleton
              avatar={false}
              title={false}
              paragraph={{ rows: 6, width: [250, 250, 250, 250, 250, 250] }}
              active
              loading={loading}
            >
              <table className="text-base">
                <tbody>
                  <tr>
                    <td className="px-2 py-1 text-gray-500 font-semibold">
                      Patient Id
                    </td>
                    <td className="px-2 py-1 text-lg">{appointment?.pId}</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 text-gray-500 font-semibold">
                      Time Slot
                    </td>
                    <td className="px-2 py-1 text-lg">
                      {appointment?.timeSlot}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 text-gray-500 font-semibold">
                      Last Visited
                    </td>
                    <td className="px-2 py-1 text-lg">
                      {appointment?.lastVisited}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 text-gray-500 font-semibold">
                      Phone
                    </td>
                    <td className="px-2 py-1 text-lg">
                      {appointment?.contact}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 text-gray-500 font-semibold">
                      Gender
                    </td>
                    <td className="px-2 py-1 text-lg">{appointment?.gender}</td>
                  </tr>
                </tbody>
              </table>
              <Space className="mt-5">
                <Button onClick={() => setOpen(true)} danger>
                  Cancel Appointment
                </Button>
                <Button onClick={handlePrescriptionClick}>Prescriptions</Button>
              </Space>
            </Skeleton>
          </Space>
        </div>
        <PopModal
          footer={true}
          setOpen={setOpen}
          open={open}
          okButtonText="Sure"
          title="Cancel Appointment"
          confirmHandler={confirmHandler}
        >
          Are you sure,you want to cancel the appoinment for{" "}
          {appointment?.pName}?
        </PopModal>
        <PopModal
          className="width-1000"
          footer={false}
          title="All Prescriptions"
          open={visibililty}
          setOpen={setVisibility}
        >
          <ErrorBoundary>
            <TableCard
              tableData={prescriptions.data}
              columns={columns}
              error={prescriptions.error}
              setRefresh={prescriptions.setRefresh}
              loading={prescriptions.loading}
              setLoading={prescriptions.setLoading}
            />
          </ErrorBoundary>
        </PopModal>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnHover={false}
          pauseOnFocusLoss={false}
          draggable
        />
      </ErrorBoundary>
    </Card>
  );
};
export default NextPatientCard;
