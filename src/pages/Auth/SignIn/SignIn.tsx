import { SetStateAction, useEffect, useState } from "react";
import CardSider from "../CardSider";
import { Button, Form, Input, Space } from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import { UserCredentialsType } from "@constants/types";
import GoogleLogin from "@components/ui/GoogleLogin";
import { userLogin } from "@utils/Doctor";
import { showToast } from "@utils/common";
type SignInPropsType = {
  setShowSignIn: React.Dispatch<SetStateAction<boolean>>;
};
const SignIn = ({ setShowSignIn }: SignInPropsType) => {
  const [signInForm] = useForm();
  const [userCredentials, setUserCredentials] = useState<UserCredentialsType>();
  const [disabled, setDisabled] = useState(true);
  const formValues = useWatch([], signInForm);
  const onFinish = (values: UserCredentialsType) => {
    setUserCredentials((prev) => ({ ...prev, ...values }));
    userLogin(formValues)
      .then(() => {
        showToast("Logging in", "success");
      })
      .catch((error) => {
        showToast(error.message, "error");
      });
  };
  useEffect(() => {
    signInForm.validateFields({ validateOnly: true }).then(
      () => {
        setDisabled(false);
      },
      () => {
        setDisabled(true);
      },
    );
  }, [formValues]);
  return (
    <>
      <CardSider hidden={false} />
      <Space direction="vertical" className="w-full h-5/6 px-8">
        <div className="text-[34px]">Sign In</div>
        <Form
          form={signInForm}
          className="custom-form flex flex-col gap-4 mt-6"
          size="large"
          layout="vertical"
          onFinish={onFinish}
          initialValues={userCredentials}
        >
          <Form.Item
            label="Email"
            name="email"
            required
            rules={[
              {
                required: true,
                message: "Field cannot be empty",
              },
              {
                pattern: /^[\w.-]+@[\w.-]+\.\w+$/,
                message: "Enter a valid mail",
              },
            ]}
          >
            <Input placeholder="ex. John@example.com" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Field cannot be empty",
              },
              {
                min: 8,
                message: "Password length should be between 8 to 15",
              },
              {
                max: 15,
                message: "Password length should be between 8 to 15",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="password" />
          </Form.Item>
          <Button
            className="text-white w-[90px] mx-auto bg-primary disabled:opacity-50"
            htmlType="submit"
            disabled={disabled}
          >
            Sign In
          </Button>
        </Form>
        <GoogleLogin />
        <div className="absolute md:bottom-8 xs:bottom-6">
          Don't have an Account ?
          <span
            className="text-base cursor-pointer text-blue-500 ml-2"
            onClick={() => setShowSignIn(false)}
          >
            Sign Up
          </span>
        </div>
      </Space>
    </>
  );
};
export default SignIn;
