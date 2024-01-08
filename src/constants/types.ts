export type InfoCardDetailsType = {
  totalCount: number;
  title: string;
};

export type InfoCardsDataType = InfoCardDetailsType[];
export type ErrorType = {
  message: string;
  type: "success" | "error";
};
export type AppointmentType = {
  pId: string;
  email: string;
  lastVisited: string;
  gender: string;
  pName: string;
  timeSlot: string;
  contact: string;
  status: string;
  profilePic: string;
  referrer: string;
  date: string;
};
export type AppointmentDataType = AppointmentType & { id: number };

export type AppointmentsDataType = AppointmentDataType[];
export type AppointmentApiResponseDataType = {
  id: number;
  attributes: AppointmentDataType;
};
export type ApiResponseDataType<Type> = {
  id: number;
  attributes: Type;
};
export type GenericApiResponseType = {
  id: number;
  attributes: Record<string, string | number>;
};
export type ApiResponseData<Type> = ApiResponseDataType<Type>[];
export type AppointmentsApiResonseType = AppointmentApiResponseDataType[];
export type PrescriptionDataType = {
  key: React.Key;
  prescriptionId: string;
  name: string;
  duration: number;
  date: string;
  status: "Active" | "Completed" | "On Hold";
  notes: string;
};

export type PrescrtionsDataType = PrescriptionDataType[];

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

export type UserDetailsType = {
  docName: string;
  email: string;
  gender: string;
  age: number;
};

export type UserCredentialsType = {
  email: string;
  password: string;
};
export type UserRegisterDataType = {
  docName: string;
  email: string;
};
export type UserDataGenericType = {
  [key: string]: string | number;
};
export type CommonPropsTypeDarkMode = {
  darkMode?: boolean;
};

export type PatientDataType = {
  pName: string;
  email: string;
  dob: string;
  gender: string;
  contactNo: string;
  allergies?: string;
};
export type PatientInfoType = {
  id: number;
} & PatientDataType;

export type UserRoleType = {
  id: number;
  name: string;
  type: string;
};
export type ApiUserDataResponseType = {
  role?: UserRoleType;
  blocked?: boolean;
  city?: string;
  confirmed?: true;
  country?: string;
  createdAt?: string;
  dob?: string;
  docName?: string;
  email?: string;
  experience?: number;
  gender?: string;
  id?: number;
  licenseNo?: number;
  organizationName?: string;
  organizationType?: string;
  provider?: string;
  speciality?: string;
  state?: string;
  updatedAt?: string;
  username?: string;
  profilePic?: string;
};

export type SelectOptionsType = {
  value: number | string;
  label: string;
}[];
export type MedicationType = {
  id: number;
  medicine: string;
  dosage: string;
  timesPerDay: string;
  instruction: string;
};
