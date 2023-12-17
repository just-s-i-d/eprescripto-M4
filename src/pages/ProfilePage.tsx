import ErrorBoundary from "@components/ErrorBoundary";
import PersonalInfoCard from "@components/Profile/PersonalInfoCard";
import ProfessionalInfoCard from "@components/Profile/ProfessionalInfoCard";
import { getUserData } from "@utils/Doctor";
import { Space } from "antd";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const [userData, setUserData] = useState();
  useEffect(() => {
    getUserData().then((res) => {
      setUserData(res);
    });
  }, []);
  return (
    <ErrorBoundary>
      <Space direction="vertical" size={20}>
        <PersonalInfoCard userData={userData} />
        <ProfessionalInfoCard userData={userData} />
      </Space>
    </ErrorBoundary>
  );
};
export default ProfilePage;
