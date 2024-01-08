import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "@routes/PrivateRoute";
import { UserContext } from "@context/UserProvider";

type WrapperComponentProps = {
  loggedIn: boolean;
  role: string;
};
jest.mock("@context/UserProvider");
const WrapperComponent = ({ loggedIn, role }: WrapperComponentProps) => {
  return (
    <MemoryRouter initialEntries={["/dashboard"]}>
      <UserContext.Provider value={{ isLoggedIn: loggedIn, role: role }}>
        <Routes>
          <Route
            element={<PrivateRoute allowedRoles={["doctor", "patient"]} />}
          >
            <Route path="dashboard" element={<h1>Dashboard</h1>} />
          </Route>
          <Route path="auth" element={<h1>Auth Page</h1>} />
          <Route path="forbidden" element={<h1>Forbidden Access Page</h1>} />
        </Routes>
      </UserContext.Provider>
    </MemoryRouter>
  );
};
describe("Private Route tests", () => {
  it("Render to dashboard when user is logged in and has access to dashboard", () => {
    const { asFragment } = render(
      <WrapperComponent loggedIn={true} role="doctor" />,
    );
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
  it("Redirect to auth page test", async () => {
    render(<WrapperComponent loggedIn={false} role="doctor" />);
    expect(screen.getByText("Auth Page")).toBeInTheDocument();
  });
  it("Redirect to forbidden access page", async () => {
    render(<WrapperComponent loggedIn={true} role="notAllowedRole" />);
    expect(screen.getByText("Forbidden Access Page")).toBeInTheDocument();
  });
});
