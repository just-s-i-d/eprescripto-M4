import { useEffect, useState } from "react";

import InfoCards from "./InfoCards";

import { InfoCardDetailsType } from "@constants/types";
import { getInfoCardsData } from "@utils/Doctor";

const DoctorDashboardPage: React.FC = () => {
  const [infoCardError, setInfoCardError] = useState(false);
  const [infoCardsData, setInfoCardsData] = useState<InfoCardDetailsType>();

  useEffect(() => {
    getInfoCardsData()
      .then((res) => {
        setInfoCardsData(res);
        setInfoCardError(false);
      })
      .catch(() => setInfoCardError(true));
  }, []);
  return (
    <div className="max-w-full flex">
      <div className="w-full flex flex-col gap-6">
        <InfoCards cardDetails={infoCardsData} error={infoCardError} />
      </div>
    </div>
  );
};

export default DoctorDashboardPage;
