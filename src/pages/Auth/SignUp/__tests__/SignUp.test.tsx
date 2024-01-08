import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SignUp from "../SignUp";
import "@testing-library/jest-dom";
import "@test/matchMedia";
import { act } from "react-dom/test-utils";

jest.mock("@utils/Doctor", () => ({
  ...jest.requireActual("@utils/Doctor"),
  checkUserAlreadyExists: jest.fn().mockResolvedValue("Mocked"),
}));
describe("Sign up tests", () => {
  const setShowSignInMocked = jest.fn();
  it("Render the button to switch to sign in form", () => {
    const { asFragment } = render(
      <SignUp setShowSignIn={setShowSignInMocked} />,
    );
    const signInBtn = screen.getByText("Sign In");
    expect(signInBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(signInBtn);
    });
    expect(setShowSignInMocked).toHaveBeenCalled();
    expect(asFragment()).toMatchSnapshot();
  });

  it("Test to check User email already exists", async () => {
    render(<SignUp setShowSignIn={setShowSignInMocked} />);
    const genderSelect = screen.getByRole("combobox", { name: "Gender" });
    expect(genderSelect).toBeInTheDocument();
    fireEvent.change(genderSelect, { target: { value: "male" } });
    await waitFor(() => {
      const optionMale = document.getElementById("gender_list_0");
      optionMale && fireEvent.click(optionMale);
      expect(optionMale).toBeInTheDocument();
    });
    await waitFor(() => {
      const nextBtn = screen.getByRole("button", { name: "Next" });
      expect(nextBtn).toBeDisabled();
    });
  });

  it("User registration test", async () => {
    render(<SignUp setShowSignIn={setShowSignInMocked} />);
    const name = screen.getByLabelText("Name");
    const email = screen.getByLabelText("Email");
    const gender = screen.getByLabelText("Gender");
    const dob = screen.getByLabelText("Date of Birth");
    act(() => {
      fireEvent.change(name, { target: { value: "John" } });
      fireEvent.change(email, { target: { value: "email@email.com" } });
      fireEvent.select(gender, { target: { value: "male" } });
      fireEvent.change(dob, { target: { value: "2001-05-27" } });
    });
    expect(name).toHaveValue("John");
    expect(email).toHaveValue("email@email.com");
    expect(gender).toHaveValue("male");
    expect(dob).toHaveValue("2001-05-27");
    const nextBtn = screen.getByRole("button", { name: "Next" });
    fireEvent.click(nextBtn);
  });
});
