import { SetStateAction, useEffect, useState } from "react";
import { Input, Table } from "antd";

import { SearchOutlined } from "@ant-design/icons";

import ErrorBoundary from "@components/ErrorBoundary";
import { ColumnsType } from "antd/es/table";

type TableCardPropType = {
  tableData?: Record<string, string | number>[];
  columns: ColumnsType<Record<string, string | number>>;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  pageSize?: number;
  className?: string;
  setRefresh: React.Dispatch<SetStateAction<boolean>>;
  error: boolean;
};
const TableCard = ({
  tableData,
  columns,
  pageSize = 10,
  className,
  error,
  setLoading,
  setRefresh,
  loading,
}: TableCardPropType) => {
  const [filteredData, setFilteredData] = useState(tableData);
  const handleSearch = (value: string) => {
    setLoading(true);
    const newFilteredData = tableData?.filter((item) =>
      Object.values(item).some(
        (field) =>
          field && field.toString().toLowerCase().includes(value.toLowerCase()),
      ),
    );
    setFilteredData(newFilteredData);
    setLoading(false);
  };
  useEffect(() => {
    setFilteredData(tableData);
  }, [tableData]);
  return (
    <div className="marginTop-12 minHeight-74">
      <div className="margin-bottom-12">
        <Input
          placeholder="Search"
          className="custom-search"
          onChange={(event) => handleSearch(event.target.value)}
          prefix={<SearchOutlined />}
        />
      </div>
      <ErrorBoundary
        error={error}
        refreshComponent={() => setRefresh((prev) => !prev)}
      >
        <Table
          data-testid="custom-table"
          className={`custom-table ${className || ""}`}
          columns={columns}
          dataSource={filteredData}
          loading={loading}
          pagination={{ pageSize: pageSize }}
        />
      </ErrorBoundary>
    </div>
  );
};

export default TableCard;
