import MedicationForm from "@components/Doctor/MedicationForm";
import NewPatientCard from "@components/Doctor/NewPatientCard";
import ErrorBoundary from "@components/ErrorBoundary";
import CardTitle from "@components/ui/CardTitle";
import PopModal from "@components/ui/PopModal";
import {
  ApiResponseData,
  PatientDataType,
  PatientInfoType,
  SelectOptionsType,
} from "@constants/types";
import {
  addNewPatient,
  createNewPrescription,
  getData,
  patientsEndpoint,
} from "@utils/Doctor";
import { showToast } from "@utils/common";
import { Button, Card, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { MedicationType } from "../../constants/types";
import {
  createOptions,
  medicationInputFieldGenerator,
} from "../../utils/Doctor";
import { SELECT_GENDER_OPTIONS } from "@constants/constants";
const { useForm, useWatch } = Form;
const { TextArea } = Input;
const DoctorPrescriptionPage = () => {
  const [open, setOpen] = useState(false);
  const [showAllergies, setShowAllergies] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [newPatientForm] = useForm();
  const [prescriptionForm] = useForm();
  const formValues = useWatch([], newPatientForm);
  const [patientsData, setPatientsData] = useState<PatientInfoType[]>();
  const [selectedPatient, setSelectedPatient] = useState<PatientInfoType>();
  const [options, setOptions] = useState<SelectOptionsType>();
  const prescriptionFormValues = useWatch([], prescriptionForm);
  const [medicationInputFields, setMedicationInputFiels] = useState<
    MedicationType[]
  >([medicationInputFieldGenerator()]);
  const addMedicationInput = () => {
    const inputField = medicationInputFieldGenerator();
    setMedicationInputFiels((prev) => [...prev, inputField]);
  };
  const removeMedicationInput = (id: number) => {
    const reducedInputFields = medicationInputFields.filter(
      (item) => item.id !== id,
    );
    setMedicationInputFiels(reducedInputFields);
  };
  const updatedData = () => {
    getData<ApiResponseData<PatientDataType>>(patientsEndpoint).then((res) => {
      const data = res.map((element) => ({
        id: element.id,
        ...element.attributes,
      }));
      setPatientsData(data);
      setOptions(createOptions(data));
    });
  };
  const onChangeHanlder = (id: number) => {
    if (patientsData) {
      const patient = patientsData.find(
        (patient: PatientInfoType) => patient.id === id,
      );
      setSelectedPatient(patient);
    }
  };
  const submitHanlder = () => {
    const patientInfo = formValues;
    addNewPatient(patientInfo)
      .then(() => {
        showToast("New patient added", "success");
        updatedData();
      })
      .catch((res) => {
        showToast(res.message, res.type);
      });
    newPatientForm.resetFields();
  };
  const cancelHanlder = () => {
    prescriptionForm.resetFields();
    setSelectedPatient(undefined);
  };
  const prescriptionFormSubmitHandler = () => {
    createNewPrescription(prescriptionFormValues)
      .then((res) => {
        showToast(res.message, res.type);
      })
      .catch((error) => {
        showToast(error.message, error.type);
      })
      .finally(() => {
        prescriptionForm.resetFields();
        setSelectedPatient(undefined);
      });
  };
  useEffect(() => {
    updatedData();
  }, []);
  useEffect(() => {
    prescriptionForm.resetFields();
  }, [selectedPatient]);
  useEffect(() => {
    prescriptionForm.validateFields({ validateOnly: true }).then(
      () => {
        setDisabled(false);
      },
      () => {
        setDisabled(true);
      },
    );
  }, [prescriptionFormValues]);

  return (
    <ErrorBoundary>
      <Card>
        <CardTitle className="flex justify-between">
          Prescription Form{" "}
          <Button
            className="text-white bg-secondary"
            onClick={() => setOpen(true)}
            data-testid="add-patient-btn"
          >
            New Patient
          </Button>
        </CardTitle>
        <Form
          data-testid="prescription-form"
          form={prescriptionForm}
          layout="vertical"
          className="custom-form custom-form-profile"
          initialValues={selectedPatient}
        >
          <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-3">
            <Form.Item name="pId" label="Patient" className="w-full" required>
              <Select
                data-testid="patient-select"
                placeholder="Select a Patient"
                options={options}
                onChange={onChangeHanlder}
                value={selectedPatient?.id}
              />
            </Form.Item>
            <Form.Item
              className="w-full "
              name="pName"
              label="Patient Name"
              required
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              className="w-full"
              name="dob"
              label="Date of Birth"
              required
            >
              <Input type="date" disabled />
            </Form.Item>
            <Form.Item
              className="xs:w-full"
              name="gender"
              label="Gender"
              required
              rules={[
                {
                  required: true,
                  message: "Field cannot be empty",
                },
              ]}
            >
              <Select
                disabled
                placeholder="Select a gender"
                options={SELECT_GENDER_OPTIONS}
              />
            </Form.Item>
            <Form.Item
              name="prescriptionName"
              label="Prescription Name"
              className="xs:w-full"
              required
              rules={[
                {
                  required: true,
                  message: "Field cannot be empty",
                  validator: (_, value) => {
                    if (value?.trim()) return Promise.resolve();
                    else return Promise.reject();
                  },
                },
                {
                  pattern: /^[A-Za-z0-9\s-]+$/,
                  message: "Special character not allowed",
                },
                {
                  max: 20,
                  message: "Only 20 characters allowed",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              className="xs:w-full"
              name="nextVisit"
              label="Next Visit"
              rules={[{ pattern: /^[0-9]+$/, message: "Enter valid integer" }]}
            >
              <Input type="number" placeholder="In Days" />
            </Form.Item>
            <Form.Item name="notes" label="Important Notes" className="w-full">
              <TextArea rows={1} />
            </Form.Item>
          </div>
          <div className="w-full mt-4">
            {medicationInputFields.map((item, index) => (
              <MedicationForm
                key={item.id}
                fields={item}
                removeMedicationInput={removeMedicationInput}
                removeable={index > 0}
              />
            ))}
            <div className="flex justify-between mt-2 mb-8">
              <Button onClick={addMedicationInput}>Add medication</Button>
              <Button onClick={() => setShowAllergies(true)}>
                Show Patient Allergies
              </Button>
            </div>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={prescriptionFormSubmitHandler}
              disabled={disabled}
              className="text-white bg-secondary disabled:opacity-50"
            >
              Create Prescription
            </Button>
            <Button onClick={cancelHanlder}>Cancel</Button>
          </div>
        </Form>
      </Card>
      <ErrorBoundary>
        <PopModal
          open={open}
          setOpen={setOpen}
          title="New Patient"
          okButtonText="Add Patient"
          confirmHandler={submitHanlder}
          footer={true}
        >
          <NewPatientCard newPatientForm={newPatientForm} />
        </PopModal>
      </ErrorBoundary>
      <ErrorBoundary>
        <PopModal
          footer={false}
          open={showAllergies}
          setOpen={setShowAllergies}
          title="Patient Allergies"
        >
          <div className="min-h-[10vh] max-h-[20vh] mt-4 text-lg overflow-scroll">
            {selectedPatient?.allergies ? (
              <>
                <div>Patient has following allergies :</div>
                <div>{selectedPatient?.allergies}</div>
              </>
            ) : (
              <div>Patient has no allergies mentioned</div>
            )}
          </div>
        </PopModal>
      </ErrorBoundary>
    </ErrorBoundary>
  );
};
export default DoctorPrescriptionPage;
