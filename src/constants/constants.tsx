import { ReactNode } from "react";

import { ColumnsType } from "antd/es/table";
import {
  FormOutlined,
  HomeOutlined,
  ScheduleOutlined,
  StarOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

import patientPng from "@assets/profile.png";
import appointmentPng from "@assets/appointment.png";
import starPng from "@assets/star-rating.png";
import { PrescriptionDataType } from "./types";
import { formatDateReadable } from "@utils/Doctor";

type NavLinksType = { label: string; icon: ReactNode; key: string }[];

export const DOCTOR_NAV_LINKS: NavLinksType = [
  { label: "Dashboard", icon: <HomeOutlined />, key: "dashboard" },
  { label: "Write Prescription", icon: <FormOutlined />, key: "prescription" },
  { label: "Appointments", icon: <ScheduleOutlined />, key: "appointments" },
  { label: "Reviews", icon: <StarOutlined />, key: "reviews" },
  { label: "Profile", icon: <ProfileOutlined />, key: "profile" },
];
export const PATIENT_NAV_LINKS: NavLinksType = [
  { label: "Dashboard", icon: <HomeOutlined />, key: "dashboard" },
  { label: "Prescriptions", icon: <FormOutlined />, key: "prescriptions" },
  { label: "Appointments", icon: <ScheduleOutlined />, key: "appointments" },
  { label: "Doctors", icon: <StarOutlined />, key: "doctors" },
  { label: "Profile", icon: <ProfileOutlined />, key: "profile" },
];

export const formattedDate = () => {
  const todayDate = new Date();
  const date = todayDate.getDate();
  const month = todayDate.getMonth();
  const year = todayDate.getFullYear();
  return `${date}/${month}/${year}`;
};

export const getLabels = (days: number) => {
  const todayDate = new Date();
  const month = todayDate.getMonth() + 1;
  const endDate = todayDate.getDate();
  const startDate = endDate - days;
  const dates = [];
  for (let i = startDate + 1; i <= endDate; i++) {
    dates.push(`${i}/${month}`);
  }
  return dates;
};

export const columns: ColumnsType<PrescriptionDataType> = [
  {
    title: "Id",
    dataIndex: "prescriptionId",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Date",
    dataIndex: "date",
    render: (date: string) => formatDateReadable(date),
  },
  {
    title: "Duration",
    dataIndex: "duration",
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (status: string) => (
      <span
        className={`${status.toLowerCase()} padding-y-2 padding-x-2 radius-round`}
      >
        {status}
      </span>
    ),
    filters: [
      {
        text: "Active",
        value: "Active",
      },
      {
        text: "Completed",
        value: "Completed",
      },
      {
        text: "On Hold",
        value: "On Hold",
      },
    ],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
  },
  {
    title: "Notes",
    dataIndex: "notes",
  },
];

type CardPropertiesType = string[];
export const CARD_PROPERTIES: CardPropertiesType = [
  patientPng,
  appointmentPng,
  starPng,
  patientPng,
];
