import { useEffect, useState } from "react";

import { ColumnsType } from "antd/es/table";
import { Card, Tooltip } from "antd";
import { PhoneTwoTone, CloseCircleTwoTone } from "@ant-design/icons";

import ErrorBoundary from "@components/ErrorBoundary";
import useStatesHook from "../../hooks/useStatesHook";

import {
  cancelAppointment,
  formatDateReadable,
  getDoctorAppointmentsData,
} from "@utils/Doctor";
import {
  AppointmentDataType,
  DoctorAppointmentsDataType,
} from "@constants/types";
import TableCard from "@components/ui/TableCard";
import PopModal from "@components/ui/PopModal";
import { showToast } from "@utils/common";

const DoctorAppointmentsPage = () => {
  const appointmentsTable = useStatesHook<DoctorAppointmentsDataType>();
  const [open, setOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<AppointmentDataType>();
  const handlerCancleAppointment = (patient: AppointmentDataType) => {
    setOpen(true);
    setSelectedPatient(patient);
  };
  const confirmHandler = async () => {
    if (selectedPatient) {
      const response = await cancelAppointment(selectedPatient);
      response && showToast(response.message, response.type);
    }
  };
  useEffect(() => {
    getDoctorAppointmentsData()
      .then((res) => {
        appointmentsTable.setData(res);
        appointmentsTable.setError(false);
        appointmentsTable.setLoading(false);
      })
      .catch(() => {
        appointmentsTable.setError(true);
        appointmentsTable.setLoading(false);
      });
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
      dataIndex: "referer",
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
        <Card className="appointment-table-card h-min w-full overflow-x-scroll">
          <TableCard
            className="min-w-[1100px]"
            columns={doctorAppointmentsTableColumns}
            tableData={appointmentsTable.data}
            pageSize={8}
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
