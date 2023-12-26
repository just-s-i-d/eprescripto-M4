import { Form, Input } from "antd";

const PasswordForm = () => {
  return (
    <>
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
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Field cannot be empty",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Password doesn't match!"));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
    </>
  );
};
export default PasswordForm;
