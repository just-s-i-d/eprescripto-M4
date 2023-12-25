import { Form, Input } from "antd";

const AddressForm = () => {
  return (
    <>
      <Form.Item
        label="Country"
        name="country"
        required
        rules={[
          {
            required: true,
            message: "Field cannot be empty",
          },
          {
            pattern: /^[A-Za-z]+$/,
            message: "Number and special characters not allowed",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="State"
        name="state"
        required
        rules={[
          {
            required: true,
            message: "Field cannot be empty",
          },
          {
            pattern: /^[A-Za-z]+$/,
            message: "Number and special characters not allowed",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="City"
        name="city"
        required
        rules={[
          {
            required: true,
            message: "Field cannot be empty",
          },
          {
            pattern: /^[A-Za-z]+$/,
            message: "Number and special characters not allowed",
          },
        ]}
      >
        <Input />
      </Form.Item>
    </>
  );
};

export default AddressForm;
