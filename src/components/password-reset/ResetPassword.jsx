import { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { CustomInput } from "../common/custom-input/CustomInput";

export const ResetPassword = ({ handleOnPasswordReset }) => {
  const otpRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const otp = otpRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      return new Error(console.log("Password must match"));
    }

    handleOnPasswordReset(otp, password);
  };

  const inputs = [
    {
      label: "OTP",
      name: "otp",
      type: "number",
      placeholder: "",
      required: true,
      inputRef: otpRef,
    },
    {
      label: "New Password",
      name: "password",
      type: "password",
      placeholder: "********",
      required: true,
      inputRef: passwordRef,
    },
    {
      label: "Confirm New Password",
      name: "confirmPassword",
      type: "password",
      placeholder: "********",
      required: true,
      inputRef: confirmPasswordRef,
    },
  ];

  return (
    <Form className="shadow-lg p-4" onSubmit={handleOnSubmit}>
      <h3 className="text-center">Reset Password</h3>
      <hr />
      {inputs.map((item) => (
        <CustomInput key={item.name} {...item} />
      ))}
      <Button className="w-100 mt-2" variant="primary" type="submit">
        Reset Password
      </Button>
    </Form>
  );
};
