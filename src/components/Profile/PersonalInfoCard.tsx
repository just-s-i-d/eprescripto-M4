import CardTitle from "@components/ui/CardTitle";
import { Button, Card, Form, Input, Select, Space } from "antd";
import profilePic from "@assets/profilepic.png";
import { useState } from "react";
const PersonalInfoCard = () => {
  const [disabled, setDisabled] = useState(true);
  return (
    <Card>
      <CardTitle>Personal Information</CardTitle>
      <div className="flex justify-between">
        <div>
          <Form className="flex flex-col">
            <Space>
              <Form.Item
                name="docName"
                label="Full Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter your name!",
                  },
                ]}
              >
                <Input disabled={disabled} />
              </Form.Item>
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email!",
                  },
                ]}
              >
                <Input disabled={disabled} />
              </Form.Item>
            </Space>
            <Space>
              <Form.Item
                name="age"
                label="Age"
                rules={[
                  {
                    required: true,
                    message: "Please enter your name!",
                  },
                ]}
              >
                <Input disabled={disabled} />
              </Form.Item>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email!",
                  },
                ]}
              >
                <Select
                  defaultValue="default"
                  className="w-[200px]"
                  options={[
                    { value: "default", label: "Select a gender", disabled },
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                    { value: "other", label: "Other" },
                  ]}
                />
              </Form.Item>
            </Space>
            <Space>
              <Form.Item
                name="city"
                label="City"
                rules={[
                  {
                    required: true,
                    message: "Please enter your City!",
                  },
                ]}
              >
                <Input disabled={disabled} />
              </Form.Item>
              <Form.Item
                name="state"
                label="State"
                rules={[
                  {
                    required: true,
                    message: "Please enter your State!",
                  },
                ]}
              >
                <Input disabled={disabled} />
              </Form.Item>
            </Space>
            <Space>
              {disabled ? (
                <>
                  <Button onClick={() => setDisabled(false)}>
                    Edit Details
                  </Button>
                  <Button>Change Password</Button>
                  <Button danger>Delete Account</Button>
                </>
              ) : (
                <>
                  <Button>Save</Button>
                  <Button onClick={() => setDisabled(true)}>Cancel</Button>
                </>
              )}
            </Space>
          </Form>
        </div>
        <div className="flex flex-col justify-center gap-6">
          <img src={profilePic} alt="" width={150} />
          <Button>Change Picture</Button>
        </div>
      </div>
    </Card>
  );
};
export default PersonalInfoCard;
