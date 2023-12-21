import Description from "@components/ui/Description";
import { StepsForm, steps } from "@constants/constants";
import { UserDetailsType } from "@constants/types";
import { Button, Form, Space, Steps } from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import { SetStateAction, useEffect, useState } from "react";
import CardSider from "../CardSider";
import { checkUserAlreadyExists, registerUser } from "@utils/Doctor";
import { showToast } from "@utils/common";

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
  const [direction, setDirection] = useState<"horizontal" | "vertical">(
    "vertical",
  );
  useEffect(() => {
    const handleResize = () => {
      const newDirection = window.innerWidth < 787 ? "horizontal" : "vertical";
      setDirection(newDirection);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
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
    if (current < steps.length - 1) setCurrent((prev) => prev + 1);
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
          items={steps}
          current={current}
          direction={direction}
          responsive={false}
        />
      </CardSider>
      <Space direction="vertical" className="w-full h-5/6 px-8">
        <div className="text-[34px]">Create Account</div>
        <div>
          <h2 className="text-xl font-bold mb-1">{StepsForm[current].title}</h2>
          <Description>{StepsForm[current].description}</Description>
        </div>
        <Form
          form={signUpForm}
          className="custom-form flex flex-col gap-4"
          size="large"
          layout="vertical"
          onFinish={onFinish}
          initialValues={userDetails}
        >
          {StepsForm[current].content}
          <Space className="absolute bottom-8 right-8">
            {current > 0 && (
              <Button
                className="text-white w-[90px] bg-primary"
                onClick={onClickHanlderPrevious}
              >
                Previous
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button
                className="text-white w-[90px] bg-primary disabled:opacity-50"
                htmlType="submit"
                disabled={disabled}
                loading={loading}
              >
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                className="text-white w-[90px] bg-primary disabled:opacity-50"
                onClick={onSubmitHandler}
                disabled={disabled}
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
