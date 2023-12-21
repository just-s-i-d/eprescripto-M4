import { useEffect, useState } from "react";

import { Card, Image, Space, Skeleton, Button } from "antd";

import CardTitle from "@components/ui/CardTitle";
import PopModal from "@components/ui/PopModal";
import TableCard from "@components/ui/TableCard";
import ErrorBoundary from "@components/ErrorBoundary";
import noDataPng from "@assets/no-data.png";
import profilePic from "@assets/profilepic.png";
import {
  ApiResponseData,
  AppointmentApiResponseDataType,
  AppointmentsApiResonseType,
  GenericObjectType,
  PrescriptionDataType,
} from "@constants/types";
import {
  cancelAppointment,
  formatDateReadable,
  getData,
  prescriptionsDataEndPoint,
} from "@utils/Doctor";
import useStatesHook from "../../hooks/useStatesHook";
import { columns } from "@constants/constants";
import { showToast } from "@utils/common";
import { ColumnGroupType } from "antd/es/table";

type NextPatientCardProps = {
  appointment?: AppointmentApiResponseDataType;
  error: boolean;
  appointments: ReturnType<typeof useStatesHook<AppointmentsApiResonseType>>;
  getDataForAppointments: () => void;
};

const NextPatientCard = ({
  appointment,
  appointments,
  getDataForAppointments,
}: NextPatientCardProps) => {
  const [open, setOpen] = useState(false);
  const [visibililty, setVisibility] = useState(false);
  const prescriptions = useStatesHook();
  const setPrescriptionsData = () => {
    getData<ApiResponseData<PrescriptionDataType>>(prescriptionsDataEndPoint)
      .then((res) => {
        const data = res.map((element) => element.attributes);
        prescriptions.setData(data);
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
      cancelAppointment(appointment)
        .then((res) => {
          showToast(res.message, res.type);
          getDataForAppointments();
        })
        .catch((error) => {
          showToast(error.message, error.type);
        });
    }
  };
  useEffect(() => {
    setPrescriptionsData();
  }, [prescriptions.refresh]); //eslint-disable-line
  return (
    <Card
      className="xs:w-full sm:w-9/12 md:w-[48%] xxl:w-[32%]"
      bordered={false}
    >
      <ErrorBoundary
        error={appointments.error}
        refreshComponent={() => appointments.setRefresh((prev) => !prev)}
      >
        <CardTitle>Next Patient</CardTitle>
        {!appointments.loading && !appointments.data?.length ? (
          <div className="flex flex-col items-center justify-center">
            <Image src={noDataPng} preview={false} />
            <h2 className="text-lg mt-12 text-center">No Appointment</h2>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {appointments.loading ? (
              <Skeleton.Avatar active size={90} />
            ) : (
              <Image
                src={appointment?.attributes.profilePic || profilePic}
                preview={false}
                width={100}
                className="rounded-[50%]"
              />
            )}
            <Space direction="vertical" align="center" className="mt-2">
              {appointments.loading ? (
                <Skeleton.Input active />
              ) : (
                <span className="xxl:text-[22px] max-xl:text-[18px] font-extrabold">
                  {appointment?.attributes.pName}
                </span>
              )}
              {appointments.loading ? (
                <Skeleton.Input active />
              ) : (
                <span className="text-base font-bold">
                  {appointment?.attributes.email}
                </span>
              )}
            </Space>
            <Space className="flex items-start text-lg mt-2">
              <Skeleton
                avatar={false}
                title={false}
                paragraph={{ rows: 6, width: [250, 250, 250, 250, 250, 250] }}
                active
                loading={appointments.loading}
              >
                <table className="text-base">
                  <tbody>
                    <tr>
                      <td className="px-2 py-1 text-gray-500 font-semibold">
                        Patient Id
                      </td>
                      <td className="px-2 py-1 text-lg">
                        {appointment?.attributes.pId}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-2 py-1 text-gray-500 font-semibold">
                        Time Slot
                      </td>
                      <td className="px-2 py-1 text-lg">
                        {appointment?.attributes.timeSlot}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-2 py-1 text-gray-500 font-semibold">
                        Last Visited
                      </td>
                      <td className="px-2 py-1 text-lg">
                        {appointment &&
                          formatDateReadable(
                            appointment.attributes.lastVisited,
                          )}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-2 py-1 text-gray-500 font-semibold">
                        Phone
                      </td>
                      <td className="px-2 py-1 text-lg">
                        {appointment?.attributes.contact}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-2 py-1 text-gray-500 font-semibold">
                        Gender
                      </td>
                      <td className="px-2 py-1 text-lg">
                        {appointment?.attributes.gender}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <Space className="mt-5">
                  <Button onClick={() => setOpen(true)} danger>
                    Cancel Appointment
                  </Button>
                  <Button onClick={handlePrescriptionClick}>
                    Prescriptions
                  </Button>
                </Space>
              </Skeleton>
            </Space>
          </div>
        )}

        <PopModal
          footer={true}
          setOpen={setOpen}
          open={open}
          okButtonText="Sure"
          title="Cancel Appointment"
          confirmHandler={confirmHandler}
        >
          Are you sure,you want to cancel the appoinment for{" "}
          {appointment?.attributes.pName}?
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
              tableData={prescriptions.data as GenericObjectType[]}
              columns={columns as ColumnGroupType<GenericObjectType>[]}
              error={prescriptions.error}
              setRefresh={prescriptions.setRefresh}
              loading={prescriptions.loading}
              setLoading={prescriptions.setLoading}
            />
          </ErrorBoundary>
        </PopModal>
      </ErrorBoundary>
    </Card>
  );
};
export default NextPatientCard;
