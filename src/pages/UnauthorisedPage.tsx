import { Result } from "antd";

const UnauthorisedPage: React.FC = () => (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
  />
);

export default UnauthorisedPage;
