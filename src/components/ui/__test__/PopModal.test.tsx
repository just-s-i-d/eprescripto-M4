import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import PopModal from "../PopModal";

describe("PopModal Component", () => {
  it("Snapshot test", () => {
    const { asFragment } = render(
      <PopModal open={true} setOpen={jest.fn()} title="Test Title">
        <div>Test Content</div>
      </PopModal>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders PopModal with title and children", () => {
    render(
      <PopModal open={true} setOpen={jest.fn()} title="Test Title">
        <div>Test Content</div>
      </PopModal>,
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("calls confirmHandler when OK button is clicked", async () => {
    const confirmHandler = jest.fn();
    render(
      <PopModal
        open={true}
        setOpen={jest.fn()}
        title="Test Title"
        confirmHandler={confirmHandler}
        okButtonText="Sure"
        footer={true}
      >
        <div>Test Content</div>
      </PopModal>,
    );
    fireEvent.click(screen.getByText("Sure"));
    await waitFor(() => {
      expect(confirmHandler).toHaveBeenCalled();
    });
  });

  it("closes the modal when Cancel button is clicked", () => {
    const setOpenMock = jest.fn();
    render(
      <PopModal
        open={true}
        setOpen={setOpenMock}
        title="Test Title"
        footer={true}
      >
        <div>Test Content</div>
      </PopModal>,
    );

    fireEvent.click(screen.getByText("Cancel"));
    expect(setOpenMock).toHaveBeenCalledWith(false);
  });
  it("closes the modal when Close button is clicked", () => {
    const setOpenMock = jest.fn();
    render(
      <PopModal
        open={true}
        setOpen={setOpenMock}
        title="Test Title"
        footer={true}
      >
        <div>Test Content</div>
      </PopModal>,
    );
    const closeBtn = screen.getByRole("button", { name: "Close" });
    fireEvent.click(closeBtn);
    expect(setOpenMock).toHaveBeenCalledWith(false);
  });
});
