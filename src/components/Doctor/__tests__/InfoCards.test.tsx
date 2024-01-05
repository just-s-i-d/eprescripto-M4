import { ApiResponseData, InfoCardDetailsType } from "@constants/types";
import "@testing-library/jest-dom";
import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import { getData } from "@utils/Doctor";
import InfoCards from "../InfoCards";
import useStatesHook from "@hooks/useStatesHook";
import "@test/matchMedia";

jest.mock("@utils/Doctor", () => ({
  getData: jest.fn().mockResolvedValue([
    {
      id: 8,
      attributes: { title: "Patients", totalCount: 10 },
    },
    {
      id: 7,
      attributes: { title: "Appointments", totalCount: 5 },
    },
    {
      id: 6,
      attributes: { title: "New Patients", totalCount: 3 },
    },
    {
      id: 5,
      attributes: { title: "Overall Rating", totalCount: 4.5 },
    },
  ]),
}));

jest.mock("@hooks/useStatesHook");

describe("Info Cards tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("Test to check if Info cards renders correctly", async () => {
    const mockResult: ApiResponseData<InfoCardDetailsType> =
      await getData("mocked api");
    (useStatesHook as jest.Mock).mockResolvedValue({ data: mockResult });
    const infoCards = useStatesHook<ApiResponseData<InfoCardDetailsType>>();
    const { asFragment } = render(
      <InfoCards infoCards={infoCards} cardDetails={mockResult} />,
    );
    await waitFor(() => {
      expect(
        screen.getByText(mockResult[0].attributes.title),
      ).toBeInTheDocument();
      expect(
        screen.getByText(mockResult[0].attributes.totalCount),
      ).toBeInTheDocument();
      expect(
        screen.getByText(mockResult[1].attributes.title),
      ).toBeInTheDocument();
      expect(
        screen.getByText(mockResult[2].attributes.title),
      ).toBeInTheDocument();
      expect(
        screen.getByText(mockResult[3].attributes.title),
      ).toBeInTheDocument();
      expect(screen.getAllByAltText("Icon image")).toHaveLength(4);
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it("Test to check the error handling", async () => {
    const mockResult: ApiResponseData<InfoCardDetailsType> =
      await getData("mocked api");
    (useStatesHook as jest.Mock).mockReturnValue({
      data: mockResult,
    });
    const setRefreshMock = jest.fn();
    const infoCards = useStatesHook<ApiResponseData<InfoCardDetailsType>>();
    render(
      <InfoCards
        infoCards={{ ...infoCards, setRefresh: setRefreshMock, error: true }}
        cardDetails={mockResult}
      />,
    );
    const tryAgainBtn = screen.getByText("Try again");
    fireEvent.click(tryAgainBtn);
    expect(setRefreshMock).toHaveBeenCalled();
  });
});
