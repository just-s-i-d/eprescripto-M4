import { ReactNode } from "react";

import {
  FormOutlined,
  HomeOutlined,
  ScheduleOutlined,
  StarOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

import patientPng from "@assets/patients.png";
import appointmentPng from "@assets/appointment.png";
import starPng from "@assets/star.png";

export const NEXT_PATIENT_INFORMATION = [
  { label: "Patient Name", value: "Siddharth Paneri" },
  { label: "Patient Id", value: "ABC1" },
  { label: "Time Slot", value: "10 am to 11 am" },
  { label: "Email", value: "abc@abc.com" },
  { label: "Last appointment", value: "12-11-2023" },
  { label: "Contact", value: "91+99xxxxxx99" },
];

export interface DataType {
  key: string;
  pName: string;
  timeSlot: string;
  contact: string;
  status: "Done" | "Pending" | "Cancelled";
  profilePic: string;
}

export const APPOINTMENT_TABLE_DATA: DataType[] = [
  {
    key: "1",
    pName: "John Brown",
    timeSlot: "10 am to 11 am",
    contact: "+919999999999",
    status: "Done",
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

type details = {
  totalCount: number;
  title: string;
  icon: string;
  color: string;
}[];
export const INFO_CARD_DETAILS: details = [
  {
    totalCount: 22,
    title: "Total Patients",
    icon: patientPng,
    color: "#E8FBEE",
  },
  {
    totalCount: 4,
    title: "Appointments for Today",
    icon: appointmentPng,
    color: "#F0EDFD",
  },
  {
    totalCount: 4.7,
    title: "Avg. Stars Review",
    icon: starPng,
    color: "#FFF3D6",
  },
  {
    totalCount: 10,
    title: "New Patients",
    icon: patientPng,
    color: "#FCEDF2",
  },
];

type navLinksType = { label: string; icon: ReactNode; key: string }[];

export const DOCTOR_NAV_LINKS: navLinksType = [
  { label: "Dashboard", icon: <HomeOutlined />, key: "dashboard" },
  { label: "Write Prescription", icon: <FormOutlined />, key: "prescription" },
  { label: "Appointments", icon: <ScheduleOutlined />, key: "appointments" },
  { label: "Reviews", icon: <StarOutlined />, key: "reviews" },
  { label: "Profile", icon: <ProfileOutlined />, key: "profile" },
];
export const PATIENT_NAV_LINKS: navLinksType = [
  { label: "Dashboard", icon: <HomeOutlined />, key: "dashboard" },
  { label: "Prescriptions", icon: <FormOutlined />, key: "prescriptions" },
  { label: "Appointments", icon: <ScheduleOutlined />, key: "appointments" },
  { label: "Doctors", icon: <StarOutlined />, key: "doctors" },
  { label: "Profile", icon: <ProfileOutlined />, key: "profile" },
];
