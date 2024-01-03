import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import TableCard from "../TableCard";
import "@test/matchMedia";

const mockTableData = [
  { id: 1, name: "John Doe", age: 30 },
  { id: 2, name: "Jane Doe", age: 25 },
];

const mockColumns = [
  { title: "ID", dataIndex: "id", key: "id" },
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Age", dataIndex: "age", key: "age" },
];

describe("TableCard Component", () => {
  it("Snapshot test", () => {
    const { asFragment } = render(
      <TableCard
        tableData={mockTableData}
        columns={mockColumns}
        setLoading={jest.fn()}
        setRefresh={jest.fn()}
        loading={false}
        error={false}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("renders TableCard with search input and table", () => {
    render(
      <TableCard
        tableData={mockTableData}
        columns={mockColumns}
        setLoading={jest.fn()}
        setRefresh={jest.fn()}
        loading={false}
        error={false}
      />,
    );
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    expect(screen.getByTestId("custom-table")).toBeInTheDocument();
  });
  it("Error handle test", () => {
    const mockedSetRefresh = jest.fn();
    render(
      <TableCard
        tableData={[]}
        columns={mockColumns}
        setLoading={jest.fn()}
        setRefresh={mockedSetRefresh}
        loading={false}
        error={true}
      />,
    );
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    const tryAgain = screen.getByText("Try again");
    expect(tryAgain).toBeInTheDocument();
    fireEvent.click(tryAgain);
    expect(mockedSetRefresh).toHaveBeenCalled();
  });
  it("shows no data state in the table", () => {
    render(
      <TableCard
        tableData={[]}
        columns={mockColumns}
        setLoading={jest.fn()}
        setRefresh={jest.fn()}
        loading={false}
        error={false}
      />,
    );
    const noData = screen.getByText("No data");
    expect(screen.getByTestId("custom-table")).toBeInTheDocument();
    expect(noData).toHaveClass("ant-empty-description");
  });

  it("filters table data when search input changes", async () => {
    render(
      <TableCard
        tableData={mockTableData}
        columns={mockColumns}
        setLoading={jest.fn()}
        setRefresh={jest.fn()}
        loading={false}
        error={false}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText("Search"), {
      target: { value: "John" },
    });

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.queryByText("Jane Doe")).toBeNull();
    });
  });
});
