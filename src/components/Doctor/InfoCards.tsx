import { Row, Col, Card, Image, Typography, Skeleton } from "antd";
import { useEffect, useState } from "react";
import ErrorBoundary from "@components/ErrorBoundary";
import CardTitle from "@components/ui/CardTitle";
import { InfoCardDetailsType } from "@constants/types";
import { CARD_PROPERTIES } from "@constants/constants";

const { Text } = Typography;

type InfoCardsProps = {
  cardDetails: InfoCardDetailsType;
  error: boolean;
};
const InfoCards = ({ cardDetails }: InfoCardsProps) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    cardDetails && setTimeout(() => setLoading(false), 500);
  }, [cardDetails]);
  return (
    <Card
      className="w-full h-[22vh] max-tablet:h-full flex justify-center"
      bodyStyle={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexWrap: "nowrap",
      }}
      bordered={false}
    >
      <ErrorBoundary>
        <Row
          gutter={30}
          className="w-full max-tablet:flex max-tablet:flex-wrap gap-y-6 justify-center max-laptop:flex-nowrap"
        >
          {cardDetails?.map((element, index) => {
            return (
              <ErrorBoundary key={element.title}>
                <Col className="basis-3/12 max-tablet:basis-6/12 max-mobile:basis-9/12">
                  <Card
                    className={`h-[17vh] py-8 px-4 max-tablet:py-5 max-w-[390px] max-medium:h-[16vh] max-medium:min-w-[135px] max-mobile:h-[150px]`}
                    bordered={false}
                    bodyStyle={{
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                    }}
                    style={{
                      backgroundColor: CARD_PROPERTIES[index].bgColor,
                      color: CARD_PROPERTIES[index].textColor,
                    }}
                  >
                    <div>
                      <div className={`flex items-center gap-4 mb-2 mt-2`}>
                        {loading ? (
                          <Skeleton.Avatar active shape="square" size={50} />
                        ) : (
                          <Image
                            src={CARD_PROPERTIES[index].icon}
                            alt="Icon image"
                            className="w-[50px] max-desktop:w-[35px] max-tablet:w-[40px]"
                            preview={false}
                          />
                        )}
                        {loading ? (
                          <Skeleton.Button />
                        ) : (
                          <Text className="text-4xl max-desktop:text-3xl text-white max-tablet:text-4xl">
                            {element.totalCount}
                          </Text>
                        )}
                      </div>
                      {loading ? (
                        <Skeleton.Input active />
                      ) : (
                        <CardTitle className="max-desktop:text-lg max-medium:text-base max-tablet:text-lg">
                          {element.title}
                        </CardTitle>
                      )}
                    </div>
                  </Card>
                </Col>
              </ErrorBoundary>
            );
          })}
        </Row>
      </ErrorBoundary>
    </Card>
  );
};
export default InfoCards;
