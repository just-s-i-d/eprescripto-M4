import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddressForm from "../AddressForm";
import "@test/matchMedia";

describe("Address form test", () => {
  it("Render the Address fields correctly", () => {
    const { asFragment } = render(<AddressForm />);
    expect(screen.getByLabelText("Country")).toBeInTheDocument();
    expect(screen.getByLabelText("State")).toBeInTheDocument();
    expect(screen.getByLabelText("City")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
