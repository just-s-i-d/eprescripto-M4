import { Button, Divider, Image } from "antd";
import googleSvg from "@assets/google.svg";

type GoogleLoginProps = {
  host: string;
};
const GoogleLogin = ({ host }: GoogleLoginProps) => {
  return (
    <>
      <Divider className="w-9/12 min-w-9/12">Or</Divider>
      <div className="flex justify-center">
        <Button
          className="flex items-center gap-2 py-5 px-8 text-base bg-white"
          href={`${host}api/connect/google`}
        >
          <Image src={googleSvg} width={20} preview={false} alt="google" /> Sign
          in with Google
        </Button>
      </div>
    </>
  );
};
export default GoogleLogin;
