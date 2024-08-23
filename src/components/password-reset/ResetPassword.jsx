import { useRef } from "react";
import { CustomInput } from "../common/CustomInput";

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
      placeholder: "345678",
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
    <form className="shadow-lg p-4" onSubmit={handleOnSubmit}>
      <h3 className="text-center pb-2">Reset Password</h3>
      <hr className="mb-4" />
      {inputs.map((item) => (
        <CustomInput key={item.name} {...item} />
      ))}
      <button
        className="w-100 mt-2 bg-teal-600 text-white py-2 rounded-md shadow-lg"
        type="submit"
      >
        Reset Password
      </button>
    </form>
  );
};
