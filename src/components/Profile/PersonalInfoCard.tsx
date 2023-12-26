import CardTitle from "@components/ui/CardTitle";
import { Button, Card, Form, Input, Select } from "antd";
import profilePic from "@assets/profilepic.png";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm, useWatch } from "antd/es/form/Form";
import { updateUserData } from "@utils/Doctor";
import ErrorBoundary from "@components/ErrorBoundary";
import { ApiUserDataResponseType } from "@constants/types";
import { SELECT_GENDER_OPTIONS } from "@constants/constants";

export type UserDataPropsType = {
  userData?: ApiUserDataResponseType;
};
const PersonalInfoCard = ({ userData }: UserDataPropsType) => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [personalInfoForm] = useForm();
  const formValues = useWatch([], personalInfoForm);
  const [disabled, setDisabled] = useState(true);
  const [formButtonDisabled, setFormButtonDisabled] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>();
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSelectedImage(base64String);
      };
      reader.readAsDataURL(file[0]);
    }
  };
  const cancelHandler = () => {
    personalInfoForm.resetFields();
    setDisabled(true);
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
  useEffect(() => {
    personalInfoForm.validateFields({ validateOnly: true }).then(
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
      <CardTitle>Personal Information</CardTitle>
      <ErrorBoundary>
        <div>
          <Form
            form={personalInfoForm}
            className="custom-form custom-form-profile w-full flex xs:flex-col xs:items-start sm:items-center sm:justify-between mb-4  sm:flex-row-reverse"
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
            <div className="flex flex-col gap-3 xs:w-full sm:w-7/12 md:w-9/12 xl:w-8/12">
              <div className="flex xs:gap-3 md:gap-6 xs:flex-col md:flex-row">
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
              <div className="flex xs:gap-3 md:gap-6 xs:flex-col md:flex-row">
                <Form.Item
                  className="xs:w-full xl:w-5/12"
                  name="dob"
                  label="Date of birth"
                  rules={[
                    {
                      required: true,
                      message: "Field cannot be empty!",
                    },
                  ]}
                >
                  <Input type="date" disabled={disabled} />
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
                    options={SELECT_GENDER_OPTIONS}
                  />
                </Form.Item>
              </div>
              <div className="flex xs:gap-3 md:gap-6 xs:flex-col md:flex-row">
                <Form.Item
                  className="xs:w-full xl:w-5/12"
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
                  className="xs:w-full xl:w-5/12"
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
              </div>
              <Form.Item
                className="xs:w-full md:w-[48%] xl:w-5/12"
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
          </Form>
          <div className="flex xs:gap-3 md:gap-6">
            {disabled ? (
              <>
                <Button htmlType="button" onClick={() => setDisabled(false)}>
                  Edit Details
                </Button>
              </>
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
                <Button onClick={cancelHandler}>Cancel</Button>
              </>
            )}
          </div>
        </div>
      </ErrorBoundary>
    </Card>
  );
};
export default PersonalInfoCard;
