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
import PersonalInfoForm from "@pages/Auth/SignUp/PersonalInfoForm";
import AddressForm from "@pages/Auth/SignUp/AddressForm";
import ProfessionalInfoForm from "@pages/Auth/SignUp/ProfessionalInfoForm";
import PasswordForm from "@pages/Auth/SignUp/PasswordForm";
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

export const getLabels = (days: number): string[] => {
  const todayDate = new Date();
  const dates = [];

  for (let i = 0; i < days; i++) {
    const currentDate = new Date(todayDate);
    currentDate.setDate(todayDate.getDate() - i);

    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");

    dates.unshift(`${day}/${month}`);
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
    render: formatDateReadable,
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
    onFilter: (value, record) => record.status.indexOf(value.toString()) === 0,
  },
  {
    title: "Notes",
    dataIndex: "notes",
    render: (notes: string) => (
      <span className="max-w-[50px]">{notes || "NA"}</span>
    ),
  },
];

type CardPropertiesType = string[];
export const CARD_PROPERTIES: CardPropertiesType = [
  patientPng,
  appointmentPng,
  starPng,
  patientPng,
];

export const STEPPER_STEPS = [
  {
    title: "Step 1",
    description: "Personal Info",
  },
  {
    title: "Step 2",
    description: "Personal Address",
  },
  {
    title: "Step 3",
    description: "Professional Info",
  },
  { title: "Step 4", description: "Finish" },
];

export const SIGNUP_FORM_STEPS = [
  {
    title: "Personal Information",
    description: "Please enter your personal information",
    content: <PersonalInfoForm />,
  },
  {
    title: "Personal Address",
    description: "Please enter your address",
    content: <AddressForm />,
  },
  {
    title: "Professional Information",
    description: "Please enter your professtional information",
    content: <ProfessionalInfoForm />,
  },
  {
    title: "New Password",
    description: "Please enter new password",
    content: <PasswordForm />,
  },
];
