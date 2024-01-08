import { render, waitFor } from "@testing-library/react";
import GoogleAuthPage from "../GoogleAuthPage";
import { MemoryRouter } from "react-router-dom";
import { getJwtToken } from "@utils/Doctor";
import { UserContext } from "@context/UserProvider";

jest.mock("@utils/Doctor", () => ({
  getJwtToken: jest.fn().mockResolvedValue("mocked result"),
}));

type WrapperComponentProps = {
  mockedSetIsloggedIn: VoidFunction;
  mockedGetRole: VoidFunction;
};
const WrapperComponent = ({
  mockedSetIsloggedIn,
  mockedGetRole,
}: WrapperComponentProps) => {
  return (
    <MemoryRouter
      initialEntries={[
        "/auth/google?id_token=mockedToken&access_token=mockedTken",
      ]}
    >
      <UserContext.Provider
        value={{ setIsLoggedIn: mockedSetIsloggedIn, getRole: mockedGetRole }}
      >
        <GoogleAuthPage />
      </UserContext.Provider>
    </MemoryRouter>
  );
};
describe("Google Auth page tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const mockedSetIsloggedIn = jest.fn();
  const mockedGetRole = jest.fn();
  it("Getting Jwt token and role", async () => {
    const { asFragment } = render(
      <WrapperComponent
        mockedGetRole={mockedGetRole}
        mockedSetIsloggedIn={mockedSetIsloggedIn}
      />,
    );
    await waitFor(() => {
      expect(getJwtToken).toHaveBeenCalled();
      expect(mockedSetIsloggedIn).toHaveBeenCalled();
      expect(mockedGetRole).toHaveBeenCalled();
    });
    expect(asFragment()).toMatchSnapshot();
  });
  it("redirect to auth page", async () => {
    (getJwtToken as jest.Mock).mockRejectedValue("Mocked result");
    render(
      <WrapperComponent
        mockedGetRole={mockedGetRole}
        mockedSetIsloggedIn={mockedSetIsloggedIn}
      />,
    );
    await waitFor(() => {
      expect(getJwtToken).toHaveBeenCalled();
      expect(mockedSetIsloggedIn).not.toHaveBeenCalled();
      expect(mockedGetRole).not.toHaveBeenCalled();
    });
  });
});
