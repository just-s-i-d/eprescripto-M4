import { Input, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import { MedicationType } from "@constants/types";

type MedicationFormPropsType = {
  fields: MedicationType;
  removeable?: boolean;
  removeMedicationInput: (id: number) => void;
};
const MedicationForm = ({
  fields,
  removeMedicationInput,
  removeable,
}: MedicationFormPropsType) => {
  return (
    <>
      <div className="mt-4 mb-2 flex justify-between">
        <h2 className="text-xl">Medication</h2>
        {removeable && (
          <CloseOutlined
            onClick={() => removeMedicationInput(fields.id)}
            className="text-[16px]"
          />
        )}
      </div>

      <div className="w-full grid sm:grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-3">
        <FormItem
          name={fields.medicine}
          label="Medicine Name"
          className="w-full"
          required
          rules={[
            {
              required: true,
              message: "Field cannot be empty",
            },
            {
              pattern: /^[a-zA-Z0-9.-]+$/,
              message: "Special characters not allowed",
            },
          ]}
        >
          <Input />
        </FormItem>
        <FormItem
          name={fields.dosage}
          label="Dosage"
          className="w-full"
          required
          rules={[
            {
              required: true,
              message: "Field cannot be empty",
            },
            {
              pattern: /^[0-9/mg]/,
              message: "Enter a valid dosage",
            },
          ]}
        >
          <Input />
        </FormItem>
        <FormItem
          name={fields.timesPerDay}
          label="Frequency"
          className="w-full"
          required
          rules={[
            {
              required: true,
              message: "Field cannot be empty",
            },
          ]}
        >
          <Select
            options={[
              {
                value: 1,
                label: "1/Day",
              },
              {
                value: 2,
                label: "2/Day",
              },
              {
                value: 3,
                label: "3/Day",
              },
            ]}
          />
        </FormItem>
        <div className="flex gap-6">
          <FormItem
            name={fields.instruction}
            className="w-full"
            label="Instruction"
            required
            rules={[
              {
                required: true,
                message: "Field cannot be empty",
              },
            ]}
          >
            <Select
              options={[
                {
                  value: "beforeFood",
                  label: "Before eating food",
                },
                {
                  value: "afterFood",
                  label: "After eating Food",
                },
              ]}
            />
          </FormItem>
        </div>
      </div>
    </>
  );
};
export default MedicationForm;
