import { waitFor } from "@testing-library/react";
import { axiosInstance } from "@utils/AxiosInstance";
import {
  addNewPatient,
  cancelAppointment,
  checkUserAlreadyExists,
  createNewPrescription,
  deleteAccount,
  formatDateReadable,
  getData,
  getDataForLineGraph,
  getJwtToken,
  getUserData,
  updateUserData,
  userLogin,
} from "@utils/Doctor";
import { showToast } from "@utils/common";
import axios from "axios";

jest.mock("@utils/common", () => ({
  showToast: jest.fn(),
}));

const mockedResponse = {
  id: 2,
  userName: "Mocked User",
};
const mockedRejectedValue = {
  status: 403,
};
jest.mock("axios");

jest.mock("@utils/AxiosInstance", () => ({
  axiosInstance: {
    interceptors: {
      request: {
        use: jest.fn().mockResolvedValue("Mocked"),
      },
      response: {
        use: jest.fn().mockResolvedValue("Mocked"),
      },
    },
    get: jest.fn().mockResolvedValue({
      data: {
        data: {
          id: 2,
          userName: "Mocked User",
        },
      },
    }),
    post: jest.fn().mockResolvedValue({
      message: "Prescription Added",
      type: "success",
    }),
    put: jest.fn().mockResolvedValue("Mocked response"),
    delete: jest.fn().mockResolvedValue("Mocked Delete"),
  },
}));

describe("Doctor Utils tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Get data tests", () => {
    it("Successfull test", async () => {
      getData("Mocked Endpoint").then((res) => {
        expect(res).toEqual(mockedResponse);
      });
    });
    it("Error test", async () => {
      (axiosInstance.get as jest.Mock).mockRejectedValue({
        response: mockedRejectedValue,
      });
      getData("Mocked Reject").catch((error) => {
        expect(error).toEqual("You cannot access this data");
      });
    });
  });
  // describe("Register user test", () => {
  //   (axios.get)
  //   it("Successfull test", () => {
  //     (axios.post as jest.Mock).mockResolvedValue({
  //       message: "Account created, logging in",
  //       type: "success",
  //     });
  //     registerUser({ user: "Mocked User" })
  //       .then((res) => {
  //         expect(res).toEqual({
  //           message: "Account created, logging in",
  //           type: "success",
  //         });
  //       })
  //       .catch((error) => {
  //         expect(error).toBe("error");
  //       });
  //   });
  // });
  describe("Line graph data tests", () => {
    const mockedLineGraphData = {
      seven: [7],
      ten: [10],
      thirty: [30],
    };
    it("data for seven days", () => {
      const data = getDataForLineGraph(mockedLineGraphData, 7);
      expect(data.data).toBe(mockedLineGraphData.seven);
    });
    it("data for ten days", () => {
      const data = getDataForLineGraph(mockedLineGraphData, 10);
      expect(data.data).toBe(mockedLineGraphData.ten);
    });
    it("data for thirty days", () => {
      const data = getDataForLineGraph(mockedLineGraphData, 30);
      expect(data.data).toBe(mockedLineGraphData.thirty);
    });
  });

  describe("Tests for format date readable", () => {
    expect(formatDateReadable("12/20/23")).toBe("December 20, 2023");
  });

  describe("User login tests", () => {
    const mockedUserCredendtials = {
      email: "Mocked Email",
      password: "Password",
    };
    it("Successfull test", () => {
      (axios.post as jest.Mock).mockResolvedValue({
        data: { jwt: "Mocked Jwt" },
      });
      userLogin(mockedUserCredendtials).then((res) => {
        expect(res).toBe("done");
      });
    });
    it("Successfull test", () => {
      (axios.post as jest.Mock).mockRejectedValue({
        response: {
          data: {
            error: {
              message: "Invalid identifier or password",
            },
          },
        },
      });
      userLogin(mockedUserCredendtials).catch((error) => {
        expect(error).toEqual({
          message: "Invalid email or password",
          type: "error",
        });
      });
    });
  });
  describe("User email check if it exists", () => {
    it("Email already exists test", () => {
      (axios.get as jest.Mock).mockResolvedValue({ data: ["Mocked Email"] });
      checkUserAlreadyExists("Email").catch((res) => {
        expect(res).toBe("Email already exists");
      });
    });
    it("Email doesn't exist test", () => {
      (axios.get as jest.Mock).mockResolvedValue({ data: [] });
      checkUserAlreadyExists("Email").then((res) => {
        expect(res).toBe("Email doesn't exist");
      });
    });
    it("Error test", () => {
      (axios.get as jest.Mock).mockRejectedValue({
        response: { message: "Mocked reject" },
      });
      checkUserAlreadyExists("Email").catch((res) => {
        expect(res).toEqual({ message: "Mocked reject", type: "error" });
      });
    });
  });
  describe("Create new prescription tests", () => {
    it("Successful test", () => {
      createNewPrescription({}).then((res) => {
        expect(res).toEqual({ message: "Prescription Added", type: "success" });
      });
    });
    it("Error test", () => {
      (axiosInstance.post as jest.Mock).mockRejectedValue({
        message: "Server error",
        type: "error",
      });
      createNewPrescription({}).catch((res) => {
        expect(res).toEqual({ message: "Server error", type: "error" });
      });
    });
  });

  describe("Get user data tests", () => {
    it("Successfull test", () => {
      (axiosInstance.get as jest.Mock).mockResolvedValue({
        data: {
          id: 2,
          userName: "Mocked User",
        },
      });
      getUserData().then((res) => {
        expect(res).toEqual(mockedResponse);
      });
    });
    it("Error test when the server return status code of 403", () => {
      (axiosInstance.get as jest.Mock).mockRejectedValue({
        response: { status: 403 },
      });
      getUserData().catch((res) => {
        expect(res).toEqual({
          message: "You cannot access this data",
          type: "error",
        });
      });
    });
    it("Error test when the server return status code of 404", () => {
      (axiosInstance.get as jest.Mock).mockRejectedValue({
        response: { status: 404 },
      });
      getUserData().catch((res) => {
        expect(res).toEqual({
          message: "User not found",
          type: "error",
        });
      });
    });
    it("Error test when the server return an error", () => {
      (axiosInstance.get as jest.Mock).mockRejectedValue({
        response: { status: 500 },
      });
      getUserData().catch((res) => {
        expect(res).toEqual({
          message: "Server Error",
          type: "error",
        });
      });
    });
  });
  describe("Update user data tests", () => {
    it("Successfull test", () => {
      updateUserData({}).then(() => {
        expect(showToast).toHaveBeenCalledWith(
          "User details updated",
          "success",
        );
      });
    });
    it("Error test when server return status 403", () => {
      (axiosInstance.put as jest.Mock).mockRejectedValue({
        response: { status: 403 },
      });
      updateUserData({}).catch(() => {
        expect(showToast).toHaveBeenCalledWith("Access Forbidden", "error");
      });
    });
    it("Error test when server return status 404", () => {
      (axiosInstance.put as jest.Mock).mockRejectedValue({
        response: { status: 404 },
      });
      updateUserData({}).catch(() => {
        expect(showToast).toHaveBeenCalledWith("User not found", "error");
      });
    });
    it("Error test when server return status 413", () => {
      (axiosInstance.put as jest.Mock).mockRejectedValue({
        response: { status: 413 },
      });
      updateUserData({}).catch(() => {
        expect(showToast).toHaveBeenCalledWith("Image size too large", "error");
      });
    });
    it("Error test when there is a server error", () => {
      (axiosInstance.put as jest.Mock).mockRejectedValue({
        response: { status: 500 },
      });
      updateUserData({}).catch(() => {
        expect(showToast).toHaveBeenCalledWith("Server Error", "error");
      });
    });
  });
  describe("Cancel appointment tests", () => {
    const mockAppointment = {
      id: 24,
      attributes: {
        id: 24,
        pId: "A01",
        userId: "A01",
        lastVisited: "11/17/23",
        pName: "John doe",
        referrer: "Dr. Verma",
        gender: "Male",
        timeSlot: "10:00 am to 11:00 am",
        contact: "9876543210",
        status: "Pending",
        profilePic: "profile-pic-url",
        createdAt: "2023-12-27T11:32:46.415Z",
        updatedAt: "2023-12-27T11:32:47.335Z",
        publishedAt: "2023-12-27T11:32:47.332Z",
        date: "12/27/23",
        email: "abc@abc.com",
      },
    };
    it("Successfull test", () => {
      (axiosInstance.delete as jest.Mock).mockResolvedValue({ status: 200 });
      cancelAppointment(mockAppointment).then((res) => {
        expect(res).toEqual({
          message: "Appointment Cancelled",
          type: "success",
        });
      });
    });
    it("Error test", () => {
      (axiosInstance.delete as jest.Mock).mockRejectedValue({
        response: { status: 403 },
      });
      cancelAppointment(mockAppointment).catch((error) => {
        expect(error).toEqual({
          message: "You cannot access this data",
          type: "error",
        });
      });
    });
  });

  describe("Add new patient tests", () => {
    const mockedPatientData = {
      id: 1,
      pName: "John Doe",
      email: "john.doe@example.com",
      dob: "1990-01-01",
      gender: "Male",
      contactNo: "123-456-7890",
      allergies: "None",
    };
    it("Successfull test", () => {
      (axiosInstance.post as jest.Mock).mockResolvedValue({
        message: "New Patient Added",
        type: "success",
      });
      addNewPatient(mockedPatientData).then((res) => {
        expect(res).toEqual({
          message: "New Patient Added",
          type: "success",
        });
      });
    });
    it("Error test", () => {
      (axiosInstance.post as jest.Mock).mockRejectedValue({
        response: { message: "Access Forbidden" },
      });
      addNewPatient(mockedPatientData).catch((error) => {
        expect(error).toEqual({ message: "Access Forbidden", type: "error" });
      });
    });
  });

  describe("Get jwt token tests", () => {
    it("Successfull test", () => {
      (axios.get as jest.Mock).mockResolvedValue({
        data: { jwt: "Mocked Jwt" },
      });
      getJwtToken("Mocked Id token", "Mocked Access token").then((res) => {
        expect(res).toBe("done");
      });
    });
    it("Error test", () => {
      (axios.get as jest.Mock).mockRejectedValue({
        response: { data: { error: { message: "Error" } } },
      });
      getJwtToken("Mocked Id token", "Mocked Access token").catch((res) => {
        expect(res).toBe("error");
        expect(showToast).toHaveBeenCalledWith("Error", "error");
      });
    });
  });

  describe("Account delete tests", () => {
    it("Successful test", async () => {
      (axiosInstance.get as jest.Mock).mockResolvedValue({
        data: {
          id: 2,
          user: "Mocked User",
        },
      });
      (axiosInstance.delete as jest.Mock).mockResolvedValue({ status: 200 });
      deleteAccount();
      await waitFor(() => {
        expect(showToast).toHaveBeenCalledWith(
          "Account deleted,logging out",
          "success",
        );
      });
    });
    it("Error test", async () => {
      (axiosInstance.get as jest.Mock).mockResolvedValue({
        data: {
          id: 2,
          user: "Mocked User",
        },
      });
      (axiosInstance.delete as jest.Mock).mockRejectedValue("Mocked Reject");
      deleteAccount();
      await waitFor(() => {
        expect(showToast).toHaveBeenCalledWith("Server error", "error");
      });
    });
  });
});
