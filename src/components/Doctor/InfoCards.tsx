import { useEffect, useState } from "react";
import { Row, Col, Card, Image, Typography, Skeleton } from "antd";

import ErrorBoundary from "@components/ErrorBoundary";
import CardTitle from "@components/ui/CardTitle";
import { ApiResponseData, InfoCardDetailsType } from "@constants/types";
import { CARD_PROPERTIES } from "@constants/constants";
import useStatesHook from "../../hooks/useStatesHook";

const { Text } = Typography;

type InfoCardsProps = {
  cardDetails?: ApiResponseData<InfoCardDetailsType>;
  infoCards: ReturnType<
    typeof useStatesHook<ApiResponseData<InfoCardDetailsType>>
  >;
};

const getBgColor = (index: number) => {
  switch (index + 1) {
    case 1:
      return "bg-infoCardColors-color1";
    case 2:
      return "bg-infoCardColors-color2";
    case 3:
      return "bg-infoCardColors-color3";
    case 4:
      return "bg-infoCardColors-color4";
  }
};
const InfoCards = ({ cardDetails, infoCards }: InfoCardsProps) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    cardDetails && setTimeout(() => setLoading(false), 500);
  }, [cardDetails]);
  return (
    <Card
      className="info-cards-body w-full h-[22vh] max-md:h-full flex justify-center"
      bordered={false}
    >
      <ErrorBoundary
        error={infoCards.error}
        refreshComponent={() => infoCards.setRefresh((prev) => !prev)}
      >
        <Row
          gutter={30}
          className="w-full max-md:flex max-md:flex-wrap gap-y-6 justify-center max-lg:flex-nowrap"
        >
          {cardDetails?.map((element, index) => {
            return (
              <ErrorBoundary key={element.attributes.title}>
                <Col className="basis-3/12 max-md:basis-6/12 max-sm:basis-9/12">
                  <Card
                    className={`info-card h-[17vh] py-8 px-4 max-sm:py-5 max-w-[390px] max-xl:h-[16vh] max-xl:min-w-[135px] max-sm:h-[150px] ${getBgColor(
                      index,
                    )} text-white`}
                    bordered={false}
                  >
                    <div>
                      <div className={`flex items-center gap-4 mb-2 mt-2`}>
                        {loading ? (
                          <Skeleton.Avatar active shape="square" size={50} />
                        ) : (
                          <Image
                            src={CARD_PROPERTIES[index]}
                            alt="Icon image"
                            className="w-[50px] max-xxl:w-[35px] max-md:w-[40px]"
                            preview={false}
                          />
                        )}
                        {loading ? (
                          <Skeleton.Button />
                        ) : (
                          <Text className="text-4xl max-xl:text-3xl text-white max-md:text-4xl">
                            {element.attributes.totalCount}
                          </Text>
                        )}
                      </div>
                      {loading ? (
                        <Skeleton.Input active />
                      ) : (
                        <CardTitle className="max-xxl:text-lg max-xl:text-base max-md:text-lg">
                          {element.attributes.title}
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
