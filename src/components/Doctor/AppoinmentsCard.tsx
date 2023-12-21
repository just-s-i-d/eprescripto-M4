import { useState } from "react";
import { Card, Skeleton, Avatar, Tooltip, Image } from "antd";
import { CloseCircleTwoTone, PhoneTwoTone } from "@ant-design/icons";

import noDataPng from "@assets/no-data.png";
import CardTitle from "@components/ui/CardTitle";
import PopModal from "@components/ui/PopModal";
import profilePic from "@assets/profilepic.png";
import {
  ApiResponseData,
  ApiResponseDataType,
  AppointmentDataType,
} from "@constants/types";
import { cancelAppointment } from "@utils/Doctor";
import ErrorBoundary from "@components/ErrorBoundary";
import useStatesHook from "src/hooks/useStatesHook";
import { showToast } from "@utils/common";

type AppointmentCardPropsType = {
  appointments?: ApiResponseData<AppointmentDataType>;
  loading: boolean;
  appointmentsState: ReturnType<
    typeof useStatesHook<ApiResponseData<AppointmentDataType>>
  >;
  getDataForAppointments: () => void;
};

const AppoinmentsCard = ({
  appointments,
  loading,
  appointmentsState,
  getDataForAppointments,
}: AppointmentCardPropsType) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedPatient, setSelectedPatient] =
    useState<ApiResponseDataType<AppointmentDataType>>();
  const handlerCancleAppointment = (
    patient: ApiResponseDataType<AppointmentDataType>,
  ) => {
    setOpen(true);
    setSelectedPatient(patient);
  };
  const confirmHandler = async () => {
    if (selectedPatient) {
      cancelAppointment(selectedPatient)
        .then((res) => {
          showToast(res.message, res.type);
          getDataForAppointments();
        })
        .catch((error) => {
          showToast(error.message, error.type);
        });
    }
  };
  return (
    <>
      <Card
        className={`w-[32%] max-xxl:h-[59vh] max-h-[59vh] max-xl:max-h-[60vh] max-xxl:w-[48%] max-xl:w-[48%] max-md:w-9/12 max-sm:w-full `}
        bordered={false}
      >
        <ErrorBoundary
          refreshComponent={() => appointmentsState.setRefresh((prev) => !prev)}
          error={appointmentsState.error}
        >
          <CardTitle>Today's Appointments</CardTitle>
          {!appointmentsState.loading && !appointmentsState.data?.length ? (
            <div className="flex flex-col items-center justify-center">
              <Image src={noDataPng} preview={false} />
              <h2 className="text-lg mt-12 text-center">No Appointments</h2>
            </div>
          ) : (
            <div className="mx-auto px-4 h-[44vh] overflow-y-auto">
              <ul className="mt-1 divide-y">
                {appointments?.map((item, idx) => (
                  <li
                    key={idx}
                    className="py-4 mb-2 px-2 bg-[#F0F3F4] rounded-lg"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3">
                        {loading ? (
                          <Skeleton.Avatar active size={48} />
                        ) : (
                          <Avatar
                            size={48}
                            src={item.attributes?.profilePic || profilePic}
                          />
                        )}
                        <Skeleton
                          loading={loading}
                          active
                          avatar={false}
                          title={false}
                          paragraph={{ rows: 2, width: [100, 100] }}
                        >
                          <div>
                            <span className="block text-base text-gray-700">
                              {item.attributes?.pName}
                            </span>
                            <span className="block text-[12px] text-gray-600">
                              {item.attributes?.timeSlot}
                            </span>
                          </div>
                        </Skeleton>
                      </div>
                      {loading ? (
                        <Skeleton.Button active />
                      ) : (
                        <span
                          className={`py-1 px-2 rounded-lg ${item.attributes?.status.toLowerCase()}`}
                        >
                          {item.attributes?.status}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <span className="block text-sm text-gray-700 font-bold">
                        <span className="mr-1 py-1 text-gray-500 font-semibold">
                          Referrer
                        </span>
                        {item.attributes.referrer || "NA"}
                      </span>
                      <div className="flex justify-end gap-4 text-lg">
                        <Tooltip title={item.attributes?.contact}>
                          <PhoneTwoTone
                            className="rotate-90 cursor-pointer"
                            href={`tel:${item.attributes?.contact}`}
                          />
                        </Tooltip>

                        {item.attributes.status === "Pending" && (
                          <CloseCircleTwoTone
                            className="cursor-pointer"
                            onClick={() => handlerCancleAppointment(item)}
                          />
                        )}
                      </div>
                      <PopModal
                        setOpen={setOpen}
                        open={open}
                        okButtonText="Sure"
                        title="Cancel Appointment"
                        footer={true}
                        confirmHandler={confirmHandler}
                      >
                        Are you sure,you want to cancel the appoinment for{" "}
                        {selectedPatient?.attributes.pName}?
                      </PopModal>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </ErrorBoundary>
      </Card>
    </>
  );
};

export default AppoinmentsCard;
