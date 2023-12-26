import { Result, Button, Layout } from "antd";

const PageNotFound = () => {
  return (
    <Layout className="w-full h-screen flex items-center justify-center">
      <Result
        status="404"
        title="404"
        subTitle="Sorry the page you visited,does not exist"
        extra={
          <Button
            href="/dashboard"
            type="default"
            className="text-white bg-secondary"
          >
            Home
          </Button>
        }
      />
    </Layout>
  );
};
export default PageNotFound;
