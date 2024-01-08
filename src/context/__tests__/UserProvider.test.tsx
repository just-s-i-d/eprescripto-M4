import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { UserContext, UserProvider } from "@context/UserProvider";
import { getUserData } from "@utils/Doctor";
import { showToast } from "@utils/common";

localStorage.setItem("token", "mockedToken");
jest.mock("@utils/Doctor", () => ({
  getUserData: jest.fn().mockResolvedValue({ role: { type: "doctor" } }),
}));

jest.mock("@utils/common", () => ({
  showToast: jest.fn(),
}));

const WrapperComponent = () => {
  return (
    <UserProvider>
      <UserContext.Consumer>
        {({ role, isLoggedIn }) => (
          <>
            <h2>{role}</h2>
            <h2>{isLoggedIn}</h2>
          </>
        )}
      </UserContext.Consumer>
    </UserProvider>
  );
};
describe("User Provider tests", () => {
  it("Snapshot test", () => {
    const { asFragment } = render(<WrapperComponent />);
    expect(asFragment()).toMatchSnapshot();
  });
  it("Provides the correct values", async () => {
    render(<WrapperComponent />);
    await waitFor(() => {
      expect(screen.getByText("doctor")).toBeInTheDocument();
    });
  });
  it("Shows error test", async () => {
    (getUserData as jest.Mock).mockRejectedValue({
      message: "Error",
      type: "error",
    });
    render(<WrapperComponent />);
    await waitFor(() => {
      expect(showToast).toHaveBeenCalledWith("Error", "error");
    });
  });
});
