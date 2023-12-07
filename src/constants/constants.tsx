import { ReactNode } from "react";

import { ColumnsType } from "antd/es/table";
import {
  FormOutlined,
  HomeOutlined,
  ScheduleOutlined,
  StarOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

import profileAvatar from "@assets/profilepic.png";
import patientPng from "@assets/profile.png";
import appointmentPng from "@assets/appointment.png";
import starPng from "@assets/star-rating.png";
import { PrescriptionDataType } from "./types";

export const NEXT_PATIENT_INFORMATION = {
  avatar: profileAvatar,
  pName: "Siddharth Paneri",
  email: "abc@abc.com",
  pId: "ABC1",
  timeSlot: "10 am to 11 am",
  lastVisited: "12-11-2023",
  contact: "91+99xxxxxx99",
  gender: "Male",
};

export interface PatientAppointmentDataType {
  key: string;
  pName: string;
  timeSlot: string;
  contact: string;
  status: "Completed" | "Pending" | "Cancelled";
  profilePic: string;
}

export const APPOINTMENT_TABLE_DATA: PatientAppointmentDataType[] = [
  {
    key: "1",
    pName: "John Brown",
    timeSlot: "10 am to 11 am",
    contact: "+919999999999",
    status: "Completed",
    profilePic:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f",
  },
  {
    key: "2",
    pName: "Jacob Blue",
    timeSlot: "1 pm to 2 pm",
    contact: "+919999999999",
    status: "Pending",
    profilePic:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f",
  },
  {
    key: "3",
    pName: "Aunt Jane",
    timeSlot: "3 pm to 4pm",
    contact: "+919999999999",
    status: "Cancelled",
    profilePic:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f",
  },
  {
    key: "4",
    pName: "Siddharth Paneri",
    timeSlot: "5 pm to 6pm",
    contact: "+919999999999",
    status: "Pending",
    profilePic:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f",
  },
];

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
