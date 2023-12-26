import ErrorBoundary from "@components/ErrorBoundary";
import PersonalInfoCard from "@components/Profile/PersonalInfoCard";
import ProfessionalInfoCard from "@components/Profile/ProfessionalInfoCard";
import PopModal from "@components/ui/PopModal";
import {
  ApiUserDataResponseType,
  CommonPropsTypeDarkMode,
} from "@constants/types";
import { deleteAccount, getUserData } from "@utils/Doctor";
import { Button, Card, Space } from "antd";
import { useEffect, useState } from "react";

const ProfilePage = ({ darkMode }: CommonPropsTypeDarkMode) => {
  const [userData, setUserData] = useState<ApiUserDataResponseType>();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    getUserData().then((res) => {
      setUserData(res);
    });
  }, []);
  const confirmHandler = () => {
    deleteAccount();
  };
  return (
    <ErrorBoundary>
      <Space direction="vertical" size={20} className={darkMode ? "dark" : ""}>
        <PersonalInfoCard userData={userData} />
        <ProfessionalInfoCard userData={userData} />
        <Card>
          <div className="flex items-center justify-between gap-6">
            <span className="font-extrabold sm:text-base">
              Once you delete your account, there is no going back.
            </span>
            <Button className="w-[150px]" danger onClick={() => setOpen(true)}>
              Delete Account
            </Button>
          </div>
        </Card>
      </Space>
      <PopModal
        footer={true}
        setOpen={setOpen}
        open={open}
        okButtonText="Yes"
        title="Delete Account"
        confirmHandler={confirmHandler}
      >
        Are you sure,you want to delete your account
      </PopModal>
    </ErrorBoundary>
  );
};
export default ProfilePage;
