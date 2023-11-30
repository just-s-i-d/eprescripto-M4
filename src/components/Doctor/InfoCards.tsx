import { Row, Col, Card, Image, Typography, Skeleton } from "antd";

import { INFO_CARD_DETAILS } from "@constants/constants";
import { useEffect, useState } from "react";
import ErrorBoundary from "@components/ErrorBoundary";

const { Text } = Typography;

const InfoCards = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <Card
      bodyStyle={{ width: "100%", display: "flex", justifyContent: "center" }}
    >
      <Row gutter={50} className="w-full">
        {INFO_CARD_DETAILS.map((element) => {
          return (
            <ErrorBoundary>
              <Col span={6} key={element.title}>
                <Card
                  className={`h-[17vh] bg-[${element.color}] text-center py-8 px-1 text-[#0E1446]`}
                  bordered={true}
                  style={{
                    backgroundColor: element.color,
                  }}
                  bodyStyle={{ padding: 0 }}
                >
                  <Skeleton
                    className="px-3"
                    loading={loading}
                    active
                    avatar={{ shape: "square" }}
                    paragraph={{ rows: 1, width: "80%" }}
                  >
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Image
                        className=""
                        src={element.icon}
                        alt="Icon image"
                        width={50}
                        height={50}
                        preview={false}
                      />
                      <Text className="text-4xl" type="success">
                        {element.totalCount}
                      </Text>
                    </div>
                    <h2 className="mt-2 text-xl">{element.title}</h2>
                  </Skeleton>
                </Card>
              </Col>
            </ErrorBoundary>
          );
        })}
      </Row>
    </Card>
  );
};
export default InfoCards;
