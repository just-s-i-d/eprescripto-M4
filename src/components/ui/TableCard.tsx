import { SetStateAction, useEffect, useState } from "react";
import { Input, Table, TableProps } from "antd";

import { SearchOutlined } from "@ant-design/icons";

import ErrorBoundary from "@components/ErrorBoundary";
import { AnyObject } from "antd/es/_util/type";
import { ColumnsType } from "antd/es/table";

type TableCardPropType = {
  tableData: TableProps<AnyObject>;
  columns: ColumnsType<AnyObject>;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  pageSize?: number;
  className?: string;
  setRefresh: React.Dispatch<SetStateAction<boolean>>;
  setError: React.Dispatch<SetStateAction<boolean>>;
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
      Object.values(item).some((field) =>
        field.toString().toLowerCase().includes(value.toLowerCase()),
      ),
    );
    setFilteredData(newFilteredData);
    setLoading(false);
  };
  useEffect(() => {
    setFilteredData(tableData);
  }, [tableData]);
  return (
    <div className="marginTop-12 minWidth-1000 minHeight-74">
      <div className="margin-bottom-12 align-text-center">
        <Input
          placeholder="Search"
          onChange={(event) => handleSearch(event.target.value)}
          style={{ width: 200 }}
          prefix={<SearchOutlined />}
        />
      </div>
      <ErrorBoundary
        error={error}
        refreshComponent={() => setRefresh((prev) => !prev)}
      >
        <Table
          className={`custom-table scroll ${className}`}
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
