import { useEffect, useState } from "react";

import { useForm, useWatch } from "antd/es/form/Form";
import { Button, Card, Form, Input, Select, Space } from "antd";

import CardTitle from "@components/ui/CardTitle";
import { updateUserData } from "@utils/Doctor";
import ErrorBoundary from "@components/ErrorBoundary";
import { UserDataPropsType } from "./PersonalInfoCard";

const ProfessionalInfoCard = ({ userData }: UserDataPropsType) => {
  const [disabled, setDisabled] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [professionalInfoForm] = useForm();
  const formValues = useWatch([], professionalInfoForm);
  const [formButtonDisabled, setFormButtonDisabled] = useState(false);
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
  const cancelHandler = () => {
    professionalInfoForm.resetFields();
    setDisabled(true);
  };
  useEffect(() => {
    professionalInfoForm.resetFields();
  }, [userData]);
  useEffect(() => {
    professionalInfoForm.validateFields({ validateOnly: true }).then(
      () => {
        setFormButtonDisabled(false);
      },
      () => {
        setFormButtonDisabled(true);
      },
    );
  }, [formValues]);
  return (
    <Card>
      <CardTitle>Professional Information</CardTitle>
      <ErrorBoundary>
        <Form
          form={professionalInfoForm}
          className="custom-form custom-form-profile w-full flex flex-col gap-2 mb-4"
          layout="vertical"
          initialValues={userData}
        >
          <div className="flex xs:flex-col sm:flex-row xs:gap-2 sm:gap-6 sm:w-full md:w-9/12 xl:w-8/12">
            <Form.Item
              className="xs:w-full xl:w-5/12"
              name="licenseNo"
              label="License Number"
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
              className="xs:w-full xl:w-5/12"
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
          </div>
          <div className="flex xs:flex-col sm:flex-row xs:gap-2 sm:gap-6 sm:w-full md:w-9/12 xl:w-8/12">
            <Form.Item
              className="xs:w-full xl:w-5/12"
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
            <Form.Item
              className="xs:w-full xl:w-5/12"
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
          </div>
          <Form.Item
            className="xs:full sm:w-[49%] md:w-[36%] xl:w-[28%]"
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
                disabled={formButtonDisabled}
              >
                Save
              </Button>
              <Button onClick={cancelHandler} className="min-w-[90px]">
                Cancel
              </Button>
            </>
          )}
        </Space>
      </ErrorBoundary>
    </Card>
  );
};
export default ProfessionalInfoCard;
