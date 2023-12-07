export type InfoCardDetailsType =
  | {
      totalCount: number;
      title: string;
    }[]
  | undefined;

export type ErrorType = {
  message: string;
  type: string;
};
export type AppointmentDataType = {
  pId: string;
  email: string;
  lastVisited: string;
  avatar: string;
  gender: string;
  key: number;
  pName: string;
  timeSlot: string;
  contact: string;
  status: string;
  profilePic: string;
  referrer: string;
  date: string;
};

export type AppointmentsDataType = AppointmentDataType[] | undefined;

export type PrescriptionDataType = {
  key: React.Key;
  prescriptionId: string;
  name: string;
  duration: number;
  date: string;
  status: "Active" | "Completed" | "On Hold";
  notes: string;
};

export type PrescrtionsDataType = PrescriptionDataType[] | undefined;

export type ChartDataType = {
  labels: string[];
  data: number[];
  totalCount: number;
};

export type LineChartDataType = {
  labels: string[];
  data: number[];
};

export type LineChartApiResDataType = {
  seven: number[];
  ten: number[];
  thirty: number[];
};

export type ChartApiDataType = {
  pieChartData: ChartDataType;
  barChartData: ChartDataType;
  lineChartData: LineChartApiResDataType;
};

export type DoctorAppointmentsDataType = AppointmentDataType[];

export type ReviewDataType = {
  pId: string;
  pName: string;
  email: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
};
export type ReviewsDataType = ReviewDataType[];
