import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignIn from "../SignIn";
import "@test/matchMedia";
import { userLogin } from "@utils/Doctor";
import { showToast } from "@utils/common";

const userCredentialsdMocked = {
  email: "abc@abc.com",
  password: "12345678",
};

jest.mock("@utils/Doctor", () => ({
  userLogin: jest.fn().mockResolvedValue("Mocked Result"),
}));
jest.mock("@utils/common", () => ({
  showToast: jest.fn(),
}));

describe("Sign in component tests", () => {
  const setSignInMocked = jest.fn();
  it("Test to check if it renders with sign up button correctly", () => {
    const { asFragment } = render(<SignIn setShowSignIn={setSignInMocked} />);
    const signUpBtn = screen.getByText("Sign Up");
    expect(signUpBtn).toBeInTheDocument();
    fireEvent.click(signUpBtn);
    expect(setSignInMocked).toHaveBeenCalled();
    expect(asFragment()).toMatchSnapshot();
  });

  it("User successfull login test", async () => {
    render(<SignIn setShowSignIn={setSignInMocked} />);
    const signInForm = screen.getByTestId("sign-in-form");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(emailInput, {
      target: { value: userCredentialsdMocked.email },
    });
    fireEvent.change(passwordInput, {
      target: { value: userCredentialsdMocked.password },
    });
    fireEvent.submit(signInForm);
    await waitFor(() => {
      expect(emailInput).toHaveValue(userCredentialsdMocked.email);
      expect(passwordInput).toHaveValue(userCredentialsdMocked.password);
      expect(userLogin).toHaveBeenCalledWith(userCredentialsdMocked);
      expect(showToast).toHaveBeenCalledWith("Logging in", "success");
    });
  });
  it("User login error test", async () => {
    (userLogin as jest.Mock).mockRejectedValue({ message: "Mocked Result" });
    render(<SignIn setShowSignIn={setSignInMocked} />);
    const signInForm = screen.getByTestId("sign-in-form");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(emailInput, {
      target: { value: userCredentialsdMocked.email },
    });
    fireEvent.change(passwordInput, {
      target: { value: userCredentialsdMocked.password },
    });
    fireEvent.submit(signInForm);
    await waitFor(() => {
      expect(emailInput).toHaveValue(userCredentialsdMocked.email);
      expect(passwordInput).toHaveValue(userCredentialsdMocked.password);
      expect(userLogin).toHaveBeenCalledWith(userCredentialsdMocked);
      expect(showToast).toHaveBeenCalledWith("Mocked Result", "error");
    });
  });
});
