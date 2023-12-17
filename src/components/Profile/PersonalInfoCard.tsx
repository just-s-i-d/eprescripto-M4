import CardTitle from "@components/ui/CardTitle";
import { Button, Card, Form, Input, Select } from "antd";
import profilePic from "@assets/profilepic.png";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "antd/es/form/Form";
import { deleteAccount, updateUserData } from "@utils/Doctor";
import ErrorBoundary from "@components/ErrorBoundary";
import PopModal from "@components/ui/PopModal";

const PersonalInfoCard = ({ userData }) => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [personalInfoForm] = useForm();
  const formValues = useWatch([], personalInfoForm);
  const [disabled, setDisabled] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [open, setOpen] = useState(false);
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSelectedImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };
  const confirmHandler = () => {
    deleteAccount();
  };
  const onSubmitHandler = () => {
    setButtonLoading(true);
    const newUserData = {
      ...userData,
      ...formValues,
      profilePic: selectedImage,
    };
    updateUserData(newUserData)
      .then(() => {
        setTimeout(() => {
          setButtonLoading(false);
          setDisabled(true);
        }, 1000);
      })
      .catch(() => {
        setButtonLoading(false);
        setDisabled(true);
      });
  };
  useEffect(() => {
    personalInfoForm.resetFields();
    setSelectedImage(userData?.profilePic);
  }, [userData]);
  return (
    <Card>
      <CardTitle>Personal Information</CardTitle>
      <ErrorBoundary>
        <div>
          <Form
            form={personalInfoForm}
            className="custom-form w-full flex xs:flex-col xs:items-start sm:items-center sm:justify-between mb-4  sm:flex-row-reverse"
            initialValues={userData}
            layout="vertical"
          >
            <div className="flex justify-center xs:w-full sm:w-4/12">
              <Form.Item name="profilePic">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  id="imageInput"
                  className="hidden"
                />
                <span className="flex flex-col items-center justify-center">
                  <img
                    src={selectedImage || profilePic}
                    className="xs:w-[120px] md:w-[150px] rounded-[50%] mb-4"
                    alt="Profile Preview"
                  />
                  <Button disabled={disabled} className="w-full">
                    <label htmlFor="imageInput">Change Picture</label>
                  </Button>
                </span>
              </Form.Item>
            </div>
            <div className="flex flex-col gap-3 sm:w-7/12 md:w-9/12 xl:w-8/12">
              <div className="flex gap-2 xs:flex-col md:flex-row">
                <Form.Item
                  className="xs:w-full xl:w-5/12"
                  name="docName"
                  label="Full Name"
                  rules={[
                    {
                      pattern: /^(Dr\.?|Doctor)?\s?[A-Za-z\s.'-]+$/,
                      message: "Special characters not allowed",
                    },
                    {
                      required: true,
                      message: "Please enter your name",
                    },
                  ]}
                >
                  <Input disabled={disabled} value={userData?.docName} />
                </Form.Item>
                <Form.Item
                  className="xs:w-full xl:w-5/12"
                  name="email"
                  label="E-mail"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your email!",
                    },
                    {
                      pattern: /^[\w.-]+@[\w.-]+\.\w+$/,
                      message: "Enter a valid mail",
                    },
                  ]}
                >
                  <Input disabled />
                </Form.Item>
              </div>
              <div className="flex gap-2 xs:flex-wrap md:flex-nowrap">
                <Form.Item
                  className="xs:w-full xl:w-5/12 sm:w-full"
                  name="age"
                  label="Age"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your age!",
                    },
                    {
                      validator: (_, value: number) => {
                        if (value && value < 18)
                          return Promise.reject("Minimum age is 18");
                        else return Promise.resolve();
                      },
                    },
                    {
                      validator: (_, value: number) => {
                        if (value && value > 100)
                          return Promise.reject("Maximum age is 100");
                        else return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input type="number" disabled={disabled} />
                </Form.Item>
                <Form.Item
                  className="xs:w-full xl:w-5/12"
                  name="gender"
                  label="Gender"
                  rules={[
                    {
                      required: true,
                      message: "Please select your gender!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select your gender"
                    disabled={disabled}
                    options={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                      { value: "other", label: "Other" },
                    ]}
                  />
                </Form.Item>
              </div>
              <div className="flex xs:flex-wrap gap-2 lg:flex-nowrap">
                <Form.Item
                  className="xs:w-[48%] lg:w-[32%] xl:w-[27%]"
                  name="city"
                  label="City"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your City!",
                    },
                    {
                      pattern: /^[A-Za-z]+$/,
                      message: "Special characters not allowed",
                    },
                  ]}
                >
                  <Input disabled={disabled} />
                </Form.Item>
                <Form.Item
                  className="xs:w-[49%] lg:w-[32%] xl:w-[27%]"
                  name="state"
                  label="State"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your State!",
                    },
                    {
                      pattern: /^[A-Za-z]+$/,
                      message: "Special characters not allowed",
                    },
                  ]}
                >
                  <Input disabled={disabled} />
                </Form.Item>
                <Form.Item
                  className="xs:w-full lg:w-[33%] xl:w-[28%]"
                  name="country"
                  label="Country"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your country!",
                    },
                    {
                      pattern: /^[A-Za-z]+$/,
                      message: "Special characters not allowed",
                    },
                  ]}
                >
                  <Input disabled={disabled} />
                </Form.Item>
              </div>
            </div>
          </Form>
          <div className="flex gap-2">
            {disabled ? (
              <>
                <Button htmlType="button" onClick={() => setDisabled(false)}>
                  Edit Details
                </Button>
                <Button danger onClick={() => setOpen(true)}>
                  Delete Account
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={onSubmitHandler}
                  loading={buttonLoading}
                  className="min-w-[90px]"
                >
                  Save
                </Button>
                <Button onClick={() => setDisabled(true)}>Cancel</Button>
              </>
            )}
          </div>
        </div>
        <PopModal
          footer={true}
          setOpen={setOpen}
          open={open}
          okButtonText="Yes"
          title="Delete Account"
          confirmHandler={confirmHandler}
        >
          Are you sure,you want to delete your account
        </PopModal>
      </ErrorBoundary>
    </Card>
  );
};
export default PersonalInfoCard;
