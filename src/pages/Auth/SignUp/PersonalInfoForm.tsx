import { Form, Input, Select } from "antd";

const PersonalInfoForm = () => {
  return (
    <>
      <Form.Item
        label="Name"
        name="docName"
        className="text-xl"
        required
        rules={[
          {
            pattern: /^(Dr\.?|Doctor)?\s?[A-Za-z\s.'-]+$/,
            message: "Special characters not allowed",
          },
          {
            required: true,
            message: "Field cannot be empty",
          },
        ]}
      >
        <Input placeholder="ex. John Doe or Dr. John Doe" />
      </Form.Item>
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
      <div className="w-full flex justify-between">
        <Form.Item
          label="Gender"
          name="gender"
          required
          className="w-[45%]"
          rules={[
            {
              required: true,
              message: "Field cannot be empty",
            },
          ]}
        >
          <Select
            placeholder="Select a gender"
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Date of Birth"
          required
          className="w-[45%]"
          name="dob"
          rules={[
            {
              required: true,
              message: "Field cannot be empty",
            },
          ]}
        >
          <Input type="date" placeholder="ex. 24" />
        </Form.Item>
      </div>
    </>
  );
};

export default PersonalInfoForm;
