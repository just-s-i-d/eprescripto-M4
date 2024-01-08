import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@test/matchMedia";
import PasswordForm from "../PasswordForm";
import { Form } from "antd";

describe("Password form test", () => {
  it("Render the Password fields correctly", () => {
    const { asFragment } = render(
      <Form>
        <PasswordForm />
      </Form>,
    );
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
  it("Password match test", async () => {
    render(
      <Form>
        <PasswordForm />
      </Form>,
    );
    const password = screen.getByLabelText("Password");
    const confirmPassword = screen.getByLabelText("Confirm Password");
    fireEvent.change(password, {
      target: { value: "12345678" },
    });
    fireEvent.change(confirmPassword, {
      target: { value: "123456789" },
    });
    await waitFor(() => {
      expect(password).toHaveValue("12345678");
      expect(confirmPassword).toHaveValue("123456789");
      expect(screen.getByText("Password doesn't match!")).toBeVisible();
    });
    fireEvent.change(confirmPassword, {
      target: { value: "12345678" },
    });
    await waitFor(() => {
      expect(screen.queryByText("Password doesn't match!")).toBeFalsy();
    });
  });
});
