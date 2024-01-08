import GuestRoute from "@routes/GuestRoute";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { UserContext } from "@context/UserProvider";

type WrapperComponentProps = {
  loggedIn: boolean;
};
const WrapperComponent = ({ loggedIn }: WrapperComponentProps) => {
  return (
    <MemoryRouter initialEntries={["/auth"]}>
      <UserContext.Provider value={{ isLoggedIn: loggedIn }}>
        <Routes>
          <Route path="/auth" element={<GuestRoute />}>
            <Route index element={<h1>Guest Route</h1>} />
          </Route>
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
        </Routes>
      </UserContext.Provider>
    </MemoryRouter>
  );
};
describe("Guest Route tests", () => {
  it("Redirects to dashboard when user is logged in", () => {
    const { asFragment } = render(<WrapperComponent loggedIn={true} />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
  it("Guest Route test", () => {
    render(<WrapperComponent loggedIn={false} />);
    expect(screen.getByText("Guest Route")).toBeInTheDocument();
  });
});
