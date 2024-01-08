import Description from "@components/ui/Description";
import { SIGNUP_FORM_STEPS, STEPPER_STEPS } from "@constants/constants";
import { UserDetailsType } from "@constants/types";
import { Button, Form, Space, Steps } from "antd";
import { SetStateAction, useEffect, useState } from "react";
import CardSider from "../CardSider";
import { checkUserAlreadyExists, registerUser } from "@utils/Doctor";
import { showToast } from "@utils/common";
import useDirectionHook from "@hooks/useDirectionHook";

const { useForm, useWatch } = Form;

type SignUpPropsType = {
  setShowSignIn: React.Dispatch<SetStateAction<boolean>>;
};
const SignUp = ({ setShowSignIn }: SignUpPropsType) => {
  const [current, setCurrent] = useState(0);
  const [userDetails, setUserDetails] = useState<UserDetailsType>();
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [signUpForm] = useForm();
  const formValues = useWatch([], signUpForm);
  const direction = useDirectionHook(787);
  const onFinish = (values: UserDetailsType) => {
    setUserDetails((prev) => ({ ...prev, ...values }));
    if (!current) {
      checkUserAlreadyExists(values.email)
        .then(() => {
          onClickHanlderNext();
        })
        .catch((error) => {
          showToast(error, "error");
        });
    } else {
      onClickHanlderNext();
    }
  };
  const onClickHanlderNext = () => {
    if (current < STEPPER_STEPS.length - 1) setCurrent((prev) => prev + 1);
  };
  const onClickHanlderPrevious = () => {
    if (current > 0) setCurrent((prev) => prev - 1);
  };
  useEffect(() => {
    signUpForm.validateFields({ validateOnly: true }).then(
      () => {
        setDisabled(false);
      },
      () => {
        setDisabled(true);
      },
    );
  }, [formValues]);
  const onSubmitHandler = () => {
    setLoading(true);
    registerUser({ ...userDetails, ...formValues })
      .then((res) => {
        showToast(res.message, res.type);
      })
      .catch((error) => {
        showToast(error.message, error.type);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <CardSider hidden={true}>
        <Steps
          className="xs:mt-8 md:mt-0 md:h-[35vh]"
          items={STEPPER_STEPS}
          current={current}
          direction={direction}
          responsive={false}
        />
      </CardSider>
      <Space direction="vertical" className="w-full h-5/6 px-8">
        <div className="text-[34px]">Create Account</div>
        <div>
          <h2 className="text-xl font-bold mb-1">
            {SIGNUP_FORM_STEPS[current].title}
          </h2>
          <Description>{SIGNUP_FORM_STEPS[current].description}</Description>
        </div>
        <Form
          form={signUpForm}
          className="custom-form flex flex-col gap-4"
          size="large"
          layout="vertical"
          onFinish={onFinish}
          data-testid="sign-up-form"
          initialValues={userDetails}
        >
          {SIGNUP_FORM_STEPS[current].content}
          <Space className="absolute bottom-8 right-8">
            {current > 0 && (
              <Button
                className="text-white w-[90px] bg-primary"
                onClick={onClickHanlderPrevious}
              >
                Previous
              </Button>
            )}
            {current < STEPPER_STEPS.length - 1 && (
              <Button
                className="text-white w-[90px] bg-primary disabled:opacity-50"
                htmlType="submit"
                disabled={disabled}
                loading={loading}
              >
                Next
              </Button>
            )}
            {current === STEPPER_STEPS.length - 1 && (
              <Button
                className="text-white w-[90px] bg-primary disabled:opacity-50"
                onClick={onSubmitHandler}
                disabled={disabled}
                data-testid="submit-btn"
              >
                Submit
              </Button>
            )}
          </Space>
        </Form>
        {!current && (
          <div className="absolute bottom-[36px]">
            Already have an account ?
            <span
              className="text-base cursor-pointer text-blue-500 ml-2"
              onClick={() => setShowSignIn(true)}
            >
              Sign In
            </span>
          </div>
        )}
      </Space>
    </>
  );
};
export default SignUp;
