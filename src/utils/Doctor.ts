import axios from "axios";

import { getLabels } from "@constants/constants";
import {
  ApiResponseDataType,
  AppointmentDataType,
  LineChartApiResDataType,
  LineChartDataType,
} from "@constants/types";

//strapi endpoints for data
export const infoCardDataEndPoint = `${
  import.meta.env.VITE_BASE_URL
}/api/infocards`;

export const appointmentsEndPoint = `${
  import.meta.env.VITE_BASE_URL
}/api/appointments`;

export const doughnutChartDataEndPoint = `${
  import.meta.env.VITE_BASE_URL
}/api/doughnut-chart`;
export const lineChartDataEndPoint = `${
  import.meta.env.VITE_BASE_URL
}/api/line-chart`;
export const barChartDataEndPoint = `${
  import.meta.env.VITE_BASE_URL
}/api/bar-chart`;
export const prescriptionsDataEndPoint = `${
  import.meta.env.VITE_BASE_URL
}/api/prescriptions`;
export const reviewsDataEndPoint = `${
  import.meta.env.VITE_BASE_URL
}/api/reviews`;
//end of strapi endpoints

export function formatDateReadable(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const formattedDate = new Date(dateString).toLocaleDateString(
    undefined,
    options,
  );
  return formattedDate;
}

const headers = {
  Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
};
export const getData = async (endPoint: string) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(endPoint, {
          headers,
        })
        .then((res) => {
          resolve(res.data.data);
        })
        .catch(() => {
          reject({ message: "Cannot get data", type: "error" });
        });
    } catch {
      reject({ message: "Server error", type: "error" });
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

export const cancelAppointment = async (
  appointment: ApiResponseDataType<AppointmentDataType>,
) => {
  try {
    const { id } = appointment;
    const res = await axios.delete(`${appointmentsEndPoint}/${id}`, {
      headers,
    });
    if (res.status >= 200 && res.status <= 299) {
      return { message: "Appointment Cancelled", type: "success" };
    } else {
      return { message: "Server error", type: "error" };
    }
  } catch (error) {
    return { message: "Server Connection Error", type: "error" };
  }
};
