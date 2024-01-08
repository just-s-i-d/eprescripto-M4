import { useEffect, useState } from "react";

import { ColumnsType } from "antd/es/table";
import { Card, Tooltip } from "antd";
import { PhoneTwoTone, CloseCircleTwoTone } from "@ant-design/icons";

import ErrorBoundary from "@components/ErrorBoundary";
import useStatesHook from "@hooks/useStatesHook";

import {
  appointmentsEndPoint,
  cancelAppointment,
  formatDateReadable,
  getData,
} from "@utils/Doctor";
import {
  ApiResponseData,
  AppointmentDataType,
  AppointmentType,
} from "@constants/types";
import TableCard from "@components/ui/TableCard";
import PopModal from "@components/ui/PopModal";
import { showToast } from "@utils/common";

const DoctorAppointmentsPage = () => {
  const appointmentsTable = useStatesHook<AppointmentDataType[]>();
  const [open, setOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<AppointmentDataType>();
  const getDataForAppointments = () => {
    getData<ApiResponseData<AppointmentType>>(appointmentsEndPoint)
      .then((res) => {
        const data = res.map(({ id, attributes }) => {
          return {
            id,
            ...attributes,
          };
        });
        appointmentsTable.setData(data);
        appointmentsTable.setError(false);
        appointmentsTable.setLoading(false);
      })
      .catch(() => {
        appointmentsTable.setError(true);
        appointmentsTable.setLoading(false);
      });
  };
  const handlerCancleAppointment = (patient: AppointmentDataType) => {
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
  useEffect(() => {
    getDataForAppointments();
  }, []);
  const doctorAppointmentsTableColumns: ColumnsType<AppointmentDataType> = [
    {
      title: "Patient Id",
      dataIndex: "pId",
      width: 50,
    },
    {
      title: "Patient Name",
      dataIndex: "pName",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 200,
    },
    {
      title: "Date",
      dataIndex: "date",
      width: 150,
      render: (date, record) => (
        <div className="flex flex-col">
          <span>{formatDateReadable(date)}</span>
          <span>{record.timeSlot}</span>
        </div>
      ),
    },
    {
      title: "Referrer",
      dataIndex: "referrer",
      render: (referrer: string) => referrer || "NA",
      width: 100,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 50,
      render: (value: string) => (
        <span className={`py-1 px-2 rounded-lg ${value.toLowerCase()}`}>
          {value}
        </span>
      ),
      filters: [
        { text: "Pending", value: "Pending" },
        { text: "Attended", value: "Attended" },
        { text: "Cancelled", value: "Cancelled" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Action",
      width: 100,
      render: (_, record) => (
        <div className="flex gap-4 text-lg">
          <Tooltip title={record.contact}>
            <PhoneTwoTone
              className="rotate-90 cursor-pointer fill-[#19504c]"
              href={`tel:${record.contact}`}
            />
          </Tooltip>
          {record.status === "Pending" && (
            <CloseCircleTwoTone
              data-testid="cancel-appointment-btn"
              className="cursor-pointer"
              onClick={() => handlerCancleAppointment(record)}
            />
          )}
        </div>
      ),
    },
  ];
  return (
    <>
      <ErrorBoundary>
        <Card className="appointment-table-card h-min w-full overflow-scroll">
          <TableCard
            className="min-w-[1200px]"
            setRefresh={appointmentsTable.setRefresh}
            error={appointmentsTable.error}
            columns={
              doctorAppointmentsTableColumns as ColumnsType<
                Record<string, string | number>
              >
            }
            tableData={
              appointmentsTable.data as Record<string, string | number>[]
            }
            pageSize={7}
            setLoading={appointmentsTable.setLoading}
            loading={appointmentsTable.loading}
          />

          <PopModal
            setOpen={setOpen}
            open={open}
            okButtonText="Sure"
            title="Cancel Appointment"
            footer={true}
            confirmHandler={confirmHandler}
          >
            Are you sure,you want to cancel the appoinment for{" "}
            {selectedPatient?.pName}
          </PopModal>
        </Card>
      </ErrorBoundary>
    </>
  );
};
export default DoctorAppointmentsPage;
