import { Card, Layout } from "antd";
import SignUp from "./SignUp/SignUp";
import { useState } from "react";
import SignIn from "./SignIn/SignIn";

const AuthPage = () => {
  const [showSignIn, setShowSignIn] = useState(true);

  return (
    <Layout className="w-full h-screen flex items-center justify-center">
      <Card
        bordered={false}
        className="custom-card custom-card-login w-6/12 xs:h-[75vh] md:h-[65vh] rounded-[30px] z-20 xs:w-[95%] md:w-[91%] md:min-w-[700px] lg:w-[70%] xl:w-[65%] xxl:w-[55%] 2xl:h-[60vh]"
      >
        {showSignIn ? (
          <SignIn setShowSignIn={setShowSignIn} />
        ) : (
          <SignUp setShowSignIn={setShowSignIn} />
        )}
      </Card>
    </Layout>
  );
};
export default AuthPage;
