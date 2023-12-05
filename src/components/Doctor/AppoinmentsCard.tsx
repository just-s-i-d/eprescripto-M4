import { useState } from "react";
import { Card, Button, Skeleton, Avatar, Tooltip } from "antd";
import { CloseCircleTwoTone, PhoneTwoTone } from "@ant-design/icons";

import CardTitle from "@components/ui/CardTitle";
import PopModal from "@components/ui/PopModal";
import { AppointmentDataType, AppointmentsDataType } from "@constants/types";
import { cancelAppointment } from "@utils/Doctor";
import { ToastContainer, toast } from "react-toastify";
import ErrorBoundary from "@components/ErrorBoundary";
import UseStatesHook from "src/hooks/useStatesHook";

type AppointmentCardPropsType = {
  appointments: AppointmentsDataType;
  loading: boolean;
  appointmentsState: ReturnType<typeof UseStatesHook<AppointmentsDataType>>;
};

const AppoinmentsCard = ({
  appointments,
  loading,
  appointmentsState,
}: AppointmentCardPropsType) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedPatient, setSelectedPatient] = useState<AppointmentDataType>();
  const handlerCancleAppointment = (patient: AppointmentDataType) => {
    setOpen(true);
    setSelectedPatient(patient);
  };
  const confirmHandler = async () => {
    if (selectedPatient) {
      const response = await cancelAppointment(selectedPatient);
      response?.type === "success" && toast.success(response.message);
      response?.type === "error" && toast.error(response.message);
    }
  };
  return (
    <>
      <Card
        className="w-[32%] max-xxl:h-[59vh] max-h-[59vh] max-xl:max-h-[60vh] max-xl:w-[48%] max-md:w-9/12 max-sm:w-full"
        bordered={false}
      >
        <CardTitle>Today's Appointments</CardTitle>
        <ErrorBoundary
          refreshComponent={() => appointmentsState.setRefresh((prev) => !prev)}
          error={appointmentsState.error}
        >
          <div className="mx-auto px-4 h-[44vh] overflow-y-auto">
            <ul className="mt-1 divide-y">
              {appointments?.map((item, idx) => (
                <li
                  key={idx}
                  className="py-4 mb-2 px-3 bg-[#F0F3F4] rounded-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      {loading ? (
                        <Skeleton.Avatar active size={48} />
                      ) : (
                        <Avatar size={48} src={item.profilePic} />
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
                            {item.pName}
                          </span>
                          <span className="block text-sm text-gray-600">
                            {item.timeSlot}
                          </span>
                        </div>
                      </Skeleton>
                    </div>
                    {loading ? (
                      <Skeleton.Button active />
                    ) : (
                      <span
                        className={`py-1 px-2 rounded-lg ${item.status.toLowerCase()}`}
                      >
                        {item.status}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <span className="block text-sm text-gray-700 font-bold">
                      <span className="mr-1 py-1 text-gray-500 font-semibold">
                        Referrer
                      </span>
                      {item.referrer}
                    </span>
                    <div className="flex justify-end gap-4 text-lg">
                      <Tooltip title={item.contact}>
                        <PhoneTwoTone
                          className="rotate-90 cursor-pointer"
                          href={`tel:${item.contact}`}
                        />
                      </Tooltip>

                      {item.status === "Pending" && (
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
                      {selectedPatient?.pName}?
                    </PopModal>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <Button className="float-right mt-2" type="default">
            View All
          </Button>
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
    </>
  );
};

export default AppoinmentsCard;
