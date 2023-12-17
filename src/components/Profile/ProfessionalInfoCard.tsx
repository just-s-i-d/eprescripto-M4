import CardTitle from "@components/ui/CardTitle";
import { updateUserData } from "@utils/Doctor";
import { Button, Card, Form, Input, Select, Space } from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import { useEffect, useState } from "react";

const ProfessionalInfoCard = ({ userData }) => {
  const [disabled, setDisabled] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [professionalInfoForm] = useForm();
  const formValues = useWatch([], professionalInfoForm);
  const onSubmitHandler = () => {
    setButtonLoading(true);
    const newUserData = { ...userData, ...formValues };
    updateUserData(newUserData).then(() => {
      setTimeout(() => {
        setButtonLoading(false);
        setDisabled(true);
      }, 2000);
    });
  };
  useEffect(() => {
    professionalInfoForm.resetFields();
  }, [userData]);
  return (
    <Card>
      <CardTitle>Professional Information</CardTitle>
      <Form
        form={professionalInfoForm}
        className="custom-form w-full flex flex-col gap-2 mb-4"
        layout="vertical"
        initialValues={userData}
      >
        <div className="flex gap-4 xs:flex-wrap md:flex-nowrap">
          <Form.Item
            className="xs:w-full sm:w-5/12 md:w-4/12 lg:w-[23%] xl:w-[18%]"
            name="licenseNo"
            label="Licesnse Number"
            rules={[
              {
                required: true,
                message: "please enter your license no.!",
              },
              {
                len: 4,
                message: "Only 4 digits allowed",
              },
            ]}
          >
            <Input disabled={disabled} />
          </Form.Item>
          <Form.Item
            className="xs:w-full sm:w-5/12 md:w-4/12 lg:w-[21%] xl:w-[18%]"
            name="speciality"
            label="Speciality"
            rules={[
              {
                required: true,
                message: "Please enter your speciality!",
              },
              {
                pattern: /^[a-zA-Z\s&-]+$/u,
                message: "Special characters not allowed",
              },
            ]}
          >
            <Input disabled={disabled} />
          </Form.Item>
          <Form.Item
            className="xs:w-full sm:w-5/12 md:w-4/12 lg:w-[21%] xl:w-[18%]"
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
        </div>
        <div className="flex gap-7 xs:flex-wrap sm:flex-nowrap">
          <Form.Item
            className="xs:w-full lg:w-[33%] xl:w-[27%]"
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
              disabled={disabled}
              options={[
                { value: "default", label: "Select an option" },
                { value: "hospital", label: "Hospital" },
                { value: "clinic", label: "Clinic" },
              ]}
            />
          </Form.Item>
          <Form.Item
            className="xs:w-full lg:w-[33%] xl:w-[27%]"
            name="organizationName"
            label="Organization Name"
            rules={[
              {
                required: true,
                message: "Please enter the Organization name!",
              },
              {
                pattern: /^[a-zA-Z0-9\s.,'-]+$/u,
                message: "Please a valid organzation name",
              },
            ]}
          >
            <Input disabled={disabled} />
          </Form.Item>
        </div>
      </Form>
      <Space>
        {disabled ? (
          <Button onClick={() => setDisabled(false)}>Edit Details</Button>
        ) : (
          <>
            <Button
              onClick={onSubmitHandler}
              loading={buttonLoading}
              className="min-w-[90px]"
            >
              Save
            </Button>
            <Button onClick={() => setDisabled(true)} className="min-w-[90px]">
              Cancel
            </Button>
          </>
        )}
      </Space>
    </Card>
  );
};
export default ProfessionalInfoCard;
