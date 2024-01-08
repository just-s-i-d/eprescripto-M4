import { Button, Layout, Result } from "antd";

const ForbiddenAccessPage: React.FC = () => (
  <Layout className="w-full h-screen flex items-center justify-center">
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button
          href="/dashboard"
          type="default"
          className="text-white bg-secondary"
          data-testid="home-btn"
        >
          Home
        </Button>
      }
    />
  </Layout>
);

export default ForbiddenAccessPage;
