import { Input, Select, Form } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { MedicationType } from "@constants/types";

const { Item } = Form;
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
            data-testid="remove-field"
            className="text-[16px]"
          />
        )}
      </div>

      <div className="w-full grid sm:grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-3">
        <Item
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
        </Item>
        <Item
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
        </Item>
        <Item
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
        </Item>
        <div className="flex gap-6">
          <Item
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
          </Item>
        </div>
      </div>
    </>
  );
};
export default MedicationForm;
