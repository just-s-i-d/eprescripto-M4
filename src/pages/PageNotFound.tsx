import { Result, Button } from "antd";

const PageNotFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry the page you visited,does not exist"
      extra={
        <Button href="/" type="primary">
          Home
        </Button>
      }
    />
  );
};
export default PageNotFound;
