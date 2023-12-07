import axios from "axios";

import { getLabels } from "@constants/constants";
import {
  AppointmentDataType,
  AppointmentsDataType,
  ChartApiDataType,
  DoctorAppointmentsDataType,
  InfoCardDetailsType,
  LineChartApiResDataType,
  LineChartDataType,
  PrescrtionsDataType,
  ReviewsDataType,
} from "@constants/types";

//endpoints for data
export const infoCardDataEndPoint =
  "https://api.npoint.io/bd6151d98738374a2236";

export const appointmentEndPoint = "https://api.npoint.io/9cc072a9f2c41c77a40a";

export const prescriptionsEndPoint =
  "https://api.npoint.io/7c31657f364397ae7175";

export const pieChartDataEndPoint =
  "https://api.npoint.io/f8eeff1048038038110e";

export const lineChartDataEndPoint =
  "https://api.npoint.io/75d76a4af2cc563e20a8";

export const barChartDataEndPoint =
  "https://api.npoint.io/bb362ddf298c94c14975";

export const doctorAppointmentsEndPoint =
  "https://api.npoint.io/a7f8fadf08c1b182fc98";

export const doctorReviewsEndPoint =
  "https://api.npoint.io/d21b0ee032131e268c76";

export function formatDateReadable(dateString: string) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    undefined,
    options,
  );
  return formattedDate;
}
export const getInfoCardsData = async (): Promise<InfoCardDetailsType> => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(infoCardDataEndPoint)
        .then((res) => {
          resolve(res.data.infoCardsData);
        })
        .catch(() => {
          reject("Cannot get data");
        });
    } catch {
      reject("Server error");
    }
  });
};

export const getAppointmentData = async (): Promise<AppointmentsDataType> => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(appointmentEndPoint)
        .then((res) => {
          resolve(res.data.appointments);
        })
        .catch(() => {
          reject("Cannot get data");
        });
    } catch {
      reject("Server error");
    }
  });
};

export const getChartData = async (
  endPoint: string,
): Promise<ChartApiDataType> => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(endPoint)
        .then((res) => {
          resolve(res.data);
        })
        .catch(() => {
          reject("Cannot get data");
        });
    } catch (error) {
      reject("Server Connection Error");
    }
  });
};

export const getPrescriptions = async (): Promise<PrescrtionsDataType> => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(prescriptionsEndPoint)
        .then((res) => {
          resolve(res.data.prescriptions);
        })
        .catch(() => {
          reject("Cannot get data");
        });
    } catch (error) {
      reject("Server Connection Error");
    }
  });
};

export const getDataForLineGraph = (
  data: LineChartApiResDataType,
  days: number = 7,
): LineChartDataType => {
  const labels = getLabels(days);
  switch (days) {
    case 7:
      return { labels, data: data.seven };
    case 10:
      return {
        labels,
        data: data.ten,
      };
    case 30:
      return {
        labels,
        data: data.thirty,
      };
    default:
      return { labels, data: data.seven };
  }
};

export const cancelAppointment = async (appointment: AppointmentDataType) => {
  try {
    const { pId } = appointment;
    const res = await axios.get(appointmentEndPoint);
    if (res.status >= 200 && res.status <= 299) {
      const appointments = res.data.appointments;
      appointments.filter(
        (patient: AppointmentDataType) => patient.pId !== pId,
      );
      return { message: "Appointment Cancelled", type: "success" };
    } else {
      return { message: "Server error", type: "error" };
    }
  } catch (error) {
    return { message: "Server Connection Error", type: "error" };
  }
};

export const getDoctorAppointmentsData =
  async (): Promise<DoctorAppointmentsDataType> => {
    return new Promise((resolve, reject) => {
      try {
        axios
          .get(doctorAppointmentsEndPoint)
          .then((res) => {
            resolve(res.data.appointments);
          })
          .catch(() => {
            reject("Cannot get data");
          });
      } catch {
        reject("Server error");
      }
    });
  };

export const getReviewsData = async (): Promise<ReviewsDataType> => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(doctorReviewsEndPoint)
        .then((res) => {
          resolve(res.data.reviews);
        })
        .catch(() => {
          reject("Cannot get data");
        });
    } catch {
      reject("Server error");
    }
  });
};
