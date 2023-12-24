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
  appointment: ApiResponseDataType<AppointmentType> | AppointmentDataType,
): Promise<{ message: string; type: "success" | "error" }> => {
  return new Promise((resolve, reject) => {
    const { id } = appointment;
    axiosInstance
      .delete(`${appointmentsEndPoint}/${id}`)
      .then((res) => {
        if (res.status >= 200 && res.status <= 299)
          resolve({ message: "Appointment Cancelled", type: "success" });
      })
      .catch((error) => {
        switch (error.response?.status) {
          case 403:
            reject({ message: "You cannot access this data", type: "error" });
            break;
          case 404:
            reject({ message: "Data not found", type: "error" });
            break;
          default:
            reject({ message: "Server Error", type: "error" });
        }
      });
  });
};

export const registerUser = (user: GenericObjectType): Promise<ErrorType> => {
  return new Promise((resolve, reject) => {
    axios
      .post(usersEndpoint, { ...user, username: user.email, role: 3 })
      .then(() => {
        userLogin({ email: user.email, password: user.password })
          .then(() => {
            resolve({
              message: "Account created, logging in",
              type: "success",
            });
          })
          .catch((error) => {
            reject({ message: error.response.message, type: "error" });
          });
      })
      .catch((error) => {
        reject({ message: error.response.message, type: "error" });
      });
  });
};

export const checkUserAlreadyExists = (email: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${usersEndpoint}?filters[email][$eq]=${email.toLowerCase()}`)
      .then((res) => {
        if (res.data.length) reject("Email already exists");
        resolve("done");
      })
      .catch((error) => {
        reject({ message: error.response.message, type: "error" });
      });
  });
};

export const userLogin = (credentials: UserCredentialsType) => {
  return new Promise((resolve, reject) => {
    axios
      .post(userLoginEndpoint, {
        identifier: credentials.email,
        ...credentials,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.jwt);
        localStorage.setItem("user", res.data);
        setTimeout(() => {
          location.assign("/dashboard");
        }, 1000);
        resolve("done");
      })
      .catch((error) => {
        if (
          error.response.data.error.message === "Invalid identifier or password"
        )
          reject({ message: "Invalid email or password", type: "error" });
      });
  });
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  showToast("Logging out", "success");
  setTimeout(() => {
    location.assign("/auth");
  }, 1000);
};

export const getUserData = (): Promise<ApiUserDataResponseType> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${usersEndpoint}/me?populate=*`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        switch (error.response?.status) {
          case 403:
            reject({ message: "You cannot access this data", type: "error" });
            break;
          case 404:
            reject({ message: "User not found", type: "error" });
            break;
          default:
            reject({ message: "Server Error", type: "error" });
        }
      });
  });
};

export const updateUserData = (newUserData: UserDataGenericType) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .put(`${usersEndpoint}/${newUserData.id}`, newUserData)
      .then((res) => {
        showToast("User details updated", "success");
        resolve(res);
      })
      .catch((error) => {
        switch (error.response?.status) {
          case 403:
            showToast("Access Forbidden", "error");
            reject("error");
            break;
          case 404:
            showToast("User not found", "error");
            reject("error");
            break;
          case 413:
            showToast("Image size too large", "error");
            reject("error");
            break;
          default:
            showToast("Server Error", "error");
        }
      });
  });
};

export const getJwtToken = (id_token: string, access_token: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(jwtTokenEndpoint, {
        params: {
          id_token,
          access_token,
        },
      })
      .then((res) => {
        localStorage.setItem("token", res.data.jwt);
        resolve("done");
      })
      .catch((error) => {
        showToast(error.response.data.error.message, "error");
        reject("error");
      });
  });
};

export const deleteAccount = () => {
  axiosInstance.get(`${usersEndpoint}/me`).then((res) => {
    const id = res.data.id;
    axiosInstance
      .delete(`${usersEndpoint}/${id}`)
      .then((res) => {
        if (res.status === 200) {
          showToast("Account deleted,logging out", "success");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setTimeout(() => {
            location.assign("/auth");
          }, 1200);
        }
      })
      .catch(() => {
        showToast("Server error", "error");
      });
  });
};

export const addNewPatient = (patientInfo: PatientInfoType) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(patientsEndpoint, { data: patientInfo })
      .then(() => resolve({ message: "New Patient Added", type: "success" }))
      .catch((error) => {
        reject({ message: error.response.message, type: "error" });
      });
  });
};

export const createNewPrescription = (
  prescription: GenericObjectType,
): Promise<ErrorType> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(doctorPrescriptionEndpoint, { data: { data: prescription } })
      .then(() => {
        resolve({ message: "Prescription Added", type: "success" });
      })
      .catch(() => {
        reject({ message: "Server error", type: "error" });
      });
  });
};

export const createOptions = (data: PatientInfoType[]) => {
  return data.map((element) => ({
    value: element.id,
    label: `${element.pName} (${element.contactNo})`,
  }));
};

let inputFieldCount = 0;
export const medicationInputFieldGenerator = (): MedicationType => {
  ++inputFieldCount;
  return {
    id: inputFieldCount,
    medicine: `medicine${inputFieldCount}`,
    dosage: `dosage${inputFieldCount}`,
    timesPerDay: `timesPerDay${inputFieldCount}`,
    instruction: `instruction${inputFieldCount}`,
  };
};
