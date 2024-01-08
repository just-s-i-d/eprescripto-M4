import ErrorBoundary from "@components/ErrorBoundary";
import { Form, FormInstance, Input, Select } from "antd";

const { TextArea } = Input;
const { Item } = Form;
type NewPatientCardPropType = {
  newPatientForm: FormInstance;
};
const NewPatientCard = ({ newPatientForm }: NewPatientCardPropType) => {
  return (
    <ErrorBoundary>
      <Form
        form={newPatientForm}
        layout="vertical"
        className="mt-6 px-4"
        data-testid="new-patient-form"
      >
        <Item
          name="pName"
          label="Patient Name"
          required
          rules={[
            {
              required: true,
              message: "Field cannot be empty",
            },
            {
              pattern: /^[A-Za-z\s]+$/,
              message: "Special characters not allowed",
            },
          ]}
        >
          <Input />
        </Item>
        <Item
          name="email"
          label="Email"
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
          <Input />
        </Item>
        <div className="flex gap-6">
          <Item
            name="dob"
            label="Date of Birth"
            required
            className="w-full"
            rules={[
              {
                required: true,
                message: "Please enter your age!",
              },
            ]}
          >
            <Input type="date" />
          </Item>
          <Item
            name="gender"
            label="Gender"
            required
            className="w-full"
            rules={[
              {
                required: true,
                message: "Please select your gender!",
              },
            ]}
          >
            <Select
              placeholder="Select your gender"
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" },
              ]}
            />
          </Item>
        </div>
        <Item
          name="contactNo"
          label="Mobile"
          required
          rules={[
            {
              required: true,
              message: "Field cannot be empty",
            },
            {
              pattern: /^[6-9]\d{9}$/,
              message: "Enter valid no.",
            },
          ]}
        >
          <Input />
        </Item>
        <Item name="allergies" label="Mention allergies , if any">
          <TextArea placeholder="Mention your allergies here" />
        </Item>
      </Form>
    </ErrorBoundary>
  );
};
export default NewPatientCard;
