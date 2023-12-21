import ErrorBoundary from "@components/ErrorBoundary";
import { Form, FormInstance, Input, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";

type NewPatientCardPropType = {
  newPatientForm: FormInstance;
};
const NewPatientCard = ({ newPatientForm }: NewPatientCardPropType) => {
  return (
    <ErrorBoundary>
      <Form form={newPatientForm} layout="vertical" className="mt-6 px-4">
        <FormItem
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
        </FormItem>
        <FormItem
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
        </FormItem>
        <div className="flex gap-6">
          <FormItem
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
          </FormItem>
          <FormItem
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
          </FormItem>
        </div>
        <FormItem
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
        </FormItem>
        <FormItem name="allergies" label="Mention allergies , if any">
          <TextArea placeholder="Mention your allergies here" />
        </FormItem>
      </Form>
    </ErrorBoundary>
  );
};
export default NewPatientCard;
