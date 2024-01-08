import { UserContext } from "@context/UserProvider";
import RouteWrapperComponent from "@routes/RouteWrapperComponent";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
type WrapperComponentProps = {
  role?: string;
};
const mockedComponents = {
  doctor: <h1>Doctor</h1>,
};
const WrapperComponent = ({ role }: WrapperComponentProps) => {
  return (
    <UserContext.Provider value={{ role: role }}>
      <RouteWrapperComponent components={mockedComponents} />
    </UserContext.Provider>
  );
};
describe("Route Wrapper Component tests", () => {
  it("Snapshot test", () => {
    const { asFragment } = render(<WrapperComponent role="doctor" />);
    expect(screen.getByText("Doctor")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
  it("Loading test", () => {
    render(<WrapperComponent />);
    expect(screen.getByAltText("loader")).toBeInTheDocument();
  });
});
