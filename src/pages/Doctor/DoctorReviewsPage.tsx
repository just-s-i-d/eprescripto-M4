import { useEffect } from "react";

import { Card, Table } from "antd";
import { ColumnsType } from "antd/es/table";

import { ApiResponseData, ReviewDataType } from "@constants/types";
import { getData, reviewsDataEndPoint } from "@utils/Doctor";
import useStatesHook from "../../hooks/useStatesHook";
import starPng from "@assets/star.png";
import ErrorBoundary from "@components/ErrorBoundary";

const DoctorReviewsPage = () => {
  const reviews = useStatesHook<Record<string, string | number>[]>();
  const columns: ColumnsType<ReviewDataType> = [
    {
      title: "S. No",
      render: (_, _1, index) => index + 1,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => (
        <span className="flex">
          {Array.from({ length: rating }, (_, index) => (
            <img
              src={starPng}
              key={index}
              role="img"
              aria-label="star"
              width={20}
            />
          ))}
        </span>
      ),
      filters: [
        {
          text: "1 Star",
          value: 1,
        },
        {
          text: "2 Star",
          value: 2,
        },
        {
          text: "3 Star",
          value: 3,
        },
        {
          text: "4 Star",
          value: 4,
        },
        {
          text: "5 Star",
          value: 5,
        },
      ],
      onFilter: (value, record) => record.rating === value,
      sorter: {
        compare: (a, b) => a.rating - b.rating,
        multiple: 3,
      },
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
  ];
  useEffect(() => {
    getData<ApiResponseData<Record<string, string | number>>>(
      reviewsDataEndPoint,
    )
      .then((res) => {
        const data = res.map((element) => element.attributes);
        reviews.setData(data);
        reviews.setError(false);
        reviews.setLoading(false);
      })
      .catch(() => {
        reviews.setError(true);
        reviews.setLoading(false);
      });
  }, [reviews.refresh]);
  return (
    <>
      <Card className="overflow-scroll min-h-[50vh]">
        <ErrorBoundary
          error={reviews.error}
          refreshComponent={() => reviews.setRefresh((prev) => !prev)}
        >
          <Table
            className="custom-table min-w-[800px]"
            columns={columns as ColumnsType<Record<string, string | number>>}
            dataSource={reviews.data}
            loading={reviews.loading}
          />
        </ErrorBoundary>
      </Card>
    </>
  );
};
export default DoctorReviewsPage;
