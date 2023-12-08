import CardTitle from "@components/ui/CardTitle";
import { Button, Card, Form, Input, Select, Space } from "antd";
import { useState } from "react";

const ProfessionalInfoCard = () => {
  const [disabled, setDisabled] = useState(true);
  return (
    <Card>
      <CardTitle>Professional Information</CardTitle>
      <Form className="flex flex-col">
        <Space>
          <Form.Item
            name="licenseNo"
            label="Licesnse Number"
            rules={[
              {
                required: true,
                message: "Please enter your speciality!",
              },
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="speciality"
            label="Speciality"
            rules={[
              {
                required: true,
                message: "Please enter your speciality!",
              },
            ]}
          >
            <Input disabled={disabled} />
          </Form.Item>
          <Form.Item
            name="experience"
            label="Experience"
            rules={[
              {
                required: true,
                message: "Please enter your experiance!",
              },
            ]}
          >
            <Input type="number" disabled={disabled} />
          </Form.Item>
        </Space>
        <Space>
          <Form.Item
            name="organizationType"
            label="Organization Type"
            rules={[
              {
                required: true,
                message: "Please select the organization type!",
              },
            ]}
          >
            <Select
              className="w-[200px]"
              disabled
              options={[
                { value: "default", label: "Select an option" },
                { value: "hospital", label: "Hospital" },
                { value: "clinic", label: "Clinic" },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="organizationName"
            label="Organization Name"
            rules={[
              {
                required: true,
                message: "Please enter the Organization name!",
              },
            ]}
          >
            <Input disabled={disabled} />
          </Form.Item>
        </Space>
        <Space>
          {disabled ? (
            <Button onClick={() => setDisabled(false)}>Edit Details</Button>
          ) : (
            <>
              <Button>Save</Button>
              <Button onClick={() => setDisabled(true)}>Cancel</Button>
            </>
          )}
        </Space>
      </Form>
    </Card>
  );
};
export default ProfessionalInfoCard;
