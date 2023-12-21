import { Form, Input, Select } from "antd";

const ProfessionalInfoForm = () => {
  return (
    <>
      <Form.Item
        name="licenseNo"
        label="License Number"
        rules={[
          {
            required: true,
            message: "Field cannot be empty",
          },
          {
            len: 4,
            message: "Only 4 digits allowed",
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>
      <div className="w-full flex justify-between">
        <Form.Item
          name="speciality"
          label="Speciality"
          className="w-[45%]"
          rules={[
            {
              required: true,
              message: "Field cannot be empty",
            },
          ]}
        >
          <Input placeholder="ex. Surgon" />
        </Form.Item>
        <Form.Item
          className="w-[45%]"
          name="experience"
          label="Experience"
          rules={[
            {
              required: true,
              message: "Field cannot be empty",
            },
          ]}
        >
          <Input type="number" placeholder="In years" />
        </Form.Item>
      </div>
      <div className="w-full flex justify-between">
        <Form.Item
          name="organizationType"
          label="Organization Type"
          className="w-[45%]"
          rules={[
            {
              required: true,
              message: "Field cannot be empty",
            },
          ]}
        >
          <Select
            placeholder="Select organization type"
            options={[
              { value: "hospital", label: "Hospital" },
              { value: "clinic", label: "Clinic" },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="organizationName"
          label="Organization Name"
          className="w-[45%]"
          rules={[
            {
              required: true,
              message: "Field cannot be empty",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </div>
    </>
  );
};
export default ProfessionalInfoForm;
